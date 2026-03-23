import { createContext, useContext, useState, ReactNode } from 'react';
import { PLATFORM_PAGE_CONFIG } from './platform-data-test';
import { PlatformProduct } from './types';

const STORAGE_KEY = 'biz_ai_product_overrides';

type ProductsMap = Record<string, PlatformProduct>;

function loadFromStorage(): ProductsMap {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return JSON.parse(stored);
    } catch {}
    return {};
}

function saveToStorage(overrides: ProductsMap) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
}

interface ProductsContextValue {
    products: ProductsMap;
    setProduct: (id: string, data: PlatformProduct) => void;
    removeProduct: (id: string) => void;
}

const ProductsContext = createContext<ProductsContextValue | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
    const [overrides, setOverrides] = useState<ProductsMap>(loadFromStorage);

    // Static base data merged with admin overrides
    const products: ProductsMap = {
        ...PLATFORM_PAGE_CONFIG.products,
        ...overrides,
    };

    const setProduct = (id: string, data: PlatformProduct) => {
        const next = { ...overrides, [id]: data };
        setOverrides(next);
        saveToStorage(next);
    };

    const removeProduct = (id: string) => {
        const next = { ...overrides };
        delete next[id];
        setOverrides(next);
        saveToStorage(next);
    };

    return (
        <ProductsContext.Provider value={{ products, setProduct, removeProduct }}>
            {children}
        </ProductsContext.Provider>
    );
}

export function useProductsContext() {
    const ctx = useContext(ProductsContext);
    if (!ctx) throw new Error('useProductsContext must be used within ProductsProvider');
    return ctx;
}
