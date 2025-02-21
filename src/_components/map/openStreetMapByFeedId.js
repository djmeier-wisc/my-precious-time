'use client'
import {useEffect, useState} from "react";
import {getGeoJsonFor} from "../../api/transitDelayServiceApi";
import OpenStreetMap from "./openStreetMap";

export default function OpenStreetMapByFeedId({feedId, selectedRoutes, numDays}) {
    const [geoJsonData, setGeoJsonData] = useState(undefined);
    useEffect(() => {
        (async () => {
            let geoJson = await getGeoJsonFor(feedId, selectedRoutes, numDays);
            if (geoJson == null) {
                return;
            }
            setGeoJsonData(geoJson);
        })();
    }, [])
    return <div className="flex flex-grow"><OpenStreetMap geoJsonData={geoJsonData}/></div>
}