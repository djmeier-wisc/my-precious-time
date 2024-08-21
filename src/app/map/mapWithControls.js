'use client'
import MultiListSelect from "app/charting/busSelector";
import { useEffect, useState } from "react";
import { getAllRoutes, getGeoJsonFor } from "api/transitDelayServiceApi";
import SingleListSelect from "app/charting/singleListSelector";
import { deformatLink } from "utils/linkFormat";
import { Box, Button, CircularProgress, Slider, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import dynamic from "next/dynamic";

const OpenStreetMap = dynamic(() => import('./openStreetMap'), { ssr: false });
const hoursOfDay = [
    { label: "12 AM", value: 0 },
    { label: "1 AM", value: 1 },
    { label: "2 AM", value: 2 },
    { label: "3 AM", value: 3 },
    { label: "4 AM", value: 4 },
    { label: "5 AM", value: 5 },
    { label: "6 AM", value: 6 },
    { label: "7 AM", value: 7 },
    { label: "8 AM", value: 8 },
    { label: "9 AM", value: 9 },
    { label: "10 AM", value: 10 },
    { label: "11 AM", value: 11 },
    { label: "12 PM", value: 12 },
    { label: "1 PM", value: 13 },
    { label: "2 PM", value: 14 },
    { label: "3 PM", value: 15 },
    { label: "4 PM", value: 16 },
    { label: "5 PM", value: 17 },
    { label: "6 PM", value: 18 },
    { label: "7 PM", value: 19 },
    { label: "8 PM", value: 20 },
    { label: "9 PM", value: 21 },
    { label: "10 PM", value: 22 },
    { label: "11 PM", value: 23 },
    { label: "12 AM", value: 24 }
];
function getLabelForValue(value) {
    for (let i = 0; i < hoursOfDay.length; i++) {
        let hour = hoursOfDay[i];
        if (hour.value === value) {
            return hour.label;
        }
    }
    console.log("UNABLE TO FIND FOR VALUE", value);
    return "";
}
export default function MapWithControls({ feedId, feedName, state }) {
    const [selectedRoute, setSelectedRoute] = useState("");
    const [selectedHours, setSelectedHours] = useState([0,24]);
    const [daysSelected, setDaysSelected] = useState([1,2,3,4,5,6,7])
    const [allRoutes, setAllRoutes] = useState();
    const [numDays, setNumDays] = useState(30);
    const [geoJson, setGeoJson] = useState();
    const [loading, setLoading] = useState(false);
    const [geoJsonErr, setGeoJsonErr] = useState(false);
    const hours = Array.from(Array(24), (_, i) => i + 1)
    const daysInPastToSearch = [1, 7, 30, 180];
    useEffect(() => {
        if (selectedRoute === "" || selectedRoute === undefined) {
            return;
        }
        setGeoJson(null);
        setLoading(true);
        (async () => {
            let geoJson = await getGeoJsonFor(feedId, selectedRoute, numDays, selectedHours[0], selectedHours[1], daysSelected);
            if (geoJson == null) {
                setGeoJsonErr(true);
                return;
            }
            setGeoJson(geoJson);
            setGeoJsonErr(false)
        })();
        setLoading(false);
    }, [feedId, selectedRoute, numDays, selectedHours, daysSelected])
    useEffect(() => {
        (async () => {
            var response = await getAllRoutes(feedId);
            setAllRoutes(response);
            setSelectedRoute(response[0])
        })();
    }, []);
    function handleSliderChange(_event, value) {
        setSelectedHours(value);
    }

    return (
        <div className="flex lg:flex-row flex-col h-[calc(100vh-65px)]">
            <div className="p-5 flex flex-col bg-slate-300 border border-solid border-b-4 border-slate-300 max-w-80 gap-5 justify-items-center">
                <h1 className="text-center py-5 text-3xl text-slate-800">
                    {state} - {deformatLink(feedName)}
                </h1>
                <p>Here, you can try selecting</p>
                <SingleListSelect options={allRoutes} setCurrSelection={setSelectedRoute} currSelection={selectedRoute} labelName={"Select Route"} />
                <SingleListSelect options={daysInPastToSearch} setCurrSelection={setNumDays} currSelection={numDays} labelName={"Select Search Period (days in past)"} />
                <Slider
                    aria-label="Select Time Between Midnight and Midnight"
                    defaultValue={[0, 24]}
                    getAriaValueText={v => getLabelForValue(v)}
                    valueLabelFormat={v => getLabelForValue(v)}
                    onChangeCommitted={handleSliderChange}
                    step={1}
                    valueLabelDisplay="auto"
                    max={24}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography
                        variant="body2"
                        sx={{ cursor: 'pointer' }}
                    >
                        12AM
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ cursor: 'pointer' }}
                    >
                        12AM
                    </Typography>
                </Box>
                <ToggleButtonGroup value={daysSelected} aria-label="Select Week" onChange={(_, newData)=>setDaysSelected(newData)}>
                    <ToggleButton aria-label="Sunday" value={7}>S</ToggleButton>
                    <ToggleButton aria-label="Monday" value={1}>M</ToggleButton>
                    <ToggleButton aria-label="Tuesday" value={2}>T</ToggleButton>
                    <ToggleButton aria-label="Wednesday" value={3}>W</ToggleButton>
                    <ToggleButton aria-label="Thursday" value={4}>T</ToggleButton>
                    <ToggleButton aria-label="Friday" value={5}>F</ToggleButton>
                    <ToggleButton aria-label="Sunday" value={6}>S</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div className="flex-grow">
                {loading && <CircularProgress />}
                {!loading && <OpenStreetMap geoJsonData={geoJson} />}
            </div>
        </div>
    );
}