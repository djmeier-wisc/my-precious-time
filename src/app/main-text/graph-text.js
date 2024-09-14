import { getGraphUrl, getMapUrl } from "app/agencies/page";
import Link from "next/link";
import { deformatLink, formatLink } from "utils/linkFormat";

export default async function GraphText({ state, feedName, feedId }) {
    return (
        <>

            <div className="flex justify-center items-center relative py-3">
                <h1 className="text-center text-2xl text-slate-100 pr-1 absolute left-1/2 transform -translate-x-1/2">
                    {state} - {deformatLink(feedName)}
                </h1>
                <Link
                    className="p-2 ml-auto hover:shadow-lg bg-slate-300 rounded transition ease-in-out border border-solid border-slate-900"
                    href={formatLink(getMapUrl({ state: state, id: feedId, name: feedName }))}>
                    Map
                </Link>
            </div>
            <h1 className="text-center text-bold py-5 text-xl text-slate-100">
                How delayed is your 🚎?
            </h1>
            <p className="px-3 text-slate-200 text-center">
                You can track the delay of your favorite routes using the tools on the right. <br /><br />
                Select the Start Date, End Date, and number of points (units) on the right hand side <br /><br />
                Data is gathered every 5 minutes, pending service availability. <br /><br />
            </p>
            <h1 className="text-center py-5 text-3xl text-slate-100 text-center">
                Change Metrics:
            </h1>
        </>
    );
}