import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { problemsData } from "../data/problemsData";
import useSavedItems from "../hooks/useSavedItems";

const Problems = () => {
  const [query, setQuery] = useState("");
  const [savedOnly, setSavedOnly] = useState(false);
  const { savedSet, toggleSaved } = useSavedItems("saved_problems");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return problemsData.filter((item) => {
      const inText =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.symptoms.toLowerCase().includes(q) ||
        item.rootCause.toLowerCase().includes(q);
      const inSaved = !savedOnly || savedSet.has(item.slug);
      return inText && inSaved;
    });
  }, [query, savedOnly, savedSet]);

  return (
    <section
      id="problems"
      className="
        min-h-screen
        bg-[#0b0f1a]
        px-6 py-32
        border-t border-white/5
      "
    >
      <div className="max-w-6xl mx-auto animate-fade-up">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Problems & Solutions</h2>
        <p className="text-gray-400 mb-6 max-w-3xl">
          Click any issue to open full troubleshooting guide with diagnosis commands, root-cause reasoning, fix plan, and verification.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#101628] p-4 mb-8 grid md:grid-cols-[1fr_auto] gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search issue by error, symptom, or root cause"
            className="w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-300"
          />
          <button
            type="button"
            onClick={() => setSavedOnly((prev) => !prev)}
            className={`px-3 py-1.5 rounded-full text-xs border transition ${
              savedOnly
                ? "bg-indigo-500/20 text-indigo-200 border-indigo-400/30"
                : "bg-white/5 text-gray-300 border-white/15 hover:border-indigo-300/40"
            }`}
          >
            Saved only
          </button>
        </div>

        <p className="text-sm text-gray-400 mb-5">Showing {filtered.length} of {problemsData.length} problems</p>

        <div className="grid gap-5 md:grid-cols-2">
          {filtered.map((item) => {
            const isSaved = savedSet.has(item.slug);
            return (
              <article
                key={item.id}
                className="p-5 rounded-xl bg-[#0e1322] border border-white/10 hover:border-cyan-400/40 transition"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-white font-medium">{item.title}</h3>
                  <button
                    type="button"
                    onClick={() => toggleSaved(item.slug)}
                    className={`text-xs px-2 py-1 rounded border transition ${
                      isSaved
                        ? "border-amber-400/45 bg-amber-500/15 text-amber-200"
                        : "border-white/20 bg-white/5 text-gray-300 hover:border-amber-300/50"
                    }`}
                  >
                    {isSaved ? "Saved" : "Save"}
                  </button>
                </div>

                <div className="flex items-center justify-between gap-3 mb-2">
                  <p className="text-gray-400 text-sm">{item.symptoms}</p>
                  <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300 border border-white/10 shrink-0">
                    {item.readTime}
                  </span>
                </div>

                <Link
                  to={`/problems/${item.slug}`}
                  className="inline-flex items-center rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-200 hover:border-cyan-300/60 mt-2"
                >
                  Open solution guide
                </Link>
              </article>
            );
          })}

          {filtered.length === 0 && (
            <div className="rounded-xl border border-white/10 bg-[#101628] p-6 text-sm text-gray-300 md:col-span-2">
              No matching issue found. Try searching with different keyword.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Problems;
