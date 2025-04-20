import React, { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { abilities } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const philosophyContent = [
  {
    text: "The things we make and the quality of the work we do reveal something about who we are, so I always strive to put my best into it.",
    highlights: [
      "quality of the work",
      "who we are,",
      "my best"
    ]
  },
  {
    text: "From writing clean and scalable code for posterity sake, to using the most efficient algorithms to ensure optimal performance.",
    highlights: [
      "clean and scalable code",
      "efficient algorithms",
      "optimal performance"
    ]
  },
  {
    text: "There is just one word to describe what I do EXCELLENCE.",
    highlights: [
      "one word",
      "EXCELLENCE"
    ]
  }
];

const CombinedFeatures = () => {
  const sectionRef = useRef(null);
  const textElements = useRef([]);
  const containerRef = useRef(null);

  // Create a memoized callback for ref setting
  const setTextElementRef = useCallback((el, index) => {
    textElements.current[index] = el;
  }, []);

  useEffect(() => {
    try {
      if (!sectionRef.current || !containerRef.current) return;

      const pinTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        pinSpacing: true
      });

      const ctx = gsap.context(() => {
        // Set initial states
        gsap.set(containerRef.current, { visibility: "visible" });
        
        // Create main timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=200%",
            scrub: 1,
          }
        });

        // Animate each text element sequentially
        textElements.current.forEach((element, index) => {
          if (!element) return;
          
          // Set initial state
          gsap.set(element, { 
            opacity: 0,
            y: 50
          });

          // Create individual timeline for each text
          const elementTl = gsap.timeline()
            .to(element, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out"
            });

          // Add staggered animations to main timeline
          tl.add(elementTl, index * 0.3);
        });
      });

      return () => {
        ctx.revert();
        pinTrigger.kill();
      };
    } catch (error) {
      console.error('Error in CombinedFeatures animation:', error);
    }
  }, []);

  const highlightText = (text, highlights) => {
    let result = text;
    highlights.forEach(highlight => {
      result = result.replace(
        highlight,
        `<span class="text-white text-xl md:text-2xl lg:text-4xl font-bold">${highlight}</span>`
      );
    });
    return result;
  };

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-black flex items-center justify-center py-20 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        {/* Feature Cards - Left Side */}
        <div className="w-full">
          <div className="grid grid-cols-1 gap-6">
            {abilities.map((ability) => (
              <div
                key={ability.title}
                className="card-border rounded-xl p-6 md:p-8 flex flex-col gap-4"
              >
                <div className="h-12 w-12 md:h-14 md:w-14 flex items-center justify-center rounded-full">
                  <img src={ability.imgPath} alt={ability.title} />
                </div>
                <h3 className="text-white text-xl md:text-2xl font-semibold mt-2">
                  {ability.title}
                </h3>
                <p className="text-white/50 text-base md:text-lg">
                  {ability.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy Content - Right Side */}
        <div className="w-full">
          <div 
            ref={containerRef}
            className="space-y-12 md:space-y-16 pl-2 md:pl-8 lg:pl-16"
          >
            {philosophyContent.map((content, index) => (
              <div key={index}>
                <p
                  ref={(el) => setTextElementRef(el, index)}
                  className="text-white-50 text-lg md:text-xl lg:text-4xl font-normal tracking-tight leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: highlightText(content.text, content.highlights)
                  
                  }}
                  
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinedFeatures;