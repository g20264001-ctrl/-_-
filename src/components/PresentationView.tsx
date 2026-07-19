import React, { useState } from 'react';
import { 
  Award, 
  ChevronLeft, 
  ChevronRight, 
  RefreshCw 
} from 'lucide-react';
import { 
  CanvasData, 
  FamilyMember, 
  Assignment, 
  ImprovementData 
} from '../types';

interface PresentationViewProps {
  canvas: CanvasData;
  familyMembers: FamilyMember[];
  assignments: Assignment[];
  isConfirmed: boolean;
  improvement: ImprovementData;
  handleReset: () => void;
}

export default function PresentationView({
  canvas,
  familyMembers,
  assignments,
  isConfirmed,
  improvement,
  handleReset
}: PresentationViewProps) {
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [presentationMode, setPresentationMode] = useState<'slides' | 'dashboard'>('slides');

  const hasCanvasWarning = 
    canvas.allowedInputs.birthdate || 
    canvas.allowedInputs.phoneNumber || 
    canvas.allowedInputs.address || 
    canvas.allowedInputs.realName;

  return (
    <div id="presentation-view-container" className="space-y-8">
      {/* Top Board Controller */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-amber-100 p-2.5 rounded-2xl text-amber-600 animate-pulse">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base md:text-lg font-black text-slate-800">캠프 졸업 최종 발표 보드 🎓</h2>
            <p className="text-[11px] text-slate-400">우리가 세운 윤리 규칙 and 가상 매칭 기록을 다른 모둠 친구들에게 공유하고 발표합시다.</p>
          </div>
        </div>

        <div className="flex gap-1.5 text-xs font-bold bg-slate-100 p-1 rounded-xl">
          <button 
            id="view-slides-btn"
            onClick={() => setPresentationMode('slides')} 
            className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
              presentationMode === 'slides' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            💻 슬라이드 쇼
          </button>
          <button 
            id="view-poster-btn"
            onClick={() => setPresentationMode('dashboard')} 
            className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
              presentationMode === 'dashboard' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            📋 한 눈에 모아보기 (포스터)
          </button>
        </div>
      </div>

      {/* Render Box */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-slate-100 min-h-[380px] flex flex-col justify-between relative overflow-hidden">
        
        {/* Slide Mode View */}
        {presentationMode === 'slides' ? (
          <div className="space-y-6 flex-1 flex flex-col justify-between">
            {/* Slide Content mapping */}
            {currentSlideIdx === 0 && (
              <div className="space-y-6">
                <div className="text-center md:text-left border-b border-slate-100 pb-3">
                  <h3 className="text-lg md:text-xl font-extrabold text-slate-800">1. 우리 에이전트 소개 및 탄생 배경 🌟</h3>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">에이전트 이름 & 해결할 가사 분배 갈등</p>
                </div>
                <div className="py-4 space-y-6 text-center md:text-left">
                  <div className="space-y-1.5 text-center">
                    <span className="text-[10px] bg-teal-100 text-teal-800 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">에이전트 이름</span>
                    <h1 className="text-2xl md:text-4xl font-black text-teal-600 tracking-tight">{canvas.agentName || "미지정 에이전트"}</h1>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="bg-rose-50 border border-rose-100 p-4.5 rounded-2xl">
                      <h4 className="font-bold text-rose-800 text-xs mb-1">🚨 우리가 해결하고 싶은 갈등</h4>
                      <p className="text-xs text-rose-950 bg-white p-3 rounded-lg border border-rose-100 leading-relaxed min-h-[70px] whitespace-pre-line">{canvas.problem || '미입력'}</p>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-100 p-4.5 rounded-2xl">
                      <h4 className="font-bold text-emerald-800 text-xs mb-1">🎯 에이전트의 정의로운 목표</h4>
                      <p className="text-xs text-emerald-950 bg-white p-3 rounded-lg border border-emerald-100 leading-relaxed min-h-[70px] whitespace-pre-line">{canvas.goal || '미입력'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentSlideIdx === 1 && (
              <div className="space-y-6">
                <div className="text-center md:text-left border-b border-slate-100 pb-3">
                  <h3 className="text-lg md:text-xl font-extrabold text-slate-800">2. 개인정보 차단 필터 및 레드라인 🛡️</h3>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">불필요한 민감 정보 완벽 차단</p>
                </div>
                <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                  <div className="bg-white border border-slate-100 p-4.5 rounded-2xl shadow-xs space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-slate-800">📋 입력 정보 차단 통제 현황</h4>
                      {hasCanvasWarning ? (
                        <span className="bg-rose-100 text-rose-800 border border-rose-200 text-[10px] px-2 py-0.5 rounded font-bold">⚠️ 민감한 개인정보가 허용됨</span>
                      ) : (
                        <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] px-2 py-0.5 rounded font-bold">🛡️ 100% 무결성 익명 설계</span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
                      <div className="p-2 bg-emerald-50 text-emerald-800 rounded-lg">✓ 호칭 (수동 식별)</div>
                      <div className="p-2 bg-emerald-50 text-emerald-800 rounded-lg">✓ 집안일 선호도</div>
                      <div className={`p-2 ${canvas.allowedInputs.birthdate ? 'bg-rose-100 text-rose-800' : 'bg-slate-50 text-slate-400'} rounded-lg`}>생년월일 수집 {canvas.allowedInputs.birthdate ? '허용' : '차단'}</div>
                      <div className={`p-2 ${canvas.allowedInputs.phoneNumber ? 'bg-rose-100 text-rose-800' : 'bg-slate-50 text-slate-400'} rounded-lg`}>전화번호 수집 {canvas.allowedInputs.phoneNumber ? '허용' : '차단'}</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-slate-950 text-white p-3.5 rounded-xl">
                      <h5 className="text-amber-400 font-bold text-[10px]">🛑 절대 금지선 (Red Line)</h5>
                      <p className="text-[11px] leading-relaxed mt-1 whitespace-pre-line text-slate-300">{canvas.forbiddenActions || '미입력'}</p>
                    </div>
                    <div className="bg-blue-950 text-white p-3.5 rounded-xl">
                      <h5 className="text-sky-300 font-bold text-[10px]">👤 인간의 승인이 필요한 시점</h5>
                      <p className="text-[11px] leading-relaxed mt-1 whitespace-pre-line text-slate-300">{canvas.humanOverrideMoment || '미입력'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentSlideIdx === 2 && (
              <div className="space-y-6">
                <div className="text-center md:text-left border-b border-slate-100 pb-3">
                  <h3 className="text-lg md:text-xl font-extrabold text-slate-800">3. 내장 윤리 가이드라인 규칙서 ⚖️</h3>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">에이전트 행동을 제약하는 헌법적 윤리 조치</p>
                </div>
                <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                  <div className="bg-white border border-slate-100 p-4.5 rounded-2xl shadow-xs space-y-2">
                    <h4 className="font-bold text-slate-800 flex items-center gap-1">🔒 1. 개인정보 보호 수칙</h4>
                    <p className="text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl min-h-[100px] whitespace-pre-line">{canvas.privacyRules || '미입력'}</p>
                  </div>
                  <div className="bg-white border border-slate-100 p-4.5 rounded-2xl shadow-xs space-y-2">
                    <h4 className="font-bold text-slate-800 flex items-center gap-1">⚖️ 2. 분배 공정성 원칙</h4>
                    <p className="text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl min-h-[100px] whitespace-pre-line">{canvas.fairnessRules || '미입력'}</p>
                  </div>
                </div>
              </div>
            )}

            {currentSlideIdx === 3 && (
              <div className="space-y-6">
                <div className="text-center md:text-left border-b border-slate-100 pb-3">
                  <h3 className="text-lg md:text-xl font-extrabold text-slate-800">4. 모의 테스트 및 매칭 검증결과 📊</h3>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">에이전트 분배 결과 및 인간 확인 이력</p>
                </div>
                <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-5 text-xs">
                  <div className="md:col-span-5 bg-slate-50 p-4 rounded-xl space-y-2.5">
                    <h4 className="font-bold text-slate-700">👪 등록된 가족 호칭</h4>
                    <div className="space-y-1">
                      {familyMembers.map(m => (
                        <div key={m.id} className="bg-white p-1.5 rounded shadow-xs font-semibold text-slate-800">👤 {m.nickname}</div>
                      ))}
                      {familyMembers.length === 0 && (
                        <div className="text-slate-400">등록된 가족이 없습니다.</div>
                      )}
                    </div>
                  </div>
                  <div className="md:col-span-7 bg-white border border-slate-100 p-4 rounded-xl space-y-3 shadow-xs">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-slate-700">📆 배정 결과 요약 ({assignments.length}개 매치)</h4>
                      {isConfirmed ? (
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">✓ 인간 최종 합의 서명 완료</span>
                      ) : (
                        <span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-bold">⚠️ 최종 승인 생략됨</span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 text-[10px] max-h-32 overflow-y-auto">
                      {assignments.map(a => (
                        <div key={a.id} className="p-1.5 bg-teal-50 text-teal-800 rounded font-semibold flex justify-between">
                          <span>{a.choreName}</span>
                          <span>{a.memberNickname}</span>
                        </div>
                      ))}
                      {assignments.length === 0 && (
                        <div className="text-slate-400 col-span-2 text-center py-5">배정된 당번이 없습니다.</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentSlideIdx === 4 && (
              <div className="space-y-6">
                <div className="text-center md:text-left border-b border-slate-100 pb-3">
                  <h3 className="text-lg md:text-xl font-extrabold text-slate-800">5. 기계 판단 한계 피드백 및 감상 🛠️</h3>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">캠프를 마치며 한 단계 더 따뜻한 윤리 업그레이드</p>
                </div>
                <div className="py-4 space-y-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl">
                      <h4 className="font-bold text-amber-800 mb-1">🔍 발견한 기계 분배의 허점</h4>
                      <p className="text-slate-700 bg-white p-3 rounded-lg leading-relaxed whitespace-pre-line min-h-[60px]">{improvement.discoveredProblems || '미입력'}</p>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
                      <h4 className="font-bold text-emerald-800 mb-1">🛠️ 최종 규칙 보완안</h4>
                      <p className="text-slate-700 bg-white p-3 rounded-lg leading-relaxed whitespace-pre-line min-h-[60px]">{improvement.improvementPlan || '미입력'}</p>
                    </div>
                  </div>
                  <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl text-center">
                    <h4 className="font-bold text-indigo-800 mb-1">💡 AI 윤리 캠프 배움 소감</h4>
                    <p className="text-slate-700 italic max-w-2xl mx-auto leading-relaxed whitespace-pre-line">"{improvement.reflections || '미입력'}"</p>
                  </div>
                </div>
              </div>
            )}

            {/* Indicator Footer */}
            <div className="flex justify-between items-center border-t border-slate-100 pt-4">
              <button 
                id="prev-slide-btn"
                onClick={() => setCurrentSlideIdx(prev => prev - 1)} 
                disabled={currentSlideIdx === 0}
                className="px-3.5 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 flex items-center gap-1 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> 이전 슬라이드
              </button>
              <span className="font-mono text-xs text-slate-400 font-bold">{currentSlideIdx + 1} / 5</span>
              <button 
                id="next-slide-btn"
                onClick={() => setCurrentSlideIdx(prev => prev + 1)} 
                disabled={currentSlideIdx === 4}
                className="px-3.5 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-xl text-xs font-bold flex items-center gap-1 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                다음 슬라이드 <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center border-b border-slate-100 pb-5 space-y-1">
              <span className="bg-amber-100 text-amber-800 border border-amber-200 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                🎖️ AI 윤리 캠프 공식 에이전트 설계 수료증 🎖️
              </span>
              <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight pt-1">{canvas.agentName || '미등록 에이전트'}</h1>
              <p className="text-[11px] text-slate-400 font-medium">설계 및 매칭 테스트 검증인: 캠프 중학생 모둠원 일동</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              {/* Section 1 */}
              <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-100 space-y-1.5">
                <h4 className="font-bold text-slate-800 flex items-center gap-1">🚀 1. 기획 배경과 목표</h4>
                <div className="text-slate-600 space-y-1 pl-1 bg-white p-2.5 rounded-xl">
                  <p><b>• 집안일 갈등:</b> <span className="text-slate-500 whitespace-pre-line">{canvas.problem || '작성 전'}</span></p>
                  <p className="mt-1"><b>• 에이전트 목표:</b> <span className="text-slate-500 whitespace-pre-line">{canvas.goal || '작성 전'}</span></p>
                </div>
              </div>

              {/* Section 2 */}
              <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-100 space-y-1.5">
                <h4 className="font-bold text-slate-800 flex items-center gap-1">🛡️ 2. 안전한 개인정보 보안 가드라인</h4>
                <div className="text-slate-600 space-y-1 pl-1 bg-white p-2.5 rounded-xl">
                  <p><b>• 데이터 차단:</b> 이름, 생년월일, 전화번호, 주소 차단 완료</p>
                  <p className="mt-1"><b>• 내장 보호 규칙:</b> <span className="text-slate-500 whitespace-pre-line">{canvas.privacyRules || '작성 전'}</span></p>
                </div>
              </div>

              {/* Section 3 */}
              <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-100 space-y-1.5">
                <h4 className="font-bold text-slate-800 flex items-center gap-1">⚖️ 3. 통제 및 공정성 장치</h4>
                <div className="text-slate-600 space-y-1 pl-1 bg-white p-2.5 rounded-xl">
                  <p><b>• 절대 금지 (레드라인):</b> <span className="text-slate-500 whitespace-pre-line">{canvas.forbiddenActions || '작성 전'}</span></p>
                  <p className="mt-1"><b>• 사람 확인 절차:</b> <span className="text-slate-500 whitespace-pre-line">{canvas.humanOverrideMoment || '작성 전'}</span></p>
                  <p className="mt-1"><b>• 공정성 알고리즘:</b> <span className="text-slate-500 whitespace-pre-line">{canvas.fairnessRules || '작성 전'}</span></p>
                </div>
              </div>

              {/* Section 4 */}
              <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-100 space-y-1.5">
                <h4 className="font-bold text-slate-800 flex items-center gap-1">🛠️ 4. 가상 실험 피드백 및 감상</h4>
                <div className="text-slate-600 space-y-1 pl-1 bg-white p-2.5 rounded-xl">
                  <p><b>• 발견한 한계:</b> <span className="text-slate-500 whitespace-pre-line">{improvement.discoveredProblems || '작성 전'}</span></p>
                  <p className="mt-1"><b>• 업그레이드 조치:</b> <span className="text-slate-500 whitespace-pre-line">{improvement.improvementPlan || '작성 전'}</span></p>
                  <p className="mt-1.5 p-2 bg-indigo-50 border border-indigo-100 rounded-lg text-indigo-950 font-medium italic">
                    <b>"배운 소감:</b> <span className="text-indigo-900 whitespace-pre-line">{improvement.reflections || '작성 전'}</span>"
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center text-[10px] text-slate-400 border-t border-slate-100 pt-4 gap-4">
              <span>🛡️ 사람 중심의 인공지능(Human-centric AI) 준수 검증</span>
              <span>•</span>
              <span>🎓 12~14세 윤리 수료 완료</span>
            </div>
          </div>
        )}

      </div>

      {/* Restart button */}
      <div className="flex justify-center pt-4">
        <button 
          id="reset-camp-btn"
          onClick={handleReset} 
          className="bg-slate-200 hover:bg-slate-300 text-slate-600 font-bold py-3 px-8 rounded-2xl text-xs transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" /> 처음부터 다시 설계하기 (초기화)
        </button>
      </div>
    </div>
  );
}
