import { Link, useParams } from "react-router-dom";
import { getProblemBySlug } from "../data/problemsData";
import useReadingProgress from "../hooks/useReadingProgress";
import ReadingProgressBar from "../components/ReadingProgressBar";
import CopyCommandButton from "../components/CopyCommandButton";
import CopyPageLinkButton from "../components/CopyPageLinkButton";

const ProblemDetails = () => {
  const { slug } = useParams();
  const problem = getProblemBySlug(slug);
  const progress = useReadingProgress();

  if (!problem) {
    return (
      <section className="min-h-screen bg-[#0b0f1a] px-6 py-24 text-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Problem Not Found</h1>
          <Link to="/problems" className="text-cyan-300">Back to Problems</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#0b0f1a] px-6 py-24 text-white">
      <ReadingProgressBar value={progress} />

      <div className="max-w-6xl mx-auto grid lg:grid-cols-[230px_minmax(0,1fr)] gap-8">
        <aside className="hidden lg:block sticky top-24 self-start rounded-xl border border-white/10 bg-[#101628] p-4">
          <p className="text-xs tracking-wider uppercase text-cyan-300 mb-3">On This Page</p>
          <ul className="space-y-2 text-sm">
            <li><a href="#summary" className="text-gray-300 hover:text-cyan-200">Summary</a></li>
            <li><a href="#diagnosis" className="text-gray-300 hover:text-cyan-200">Diagnosis Workflow</a></li>
            <li><a href="#resolution" className="text-gray-300 hover:text-cyan-200">Resolution Plan</a></li>
            <li><a href="#prevention" className="text-gray-300 hover:text-cyan-200">Prevention Strategy</a></li>
            <li><a href="#verification" className="text-gray-300 hover:text-cyan-200">Verification</a></li>
          </ul>
        </aside>

        <div className="max-w-5xl">
          <Link to="/problems" className="inline-flex items-center text-sm text-cyan-300 hover:text-cyan-200 mb-6">
            Back to Problems
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-3">
            <CopyPageLinkButton />
            <h1 className="text-3xl md:text-4xl font-bold">{problem.title}</h1>
            <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300 border border-white/10">Estimated reading: {problem.readTime}</span>
          </div>

          <div id="summary" className="scroll-mt-24 rounded-xl border border-white/10 bg-[#101628] p-6 mb-6">
            <h2 className="text-cyan-300 font-semibold mb-2">Symptoms</h2>
            <p className="text-gray-300 mb-4">{problem.symptoms}</p>
            <h2 className="text-cyan-300 font-semibold mb-2">Likely Root Cause</h2>
            <p className="text-gray-300 mb-4">{problem.rootCause}</p>
            <h2 className="text-cyan-300 font-semibold mb-2">Impact</h2>
            <p className="text-gray-300">{problem.impact}</p>
          </div>

          <div id="diagnosis" className="scroll-mt-24 rounded-xl border border-white/10 bg-[#101628] p-6 mb-6">
            <h2 className="text-cyan-300 font-semibold mb-3">Diagnosis Workflow</h2>
            <div className="space-y-4">
              {problem.diagnosis.map((step, index) => (
                <div key={index} className="border border-white/10 rounded-lg p-4 bg-black/10">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <p className="text-cyan-200 text-sm font-semibold">Step {index + 1}</p>
                    <CopyCommandButton text={step.command} />
                  </div>
                  <pre className="bg-black/40 border border-white/10 rounded p-2 text-xs text-gray-200 overflow-x-auto"><code>{step.command}</code></pre>
                  <p className="text-sm text-gray-300 mt-2">{step.reason}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div id="resolution" className="scroll-mt-24 rounded-xl border border-white/10 bg-[#101628] p-6">
              <h2 className="text-cyan-300 font-semibold mb-3">Resolution Plan</h2>
              <ul className="space-y-2 text-sm text-gray-300">
                {problem.resolution.map((step, index) => (
                  <li key={index}>- {step}</li>
                ))}
              </ul>
            </div>

            <div id="prevention" className="scroll-mt-24 rounded-xl border border-white/10 bg-[#101628] p-6">
              <h2 className="text-cyan-300 font-semibold mb-3">Prevention Strategy</h2>
              <ul className="space-y-2 text-sm text-gray-300">
                {problem.prevention.map((step, index) => (
                  <li key={index}>- {step}</li>
                ))}
              </ul>
            </div>
          </div>

          <div id="verification" className="scroll-mt-24 rounded-xl border border-white/10 bg-[#101628] p-6 mt-6">
            <h2 className="text-cyan-300 font-semibold mb-2">Verification</h2>
            <p className="text-gray-300 text-sm">{problem.verify}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemDetails;
