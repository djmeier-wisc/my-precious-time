'use client'
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

export default function OpenStreetMap({geoJsonData}) {
    // let maxAvgDelay = Math.max(geoJsonData?.features?.map(s=>s?.properties?.averageDelay));
    // let minAvgDelay = Math.min(geoJsonData?.features?.map(s=>s?.properties?.averageDelay));
    // const interpolate => (i) => {
    //     i * (maxAvgDelay - minAvgDelay) / 7
    // }
    const getColorBetweenRedAndGreen = (d) => {
            return d > 20 ? '#FF0000' :
                   d > 10  ? '#DB2400' :
                   d > 5  ? '#B64900' :
                   d > 4  ? '#926D00' :
                   d > 3   ? '#6D9200' :
                   d > 2   ? '#49B600' :
                   d > 1   ? '#24DB00' :
                              '#00FF00';
    }
    const style = (feature) => {
        return {
            color: getColorBetweenRedAndGreen(feature.properties.averageDelay)
        };
    };
    return <MapContainer center={[43.0718,-89.3982]} zoom={10} scrollWheelZoom={true} className="h-full">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {geoJsonData && <GeoJSON pathOptions={{stroke:true}} style={style} data={geoJsonData} />}
        </MapContainer>
}