'use client'
import DelayLineChart from "./charting/chart";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { useState } from "react";
import GraphTypeSelector from "./charting/graphTypeSelector";
import GraphText from "./main-text/graph-text";
import { CONST_AVG, CONST_MAX, CONST_PERC, ChartContextProvider} from "./charting/chartContext";


export default function Home() {
  
  return (
    <ChartContextProvider>
    <main className="h-screen">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="grid grid-cols-2 lg:grid-cols-6 h-full">
          <div className="col-span-2 px-3 bg-slate-800">
            <GraphText />
            <div className="grid grid-rows-3 gap-4">
              <GraphTypeSelector curr={CONST_AVG} />
              <GraphTypeSelector curr={CONST_MAX} />
              <GraphTypeSelector curr={CONST_PERC} />
            </div>
          </div>
          <div className="col-span-4 bg-slate-300">
            <div className="px-3 pt-5">
              <DelayLineChart />
            </div>

          </div>
        </div>
      </LocalizationProvider>
    </main>
    </ChartContextProvider>
  )
}