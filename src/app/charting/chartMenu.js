
'use client'
import { CONST_AVG, CONST_MAX, CONST_PERC } from "app/charting/chartContext";
import ChartWrapper from "app/charting/chartContextWrapper";
import GraphTypeSelector from "app/charting/graphTypeSelector";
import GraphText from "app/main-text/graph-text";
import DelayLineChart from "./chart";
import { getGraphUrl } from "app/agencies/page";
import Link from "next/link";
import { formatLink } from "utils/linkFormat";
export default function ChartMenu({ state, feedName, feedId }) {
    return (
        <main className="h-[calc(100vh-65px)]">
            <div className="grid grid-cols-2 lg:grid-cols-6 h-full">
                <ChartWrapper>
                    <div className="col-span-2 px-3 bg-slate-800">
                        <GraphText state={state} feedName={feedName} />
                        <div className="grid grid-rows-3 gap-4 py-5">
                            <GraphTypeSelector curr={CONST_AVG} />
                            <GraphTypeSelector curr={CONST_MAX} />
                            <GraphTypeSelector curr={CONST_PERC} />
                        </div>
                    </div>
                    <div className="col-span-4 bg-slate-300">
                        <div className="px-3 pt-5">
                            <DelayLineChart feedId={feedId} />
                        </div>
                    </div>
                </ChartWrapper>
            </div>
        </main>
    )
}