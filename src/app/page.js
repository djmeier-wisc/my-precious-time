'use client'
import DelayLineChart from "./chart";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { useState } from "react";
import GraphTypeSelector from "./graphTypeSelector";

export default function Home() {
  const URL_AVG = "/api/v1/average/allLines";
  const URL_MAX = "/api/v1/max/allLines";
  const URL_PERC = "/api/v1/percent/allLines";
  const [selectedGraph, setSelectedGraph] = useState(URL_AVG);
  let selectorOptoins = {
    setSelectedGraph: setSelectedGraph, selectedGraph: selectedGraph};
  
  return (
    <main className="h-full">
      <div className="h-8 bg-orange-300 text-slate-800">
        <p className="text-center py-1">🚧 Please excuse our mess, this site is under active development 🚧</p>
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="grid grid-cols-2 lg:grid-cols-6 h-full">
          <div className="col-span-2 px-3 bg-slate-800 h-full">
            <h1 className="text-center py-5 text-3xl text-slate-100">
              How delayed is your 🚎?&nbsp;
            </h1>
            <p className="px-3 text-slate-200 text-center">
              This graph measures the average difference from schedule in minutes, by day. <br /><br />
              Data is gathered every 5 minutes, pending service availability. <br /><br />
            </p>
            <h1 className="text-center py-5 text-3xl text-slate-100 text-center">
              Metrics:
            </h1>
            <div className="grid grid-rows-3 gap-4">
              <GraphTypeSelector {...selectorOptoins} url={URL_AVG} displayText="Average Delay in Minutes"  />
              <GraphTypeSelector {...selectorOptoins} url={URL_MAX} displayText="Max Delay in Minutes"  />
              <GraphTypeSelector {...selectorOptoins} url={URL_PERC} displayText="Percent on Time (within 5 minutes)"  />
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