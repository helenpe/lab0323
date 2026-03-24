import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const HERO_SLIDES: { main: [string, string]; sub: string }[] = [
  { main: ['KT DS는 AI를 통해', '비즈니스 성장을 지원합니다.'], sub: '기업 환경에 최적화된 AI 솔루션으로\n실제 성과로 이어지는 변화를 경험하세요' },
  { main: ['국정감사를 도와주는 AI Agent로', '필요한 정보를 바로 제공받으세요.'], sub: '국정감사 담당자의 성향을 파악하여 AI가 필요한 내용을 정리하고,\n많은 자료를 일일이 찾지 않아도, 중요한 내용만 빠르게 확인할 수 있도록 도와줍니다.' },
  { main: ['일을 대신해주는 AI 업무 포털로', '필요한 정보를 바로 제공받으세요. '], sub: '여러 시스템을 오가지 않아도, 필요한 정보 제공 부터 업무 처리까지 도와주는 AI 사내 업무 포털로\n복잡한 업무와 흩어진 정보를 한 곳에 모아 더 쉽고 빠르게 일할 수 있도록 도와줍니다.' },
  { main: ['Agent Builder로 기업에 맞는', 'AI Agent를 쉽고 빠르게 구축하세요.'], sub: 'Agent Builder로 코딩 없이 간단한 설정만으로 필요한 기능만 선택해\n기업 업무에 필요한 AI Agent를 바로 만들고 빠르게 구축/운영할 수 있습니다' },
];

const ROTATE_INTERVAL_MS = 4800;
const TYPING_SPEED_MS = 65;

interface HeroContentProps {
  onSubmit?: (e: React.FormEvent, data: { prompt: string; platform: 'app' | 'web' }) => void;
  isAnalyzing?: boolean;
  align?: 'left' | 'center';
}

function useTypingEffect(text: string, speed: number) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    indexRef.current = 0;

    if (!text) return;

    const timer = setInterval(() => {
      indexRef.current++;
      if (indexRef.current >= text.length) {
        setDisplayed(text);
        setDone(true);
        clearInterval(timer);
      } else {
        setDisplayed(text.slice(0, indexRef.current));
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayed, done };
}

export default function HeroContent({ onSubmit, isAnalyzing = false, align = 'center' }: HeroContentProps) {
  const [index, setIndex] = useState(0);
  const slide = HERO_SLIDES[index];
  const fullTitle = `${slide.main[0]}\n${slide.main[1]}`;
  const { displayed, done } = useTypingEffect(fullTitle, TYPING_SPEED_MS);

  const rotateTimer = useRef<ReturnType<typeof setInterval>>(undefined);
  const startRotation = useCallback(() => {
    clearInterval(rotateTimer.current);
    rotateTimer.current = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, ROTATE_INTERVAL_MS);
  }, []);

  useEffect(() => {
    startRotation();
    return () => clearInterval(rotateTimer.current);
  }, [startRotation]);

  useEffect(() => {
    if (done) {
      startRotation();
    }
  }, [done, startRotation]);

  const lines = displayed.split('\n');

  const isLeft = align === 'left';

  return (
    <div className={`relative z-10 w-full max-w-6xl mx-auto px-6 py-20 md:py-24 min-h-[300px] flex flex-col ${isLeft ? 'items-start text-left' : 'items-center justify-center text-center'}`}>
      {/* 히어로 뱃지 - 타이틀 위 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`hidden md:flex mb-6 ${isLeft ? 'justify-start' : 'justify-center'} w-full`}
      >
        <div className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 overflow-hidden">
          <motion.span
            className="relative font-normal text-[13px] tracking-[0.05em] font-pretendard bg-clip-text text-transparent bg-[length:200%_100%]"
            style={{
              backgroundImage: 'linear-gradient(90deg, rgba(59,130,246,0.5) 0%, rgba(59,130,246,1) 50%, rgba(59,130,246,0.5) 100%)',
            }}
            animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          >
            kt ds Enterprise AI Platform
          </motion.span>
        </div>
      </motion.div>

      <div className="relative h-[220px] md:h-[260px] w-full flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 flex flex-col ${isLeft ? 'items-start text-left' : 'items-center justify-center text-center'}`}
          >
            <h1
              className={`text-4xl md:text-5xl lg:text-[64px] font-[600] mb-4 md:mb-6 leading-[1.1] tracking-tight w-full max-w-5xl flex flex-col ${isLeft ? 'items-start' : 'items-center'}`}
            >
              <span className={`block whitespace-nowrap ${isLeft ? 'text-left' : 'text-center'}`}>
                <span className="text-gray-900">
                  {lines[0]}
                </span>
                {!done && lines.length === 1 && <span className="inline-block w-[3px] h-[0.85em] bg-brand-primary ml-1 align-middle animate-pulse" />}
              </span>
              <span className={`block whitespace-nowrap ${isLeft ? 'text-left' : 'text-center'}`}>
                <span className="text-gray-900">
                  {lines[1] ?? ''}
                </span>
                {!done && lines.length === 2 && <span className="inline-block w-[3px] h-[0.85em] bg-brand-primary ml-1 align-middle animate-pulse" />}
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: done ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className={`text-[13px] md:text-[15px] lg:text-[16px] font-normal text-gray-600 max-w-[85vw] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl w-full leading-relaxed whitespace-pre-line ${isLeft ? 'text-left' : 'text-center'} px-1`}
            >
              {slide.sub}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={`flex gap-2.5 ${isLeft ? 'justify-start' : 'justify-center'} mt-8 mb-2`}>
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setIndex(i);
              startRotation();
            }}
            className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${i === index ? "bg-gray-900" : "bg-gray-300 hover:bg-gray-500"
              }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0 }}
        className={`flex flex-row gap-3 ${isLeft ? 'justify-start' : 'justify-center'} mt-8 md:mt-12`}
      >
        <Button
          variant="premium"
          size="cta"
          rounded="xl"
          className="w-[110px] md:w-[130px] h-10 md:h-12 text-[13px] md:text-[15px] relative group transition-all duration-300"
          disabled={isAnalyzing}
        >
          <span className="group-hover:-translate-x-2 transition-transform duration-300">무료체험 신청</span>
          <ChevronRight size={16} className="absolute right-3 max-w-0 opacity-0 group-hover:max-w-[20px] group-hover:opacity-100 transition-all duration-300 overflow-hidden" />
        </Button>
        <Button
          variant="glass"
          size="cta"
          rounded="xl"
          className="w-[110px] md:w-[130px] h-10 md:h-12 text-[13px] md:text-[15px] relative group transition-all duration-300"
        >
          <span className="group-hover:-translate-x-2 transition-transform duration-300">솔루션 문의</span>
          <ChevronRight size={16} className="absolute right-3 max-w-0 opacity-0 group-hover:max-w-[20px] group-hover:opacity-100 transition-all duration-300 overflow-hidden" />
        </Button>
      </motion.div>


    </div>
  );
}
