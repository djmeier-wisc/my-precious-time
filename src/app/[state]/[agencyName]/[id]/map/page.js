import {formatLink} from "utils/linkFormat";
import "leaflet/dist/leaflet.css";
import MapWithControls from "../../../../../_components/map/mapWithControls";

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

export default async function LineDelayMap(props) {
    const params = await props.params;
    return (
        <MapWithControls feedId={params.id} feedName={params.agencyName} state={params.state}/>
    );
}