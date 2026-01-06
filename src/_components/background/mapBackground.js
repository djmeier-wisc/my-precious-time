'use client';

import {MapContainer, Marker, Polyline, TileLayer} from 'react-leaflet';
import {useEffect, useReducer, useRef, useState} from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {getRandomShape} from "../../api/transitDelayServiceApi";

const trainIcon = L.icon({
    iconUrl: '/train.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});
const initialState = {
    progress: 0,
    currIndex: 0,
    direction: 1
};

function distance(latLon1, latLon2) {
    if (!latLon1 || !latLon2) return 1;
    const [lat1, lon1] = latLon1;
    const [lat2, lon2] = latLon2;
    const R = 6371;

    const toRadians = (angle) => angle * (Math.PI / 180);
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.asin(Math.sqrt(a));

    return R * c;
}

function getBounds(route) {
    let minLat = Math.min(...route.map(r => r[1]));
    let minLon = Math.min(...route.map(r => r[0]));
    let maxLat = Math.max(...route.map(r => r[1]));
    let maxLon = Math.max(...route.map(r => r[0]));
    let bounds = [[minLon, minLat], [maxLon, maxLat]];
    console.log("bounds", bounds);
    return bounds;
}

function TrainMover({route}) {
    // Reducer to update progress and the current segment
    function reducer(state, action) {
        switch (action.type) {
            case 'TICK': {
                let newProgress = state.progress + (action.payload / distance(route[state.currIndex], route[state.currIndex + state.direction]));
                let newIndex = state.currIndex;
                let newDirection = state.direction;
                if (newProgress >= 1) {
                    newProgress = 0;
                    const nextIndex = state.currIndex + state.direction;
                    // If the next index is out of bounds, flip the direction (bounce)
                    if (nextIndex < 0 || nextIndex >= route.length) {
                        newDirection = -state.direction;
                    } else {
                        newIndex = nextIndex;
                    }
                }
                if ((newIndex >= route.length - 1 && newDirection > 0) ||
                    (newIndex <= 0 && newDirection < 0)) {
                    newDirection = -newDirection
                }
                let newState = {
                    progress: newProgress,
                    currIndex: newIndex,
                    direction: newDirection,
                };
                return newState;
            }
            default:
                return state;
        }
    }

    const markerRef = useRef(null);
    const [state, dispatch] = useReducer(reducer, initialState);

    // Drive the animation with a setInterval (or requestAnimationFrame if desired)
    useEffect(() => {
        const interval = setInterval(() => {
            dispatch({type: 'TICK', payload: 1});
        }, 30);
        return () => clearInterval(interval);
    }, []);

    // Update the marker position whenever state changes
    useEffect(() => {
        if (!markerRef.current) return;
        const start = route[state.currIndex];
        // Compute the next index based on the direction
        let nextIndex = state.currIndex + state.direction;
        // If out-of-bound, just keep the boundary (the reducer should have flipped direction already)
        if (nextIndex < 0 || nextIndex >= route.length) {
            nextIndex = state.currIndex;
        }
        const end = route[nextIndex];
        const lat = start[0] + (end[0] - start[0]) * state.progress;
        const lng = start[1] + (end[1] - start[1]) * state.progress;
        markerRef.current.setLatLng([lat, lng]);
    }, [state]);

    return <Marker ref={markerRef} position={route[0]} icon={trainIcon}/>;
}

export default function MapBackground() {
    const [route, setRoute] = useState(undefined);
    const mapRef = useRef();

    function setRandomShape() {
        (async () => {
            let route = (await getRandomShape())?.shape;
            setRoute(route);
        })()
    }

    useEffect(() => {
        setRandomShape();
        const interval = setInterval(() => {
            setRandomShape();
        }, 60000);
        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        mapRef?.current?.fitBounds(getBounds(route));
    }, [route]);
    return route && (
        <MapContainer
            ref={mapRef}
            bounds={getBounds(route)}
            className="absolute inset-0 h-screen w-screen"
            zoomControl={false}
            attributionControl={false}
            dragging={false}
            scrollWheelZoom={false}
            doubleClickZoom={false}
            boxZoom={false}
            keyboard={false}
            touchZoom={false}
            style={{width: "100%", position: "fixed", zIndex: -1}}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Polyline positions={route} color="red" weight={4}/>
        </MapContainer>
    );
}
