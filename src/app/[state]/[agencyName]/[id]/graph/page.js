import ChartMenu from "app/charting/chartMenu";

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
export default function GraphPage({ params }) {
    return (
        <ChartMenu state={deformatLink(params.state)} feedName={deformatLink(params.agencyName)} feedId={deformatLink(params.id)} />
    );
}
export function formatLink(url) {
    return url.trim().replaceAll(' ', "%20").replaceAll("(", "%28").replaceAll(")","%29")
}

export function deformatLink(url) {
    return url.trim().replaceAll("%20"," ").replaceAll("%28","(").replaceAll("%29",")")
}