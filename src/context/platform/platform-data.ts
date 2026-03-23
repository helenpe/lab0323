import { PlatformProduct } from './types';
import { aiPortalData } from './data/ai-portal';
import { aiMinutesData } from './data/ai-minutes';
import { aiOnUData } from './data/ai-on-u';
import { auditAgentData } from './data/audit-agent';
import { autoBuilderData } from './data/auto-builder';
import { beastAiGatewayData } from './data/beast-ai-gateway';
import { cloudWizData } from './data/cloudwiz';
import { codeboxData } from './data/codebox';
import { rfpAgentData } from './data/rfp-agent';

export type { PlatformProduct } from './types';

export const PLATFORM_PAGE_CONFIG = {
    hero: {
        title: "AI Products / Service",
        description: "Biz.AI의 멀티 에이전트 플랫폼은 각 산업 분야에 최적화된 전문 AI 에이전트들을 통해 비즈니스 혁신을 지원합니다."
    },
    sidebarItems: [
        "AI Portal",
        "AI 회의록",
        "AI:ON-U",
        "Audit Agent",
        "Auto Builder",
        "Beast AI Gateway",
        "CloudWiz",
        "Codebox",
        "RFP Agent"
    ],
    products: {
        "AI Portal": aiPortalData,
        "AI 회의록": aiMinutesData,
        "AI:ON-U": aiOnUData,
        "Audit Agent": auditAgentData,
        "Auto Builder": autoBuilderData,
        "Beast AI Gateway": beastAiGatewayData,
        "CloudWiz": cloudWizData,
        "Codebox": codeboxData,
        "RFP Agent": rfpAgentData,
    } as Record<string, PlatformProduct>
};
