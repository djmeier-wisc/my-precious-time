'use client'
import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Line } from 'react-chartjs-2';
import { CircularProgress, TextField } from "@mui/material";
import BusSelector from "./busSelector";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
import dayjs from 'dayjs';

export const getMidnightTomorrow = () => {
    let date = new Date();
    date.setHours(24,0,0,0);
    return date;
}
export const getMidnightSixDaysAgo = () => {
    let date = new Date();
    date.setHours(24,0,0,0);
    date.setDate(date.getDate() - 7);
    return date;
}
export default function DelayLineChart({ baseUrl }) {
    const DEFAULT_UNITS_SPAN = 7;
    const DEFAULT_START_DATE = getMidnightSixDaysAgo();
    const DEFAULT_END_DATE = getMidnightTomorrow();
    const [datasets, setDataSets] = useState({});
    const [fetchedData, setFetchedData] = useState(false);
    const [isError, setIsError] = useState(false);
    const [startDate, setStartDate] = useState(dayjs(DEFAULT_START_DATE));
    const [endDate, setEndDate] = useState(dayjs(DEFAULT_END_DATE));
    const [units, setUnits] = useState(DEFAULT_UNITS_SPAN);
    const [unitsErr, setUnitsErr] = useState(null);
    const [allBusStates, setAllBusStates] = useState([]);
    const [selectedBusStates, setSelectedBusStates] = useState(['A', 'B', 'C', 'D', 'F', 'R', 'G', 'H', '80']);
    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                title: {
                    display: true,
                    text: "Minutes Difference from Schedule"
                }
            },
            x: {
                title: {
                    display: true,
                    text: "Date Measured"
                }
            }
        }
    }
    useEffect(() => {
        fetchGraphData();
    }, [baseUrl, startDate, endDate, units, selectedBusStates]);
    useEffect(() => {
        fetchBusStateList();
    }, [baseUrl]);

    let setUnitsConditionally = (change) => {
        let currUnits = change.target.value;
        if (parseInt(currUnits) > 0) {
            setUnits(currUnits);
            setUnitsErr(null);
        } else {
            setUnitsErr("Number of units must be greater than zero!");
        }
    }
    let fetchGraphData = () => {
        let url = baseUrl;
        if (startDate || endDate || units || selectedBusStates) {
            url += "?"
        }
        let params = []
        if (startDate) params.push('startTime=' + startDate.unix());
        if (endDate) params.push('endTime=' + endDate.unix());
        if (units) params.push('units=' + units);
        if (selectedBusStates) selectedBusStates.forEach(busState => params.push('routes=' + busState))
        url += params.join("&");
        console.log("getting URL", url);
        setFetchedData(false);
        fetch(url).then(res => res.json()).then(data => {
            setDataSets(data);
            setFetchedData(true);
        }).catch(err => {
            console.log(err)
            setFetchedData(false);
            setIsError(true);
        });
    }

    async function fetchBusStateList() {
        fetch("/api/v1/getAllRouteNames")
            .then(res => res.json())
            .then(res => setAllBusStates(res))
            .catch(err => {
                console.log("Error retrieving all route names", err);
                setAllBusStates(null);
            });
        let busStates = await (await fetch("/api/v1/getAllRouteNames")).json();
        console.log(baseUrl + "/v1/getAllRouteNames")
        setAllBusStates(busStates);
    }

    return (

        <div className="h-full w-full">
            <div className="grid sm:grid-cols-4 gap-3">
                <div className="col-span-1 justify-items-center">
                    <DateTimePicker defaultValue={startDate} label="Start Date" onChange={setStartDate} className="w-full" />
                </div>
                <div className="col-span-1 justify-items-center">
                    <DateTimePicker defaultValue={endDate} label="End Date" onChange={setEndDate} className="w-full" />
                </div>
                <div className="col-span-1 justify-items-center">
                <TextField
                    id="outlined-number"
                    label="Units"
                    type="number"
                    className="w-full"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={setUnitsConditionally}
                    helperText={unitsErr}
                    defaultValue={DEFAULT_UNITS_SPAN}
                    />
                </div>
                <div className="col-span-1 justify-items-center">
                    <BusSelector busOptions={allBusStates} setCurrBusList={setSelectedBusStates} currBusList={selectedBusStates} />
                </div>
            </div>
            <div style={{ height: 500 }} className="h-full w-full">
                {!isError && fetchedData && <Line options={options} className="w-full justify-stretch" data={datasets} />}
                {!isError && !fetchedData && <CircularProgress className="justify-self-center" />}
                {isError && <p>Sorry, we encountered an error from our server. Please try again soon.</p>}
            </div>
        </div>
    );
}