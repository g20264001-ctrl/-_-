import React from 'react';
import { Shield, ShieldAlert, Users, ChevronRight } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (tab: 'home' | 'canvas' | 'agent' | 'improvement' | 'presentation') => void;
}

export default function HomeView({ onNavigate }: HomeViewProps) {
  return (
    <div id="home-view-container" className="space-y-8">
      {/* Floating Mission Banner */}
      <div className="flex justify-center">
        <div id="mission-badge" className="bg-gradient-to-r from-teal-500 to-blue-600 text-white font-black py-3 px-8 rounded-full shadow-lg border border-teal-400 text-center text-sm md:text-base transition-transform hover:scale-105">
          ✨ 공정하게 집안일 당번을 정하는 AI를 만들자 ✨
        </div>
      </div>

      {/* Hero Card */}
      <div id="hero-card" className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-50 rounded-tr-full opacity-60 pointer-events-none"></div>

        <div className="relative z-10 text-center space-y-6">
          <div className="inline-flex bg-teal-100 text-teal-800 text-xs md:text-sm font-bold px-4 py-1.5 rounded-full">
            🤖 AI 윤리 캠프 미션 [중학생 과정]
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
            공정한 집안일 심부름 당번 고르기<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
              AI 에이전트 만들기 🎨
            </span>
          </h1>

          <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            매번 "누가 청소하지?", "오늘 설거지는 누구 차례야?" 하고 다투는 집안일 갈등은 이제 끝! 
            우리가 직접 가족의 상황과 마음을 이해하며 가장 공정하게 역할을 나눠주는 {' '}
            <span className="inline-block border-b-2 border-dotted border-blue-500 font-bold text-blue-600 cursor-help relative group">
              AI 에이전트
              <span className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-900 text-white text-xs rounded-xl shadow-xl leading-relaxed text-center z-50">
                <span className="font-bold text-amber-300 block mb-1">💡 AI 에이전트 란?</span>
                스스로 정보를 파악하고, 사람이 정해준 안전 수칙과 규칙에 맞춰서 스스로 영리한 결정을 내리는 프로그램을 뜻해요.
              </span>
            </span>를 직접 설계하고 시뮬레이션해봅시다!
          </p>

          <div className="pt-4">
            <button 
              id="start-camp-btn"
              onClick={() => onNavigate('canvas')} 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-2xl shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              캠프 시작하기 (윤리 설계 단계로)
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Safety Rules Alert Box */}
      <div id="safety-rules-box" className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-6 space-y-4">
        <div className="flex items-center gap-3 text-amber-800">
          <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0" />
          <h2 className="text-base md:text-lg font-bold">🚫 캠프 참가 및 에이전트 설계 중요 안전 수칙</h2>
        </div>
        
        <p className="text-amber-900 text-xs md:text-sm leading-relaxed">
          인공지능을 설계할 때 가장 우선되어야 할 가치는 바로 {' '}
          <span className="inline-block border-b-2 border-dotted border-blue-500 font-bold text-blue-600 cursor-help relative group">
            개인정보 보호
            <span className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-900 text-white text-xs rounded-xl shadow-xl leading-relaxed text-center z-50">
              <span className="font-bold text-amber-300 block mb-1">💡 개인정보 보호 란?</span>
              진짜 이름, 주소, 전화번호처럼 다른 사람이 나를 찾아내거나 알아낼 수 있는 중요한 비밀들을 꼭꼭 지키고 잠가두는 방법이에요.
            </span>
          </span>입니다. 다음 3가지를 반드시 약속하고 실천해요!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs md:text-sm">
          <div className="bg-white p-4 rounded-2xl border border-amber-100 shadow-sm flex gap-3">
            <span className="text-lg text-teal-600 shrink-0">1️⃣</span>
            <div>
              <h4 className="font-bold text-slate-800 mb-0.5">실제 개인정보 금지</h4>
              <p className="text-slate-500 text-xs">진짜 이름, 비밀번호 등의 민감한 정보는 절대 입력하지 않아요.</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-amber-100 shadow-sm flex gap-3">
            <span className="text-lg text-teal-600 shrink-0">2️⃣</span>
            <div>
              <h4 className="font-bold text-slate-800 mb-0.5">식별 항목 포함 금지</h4>
              <p className="text-slate-500 text-xs">전화번호, 상세 주소, 생년월일은 입력 항목에 아예 넣지 않아요.</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-amber-100 shadow-sm flex gap-3">
            <span className="text-lg text-teal-600 shrink-0">3️⃣</span>
            <div>
              <h4 className="font-bold text-slate-800 mb-0.5">오직 "호칭"만 사용</h4>
              <p className="text-slate-500 text-xs">'아빠', '엄마', '삼촌', '막내' 등 서로 부르는 안전한 칭호만 씁니다.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Road Map */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Users className="text-teal-500 w-5 h-5" />
          캠프 시뮬레이션 진행 순서
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 text-center space-y-1.5">
            <div className="w-8 h-8 bg-teal-100 text-teal-700 font-bold rounded-full flex items-center justify-center mx-auto text-xs">1</div>
            <h4 className="font-bold text-slate-800 text-xs">윤리 설계 캔버스</h4>
            <p className="text-[10px] text-slate-400">에이전트 이름 및 개인정보 수집 제한</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 text-center space-y-1.5">
            <div className="w-8 h-8 bg-teal-100 text-teal-700 font-bold rounded-full flex items-center justify-center mx-auto text-xs">2</div>
            <h4 className="font-bold text-slate-800 text-xs">시뮬레이터 테스트</h4>
            <p className="text-[10px] text-slate-400">호칭만 등록하고 모의 매칭 돌리기</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 text-center space-y-1.5">
            <div className="w-8 h-8 bg-teal-100 text-teal-700 font-bold rounded-full flex items-center justify-center mx-auto text-xs">3</div>
            <h4 className="font-bold text-slate-800 text-xs">개선 기록서 작성</h4>
            <p className="text-[10px] text-slate-400">랜덤 오작동 확인 후 개선점 작성</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 text-center space-y-1.5">
            <div className="w-8 h-8 bg-teal-600 text-white font-bold rounded-full flex items-center justify-center mx-auto text-xs">4</div>
            <h4 className="font-bold text-slate-800 text-xs">캠프 수료 발표</h4>
            <p className="text-[10px] text-slate-400">나만의 윤리 수칙 멋지게 공유!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
