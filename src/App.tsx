/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { useScroll, useTransform, useMotionTemplate, motion, AnimatePresence, useAnimation, useMotionValueEvent, useMotionValue, useSpring } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ParticleEngine from './components/ParticleEngine';
import HeroContent from './components/HeroContent';
import { HIGHLIGHT_NEWS, REGULAR_NEWS } from '@/context/news/news-data';
import { USE_CASES, USE_CASE_CATEGORIES, USE_CASE_CATEGORY_COLORS } from '@/context/use-cases/use-case-data';
import Navbar from './components/Navbar';
import Aurora from './components/Aurora';
import Antigravity from './components/Antigravity';
import { BackgroundGradientAnimation } from './components/ui/background-gradient-animation';
import { Component as EtheralShadow } from './components/ui/etheral-shadow';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Zap,
  Target,
  ShieldCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Code,
  Brain,
  Cpu,
  Rocket,
  Settings,
  Box,
  BookOpen,
  Globe,
  Youtube,
  Linkedin,
  Mail,
  Smartphone,
  Info,
  Menu,
  X,
  ExternalLink,
  Utensils,
  Monitor,
  Layers,
  Layout,
  ArrowUp,
} from 'lucide-react';

// Sub-components (Moved to top for hoisting/scoping clarity)

const StudioCard = ({ icon, title, desc }: { icon: React.ReactElement; title: string; desc: string }) => (
  <Card className="p-10 rounded-[20px] bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-all duration-500 group flex flex-col items-center md:items-start text-center md:text-left shadow-2xl relative overflow-hidden text-left break-keep">
    <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100/50 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-brand-primary/20 transition-colors duration-500" />
    <div className="size-16 bg-gray-100/50 rounded-[20px] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform border border-gray-200 relative z-10 text-gray-900/80 group-hover:text-brand-primary">
      {React.cloneElement(icon as any, { size: 32 })}
    </div>
    <h4 className="text-2xl font-bold text-gray-900 mb-4 relative z-10">{title}</h4>
    <p className="text-gray-400 leading-relaxed font-medium relative z-10">{desc}</p>
  </Card>
);


const SolutionCard = ({ number, image, title, desc, highlight, isLarge }: { number: string; image: string; title: string; desc: string; highlight: string; isLarge?: boolean }) => (
  <div className="bg-white rounded-[20px] p-6 md:p-10 flex flex-col w-full min-w-[280px] h-[340px] md:h-[424px] group cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 font-pretendard relative overflow-hidden">
    {/* Index Number */}
    <div className="text-black text-[16px] md:text-[20px] font-bold leading-none mb-2 md:mb-3">{number}</div>

    {/* Title & Description Group */}
    <div className="flex flex-col gap-2 md:gap-4 mb-4 md:mb-6">
      <h4 className="text-black text-[24px] md:text-[32px] font-bold tracking-tight leading-tight">{title}</h4>
      <div className="min-h-[40px] md:min-h-[48px]">
        <p className="text-black/80 text-[13px] md:text-[16px] leading-snug font-normal break-keep whitespace-pre-line">
          {desc}
        </p>
      </div>
    </div>

    {/* Highlight Tag */}
    <div className="text-brand-primary font-medium text-[13px] md:text-[16px] tracking-tight">
      {highlight.startsWith('#') ? highlight : `# ${highlight}`}
    </div>

    {/* Logo: Absolute Bottom Right Positioning */}
    <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 pointer-events-none">
      <div className={`relative flex items-end justify-end transition-transform duration-500 group-hover:scale-105 ${isLarge ? 'w-28 h-28 md:w-44 md:h-44' : 'w-[100px] h-[100px] md:w-[160px] md:h-[160px]'}`}>
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-contain object-right-bottom origin-bottom-right"
        />
      </div>
    </div>
  </div>
);



const Char = ({ children, progress, range }: { children: string; progress: any; range: [number, number] }) => {
  // Increased base opacity to 0.4 for 'unwritten' text as requested
  const opacity = useTransform(progress, range, [0.4, 1]);
  return <motion.span style={{ opacity }} className="whitespace-pre">{children}</motion.span>;
};

const CharacterReveal = ({ text, className, scrollProgress, range, highlightIndex }: { text: string; className?: string; scrollProgress: any, range: [number, number], highlightIndex?: number }) => {
  const lines = text.split('\n');
  const totalChars = text.length;
  let charCounter = 0;

  return (
    <div className={`flex flex-col gap-1 md:gap-2 font-pretendard ${className}`}>
      {lines.map((line, lineIdx) => {
        // Line-based color scheme:
        // Blue highlight from the specified highlightIndex to the end.
        // If no index is provided, only the last line is highlighted.
        const isHighlight = lineIdx >= (highlightIndex ?? lines.length - 1);
        const colorClass = isHighlight ? "text-brand-primary" : "text-gray-900";

        return (
          <div
            key={lineIdx}
            className={`flex flex-wrap text-[32px] md:text-[40px] font-bold tracking-tight leading-[1.3] ${colorClass}`}
          >
            {line.split('').map((char, charIdx) => {
              const charStart = range[0] + (charCounter / totalChars) * (range[1] - range[0]);
              const charEnd = range[0] + ((charCounter + 1) / totalChars) * (range[1] - range[0]);
              charCounter++;
              return (
                <Char key={charIdx} progress={scrollProgress} range={[charStart, charEnd]}>
                  {char}
                </Char>
              );
            })}
            {lineIdx < lines.length - 1 && (() => { charCounter++; return null; })()}
          </div>
        );
      })}
    </div>
  );
};

