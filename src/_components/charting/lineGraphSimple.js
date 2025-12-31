'use client'
import {useEffect, useState} from "react";
import {getGraphDataByDays} from "../../api/transitDelayServiceApi";
import {LinearProgress} from "@mui/material";
import {Line} from "react-chartjs-2";


export default function BusDelayLineGraph({yAxisDesc, feedId, graphType, daysInPast, routes, yAxisMin}) {
    const [lineGraphData, setLineGraphData] = useState(undefined);
    useEffect(() => {
        setLineGraphData(undefined);
        if (routes.length === 0) {
            return;
        }
        (async () => {
            let graphDataResponse = await getGraphDataByDays(feedId, graphType, daysInPast, routes);
            setLineGraphData(graphDataResponse);
        })();
    }, [feedId, graphType, daysInPast, routes])
    const options = {
        maintainAspectRatio: false, scales: {
            y: {
                title: {
                    display: true,
                    text: yAxisDesc,
                    min: yAxisMin
                }
            }, x: {
                title: {
                    display: true, text: "Date"
                }
            }
        }
    }
    return (<div style={{height: 500}} className="h-full w-full grid place-items-center">
        {lineGraphData ? <Line options={options} data={lineGraphData}/> : <ChartSkeleton/>}
    </div>);
}

function ChartSkeleton() {
    return <LinearProgress/>;
}