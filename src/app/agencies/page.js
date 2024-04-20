import { Cancel, CheckCircle, CheckCircleOutline } from "@mui/icons-material";
import { Tooltip } from "@mui/material";

export default async function AgenciesPage() {
    const agencies = await fetch("https://api.my-precious-time.com/v1/agencies/all", { next: { revalidate: 3600 } }).then(r => r.json());
    const states = Array.from(new Set(agencies.filter(a=>a.status === "ACT").map(i => i.state))).sort();
    return (
        <main >
            {states.map(state =>
                <div className="border-b-4 border-slate-400 grid grid-cols-4 justify-self-center p-5 m-5 mx-10 px-10 bg-slate-300 rounded overflow-hidden shadow-lg w-9/10" key={state}>
                    <h1 className="col-span-1 py-5 pb-2 text-xl text-slate-900">
                        {state}&nbsp;
                    </h1>
                    <div className={"col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 place-items-center"}>
                        {agencies.filter(a => a?.state === state).sort(sortByStatus).map(agency => {
                            const isActive = agency.status === 'ACT';
                            const hoverClasses = isActive ? "hover:shadow-lg hover:bg-slate-400":"";
                            return (
                            <a className={"flex grow justify-items-center items-center block text-center align-middle p-3 text-slate-1000 bg-slate-350 rounded transition ease-in-out" + hoverClasses}
                                key={agency?.id} 
                                href={getUrlIfActOrUndefined(agency)}>
                                    {agency?.name} {checkBoxSelector(agency?.status)}
                                    </a>)
                        })}
                    </div>
                </div>
            )}
        </main>
    );
}

function checkBoxSelector(status) {
    if(status === "ACT") {
        return (
        <Tooltip title="Active Feed: We are successfully polling this feed."><CheckCircle />
        </Tooltip>)
    } else if (status === "UNAVAILABLE") {
        return (<Tooltip title="Issue Feed: Due to errors in our code, there may be intermittent gaps in data."><CheckCircleOutline  color="warning" /></Tooltip>)
    } else {
        return (<Tooltip title="Pending Feed: We aren't polling this feed due to authentication issues or errors in our code."><Cancel color="error" /></Tooltip>)
    }
}

function getUrlIfActOrUndefined(agency) {
    if(agency?.status === "ACT" || agency?.status === "UNAVAILABLE") {
        return "/" + agency?.id + "/graph"
    } else {
        return undefined;
    }
}

function sortByStatus(agency1, agency2) {
    console.log(agency1.name,mapStatusToInt(agency1?.status))
    return mapStatusToInt(agency1?.status) - mapStatusToInt(agency2?.status);
}

function mapStatusToInt(status) {
    if(status === "ACT") {
        return 3;
    } else if (status = "UNAVAILABLE") {
        return 2;
    } else {
        return 3;
    }
}