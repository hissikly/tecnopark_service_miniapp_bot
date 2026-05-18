const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const storePath = path.join(srcDir, 'store.jsx');

let storeContent = `import React, { createContext, useContext, useReducer } from 'react';

// CENTRALIZED DATA (SOURCE OF TRUTH)
export const TARIFFS = {
  garantia: {
    id: 'garantia',
    title: 'Гарантия+',
    price: 699,
    period: 'месяц',
    description: 'Расширенная гарантия и сервисная поддержка для вашего нового устройства.',
    features: [
      '10 видеоконсультаций',
      'Поддержка негарантийных случаев со скидкой',
      'Приоритетное гарантийное обслуживание'
    ],
    isMultiDevice: false
  },
  postgarantia: {
    id: 'postgarantia',
    title: 'Постгарантия+',
    price: 6999,
    period: 'год',
    description: 'Премиальный мультидевайсный сервис для вашей техники, купленной в Технопарке.',
    features: [
      'Безлимит видеоконсультаций',
      'Ремонт со скидкой',
      'Бесплатное ТО 5 устройств, купленных в Технопарке'
    ],
    isMultiDevice: true,
    maxDevices: 5
  }
};

export const DEVICES = [
  { id: 'dev-1', name: 'Холодильник Haier', category: 'Крупная бытовая', purchaseDate: '2024-05-18' },
  { id: 'dev-2', name: 'Телевизор Samsung', category: 'ТВ и видео', purchaseDate: '2023-11-10' },
  { id: 'dev-3', name: 'Кофемашина DeLonghi', category: 'Мелкая бытовая', purchaseDate: '2022-08-05' }
];

const initialState = {
  selectedProduct: {
    id: 'dev-1',
    title: 'Холодильник Haier',
    subtitle: 'Многодверный холодильник с дисплеем',
    price: 129990,
    image: '/fridge.png' // Ensure this exists or use placeholder
  },
  selectedPlanInCheckout: 'none',
  orderId: null,
  activeSubscription: {
    isActive: false,
    planId: null, // 'garantia' | 'postgarantia'
    expiresAt: null,
    consultationsLeft: 0,
    coveredDeviceIds: [],
  },
  devices: DEVICES,
  supportSession: {
    selectedDeviceId: null,
    selectedProblem: null,
    channel: null,
  },
  supportHistory: []
};

const StoreContext = createContext();

function storeReducer(state, action) {
  switch (action.type) {
    case 'SET_CHECKOUT_PLAN':
      return { ...state, selectedPlanInCheckout: action.payload };
    case 'ACTIVATE_SUBSCRIPTION': {
      const planId = state.selectedPlanInCheckout;
      if (planId === 'none') return state;
      const t = TARIFFS[planId];
      return {
        ...state,
        activeSubscription: {
          isActive: true,
          planId: planId,
          expiresAt: planId === 'garantia' ? '2024-06-18' : '2025-05-18',
          consultationsLeft: planId === 'garantia' ? 10 : 'unlimited',
          coveredDeviceIds: [state.selectedProduct.id] // Auto-cover bought item
        },
        selectedPlanInCheckout: 'none'
      };
    }
    case 'ADD_COVERED_DEVICE': {
      if (!state.activeSubscription.isActive || state.activeSubscription.planId !== 'postgarantia') return state;
      if (state.activeSubscription.coveredDeviceIds.includes(action.payload)) return state;
      return {
        ...state,
        activeSubscription: {
          ...state.activeSubscription,
          coveredDeviceIds: [...state.activeSubscription.coveredDeviceIds, action.payload]
        }
      };
    }
    case 'START_SUPPORT_SESSION':
      return {
        ...state,
        supportSession: {
          ...state.supportSession,
          selectedDeviceId: action.payload // device id
        }
      };
    case 'SET_PROBLEM':
      return { ...state, supportSession: { ...state.supportSession, selectedProblem: action.payload } };
    case 'SET_CHANNEL':
      return { ...state, supportSession: { ...state.supportSession, channel: action.payload } };
    case 'COMPLETE_SUPPORT_SESSION': {
      const historyRecord = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        deviceId: state.supportSession.selectedDeviceId,
        problem: state.supportSession.selectedProblem,
        channel: state.supportSession.channel,
        status: 'Обработано',
        tariffAtMoment: state.activeSubscription.planId
      };
      return {
        ...state,
        supportHistory: [historyRecord, ...state.supportHistory],
        supportSession: { selectedDeviceId: null, selectedProblem: null, channel: null }
      };
    }
    case 'UPGRADE_PLAN':
      return {
        ...state,
        activeSubscription: {
          ...state.activeSubscription,
          isActive: true,
          planId: 'postgarantia',
          expiresAt: '2025-05-18',
          consultationsLeft: 'unlimited',
          // Keep existing covered devices
        }
      };
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
`;
fs.writeFileSync(storePath, storeContent, 'utf-8');
console.log('store.jsx updated');
