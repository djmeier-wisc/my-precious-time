import {formatLink} from "../../../utils/linkFormat";
import {Line} from "react-chartjs-2";
import BusDelayLineGraph from "../../../_components/charting/lineGraphSimple";

export async function generateStaticParams() {
    const agencies = await fetch("https://api.my-precious-time.com/v1/agencies/all").then(r => r.json());
    // Get the paths we want to pre-render based on posts
    const paths = agencies.map((/** @type {{ state: string; name: string; id: any; }} */ feed) => (
        {
            id: formatLink(feed.id),
        }
    ));
    return paths;
}
export default function LineDelayMap({ params }) {
    return (
        <main>
            <BusDelayLineGraph />
        </main>
    )
}