'use client';
import { useEffect, useMemo, useRef, useState } from "react";
import { TileLayer, GeoJSON, MapContainer, Popup } from "react-leaflet";

export default function OpenStreetMap({ geoJsonData }) {
    const mapRef = useRef();
    const [popupData, setPopupData] = useState(null);
    useEffect(()=>{
        setPopupData(null)
    }, [geoJsonData])
    const getColorBetweenRedAndGreen = (d) => {
        return d > 20 ? '#FF0000' :
            d > 10 ? '#DB2400' :
                d > 5 ? '#B64900' :
                    d > 4 ? '#926D00' :
                        d > 3 ? '#6D9200' :
                            d > 2 ? '#49B600' :
                                d > 1 ? '#24DB00' :
                                    '#00FF00';
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
        <MapContainer ref={mapRef}scrollWheelZoom={true} className="h-full">
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