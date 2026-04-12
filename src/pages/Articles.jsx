import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { articlesData } from "../data/articlesData";
import useSavedItems from "../hooks/useSavedItems";

const levels = ["All", "Beginner", "Intermediate", "Advanced"];

const Articles = () => {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("All");
  const [savedOnly, setSavedOnly] = useState(false);
  const { savedSet, toggleSaved } = useSavedItems("saved_articles");

  const filtered = useMemo(() => {
    return articlesData.filter((article) => {
      const inLevel = level === "All" || article.level === level;
      const q = query.trim().toLowerCase();
      const inText =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.summary.toLowerCase().includes(q) ||
        article.sections.some((s) => s.heading.toLowerCase().includes(q));
      const inSaved = !savedOnly || savedSet.has(article.slug);
      return inLevel && inText && inSaved;
    });
  }, [query, level, savedOnly, savedSet]);

  return (
    <section
      id="articles"
      className="
        min-h-screen
        bg-[#0b0f1a]
        px-6 py-32
        border-t border-white/5
      "
    >
      <div className="max-w-6xl mx-auto animate-fade-up">
        <h2 className="text-3xl font-bold text-white mb-3">Articles</h2>
        <p className="text-gray-400 mb-6 max-w-3xl">
          Click any article to open full long-form write-up with practical DevOps reasoning and implementation guidance.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#101628] p-4 mb-8 grid md:grid-cols-[1fr_auto] gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by topic, architecture, or keyword"
            className="w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-300"
          />
          <div className="flex flex-wrap items-center gap-2">
            {levels.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setLevel(item)}
                className={`px-3 py-1.5 rounded-full text-xs border transition ${
                  level === item
                    ? "bg-cyan-500/20 text-cyan-200 border-cyan-400/30"
                    : "bg-white/5 text-gray-300 border-white/15 hover:border-cyan-300/40"
                }`}
              >
                {item}
              </button>
            ))}
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
        </div>

        <p className="text-sm text-gray-400 mb-5">Showing {filtered.length} of {articlesData.length} articles</p>

        <div className="space-y-5">
          {filtered.map((article) => {
            const isSaved = savedSet.has(article.slug);
            return (
              <article
                key={article.id}
                className="p-6 rounded-xl bg-[#0e1322] border border-white/10 hover:border-cyan-400/40 transition"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-200 border border-cyan-400/20">
                      {article.level}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300 border border-white/10">
                      {article.readTime}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleSaved(article.slug)}
                    className={`text-xs px-2 py-1 rounded border transition ${
                      isSaved
                        ? "border-amber-400/45 bg-amber-500/15 text-amber-200"
                        : "border-white/20 bg-white/5 text-gray-300 hover:border-amber-300/50"
                    }`}
                  >
                    {isSaved ? "Saved" : "Save"}
                  </button>
                </div>

                <h3 className="text-white text-lg font-semibold mb-2">{article.title}</h3>
                <p className="text-cyan-100/90 text-sm mb-3">{article.summary}</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Open full article to read detailed architecture, workflow, trade-offs, and production best practices.
                </p>

                <Link
                  to={`/articles/${article.slug}`}
                  className="inline-flex items-center rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-200 hover:border-cyan-300/60"
                >
                  Open article
                </Link>
              </article>
            );
          })}

          {filtered.length === 0 && (
            <div className="rounded-xl border border-white/10 bg-[#101628] p-6 text-sm text-gray-300">
              No article matches your search/filter. Try broader keywords.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Articles;
