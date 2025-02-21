'use client';

import {MapContainer, Marker, Polyline, TileLayer, useMap} from 'react-leaflet';
import {useEffect, useRef, useState} from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const trainIcon = L.icon({
    iconUrl: '/train.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});

const route = [
    [40.7128, -74.0060],   // New York
    [41.8781, -87.6298],   // Chicago
    [34.0522, -118.2437],  // Los Angeles
];

function TrainMover() {
    const map = useMap();
    const markerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                let newProgress = prev + 0.005;
                if (newProgress >= 1) {
                    newProgress = 0;
                    setCurrentIndex((prevIndex) => (prevIndex + 1) % (route.length - 1));
                }
                return newProgress;
            });
        }, 30);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!markerRef.current) return;
        const start = route[currentIndex];
        const end = route[currentIndex + 1];
        const lat = start[0] + (end[0] - start[0]) * progress;
        const lng = start[1] + (end[1] - start[1]) * progress;
        markerRef.current.setLatLng([lat, lng]);
    }, [progress, currentIndex]);

    return <Marker ref={markerRef} position={route[0]} icon={trainIcon}/>;
}

export default function MapBackground() {
    return (
        <>
            <MapContainer
                center={[39, -95]}
                zoom={4}
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
                <TrainMover/>
            </MapContainer>
        </>
    );
}
