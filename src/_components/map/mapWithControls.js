'use client'
import {useEffect, useState} from "react";
import {getAllRoutes, getGeoJsonFor} from "../../api/transitDelayServiceApi";
import SingleListSelect from "../charting/singleListSelector";
import {deformatLink} from "../../utils/linkFormat";
import {Box, CircularProgress, Slider, ToggleButton, ToggleButtonGroup, Tooltip, Typography} from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";
import {getGraphUrl} from "../../app/agencies/page";
import {Help} from "@mui/icons-material";

const OpenStreetMap = dynamic(() => import('./openStreetMap'), {ssr: false});
const hoursOfDay = [
    {label: "12 AM", value: 0},
    {label: "1 AM", value: 1},
    {label: "2 AM", value: 2},
    {label: "3 AM", value: 3},
    {label: "4 AM", value: 4},
    {label: "5 AM", value: 5},
    {label: "6 AM", value: 6},
    {label: "7 AM", value: 7},
    {label: "8 AM", value: 8},
    {label: "9 AM", value: 9},
    {label: "10 AM", value: 10},
    {label: "11 AM", value: 11},
    {label: "12 PM", value: 12},
    {label: "1 PM", value: 13},
    {label: "2 PM", value: 14},
    {label: "3 PM", value: 15},
    {label: "4 PM", value: 16},
    {label: "5 PM", value: 17},
    {label: "6 PM", value: 18},
    {label: "7 PM", value: 19},
    {label: "8 PM", value: 20},
    {label: "9 PM", value: 21},
    {label: "10 PM", value: 22},
    {label: "11 PM", value: 23},
    {label: "12 AM", value: 24}
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

export default function MapWithControls({feedId, feedName, state}) {
    const [selectedRoute, setSelectedRoute] = useState("");
    const [selectedHours, setSelectedHours] = useState([0, 24]);
    const [daysSelected, setDaysSelected] = useState([1, 2, 3, 4, 5, 6, 7])
    const [allRoutes, setAllRoutes] = useState();
    const [numDays, setNumDays] = useState(30);
    const [geoJson, setGeoJson] = useState();
    const [loading, setLoading] = useState(false);
    const [apiErr, setApiErr] = useState(false);
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
                setApiErr(true);
                return;
            }
            setGeoJson(geoJson);
            setApiErr(false)
        })();
        setLoading(false);
    }, [feedId, selectedRoute, numDays, selectedHours, daysSelected])
    useEffect(() => {
        (async () => {
            var response = await getAllRoutes(feedId);
            if (response === null) {
                setApiErr(true);
            }
            setAllRoutes(response);
            setSelectedRoute(response ? response[0] : null)
        })();
    }, []);

    function handleSliderChange(_event, value) {
        setSelectedHours(value);
    }

    return (
        <div className="flex lg:flex-row flex-col h-[calc(100vh-65px)]">
            <div
                className="p-5 flex flex-col bg-slate-300 border border-solid border-b-4 border-slate-300 max-w-80 justify-items-center">
                <div className="flex justify-between items-center pb-5">
                    <h1 className="text-centertext-3xl text-slate-800">
                        {state} - {deformatLink(feedName)}
                    </h1>
                    <Link
                        className="p-2 hover:shadow-lg bg-slate-300 rounded transition ease-in-out border border-solid border-slate-900"
                        href={getGraphUrl({state: state, id: feedId, name: feedName})}>
                        Graph
                    </Link>
                </div>
                <SingleListSelect className="my-3" options={allRoutes} setCurrSelection={setSelectedRoute}
                                  currSelection={selectedRoute} labelName={"Select Route"}/>
                <SingleListSelect className="my-3" options={daysInPastToSearch} setCurrSelection={setNumDays}
                                  currSelection={numDays} labelName={"Select Search Period (days in past)"}/>
                <div className="flex justify-between items-center gap-5">
                    <div className="flex center items-center justify-center py-5">
                        <ToggleButtonGroup className="flex gap-4" value={daysSelected} aria-label="Select Week"
                                           onChange={(_, newData) => setDaysSelected(newData)}>
                            <ToggleButton aria-label="Sunday" value={7}>S</ToggleButton>
                            <ToggleButton aria-label="Monday" value={1}>M</ToggleButton>
                            <ToggleButton aria-label="Tuesday" value={2}>T</ToggleButton>
                            <ToggleButton aria-label="Wednesday" value={3}>W</ToggleButton>
                            <ToggleButton aria-label="Thursday" value={4}>T</ToggleButton>
                            <ToggleButton aria-label="Friday" value={5}>F</ToggleButton>
                            <ToggleButton aria-label="Sunday" value={6}>S</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <Tooltip title="Select days of week to include in map" className="self-center justify-self-center">
                        <Help/>
                    </Tooltip>
                </div>
                <div className="flex justify-between items-center gap-5">
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
                    <Tooltip title="Select Times Of Day Included in Map, for example, 4-5pm for rush hour"
                             className="self-center justify-self-center">
                        <Help/>
                    </Tooltip>
                </div>


                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography
                        variant="body2"
                        sx={{cursor: 'pointer'}}
                    >
                        12AM
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{cursor: 'pointer'}}
                    >
                        12AM
                    </Typography>
                </Box>
            </div>
            <div className="flex-grow">
                {loading && <CircularProgress/>}
                {!loading && <OpenStreetMap geoJsonData={geoJson}/>}
            </div>
            <div
                className="fixed bottom-4 right-4 bg-white p-4 border border-gray-300 shadow-lg rounded-md text-sm max-w-xs z-[10000]">
                <h3 className="font-bold mb-2">Bus Delay Information</h3>
                <ul>
                    <li><span className="inline-block w-4 h-4 bg-red-600 mr-2"></span>More than 20 min late</li>
                    <li><span className="inline-block w-4 h-4 bg-[#DB2400] mr-2"></span>15-20 min late</li>
                    <li><span className="inline-block w-4 h-4 bg-[#B64900] mr-2"></span>10-15 min late</li>
                    <li><span className="inline-block w-4 h-4 bg-[#926D00] mr-2"></span>5-10 min late</li>
                    <li><span className="inline-block w-4 h-4 bg-[#6D9200] mr-2"></span>1-5 min late</li>
                    <li><span className="inline-block w-4 h-4 bg-[#49B600] mr-2"></span>On time</li>
                    <li><span className="inline-block w-4 h-4 bg-[#0077CC] mr-2"></span>1-5 min early</li>
                    <li><span className="inline-block w-4 h-4 bg-[#004466] mr-2"></span>Fallback color</li>
                </ul>
            </div>
        </div>
    );
}