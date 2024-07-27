
import OpenStreetMap from "app/map/openStreetMap";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { formatLink } from "utils/linkFormat";
import "leaflet/dist/leaflet.css";

export async function generateStaticParams() {
    const agencies = await fetch("https://api.my-precious-time.com/v1/agencies/all").then(r => r.json());
    // Get the paths we want to pre-render based on posts
    const paths = agencies.map((/** @type {{ state: string; name: string; id: any; }} */ feed) => (
        {
            state: formatLink(feed.state),
            agencyName: formatLink(feed.name),
            id: formatLink(feed.id),
        }
    ));
    return paths;
}
export default function LineDelayMap({ params }) {
    const Map = useMemo(() => dynamic(() => import('app/map/openStreetMap'), {
        loading: () => <p>Loading map</p>,
        ssr: false
    }), []);
    return (<Map />);
}