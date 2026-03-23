import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { USE_CASES, USE_CASE_CATEGORY_COLORS } from '@/context/use-cases/use-case-data';
import { Button } from '@/components/ui/button';

export default function UseCaseDetailPage() {
    const { id } = useParams();

    const caseIndex = id ? parseInt(id) - 1 : 0;
    const item = USE_CASES[caseIndex] || USE_CASES[0];

    const detail = item.상세내용 || null;
    const sections = detail?.sections || [
        { id: "introduction", title: "1. 고객사 소개 및 배경" },
        { id: "objective", title: "2. 도입 목표" },
        { id: "solution", title: "3. 솔루션 구조" },
        { id: "results", title: "4. 기대 효과 및 결과" }
    ];

    const [activeSection, setActiveSection] = useState<string>(sections[0].id);

    useEffect(() => {
        window.scrollTo(0, 0);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
        );

        sections.forEach((sec: any) => {
            const el = document.getElementById(sec.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [item]);

    return (
        <div className="min-h-screen bg-white font-pretendard flex flex-col text-gray-900">
            <Navbar activePage="use-cases" />

            {/* Header */}
            <section className="pt-48 pb-16">
                <div className="max-w-[1280px] mx-auto container-responsive text-center flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-center gap-4 mb-8"
                    >
                        <span className={`text-[16px] font-bold ${USE_CASE_CATEGORY_COLORS[item.카테고리]?.text || 'text-brand-primary'}`}>
                            {item.카테고리}
                        </span>
                        <h1 className="text-[36px] md:text-[50px] font-bold text-gray-900 leading-snug break-keep tracking-tight">
                            {detail?.title || item.타이틀}
                        </h1>
                        <p className="text-[16px] md:text-[18px] break-keep text-gray-600">
                            {item.설명}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Hero Image */}
            <div className="w-full mb-24 max-w-[1280px] mx-auto container-responsive">
                <div className="w-full aspect-[21/9] sm:aspect-[24/9] md:aspect-[2.5/1] overflow-hidden rounded-[20px] bg-gray-100 border border-gray-200 shadow-md">
                    <img src={item.이미지} alt="Case Study Hero" className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Main Content with Sticky ToC */}
            <main className="max-w-[1280px] mx-auto container-responsive pb-48 flex flex-col lg:flex-row gap-20 relative">
                {/* Left: Article Content */}
                <div className="flex-1 lg:max-w-[840px]">
                    <article className="flex flex-col gap-14 font-pretendard">
                        {sections.map((section: any) => (
                            <section key={section.id} id={section.id} className="flex flex-col scroll-mt-32">
                                {section.title && (
                                    <h2 className={`${section.subtitle_level === 1 ? 'text-[20px] text-gray-600' : 'text-[22px] text-gray-900'} font-bold pt-8 border-t border-gray-200 pb-3 mb-4`}>
                                        {section.title}
                                    </h2>
                                )}

                                {section.header && (
                                    <div className="text-[18px] font-bold text-gray-800 mb-6 pl-4 border-l-2 border-brand-primary/50">
                                        {section.header}
                                    </div>
                                )}

                                {section.id === 'summary' ? (
                                    <div className="p-6 rounded-[20px] bg-brand-primary/10 border border-brand-primary/20">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-0.5 h-4 rounded-full bg-brand-primary" />
                                            <span className="text-[12px] font-bold text-brand-primary/70 tracking-wider uppercase">Summary</span>
                                        </div>
                                        <div className="text-[16px] leading-relaxed break-keep font-medium text-gray-600">
                                            {section.content}
                                        </div>
                                    </div>
                                ) : section.content && (
                                    <div className="text-[16px] leading-relaxed mb-6 break-keep whitespace-pre-line font-medium text-gray-600">
                                        {section.content}
                                    </div>
                                )}

                                {section.list && (
                                    <div className="bg-gray-50 rounded-[20px] p-6 border border-gray-200 mb-6">
                                        <ul className="flex flex-col gap-3.5">
                                            {section.list.map((li: string, idx: number) => {
                                                const colonIdx = li.indexOf(':');
                                                const hasColon = colonIdx !== -1;
                                                const title = hasColon ? li.slice(0, colonIdx) : null;
                                                const desc = hasColon ? li.slice(colonIdx + 1).trimStart() : li;
                                                return (
                                                    <li key={idx} className="flex items-start gap-3 text-gray-600">
                                                        <div className="w-0.5 h-4 rounded-full bg-brand-primary/60 shrink-0 mt-1" />
                                                        <div className="text-[15px] font-medium leading-relaxed break-keep">
                                                            {hasColon && <span className="text-gray-900 font-bold">{title}: </span>}{desc}
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )}

                                {section.groups && (
                                    <div className="flex flex-col gap-6 mb-6">
                                        {section.groups.map((group: any, gi: number) => (
                                            <div key={gi} className="bg-gray-50 rounded-[20px] p-6 border border-gray-200">
                                                <div className="text-[14px] font-bold text-gray-600 mb-4">{group.label}</div>
                                                <ul className="flex flex-col gap-3.5">
                                                    {group.items.map((it: any, idx: number) => (
                                                        <li key={idx} className="flex items-start gap-3">
                                                            {group.numbered ? (
                                                                <span className="text-brand-primary text-[14px] font-bold shrink-0 mt-0.5 w-4">{idx + 1}.</span>
                                                            ) : (
                                                                <div className="w-0.5 h-4 rounded-full bg-brand-primary/60 shrink-0 mt-1.5" />
                                                            )}
                                                            <div className="flex flex-col gap-0.5 break-keep">
                                                                <span className="text-gray-900 text-[15px] font-bold leading-snug">{it.타이틀}</span>
                                                                {it.설명 && <span className="text-[14px] font-medium leading-relaxed text-gray-600">{it.설명}</span>}
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {section.items && (
                                    section.id === 'solution' ? (
                                        <div className="bg-gray-50 rounded-[20px] p-6 border border-gray-200 mb-6">
                                            <ul className="flex flex-col gap-3.5">
                                                {section.items.map((it: any, idx: number) => (
                                                    <li key={idx} className="flex items-start gap-3">
                                                        <div className="w-0.5 h-4 rounded-full bg-brand-primary/60 shrink-0 mt-1.5" />
                                                        <div className="flex flex-col gap-0.5 break-keep">
                                                            <span className="text-gray-900 text-[16px] font-bold leading-snug">{it.타이틀}</span>
                                                            {it.설명 && <span className="text-[14px] font-medium leading-relaxed text-gray-600">{it.설명}</span>}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : (
                                        <div className={`grid grid-cols-1 gap-4 mb-6 ${section.id === 'results' ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
                                            {section.items.map((it: any, idx: number) => (
                                                <div key={idx} className="p-5 rounded-[16px] bg-gray-50 border border-gray-200 flex flex-col gap-3">
                                                    {section.id !== 'results' && (
                                                        <span className="text-brand-primary text-[13px] font-bold shrink-0 leading-none mt-0.5">{(idx + 1).toString().padStart(2, '0')}</span>
                                                    )}
                                                    <div className={`font-bold leading-tight ${section.id === 'results' ? 'text-[17px] text-emerald-600' : 'text-[17px] text-gray-900'}`}>{it.타이틀}</div>
                                                    <p className="text-[14px] leading-relaxed break-keep font-medium text-gray-600">{it.설명}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                )}

                                {section.quotes && (
                                    <div className="flex flex-col gap-8 mt-4">
                                        {section.quotes.map((q: any, idx: number) => (
                                            <div key={idx} className="relative pl-5 border-l-2 border-brand-primary/40">
                                                <div className="text-[16px] font-medium leading-relaxed mb-3 break-keep text-gray-600">
                                                    {q.text}
                                                </div>
                                                <div className="text-brand-primary text-[14px] font-bold">— {q.author}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {section.footer && (
                                    <div className="mt-6 p-6 rounded-[20px] bg-brand-primary/10 border border-brand-primary/20">
                                        <div className="text-[16px] leading-relaxed break-keep font-medium text-gray-600">
                                            {section.footer}
                                        </div>
                                    </div>
                                )}
                            </section>
                        ))}
                    </article>
                </div>

                {/* Right: Sticky Table of Contents */}
                <aside className="hidden lg:block w-[220px] shrink-0">
                    <div className="sticky top-32 flex flex-col gap-5">
                        <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-4">Contents</div>
                        <nav className="flex flex-col border-l border-gray-200">
                            {sections.filter((s: any) => s.title).map((nav: any) => (
                                <a
                                    key={nav.id}
                                    href={`#${nav.id}`}
                                    className={`py-2.5 pl-4 text-[14px] font-medium transition-all border-l-2 -ml-[1px] cursor-pointer ${activeSection === nav.id
                                        ? "text-gray-900 font-bold border-brand-primary"
                                        : "text-gray-400 border-transparent hover:text-gray-600"
                                    }`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById(nav.id)?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    {nav.title.replace(/^\d+\.\s*/, '').replace(/^\d+\)\s*/, '')}
                                </a>
                            ))}
                        </nav>

                        <div className="mt-8 p-4 rounded-[16px] bg-gray-50 border border-gray-200 flex flex-col gap-4">
                            <h4 className="text-[15px] font-bold text-gray-900 break-keep">비슷한 과제를 겪고 계신가요?</h4>
                            <a href="mailto:">
                                <Button
                                    className="w-full h-11 bg-brand-primary hover:bg-brand-primary/90 text-white border-0 rounded-lg font-bold text-[14px] group relative transition-all duration-300"
                                >
                                    <span className="group-hover:-translate-x-2 transition-transform duration-300">상담 문의하기</span>
                                    <ChevronRight size={18} className="absolute right-4 max-w-0 opacity-0 group-hover:max-w-[24px] group-hover:opacity-100 transition-all duration-300 overflow-hidden" />
                                </Button>
                            </a>
                        </div>
                    </div>
                </aside>
            </main>

            <Footer />
        </div>
    );
}
