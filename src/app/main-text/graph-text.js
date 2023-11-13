export default function GraphText() {
    return (
        <>
            <h1 className="text-center py-5 text-3xl text-slate-100">
                How delayed is your 🚎?&nbsp;
            </h1>
            <p className="px-3 text-slate-200 text-center">
                Welcome, Madison residents. I&apos;ve built this dashboard to measure the reliability of different Metro transit routes post-redesign. <br /><br />
                Data is gathered from <a target="blank" className="text-orange-300 underline underline-offset-1" href="https://cityofmadison.com/metro/business/information-for-developers">Metro&apos;s RealTime API</a> every 5 minutes, pending service availability. <br /><br />
            </p>
            <h1 className="text-center py-5 text-3xl text-slate-100 text-center">
                Change Metrics:
            </h1>
        </>
    );
}