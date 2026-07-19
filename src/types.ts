// Static Chore & Time Slots Info
export const DEFAULT_CHORES = [
  { id: 'chore-1', name: '집안 청소', icon: '🧹' },
  { id: 'chore-2', name: '빨래', icon: '🧺' },
  { id: 'chore-3', name: '설거지', icon: '🧼' },
  { id: 'chore-4', name: '요리', icon: '🍳' }
];

export const TIME_SLOTS = ['아침 (오전)', '점심 (오후)', '저녁 (야간)'];

// Shared Types
export interface CanvasData {
  agentName: string;
  problem: string;
  goal: string;
  allowedInputs: {
    nickname: boolean;
    preferences: boolean;
    difficulty: boolean;
    workload: boolean;
    birthdate: boolean;
    phoneNumber: boolean;
    address: boolean;
    realName: boolean;
  };
  forbiddenActions: string;
  humanOverrideMoment: string;
  privacyRules: string;
  fairnessRules: string;
}

export interface FamilyMember {
  id: string;
  nickname: string;
  preferences: { [key: string]: string };
  avoidChoreId: string;
}

export interface Assignment {
  id: string;
  choreId: string;
  choreName: string;
  timeSlot: string;
  memberId: string;
  memberNickname: string;
}

export interface ImprovementData {
  discoveredProblems: string;
  improvementPlan: string;
  reflections: string;
}

export const INITIAL_CANVAS: CanvasData = {
  agentName: '',
  problem: '',
  goal: '',
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
  forbiddenActions: '',
  humanOverrideMoment: '',
  privacyRules: '',
  fairnessRules: ''
};
