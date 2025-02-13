'use client'
import {Line} from "react-chartjs-2";
import {Suspense, useState} from "react";
import {getGraphDataByDays} from "../../api/transitDelayServiceApi";

export default function BusDelayLineGraph({yAxisDesc, feedId, graphType, daysInPast, routes}) {
    const [datasets, setDataSets] = useState({});
    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                title: {
                    display: true,
                    text: yAxisDesc
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
    return (
        <Suspense>
            <LineGraph />
        </Suspense>
    )
}

async function LineGraph(feedId, type, daysInPast, routes) {
    let resp = getGraphDataByDays(feedId, type, daysInPast, routes);
    return <Line options={options} data={datasets} />
}

function Fall