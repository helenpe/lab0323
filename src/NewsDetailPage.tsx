import { useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { HIGHLIGHT_NEWS, REGULAR_NEWS } from './context/news/news-data';

export default function NewsDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const allNews = [...HIGHLIGHT_NEWS, ...REGULAR_NEWS];
    const newsIndex = id ? parseInt(id) - 1 : 0;
    const news = allNews[newsIndex] || allNews[0];

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

            {/* Header */}
            <section className="pt-48 pb-16">
                <div className="max-w-[1280px] mx-auto container-responsive text-center flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-[900px] flex flex-col items-center"
                    >
                        <div className="mb-6">
                            <span className={`${getTagColor(news.태그)} text-[16px] font-bold`}>{news.태그}</span>
                        </div>

                        <h1 className="text-[36px] md:text-[50px] font-bold text-gray-900 mb-6 leading-snug break-keep tracking-tight">
                            {news.타이틀}
                        </h1>

                        <div className="flex items-center gap-3 mb-8 text-[16px] font-medium flex-wrap justify-center">
                            <span className="text-gray-400">{news.날짜}</span>
                            {news.언론사 && <>
                                <span className="text-gray-300">|</span>
                                <span className="text-gray-400">{news.언론사}</span>
                            </>}
                            {news.링크 && <>
                                <span className="text-gray-300">|</span>
                                <a href={news.링크} target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline" size="sm" className="gap-1.5 text-[15px]">
                                        기사 바로가기 <ExternalLink size={14} />
                                    </Button>
                                </a>
                            </>}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Hero Image */}
            <div className="w-full mb-16 max-w-[1280px] mx-auto container-responsive">
                <div className="w-full aspect-[21/9] sm:aspect-[24/9] md:aspect-[2.5/1] overflow-hidden rounded-[20px] bg-gray-100 border border-gray-200 shadow-md">
                    <img
                        src={news.이미지}
                        alt="News Detail"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* 본문 */}
            <main className="max-w-[1280px] mx-auto container-responsive pb-32 flex-1 flex flex-col items-center">
                <article className="max-w-[800px] w-full">
                    {news.내용 ? (
                        <p className="text-[16px] leading-[1.9] font-medium whitespace-pre-wrap break-keep mb-8 text-gray-600">
                            {news.내용}
                        </p>
                    ) : (
                        <p className="text-gray-400 text-[16px] font-medium italic">상세 내용이 준비 중입니다.</p>
                    )}
                </article>

                {/* 목록보기 */}
                <div className="mt-16 pt-10 border-t border-gray-200 w-full max-w-[800px] flex justify-center">
                    <Button
                        variant="outline"
                        rounded="lg"
                        className="w-[120px] h-12 text-[15px] font-bold"
                        onClick={() => navigate('/news')}
                    >
                        목록보기
                    </Button>
                </div>
            </main>

            <Footer />
        </div>
    );
}
