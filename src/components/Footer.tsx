import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2d221f] text-[#f6ede7] border-t border-[#3e322e] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Column 1: Logo & Tagline (5/12 width) */}
          <div className="md:col-span-5 flex flex-col space-y-4">
            <Link href="/" className="inline-block">
              <img
                src="/images/logo.png"
                alt="Beverly Hills Clinic Logo"
                className="h-36 w-36 sm:h-48 sm:w-48 object-contain mix-blend-screen invert transition-all duration-300"
              />
            </Link>
            <p className="text-sm text-[#e8ceb1]/80 italic font-light pt-1">
              Dentistry, reimagined.
            </p>
            <div className="w-16 h-[1px] bg-[#ab7f51]/40 my-2" />
          </div>

          {/* Column 2: Explore Navigation (3/12 width) */}
          <div className="md:col-span-3 flex flex-col space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#ab7f51]">
              EXPLORE
            </h4>
            <nav className="flex flex-col space-y-3 text-sm text-[#f6ede7]/80">
              <Link href="/services" className="hover:text-[#e8ceb1] transition-colors">
                Services
              </Link>
              <Link href="/patients" className="hover:text-[#e8ceb1] transition-colors">
                Patients
              </Link>
              <Link href="/contact" className="hover:text-[#e8ceb1] transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Column 3: Studios Addresses (4/12 width) */}
          <div className="md:col-span-4 flex flex-col space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#ab7f51]">
              STUDIOS
            </h4>
            
            <div className="space-y-4 text-sm text-[#f6ede7]/85">
              {/* Studio 1: Sharfabad */}
              <div className="space-y-1">
                <h5 className="font-bold font-heading text-[#e8ceb1] text-base">Sharfabad</h5>
                <p className="leading-relaxed text-xs">
                  15/36 house number road no.03 right behind Alkhaleej tower BMCHS sharfabad Karachi
                </p>
                <a
                  href="tel:03070984307"
                  className="block hover:underline text-xs text-[#ab7f51] hover:text-[#e8ceb1] pt-1"
                >
                  0307-0984307
                </a>
                <a
                  href="mailto:sharfabad@beverlyhillsclinic.com"
                  className="block text-[11px] text-[#f6ede7]/60 hover:text-[#e8ceb1]"
                >
                  sharfabad@beverlyhillsclinic.com
                </a>
              </div>

              {/* Studio 2: Badar Commercial */}
              <div className="space-y-1 pt-2 border-t border-[#3e322e]">
                <h5 className="font-bold font-heading text-[#e8ceb1] text-base">Badar Commercial</h5>
                <p className="leading-relaxed text-xs">
                  2nd floor, Main Saba Avenue, Phase 5, Badar Commercial Area, Above Ocean Pharmacy
                </p>
                <a
                  href="tel:03070984307"
                  className="block hover:underline text-xs text-[#ab7f51] hover:text-[#e8ceb1] pt-1"
                >
                  0307-0984307
                </a>
                <a
                  href="mailto:badar@beverlyhillsclinic.com"
                  className="block text-[11px] text-[#f6ede7]/60 hover:text-[#e8ceb1]"
                >
                  badar@beverlyhillsclinic.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="border-t border-[#3e322e] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#f6ede7]/50 space-y-4 sm:space-y-0">
          <div>
            &copy; {currentYear} Beverly Hills Clinic
          </div>
          <div className="flex space-x-6 tracking-wide text-[11px]">
            <span>Sharfabad</span>
            <span>&middot;</span>
            <span>Badar Commercial</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
