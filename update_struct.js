const fs = require('fs');
const path = require('path');

try {
    const typesPath = path.resolve('./src/context/platform/types.ts');
    const typesContent = `export interface PlatformProduct {
    타이틀: string;
    주요고객군: string;
    핵심가치: { 타이틀: string; 설명: string }[];
    주요기능: string[];
    메인이미지?: string;
    주요특징이미지: {
        타이틀: string;
        설명: string;
        이미지URL: string;
    }[];
    특장점: { 타이틀: string; 설명: string }[];
    주요활용시나리오: { 타이틀: string; 설명: string }[];
    고객사례: any[];
    소개영상: {
        타이틀: string;
        URL: string;
    }[];
    오퍼링: {
        타이틀: string;
        설명: string;
        상세링크?: string;
    }[];
    제품상세문의: {
        이메일: string;
        전화번호: string;
    };
    관련리소스: {
        타이틀: string;
        파일타입: string;
        URL: string;
    }[];
}`;
    fs.writeFileSync(typesPath, typesContent, 'utf-8');

    const dataDir = path.resolve('./src/context/platform/data');
    const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.ts'));

    let replaceCount = 0;
    files.forEach(file => {
        const filePath = path.join(dataDir, file);
        let content = fs.readFileSync(filePath, 'utf-8');

        content = content.replace(/\n\s*다운로드:\s*\[\],?/g, '');
        content = content.replace(/\n\s*노출뉴스:\s*\[\],?/g, '');
        content = content.replace(/\n\s*설명:\s*".*?",?/g, '');

        fs.writeFileSync(filePath, content, 'utf-8');
        replaceCount++;
    });

    const pagePath = path.resolve('./src/MultiAgentPlatformPage.tsx');
    let pageContent = fs.readFileSync(pagePath, 'utf-8');
    pageContent = pageContent.replace(/<div className="text-\[16px\] leading-relaxed break-keep font-medium" style={{ color: '#AFAFAF' }}>\s*<p>\{currentContent\.설명\}<\/p>\s*<\/div>\s*/g, '');
    fs.writeFileSync(pagePath, pageContent, 'utf-8');

    console.log(`Successfully updated types.ts, MultiAgentPlatformPage.tsx, and ${replaceCount} data files.`);
} catch (e) {
    console.error("Error occurred:", e);
}
