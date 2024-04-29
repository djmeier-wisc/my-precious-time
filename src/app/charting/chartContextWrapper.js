'use client'
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ChartContextProvider } from "./chartContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function ChartContextWrapper({ children }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ChartContextProvider>
                {children}
            </ChartContextProvider>
        </LocalizationProvider>
    )
}