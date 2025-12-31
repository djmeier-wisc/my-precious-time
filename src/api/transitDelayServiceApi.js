export const BASE_URL = "https://api-mpt.dougmeier.dev";
// export const BASE_URL = "http://localhost:8080";
import dayjs from "dayjs";

export async function getAllRoutes(feedId) {
    try {
        const res = await fetch(BASE_URL + "/v1/getAllRouteNames?agencyId=" + feedId);
        if (!res.ok) {
            console.log("Failed to get routeNames for feedId: " + feedId);
            return [];
        }
        return await res.json();
    } catch (error) {
        return null;
    }
}

export async function getGeoJsonFor(feedId, routes, numDays, hourStarted, hourEnded, daysSelected) {
    if (!routes || !feedId || routes.length === 0) {
        return null;
    }
    const u = new URLSearchParams();
    if (routes) {
        routes.forEach(r => u.append("routeNames", r))
    }
    if (hourStarted !== undefined) u.append("hourStarted", hourStarted);
    if (hourEnded !== undefined) u.append("hourEnded", hourEnded);
    if (daysSelected !== undefined) {
        daysSelected.forEach(daySelected => {
            u.append("daysSelected", daySelected);
        });
    }
    if (numDays !== undefined) u.append("searchPeriod", numDays);
    try {
        const res = await fetch(BASE_URL + "/v1/map/" + feedId + "/delayLines?" + u.toString())
        if (!res.ok) {
            console.log("Failed to get geoJson for feedId: " + feedId + "and route: " + route);
            return null;
        }
        return res.json();
    } catch (error) {
        return null;
    }
}

export const GraphTypes = {
    AVG: "average",
    MAX: "max",
    PERCENT: "percent"
}

export async function getGraphData(feedId, type = "average", graphOptions) {
    let graphUrl = `${BASE_URL}/v1/graph/${type}/${feedId}`
    let params = []
    if (graphOptions?.startTime) params.push('startTime=' + graphOptions?.startTime);
    if (graphOptions?.endTime) params.push('endTime=' + graphOptions?.endTime);
    if (graphOptions?.units) params.push('units=' + graphOptions?.units);
    if (graphOptions?.useColor) params.push("useColor=" + graphOptions?.useColor);
    if (graphOptions?.routes) graphOptions?.routes.forEach(busState => params.push('routes=' + busState));
    if (graphOptions?.upperOnTimeThreshold) params.push("upperOnTimeThreshold=" + graphOptions.upperOnTimeThreshold);
    if (graphOptions?.lowerOnTimeThreshold) params.push("lowerOnTimeThreshold=" + graphOptions.lowerOnTimeThreshold)
    graphUrl += "?" + params.join("&");
    let res = await fetch(graphUrl);
    if (res.ok) return await res.json();
    else return null;
}

export async function getGraphDataByDays(feedId, type, daysInPast, routes) {
    let graphOptions = {
        startTime: dayjs().endOf('day').subtract(daysInPast, 'days').unix(),
        endTime: dayjs().endOf('day').unix(),
        units: daysInPast === 1 ? 24 : daysInPast,
        routes: routes
    };
    return getGraphData(feedId, type, graphOptions)
}

export async function getAgencyById(feedId) {
    let url = `${BASE_URL}/v1/agencies/${feedId}`;
    let res = await fetch(url);
    if (res.ok) return await res.json();
    else return null;
}

export async function getAllFeeds() {
    let url = `${BASE_URL}/v1/agencies/all`;
    let res = await fetch(url);
    if (res.ok) return await res.json();
    else return null;
}

async function getRandomFeedId() {
    let allFeeds = await getAllFeeds();
    return allFeeds[Math.floor(Math.random() * allFeeds.length)]
}

export async function getRandomShape(feedId) {
    if (feedId == undefined) {
        feedId = (await getRandomFeedId())?.id;
    }
    let url = `${BASE_URL}/v1/map/${feedId}/randomRoute`
    let res = await fetch(url);
    if (res.ok) return await res.json();
    else return null;
}