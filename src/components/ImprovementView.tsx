import React from 'react';
import { Edit3, Sparkles } from 'lucide-react';
import { ImprovementData, Assignment } from '../types';

interface ImprovementViewProps {
  improvement: ImprovementData;
  setImprovement: React.Dispatch<React.SetStateAction<ImprovementData>>;
  applyImprovementPreset: () => void;
  assignments: Assignment[];
  isConfirmed: boolean;
  onNavigate: (tab: 'home' | 'canvas' | 'agent' | 'improvement' | 'presentation') => void;
}

export default function ImprovementView({
  improvement,
  setImprovement,
  applyImprovementPreset,
  assignments,
  isConfirmed,
  onNavigate
}: ImprovementViewProps) {
  const isImprovementValid = 
    improvement.discoveredProblems.trim() && 
    improvement.improvementPlan.trim() && 
    improvement.reflections.trim();

  return (
    <div id="improvement-view-container" className="space-y-8">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-1.5">
        <div className="inline-flex bg-teal-100 text-teal-800 text-[10px] font-bold px-2.5 py-1 rounded-full">
          Step 3. 피드백 및 에이전트 개선장
        </div>
        <h2 className="text-xl font-bold text-slate-800">에이전트 시뮬레이션 개선 기록장 📝</h2>
        <p className="text-slate-400 text-xs leading-relaxed">
          방금 돌려본 모의 당번 매칭 결과를 보고, 기계식 무작위가 준 실수를 보완해주는 '더 완벽하고 따뜻한' 윤리 수정안을 완성해봐요.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-6">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
            <Edit3 className="w-4 h-4 text-teal-600" />
            배치 후 분석 및 감상 기록하기
          </h3>
          <button 
            id="improvement-preset-btn"
            onClick={applyImprovementPreset} 
            className="bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold py-1.5 px-3 rounded-lg border border-teal-200 text-xs transition-all flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            기록 추천 예시 가져오기
          </button>
        </div>

        <div className="space-y-5">
          {/* 테스트 후 발견한 문제 */}
          <div className="space-y-2">
            <label className="block text-xs md:text-sm font-bold text-slate-800 flex justify-between items-center">
              <span>1. 테스트를 해보고 찾은 불공정한 문제점 🔍</span>
            </label>
            <textarea 
              value={improvement.discoveredProblems}
              onChange={(e) => setImprovement(prev => ({ ...prev, discoveredProblems: e.target.value }))}
              rows={3} 
              placeholder="예: 무작위 배정 시 우연히 아빠에게 저녁 청소와 저녁 설거지가 동시에 몰려서, 한 명의 일이 과도해지는 문제 발생" 
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* 최종 개선 내용 */}
          <div className="space-y-2">
            <label className="block text-xs md:text-sm font-bold text-slate-800 flex justify-between items-center">
              <span>2. 편견과 쏠림을 막기 위한 최종 수칙 개선안 🛠️</span>
            </label>
            <textarea 
              value={improvement.improvementPlan}
              onChange={(e) => setImprovement(prev => ({ ...prev, improvementPlan: e.target.value }))}
              rows={3} 
              placeholder="예: '하루에 동일인에게 연속 2회 이상 중간 난이도 이상의 가사를 부여하지 못함' 이라는 최대 가중치 상한 제한 규칙 추가 설계" 
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* 느낀 점 */}
          <div className="space-y-2">
            <label className="block text-xs md:text-sm font-bold text-slate-800 flex justify-between items-center">
              <span>3. 캠프에 참여하면서 느낀 점 및 윤리 배움 소감 💡</span>
            </label>
            <textarea 
              value={improvement.reflections}
              onChange={(e) => setImprovement(prev => ({ ...prev, reflections: e.target.value }))}
              rows={3} 
              placeholder="예: AI가 사람을 이롭게 하기 위해선 수학적 공평함보다, 사람의 한계나 감정 상태를 배려하는 따뜻함(윤리)이 무조건 설계에 포함되어야 함을 배움" 
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Next button container */}
      <div className="flex justify-end pt-4">
        <button 
          id="go-to-presentation-btn"
          onClick={() => onNavigate('presentation')} 
          disabled={!isImprovementValid} 
          className={`font-bold py-3.5 px-8 rounded-2xl shadow-sm transition-all ${
            isImprovementValid 
              ? 'bg-teal-500 hover:bg-teal-600 text-white cursor-pointer transform hover:-translate-y-0.5' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          마지막 단계: 우리 조 발표 카드 보러가기 🎓
        </button>
      </div>
    </div>
  );
}
