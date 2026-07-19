import React, { useState } from 'react';
import { 
  Shield, 
  Home as HomeIcon,
  PenTool,
  PlayCircle,
  CheckSquare,
  Presentation as PresentationIcon
} from 'lucide-react';

import { 
  CanvasData, 
  FamilyMember, 
  Assignment, 
  ImprovementData, 
  INITIAL_CANVAS 
} from './types';

import HomeView from './components/HomeView';
import CanvasView from './components/CanvasView';
import AgentView from './components/AgentView';
import ImprovementView from './components/ImprovementView';
import PresentationView from './components/PresentationView';

export default function App() {
  // State
  const [currentTab, setCurrentTab] = useState<'home' | 'canvas' | 'agent' | 'improvement' | 'presentation'>('home');
  const [canvas, setCanvas] = useState<CanvasData>(INITIAL_CANVAS);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [improvement, setImprovement] = useState<ImprovementData>({
    discoveredProblems: '',
    improvementPlan: '',
    reflections: ''
  });

  // Switch tabs & scroll to top helper
  const navigateTo = (tab: 'home' | 'canvas' | 'agent' | 'improvement' | 'presentation') => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Preset Handlers
  const applyCanvasPreset = () => {
    setCanvas({
      agentName: "모두가 웃는 하모니 당번 메이커",
      problem: "가족들이 매번 주말마다 '누가 설거지하고 빨래할지'를 두고 서로 눈치 보며 피하는 다툼이 계속됨",
      goal: "가족들의 주관적 호불호(선호도)와 기존 가사 활동 피로도를 완벽히 배분하여 불만이 전혀 없는 최상의 공평 당번 매칭",
      allowedInputs: {
        nickname: true,
        preferences: true,
        difficulty: true,
        workload: true,
        birthdate: false,
        phoneNumber: false,
        address: false,
        realName: false
      },
      forbiddenActions: "1. 한 가족에게 연속 3회 청소/요리를 몰아서 줘서 힘이 다 빠지게 하는 배정\n2. 사전에 약속하지 않은 주말에 요리와 설거지를 혼자 동시 독점하게 하는 매칭 금지",
      humanOverrideMoment: "AI 에이전트가 만든 당번 시간표 배치를 사람들에게 보이기 전, 가족 모두가 직접 모여서 '최종 동의 및 서명' 버튼을 누르는 순간",
      privacyRules: "가족의 주민번호나 진짜 주소는 1%도 묻지 않으며, 엄마/둘째 등의 안전한 '호칭'만 임시 브라우저 쿠키에 올려두고, 창을 닫는 순간 즉시 삭제시킨다.",
      fairnessRules: "각자가 '싫어함'이라고 누른 청소 목록은 에이전트 가중치 계산에서 즉각 제외하거나 후순위 처리하며, 누적 매치 카운터가 가장 낮은 사람에게 공정한 업무 기회를 준다."
    });
  };

  const applyImprovementPreset = () => {
    setImprovement({
      discoveredProblems: "1. 우연의 확률로 인해 한 명(예: 막내)에게 싫어하는 설거지 가사 배정이 연이어 몰리거나, 주말 특정 한 시간대에 과부하가 생기는 상황이 일어남.\n2. 단순히 기계식으로 업무를 나누다 보니 당사자의 현실 학원 시간이나 컨디션 한계가 고려되지 못함.",
      improvementPlan: "1. 배정 시 '난이도 상' 등급 업무를 배정받은 사람은 연달아 다른 당번에 배정될 수 없게 연속 가해 제한 알고리즘을 지침서에 탑재함.\n2. 개인이 사전에 '학원' 또는 '병원' 등으로 활동이 불가능한 전면 예외 시간대를 입력할 수 있는 옵션 단추를 추가해 안전 통제력을 강화함.",
      reflections: "인공지능이 복잡한 알고리즘을 굴려도 사람 중심의 섬세한 배려(윤리)가 없으면 억울한 분배가 발생한다는 점을 깊이 이해했습니다. 특히 사람이 개입하고 통제하는 'Human-in-the-loop' 최종 승인 버튼의 소중함과 익명 호칭 사용의 보안 가치를 캠프를 통해 완벽히 이해했습니다!"
    });
  };

  // Reset Camp
  const handleReset = () => {
    if (window.confirm("정말로 설계 기록을 초기화하고 처음부터 새로 시작하시겠습니까? (안전을 위해 브라우저의 모의 데이터는 모두 즉시 영구 삭제됩니다)")) {
      setCanvas(INITIAL_CANVAS);
      setFamilyMembers([]);
      setAssignments([]);
      setIsConfirmed(false);
      setImprovement({
        discoveredProblems: '',
        improvementPlan: '',
        reflections: ''
      });
      navigateTo('home');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      
      {/* Top Floating Header Banner */}
      <div className="w-full bg-white border-b border-slate-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5">
            <div className="bg-teal-500 text-white p-2 rounded-xl shadow-md shadow-teal-500/25">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-black text-slate-900 tracking-tight leading-none flex items-center gap-1.5">
                <span>AI 윤리 캠프</span>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-extrabold px-1.5 py-0.5 rounded">12~14세 과정</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">공정한 집안일 심부름 당번 고르기 AI 에이전트 만들기</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center bg-slate-100/80 p-1 rounded-xl font-medium">
            <button 
              onClick={() => navigateTo('home')} 
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentTab === 'home' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <HomeIcon className="w-3.5 h-3.5" /> <span className="hidden sm:inline">캠프 홈</span>
            </button>
            <button 
              onClick={() => navigateTo('canvas')} 
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentTab === 'canvas' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" /> <span className="hidden sm:inline">윤리 설계 캔버스</span>
            </button>
            <button 
              onClick={() => navigateTo('agent')} 
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentTab === 'agent' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <PlayCircle className="w-3.5 h-3.5" /> <span className="hidden sm:inline">시뮬레이터</span>
            </button>
            <button 
              onClick={() => navigateTo('improvement')} 
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentTab === 'improvement' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" /> <span className="hidden sm:inline">개선 기록장</span>
            </button>
            <button 
              onClick={() => navigateTo('presentation')} 
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentTab === 'presentation' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <PresentationIcon className="w-3.5 h-3.5" /> <span className="hidden sm:inline">발표 카드</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
        
        {currentTab === 'home' && (
          <HomeView onNavigate={navigateTo} />
        )}

        {currentTab === 'canvas' && (
          <CanvasView 
            canvas={canvas} 
            setCanvas={setCanvas} 
            applyCanvasPreset={applyCanvasPreset} 
            onNavigate={navigateTo} 
          />
        )}

        {currentTab === 'agent' && (
          <AgentView 
            canvas={canvas}
            familyMembers={familyMembers}
            setFamilyMembers={setFamilyMembers}
            assignments={assignments}
            setAssignments={setAssignments}
            isConfirmed={isConfirmed}
            setIsConfirmed={setIsConfirmed}
            onNavigate={navigateTo}
          />
        )}

        {currentTab === 'improvement' && (
          <ImprovementView 
            improvement={improvement}
            setImprovement={setImprovement}
            applyImprovementPreset={applyImprovementPreset}
            assignments={assignments}
            isConfirmed={isConfirmed}
            onNavigate={navigateTo}
          />
        )}

        {currentTab === 'presentation' && (
          <PresentationView 
            canvas={canvas}
            familyMembers={familyMembers}
            assignments={assignments}
            isConfirmed={isConfirmed}
            improvement={improvement}
            handleReset={handleReset}
          />
        )}

      </main>

      {/* Professional Footer */}
      <footer className="bg-white border-t border-slate-100 py-6 text-center text-xs text-slate-400 font-medium mt-auto">
        <div className="max-w-4xl mx-auto px-4 space-y-1">
          <p>© 2026 AI Ethics Camp. All rights reserved. Designed for young AI Engineers.</p>
          <p>이 웹앱은 서버에 절대 데이터를 기록하지 않는 안심 에이전트 설계 모의기입니다.</p>
        </div>
      </footer>

    </div>
  );
}
