import Link from "next/link";
import { formatLink } from "./[state]/[agencyName]/[id]/graph/page";

export default function Home() {
  
  return (
    <div className="bg-gradient-to-t from-slate-800 to-slate-300 h-screen flex flex-row justify-center items-center">
      <main className="text-slate-800 text-center grid grid-cols-1 gap-5 justify-center items-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Precious Time</h1>
        <p className="text-lg mb-8">A transit delay tracker for multiple agencies 🚌 !</p>
        <Link href="/agencies" className="mx-1 bg-slate-300 text-gray-800 py-2 px-6 rounded-full text-lg hover:bg-gray-200 transition duration-300">All Agencies</Link>
        <Link href={formatLink("/Wisconsin/Metro Transit/394/graph")} className="mx-1 bg-slate-300 text-gray-800 py-2 px-6 rounded-full text-lg hover:bg-gray-200 transition duration-300">Madison (WI) Reliability Data</Link>
      </main>
    </div>
  )
}