const InteractiveMockup = ({ image, frameImage, initialMouseX = -0.75, cursorColor = "var(--color-brand-primary)", cursorName = "Biz.AI" }: { image: string; frameImage: string; initialMouseX?: number; cursorColor?: string; cursorName?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(initialMouseX);
  const mouseY = useMotionValue(0.3);

  // 커스텀 커서를 위한 실제 픽셀 좌표 (딜레이 없는 트래킹용)
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  // 마우스 위치에 따라 이미지가 따라오는 효과 (실시간 반응성을 위해 stiffness를 250으로 대폭 강화)
  const imgX = useSpring(useTransform(mouseX, [-1, 1], [-400, 400]), { stiffness: 250, damping: 30 });
  const imgY = useSpring(useTransform(mouseY, [-1, 1], [-200, 200]), { stiffness: 250, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    // 커스텀 커서 위치 업데이트
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
    if (!isHovered) setIsHovered(true);

    // -1 ~ 1 사이 정규화
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(nx);
    mouseY.set(ny);
  };

  const handleMouseLeave = () => {
    // 마우스가 떠나면 다시 설정된 초기 오프셋 지점으로 즉시 복귀
    mouseX.set(initialMouseX);
    mouseY.set(0.3);
    setIsHovered(false);
  };

  return (
    <div className="w-full h-full flex items-center justify-center lg:justify-end relative group/frame shrink-0 bg-transparent">
      {/* 겉 프레임: 원래의 널찍한 사이즈로 복원 */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-full rounded-[28px] overflow-hidden cursor-none bg-bg-main"
      >
        {/* 배경 이미지 (프레임) */}
        <img
          src={frameImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* 안의 이미지: 마우스 커서에 따라 움직임 */}
        <motion.div
          style={{ x: imgX, y: imgY }}
          className="absolute inset-[-40%] flex items-center justify-center p-16"
        >
          <img
            src={image}
            alt="Use Case Screenshot"
            className="w-[180%] h-auto rounded-[12px] object-contain pointer-events-none transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </motion.div>

        {/* 커스텀 커서 (협업 스타일) */}
        <motion.div
          style={{
            x: cursorX,
            y: cursorY,
            opacity: isHovered ? 1 : 0
          }}
          className="absolute top-0 left-0 z-50 pointer-events-none select-none"
        >
          {/* 포인터 화살표 */}
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4L11 20L14 14L20 11L4 4Z" fill={cursorColor} stroke="white" strokeWidth="2" strokeLinejoin="round" />
          </svg>
          {/* 이름표 */}
          <div
            className="ml-6 -mt-1 px-3 py-1 text-gray-900 text-[12px] font-bold rounded-lg shadow-lg border border-gray-200 whitespace-nowrap"
            style={{ backgroundColor: cursorColor }}
          >
            {cursorName}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const UseCaseVisual = ({ image, frameImage, initialMouseX, cursorColor, cursorName, index, setActive, isActive }: { image: string; frameImage: string; initialMouseX: number; cursorColor: string; cursorName: string; index: number; setActive: (idx: number) => void; isActive: boolean }) => {
  const ref = useRef(null);
  // The isInView logic is now handled by the parent component's scroll progress
  // and activeUseCase state. This component will just render based on isActive prop.
  // const isInView = useInView(ref, { margin: "-20% 0px -20% 0px", amount: 0.5 });

  // useEffect(() => {
  //   if (isInView) setActive(index);
  // }, [isInView, index, setActive]);

  return (
    <motion.div
      ref={ref}
      // initial={{ opacity: 0, y: 40 }} // Initial state is now handled by parent motion.div
      // animate={(isInView || isActive) ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }} // Animation is now handled by parent motion.div
      // transition={{
      //   type: "spring",
      //   stiffness: 100,
      //   damping: 30,
      //   mass: 1,
      //   restDelta: 0.001,
      //   delay: 0.1
      // }}
      className="w-full h-full smooth-gpu"
    >
      <InteractiveMockup image={image} frameImage={frameImage} initialMouseX={initialMouseX} cursorColor={cursorColor} cursorName={cursorName} />
    </motion.div>
  );
};


const CTAParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    const resize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.parentElement.clientHeight * window.devicePixelRatio;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 1000; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resize);
    resize();
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40 translate-z-0" />;
};


const Tag = ({ text }: { text: string }) => (
  <Badge variant="outline" className="border-brand-primary text-brand-primary rounded-full px-4 py-1.5 font-medium whitespace-nowrap">
    {text}
  </Badge>
);

const ProcessSection = ({ isMobile }: { isMobile: boolean }) => {
  const processRef = useRef(null);
  const { scrollYProgress: scrollYProcess } = useScroll({
    target: processRef,
    offset: ["start end", "center center"]
  });

  const clipPathProcessBase = useTransform(
    scrollYProcess,
    [0.1, 0.6],
    ["inset(200px 300px round 40px)", "inset(0px 24px round 40px)"]
  );

  const clipPathProcess = isMobile ? "none" : clipPathProcessBase;

  return (
    <div className="relative w-full py-10" ref={processRef}>
      <motion.div
        style={{ clipPath: clipPathProcess, scrollMarginTop: "100px" } as any}
        className={`bg-[#F3F5FC] border-black/5 relative z-20 overflow-hidden shadow-2xl smooth-gpu ${isMobile ? 'border-none' : 'border'}`}
      >
        <section id="process" className="py-16 md:py-32 relative overflow-hidden px-6">
          <div className="max-w-[1200px] mx-auto relative z-10">
            <div className="text-center mb-12 md:mb-24 container-responsive">
              <p className="text-brand-primary text-[13px] md:text-[18px] font-semibold mb-3 md:mb-4 tracking-wide">Why kt ds</p>
              <h2 className="text-[26px] md:text-[36px] lg:text-[58px] font-bold text-black mb-4 md:mb-6 tracking-tight leading-tight">
                왜 kt ds와 함께 해야 할까요?
              </h2>
              <p className="text-black/80 text-[13px] md:text-[16px] lg:text-[18px] max-w-2xl mx-auto font-medium">
                기업의 복잡한 요구사항을 기획부터 구축, 검증, 운영까지<br className="hidden md:block" />
                표준화된 프로세스로 완성합니다.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                {
                  num: "01", title: "분석/설계", subtitle: "Retriever,\nAnalyst", color: "text-brand-primary",
                  bullets: [
                    "데이터 협의체 기반 분석 및 선별",
                    "이를 기반으로 RAG 및 Agent 구현에 최적화된 체계 구축",
                    "원인 분석, 옵션 비교, 리스크/영향 평가, 계획 수립"
                  ]
                },
                {
                  num: "02", title: "구축", subtitle: "Writer,\nExecutor", color: "text-brand-primary",
                  bullets: [
                    "17년 업력으로 안정성 및 보안성을 갖춘 시스템 구축",
                    "답변/문서/코드/보고서 작성",
                    "유연한 워크플로우 생성 기능으로 다양한 비즈니스에 최적화"
                  ]
                },
                {
                  num: "03", title: "테스트 및 이행", subtitle: "Validator,\nQuality", color: "text-brand-primary",
                  bullets: [
                    "단계적인 성능 검증 및 최적화",
                    "검증, 규정/정책/보안/품질 체크, 근거 링크",
                    "피드백 반영, 프롬프트/룰/플레이북/지식 업데이트"
                  ]
                },
                {
                  num: "04", title: "안정화", subtitle: "Maintainer,\nSRE", color: "text-brand-primary",
                  bullets: [
                    "KPI/SLA/SLO 모니터링, 이상탐지, 알림/에스컬레이션",
                    "의사결정 근거·승인·변경 이력 기록(감사 대응)",
                    "사용자/관리자 매뉴얼 제공 및 교육"
                  ]
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 60, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: false, margin: "-50px" }}
                  className="group relative bg-white rounded-[20px] p-6 md:p-10 border border-black/5 hover:-translate-y-2 hover:shadow-[0_20px_48px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col min-h-[320px] md:min-h-[420px] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[20px] pointer-events-none" />
                  <div className="relative min-h-[100px] md:min-h-[130px]">
                    <span className={`${step.color} text-[16px] md:text-[20px] font-bold mb-2 block`}>{step.num}</span>
                    <h3 className="text-[24px] md:text-[32px] font-bold text-gray-900 leading-tight whitespace-pre-line">{step.subtitle}</h3>
                  </div>
                  <div className="relative flex-1" />
                  <div className="relative min-h-[160px]">
                    <h4 className="text-[16px] font-semibold text-gray-900 mb-3">{step.title}</h4>
                    <ul className="space-y-2">
                      {step.bullets.map((bullet, j) => (
                        <li key={j} className="flex items-start gap-2 text-black/80 text-[14px] leading-relaxed font-normal">
                          <span className="mt-[9px] w-1 h-1 rounded-full bg-black/25 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

const StudioSection = () => {
  return (
    <section id="studio-v2" className="py-16 md:py-32 px-6" style={{ backgroundColor: '#101013', display: 'none' }}>
      <div className="max-w-[1200px] mx-auto">
        {/* 메인 배너 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[400px] w-full rounded-[20px] overflow-hidden group mb-5"
        >
          {/* EtheralShadow 배경 */}
          <div className="absolute inset-0 z-0">
            <EtheralShadow
              color="rgba(220, 220, 220, 1)"
              animation={{ scale: 60, speed: 70 }}
              noise={{ opacity: 0.4, scale: 1.2 }}
              sizing="fill"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-[1]" />

          <div className="relative z-10 px-6 md:pl-20 h-full flex flex-col justify-center max-w-2xl font-pretendard">
            <h2 className="text-[28px] md:text-[48px] font-bold text-white mb-3 md:mb-4 tracking-tight leading-tight">
              아이온유(AI:ON-U)
            </h2>
            <p className="text-gray-600 text-[13px] md:text-[18px] leading-relaxed break-keep font-normal mb-6 md:mb-8 max-w-xl">
              필요한 Agent, Tool, MCP를 빠르게 확인하고 시작하세요.<br />
              쉽게 개발 가능한 AI 아키텍처와 Delivery 가이드를 제공합니다.
            </p>

            <Button
              variant="outline"
              rounded="lg"
              size="cta"
              className="w-[120px] p-0"
            >
              <span>체험하기</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="max-w-0 opacity-0 group-hover:max-w-[18px] group-hover:opacity-100 group-hover:ml-[4px] transition-all duration-300 overflow-hidden">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </Button>
          </div>
        </motion.div>

        {/* 하단 4개 기능 카드 - Neubau 스타일 (다크 박스) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Agent 개발",
              desc: "AI Agent 개발을 위한 통합 개발 환경과 도구를 제공합니다.",
              icon: <Code className="text-gray-900" strokeWidth={2.5} size={24} />
            },
            {
              title: "Core Agent",
              desc: "사전 개발된 Core Agent를 활용하여 빠른 프로토타이핑이 가능합니다.",
              icon: <Cpu className="text-gray-900" strokeWidth={2.5} size={24} />
            },
            {
              title: "Use Case 패키징",
              desc: "Use case 단위로 패키징된 솔루션을 통해 즉시 배포할 수 있습니다.",
              icon: <Layers className="text-gray-900" strokeWidth={2.5} size={24} />
            },
            {
              title: "Delivery 가이드",
              desc: "AI 아키텍처 소개 및 배포 가이드를 통해 안정적인 운영을 지원합니다.",
              icon: <BookOpen className="text-gray-900" strokeWidth={2.5} size={24} />
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-[20px] border border-gray-200 p-8 pt-4 transition-all duration-300 group hover:border-gray-300"
            >
              <div className="size-10 flex items-center justify-center mb-8 group-hover:bg-gray-100 rounded-full transition-colors">
                {item.icon}
              </div>
              <h3 className="text-gray-900 text-[20px] font-bold mb-2 tracking-tight">{item.title}</h3>
              <p className="text-gray-600 text-[15px] leading-relaxed break-keep font-normal">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollY, scrollYProgress } = useScroll();
  const useCaseRef = useRef<HTMLDivElement>(null); // Keep one declaration
  const { scrollYProgress: sectionProgress } = useScroll({
    target: useCaseRef,
    offset: ["start 0.5", "end 1.2"]
  });
  const [activeUseCase, setActiveUseCase] = useState(0);
  const [agentSlide, setAgentSlide] = useState(0);

  // 솔루션 페이즈에서 배경을 라이트로 전환 (dRange 기준 3개 아이템)

  // Re-balanced active ranges for 500vh scroll length and longer persistence
  useMotionValueEvent(sectionProgress, "change", (latest) => {
    if (latest < 0.33) setActiveUseCase(0);
    else if (latest < 0.66) setActiveUseCase(1);
    else setActiveUseCase(2);
  });

  // 배경색 직접 보간: dark → light → dark (3 케이스, 전환 구간 0.04로 부드럽게)
  const useCaseBgColor = useTransform(
    sectionProgress,
    [0, 0.12, 0.16, 0.28, 0.32, 0.45, 0.49, 0.61, 0.65, 0.78, 0.82, 0.95, 0.99, 1.0],
    ['#101013', '#101013', '#F4F5FE', '#F4F5FE', '#101013', '#101013', '#F4F5FE', '#F4F5FE', '#101013', '#101013', '#F4F5FE', '#F4F5FE', '#101013', '#101013']
  );

  const newsScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const handleNewsScroll = () => {
    if (newsScrollRef.current) {
      setCanScrollLeft(newsScrollRef.current.scrollLeft > 10);
    }
  };

  const scrollNews = (direction: 'left' | 'right') => {
    if (newsScrollRef.current) {
      const scrollAmount = 400; // 380px card + 24px gap
      newsScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };


  // Re-added clip path animation for the expanding background effect
  const clipPathBase = useTransform(
    scrollYProgress,
    [0.01, 0.03],
    ["inset(200px 300px round 40px)", "inset(0px 24px round 40px)"]
  );

  const clipPath = isMobile ? "none" : clipPathBase;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // const [activeUseCase, setActiveUseCase] = useState(0); // This is now managed by useMotionValueEvent
  const isScrollingRef = useRef(false);

  const handleSetActiveUseCase = React.useCallback((idx: number) => {
    if (!isScrollingRef.current) {
      setActiveUseCase(idx);
    }
  }, []);

  const useCaseItems = [
    {
      id: "works-ai",
      titlePrefix: "AI Portal",
      titleSuffix: "WorksAI",
      question: "회사에서 사용하는\n많은 메뉴를\n사내 최적화하여\n한 곳에서 모아 볼 수는\n없나요?",
      desc: "AI 챗봇 기반 업무 처리를 지원하는 AI Agent 포털 서비스로 기업 전체 AI 서비스를 통합 관리하고 접근할 수 있는 중앙 플랫폼입니다.",
      tags: ["AI 비서+그룹웨어", "맞춤형"],
      themeColor: "blue",
      highlightIndex: 3,
      features: [
        "기본적인 업무 기반에 최적화된 AI Agent 제공",
        "업무에 필요한 에이전트를 직접 만들어 사내 공유/ 활용",
        "그룹웨어 위젯 및 메뉴 커스텀을 통해 개인 맞춤 컨텐츠 제공"
      ],
      icon: <Utensils className="w-8 h-8" />,
      image: "/works.png",
      cursorName: "WorksAI"
    },
    {
      id: "audit-agent",
      titlePrefix: "Audit Agent",
      question: "국정 감사에 필요한\n방대한 자료를\n한 번에 분석해서\n보고 싶어요!",
      desc: "방대한 기업 규제 및 감사 문서를 AI가 신속히 분석하여, 법적 리스크를 사전에 파악하고 완벽한 컴플라이언스 대응을 지원합니다.",
      tags: ["자료검색", "감사/리스크"],
      themeColor: "sky",
      highlightIndex: 2,
      features: [
        "사내 규정 및 가이드라인 기반의 AI 감사 수행",
        "키워드/의미 기반의 빠른 법령 및 판례 검색",
        "감사 보고서 자동 초안 작성 및 리스크 등급 분류"
      ],
      icon: <Search className="w-8 h-8" />,
      image: "/works.png",
      cursorName: "Audit"
    },
    {
      id: "meeting-agent",
      titlePrefix: "지능형 회의록 Agent",
      question: "너무나 긴 회의시간....\n핵심 내용만 쏙쏙\n뽑아볼 순 없나요?",
      desc: "음성 인식(STT)과 NLP를 결합하여 회의 중 나오는 화자를 구분하고, 자동으로 액션 아이템을 추출합니다.",
      tags: ["음성인식", "업무추출"],
      themeColor: "emerald",
      highlightIndex: 1,
      features: [
        "실시간 음성 인식 및 화자 분리 기록",
        "회의 내용 자동 요약 및 주요 의사결정 사항 추출",
        "참석자 대상 회의록 자동 메일/메신저 발송 연동"
      ],
      icon: <Monitor className="w-8 h-8" />,
      image: "/works.png",
      cursorName: "지능형 회의록"
    }
  ];

  return (
    <div className="min-h-screen font-sans bg-white text-gray-900">
      {/* GNB - Global Navigation Bar */}
      <Navbar activePage="home" />

      {/* Hero Section */}
      <section id="hero" className="relative z-20 h-screen flex items-center justify-center overflow-clip bg-white font-poppins">

        <div className="relative z-10 w-full max-w-[1280px] mx-auto container-responsive flex items-center h-full">
          <div className="w-full flex flex-col lg:flex-row items-center relative">
            {/* Left Content */}
            <div className="w-full lg:max-w-[800px] relative z-20">
              <HeroContent align="left" />
            </div>

          </div>
        </div>

        {/* 스크롤 다운 인디케이터 */}
        <motion.div
          className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-2 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          onClick={() => document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={28} className="text-gray-600/80" strokeWidth={1.5} />
            <ChevronDown size={28} className="text-gray-400 -mt-5" strokeWidth={1.5} />
          </motion.div>
          <span className="text-gray-400 text-sm font-medium tracking-wider">Scroll down</span>
        </motion.div>
      </section>

      {/* Main Content Area */}
      <div className="relative z-20" style={{ backgroundColor: '#ffffff' }}>
        <div className="relative w-full pt-10">
          {/* Continuous gradient from the Hero section into the gap */}

          <motion.div
            style={{ clipPath, willChange: 'clip-path' } as any}
            className={`bg-[#F3F5FC] border-black/5 relative z-20 overflow-hidden mb-20 smooth-gpu ${isMobile ? 'border-none' : 'border'}`}
          >
            <section id="solution" className="py-16 md:py-32">
              <div className="max-w-[1280px] mx-auto container-responsive relative">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-center mb-10 md:mb-20 font-pretendard flex flex-col items-center relative z-10"
                >
                  <h2 className="text-[26px] md:text-[36px] lg:text-[58px] font-bold text-black mb-4 md:mb-6 tracking-tight leading-tight">
                    AI 서비스
                  </h2>
                  <p className="text-black/80 text-[14px] md:text-[18px] max-w-2xl mx-auto font-medium">
                    AI 전략부터 운영까지, 기업 AI의 전 과정을 통합 지원합니다.
                  </p>
                </motion.div>


                {/* 그룹 1: 전사 공통 */}
                <div className="mb-16 md:mb-32 max-w-[1024px] mx-auto">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-center gap-2 mb-5 ml-4"
                  >
                    <span className="text-[18px] font-normal text-gray-800">Agent</span>
                  </motion.div>
                  {(() => {
                    const agentCards = [
                      { image: "/logo_1.png", title: "AI:ON-U", desc: "엔터프라이즈 맞춤형 AI Agent를 빠르게 구축하는 No-Code 기반 Agent Builder", highlight: "#3분 완성 Agent" },
                      { image: "/logo_2.png", title: "WorksAI", desc: "AI Agent 기반으로 다양한 업무처리를 지원하는 사내 AI Agent Portal", highlight: "#업무 효율 200% 향상" },
                      { image: "/logo_3.png", title: "AI 회의록", desc: "음성 기반 회의 자동 기록 · 요약 · 업무 추출 AI 서비스", highlight: "#1분 완성 회의록 작성" },
                      { image: "/bizai_logo.png", title: "Audit Agent", desc: "국정 감사를 도와주는 Agent", highlight: "#업무 생산성 30% 향상" },
                    ];
                    const maxSlide = agentCards.length - 3;
                    return (
                      <div className="relative">
                        {/* 슬라이드 뷰포트 */}
                        <div className="overflow-hidden">
                          <div
                            className="flex gap-3 transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(calc(${agentSlide} * (-33.333% - 4px)))` }}
                          >
                            {agentCards.map((card, i) => (
                              <div key={i} className="shrink-0" style={{ minWidth: 'calc(33.333% - 8px)' }}>
                                <motion.div
                                  initial={{ y: 60, opacity: 0 }}
                                  whileInView={{ y: 0, opacity: 1 }}
                                  viewport={{ once: true, margin: "-50px" }}
                                  transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                                >
                                  <SolutionCard {...card} number={`0${i + 1}`} />
                                </motion.div>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* 네비게이션 버튼 */}
                        <div className="flex items-center justify-end gap-2 mt-4">
                          <button
                            onClick={() => setAgentSlide(Math.max(0, agentSlide - 1))}
                            disabled={agentSlide === 0}
                            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                          </button>
                          <button
                            onClick={() => setAgentSlide(Math.min(maxSlide, agentSlide + 1))}
                            disabled={agentSlide >= maxSlide}
                            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* 그룹 2: IT 서비스/개발 직군 */}
                <div className="mb-14 max-w-[1024px] mx-auto">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-center gap-2 mb-5 ml-4"
                  >
                    <span className="text-[18px] font-normal text-gray-800">솔루션</span>
                  </motion.div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      {
                        image: "/logo_4.png",
                        title: "CloudWiz",
                        desc: "클라우드 운영 효율화와 자동화를 지원하는 관리 서비스",
                        highlight: "#멀티 클라우드 비용 30% 절감"
                      },
                      {
                        image: "/logo_5.png",
                        title: "Beast AI Gateway", isLarge: true,
                        desc: "엔터프라이즈용 AI 기술, API를 통합 관리하는 솔루션",
                        highlight: "#기업 내부 시스템과 AI 기능 표준화"
                      },
                      {
                        image: "/logo_6.png",
                        title: "Codebox",
                        desc: "폐쇄형 설치형 AI 코드 개발 어플라이언스",
                        highlight: "#보안 특화 AI 개발 환경"
                      }
                    ].map((card, i) => (
                      <motion.div
                        key={i}
                        initial={{ y: 60, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: false, margin: "-50px" }}
                        transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
                      >
                        <SolutionCard {...card} number={`0${i + 1}`} />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* 하단 Use Case 이미지 추가 */}
                <div className="mt-8 md:mt-20 w-full max-w-[1024px] mx-auto px-4 lg:px-0">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-10 md:mb-12 font-pretendard flex flex-col items-center relative z-10"
                  >
                    <h2 className="text-[26px] md:text-[36px] lg:text-[58px] font-bold text-black tracking-tight leading-tight">
                      고객 사례
                    </h2>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="w-full rounded-[24px] overflow-hidden justify-center shadow-2xl relative"
                  >
                    <img 
                      src="/usecase01.png" 
                      alt="Solution Architecture" 
                      className="w-full h-auto object-cover"
                    />
                  </motion.div>
                </div>


              </div>
            </section>
          </motion.div>
        </div>


        <section id="use-cases" className="relative" style={{ backgroundColor: '#101013', display: 'none' }}>
          {/* Title Area: Normal Scrolling */}
          <div className="max-w-[1280px] mx-auto w-full container-responsive pt-16 md:pt-32 pb-0 text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="w-full flex flex-col items-center"
            >
              <span className="text-brand-primary font-semibold text-[13px] md:text-[18px] block mb-4">Use Case</span>
              <h2 className="text-[26px] md:text-[36px] lg:text-[58px] font-bold text-gray-900 tracking-tight leading-[1.1] font-pretendard mx-auto">
                Solution, Multi Agent <br />
                Use Cases
              </h2>
            </motion.div>
          </div>

          {/* Sticky Pinned Area: Begins after the title scrolls away */}
          <div ref={useCaseRef} className="relative h-auto lg:h-[2000vh]">
            {/* Mobile Layout (Static List) */}
            <div className="lg:hidden w-full flex flex-col gap-16 px-4 py-12">
              {useCaseItems.map((item, index) => (
                <div key={item.id} className="flex flex-col gap-8">
                  {/* Solution + Visual Group */}
                  <div className="bg-gray-50 backdrop-blur-sm border border-gray-200 rounded-[20px] p-6 flex flex-col gap-8">
                    <div className="flex flex-col gap-3">
                      <span className="text-gray-600/60 text-[20px] font-medium font-pretendard tracking-tight">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h4 className="text-[22px] font-bold text-gray-900 leading-tight">
                        {item.titlePrefix} {item.titleSuffix || ''}
                      </h4>
                      <p className="text-gray-600 text-[14px] leading-relaxed break-keep font-normal">
                        {item.desc}
                      </p>
                      <ul className="space-y-2 pt-1">
                        {item.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-600 text-[13px] leading-relaxed">
                            <span className="text-brand-primary mt-[2px] shrink-0">•</span>
                            <span className="break-keep">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Visual Preview */}
                    <div className="relative aspect-video rounded-[20px] overflow-hidden bg-zinc-900 border border-gray-200/50 shadow-2xl">
                      <img
                        src={item.image}
                        alt={item.titlePrefix}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Layout (Sticky & Transitions) */}
            <div className="hidden lg:flex sticky top-0 h-screen w-full items-center justify-center px-4 md:px-6 md:px-10 overflow-hidden pt-16">
              {/* 전체 배경: 색상 직접 보간으로 부드러운 전환 */}
              <motion.div
                style={{ backgroundColor: useCaseBgColor }}
                className="absolute inset-0 w-full h-full"
              />
              <div className="max-w-[1200px] mx-auto w-full h-full relative z-10">
                <div className="w-full flex flex-col lg:flex-row items-center relative gap-8 lg:gap-0 h-full">
                  <div className="w-full lg:w-[42%] flex flex-col justify-start z-20 pr-0 md:pr-12 lg:pr-16 self-start pt-[20vh] h-full relative overflow-hidden">
                    {/* 단일 슬롯: 모든 Use Case가 동일한 자리에서 교체됨 */}
                    <div className="relative h-full">
                      {useCaseItems.map((item, index) => {
                        // painpoint를 짧게, solution dwell을 길게 (0.06 → 0.12)
                        const qRange: [number, number] = index === 0 ? [0.0, 0.08] : index === 1 ? [0.33, 0.41] : [0.66, 0.74];
                        const dRange: [number, number] = [qRange[1] + 0.04, qRange[1] + 0.08];
                        const nextStart = index < 2 ? (index === 0 ? 0.33 : 0.66) : 1.0;
                        const exitRange: [number, number] = [nextStart - 0.06, nextStart - 0.01];
                        const isActive = activeUseCase === index;

                        // 라인 애니메이션: 솔루션 등장 완료(dRange[1])부터 퇴장 시작(exitRange[0])까지 채워짐
                        const lineScaleX = useTransform(sectionProgress, [dRange[1], exitRange[0]], [0, 1]);

                        // CharacterReveal 범위 (모든 항목 동일하게 유지)
                        const qSpan = qRange[1] - qRange[0];
                        const numFillEnd = qRange[0] + qSpan * 0.3;
                        const textRange: [number, number] = [numFillEnd, qRange[1]];

                        // Q: 이전 솔루션 퇴장 시점부터 미리 보여줌 (Char base 0.4로 ghost 상태)
                        // index > 0: 이전 exitRange[1](=qRange[0]-0.01) 시점에 즉시 ghost 등장
                        const ghostStart = index === 0 ? qRange[0] - 0.01 : qRange[0] - 0.02;
                        const ghostVisible = index === 0 ? qRange[0] : qRange[0] - 0.01;
                        const qOpacity = useTransform(sectionProgress, [ghostStart, ghostVisible, dRange[0] - 0.005, dRange[0]], [0, 1, 1, 0]);
                        // D: Q가 사라지면서 등장 → 다음 Q 시작 전에 사라짐

                        // 즉시 등장, 다음 이미지가 중앙 도달 시(exitRange[1]) 즉시 사라짐
                        const panelOpacity = useTransform(
                          sectionProgress,
                          [dRange[0], dRange[0] + 0.06, exitRange[1] - 0.005, exitRange[1]],
                          [0, 1, 1, 0]
                        );

                        // 숫자: qRange 시작부터 즉시 100% (다만 내부 CharacterReveal이 0.4 -> 1 조절), 이후 사라짐
                        const numOpacity = useTransform(sectionProgress, [ghostStart, ghostVisible, dRange[0] - 0.005, dRange[0]], [0, 1, 1, 0]);

                        return (
                          <div key={item.id} className="absolute inset-0 w-full" style={{
                            pointerEvents: isActive ? 'auto' : 'none',
                            zIndex: isActive ? 50 : 0
                          }}>
                            {/* 번호 + 질문 레이어 */}
                            <motion.div
                              style={{ opacity: qOpacity }}
                              className="absolute inset-0"
                            >
                              <motion.p
                                style={{ opacity: numOpacity }}
                                className="text-gray-900 text-[20px] font-medium tracking-tight mb-6 font-pretendard"
                              >
                                {String(index + 1).padStart(2, '0')}. Painpoint
                              </motion.p>
                              <CharacterReveal
                                text={item.question}
                                scrollProgress={sectionProgress}
                                range={textRange}
                                highlightIndex={item.highlightIndex}
                              />
                            </motion.div>

                            {/* 설명 레이어 - 솔루션 컨텐츠 (배경은 외부 전체 bg 패널이 담당) */}
                            <motion.div
                              style={{ opacity: panelOpacity }}
                              className="absolute inset-0 w-full overflow-hidden"
                            >
                              <div className="mb-6 w-full max-w-lg">
                                <p className="text-gray-900 text-[20px] font-bold tracking-tight font-pretendard mb-3">
                                  {String(index + 1).padStart(2, '0')}&nbsp;&nbsp;Solution.
                                </p>
                                <div className="w-full h-[1px] bg-gray-200 relative overflow-hidden">
                                  <motion.div
                                    style={{ scaleX: lineScaleX, originX: 0 }}
                                    className="absolute inset-0 bg-gray-900"
                                  />
                                </div>
                              </div>

                              <h3 className="text-[40px] text-gray-900 mb-3 leading-[1.1] tracking-tight">
                                <span className="font-bold">{item.titlePrefix}</span>{" "}
                                <span className="font-light">{item.titleSuffix}</span>
                              </h3>
                              <p className="text-[16px] text-gray-800 leading-relaxed max-w-lg mb-5 font-normal">
                                {item.desc}
                              </p>
                              {item.tags && (
                                <div className="flex flex-wrap gap-2 mb-12">
                                  {item.tags.map((tag: string, i: number) => {
                                    const tagColor = '#1A75FF'; // Primary Blue
                                    return (
                                      <span
                                        key={i}
                                        className="px-4 py-1.5 text-[14px] font-semibold rounded-full"
                                        style={{
                                          color: tagColor,
                                          backgroundColor: `${tagColor}12`, // 옅은 프라이머리 배경
                                        }}
                                      >
                                        # {tag}
                                      </span>
                                    );
                                  })}
                                </div>
                              )}
                              {item.features && (
                                <div className="mb-6 max-w-lg">
                                  <ul className="space-y-3">
                                    {item.features.map((feature: string, i: number) => (
                                      <li key={i} className="flex items-start gap-3 text-[16px] leading-relaxed">
                                        <div className="w-[3px] h-5 rounded-full bg-gray-400 mt-[3px] shrink-0" />
                                        <span className="text-gray-800 font-normal">{feature}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </motion.div>

                            {/* 버튼 영역: 솔루션 컨텐츠와 함께 등장/퇴장 */}
                            <motion.div
                              style={{ opacity: panelOpacity }}
                              className="absolute bottom-[10vh] left-0 pointer-events-auto"
                            >
                              <Button
                                variant="outline"
                                rounded="lg"
                                size="cta"
                                className="w-[100px] h-[48px] p-0 gap-0 border-gray-900/20 text-gray-900 hover:border-gray-900/40"
                                onClick={() => navigate('/use-cases')}
                              >
                                <span>전체보기</span>
                                <ChevronRight size={18} className="max-w-0 opacity-0 group-hover:max-w-[20px] group-hover:opacity-100 group-hover:ml-1 transition-all duration-300 overflow-hidden" />
                              </Button>
                            </motion.div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 우측 이미지: flex 레이아웃으로 화면 정중앙 배치 */}
                  <div className="w-full lg:w-[58%] flex items-center justify-end overflow-visible">
                    <div className="w-full relative h-[80vh]">
                      {useCaseItems.map((item, index) => {
                        const isActive = activeUseCase === index;
                        const qRange: [number, number] = index === 0 ? [0.0, 0.08] : index === 1 ? [0.33, 0.41] : [0.66, 0.74];
                        const nextStart = index < 2 ? (index === 0 ? 0.33 : 0.66) : 1.0;
                        const exitRange: [number, number] = [nextStart - 0.06, nextStart - 0.01];

                        // 이전 아이템의 exitRange (index>0에서 아래서 올라오는 진입에 사용)
                        const prevExitStart = qRange[0] - 0.06;
                        const prevExitEnd = qRange[0] - 0.01;

                        // index 0: 우에서 등장 + 위로 퇴장
                        const imageX0 = useTransform(sectionProgress, [qRange[0], qRange[0] + 0.04], [60, 0]);
                        const imageY0 = useTransform(sectionProgress, [exitRange[0], exitRange[1]], [0, -800]);
                        const imageOpacity0 = useTransform(sectionProgress, [qRange[0], qRange[0] + 0.03, exitRange[1] - 0.005, exitRange[1]], [0, 1, 1, 0]);

                        // index > 0: 아래서 올라오며 진입, 위로 퇴장
                        const imageYn = useTransform(sectionProgress, [prevExitStart, prevExitEnd, exitRange[0], exitRange[1]], [800, 0, 0, -800]);
                        const imageOpacityn = useTransform(sectionProgress, [prevExitStart - 0.01, prevExitStart, exitRange[1] - 0.005, exitRange[1]], [0, 1, 1, 0]);

                        const imageY = index === 0 ? imageY0 : imageYn;
                        const imageOpacity = index === 0 ? imageOpacity0 : imageOpacityn;

                        return (
                          <motion.div
                            key={index}
                            style={{
                              opacity: imageOpacity,
                              x: index === 0 ? imageX0 : 0,
                              y: imageY,
                              pointerEvents: isActive ? 'auto' : 'none',
                            }}
                            className="absolute inset-0 w-full h-full flex items-center justify-end"
                          >
                            <UseCaseVisual
                              image={item.image}
                              frameImage={index === 0 ? "/test-1.png" : index === 1 ? "/test-2.png" : "/test-3.png"}
                              initialMouseX={index === 0 ? 0.75 : -0.75}
                              cursorColor={item.themeColor === 'sky' ? '#0EA5E9' : item.themeColor === 'emerald' ? '#10B981' : '#1A75FF'}
                              cursorName={item.cursorName}
                              index={index}
                              setActive={() => { }}
                              isActive={isActive}
                            />
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* Why kt ds - 프로세스 섹션 */}
        <ProcessSection isMobile={isMobile} />

        <section id="logos" className="relative py-24 overflow-hidden bg-gray-50">
          {/* Hero와 동일한 그리드 배경 추가 */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

          <div className="relative z-10 w-full text-center">
            <div className="relative overflow-hidden w-full py-4">
              <motion.div
                className="flex items-center gap-x-12 whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 60,
                  ease: "linear"
                }}
              >
                {[...Array(2)].map((_, i) => (
                  <React.Fragment key={i}>
                    {[
                      { name: "KT", logo: "/logos/kt.png", scale: 1 },
                      { name: "경기도", logo: "/logos/gyeonggido.png", scale: 1 },
                      { name: "현대그린푸드", logo: "/logos/hwell.png", scale: 1.2 },
                      { name: "한국철도공사", logo: "/logos/kr.png", scale: 1.2 },
                      { name: "건국대학교 미래지식교육원", logo: "/logos/konmi.png", scale: 1.2 },
                      { name: "트루엔", logo: "/logos/true.png", scale: 1.2 }
                    ].map((brand, idx) => (
                      <div key={`${i}-${idx}`} className="flex items-center justify-center shrink-0 w-[180px] h-[80px]">
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          style={{ transform: `scale(${brand.scale})` }}
                          className="max-h-[38px] max-w-[140px] w-auto h-auto object-contain opacity-100 transition-all duration-300 pointer-events-auto brightness-0 opacity-50"
                        />
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </motion.div>
            </div>
          </div>
        </section>



        {/* 새로운 소식 섹션: 우측 블리드(Bleed) 레이아웃 */}
        <section id="news" className="py-16 md:py-32 relative" style={{ backgroundColor: '#101013', display: 'none' }}>
          {/* 헤더 영역: 컨테이너 내부 */}
          <div className="max-w-[1280px] mx-auto container-responsive mb-10 md:mb-20">
            <div className="flex justify-between items-end">
              <div className="flex flex-col items-start text-left">
                <h2 className="text-[26px] md:text-[36px] lg:text-[58px] font-bold text-gray-900 mb-4 md:mb-6 tracking-tight leading-tight">
                  새로운 소식
                </h2>
                <p className="text-gray-600 text-[13px] md:text-[16px] lg:text-[18px] max-w-2xl font-medium leading-relaxed">
                  Biz.AI가 전하는 최신 업데이트와 인사이트를 확인하세요.
                </p>
              </div>

              {/* 내비게이션 버튼 */}
              <div className="flex gap-2.5 mb-2">
                <Button
                  variant="nav"
                  size="icon-md"
                  rounded="full"
                  className="gap-2"
                  onClick={() => scrollNews('left')}
                  disabled={!canScrollLeft}
                >
                  <ChevronLeft size={20} strokeWidth={2.5} />
                </Button>
                <Button
                  variant="nav"
                  size="icon-md"
                  rounded="full"
                  className="gap-2"
                  onClick={() => scrollNews('right')}
                >
                  <ChevronRight size={20} strokeWidth={2.5} />
                </Button>
              </div>
            </div>
          </div>

          {/* 뉴스 카드 리스트: 타이틀 정렬 + 우측 블리드 */}
          <div
            ref={newsScrollRef}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-12 pl-[max(1.25rem,calc((100vw-1200px)/2))]"
            onScroll={handleNewsScroll}
          >
            {[...HIGHLIGHT_NEWS, ...REGULAR_NEWS].slice(0, 8).map((news: any, i) => (
              <motion.div
                key={i}
                className="group cursor-pointer shrink-0 w-[380px]"
                onClick={() => {
                  navigate(`/news/${i + 1}`, { state: { news } });
                }}
              >
                {/* 썸네일: 380 * 240 사이즈 */}
                <div className="relative w-full aspect-[380/240] rounded-[20px] overflow-hidden mb-5 bg-gray-50 border border-gray-200 group-hover:border-gray-200/60 transition-all">
                  <motion.img
                    src={news.이미지}
                    alt={news.타이틀}
                    className="w-full h-full object-cover brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                <div className="pt-2 px-1 flex flex-col">
                  <span className="text-brand-secondary text-[14px] font-bold mb-3">{news.태그}</span>
                  <h3 className="text-gray-900 text-[24px] font-bold leading-snug mb-3 whitespace-pre-line">
                    {news.타이틀}
                  </h3>
                  <div className="flex items-center text-gray-400 text-[14px] font-medium">
                    <span>{news.언론사 || news.솔루션}</span>
                    <span className="mx-2 text-[4px] opacity-50">●</span>
                    <span>{news.날짜}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 더보기 버튼: 중앙 정렬 */}
          <div className="flex justify-center mt-8">
            <Link to="/news">
              <Button
                variant="outline"
                rounded="lg"
                size="cta"
                className="w-[120px] h-[48px] p-0 gap-0"
              >
                <span>전체보기</span><ChevronRight size={16} className="max-w-0 opacity-0 group-hover:max-w-[18px] group-hover:opacity-100 group-hover:ml-[2px] transition-all duration-300 overflow-hidden" />
              </Button>
            </Link>
          </div>
        </section>

        {/* FAQ 섹션 */}
        <section id="faq" className="py-12 md:py-24 relative overflow-hidden bg-white">
          <div className="max-w-[1280px] mx-auto container-responsive">
            <div className="flex flex-col lg:flex-row gap-10 md:gap-20">
              {/* 왼쪽: 헤더 */}
              <div className="lg:w-1/3">
                <h2 className="text-[26px] md:text-[36px] lg:text-[58px] font-bold text-gray-900 mb-6 md:mb-8 tracking-tight leading-tight font-pretendard">
                  FAQ
                </h2>
              </div>

              {/* 오른쪽: 아코디언 리스트 */}
              <div className="lg:w-2/3">
                <div className="space-y-4">
                  {/* self-invoking function을 사용하여 지역 상태(openFaqIndex)를 FAQ 목록 전체에서 관리합니다. */}
                  {(() => {
                    const FAQList = () => {
                      const [openIndex, setOpenIndex] = useState<number | null>(null);

                      const faqs = [
                        {
                          q: "기존 시스템과의 연계는 어떻게 지원하나요?",
                          a: "REST API, DB 커넥터, 파일 기반 연계 등 표준 인터페이스를 지원합니다. ERP, 그룹웨어, 데이터 웨어하우스 등 기존 시스템과의 통합 구성이 가능합니다."
                        },
                        {
                          q: "온프레미스 환경에서도 구축이 가능한가요?",
                          a: "네. 온프레미스, 프라이빗 클라우드, 퍼블릭 클라우드 환경 모두 지원합니다. 기업 보안 정책에 따라 망분리 환경 구성도 가능합니다."
                        },
                        {
                          q: "데이터는 외부 전송이 가능한가요?",
                          a: "데이터 처리 방식은 구축 형태에 따라 달라집니다. 기업 내부 처리 구조 설계가 가능하며, 데이터 저장·전송·로그 정책은 고객사 기준에 맞춰 설정됩니다."
                        },
                        {
                          q: "LLM 및 모델 구조는 어떻게 구성되나요?",
                          a: "멀티에이전트 기반 아키텍처로 구성되며, 업무 목적에 따라 다양한 모델을 선택·조합할 수 있습니다. 사내 전용 모델 연계 또는 외부 API 연동도 지원합니다."
                        },
                        {
                          q: "확장성과 운영 관리는 어떻게 이루어지나요?",
                          a: "모듈형 구조로 설계되어 기능 단위 확장이 가능하며, 관리 콘솔을 통해 사용자 권한, 사용 이력, Agent 운영 현황을 통합 관리할 수 있습니다."
                        }
                      ];

                      return (
                        <>
                          {faqs.map((item, i) => {
                            const isOpen = openIndex === i;
                            return (
                              <motion.div
                                key={i}
                                className="border-b border-gray-200"
                                initial={false}
                              >
                                <Button
                                  variant="ghost"
                                  onClick={() => setOpenIndex(isOpen ? null : i)}
                                  className="w-full py-8 flex items-center justify-between text-left group cursor-pointer h-auto px-0 hover:bg-transparent"
                                >
                                  <span className={`text-[15px] md:text-[20px] font-bold tracking-tight transition-colors duration-300 ${isOpen ? 'text-gray-900' : 'text-gray-600/80 group-hover:text-gray-700'}`}>
                                    {item.q}
                                  </span>
                                  <div className="relative w-6 h-6 flex items-center justify-center">
                                    {/* Horizontal line (always visible) */}
                                    <motion.div
                                      className="absolute w-5 h-[2px] bg-brand-primary"
                                      animate={{ rotate: 0 }}
                                    />
                                    {/* Vertical line (rotates to become horizontal to make '-') */}
                                    <motion.div
                                      className="absolute w-5 h-[2px] bg-brand-primary"
                                      animate={{ rotate: isOpen ? 0 : 90 }}
                                      transition={{ duration: 0.3, ease: "easeInOut" }}
                                    />
                                  </div>
                                </Button>
                                <AnimatePresence>
                                  {isOpen && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.3, ease: "easeInOut" }}
                                      className="overflow-hidden"
                                    >
                                      <p className="pb-8 text-gray-600/70 text-[17px] leading-relaxed font-normal break-keep max-w-2xl">
                                        {item.a}
                                      </p>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </motion.div>
                            );
                          })}
                        </>
                      );
                    };
                    return <FAQList />;
                  })()}
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* AI Agent 스튜디오 섹션 */}
        <StudioSection />

        {/* CTA 배너 - Full Width (Premium Aurora Style) 복구 */}
        <div className="w-full py-0">
          <section className="relative h-[500px] w-full overflow-hidden flex items-center justify-center bg-black">
            <div className="absolute inset-0 z-0">
              <img
                src="/meeting-bg.jpg"
                alt="회의"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70" />
            </div>
            <div className="relative z-10 w-full max-w-[1200px] mx-auto text-center font-pretendard px-6 py-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <h2 className="text-gray-900 text-[28px] md:text-[48px] font-bold mb-6 md:mb-10 tracking-tighter leading-[1.2] drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                  Biz.AI와 함께<br />
                  AI 혁신을 지금 실행하세요.
                </h2>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    variant="premium"
                    size="cta"
                    rounded="xl"
                    className="w-[140px] relative group transition-all duration-300"
                  >
                    <span className="group-hover:-translate-x-2 transition-transform duration-300">무료체험 신청</span>
                    <ChevronRight size={18} className="absolute right-4 max-w-0 opacity-0 group-hover:max-w-[24px] group-hover:opacity-100 transition-all duration-300 overflow-hidden" />
                  </Button>
                  <Button
                    variant="glass"
                    size="cta"
                    rounded="xl"
                    className="w-[140px] mt-3 sm:mt-0 relative group transition-all duration-300"
                  >
                    <span className="group-hover:-translate-x-2 transition-transform duration-300">솔루션 문의</span>
                    <ChevronRight size={18} className="absolute right-4 max-w-0 opacity-0 group-hover:max-w-[24px] group-hover:opacity-100 transition-all duration-300 overflow-hidden" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        </div>

        {/* Go to Top 버튼 */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-8 right-8 z-[100] w-11 h-11 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white flex items-center justify-center shadow-lg shadow-brand-primary/30 transition-colors cursor-pointer"
              aria-label="맨 위로 가기"
            >
              <ArrowUp size={20} strokeWidth={2.5} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* 풋터 */}
        <footer className="py-16 px-6 border-t border-gray-200 relative z-20 bg-white">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start gap-10 md:gap-0 font-pretendard">
            {/* 좌측: 로고 + 주소 */}
            <div className="flex flex-col items-start gap-8">
              <img
                src="/ktds_white.png"
                alt="kt ds"
                className="h-8 w-auto object-contain"
              />
              <p className="text-[14px] text-gray-700 font-medium text-left">
                (06707) 서울 서초구 효령로 176, 02-523-7029
              </p>
            </div>

            {/* 우측: 메뉴 + 저작권 (이 부분도 좌측 정렬로 통일) */}
            <div className="flex flex-col items-start gap-8">
              <div className="flex flex-wrap gap-x-8 gap-y-2 text-[14px] text-gray-700 font-medium">
                <a href="#" className="hover:text-gray-900 transition-colors">사이트맵</a>
                <a href="#" className="hover:text-gray-900 transition-colors">공지사항</a>
                <a href="#" className="hover:text-gray-900 transition-colors">개인정보처리방침</a>
                <a href="#" className="hover:text-gray-900 transition-colors">이용약관</a>
              </div>
              <p className="text-[13px] text-gray-400 font-medium text-left">
                © 2026 AI Biz Portal. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
