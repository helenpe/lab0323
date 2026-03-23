import React, { useState } from 'react';
import { ManagedProduct } from '../hooks/useProductsApi';

interface SolutionFormProps {
  initialData: ManagedProduct | null;
  onSave: (data: Partial<ManagedProduct>) => void;
  onCancel: () => void;
}

const inputClass = "w-full rounded-xl px-4 py-2.5 text-[14px] text-gray-800 bg-white border border-gray-200 focus:outline-none focus:border-brand-primary transition-colors placeholder-gray-300";
const labelClass = "block text-[12px] font-bold text-gray-400 tracking-widest uppercase mb-2";

export default function SolutionForm({ initialData, onSave, onCancel }: SolutionFormProps) {
  const [formData, setFormData] = useState<Partial<ManagedProduct>>({
    id: initialData?.id || '',
    구분: initialData?.구분 || '에이전트',
    타이틀: initialData?.타이틀 || '',
    설명: initialData?.설명 || '',
    메인이미지: initialData?.메인이미지 || '',
    주요고객군: initialData?.주요고객군 || '',
  });

  const [advancedJson, setAdvancedJson] = useState<string>(() => {
    if (!initialData) return "{}";
    const { id, 구분, 타이틀, 설명, 메인이미지, 주요고객군, ...rest } = initialData;
    return JSON.stringify(rest, null, 2);
  });

  const [jsonError, setJsonError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const advancedData = JSON.parse(advancedJson);
      setJsonError('');
      onSave({ ...formData, ...advancedData });
    } catch {
      setJsonError('JSON 형식이 올바르지 않습니다.');
    }
  };

  return (
    <div className="rounded-[16px] border border-gray-200 bg-white shadow-sm p-8 max-w-4xl mx-auto">
      <h2 className="text-[24px] font-bold text-gray-900 mb-8">
        {initialData ? '솔루션 수정' : '신규 솔루션 등록'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {!initialData && (
          <div>
            <label className={labelClass}>ID 키</label>
            <input
              required
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className={inputClass}
              placeholder="예: Works AI"
            />
          </div>
        )}

        <div>
          <label className={labelClass}>구분</label>
          <div className="flex items-center gap-6">
            {(['에이전트', '솔루션'] as const).map((option) => (
              <label key={option} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="구분"
                  value={option}
                  checked={formData.구분 === option}
                  onChange={handleChange}
                  className="w-4 h-4 accent-brand-primary cursor-pointer"
                />
                <span className="text-[14px] font-medium text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>타이틀</label>
          <input
            required
            type="text"
            name="타이틀"
            value={formData.타이틀}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>설명</label>
          <textarea
            required
            name="설명"
            value={formData.설명}
            onChange={handleChange}
            className={`${inputClass} h-24 resize-none`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>메인 이미지 URL</label>
            <input
              type="text"
              name="메인이미지"
              value={formData.메인이미지 || ''}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>주요 고객군</label>
            <input
              type="text"
              name="주요고객군"
              value={formData.주요고객군 || ''}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className={labelClass + " mb-0"}>고급 속성 편집 (JSON)</label>
            {jsonError && <span className="text-red-500 text-[12px] font-medium">{jsonError}</span>}
          </div>
          <p className="text-[12px] text-gray-400 mb-3">핵심가치, 주요기능, 특장점, 주요활용시나리오 등 배열 데이터를 JSON 형식으로 편집합니다.</p>
          <textarea
            value={advancedJson}
            onChange={(e) => setAdvancedJson(e.target.value)}
            className={`${inputClass} h-64 font-mono text-[13px] resize-none`}
            spellCheck={false}
          />
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={onCancel}
            className="text-[14px] font-bold text-gray-500 border border-gray-200 px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            className="text-[14px] font-bold text-white bg-brand-primary hover:bg-brand-primary/90 px-5 py-2.5 rounded-xl transition-colors"
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
}
