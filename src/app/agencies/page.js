
import AgencyCheckBox from "agency/agencyCheckBox";
import { formatLink } from "app/[state]/[agencyName]/[id]/graph/page";
import dynamic from "next/dynamic";
import Link from "next/link";
export default async function AgenciesPage() {
    const agencies = await fetch("https://api.my-precious-time.com/v1/agencies/all", { next: { revalidate: 5 } }).then(r => r.json());
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
                        {agencies.filter(a => a?.state === state).sort(sortByStatus).map(agency => {
                            const isActive = agency.status === 'ACT';
                            const hoverClasses = isActive ? "hover:shadow-lg hover:bg-slate-400" : "";
                            return (
                                <Link className={"flex grow justify-items-center items-center block text-center align-middle p-3 text-slate-1000 bg-slate-350 rounded transition ease-in-out" + hoverClasses}
                                    key={agency?.id}
                                    href={formatLink(getFeedUrl(agency))}>
                                    <p>
                                        {agency?.name}
                                    </p> <div className="p-3">
                                        {<AgencyCheckBox feedId={agency?.id} />}
                                    </div>
                                </Link>)
                        })}
                    </div>
                </div>
            )}
        </main>
    );
}

function getFeedUrl(agency) {
    return "/" + agency?.state + "/" + agency?.name + "/" + agency?.id + "/graph"
}

function sortByStatus(agency1, agency2) {
    return mapStatusToInt(agency1?.status) - mapStatusToInt(agency2?.status);
}

function mapStatusToInt(status) {
    if (status === "ACT") {
        return 1;
    } else if (status = "UNAVAILABLE") {
        return 2;
    } else {
        return 3;
    }
}