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

import { Line } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
export default function LineChart() {
    const [data, setData] = useState({});
    const [fetchedData, setFetchedData] = useState(false);
    const [isError, setIsError] = useState(false);
    const options = {
        responsive: true,
        scales: {
            y: {
                title: {
                    display: true,
                    text: "Seconds Difference from Schedule"
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
        fetch("/api/v1/allLines").catch(err => {
            setFetchedData(false);
            setIsError(true);
        }).then(res => res.json()).then(data => {
            setData(data);
            setFetchedData(true);
        });
    }, []);
    return (
        <>
            {fetchedData && !isError && <Line options={options} data={data} />}
            {!fetchedData && !isError && <p>Fetching data...</p>}
            {isError && <p>Sorry, we encountered an error from our server. Please try again soon.</p>}
        </>
    );
}