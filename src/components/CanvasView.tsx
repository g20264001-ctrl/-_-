import React from 'react';
import { Sparkles, ShieldAlert } from 'lucide-react';
import { CanvasData } from '../types';

interface CanvasViewProps {
  canvas: CanvasData;
  setCanvas: React.Dispatch<React.SetStateAction<CanvasData>>;
  applyCanvasPreset: () => void;
  onNavigate: (tab: 'home' | 'canvas' | 'agent' | 'improvement' | 'presentation') => void;
}

export default function CanvasView({ canvas, setCanvas, applyCanvasPreset, onNavigate }: CanvasViewProps) {
  const hasCanvasWarning = 
    canvas.allowedInputs.birthdate || 
    canvas.allowedInputs.phoneNumber || 
    canvas.allowedInputs.address || 
    canvas.allowedInputs.realName;

  const isCanvasValid = 
    canvas.agentName.trim() && 
    canvas.problem.trim() && 
    canvas.goal.trim() && 
    !hasCanvasWarning;

  return (
    <div id="canvas-view-container" className="space-y-8">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div className="space-y-1.5">
          <div className="inline-flex bg-teal-100 text-teal-800 text-[10px] font-bold px-2.5 py-1 rounded-full">
            Step 1. 윤리 설계 캔버스
          </div>
          <h2 className="text-xl font-bold text-slate-800">우리가 직접 규칙을 정하는 AI 캔버스 📝</h2>
          <p className="text-slate-400 text-xs leading-relaxed">
            인공지능 비서에게 맡길 수 있는 안전하고 공정한 규칙들을 미리 가이드라인으로 세워봅시다.<br />
            어려우면 오른쪽에 있는 <b>'추천 예시 자동 완성'</b>을 눌러서 원리를 알아봐요!
          </p>
        </div>
        <button 
          id="canvas-preset-btn"
          onClick={applyCanvasPreset} 
          className="shrink-0 bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold py-2 px-4 rounded-xl border border-teal-200 transition-all flex items-center gap-1.5 text-xs cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          추천 예시 자동 완성
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Forms */}
        <div className="space-y-6">
          {/* 에이전트 이름 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-2">
            <label className="block text-sm font-bold text-slate-800 flex justify-between items-center">
              <span>에이전트 이름 🏷️</span>
            </label>
            <input 
              type="text" 
              value={canvas.agentName}
              onChange={(e) => setCanvas(prev => ({ ...prev, agentName: e.target.value }))}
              placeholder="예: 평화로운 룰렛 비서" 
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* 해결할 문제 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-2">
            <label className="block text-sm font-bold text-slate-800 flex justify-between items-center">
              <span>해결할 문제 🚨</span>
            </label>
            <textarea 
              value={canvas.problem}
              onChange={(e) => setCanvas(prev => ({ ...prev, problem: e.target.value }))}
              rows={2} 
              placeholder="예: 주말에 설거지와 청소는 다들 귀찮아해서 서로 하라고 미루는 다툼이 자주 생김" 
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />
          </div>

          {/* 에이전트의 목표 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-2">
            <label className="block text-sm font-bold text-slate-800 flex justify-between items-center">
              <span>에이전트의 목표 🎯</span>
            </label>
            <textarea 
              value={canvas.goal}
              onChange={(e) => setCanvas(prev => ({ ...prev, goal: e.target.value }))}
              rows={2} 
              placeholder="예: 가족의 감정이 상하지 않게 완벽하게 선호도와 누적 횟수를 고려해 공정 배정하는 비서" 
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />
          </div>

          {/* 입력받을 정보 (중요 검문소!) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-3">
            <label className="block text-sm font-bold text-slate-800">에이전트가 물어보고(입력받을) 정보 📊</label>
            
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-emerald-600">✅ 허용 추천 항목 (안전한 정보)</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <label className="flex items-center gap-2 p-2 bg-emerald-50 rounded-lg cursor-pointer">
                  <input type="checkbox" checked disabled className="text-emerald-600 rounded" />
                  <span className="font-bold text-emerald-800">호칭 (필수)</span>
                </label>
                <label className="flex items-center gap-2 p-2 bg-emerald-50 rounded-lg cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={canvas.allowedInputs.preferences} 
                    onChange={(e) => setCanvas(prev => ({
                      ...prev,
                      allowedInputs: { ...prev.allowedInputs, preferences: e.target.checked }
                    }))}
                    className="text-emerald-600 rounded" 
                  />
                  <span className="font-bold text-emerald-800">집안일 선호도</span>
                </label>
                <label className="flex items-center gap-2 p-2 bg-emerald-50 rounded-lg cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={canvas.allowedInputs.difficulty} 
                    onChange={(e) => setCanvas(prev => ({
                      ...prev,
                      allowedInputs: { ...prev.allowedInputs, difficulty: e.target.checked }
                    }))}
                    className="text-emerald-600 rounded" 
                  />
                  <span className="font-bold text-emerald-800">가사 난이도</span>
                </label>
                <label className="flex items-center gap-2 p-2 bg-emerald-50 rounded-lg cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={canvas.allowedInputs.workload} 
                    onChange={(e) => setCanvas(prev => ({
                      ...prev,
                      allowedInputs: { ...prev.allowedInputs, workload: e.target.checked }
                    }))}
                    className="text-emerald-600 rounded" 
                  />
                  <span className="font-bold text-emerald-800">누적 당번 횟수</span>
                </label>
              </div>

              <div className="text-[11px] font-bold text-rose-600 pt-1">❌ 수집 차단 항목 (민감한 개인정보)</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <label className="flex items-center gap-2 p-2 bg-rose-50 rounded-lg cursor-pointer border border-rose-100">
                  <input 
                    type="checkbox" 
                    checked={canvas.allowedInputs.birthdate} 
                    onChange={(e) => setCanvas(prev => ({
                      ...prev,
                      allowedInputs: { ...prev.allowedInputs, birthdate: e.target.checked }
                    }))}
                    className="text-rose-600 rounded" 
                  />
                  <span className="font-bold text-rose-800">생년월일</span>
                </label>
                <label className="flex items-center gap-2 p-2 bg-rose-50 rounded-lg cursor-pointer border border-rose-100">
                  <input 
                    type="checkbox" 
                    checked={canvas.allowedInputs.phoneNumber} 
                    onChange={(e) => setCanvas(prev => ({
                      ...prev,
                      allowedInputs: { ...prev.allowedInputs, phoneNumber: e.target.checked }
                    }))}
                    className="text-rose-600 rounded" 
                  />
                  <span className="font-bold text-rose-800">전화번호</span>
                </label>
                <label className="flex items-center gap-2 p-2 bg-rose-50 rounded-lg cursor-pointer border border-rose-100">
                  <input 
                    type="checkbox" 
                    checked={canvas.allowedInputs.address} 
                    onChange={(e) => setCanvas(prev => ({
                      ...prev,
                      allowedInputs: { ...prev.allowedInputs, address: e.target.checked }
                    }))}
                    className="text-rose-600 rounded" 
                  />
                  <span className="font-bold text-rose-800">정확한 주소</span>
                </label>
                <label className="flex items-center gap-2 p-2 bg-rose-50 rounded-lg cursor-pointer border border-rose-100">
                  <input 
                    type="checkbox" 
                    checked={canvas.allowedInputs.realName} 
                    onChange={(e) => setCanvas(prev => ({
                      ...prev,
                      allowedInputs: { ...prev.allowedInputs, realName: e.target.checked }
                    }))}
                    className="text-rose-600 rounded" 
                  />
                  <span className="font-bold text-rose-800">가족 진짜 이름</span>
                </label>
              </div>
            </div>

            {/* Warning Alert Banner */}
            {hasCanvasWarning && (
              <div className="bg-rose-100 border border-rose-300 text-rose-800 p-3 rounded-xl flex gap-2.5 items-start">
                <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="text-[11px] space-y-0.5">
                  <p className="font-bold">⚠️ 위험! 개인정보 노출 취약점 발생</p>
                  <p>전화번호, 주소, 생일, 실명은 기계 학습이나 배정에 필요 없는 소중한 인적 데이터입니다. AI 윤리 원칙에 어긋나니 즉시 체크를 풀어주세요!</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Forms */}
        <div className="space-y-6">
          {/* 절대 하면 안 되는 행동 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-2">
            <label className="block text-sm font-bold text-slate-800 flex justify-between items-center">
              <span>절대 하면 안 되는 행동 🚫</span>
            </label>
            <textarea 
              value={canvas.forbiddenActions}
              onChange={(e) => setCanvas(prev => ({ ...prev, forbiddenActions: e.target.value }))}
              rows={2} 
              placeholder="예: 한 사람에게 주말 하루 동안 3번 이상의 힘든 가사를 집중 배정하지 않기" 
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />
          </div>

          {/* 사람 확인이 필요한 순간 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-2">
            <label className="block text-sm font-bold text-slate-800 flex justify-between items-center">
              <span>사람 확인이 필요한 순간 👤</span>
            </label>
            <textarea 
              value={canvas.humanOverrideMoment}
              onChange={(e) => setCanvas(prev => ({ ...prev, humanOverrideMoment: e.target.value }))}
              rows={2} 
              placeholder="예: 최종 제안된 당번표를 발표하기 전, 가족 모두가 승인 버튼을 명시적으로 누르는 순간" 
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />
          </div>

          {/* 개인정보 보호 규칙 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-2">
            <label className="block text-sm font-bold text-slate-800 flex justify-between items-center">
              <span>개인정보 보호 규칙 🔒</span>
            </label>
            <textarea 
              value={canvas.privacyRules}
              onChange={(e) => setCanvas(prev => ({ ...prev, privacyRules: e.target.value }))}
              rows={2} 
              placeholder="예: 이름 대신 아빠/엄마 호칭만 쓰며, 탭을 새로고침하거나 창을 닫으면 모의 데이터를 즉시 자동 삭제한다." 
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />
          </div>

          {/* 공정성 규칙 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-2">
            <label className="block text-sm font-bold text-slate-800 flex justify-between items-center">
              <span>공정성 규칙 ⚖️</span>
            </label>
            <textarea 
              value={canvas.fairnessRules}
              onChange={(e) => setCanvas(prev => ({ ...prev, fairnessRules: e.target.value }))}
              rows={2} 
              placeholder="예: '싫어함'에 체크한 업무는 가장 마지막에 배치하며, 전체 누적 집안일 가중치를 점수화해 일거리를 똑같이 나눈다." 
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Navigation Next */}
      <div className="flex justify-end pt-4">
        <button 
          id="go-to-agent-btn"
          onClick={() => onNavigate('agent')} 
          disabled={!isCanvasValid} 
          className={`font-bold py-3.5 px-8 rounded-2xl shadow-sm transition-all ${
            isCanvasValid 
              ? 'bg-teal-500 hover:bg-teal-600 text-white cursor-pointer transform hover:-translate-y-0.5' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          윤리 설계 저장 및 시뮬레이터로 가기 🧪
        </button>
      </div>
    </div>
  );
}
