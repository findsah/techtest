import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <main className="flex flex-col items-center justify-center text-center gap-8 px-4">
        <div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Games Library
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Browse our collection of games with proper loading and error handling.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <Link
            href="/games"
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-lg"
          >
            View Games
          </Link>
          <a
            href="https://github.com/findsah/techtest"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors text-lg"
          >
            View on GitHub
          </a>
        </div>
      </main>
    </div>
  );
}
