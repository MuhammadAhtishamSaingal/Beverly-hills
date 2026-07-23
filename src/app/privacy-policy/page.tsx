import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Beverly Hills Dentistry & Aesthetics",
  description: "Learn how Beverly Hills Dentistry & Aesthetics protects your personal information and online privacy. Read our Privacy Policy.",
};

export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: "introduction",
      title: "Introduction",
      content:
        "At Beverly Hills Dentistry & Aesthetics, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.",
    },
    {
      id: "information-we-collect",
      title: "Information We Collect",
      content:
        "We may collect personal information such as your name, email address, phone number, and appointment details. We may also collect non-personal information through cookies and website analytics.",
    },
    {
      id: "how-we-use-information",
      title: "How We Use Information",
      content:
        "Your information is used to schedule appointments, respond to inquiries, improve our services, and send important notifications. We do not sell or share your personal information with third parties for marketing purposes.",
    },
    {
      id: "cookies-and-tracking",
      title: "Cookies and Tracking",
      content:
        "We use cookies and tracking technologies like Meta Pixel and Google Analytics to improve website functionality and analyze traffic. You can manage your preferences through your browser settings.",
    },
    {
      id: "data-security",
      title: "Data Security",
      content:
        "We implement strict security measures to protect your personal information. Only authorized personnel have access to your data, and we use encryption where applicable.",
    },
    {
      id: "third-party-services",
      title: "Third-Party Services",
      content:
        "Our website may include links to third-party services. We are not responsible for the privacy practices of external websites. Please review their privacy policies separately.",
    },
    {
      id: "your-rights",
      title: "Your Rights",
      content:
        "You have the right to access, update, or request deletion of your personal information. Contact us at info@clinicbeverlyhills.com to exercise your rights.",
    },
    {
      id: "updates",
      title: "Updates to Privacy Policy",
      content:
        "We may update this Privacy Policy from time to time. All changes will be reflected on this page with the date of the last update.",
    },
  ];

  const currentDateFormatted = "July 2026"; // Set a current last updated date

  return (
    <div className="flex flex-col w-full bg-brand-primary min-h-screen">
      {/* 1. Hero / Title Section */}
      <section className="bg-brand-secondary/20 border-b border-brand-secondary/40 pt-36 pb-16 sm:pt-48 sm:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#ab7f51] block">
            Legal Info
          </span>
          <h1 className="text-4xl sm:text-5xl font-semibold font-heading text-brand-text leading-tight">
            Privacy Policy
          </h1>
          <div className="w-12 h-1 bg-[#ab7f51]/40 mx-auto rounded-full" />
          <p className="text-sm sm:text-base text-brand-text/80 max-w-xl mx-auto font-medium">
            Your privacy is important to us
          </p>
        </div>
      </section>

      {/* 2. Main Content Layout (Responsive Split Grid) */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Sticky Navigation Sidebar for Desktop */}
          <aside className="lg:col-span-4 sticky top-32 hidden lg:block bg-white border border-[#e8ceb1]/40 p-8 rounded-3xl shadow-xs">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#ab7f51] mb-6">
              Table of Contents
            </h2>
            <nav className="flex flex-col space-y-3.5 text-sm text-brand-text/70">
              {sections.map((sect) => (
                <a
                  key={sect.id}
                  href={`#${sect.id}`}
                  className="hover:text-[#ab7f51] transition-colors border-l-2 border-transparent hover:border-[#ab7f51]/40 pl-3 font-medium duration-200"
                >
                  {sect.title}
                </a>
              ))}
            </nav>
            <div className="border-t border-[#e8ceb1]/30 mt-8 pt-6">
              <p className="text-[11px] text-brand-text/50">
                Last updated: {currentDateFormatted}
              </p>
            </div>
          </aside>

          {/* Main Privacy Policy Text Content */}
          <article className="lg:col-span-8 space-y-8 bg-white border border-[#e8ceb1]/40 p-6 sm:p-10 md:p-12 rounded-3xl shadow-xs">
            <div className="prose prose-stone max-w-none text-brand-text/85">
              <p className="text-sm sm:text-base leading-relaxed mb-8">
                This document outlines how Beverly Hills Dentistry & Aesthetics handles data protection and your privacy rights. Please review the details below, and do not hesitate to reach out if you have any questions.
              </p>

              <hr className="border-t border-[#e8ceb1]/30 my-8" />

              <div className="space-y-12">
                {sections.map((sect) => (
                  <section key={sect.id} id={sect.id} className="scroll-mt-32 space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="w-1.5 h-6 bg-[#ab7f51] rounded-full inline-block" />
                      <h2 className="text-xl sm:text-2xl font-bold font-heading text-brand-text">
                        {sect.title}
                      </h2>
                    </div>
                    
                    <p className="text-sm sm:text-base leading-relaxed text-brand-text/80 pl-4">
                      {sect.id === "your-rights" ? (
                        <>
                          You have the right to access, update, or request deletion of your personal information. Contact us at{" "}
                          <a
                            href="mailto:info@clinicbeverlyhills.com"
                            className="text-[#ab7f51] hover:underline font-semibold"
                          >
                            info@clinicbeverlyhills.com
                          </a>{" "}
                          to exercise your rights.
                        </>
                      ) : (
                        sect.content
                      )}
                    </p>
                  </section>
                ))}
              </div>
            </div>

            <div className="lg:hidden border-t border-[#e8ceb1]/30 mt-12 pt-6 text-center">
              <p className="text-[11px] text-brand-text/50">
                Last updated: {currentDateFormatted}
              </p>
            </div>
          </article>

        </div>
      </section>
    </div>
  );
}
