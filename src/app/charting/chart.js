"use client";
import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Legend,
    Tooltip,
    Colors,
} from 'chart.js';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Line } from 'react-chartjs-2';
import { CircularProgress, TextField, Tooltip as TT } from "@mui/material";
import MultiListSelect from "./busSelector";
import ColorCheckbox from "./colorCheckbox";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Colors
);
import dayjs from "dayjs";
import { useChartContext } from "./chartContext";
import { Help } from "@mui/icons-material";
import { getAllRoutes } from "api/transitDelayServiceApi";

export const getMidnightTomorrow = () => {
    let date = new Date();
    date.setHours(24, 0, 0, 0);
    return date;
};
export const getMidnightSixDaysAgo = () => {
    let date = new Date();
    date.setHours(24, 0, 0, 0);
    date.setDate(date.getDate() - 7);
    return date;
}
export default function DelayLineChart({ feedId }) {
    const { chartContext } = useChartContext();
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
    const [selectedBusStates, setSelectedBusStates] = useState([]);
    const [useColor, setUseColor] = useState(true);
    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                title: {
                    display: true,
                    text: chartContext.desc
                }
            },
            x: {
                title: {
                    display: true,
                    text: "Date"
                }
            }
        }
    }
    useEffect(() => {
        setFetchedData(false);
        const delayInput = setTimeout(() => {
            fetchGraphData();
        }, 500);
        return () => clearTimeout(delayInput);
    }, [chartContext, startDate, endDate, units, selectedBusStates, useColor]);
    useEffect(() => {
        (async () => {
            var response = await getAllRoutes(feedId);
            setAllBusStates(response);
            setSelectedBusStates(response ? response.slice(0, 7) : []);
        })();
    }, []);
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
        let url = chartContext.url + feedId;
        if (startDate || endDate || units || selectedBusStates) {
            url += "?"
        }
        let params = []
        if (startDate) params.push('startTime=' + startDate.unix());
        if (endDate) params.push('endTime=' + endDate.unix());
        if (units) params.push('units=' + units);
        if (useColor != null) params.push("useColor=" + useColor);
        if (selectedBusStates) selectedBusStates.forEach(busState => params.push('routes=' + busState))
        url += params.join("&");
        setFetchedData(false);
        fetch(url).then(res => {
            if (res.ok) return res.json();
            else {
                throw new Error();
            }
        }).then(data => {
            setDataSets(data);
            setFetchedData(true);
            setIsError(false);
            console.log("Completed request succeessfully")
        }).catch(err => {
            console.log(err)
            setFetchedData(false);
            setIsError(true);
        });
    }

    return (
        <div className="h-full w-full">
            <div className="grid sm:grid-cols-8 gap-3">
                <div className="flex flex-row col-span-2 justify-items-center">
                    <DateTimePicker defaultValue={startDate} label="Start Date" onChange={setStartDate} className="w-full" />
                    <TT title="Select where the left side of the graph starts" className="self-center justify-self-center">
                        <Help />
                    </TT>
                </div>
                <div className="flex flex-row col-span-2 justify-items-center">
                    <DateTimePicker defaultValue={endDate} label="End Date" onChange={setEndDate} className="w-full" />
                    <TT title="Select where the right side of the graph starts" className="self-center justify-self-center">
                        <Help />
                    </TT>
                </div>
                <div className="flex flex-row col-span-1 justify-items-center">
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
                    <TT title="Select the number of spans of the graph" className="self-center justify-self-center">
                        <Help />
                    </TT>
                </div>
                <div className="flex flex-row col-span-1 place-content-center">
                    <ColorCheckbox setColors={setUseColor} colors={useColor} />
                </div>
                <div className="flex flex-row col-span-2 content-center">
                    <div className="grid grid-cols-8">
                        <div className="col-span-7">
                            <MultiListSelect busOptions={allBusStates} setCurrBusList={setSelectedBusStates} currBusList={selectedBusStates} />
                        </div>
                        <TT title="Select what routes you want to put on the graph" className="self-center justify-self-center">
                            <Help />
                        </TT>
                    </div>
                </div>
            </div>
            <div style={{ height: 500 }} className="h-full w-full justify-items-center">
                {!isError && fetchedData && <Line options={options} className="w-full justify-stretch" data={datasets} />}
                {!isError && !fetchedData && <CircularProgress className="justify-self-center" />}
                {isError && <p>Sorry, we encountered an error from our server. Please try again soon.</p>}
            </div>
        </div>
    );
}
