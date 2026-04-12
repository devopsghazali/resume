import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projects";
import CopyCommandButton from "../components/CopyCommandButton";
import { projectDocs } from "../data/projectDocs";

const ProjectNotes = () => {
  const { id } = useParams();
  const projectId = Number(id);
  const project = projects.find((item) => item.id === projectId);
  const doc = projectDocs[projectId];

  if (!project || !doc) {
    return (
      <section className="min-h-screen bg-[#0b0f1a] px-6 py-28 text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Project Notes Not Found</h1>
          <p className="text-gray-400 mb-6">The requested project documentation is unavailable.</p>
          <Link to="/#projects" className="inline-flex items-center rounded-md bg-cyan-500 px-4 py-2 text-black font-semibold">
            Back to Projects
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#0b0f1a] px-6 py-24 text-white">
      <div className="max-w-6xl mx-auto">
        <Link to="/#projects" className="inline-flex items-center text-sm text-cyan-300 hover:text-cyan-200 mb-6">
          Back to Projects
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-2">{project.title}</h1>
        <p className="text-gray-300 mb-8 max-w-5xl">{project.description}</p>

        <div className="rounded-xl overflow-hidden border border-white/10 bg-black/20 mb-8">
          <img src={project.image} alt={`${project.title} architecture diagram`} className="w-full h-[320px] object-contain p-4" />
        </div>

        <div className="rounded-xl border border-white/10 bg-[#101628] p-6 mb-8">
          <h2 className="text-cyan-300 font-semibold mb-4 text-xl">Architecture Overview</h2>
          <p className="text-gray-300 text-sm leading-relaxed">{doc.architectureOverview}</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#101628] p-6 mb-8">
          <h2 className="text-cyan-300 font-semibold mb-4 text-xl">Executive Summary</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div><p className="text-cyan-200 font-semibold">What</p><p className="text-gray-300">{doc.summary.what}</p></div>
            <div><p className="text-cyan-200 font-semibold">Why</p><p className="text-gray-300">{doc.summary.why}</p></div>
            <div><p className="text-cyan-200 font-semibold">How</p><p className="text-gray-300">{doc.summary.how}</p></div>
            <div><p className="text-cyan-200 font-semibold">Internal Working</p><p className="text-gray-300">{doc.summary.internalWorking}</p></div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mt-5 text-sm">
            <div>
              <p className="text-cyan-200 font-semibold mb-2">Best Practices</p>
              <ul className="space-y-1 text-gray-300">
                {doc.summary.bestPractices.map((item, index) => <li key={index}>- {item}</li>)}
              </ul>
            </div>
            <div>
              <p className="text-cyan-200 font-semibold mb-2">Common Mistakes</p>
              <ul className="space-y-1 text-gray-300">
                {doc.summary.commonMistakes.map((item, index) => <li key={index}>- {item}</li>)}
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#101628] p-6 mb-8 overflow-x-auto">
          <h2 className="text-cyan-300 font-semibold mb-4 text-xl">Component Explanations</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-cyan-200 border-b border-white/10">
                <th className="py-2 pr-4">Component</th>
                <th className="py-2 pr-4">Role</th>
                <th className="py-2">Internal Working</th>
              </tr>
            </thead>
            <tbody>
              {doc.components.map((component, index) => (
                <tr key={index} className="border-b border-white/5 align-top">
                  <td className="py-2 pr-4 text-white">{component.name}</td>
                  <td className="py-2 pr-4 text-gray-300">{component.role}</td>
                  <td className="py-2 text-gray-300">{component.internalWorking}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#101628] p-6 mb-8">
          <h2 className="text-cyan-300 font-semibold mb-4 text-xl">Deployment Steps (Production Style)</h2>
          <div className="space-y-5">
            {doc.deploymentSteps.map((step, index) => (
              <div key={index} className="border border-white/10 rounded-lg p-4 bg-black/10">
                <h3 className="text-cyan-200 font-semibold mb-3">Step {index + 1}: {step.step}</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div><p className="text-cyan-100 font-semibold">What</p><p className="text-gray-300">{step.what}</p></div>
                  <div><p className="text-cyan-100 font-semibold">Why</p><p className="text-gray-300">{step.why}</p></div>
                  <div><p className="text-cyan-100 font-semibold">How</p><p className="text-gray-300">{step.how}</p></div>
                  <div><p className="text-cyan-100 font-semibold">Internal Working</p><p className="text-gray-300">{step.internalWorking}</p></div>
                  <div><p className="text-cyan-100 font-semibold">Best Practices</p><p className="text-gray-300">{step.bestPractices}</p></div>
                  <div><p className="text-cyan-100 font-semibold">Common Mistakes</p><p className="text-gray-300">{step.commonMistakes}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="rounded-xl border border-white/10 bg-[#101628] p-6">
            <h2 className="text-cyan-300 font-semibold mb-3 text-xl">Observability Workflow</h2>
            <p className="text-sm text-gray-300 mb-2"><span className="text-cyan-200 font-semibold">Metrics:</span> {doc.observability.metrics}</p>
            <p className="text-sm text-gray-300 mb-2"><span className="text-cyan-200 font-semibold">Logs:</span> {doc.observability.logs}</p>
            <p className="text-sm text-gray-300"><span className="text-cyan-200 font-semibold">Alerts:</span> {doc.observability.alerts}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#101628] p-6">
            <h2 className="text-cyan-300 font-semibold mb-3 text-xl">Lifecycle</h2>
            <p className="text-sm text-gray-300 mb-2"><span className="text-cyan-200 font-semibold">Alert Lifecycle:</span> {doc.observability.alertLifecycle}</p>
            <p className="text-sm text-gray-300"><span className="text-cyan-200 font-semibold">Incident Response:</span> {doc.observability.incidentLifecycle}</p>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#101628] p-6 mb-8 overflow-x-auto">
          <h2 className="text-cyan-300 font-semibold mb-4 text-xl">Alert Severity Matrix</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-cyan-200 border-b border-white/10">
                <th className="py-2 pr-4">Severity</th>
                <th className="py-2 pr-4">Trigger</th>
                <th className="py-2">Response Target</th>
              </tr>
            </thead>
            <tbody>
              {doc.alertMatrix.map((row, index) => (
                <tr key={index} className="border-b border-white/5">
                  <td className="py-2 pr-4 text-white">{row.severity}</td>
                  <td className="py-2 pr-4 text-gray-300">{row.trigger}</td>
                  <td className="py-2 text-gray-300">{row.target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="rounded-xl border border-white/10 bg-[#101628] p-4">
            <h3 className="text-cyan-300 font-semibold mb-2">System Architecture</h3>
            <img src={doc.diagrams.systemArchitecture} alt="System architecture" className="w-full h-[180px] object-contain bg-black/20 rounded" />
          </div>
          <div className="rounded-xl border border-white/10 bg-[#101628] p-4">
            <h3 className="text-cyan-300 font-semibold mb-2">Metrics Pipeline</h3>
            <img src={doc.diagrams.metricsPipeline} alt="Metrics pipeline" className="w-full h-[180px] object-contain bg-black/20 rounded" />
          </div>
          <div className="rounded-xl border border-white/10 bg-[#101628] p-4">
            <h3 className="text-cyan-300 font-semibold mb-2">Logs Pipeline</h3>
            <img src={doc.diagrams.logsPipeline} alt="Logs pipeline" className="w-full h-[180px] object-contain bg-black/20 rounded" />
          </div>
          <div className="rounded-xl border border-white/10 bg-[#101628] p-4">
            <h3 className="text-cyan-300 font-semibold mb-2">Alert Pipeline</h3>
            <img src={doc.diagrams.alertPipeline} alt="Alert pipeline" className="w-full h-[180px] object-contain bg-black/20 rounded" />
          </div>
          <div className="rounded-xl border border-white/10 bg-[#101628] p-4 md:col-span-2">
            <h3 className="text-cyan-300 font-semibold mb-2">Incident Response Flow</h3>
            <img src={doc.diagrams.incidentResponse} alt="Incident response flow" className="w-full h-[200px] object-contain bg-black/20 rounded" />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl border border-white/10 bg-[#101628] p-5">
            <h2 className="text-cyan-300 font-semibold mb-3">Failure Scenarios</h2>
            <div className="space-y-3 text-sm text-gray-300">
              {doc.failureScenarios.map((item, index) => (
                <div key={index}>
                  <p><span className="text-cyan-100 font-semibold">Scenario:</span> {item.scenario}</p>
                  <p><span className="text-cyan-100 font-semibold">Symptoms:</span> {item.symptoms}</p>
                  <p><span className="text-cyan-100 font-semibold">Response:</span> {item.response}</p>
                  <p><span className="text-cyan-100 font-semibold">Prevention:</span> {item.prevention}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#101628] p-5">
            <h2 className="text-cyan-300 font-semibold mb-3">Scaling Considerations</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              {doc.scaling.map((item, index) => <li key={index}>- {item}</li>)}
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#101628] p-5">
            <h2 className="text-cyan-300 font-semibold mb-3">Security Considerations</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              {doc.security.map((item, index) => <li key={index}>- {item}</li>)}
            </ul>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#101628] p-6 mb-8 overflow-x-auto">
          <h2 className="text-cyan-300 font-semibold mb-4 text-xl">Design Decision Log</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-cyan-200 border-b border-white/10">
                <th className="py-2 pr-4">Decision</th>
                <th className="py-2 pr-4">Reasoning</th>
                <th className="py-2">Tradeoff</th>
              </tr>
            </thead>
            <tbody>
              {doc.designDecisions.map((row, index) => (
                <tr key={index} className="border-b border-white/5 align-top">
                  <td className="py-2 pr-4 text-white">{row.decision}</td>
                  <td className="py-2 pr-4 text-gray-300">{row.rationale}</td>
                  <td className="py-2 text-gray-300">{row.tradeoff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#101628] p-6 mb-8">
          <h2 className="text-cyan-300 font-semibold mb-4 text-xl">Runbooks (Operational Commands)</h2>
          <div className="space-y-5">
            {doc.runbooks.map((runbook, index) => (
              <div key={index} className="border border-white/10 rounded-lg p-4 bg-black/10">
                <h3 className="text-cyan-200 font-semibold">{runbook.title}</h3>
                <p className="text-sm text-gray-300 mt-1 mb-3">{runbook.objective}</p>
                <p className="text-cyan-100 text-sm font-semibold mb-2">Commands</p>
                <div className="space-y-2 mb-4">
                  {runbook.commands.map((command, commandIndex) => (
                    <div key={commandIndex} className="space-y-2">
                    <div className="flex justify-end">
                      <CopyCommandButton text={command} />
                    </div>
                    <pre className="bg-black/30 border border-white/10 rounded p-2 text-xs text-gray-200 overflow-x-auto"><code>{command}</code></pre>
                  </div>
                  ))}
                </div>
                <p className="text-cyan-100 text-sm font-semibold mb-2">Verification Steps</p>
                <ul className="space-y-1 text-sm text-gray-300">
                  {runbook.verification.map((item, verifyIndex) => <li key={verifyIndex}>- {item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#101628] p-6 mb-8">
          <h2 className="text-cyan-300 font-semibold mb-4 text-xl">Troubleshooting Guide</h2>
          <div className="space-y-5">
            {doc.troubleshooting.map((issue, index) => (
              <div key={index} className="border border-white/10 rounded-lg p-4 bg-black/10">
                <h3 className="text-cyan-200 font-semibold mb-2">{issue.issue}</h3>
                <p className="text-cyan-100 text-sm font-semibold mb-2">Checks</p>
                <div className="space-y-2 mb-3">
                  {issue.checks.map((check, checkIndex) => (
                    <div key={checkIndex} className="space-y-2">
                    <div className="flex justify-end">
                      <CopyCommandButton text={check} />
                    </div>
                    <pre className="bg-black/30 border border-white/10 rounded p-2 text-xs text-gray-200 overflow-x-auto"><code>{check}</code></pre>
                  </div>
                  ))}
                </div>
                <p className="text-cyan-100 text-sm font-semibold">Fix</p>
                <p className="text-sm text-gray-300 mt-1">{issue.fix}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#101628] p-6">
          <h2 className="text-cyan-300 font-semibold mb-4 text-xl">Repositories</h2>
          <div className="space-y-3">
            {project.links.map((link, index) => (
              <a key={index} href={link.url} target="_blank" rel="noreferrer" className="block rounded-lg border border-cyan-400/30 bg-cyan-500/10 p-3 hover:border-cyan-300/60 transition">
                <p className="text-sm font-semibold text-cyan-200">{link.label}</p>
                <p className="text-xs text-gray-300 mt-1">{link.note}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectNotes;

