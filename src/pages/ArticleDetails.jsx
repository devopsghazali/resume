import { Link, useParams } from "react-router-dom";
import { getArticleBySlug } from "../data/articlesData";
import useReadingProgress from "../hooks/useReadingProgress";
import ReadingProgressBar from "../components/ReadingProgressBar";
import CopyPageLinkButton from "../components/CopyPageLinkButton";

const buildPrompts = (article) => [
  `How would you apply '${article.title}' patterns in a multi-team production platform?`,
  `What trade-off is most important in this topic and why?`,
  "Which failure mode would you test first before going live?",
];

const ArticleDetails = () => {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);
  const progress = useReadingProgress();

  if (!article) {
    return (
      <section className="min-h-screen bg-[#0b0f1a] px-6 py-24 text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <Link to="/articles" className="text-cyan-300">Back to Articles</Link>
        </div>
      </section>
    );
  }

  const prompts = buildPrompts(article);

  return (
    <section className="min-h-screen bg-[#0b0f1a] px-6 py-24 text-white">
      <ReadingProgressBar value={progress} />

      <div className="max-w-6xl mx-auto grid lg:grid-cols-[220px_minmax(0,1fr)] gap-8">
        <aside className="hidden lg:block sticky top-24 self-start rounded-xl border border-white/10 bg-[#101628] p-4">
          <p className="text-xs tracking-wider uppercase text-cyan-300 mb-3">On This Page</p>
          <ul className="space-y-2 text-sm">
            <li><a href="#overview" className="text-gray-300 hover:text-cyan-200">Quick Overview</a></li>
            {article.sections.map((section, index) => (
              <li key={index}>
                <a href={`#section-${index}`} className="text-gray-300 hover:text-cyan-200">{section.heading}</a>
              </li>
            ))}
            <li><a href="#prompts" className="text-gray-300 hover:text-cyan-200">Interview Prompts</a></li>
          </ul>
        </aside>

        <div className="max-w-4xl">
          <Link to="/articles" className="inline-flex items-center text-sm text-cyan-300 hover:text-cyan-200 mb-6">
            Back to Articles
          </Link>

          <div className="mb-4 flex flex-wrap items-center gap-2">
            <CopyPageLinkButton />
            <span className="text-xs px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-200 border border-cyan-400/20">{article.level}</span>
            <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300 border border-white/10">Estimated reading: {article.readTime}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-3">{article.title}</h1>
          <p className="text-gray-300 mb-8 leading-relaxed">{article.summary}</p>

          <div id="overview" className="scroll-mt-24 rounded-xl border border-white/10 bg-[#101628] p-6 mb-6">
            <h2 className="text-xl font-semibold text-cyan-300 mb-3">Quick Overview</h2>
            <div className="grid md:grid-cols-3 gap-3 text-sm">
              <div className="rounded-lg border border-white/10 bg-black/10 p-3">
                <p className="text-cyan-200 font-semibold">Topic Depth</p>
                <p className="text-gray-300 mt-1">{article.level}</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/10 p-3">
                <p className="text-cyan-200 font-semibold">Reading Time</p>
                <p className="text-gray-300 mt-1">{article.readTime}</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/10 p-3">
                <p className="text-cyan-200 font-semibold">Sections</p>
                <p className="text-gray-300 mt-1">{article.sections.length} detailed blocks</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {article.sections.map((section, index) => (
              <article id={`section-${index}`} key={index} className="scroll-mt-24 rounded-xl border border-white/10 bg-[#101628] p-6">
                <h2 className="text-xl font-semibold text-cyan-300 mb-3">{section.heading}</h2>
                <p className="text-gray-300 leading-relaxed">{section.body}</p>
              </article>
            ))}
          </div>

          <div id="prompts" className="scroll-mt-24 rounded-xl border border-white/10 bg-[#101628] p-6 mt-6">
            <h2 className="text-xl font-semibold text-cyan-300 mb-3">Interview Discussion Prompts</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              {prompts.map((prompt, index) => (
                <li key={index}>- {prompt}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleDetails;
