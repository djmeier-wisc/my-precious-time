'use client';
import zIndex from "@mui/material/styles/zIndex";
import { useEffect, useMemo, useRef, useState } from "react";
import { TileLayer, GeoJSON, MapContainer, Popup } from "react-leaflet";

export default function OpenStreetMap({ geoJsonData }) {
    const mapRef = useRef();
    const [popupData, setPopupData] = useState(null);
    useEffect(()=>{
        setPopupData(null)
    }, [geoJsonData])
    const getColorBetweenRedAndGreen = (d) => {
        return d > 20 ? '#FF0000' :  // Bright red for very late
               d > 15 ? '#DB2400' :  // Darker red
               d > 10 ? '#B64900' :  // Red-orange
               d > 5 ? '#926D00' :   // Orange
               d > 1 ? '#6D9200' :   // Yellow-green
               d > 0 ? '#49B600' :   // Green for on-time
               d > -5 ? '#0077CC' :  // Clearer blue for early (calm blue)
               '#004466';            // Bright green for on-time (fallback)
    }

    useEffect(() => {
        if (geoJsonData == undefined) return undefined;
        let coordinates = geoJsonData?.features
            ?.map(f => f.geometry)
            ?.flatMap(g => g.coordinates);
        let lats = coordinates.map(c => c[0]);
        let lons = coordinates.map(c => c[1]);
        if (lons.length === 0 || lats.length === 0) return undefined;
        let minLat = Math.min(...lats);
        let maxLat = Math.max(...lats);
        let minLon = Math.min(...lons);
        let maxLon = Math.max(...lons);
        const bounds = [[minLon, minLat], [maxLon, maxLat]];
        mapRef?.current?.fitBounds(bounds);
    }, geoJsonData);

    const style = (feature) => {
        return {
            color: getColorBetweenRedAndGreen(feature.properties.averageDelay)
        };
    };

    return (
        <MapContainer ref={mapRef} scrollWheelZoom={true} className="h-full">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {geoJsonData && <GeoJSON onEachFeature={(feature,layer)=>{
                layer.on('click',(e)=>{
                    setPopupData({
                        latLng: e.latlng,
                        properties: feature.properties
                    });
                })
            }} pathOptions={{ stroke: true }} style={style} data={geoJsonData} />}
           {popupData && <Popup position={popupData?.latLng}>
                Average Minutes Delayed: {Number(popupData?.properties?.averageDelay).toFixed(2)}
            </Popup>}
        </MapContainer>
    );
}