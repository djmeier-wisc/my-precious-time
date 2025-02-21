import ViewPage from "./viewPage";
import {getAgencyById} from "../../../api/transitDelayServiceApi";

export async function generateStaticParams() {
    const agencies = await fetch("https://api.my-precious-time.com/v1/agencies/all").then(r => r.json());
    const paths = agencies.map((/** @type {{ state: string; name: string; id: any; }} */ feed) => (
        {
            id: feed.id
        }
    ));
    return paths;
}

export default async function LineDelayMap(props) {
    const params = await props.params;
    const agencyName = await getAgencyById(params.id)?.name;
    return (
        <main>
            <ViewPage feedId={params.id} agencyName={agencyName ? agencyName : "Unknown"}/>
        </main>
    )
}