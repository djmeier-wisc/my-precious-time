import ChartMenu from "app/charting/chartMenu";

export async function generateStaticParams() {
    const agencies = await fetch("https://api.my-precious-time.com/v1/agencies/all").then(r => r.json());
    // Get the paths we want to pre-render based on posts
    const paths = agencies.map((feed) => (
        { id: feed.id }
    ))
    return paths;
}
export default function GraphPage({ params }) {
    return (
        <ChartMenu feedId={params.id} />
    );
}