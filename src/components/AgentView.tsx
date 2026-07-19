import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Trash2, 
  Cpu, 
  Table, 
  Check, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';
import { 
  CanvasData, 
  FamilyMember, 
  Assignment, 
  DEFAULT_CHORES, 
  TIME_SLOTS 
} from '../types';

interface AgentViewProps {
  canvas: CanvasData;
  familyMembers: FamilyMember[];
  setFamilyMembers: React.Dispatch<React.SetStateAction<FamilyMember[]>>;
  assignments: Assignment[];
  setAssignments: React.Dispatch<React.SetStateAction<Assignment[]>>;
  isConfirmed: boolean;
  setIsConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
  onNavigate: (tab: 'home' | 'canvas' | 'agent' | 'improvement' | 'presentation') => void;
}

export default function AgentView({
  canvas,
  familyMembers,
  setFamilyMembers,
  assignments,
  setAssignments,
  isConfirmed,
  setIsConfirmed,
  onNavigate
}: AgentViewProps) {
  // Local Simulator states
  const [memberNickname, setMemberNickname] = useState('');
  const [memberAvoid, setMemberAvoid] = useState('');
  const [tempPreferences, setTempPreferences] = useState<{ [key: string]: string }>({
    'chore-1': '보통',
    'chore-2': '보통',
    'chore-3': '보통',
    'chore-4': '보통'
  });
  const [simLogs, setSimLogs] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [memberError, setMemberError] = useState('');

  // Add Family Member Handler
  const addFamilyMember = () => {
    const trimmed = memberNickname.trim();
    if (!trimmed) {
      setMemberError('가족의 호칭을 입력해 주세요.');
      return;
    }

    const forbiddenKeywords = ['홍길동', '010', '서울시', '@', '19', '20', '아파트', '동', '호', '생일', '주소'];
    const isSuspicious = forbiddenKeywords.some(kw => trimmed.toLowerCase().includes(kw));
    if (isSuspicious) {
      setMemberError('⚠️ 보안 필터 작동: 진짜 이름, 전화번호, 이메일, 주소가 감지되었습니다! 아빠, 막내, 대장, 요리왕 같은 가상 호칭만 사용해 안전하게 지켜주세요.');
      return;
    }

    if (familyMembers.some(m => m.nickname === trimmed)) {
      setMemberError('이미 등록된 호칭입니다. 중복되지 않게 입력해주세요!');
      return;
    }

    setMemberError('');
    const newMember: FamilyMember = {
      id: 'member-' + Date.now(),
      nickname: trimmed,
      preferences: { ...tempPreferences },
      avoidChoreId: memberAvoid
    };

    setFamilyMembers(prev => [...prev, newMember]);
    setMemberNickname('');
    setMemberAvoid('');
    setTempPreferences({
      'chore-1': '보통',
      'chore-2': '보통',
      'chore-3': '보통',
      'chore-4': '보통'
    });
  };

  const deleteMember = (id: string) => {
    setFamilyMembers(prev => prev.filter(m => m.id !== id));
    setAssignments([]);
    setIsConfirmed(false);
  };

  // Simulation Logic
  const runSimulation = () => {
    setIsSimulating(true);
    setSimLogs([]);
    const logs = [
      "🔍 [1단계: 에이전트 무결성 체크] 에이전트 가동 신호 승인...",
      `🔐 [2단계: 보안 가드 장치 작동] 지침 규칙: '${canvas.privacyRules || "실명 수집 금지"}' 필터 작동 중...`,
      "   - 가족 정보 데이터 확인 중... 100% 익명 칭호 식별 상태 확인 (안전)",
      "⚖️ [3단계: 공정성 기획 분석] 구성원의 집안일 비호감(기피) 및 횟수 가중치 분석 시작...",
      "⏳ [4단계: AI 의사결정 시뮬레이션] 각 타임슬롯 당원 매칭 최적 배정 계산 중...",
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < logs.length) {
        setSimLogs(prev => [...prev, logs[current]]);
        current++;
      } else {
        clearInterval(interval);
        generateAssignments();
        setIsSimulating(false);
      }
    }, 250);
  };

  const generateAssignments = () => {
    const generated: Assignment[] = [];
    const workCounter: { [key: string]: number } = {};
    
    familyMembers.forEach(m => {
      workCounter[m.id] = 0;
    });

    DEFAULT_CHORES.forEach(chore => {
      TIME_SLOTS.forEach(slot => {
        let eligible = familyMembers.filter(m => m.avoidChoreId !== chore.id);
        if (eligible.length === 0) {
          eligible = familyMembers;
        }

        const minWork = Math.min(...eligible.map(m => workCounter[m.id] || 0));
        const bestCandidates = eligible.filter(m => (workCounter[m.id] || 0) === minWork);

        let bestOfBest = bestCandidates.filter(m => m.preferences[chore.id] === '좋아함');
        if (bestOfBest.length === 0) {
          bestOfBest = bestCandidates.filter(m => m.preferences[chore.id] !== '싫어함');
        }
        if (bestOfBest.length === 0) {
          bestOfBest = bestCandidates;
        }

        const winner = bestOfBest[Math.floor(Math.random() * bestOfBest.length)];
        
        generated.push({
          id: `assign-${chore.id}-${slot}`,
          choreId: chore.id,
          choreName: chore.name,
          timeSlot: slot,
          memberId: winner.id,
          memberNickname: winner.nickname
        });

        workCounter[winner.id] = (workCounter[winner.id] || 0) + 1;
      });
    });

    setAssignments(generated);
    setIsConfirmed(false);
    setSimLogs(prev => [...prev, "📊 [5단계: 매칭 완료] 아래에서 가족과 함께 눈으로 결과를 검증해주세요."]);
  };

  return (
    <div id="agent-view-container" className="space-y-8">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-1.5">
        <div className="inline-flex bg-teal-100 text-teal-800 text-[10px] font-bold px-2.5 py-1 rounded-full">
          Step 2. 시뮬레이션 및 안전 테스트
        </div>
        <h2 className="text-xl font-bold text-slate-800">안전한 가상 호칭 등록 및 에이전트 실험 🔬</h2>
        <p className="text-slate-400 text-xs leading-relaxed">
          실제 개인정보 대신 가족의 재미있는 '호칭'을 등록한 다음, 에이전트가 어떤 순서로 판단하는지 로그를 통해 살펴보고 당번 매칭 결과를 관찰해보세요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Add Members */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
              <Users className="w-4 h-4 text-teal-600" />
              가족 가상 호칭 등록
            </h3>

            {memberError && (
              <div className="bg-rose-50 text-rose-800 p-2.5 border border-rose-100 text-xs rounded-xl flex gap-1.5 items-start">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{memberError}</span>
              </div>
            )}

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">
                  가족 호칭 (안전한 명칭만!)
                </label>
                <input 
                  type="text" 
                  value={memberNickname}
                  onChange={(e) => setMemberNickname(e.target.value)}
                  placeholder="예: 큰형, 막둥이, 요리조리" 
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Preference voting */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-500">각 집안일에 대한 주관적 선호도</label>
                <div className="space-y-2 text-xs">
                  {DEFAULT_CHORES.map(chore => (
                    <div key={chore.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-xl">
                      <span className="font-medium">{chore.icon} {chore.name}</span>
                      <div className="flex gap-1">
                        {['좋아함', '보통', '싫어함'].map(lvl => {
                          const isSelected = tempPreferences[chore.id] === lvl;
                          let btnClass = "px-2 py-0.5 rounded text-[10px] font-bold border ";
                          if (isSelected) {
                            if (lvl === '좋아함') btnClass += "bg-emerald-500 text-white border-emerald-500";
                            else if (lvl === '보통') btnClass += "bg-slate-500 text-white border-slate-500";
                            else btnClass += "bg-rose-500 text-white border-rose-500";
                          } else {
                            btnClass += "bg-white text-slate-500 border-slate-200 hover:bg-slate-100";
                          }
                          return (
                            <button 
                              key={lvl} 
                              onClick={() => setTempPreferences(prev => ({ ...prev, [chore.id]: lvl }))}
                              className={btnClass}
                            >
                              {lvl}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Avoid Chore Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">
                  절대 하기 힘든(제외할) 집안일
                </label>
                <select 
                  value={memberAvoid}
                  onChange={(e) => setMemberAvoid(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs bg-slate-50/50 focus:outline-none"
                >
                  <option value="">없음</option>
                  {DEFAULT_CHORES.map(chore => (
                    <option key={chore.id} value={chore.id}>{chore.icon} {chore.name}</option>
                  ))}
                </select>
              </div>

              <button 
                id="add-member-btn"
                onClick={addFamilyMember} 
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1 transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> 등록 대장에 저장하기
              </button>
            </div>
          </div>

          {/* List of registered members */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-slate-500">등록된 가족 목록 ({familyMembers.length}명)</h4>
            {familyMembers.length === 0 ? (
              <div className="text-center py-6 text-slate-400 text-xs">
                호칭과 선호도를 입력하여 가족을 추가해보세요. (최소 2명 필요)
              </div>
            ) : (
              <div className="space-y-2">
                {familyMembers.map(member => {
                  const avoidChore = DEFAULT_CHORES.find(c => c.id === member.avoidChoreId);
                  return (
                    <div key={member.id} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs">
                      <div className="space-y-1">
                        <div className="font-extrabold text-slate-800 flex items-center gap-1.5">
                          <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                          {member.nickname} {' '}
                          {avoidChore && (
                            <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-1.5 py-0.2 rounded">❌ {avoidChore.name} 제외</span>
                          )}
                        </div>
                        <div className="flex gap-2 text-[10px] text-slate-400 font-bold">
                          🧹{member.preferences['chore-1'] === '좋아함' ? '👍' : member.preferences['chore-1'] === '싫어함' ? '👎' : '😐'}
                          🧺{member.preferences['chore-2'] === '좋아함' ? '👍' : member.preferences['chore-2'] === '싫어함' ? '👎' : '😐'}
                          🧼{member.preferences['chore-3'] === '좋아함' ? '👍' : member.preferences['chore-3'] === '싫어함' ? '👎' : '😐'}
                          🍳{member.preferences['chore-4'] === '좋아함' ? '👍' : member.preferences['chore-4'] === '싫어함' ? '👎' : '😐'}
                        </div>
                      </div>
                      <button 
                        onClick={() => deleteMember(member.id)} 
                        className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Sim and Assignments */}
        <div className="md:col-span-7 space-y-6">
          {/* Simulator Machine Console */}
          <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-1.5 text-slate-300">
                <Cpu className={`w-4 h-4 text-teal-400 ${isSimulating ? 'animate-spin' : ''}`} />
                AI 에이전트 당번 분배 엔진
              </h3>
              <button 
                id="run-sim-btn"
                onClick={runSimulation} 
                disabled={familyMembers.length < 2 || isSimulating} 
                className={`font-bold py-1.5 px-4 rounded-lg text-xs transition-all ${
                  familyMembers.length >= 2 && !isSimulating
                    ? 'bg-teal-500 hover:bg-teal-400 text-white cursor-pointer shadow'
                    : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                }`}
              >
                {isSimulating ? '계산 중...' : '에이전트 가동'}
              </button>
            </div>

            {/* Sim terminal logs */}
            <div className="bg-slate-950 p-4 rounded-xl font-mono text-[11px] leading-relaxed border border-slate-800 h-40 overflow-y-auto text-teal-400 space-y-1">
              {simLogs.length === 0 ? (
                <div className="text-slate-500 text-center py-10">
                  🤖 "대기 중..."<br />가족을 등록한 뒤 에이전트 가동 버튼을 누르면 인지 및 결정 로그가 인쇄됩니다.
                </div>
              ) : (
                simLogs.map((log, i) => (
                  <div key={i} className={log.startsWith('📊') ? "text-yellow-300 font-bold mt-2" : ""}>
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Chore assignment table with HUMAN confirmation */}
          {assignments.length > 0 && (
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                  <Table className="w-4 h-4 text-teal-500" />
                  에이전트 제안 당번 시간표 (정원: 타임별 1명)
                </h3>
                {isConfirmed ? (
                  <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    ✅ 사람 최종 승인 완료
                  </span>
                ) : (
                  <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                    ⏳ 사람 검토 대기
                  </span>
                )}
              </div>

              {/* Time Slot Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DEFAULT_CHORES.map(chore => {
                  return (
                    <div key={chore.id} className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-2">
                      <div className="flex justify-between items-center border-b border-slate-200 pb-1.5 text-xs font-bold text-slate-700">
                        <span>{chore.icon} {chore.name}</span>
                        <span className="text-[9px] bg-slate-200 text-slate-500 px-1.5 py-0.2 rounded font-normal">정원: 1명</span>
                      </div>
                      <div className="space-y-1.5">
                        {TIME_SLOTS.map(slot => {
                          const assign = assignments.find(a => a.choreId === chore.id && a.timeSlot === slot);
                          const nickname = assign ? assign.memberNickname : '배정 없음';
                          const statusClass = isConfirmed ? 'bg-teal-50 text-teal-800 border-teal-200' : 'bg-amber-50 text-amber-800 border-amber-200';
                          return (
                            <div key={slot} className="flex justify-between items-center p-2 bg-white rounded-lg border border-slate-100 shadow-xs">
                              <span className="text-[10px] text-slate-400 font-bold">{slot.split(' ')[0]}</span>
                              <span className={`font-extrabold text-[11px] px-2 py-0.5 rounded border ${statusClass}`}>{nickname}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* HUMAN APPROVAL CORNER */}
              {!isConfirmed ? (
                <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl space-y-3">
                  <div className="flex gap-2.5 items-start">
                    <Check className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-xs space-y-1">
                      <p className="font-bold">👤 인간 승인 및 확정 단계 (Human-in-the-loop)</p>
                      <p className="leading-relaxed">
                        AI 에이전트가 완벽해보여도 잘못된 편향이나 비정상적인 몰아치기가 있을 수 있습니다. 
                        가족들이 시간표를 직접 검토하고 모두가 만족하면 최종 승인 버튼을 명시적으로 눌러주세요.
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button 
                      id="confirm-assignments-btn"
                      onClick={() => setIsConfirmed(true)} 
                      className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold py-2.5 px-5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      [최종 동의] 우리 가족 모두 시간표에 동의하고 수락하기
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl flex gap-2.5 items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <p className="font-bold">🎉 인간 승인 완료!</p>
                    <p className="leading-relaxed">
                      사람이 직접 매칭의 무결성을 확인하고 승인하였습니다. 다음 단계로 넘어가서 테스트 소감을 남겨주세요.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Next button container */}
      <div className="flex justify-between pt-4">
        <span className="text-xs text-slate-400 self-center">* 배정이 잘 맞지 않는 부분이나 AI 오류가 보였는지 기억해둡시다.</span>
        <button 
          id="go-to-improvement-btn"
          onClick={() => onNavigate('improvement')} 
          disabled={assignments.length === 0 || !isConfirmed} 
          className={`font-bold py-3.5 px-8 rounded-2xl shadow-sm transition-all ${
            assignments.length > 0 && isConfirmed
              ? 'bg-teal-500 hover:bg-teal-600 text-white cursor-pointer transform hover:-translate-y-0.5' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          다음: 개선 기록서 작성하기 📝
        </button>
      </div>
    </div>
  );
}
