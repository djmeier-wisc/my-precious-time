'use client'
import {useEffect, useState} from "react";
import {getGeoJsonFor} from "../../api/transitDelayServiceApi";
import OpenStreetMap from "./openStreetMap";

export default function OpenStreetMapByFeedId({feedId, selectedRoutes, numDays}) {
    const [geoJsonData, setGeoJsonData] = useState(undefined);
    useEffect(() => {
        if (selectedRoutes === [] || selectedRoutes === undefined) {
                return;
            }
        (async () => {
            let geoJson = await getGeoJsonFor(feedId, selectedRoutes, numDays);
            if (!geoJson) return;
            setGeoJsonData(geoJson);
        })();
    }, [feedId, selectedRoutes, numDays])
    return (
        <div style={{height: 500}} className="h-full w-full grid place-items-center">
            <OpenStreetMap geoJsonData={geoJsonData}/>
        </div>);
}