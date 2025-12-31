import { BASE_URL } from 'api/transitDelayServiceApi';
import dynamic from 'next/dynamic';
import Link from 'next/link';

export default async function Home() {
    const agencies = await fetch(`${BASE_URL}/v1/agencies/all`, {next: {revalidate: 5}})
        .then(r => r.json());

    const AgencyCheckBox = dynamic(() => import('../_components/agency/agencyCheckBox'), {ssr: false});
    const MapBackground = dynamic(() => import('../_components/background/mapBackground'), {ssr: false});
    return (
        <main
            className="text-slate-100 flex flex-col items-center">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-300 to-slate-800 opacity-90 z-10"/>
            <MapBackground/>
            <div className="z-20">
                <section className="text-center py-16 flex flex-col gap-4">
                    <h1 className="text-5xl font-extrabold mb-4 text-slate-900">Measuring Transit Delay Since 2023</h1>
                    <p className="text-2xl text-slate-800">A transit delay tracker for multiple agencies 🚌</p>
                    <p className="text-2xl text-slate-800">Because your time waiting for the bus is <Link
                        href="https://open.spotify.com/track/6m5mVZckUxG2spCFzSxQX8?si=5ad25aca3d60481c"
                        target="_blank"
                        className="underline">precious</Link> too!</p>
                    <p className="text-lg text-slate-800">Focusing on Wisconsin, with more agencies on the way :)</p>
                </section>
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 w-full max-w-6xl">
                    {agencies.map(agency => (
                        <Link
                            key={agency?.id}
                            className="bg-slate-700 p-6 rounded-2xl hover:bg-slate-600 transition flex flex-col shadow-2xl"
                            href={`/view/${agency?.id}`}
                        >
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-xl font-semibold text-white">{agency?.name}</h2>
                                <div className="m-5">
                                    <AgencyCheckBox feedId={agency?.id}/>
                                </div>
                            </div>
                        </Link>
                    ))}
                </section>
            </div>
        </main>
    );
}
