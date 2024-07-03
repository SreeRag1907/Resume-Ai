import Header from "@/components/custom/Header";
import SparklesText from "@/components/magicui/sparkles-text";
import { AtomIcon, Edit, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />

        <div className="flex-grow relative">
          {/* Grid Background */}
          <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none z-0"></div>

          <div className="relative z-10">
            <section className="pt-20">
              <div className="px-12 mx-auto max-w-7xl">
                <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
                  <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
                    <span>Start</span> <span>building your Resume with </span>{" "}
                    <SparklesText
                      className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-cyan-500 to-purple-500 lg:inline"
                      text="ResumeAi"
                    />
                  </h1>
                  <p className="px-0 mb-8 text-lg text-gray-500 md:text-xl lg:px-24">
                    Effortlessly Craft a Standout Resume with Our AI-Powered
                    Resume Builder{" "}
                  </p>
                  <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
                    <Link
                      to={"/dashboard"}
                      className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-black rounded-xl sm:w-auto sm:mb-0 hover:bg-green-600 transition-all"
                    >
                      Get Started
                      <svg
                        className="w-4 h-4 ml-1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </Link>
                    
                  </div>
                </div>
              </div>
            </section>

            <section className="py-14 bg-white z-50 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12 border rounded-2xl border-pink-500/40 shadow-pink-500 shadow-inner mb-10">
              <h2 className="font-bold text-3xl">How it Works?</h2>
              <h2 className="text-md text-gray-500">
                Create Your Professional Resume with ResumeAi in Just 5 Minutes
              </h2>

              <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="block rounded-xl border bg-white border-gray-200 p-8  transition hover:border-pink-500 hover:shadow-pink-500/10 shadow-inner">
                  <Edit className="h-8 w-8" />
                  <h2 className="mt-4 text-xl font-bold text-black">
                    Add Your Basic Details
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Start by entering your personal information, education, work
                    experience, and skills. Our user-friendly interface guides
                    you through each section, ensuring you don't miss any
                    crucial details.
                  </p>
                </div>

                <div className="block rounded-xl border bg-white border-gray-200 p-8 shadow-inner transition hover:border-pink-500  hover:shadow-pink-500/10">
                  <AtomIcon className="h-8 w-8" />
                  <h2 className="mt-4 text-xl font-bold text-black">
                    Generate AI-Powered Content
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Leverage our advanced AI to generate professional summaries,
                    job descriptions, and skill highlights. Our AI analyzes your
                    input to create tailored, impactful content that showcases
                    your unique value.
                  </p>
                </div>

                <div className="block rounded-xl border bg-white border-gray-200 p-8 shadow-inner transition hover:border-pink-500 hover:shadow-pink-500/10">
                  <Share2 className="h-8 w-8" />
                  <h2 className="mt-4 text-xl font-bold text-black">
                    Download & Share Your Resume
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Download your generated Resume in PDF format. Easily share your resume LINK with potential employers or
                    on professional networking sites.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
