'use client'
import DelayLineChart from "./charting/chart";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { useState } from "react";
import GraphTypeSelector from "./charting/graphTypeSelector";
import GraphText from "./main-text/graph-text";

export const URL_AVG = "/api/v1/average/allLines";
export const URL_MAX = "/api/v1/max/allLines";
export const URL_PERC = "/api/v1/percent/allLines";
export default function Home() {
  const [selectedGraph, setSelectedGraph] = useState(URL_AVG);
  let selectorOptions = {
    setSelectedGraph: setSelectedGraph, selectedGraph: selectedGraph};
  
  return (
    <main className="h-full">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="grid grid-cols-2 lg:grid-cols-6 h-full">
          <div className="col-span-2 px-3 bg-slate-800 h-full">
            <GraphText />
            <div className="grid grid-rows-3 gap-4">
              <GraphTypeSelector {...selectorOptions} url={URL_AVG} displayText="Average Delay in Minutes"  />
              <GraphTypeSelector {...selectorOptions} url={URL_MAX} displayText="Max Delay in Minutes"  />
              <GraphTypeSelector {...selectorOptions} url={URL_PERC} displayText="Percent on Time (within 5 minutes of schedule)"  />
            </div>
          </div>
          <div className="col-span-4 bg-slate-300">
            <div className="px-3 pt-5">
              <DelayLineChart baseUrl={selectedGraph} />
            </div>

          </div>
        </div>
      </LocalizationProvider>
    </main>
  )
}