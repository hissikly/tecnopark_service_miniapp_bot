const fs = require('fs');
const path = require('path');

const applyRegex = (file, regex, replacement) => {
  const p = path.join(__dirname, 'src', file);
  if (!fs.existsSync(p)) return;
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace(regex, replacement);
  fs.writeFileSync(p, content);
};

// 1. update store.jsx
const pStore = path.join(__dirname, 'src', 'store.jsx');
let store = fs.readFileSync(pStore, 'utf8');
store = store.replace(
  /activeSubscription: \{[\s\S]*?coveredDeviceIds: \[\],/m,
  `activeSubscription: {
    isActive: false,
    planId: null,
    expiresAt: null,
    consultationsLeft: 0,
    garantiaDeviceId: null,
    coveredDeviceIds: [],`
);
store = store.replace(
  /case 'ACTIVATE_SUBSCRIPTION': \{[\s\S]*?selectedPlanInCheckout: 'none'[\s\S]*?\};/m,
  `case 'ACTIVATE_SUBSCRIPTION': {
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
          garantiaDeviceId: planId === 'garantia' ? state.selectedProduct.id : null,
          coveredDeviceIds: planId === 'postgarantia' ? [state.selectedProduct.id] : []
        },
        selectedPlanInCheckout: 'none'
      };
    }`
);
fs.writeFileSync(pStore, store);

