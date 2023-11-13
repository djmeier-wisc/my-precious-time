export default function GraphTypeSelector({setSelectedGraph, selectedGraph, url, displayText}) {
    return (
        <button className="border-solid border-2 border-sky-500 w-full p-3 bg-slate-300 text-slate-800 disabled:text-slate-300 disabled:bg-slate-800 rounded-full" onClick={() => setSelectedGraph(url)} disabled={selectedGraph === url}>{displayText}</button>
    );
}