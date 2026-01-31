const logos = [
  { src: "/logos/google.png", alt: "Google" },
  { src: "/logos/microsoft.png", alt: "Microsoft" },
  { src: "/logos/Amazon.png", alt: "Amazon" },
  { src: "/logos/Samsung.png", alt: "Samsung" },
  { src: "/logos/hp.png", alt: "HP" },
  { src: "/logos/ibm.png", alt: "IBM" },
  { src: "/logos/Intel.png", alt: "Intel" },
  { src: "/logos/Oracle.PNG", alt: "Oracle" },
  { src: "/logos/tcs.svg", alt: "TCS" },
];

const SlidingLogos = () => {
  return (
    <section className="py-10 bg-gray-800/50 border-y border-gray-700 overflow-hidden">
      <div className="">
        <h2 className="text-4xl font-bold text-center text-white mb-10 uppercase">
          Trusted by Leading Companies
        </h2>

        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-10"></div>

          {/* Sliding Container */}
          <div className="flex overflow-hidden">
            <div className="flex animate-scroll">
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-40 h-30 mx-8 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-60 hover:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SlidingLogos;
