import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Play, Download, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlatformProduct } from '@/context/platform/platform-data-test';
import { useProductsContext } from '@/context/platform/ProductsContext';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

interface PageConfig {
    hero: { title: string; description: string };
    sidebarItems: string[];
    products: Record<string, PlatformProduct>;
}

interface MultiAgentPlatformPageProps {
    config: PageConfig;
    activePage?: 'agents' | 'solutions';
}


function EmptyPlaceholder({ label }: { label: string }) {
    return (
        <div className="rounded-[16px] border border-dashed border-gray-300 bg-gray-50/50 flex items-center justify-center py-12">
            <p className="text-gray-400 text-[14px] font-medium">{label} 준비 중입니다</p>
        </div>
    );
}

export default function MultiAgentPlatformPage({ config, activePage = 'agents' }: MultiAgentPlatformPageProps) {
    const [activeTab, setActiveTab] = useState(config.sidebarItems[0]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        setActiveTab(sidebarItems[0] ?? config.sidebarItems[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activePage]);

    useEffect(() => {
        setCurrentImageIndex(0);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [activeTab]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { products: allProducts } = useProductsContext();

    // Determine which 구분 value maps to this page
    const categoryForPage = activePage === 'agents' ? '에이전트' : '솔루션';

    // Stable sidebar items: products with matching 구분, or static config members without 구분
    const sidebarItems = useMemo(() =>
        Object.entries(allProducts)
            .filter(([id, product]) =>
                product.구분 ? product.구분 === categoryForPage : id in config.products
            )
            .map(([id]) => id),
        [allProducts, categoryForPage, config.products]
    );

    // If activeTab is no longer in sidebarItems (e.g. 구분 changed), use first item
    const resolvedTab = sidebarItems.includes(activeTab) ? activeTab : (sidebarItems[0] ?? activeTab);
    const currentContent = allProducts[resolvedTab] ?? config.products[resolvedTab];
    const heroText = config.hero;


    return (
        <div className="min-h-screen bg-white text-gray-900 font-pretendard flex flex-col">
            <Navbar activePage={activePage} />

            <section className="pt-48 pb-32 flex-1">
                <div className="max-w-[1280px] mx-auto container-responsive mb-20">
                    <motion.div
                        key={resolvedTab + "header"}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-[36px] lg:text-[58px] font-bold text-gray-900 mb-6 tracking-tight leading-tight">
                            {heroText.title}
                        </h1>
                        <p className="text-gray-600 text-[16px] max-w-2xl font-medium leading-relaxed">
                            {heroText.description}
                        </p>
                    </motion.div>
                </div>

                {/* 모바일 탭 */}
                <div className="lg:hidden sticky top-[72px] backdrop-blur-sm z-40 border-b border-gray-200 mb-12" style={{ backgroundColor: 'rgba(255, 255, 255, 0.97)' }}>
                    <div className="max-w-[1280px] mx-auto container-responsive flex items-center gap-8 h-[66px] overflow-x-auto no-scrollbar whitespace-nowrap">
                        {sidebarItems.map((item) => (
                            <Button
                                key={item}
                                variant="ghost"
                                rounded="none"
                                onClick={() => setActiveTab(item)}
                                className={`relative h-full text-[14px] font-medium transition-all shrink-0 flex items-center px-1 cursor-pointer hover:bg-transparent focus-visible:ring-0 focus-visible:outline-none ${resolvedTab === item ? "text-gray-900 font-bold" : "text-gray-400 hover:text-gray-900"}`}
                            >
                                {item}
                                {resolvedTab === item && (
                                    <motion.div layoutId="activePlatformTab" className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-primary rounded-full" />
                                )}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="max-w-[1280px] mx-auto container-responsive">
                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* 왼쪽 사이드바 (데스크탑) */}
                        <aside className="hidden lg:block lg:w-[220px] shrink-0">
                            <div className="flex flex-col gap-2 sticky top-[100px]">
                                {sidebarItems.map((item) => (
                                    <Button
                                        key={item}
                                        variant={resolvedTab === item ? "default" : "ghost"}
                                        rounded="lg"
                                        onClick={() => setActiveTab(item)}
                                        className={`w-full justify-start px-4 h-11 text-[17px] font-semibold transition-all cursor-pointer ${resolvedTab === item
                                            ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20"
                                            : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"
                                            }`}
                                    >
                                        {item}
                                    </Button>
                                ))}
                            </div>
                        </aside>

                        {/* 메인 콘텐츠 */}
                        <main className="flex-1 min-w-0">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={resolvedTab}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {/* 1. 개요 */}
                                    <div id="section-overview" className="mb-10 scroll-mt-32">
                                        <h2 className="text-[32px] font-bold text-gray-900 mb-4 break-keep">{currentContent.타이틀}</h2>
                                        <div className="text-gray-600 text-[16px] leading-relaxed break-keep font-medium">
                                            <p>{currentContent.설명}</p>
                                        </div>
                                    </div>

                                    {/* 2. 주요 고객군 */}
                                    <div id="section-target" className="mb-10 pt-10 border-t border-gray-200 scroll-mt-32">
                                        <h3 className="text-[22px] font-bold text-gray-900 mb-4">1. 주요 고객군</h3>
                                        {currentContent.주요고객군 ? (
                                            <div className="pl-4 border-l-2 border-brand-primary/40">
                                                <p className="text-gray-600 text-[16px] font-medium leading-relaxed">{currentContent.주요고객군}</p>
                                            </div>
                                        ) : (
                                            <EmptyPlaceholder label="주요 고객군" />
                                        )}
                                    </div>

                                    {/* 3. 핵심가치 */}
                                    <div id="section-values" className="mb-10 pt-10 border-t border-gray-200 scroll-mt-32">
                                        <h3 className="text-[22px] font-bold text-gray-900 mb-4">2. 핵심가치</h3>
                                        {currentContent.핵심가치 && currentContent.핵심가치.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {currentContent.핵심가치.map((item, i) => (
                                                    <div key={i} className="bg-gray-50 backdrop-blur-sm rounded-[20px] p-5 border border-gray-200">
                                                        <h4 className="text-[16px] font-bold text-gray-900 mb-2">{item.타이틀}</h4>
                                                        <p className="text-gray-500 text-[14px] leading-relaxed font-medium">{item.설명}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <EmptyPlaceholder label="핵심가치" />
                                        )}
                                    </div>

                                    {/* 4. 주요 기능 */}
                                    <div id="section-features" className="mb-10 pt-10 border-t border-gray-200 scroll-mt-32">
                                        <h3 className="text-[22px] font-bold text-gray-900 mb-4">3. 주요기능</h3>
                                        {currentContent.주요기능 && currentContent.주요기능.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {currentContent.주요기능.map((feature, i) => {
                                                    const [title, ...descParts] = feature.split(':');
                                                    const description = descParts.join(':').trim();
                                                    return (
                                                        <div key={i} className="bg-gray-50 rounded-[16px] p-5 border border-gray-200 flex flex-col gap-2">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-0.5 h-5 bg-brand-primary rounded-full shrink-0" />
                                                                <div className="text-gray-900 text-[16px] font-bold leading-tight">
                                                                    {title.trim()}
                                                                </div>
                                                            </div>
                                                            {description && (
                                                                <div className="pl-4 text-gray-400 text-[14px] leading-relaxed font-medium break-keep">
                                                                    {description}
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <EmptyPlaceholder label="주요 기능" />
                                        )}
                                    </div>

                                    {/* 5. 주요 특징 */}
                                    <div id="section-screenshots" className="mb-10 pt-10 border-t border-gray-200 scroll-mt-32">
                                        <h3 className="text-[22px] font-bold text-gray-900 mb-4">4. 주요특징</h3>
                                        {currentContent.주요특징이미지 && currentContent.주요특징이미지.length > 0 ? (
                                            <div className="rounded-[20px] overflow-hidden border border-gray-200 bg-gray-50">
                                                <div className="relative">
                                                    <AnimatePresence mode="wait">
                                                        <motion.img
                                                            key={currentImageIndex}
                                                            initial={{ opacity: 0, x: 20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            exit={{ opacity: 0, x: -20 }}
                                                            transition={{ duration: 0.3 }}
                                                            src={currentContent.주요특징이미지[currentImageIndex].이미지URL}
                                                            alt={currentContent.주요특징이미지[currentImageIndex].타이틀}
                                                            className="w-full h-auto block"
                                                        />
                                                    </AnimatePresence>
                                                    {currentContent.주요특징이미지.length > 1 && (
                                                        <>
                                                            <Button
                                                                variant="glass"
                                                                size="icon-sm"
                                                                rounded="full"
                                                                onClick={() => setCurrentImageIndex((prev) => Math.max(0, prev - 1))}
                                                                disabled={currentImageIndex === 0}
                                                                className="absolute left-3 top-1/2 -translate-y-1/2"
                                                            >
                                                                <ChevronLeft className="size-5" strokeWidth={3} />
                                                            </Button>
                                                            <Button
                                                                variant="glass"
                                                                size="icon-sm"
                                                                rounded="full"
                                                                onClick={() => setCurrentImageIndex((prev) => Math.min(currentContent.주요특징이미지!.length - 1, prev + 1))}
                                                                disabled={currentImageIndex === currentContent.주요특징이미지.length - 1}
                                                                className="absolute right-3 top-1/2 -translate-y-1/2"
                                                            >
                                                                <ChevronRight className="size-5" strokeWidth={3} />
                                                            </Button>
                                                        </>
                                                    )}
                                                </div>
                                                <div className="p-5 flex items-start justify-between gap-4 border-t border-gray-200">
                                                    <div className="flex-1">
                                                        <h4 className="text-[17px] font-bold text-gray-900 mb-1.5">{currentContent.주요특징이미지[currentImageIndex].타이틀}</h4>
                                                        <p className="text-gray-500 text-[14px] leading-relaxed break-keep font-medium">{currentContent.주요특징이미지[currentImageIndex].설명}</p>
                                                    </div>
                                                    {currentContent.주요특징이미지.length > 1 && (
                                                        <span className="text-[13px] text-gray-400 font-medium shrink-0 pt-0.5">{currentImageIndex + 1} / {currentContent.주요특징이미지.length}</span>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <EmptyPlaceholder label="주요 특징" />
                                        )}
                                    </div>

                                    {/* 6. 특장점 */}
                                    <div id="section-advantages" className="mb-10 pt-10 border-t border-gray-200 scroll-mt-32">
                                        <h3 className="text-[22px] font-bold text-gray-900 mb-4">5. 특장점</h3>
                                        {currentContent.특장점 && currentContent.특장점.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {currentContent.특장점.map((item, i) => (
                                                    <div key={i} className="bg-gray-50 rounded-[16px] p-5 border border-gray-200 flex flex-col gap-3">
                                                        <span className="text-brand-primary text-[14px] font-bold leading-none">{(i + 1).toString().padStart(2, '0')}</span>
                                                        <h4 className="text-[17px] font-bold text-gray-900 leading-tight">
                                                            {item.타이틀.replace(/^\d+\.\s*/, '')}
                                                        </h4>
                                                        <p className="text-gray-600 text-[14px] leading-relaxed break-keep font-medium">
                                                            {item.설명}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <EmptyPlaceholder label="특장점" />
                                        )}
                                    </div>

                                    {/* 7. 활용 시나리오 */}
                                    <div id="section-scenarios" className="mb-12 pt-10 border-t border-gray-200 scroll-mt-32">
                                        <h3 className="text-[22px] font-bold text-gray-900 mb-4">6. 이렇게 활용하세요</h3>
                                        {currentContent.주요활용시나리오 && currentContent.주요활용시나리오.length > 0 ? (
                                            <div className="grid grid-cols-1 gap-4">
                                                {currentContent.주요활용시나리오.map((item, i) => (
                                                    <div key={i} className="bg-gray-50 backdrop-blur-sm rounded-[20px] p-5 border border-gray-200">
                                                        <h4 className="text-[20px] font-bold text-gray-900 mb-6">{item.타이틀}</h4>
                                                        <div className="flex items-start gap-4 text-gray-600">
                                                            <div className="flex-1">
                                                                {item.설명.split('\n').map((line, idx) => {
                                                                    const trimmedLine = line.trim();
                                                                    if (!trimmedLine) return <div key={idx} className="h-4" />;
                                                                    const subHeaderRegex = /^(As-Is|To-Be|기대\s?효과|대상\s?사용자)/i;
                                                                    const isSubHeader = subHeaderRegex.test(trimmedLine);
                                                                    if (isSubHeader) {
                                                                        const colonIndex = trimmedLine.indexOf(':');
                                                                        const hasContentAfterColon = colonIndex !== -1 && trimmedLine.substring(colonIndex + 1).trim().length > 0;
                                                                        const isAsIs = /^As-Is/i.test(trimmedLine);
                                                                        const isEffect = /^기대/.test(trimmedLine);
                                                                        const barColor = isAsIs ? 'bg-gray-400' : isEffect ? 'bg-emerald' : 'bg-brand-primary';
                                                                        const labelColor = isAsIs ? 'text-gray-500' : isEffect ? 'text-emerald' : 'text-gray-900';
                                                                        const borderColor = isAsIs ? 'border-gray-200' : isEffect ? 'border-emerald/20' : 'border-brand-primary/20';
                                                                        if (hasContentAfterColon) {
                                                                            const titlePart = trimmedLine.substring(0, colonIndex + 1);
                                                                            const contentPart = trimmedLine.substring(colonIndex + 1).trim();
                                                                            return (
                                                                                <div key={idx} className="mt-8 mb-4 first:mt-0">
                                                                                    <div className={`text-[15px] font-bold flex items-center gap-2 mb-2 ${labelColor}`}>
                                                                                        <div className={`w-0.5 h-4 rounded-full ${barColor}`} />
                                                                                        {titlePart}
                                                                                    </div>
                                                                                    <div className={`text-[14px] leading-relaxed opacity-80 pl-3 border-l ml-0.5 ${borderColor}`}>
                                                                                        {contentPart}
                                                                                    </div>
                                                                                </div>
                                                                            );
                                                                        }
                                                                        return (
                                                                            <div key={idx} className={`text-[15px] font-bold mt-8 mb-3 first:mt-0 flex items-center gap-2 ${labelColor}`}>
                                                                                <div className={`w-0.5 h-4 rounded-full ${barColor}`} />
                                                                                {trimmedLine}
                                                                            </div>
                                                                        );
                                                                    }
                                                                    return (
                                                                        <div key={idx} className="text-[14px] leading-relaxed mb-2 opacity-80 pl-0">
                                                                            {trimmedLine}
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <EmptyPlaceholder label="활용 시나리오" />
                                        )}
                                    </div>

                                    {/* 8. 고객사례 */}
                                    <div id="section-cases" className="mb-12 pt-10 border-t border-gray-200 scroll-mt-32">
                                        <h3 className="text-[22px] font-bold text-gray-900 mb-4">7. 고객사례</h3>
                                        {currentContent.고객사례 && currentContent.고객사례.length > 0 ? (
                                            <div className={`grid grid-cols-1 ${currentContent.고객사례.length > 1 ? 'md:grid-cols-2' : ''} gap-4`}>
                                                {currentContent.고객사례.map((item, i) => (
                                                    <div key={i} className="bg-gray-50 backdrop-blur-sm rounded-[20px] border border-gray-200 group transition-all hover:border-brand-primary/50">
                                                        <div className="p-5">
                                                            <div className="mb-5">
                                                                <h4 className="text-[18px] font-bold text-gray-900 leading-tight mb-1.5">
                                                                    {item.기업명 || item.고객조직 || "고객 사례"}
                                                                </h4>
                                                                {(item.산업분야 || item.적용범위) && (
                                                                    <span className="inline-flex items-center text-[11px] font-bold text-brand-primary bg-brand-primary/10 border border-brand-primary/20 rounded-full px-2 py-0.5 tracking-wide">
                                                                        {item.산업분야 || item.적용범위}
                                                                    </span>
                                                                )}
                                                            </div>

                                                            <div className="space-y-4 mb-5">
                                                                {/* 기존 항목들(array of objects) 처리 */}
                                                                {item.항목들 && Array.isArray(item.항목들) && item.항목들.map((detail: any, idx: number) => (
                                                                    <div key={idx}>
                                                                        {detail.타이틀 === '성과' ? (
                                                                            <div className="rounded-xl bg-brand-primary/10 border border-brand-primary/20 p-3.5">
                                                                                <div className="flex items-center gap-1.5 mb-1.5">
                                                                                    <div className="w-0.5 h-3.5 rounded-full bg-brand-primary" />
                                                                                    <span className="text-[11px] font-bold text-brand-primary/70 tracking-wider uppercase">성과</span>
                                                                                </div>
                                                                                <p className="text-[14px] leading-relaxed break-keep text-brand-primary font-bold">{detail.내용}</p>
                                                                            </div>
                                                                        ) : (
                                                                            <div>
                                                                                <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-1.5 block">{detail.타이틀}</span>
                                                                                <p className="text-[14px] leading-relaxed break-keep text-gray-600">{detail.내용}</p>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                ))}

                                                                {/* 새로운 필드들 (평면적 구조) 처리 */}
                                                                {item.핵심적용기능 && (
                                                                    <div>
                                                                        <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-2 block">핵심 적용 기능</span>
                                                                        <div className="flex flex-wrap gap-1.5">
                                                                            {Array.isArray(item.핵심적용기능) ? item.핵심적용기능.map((tech: string, i: number) => (
                                                                                <span key={i} className="text-[12px] px-2 py-0.5 bg-gray-50 border border-gray-200 rounded-md text-gray-600">{tech}</span>
                                                                            )) : <span className="text-gray-600 text-[14px]">{item.핵심적용기능}</span>}
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {(item.성과정량 || item.성과정성) && (
                                                                    <div className="rounded-xl bg-brand-primary/10 border border-brand-primary/20 p-3.5">
                                                                        <div className="flex items-center gap-1.5 mb-1.5">
                                                                            <div className="w-0.5 h-3.5 rounded-full bg-brand-primary" />
                                                                            <span className="text-[11px] font-bold text-brand-primary/70 tracking-wider uppercase">성과</span>
                                                                        </div>
                                                                        <div className="space-y-2">
                                                                            {item.성과정량 && <p className="text-[14px] leading-relaxed break-keep text-brand-primary font-bold">🎯 {item.성과정량}</p>}
                                                                            {item.성과정성 && <p className="text-[13px] leading-relaxed break-keep text-brand-primary/80">{item.성과정성}</p>}
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {item.담당자코멘트 && (
                                                                    <div className="pt-2 italic text-[14px] text-gray-400/80 relative">
                                                                        <span className="absolute -left-2 top-1 text-2xl text-brand-primary/20">"</span>
                                                                        {item.담당자코멘트}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            {item.상세링크 && (
                                                                <Link to={item.상세링크}>
                                                                    <Button
                                                                        variant="ghost"
                                                                        className="h-auto p-0 text-[13px] font-bold relative transition-all duration-300 hover:bg-transparent hover:text-gray-600"
                                                                    >
                                                                        <span className="group-hover:-translate-x-1.5 transition-transform duration-300">자세히 보기</span>
                                                                        <ChevronRight size={14} className="max-w-0 opacity-0 group-hover:max-w-[14px] group-hover:opacity-100 group-hover:ml-1 transition-all duration-300 overflow-hidden" />
                                                                    </Button>
                                                                </Link>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <EmptyPlaceholder label="고객사례" />
                                        )}
                                    </div>

                                    {/* 9. 소개영상 */}
                                    <div id="section-videos" className="mb-10 pt-10 border-t border-gray-200 scroll-mt-32">
                                        <h3 className="text-[22px] font-bold text-gray-900 mb-4">8. 소개영상</h3>
                                        {currentContent.소개영상 && currentContent.소개영상.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                {currentContent.소개영상.map((video, i) => {
                                                    const youtubeThumbnail = (url: string) => {
                                                        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                                                        const match = url.match(regExp);
                                                        if (match && match[2].length === 11) {
                                                            return `https://img.youtube.com/vi/${match[2]}/maxresdefault.jpg`;
                                                        }
                                                        return null;
                                                    };
                                                    const thumbnail = youtubeThumbnail(video.URL);
                                                    return (
                                                        <a
                                                            key={i}
                                                            href={video.URL}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="block group"
                                                        >
                                                            <div className="aspect-video bg-gray-50 rounded-[20px] border border-gray-200 flex items-center justify-center relative overflow-hidden transition-all hover:border-brand-primary/40 mb-4">
                                                                {thumbnail ? (
                                                                    <>
                                                                        <img src={thumbnail} alt={video.타이틀} className="absolute inset-0 w-full h-full object-cover opacity-100 transition-opacity duration-500" />
                                                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />
                                                                    </>
                                                                ) : (
                                                                    <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-transparent" />
                                                                )}
                                                                <div className="size-10 rounded-full bg-gray-800/70 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 z-10 border border-gray-600 shadow-2xl">
                                                                    <Play className="size-5 text-white fill-white ml-0.5" />
                                                                </div>
                                                            </div>
                                                            <h4 className="text-[17px] font-bold text-gray-700 group-hover:text-gray-900 transition-colors break-keep leading-snug pl-1">
                                                                {video.타이틀}
                                                            </h4>
                                                        </a>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <EmptyPlaceholder label="소개영상" />
                                        )}
                                    </div>

                                    {/* 10. 오퍼링 */}
                                    <div id="section-offerings" className="mb-12 pt-10 border-t border-gray-200 scroll-mt-32">
                                        <h3 className="text-[22px] font-bold text-gray-900 mb-4">9. 오퍼링</h3>
                                        {currentContent.오퍼링 && currentContent.오퍼링.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {currentContent.오퍼링.map((offering, i) => (
                                                    <div key={i} className="bg-gray-50 backdrop-blur-sm rounded-[20px] p-5 border border-gray-200 hover:border-brand-primary transition-all flex flex-col justify-between group">
                                                        <div>
                                                            <h4 className="text-[20px] font-bold text-gray-900 mb-3">{offering.타이틀}</h4>
                                                            <p className="text-gray-600 text-[15px] mb-6 leading-relaxed">{offering.설명}</p>
                                                        </div>
                                                        {offering.상세링크 && (
                                                            <Link to={offering.상세링크}>
                                                                <Button
                                                                    variant="ghost"
                                                                    className="h-auto p-0 text-[13px] font-bold relative transition-all duration-300 hover:bg-transparent hover:text-gray-600"
                                                                >
                                                                    <span className="group-hover:-translate-x-1.5 transition-transform duration-300">자세히 보기</span>
                                                                    <ChevronRight size={14} className="max-w-0 opacity-0 group-hover:max-w-[14px] group-hover:opacity-100 transition-all duration-300 overflow-hidden" />
                                                                </Button>
                                                            </Link>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <EmptyPlaceholder label="오퍼링" />
                                        )}
                                    </div>

                                    {/* 11. 문의/리소스 */}
                                    <div id="section-contact" className="pt-10 border-t border-gray-200 mb-12 scroll-mt-32">
                                        <h3 className="text-[22px] font-bold text-gray-900 mb-4">10. 문의 / 리소스</h3>
                                        {(currentContent.제품상세문의?.이메일 || currentContent.제품상세문의?.전화번호 || (currentContent.관련리소스 && currentContent.관련리소스.length > 0)) ? (
                                            <div className={`grid grid-cols-1 ${currentContent.제품상세문의 && (currentContent.제품상세문의.이메일 || currentContent.제품상세문의.전화번호) && currentContent.관련리소스 && currentContent.관련리소스.length > 0 ? 'md:grid-cols-2' : ''} gap-5 items-stretch`}>
                                                {currentContent.제품상세문의 && (currentContent.제품상세문의.이메일 || currentContent.제품상세문의.전화번호) && (
                                                    <div className="flex flex-col h-full">
                                                        <h4 className="text-[13px] font-bold text-gray-400 mb-3 tracking-wider uppercase">제품 상세 문의</h4>
                                                        <div className="bg-gray-50 backdrop-blur-sm rounded-[20px] p-5 border border-gray-200 flex flex-col gap-4 items-start justify-center flex-1 min-h-[100px]">
                                                            {currentContent.제품상세문의.이메일 && (
                                                                <div className="flex items-center gap-4 text-gray-900">
                                                                    <div className="size-8 rounded-lg bg-gray-50 flex items-center justify-center">
                                                                        <Mail className="size-4 text-gray-400" />
                                                                    </div>
                                                                    <span className="text-[16px] font-medium">{currentContent.제품상세문의.이메일}</span>
                                                                </div>
                                                            )}
                                                            {currentContent.제품상세문의.전화번호 && (
                                                                <div className="flex items-center gap-4 text-gray-900">
                                                                    <div className="size-8 rounded-lg bg-gray-50 flex items-center justify-center">
                                                                        <Phone className="size-4 text-gray-400" />
                                                                    </div>
                                                                    <span className="text-[16px] font-medium">{currentContent.제품상세문의.전화번호}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                                {currentContent.관련리소스 && currentContent.관련리소스.length > 0 && (
                                                    <div className="flex flex-col h-full">
                                                        <h4 className="text-[13px] font-bold text-gray-400 mb-3 tracking-wider uppercase">관련 리소스</h4>
                                                        <div className="space-y-4 flex-1">
                                                            {currentContent.관련리소스.map((resource, i) => (
                                                                <Button
                                                                    key={i}
                                                                    variant="outline"
                                                                    rounded="2xl"
                                                                    className="w-full flex justify-between items-center p-5 bg-gray-50 border border-gray-200 hover:border-brand-primary transition-all group text-left min-h-[64px] h-auto"
                                                                >
                                                                    <div className="flex items-center gap-4">
                                                                        <div className="size-8 bg-brand-primary/10 rounded-lg flex items-center justify-center text-[11px] font-bold text-brand-primary">
                                                                            {resource.파일타입}
                                                                        </div>
                                                                        <h4 className="text-[16px] text-gray-900/90 font-medium">{resource.타이틀}</h4>
                                                                    </div>
                                                                    <Download className="size-5 text-gray-400 group-hover:text-brand-primary transition-colors" />
                                                                </Button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <EmptyPlaceholder label="문의/리소스" />
                                        )}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </main>


                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
