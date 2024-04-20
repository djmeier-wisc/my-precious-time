export default async function GraphText({feedId}) {
    const agency = await fetch("https://api.my-precious-time.com/v1/agencies/" + feedId).then(r=>r.json());
    return (
        <>
            <h1 className="text-center py-5 text-3xl text-slate-100">
                How delayed is your 🚎?&nbsp;
            </h1>
            <p className="px-3 text-slate-200 text-center">
                Welcome, {agency.name} ({agency.state}) riders! <br /><br />
                {agency.status !== 'ACT' && 
                    "This feed may have issues with its polling, so you may see issues with the graph. Rest assured we are working on the issue!"
                }
                You can track the delay of your favorite routes using the tools on the right. <br /><br />
                Select the Start Date, End Date, and number of points (units) on the right hand side <br /><br />
                Data is gathered every 5 minutes, pending service availability. <br /><br />
                This is a free project, so please consider donating! <br /><br />
            </p>
            <h1 className="text-center py-5 text-3xl text-slate-100 text-center">
                Change Metrics:
            </h1>
        </>
    );
}