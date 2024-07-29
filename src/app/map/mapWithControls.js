'use client'
import MultiListSelect from "app/charting/busSelector";
import OpenStreetMap from "./openStreetMap";
import { useEffect, useState } from "react";
import { getAllRoutes, getGeoJsonFor } from "api/transitDelayServiceApi";
import SingleListSelect from "app/charting/singleListSelector";
import { deformatLink } from "utils/linkFormat";
import { CircularProgress } from "@mui/material";

export default function MapWithControls({ feedId, feedName, state }) {
    const [selectedRoute, setSelectedRoute] = useState();
    const [allRoutes, setAllRoutes] = useState();
    const [hourPolled, setHourPolled] = useState();
    const [numDays, setNumDays] = useState(30);
    const [geoJson, setGeoJson] = useState();
    const [loading, setLoading] = useState(false);
    const [geoJsonErr, setGeoJsonErr] = useState(false);
    const hours = Array.from(Array(24), (_, i) => i+1)
    const daySelections = [1,7,30];
    useEffect(()=>{
        if(selectedRoute === "" || selectedRoute === undefined) {
            return;
        }
        setGeoJson(null);
        setLoading(true);
        (async () => {
            let geoJson = await getGeoJsonFor(feedId, selectedRoute, numDays, hourPolled);
            if(geoJson == null) {
                setGeoJsonErr(true);
                return;
            }
            setGeoJson(geoJson);
            setGeoJsonErr(false)
        })();
        setLoading(false);
    }, [feedId, selectedRoute, hourPolled, numDays])
    useEffect(()=>{
        (async () => {
            var response = await getAllRoutes(feedId);
            setAllRoutes(response);
            setSelectedRoute(response.slice(1,1))
        })();
    }, []);
    return (
        <div className="flex lg:flex-row flex-col h-[calc(100vh-65px)]">
            <div className="p-5 flex flex-col bg-slate-300 border border-solid border-b-4 border-slate-300 max-w-80">
                <h1 className="text-center py-5 text-3xl text-slate-800">
                    {state} - {deformatLink(feedName)}
                </h1>
                <p>Here, you can try selecting</p>
                <SingleListSelect options={allRoutes} setCurrSelection={setSelectedRoute} currSelection={selectedRoute} labelName={"Select Route"} />
                <SingleListSelect options={hours} setCurrSelection={setHourPolled} currSelection={hourPolled} labelName={"Select Hour (24 hr fmt)"} />
                <SingleListSelect options={daySelections} setCurrSelection={setNumDays} currSelection={numDays} labelName={"Number of days in past to search"} />
            </div>
            <div className="flex-grow">
                {loading && <CircularProgress />}
                {!loading && <OpenStreetMap geoJsonData={geoJson}/>}
            </div>
        </div>
    );
}