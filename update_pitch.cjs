const fs = require('fs');

let content = fs.readFileSync('src/pages/SubscribePitch.jsx', 'utf-8');
content = content.replace("dispatch({ type: 'SET_PLAN', payload: plan });", "dispatch({ type: 'SET_CHECKOUT_PLAN', payload: plan });");
content = content.replace("Сервисные услуги", "Сервисная поддержка");
content = content.replace("Техника Технопарк — это уверенность, а наши сервисы делают её абсолютной.", "Подписка дает дополнительную сервисную поддержку. Гарантия+ и Постгарантия+ — разные тарифы под разные сценарии.");
fs.writeFileSync('src/pages/SubscribePitch.jsx', content);
console.log('Fixed SubscribePitch');
