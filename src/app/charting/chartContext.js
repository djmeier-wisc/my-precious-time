import { createContext, useContext, useState } from "react";

export const CONST_AVG = {
    url: "https://api.my-precious-time.com/v1/average/allLines",
    desc: "Average Delay in Minutes"
};
export const CONST_MAX = {
    url: "https://api.my-precious-time.com/v1/max/allLines",
    desc: "Max Delay in Minutes"
};
export const CONST_PERC = { url: "https://api.my-precious-time.com/v1/percent/allLines", desc: "Percent on Time (within 5 minutes of schedule)" };
const ChartContext = createContext(null);
export function ChartContextProvider({ children }) {
    const [chartContext, setChartContext] = useState(CONST_AVG);
    return (
        <ChartContext.Provider value={{chartContext, setChartContext}}>{children}</ChartContext.Provider>
    );
}

export function useChartContext() {
    return useContext(ChartContext);
}