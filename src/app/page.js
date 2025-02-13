import dynamic from 'next/dynamic';
import Link from 'next/link';

export default async function Home() {
    const agencies = await fetch("https://api.my-precious-time.com/v1/agencies/all", { next: { revalidate: 5 } })
        .then(r => r.json())
        .then(r => r.filter(a => a?.status !== "UNAUTHORIZED"));

    const AgencyCheckBox = dynamic(() => import('../_components/agency/agencyCheckBox'), { ssr: false });

    return (
        <main className="h-screen bg-gradient-to-b from-slate-300 to-slate-800 text-slate-100 flex flex-col items-center">
            {/* Hero Section */}
            <section className="text-center py-16">
                <h1 className="text-5xl font-extrabold mb-4 text-slate-900">Welcome to My Precious Time</h1>
                <p className="text-lg text-slate-700">A transit delay tracker for multiple agencies 🚌</p>
            </section>

            {/* Agency Cards */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 w-full max-w-6xl">
                {agencies.map(agency => (
                    <Link
                        key={agency?.id}
                        className="bg-slate-700 p-6 rounded-2xl shadow-lg hover:bg-slate-600 transition flex flex-col"
                        href={`/view/${agency?.id}`}
                    >
                        {/* Header Row: Name and Checkbox */}
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-xl font-semibold text-white">{agency?.name}</h2>
                            <div className="m-5">
                                <AgencyCheckBox feedId={agency?.id} />
                            </div>
                        </div>
                    </Link>
                ))}
            </section>
        </main>
    );
}
