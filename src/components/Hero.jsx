


// import DevOpsInfinity from "./DevOpsInfinity.jsx"





// const Hero = () => {
//   return (
//     <section className="relative w-full min-h-screen bg-[#0b0f1a] overflow-hidden">
      
//       {/* BACKGROUND GLOWS */}
//       <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" />
//       <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[120px] animate-pulse" />

//       <div className="relative max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

//         {/* LEFT SIDE */}
//         <div className="animate-fade-in">
//           <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
//             Building <br />
//             <span className="text-cyan-400">Reliable Systems</span>
//           </h1>

//           <p className="mt-6 text-gray-400 max-w-lg">
//             I design, automate, and deploy scalable infrastructure
//             using modern DevOps practices focused on reliability,
//             simplicity, and performance.
//           </p>

//           <div className="mt-8 flex gap-4">
//             <button className="px-6 py-3 bg-cyan-500 text-black font-medium rounded-md hover:bg-cyan-400 transition">
//               View Projects
//             </button>

//             <button className="px-6 py-3 border border-white/20 text-white rounded-md hover:bg-white/10 transition">
//               Read Articles
//             </button>
//           </div>
//         </div>

//         {/* RIGHT SIDE - DevOps Infinity */}
//         <div className="flex justify-center md:justify-end mt-16">
//           <DevOpsInfinity />
//         </div>

//       </div>
//     </section>
//   );
// };

// export default Hero;
import { Link } from "react-router-dom";
import ProjectsSection from "./ProjectsSection.jsx";
import { useEffect, useState } from "react";
import DevOpsInfinity from "./DevOpsInfinity.jsx";

const Hero = () => {
  const fullText = "Learning DevOps & Cloud, step by step";
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 70);

      return () => clearTimeout(timeout);
    }
  }, [index]);
 
  return (
    <>
    <section className="relative w-full min-h-screen bg-[#0b0f1a] overflow-hidden">
      
      {/* BACKGROUND GLOWS */}
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[120px] animate-pulse" />

      <div className="relative max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE */}
        <div>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          curious folks <br />
            <span className="text-cyan-400">
              {typedText}
              <span className="animate-pulse">|</span>
            </span>
          </h1>

          <p className="mt-6 text-gray-400 max-w-lg">
            This space is for those who are already working in tech and for
            those who are learning, just like me. I’m currently exploring
            DevOps, cloud, and system fundamentals — step by step.
          </p>

        <div className="mt-8 flex gap-4">
  <Link
    to="/contact"
    className="px-6 py-3 bg-cyan-500 text-black font-medium rounded-md hover:bg-cyan-400 transition inline-flex items-center"
  >
    Contact Me
  </Link>

  <Link
    to="/about"
    className="px-6 py-3 border border-white/20 text-white rounded-md hover:bg-white/10 transition inline-flex items-center"
  >
    About Me
  </Link>
</div>

        </div>

        {/* RIGHT SIDE */}
       {/* RIGHT SIDE - DevOps Infinity */}
 <div className="flex justify-center md:justify-end mt-16"><DevOpsInfinity/>     </div>

      </div>
       
    </section>
    <ProjectsSection/>
    </>
  );
};

export default Hero;
