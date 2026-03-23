import React, { useState } from 'react';
import { useProductsApi, ManagedProduct } from '../hooks/useProductsApi';
import SolutionForm from '../components/SolutionForm';
import Navbar from '../components/Navbar';

export default function AdminPage() {
  const { products, loading, error, createProduct, updateProduct, deleteProduct } = useProductsApi();
  const [editingSolution, setEditingSolution] = useState<ManagedProduct | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleCreate = () => {
    setEditingSolution(null);
    setIsFormOpen(true);
  };

  const handleEdit = (solution: ManagedProduct) => {
    setEditingSolution(solution);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('정말 이 솔루션을 삭제하시겠습니까?')) {
      await deleteProduct(id);
    }
  };

  const handleSave = async (solutionData: Partial<ManagedProduct>) => {
    if (editingSolution) {
      await updateProduct(editingSolution.id, solutionData);
    } else {
      await createProduct(solutionData);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-white font-pretendard flex flex-col">
      <Navbar />

      <div className="max-w-[1280px] mx-auto container-responsive w-full pt-36 pb-20 flex-1">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-[36px] font-bold text-gray-900 tracking-tight leading-tight">
              Admin
            </h1>
            <p className="text-gray-500 text-[15px] mt-1 font-medium">솔루션 정보를 관리합니다.</p>
          </div>
          <button
            onClick={handleCreate}
            className="bg-brand-primary hover:bg-brand-primary/90 text-white text-[14px] font-bold px-5 py-2.5 rounded-xl transition-colors"
          >
            + 신규 솔루션 등록
          </button>
        </div>

        {loading && (
          <div className="text-center py-20 text-gray-400 text-[15px]">불러오는 중...</div>
        )}
        {error && (
          <div className="text-center py-20 text-red-500 text-[15px]">오류: {error}</div>
        )}

        {!loading && !error && (
          isFormOpen ? (
            <SolutionForm
              initialData={editingSolution}
              onSave={handleSave}
              onCancel={() => setIsFormOpen(false)}
            />
          ) : (
            <div className="rounded-[16px] border border-gray-200 overflow-hidden bg-white shadow-sm">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-5 py-4 text-[12px] font-bold text-gray-400 tracking-widest uppercase">ID (Key)</th>
                    <th className="px-5 py-4 text-[12px] font-bold text-gray-400 tracking-widest uppercase hidden sm:table-cell">구분</th>
                    <th className="px-5 py-4 text-[12px] font-bold text-gray-400 tracking-widest uppercase">타이틀</th>
                    <th className="px-5 py-4 text-[12px] font-bold text-gray-400 tracking-widest uppercase hidden md:table-cell">주요고객군</th>
                    <th className="px-5 py-4 text-[12px] font-bold text-gray-400 tracking-widest uppercase">액션</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-gray-100 transition-colors hover:bg-gray-50"
                    >
                      <td className="px-5 py-4 text-[13px] text-gray-400 font-medium">{product.id}</td>
                      <td className="px-5 py-4 hidden sm:table-cell">
                        <span className={`text-[12px] font-bold px-2.5 py-1 rounded-full ${product.구분 === '솔루션' ? 'bg-emerald-50 text-emerald-600' : 'bg-brand-primary/10 text-brand-primary'}`}>
                          {product.구분 || '에이전트'}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-[14px] text-gray-800 font-semibold max-w-xs truncate">{product.타이틀}</td>
                      <td className="px-5 py-4 text-[13px] text-gray-500 hidden md:table-cell max-w-xs truncate">{product.주요고객군}</td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-[13px] font-bold text-brand-primary border border-brand-primary/40 px-3 py-1.5 rounded-lg hover:bg-brand-primary/10 transition-colors"
                          >
                            수정
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-[13px] font-bold text-red-500 border border-red-300 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            삭제
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-5 py-16 text-center text-gray-400 text-[14px]">
                        등록된 솔루션이 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  );
}
