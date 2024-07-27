'use client'
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from "react-leaflet";

export default function OpenStreetMap() {
    const [routeData, setRouteData] = useState();
    useEffect(()=>{
        fetch("http://localhost:8080/v1/map/394/delayLines?routeName=A")
        .then(res=>{
            if (res.ok) return res.json()
            else throw new Error("Bad response type for delayLines");
        })
        .then(res=>{
            setRouteData(res);
        })
        .catch(err=>{
            setRouteData(null);
            console.log(err)
        })
    }, [])
    return <MapContainer center={[43.0718,-89.3982]} zoom={10} scrollWheelZoom={true} className="h-screen">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoJSON data={routeData} />
        </MapContainer>
}