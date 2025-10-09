'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import demoImage from '@/public/images/molto2.svg';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Banner } from '@/components/banner/banner';
import { Counter } from '@/components/counter';
import Footer from '../ui/footer';

gsap.registerPlugin(ScrollTrigger);

const BubblesBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const bubblesCount = 30;
    bubblesRef.current = [];

    for (let i = 0; i < bubblesCount; i++) {
      const bubble = document.createElement('div');
      bubble.style.position = 'absolute';
      bubble.style.borderRadius = '50%';
      bubble.style.background = 'rgba(255, 255, 255, 0.15)';
      bubble.style.pointerEvents = 'none';
      bubble.style.filter = 'blur(4px)';
      bubble.style.zIndex = '5';

      const size = Math.random() * 30 + 10;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;

      bubble.style.top = `${Math.random() * 100}%`;
      bubble.style.left = `${Math.random() * 100}%`;

      container.appendChild(bubble);
      bubblesRef.current.push(bubble);
    }

    bubblesRef.current.forEach((bubble) => {
      const duration = Math.random() * 10 + 5;

      const animateBubble = () => {
        gsap.to(bubble.style, {
          left: `+=${(Math.random() - 0.5) * 20}%`,
          top: `+=${(Math.random() - 0.5) * 20}%`,
          duration: duration,
          ease: 'sine.inOut',
          onComplete: () => {
            let left = parseFloat(bubble.style.left);
            let top = parseFloat(bubble.style.top);

            if (left < 0) left = 0;
            if (left > 100) left = 100;
            if (top < 0) top = 0;
            if (top > 100) top = 100;

            bubble.style.left = `${left}%`;
            bubble.style.top = `${top}%`;

            animateBubble();
          },
        });
      };

      animateBubble();
    });

    return () => {
      bubblesRef.current.forEach((bubble) => container.removeChild(bubble));
      bubblesRef.current = [];
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" />;
};

const mockBanners = [
  {
    id: '1',
    alt: 'Business Consulting 1',
    image: demoImage,
    description_en: 'Unlock your business potential with expert strategies.',
    description_ar: 'اكتشف إمكانيات عملك مع استراتيجيات الخبراء.',
  },
  {
    id: '2',
    alt: 'Business Consulting 2',
    image: demoImage,
    description_en: 'Achieve more with our custom business solutions.',
    description_ar: 'حقق المزيد مع حلولنا المخصصة.',
  },
];

const mockStats = [
  { label: 'Clients', count: 120 },
  { label: 'Projects Completed', count: 75 },
  { label: 'Years of Experience', count: 10, suffix: '+' },
];

const mockCards = [
  {
    id: '1',
    title: 'Business Strategy',
    description:
      'Develop effective strategies to grow your business and outperform competitors in the global market.',
    details:
      'Our team provides tailored business strategy consulting that aligns with your company’s vision and market conditions to ensure sustainable growth and competitive advantage.',
  },
  {
    id: '2',
    title: 'Market Analysis',
    description:
      'Conduct thorough market research to identify opportunities and mitigate risks.',
    details:
      'Using advanced analytics and data-driven insights, we help you understand customer needs, market trends, and competitor activities for better decision-making.',
  },
  {
    id: '3',
    title: 'Operational Efficiency',
    description:
      'Optimize your operations to reduce costs and improve productivity across all departments.',
    details:
      'Our consultants analyze your workflows and implement best practices that increase efficiency, reduce waste, and enhance overall performance.',
  },
];

export default function MovingSection() {
  const sectionRef = useRef(null);
  const fixedWrapperRef = useRef(null);
  const [isFixed, setIsFixed] = useState(true);

  useEffect(() => {
    const q = gsap.utils.selector(sectionRef);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 50%',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          setIsFixed(!(self.progress > 0.98));
        },
      },
    });

    tl.to(q('.sentence'), { y: -500, opacity: 1, duration: 4, ease: 'power2.out' }, 0);
    tl.to(q('.sentence'), { opacity: 0, duration: 1, ease: 'power1.out' }, '+=1');
    tl.fromTo(q('.image'), { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1 }, '+=0.5');
    tl.fromTo(q('.text'), { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1 }, '+=0.5');
    tl.to([q('.image'), q('.text')], { opacity: 0, y: -100, duration: 1 }, '+=1.5');
    tl.fromTo(q('.word'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.5 }, '+=0.5');

    gsap.to(q('.word'), {
      y: -100,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'bottom bottom',
        end: '+=100%',
        scrub: true,
      },
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  const animatedSentence = "Strategize. Optimize. Grow your business confidently.";

  return (
    <>
      <section
        ref={sectionRef}
        className="relative h-[400vh] text-white overflow-hidden"
      >
        <div className="w-full h-[20vh] flex absolute top-0 left-0 z-10">
          <div className="w-[40%] h-full bg-transparent" />
          <div
            className="w-[60%] h-full bg-blue-900"
            style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)' }}
          />
        </div>

        <div
          className="absolute top-[19.5vh] left-0 w-full h-[calc(100%-19.5vh)] bg-gradient-to-bl from-blue-900 to-blue-600 z-0 "
        >
          <BubblesBackground />
        </div>

        <div
          ref={fixedWrapperRef}
          className="w-full h-screen pointer-events-none z-30"
          style={{ position: isFixed ? 'fixed' : 'relative', top: 0, left: 0 }}
        >
          <div className="sentence absolute top-[800px] left-1/2 -translate-x-1/2 text-center opacity-0">
            <h2 className="text-5xl font-bold">
              Empower Your Business with Expert Consulting
            </h2>
          </div>
          <div className="image absolute top-[280px] left-[10%] w-[40%] flex justify-center opacity-0">
            <Image
              src={demoImage}
              alt="Business Consulting"
              className="w-96 h-auto rounded shadow-lg"
            />
          </div>
          <div className="text absolute top-[280px] right-[10%] w-[40%] text-right opacity-0">
            <h3 className="text-4xl font-semibold mb-4">Tailored Strategies for Success</h3>
            <p className="text-lg">
              We provide customized consulting solutions to optimize your operations and maximize growth.
            </p>
          </div>
          <div className="absolute top-[200px] left-1/2 -translate-x-1/2 text-center text-4xl font-semibold">
            {animatedSentence.split(' ').map((word, idx) => (
              <span key={idx} className="word inline-block opacity-0 mx-1">
                {word}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white h-fit flex flex-col justify-end space-y-12">
        <Banner banners={mockBanners} />
        <Counter stats={mockStats} />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-[80%] mx-auto">
          {mockCards.map(({ id, title, description, details }) => (
            
            <Card
              key={id}
              className="shadow-lg border border-gray-300 rounded-lg p-8 hover:shadow-xl transition-shadow min-h-[320px] flex flex-col justify-between"
            >
              <div>
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
                  <CardDescription className="mb-4">{description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{details}</p>
                </CardContent>
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  className="w-full bg-[#125892] text-white py-2 rounded hover:bg-blue-700 transition"
                  onClick={() => alert(`Learn more about ${title}`)}
                >
                  Learn More
                </button>
              </div>
            </Card>
          ))}
        </div>

        <Footer />
      </section>
    </>
  );
}
