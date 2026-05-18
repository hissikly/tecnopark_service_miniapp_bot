import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  selectedProduct: {
    id: 'prod-main',
    title: 'Холодильник Haier',
    subtitle: 'Многодверный холодильник с дисплеем, 536 л',
    price: 129990,
    image: '/fridge.png',
  },
  selectedPlan: 'none',
  quantity: 1,
  orderId: null,
  subscription: {
    isActive: false,
    plan: 'none',
    expiresAt: null,
    consultationsLeft: null,
    coveredDevices: []
  },
  support: {
    deviceId: null,
    issueType: null,
    channel: null,
  },
  history: [],
  devices: [
    { id: 'dev-old1', title: 'Телевизор Samsung', price: 89990, date: '2023-11-10' },
    { id: 'dev-old2', title: 'Кофемашина DeLonghi', price: 45990, date: '2022-08-05' }
  ]
};

export const TARIFFS = {
  garantia: {
    id: 'garantia',
    title: 'Гарантия+',
    price: 699,
    period: 'месяц',
    description: 'Базовый сервисный пакет для вашей новой покупки. Поддержка и уверенность.',
    features: [
      'Для 1 устройства (новая покупка)',
      '10 видеоконсультаций',
      'Приоритетное гарантийное обслуживание'
    ],
  },
  postgarantia: {
    id: 'postgarantia',
    title: 'Постгарантия+',
    price: 6999,
    period: 'год',
    description: 'Расширенный сервисный пакет для нескольких устройств, включая негарантийные случаи.',
    features: [
      'Для нескольких устройств сразу',
      'Безлимитные консультации',
      'Скидка на любой ремонт',
      'Бесплатное ТО до 5 устройств'
    ],
  }
};

const StoreContext = createContext();

function storeReducer(state, action) {
  switch (action.type) {
    case 'SET_PLAN':
      return { ...state, selectedPlan: action.payload };
    case 'ACTIVATE_SUBSCRIPTION': {
      const plan = state.selectedPlan;
      if (plan === 'none') {
        return {
          ...state,
          orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
        };
      }
      
      const isGar = plan === 'garantia';
      return {
        ...state,
        orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
        subscription: {
          isActive: true,
          plan: plan,
          expiresAt: isGar ? '2026-06-19' : '2027-05-19',
          consultationsLeft: isGar ? 10 : 'unlimited',
          coveredDevices: isGar ? [state.selectedProduct] : [state.selectedProduct, ...state.devices]
        },
        selectedPlan: 'none'
      };
    }
    case 'SUPPORT_SET_DEVICE':
      return { ...state, support: { ...state.support, deviceId: action.payload } };
    case 'SUPPORT_SET_ISSUE':
      return { ...state, support: { ...state.support, issueType: action.payload } };
    case 'SUPPORT_SET_CHANNEL':
      return { ...state, support: { ...state.support, channel: action.payload } };
    case 'SUPPORT_ADD_HISTORY': {
      const record = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        deviceId: state.support.deviceId,
        issueType: state.support.issueType,
        channel: state.support.channel,
        status: 'Обработано',
        planAtMoment: state.subscription.plan
      };
      return {
        ...state,
        history: [record, ...state.history],
        support: { deviceId: null, issueType: null, channel: null } // reset
      };
    }
    case 'UPGRADE_PLAN':
      return {
        ...state,
        subscription: {
          isActive: true,
          plan: 'postgarantia',
          expiresAt: '2027-05-19',
          consultationsLeft: 'unlimited',
          coveredDevices: [state.selectedProduct, ...state.devices]
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
