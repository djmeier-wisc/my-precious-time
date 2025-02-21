'use client';

import RouteMultiSelector from "../../../_components/charting/routeMultiSelector";
import SingleListSelect from "../../../_components/charting/singleListSelector";
import {GraphTypes} from "../../../api/transitDelayServiceApi";
import {useEffect, useState} from "react";
import BusDelayLineGraph from "../../../_components/charting/lineGraphSimple";
import {
    CategoryScale,
    Chart as ChartJS,
    Colors,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip as ChartToolTip,
} from "chart.js";
import {Tooltip} from "@mui/material";
import {Help} from "@mui/icons-material";
import dynamic from "next/dynamic";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartToolTip, Legend, Colors);
const OpenStreetMapByFeedId = dynamic(() => import('../../../_components/map/openStreetMapByFeedId'), {ssr: false});
export default function ViewPage({feedId, agencyName}) {
    const daysOptions = ["1 Day", "7 Days", "30 Days", "90 Days", "1 Year"];
    const [routes, setRoutes] = useState([]);
    const [days, setDays] = useState("7 Days");
    const [daysInt, setDaysInt] = useState(7);
    useEffect(() => {
        switch (days) {
            case "1 Day":
                setDaysInt(1);
                break;
            case "7 Days":
                setDaysInt(7);
                break;
            case "30 Days":
                setDaysInt(30);
                break;
            case "90 Days":
                setDaysInt(90);
                break;
            case "1 Year":
                setDaysInt(365);
                break;
        }
    }, [days])
    return (
        <div className="flex flex-col lg:flex-row bg-slate-700 min-h-screen p-6 gap-4">
            <aside
                className="w-full lg:w-1/4 sticky lg:top-1 h-auto lg:h-screen p-6 bg-slate-300 rounded-2xl shadow-xl flex flex-col gap-4 text-slate-800">
                <h2 className="text-2xl font-bold">Transit Delay Analysis - {agencyName}</h2>
                <h3 className="text-lg font-bold">How delayed is your 🚎?</h3>
                <p>Track the delay of your favorite routes using the tools above.</p>
                <p>Select the Date Range and the routes you want to analyze.</p>
                <p>Data is gathered every 5 minutes, pending service availability.</p>
                <RouteMultiSelector
                    feedId={feedId}
                    currRouteList={routes}
                    setCurrRouteList={setRoutes}
                />
                <SingleListSelect
                    className="my-3"
                    options={daysOptions}
                    setCurrSelection={setDays}
                    currSelection={days}
                    labelName={"Date Range"}
                />
            </aside>
            <main className="w-full lg:w-3/4 space-y-6 lg:pl-6">
                <div className="bg-slate-300 p-4 rounded-2xl shadow-lg text-slate-800">
                    <OpenStreetMapByFeedId feedId={feedId} selectedRoutes={routes} numDays={daysInt}/>
                </div>
                <div className="bg-slate-300 p-4 rounded-2xl shadow-lg text-slate-800">
                    <div className="flex flex-row">
                        <h2 className="text-xl font-semibold mb-2">Average Delay</h2>
                        <Tooltip title="Average Delay in Minutes" className="m-1">
                            <Help/>
                        </Tooltip>
                    </div>
                    <BusDelayLineGraph
                        feedId={feedId}
                        graphType={GraphTypes.AVG}
                        yAxisDesc={'Average Delay (Minutes)'}
                        routes={routes}
                        daysInPast={daysInt}
                    />
                </div>
                <div className="bg-slate-300 p-4 rounded-2xl shadow-lg text-slate-800">
                    <div className="flex flex-row">
                        <h2 className="text-xl font-semibold mb-2">Percent On Time Delay</h2>
                        <Tooltip title="Percent on Time" className="m-1">
                            <Help/>
                        </Tooltip>
                    </div>
                    <BusDelayLineGraph
                        feedId={feedId}
                        graphType={GraphTypes.PERCENT}
                        yAxisDesc={'Percent On Time Delay (Minutes)'}
                        routes={routes}
                        daysInPast={daysInt}
                    />
                </div>
                <div className="bg-slate-300 p-4 rounded-2xl shadow-lg text-slate-800">
                    <div className="flex flex-row">
                        <h2 className="text-xl font-semibold mb-2">Max Delay</h2>
                        <Tooltip title="Max Delay in Minutes" className="m-1">
                            <Help/>
                        </Tooltip>
                    </div>
                    <BusDelayLineGraph
                        feedId={feedId}
                        graphType={GraphTypes.MAX}
                        yAxisDesc={'Max Delay (Minutes)'}
                        routes={routes}
                        daysInPast={daysInt}
                    />
                </div>
            </main>
        </div>);
}
