'use client'
import MultiListSelect from "./busSelector";
import {getAllRoutes} from "../../api/transitDelayServiceApi";
import {useEffect, useState} from "react";

export default function RouteMultiSelector({feedId, currRouteList, setCurrRouteList}) {
    const [busOptions, setBusOptions] = useState([]);
    useEffect(() => {
        (async () => {
            const response = await getAllRoutes(feedId);
            if (response === null) {
                setBusOptions([]);
            }
            setBusOptions(response);
            setCurrRouteList(response.slice(0, 4));
        })();
    }, [])
    return <MultiListSelect busOptions={busOptions} currBusList={currRouteList} setCurrBusList={setCurrRouteList}/>
}