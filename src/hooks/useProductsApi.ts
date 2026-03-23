import { useProductsContext } from '../context/platform/ProductsContext';
import { PlatformProduct } from '../context/platform/types';

// Extend PlatformProduct with an ID field used exclusively for list management
export interface ManagedProduct extends PlatformProduct {
  id: string;
}

export function useProductsApi() {
  const { products, setProduct, removeProduct } = useProductsContext();

  const productList: ManagedProduct[] = Object.entries(products).map(([id, data]) => ({
    id,
    ...data,
  }));

  const createProduct = async (product: Partial<ManagedProduct>) => {
    const { id, ...data } = product as ManagedProduct;
    if (!id) return false;
    setProduct(id, data as PlatformProduct);
    return true;
  };

  const updateProduct = async (id: string, product: Partial<ManagedProduct>) => {
    const { id: _id, ...data } = product as ManagedProduct;
    const current = products[id] ?? {} as PlatformProduct;
    setProduct(id, { ...current, ...data } as PlatformProduct);
    return true;
  };

  const deleteProduct = async (id: string) => {
    removeProduct(id);
    return true;
  };

  return {
    products: productList,
    loading: false,
    error: null,
    fetchProducts: () => {},
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
