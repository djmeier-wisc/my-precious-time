// const BASE_URL = "https://api.my-precious-time.com";
const BASE_URL = "http://localhost:8080";
export async function getAllRoutes(feedId) {
    const res = await fetch(BASE_URL + "/v1/getAllRouteNames?agencyId=" + feedId);
    if(!res.ok) {
        console.log("Failed to get routeNames for feedId: " + feedId);
        return [];
    }
    return await res.json();
}

export async function getGeoJsonFor(feedId, route, numDays, hourStarted, hourEnded, daysSelected) {
    if(!route || !feedId || route.length == 0) {
        return null;
    }
    const u = new URLSearchParams({routeName: route});
    if (hourStarted !== undefined) u.append("hourStarted", hourStarted);
    if (hourEnded !== undefined) u.append("hourStarted", hourEnded);
    if (daysSelected !== undefined) {
        daysSelected.forEach(daySelected => {
            u.append("daysSelected",daySelected);
        });
    }
    if (numDays !== undefined) u.append("numDaysAgo", numDays)
    const res = await fetch(BASE_URL + "/v1/map/"+feedId+"/delayLines?"+u.toString())
    if (!res.ok) {
        console.log("Failed to get geoJson for feedId: " + feedId + "and route: " + route);
        return null;
    }
    return res.json();
}