import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-800 text-white flex items-center justify-center px-6 py-12">
      <div className="relative max-w-xl w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-lg">
        <div
          className="absolute -top-24 -left-24 h-52 w-52 rounded-full bg-blue-600/30 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -right-20 h-56 w-56 rounded-full bg-indigo-500/25 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative space-y-4 px-8 py-10">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-200">
            Something went wrong
          </p>
          <h1 className="text-3xl font-bold sm:text-4xl">We hit a snag</h1>
          <p className="text-sm leading-relaxed text-zinc-200/80">
            An unexpected error occurred while loading this page. Please retry
            the action or head back to safety. If the issue persists, our team
            has been notified.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-zinc-900 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Return home
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-lg border border-white/30 px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/5"
            >
              Back to dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
