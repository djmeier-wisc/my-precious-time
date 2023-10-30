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
import { CircularProgress } from "@mui/material";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
export default function DelayLineChart({ baseUrl }) {
    const [datasets, setDataSets] = useState({});
    const [fetchedData, setFetchedData] = useState(false);
    const [isError, setIsError] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [units, setUnits] = useState(null);
    const [unitsErr, setUnitsErr] = useState(false);
    const options = {
        responsive: true,
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
    }, [baseUrl]);

    let setUnitsConditionally = (change) => {
        let currUnits = change.target.value;
        if (parseInt(currUnits)) {
            setUnits(currUnits);
            setUnitsErr(false);
        }
        else setUnitsErr(true);
    }
    let fetchGraphData = () => {
        let url = baseUrl;
        if (startDate || endDate || units) {
            url += "?"
        }
        let params = []
        if (startDate) params.push('startTime=' + startDate.unix());
        if (endDate) params.push('endTime=' + endDate.unix());
        if (units) params.push('units=' + units);
        url += params.join("&");
        console.log("getting URL", url);
        setFetchedData(false);
        fetch(url).catch(err => {
            setFetchedData(false);
            setIsError(true);
        }).then(res => res.json()).then(data => {
            setDataSets(data);
            setFetchedData(true);
        });
    }

    return (

        <div>
            <div className="grid sm:grid-cols-4 gap-3">
                <div className="col-span-1 justify-content-center">
                    <DateTimePicker label="Start Date" onChange={setStartDate} />
                </div>
                <div className="col-span-1 justify-content-center">
                    <DateTimePicker label="End Date" onChange={setEndDate} />
                </div>
                <div className="col-span-1 justify-content-center">
                    <label htmlFor="timeUnits" >Time Units</label> {unitsErr && <p className="text-red-500 text-xs">* should be int</p>}
                    <input type="text" id="timeUnits" placeholder="Time Units" onChange={setUnitsConditionally} className="block text-gray-700 text-sm font-bold w-full" />
                </div>
                <button className="rounded-full h-10 bg-slate-800 text-slate-300 text-sm " onClick={fetchGraphData}>Fetch Results</button>
            </div>
            <div className="h-full w-full place-content-center">
                {!isError && fetchedData && <Line options={options} className="w-full" data={datasets} />}
                {!isError && !fetchedData && <CircularProgress className="justify-self-center" />}
                {isError && <p>Sorry, we encountered an error from our server. Please try again soon.</p>}
            </div>
        </div>
    );
}