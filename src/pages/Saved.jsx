import { Link } from "react-router-dom";
import { articlesData } from "../data/articlesData";
import { problemsData } from "../data/problemsData";
import useSavedItems from "../hooks/useSavedItems";

const Saved = () => {
  const {
    saved: savedArticleSlugs,
    savedSet: savedArticleSet,
    toggleSaved: toggleArticleSaved,
  } = useSavedItems("saved_articles");
  const {
    saved: savedProblemSlugs,
    savedSet: savedProblemSet,
    toggleSaved: toggleProblemSaved,
  } = useSavedItems("saved_problems");

  const savedArticles = savedArticleSlugs
    .map((slug) => articlesData.find((item) => item.slug === slug))
    .filter(Boolean);

  const savedProblems = savedProblemSlugs
    .map((slug) => problemsData.find((item) => item.slug === slug))
    .filter(Boolean);

  const totalSaved = savedArticles.length + savedProblems.length;

  return (
    <section
      id="saved"
      className="
        min-h-screen
        bg-[#0b0f1a]
        px-6 py-32
        border-t border-white/5
      "
    >
      <div className="max-w-6xl mx-auto animate-fade-up">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Saved</h2>
        <p className="text-gray-400 mb-8 max-w-3xl">
          Your bookmarked items across Articles and Problems. Open details directly or remove from saved list.
        </p>

        <div className="rounded-xl border border-white/10 bg-[#101628] p-4 mb-8 text-sm text-gray-300">
          Total saved: <span className="text-white font-semibold">{totalSaved}</span> | Articles:{" "}
          <span className="text-white font-semibold">{savedArticles.length}</span> | Problems:{" "}
          <span className="text-white font-semibold">{savedProblems.length}</span>
        </div>

        <div className="space-y-10">
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <h3 className="text-xl font-semibold text-white">Saved Articles</h3>
              <Link
                to="/articles"
                className="text-xs px-3 py-1.5 rounded-lg border border-cyan-400/30 bg-cyan-500/10 text-cyan-200 hover:border-cyan-300/60"
              >
                Browse all articles
              </Link>
            </div>

            {savedArticles.length > 0 ? (
              <div className="space-y-4">
                {savedArticles.map((article) => (
                  <article
                    key={article.id}
                    className="p-5 rounded-xl bg-[#0e1322] border border-white/10 hover:border-cyan-400/40 transition"
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <h4 className="text-white font-semibold">{article.title}</h4>
                      <button
                        type="button"
                        onClick={() => toggleArticleSaved(article.slug)}
                        className={`text-xs px-2 py-1 rounded border transition ${
                          savedArticleSet.has(article.slug)
                            ? "border-amber-400/45 bg-amber-500/15 text-amber-200"
                            : "border-white/20 bg-white/5 text-gray-300"
                        }`}
                      >
                        Unsave
                      </button>
                    </div>
                    <p className="text-sm text-gray-300 mb-3">{article.summary}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-300 mb-4">
                      <span className="px-2 py-1 rounded-full border border-white/10 bg-white/5">{article.level}</span>
                      <span className="px-2 py-1 rounded-full border border-white/10 bg-white/5">{article.readTime}</span>
                    </div>
                    <Link
                      to={`/articles/${article.slug}`}
                      className="inline-flex items-center rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-200 hover:border-cyan-300/60"
                    >
                      Open article
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-white/10 bg-[#101628] p-5 text-sm text-gray-300">
                No saved articles yet.
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <h3 className="text-xl font-semibold text-white">Saved Problems</h3>
              <Link
                to="/problems"
                className="text-xs px-3 py-1.5 rounded-lg border border-cyan-400/30 bg-cyan-500/10 text-cyan-200 hover:border-cyan-300/60"
              >
                Browse all problems
              </Link>
            </div>

            {savedProblems.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {savedProblems.map((problem) => (
                  <article
                    key={problem.id}
                    className="p-5 rounded-xl bg-[#0e1322] border border-white/10 hover:border-cyan-400/40 transition"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h4 className="text-white font-semibold">{problem.title}</h4>
                      <button
                        type="button"
                        onClick={() => toggleProblemSaved(problem.slug)}
                        className={`text-xs px-2 py-1 rounded border transition ${
                          savedProblemSet.has(problem.slug)
                            ? "border-amber-400/45 bg-amber-500/15 text-amber-200"
                            : "border-white/20 bg-white/5 text-gray-300"
                        }`}
                      >
                        Unsave
                      </button>
                    </div>
                    <p className="text-sm text-gray-300 mb-3">{problem.symptoms}</p>
                    <span className="text-xs px-2 py-1 rounded-full border border-white/10 bg-white/5 text-gray-300">
                      {problem.readTime}
                    </span>
                    <div className="mt-4">
                      <Link
                        to={`/problems/${problem.slug}`}
                        className="inline-flex items-center rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-200 hover:border-cyan-300/60"
                      >
                        Open solution guide
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-white/10 bg-[#101628] p-5 text-sm text-gray-300">
                No saved problems yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Saved;
