import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

import { HIGHLIGHT_NEWS, REGULAR_NEWS, NEWS_CATEGORIES } from '@/context/news/news-data';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function NewsPage() {
    const [activeCategory, setActiveCategory] = useState("전체");
    const navigate = useNavigate();

    const getTagColor = (tag: string) => {
        if (tag === "기술 이야기") return "text-emerald-600";
        return "text-brand-primary";
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-white font-pretendard flex flex-col text-gray-900">
            <Navbar activePage="news" />

            <section className="pt-48 pb-32 flex-1">
                {/* 헤더 */}
                <div className="max-w-[1280px] mx-auto container-responsive mb-20">
                    <div className="flex justify-between items-end">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <h1 className="text-[36px] lg:text-[58px] font-bold text-gray-900 mb-6 tracking-tight leading-tight">
                                News
                            </h1>
                            <p className="text-gray-600 text-[18px] max-w-2xl font-medium leading-relaxed">
                                Biz.AI가 전하는 최신 업데이트와 인사이트를 확인하세요.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* 카테고리 탭 */}
                <div className="sticky top-[72px] lg:top-[64px] backdrop-blur-sm z-40 border-b border-gray-200 mb-12" style={{ backgroundColor: 'rgba(255, 255, 255, 0.97)' }}>
                    <div className="max-w-[1280px] mx-auto container-responsive flex items-center gap-8 h-[66px]">
                        {NEWS_CATEGORIES.map((category) => (
                            <Button
                                key={category}
                                variant="ghost"
                                rounded="none"
                                onClick={() => setActiveCategory(category)}
                                className={`relative h-full text-[15px] transition-colors flex items-center px-1 cursor-pointer hover:bg-transparent focus-visible:ring-0 focus-visible:outline-none ${activeCategory === category
                                    ? "text-gray-900 font-bold"
                                    : "text-gray-400 font-medium hover:text-gray-900"
                                    }`}
                            >
                                {category}
                                {activeCategory === category && (
                                    <motion.div
                                        layoutId="activeCategoryNews"
                                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-primary rounded-full"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* 뉴스 목록 */}
                <div className="max-w-[1280px] mx-auto container-responsive">
                    <div className="flex flex-col divide-y divide-gray-100">
                        {[...HIGHLIGHT_NEWS, ...REGULAR_NEWS].filter(news => activeCategory === "전체" || news.태그 === activeCategory).map((news: any, i) => (
                            <motion.div
                                key={i}
                                onClick={() => navigate(`/news/${i + 1}`, { state: { news } })}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05, duration: 0.4 }}
                                className="group flex flex-col-reverse sm:flex-row gap-8 items-center py-8 cursor-pointer"
                            >
                                <div className="flex-1 w-full flex flex-col">
                                    <span className={`${getTagColor(news.태그)} text-[13px] font-bold mb-2.5`}>{news.태그}</span>
                                    <h3 className="text-gray-900 text-[22px] font-bold leading-snug mb-3 group-hover:text-gray-600 transition-colors">{news.타이틀}</h3>
                                    <p className="text-gray-500 text-[15px] leading-relaxed line-clamp-2 mb-5 font-medium">{news.설명}</p>
                                    <div className="flex items-center text-gray-400 text-[13px] font-medium">
                                        <span>{news.언론사 || news.솔루션}</span>
                                        <span className="mx-2 text-[4px] opacity-50">●</span>
                                        <span>{news.날짜}</span>
                                    </div>
                                </div>

                                <div className="w-full sm:w-[220px] shrink-0 aspect-video rounded-[16px] overflow-hidden bg-gray-100 border border-gray-200">
                                    <img
                                        src={news.이미지}
                                        alt={news.타이틀}
                                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
