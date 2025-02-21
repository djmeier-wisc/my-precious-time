'use client'
import {Cancel, CheckCircle, CheckCircleOutline} from "@mui/icons-material";
import {CircularProgress, Tooltip} from "@mui/material";
import {useEffect, useState} from "react";

export default function AgencyCheckBox({feedId}) {
    const [feedStatus, setFeedStatus] = useState(undefined);
    useEffect(() => {
        fetch("https://api.my-precious-time.com/v1/agencies/" + feedId)
            .then(res => {
                if (res.ok) return res.json();
                else {
                    throw new Error();
                }
            })
            .then(res => {
                setFeedStatus(res?.status)
            });
    })
    return (
        <>
            {feedStatus === undefined &&
                <CircularProgress size={20}/>}
            {feedStatus === 'ACT' &&
                <Tooltip title="Active Feed: We are successfully polling this feed.">
                    <CheckCircle/>
                </Tooltip>}

            {['UNAVAILABLE', 'OUTDATED'].includes(feedStatus) &&
                <Tooltip title="Issue Feed: Due to errors in our code, there may be intermittent gaps in data.">
                    <CheckCircleOutline color="warning"/>
                </Tooltip>}
            {!['ACT', 'UNAVAILABLE', 'OUTDATED', undefined].includes(feedStatus) &&
                <Tooltip title="Currently Unsupported Feed: We aren't polling this feed due authentication issues.">
                    <Cancel color="error"/>
                </Tooltip>}
        </>);
}