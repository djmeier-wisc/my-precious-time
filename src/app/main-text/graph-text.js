export default async function GraphText({state, feedName}) {
    return (
        <>
            <h1 className="text-center py-5 text-3xl text-slate-100">
                {state} - {feedName}
            </h1>
            <h1 className="text-center py-5 text-3xl text-slate-100">
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