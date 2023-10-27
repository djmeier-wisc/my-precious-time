import LineChart from "./chart";

export default async function Home() {

  return (
    <main>
      <div className="grid grid-cols-6">
        <div className="col-span-4">
          <LineChart />
        </div>
        <div className="col-span-2">
          <h1 className="text-center py-5 text-3xl text-orange-600">
            How delayed is your 🚎?&nbsp;
          </h1>
          <div className="text-amber-50 px-2">
            <p className="py-2">
              Post network redesign, Madison&apos;s Metro Transit has been plagued with reliability issues. &nbsp;
            </p>
            <p className="py-2">
              Regardless of your opinions on the network redesign, it is important to understand how these delays can affect your travel. &nbsp;
            </p>
            <p className="py-2">
              This graph measures the average difference for schedule by line in seconds.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}