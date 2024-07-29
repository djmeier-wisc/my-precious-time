import dynamic from "next/dynamic";
import Link from "next/link";
import { formatLink } from "utils/linkFormat";
export default async function AgenciesPage() {
    const agencies = await fetch("https://api.my-precious-time.com/v1/agencies/all", { next: { revalidate: 5 } })
        .then(r => r.json())
        .then(r => r.filter(a=> a?.status !== "UNAUTHORIZED"))
    const states = Array.from(new Set(agencies.map(i => i.state))).sort();
    const AgencyCheckBox = dynamic(() => import('../../agency/agencyCheckBox'), { ssr: false });
    return (
        <main >
            {states.map(state =>
                <div className="border-b-4 border-slate-400 grid sm:grid-cols-1 md:grid-cols-4 justify-self-center p-5 m-5 mx-10 px-10 bg-slate-300 rounded overflow-hidden shadow-lg w-9/10" key={state}>
                    <h1 className="col-span-1 py-5 pb-2 text-xl text-slate-900">
                        {state}&nbsp;
                    </h1>
                    <div className={"col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 place-items-center"}>
                        {agencies.filter(a => a?.state === state).sort(sortByName).map(agency => {
                            return (
                                <div className={"grid grid-rows-2 gap-2 h-full block p-3 text-slate-1000 bg-slate-350 hover:bg-slate-400 rounded transition ease-in-out"}
                                    key={agency?.id}>
                                    <div className="grid grid-cols-2 justify-items-center items-center text-center align-middle">
                                        <p>
                                            {agency?.name}
                                        </p> 
                                        <div className="p-2">
                                            {<AgencyCheckBox feedId={agency?.id} />}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 justify-items-center items-center text-center align-middle">
                                        <Link 
                                            className="p-2 hover:shadow-lg bg-slate-300 rounded transition ease-in-out border border-solid border-slate-900"
                                            href={formatLink(getGraphUrl(agency))}>
                                            Delay Graph
                                        </Link>
                                        <Link 
                                            className="p-2 hover:shadow-lg bg-slate-300 rounded transition ease-in-out border border-solid border-slate-900"
                                            href={formatLink(getMapUrl(agency))}>
                                            Delay Map
                                        </Link>
                                    </div>
                                </div>)
                        })}
                    </div>
                </div>
            )}
        </main>
    );
}

function getGraphUrl(agency) {
    return "/" + agency?.state + "/" + agency?.name + "/" + agency?.id + "/graph"
}

function getMapUrl(agency) {
    return "/" + agency?.state + "/" + agency?.name + "/" + agency?.id + "/map"
}

function sortByName(agency1, agency2) {
    if(agency1?.name < agency2?.name) {
        return -1;
    }
    if(agency1?.name > agency2?.name) {
        return 1;
    }
    return 0;
}