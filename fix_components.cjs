const fs = require('fs');
const path = require('path');

function processFile(name, replacements) {
    const p = path.join(__dirname, 'src', name);
    if (!fs.existsSync(p)) return;
    let content = fs.readFileSync(p, 'utf8');
    for (const [from, to] of replacements) {
        content = content.replace(from, to);
    }
    fs.writeFileSync(p, content);
}

// 1. SuccessScreen
processFile('pages/Success.jsx', [
    [/<h2>Поздравляем!<\/h2>\s*<p className="text-gray-600 mb-6">\s*Ваша подписка успешно оформлена\.[\s\S]*?<\/p>/, 
`<h2>Поздравляем!</h2>
            {store.activeSubscription?.planId === 'garantia' ? (
               <p className="text-gray-600 mb-6">
                 Подписка Гарантия+ активна для вашего холодильника.<br/>
                 Вам доступно 10 видеоконсультаций и приоритетное гарантийное обслуживание.
               </p>
            ) : (
               <p className="text-gray-600 mb-6">
                 Расширенный тариф Постгарантия+ активен.<br/>
                 Теперь вы можете обслуживать до 5 устройств. Доступен ремонт со скидкой и бесплатное ТО.
               </p>
            )}`]
]);

// 2. CartScreen
processFile('pages/Cart.jsx', [
    [/<p className="text-sm text-gray-500 mt-1">Один платеж в месяц<\/p>/, 
`{planId === 'garantia' ? (
                <p className="text-sm text-gray-500 mt-1">Тариф для новой покупки. Будет привязан к этому устройству.</p>
              ) : (
                <p className="text-sm text-gray-500 mt-1">Расширенный тариф для нескольких устройств. После покупки сможете добавить ещё устройства.</p>
              )}`]
]);

// 3. ProfileScreen
processFile('pages/Profile.jsx', [
    [/<p className="text-sm opacity-90 mb-4">[\s\S]*?<\/p>/,
    `{planId === 'garantia' ? (
              <p className="text-sm opacity-90 mb-4">Для новой покупки. Привязано к {store.devices.find(d => d.id === store.activeSubscription.garantiaDeviceId)?.name || 'устройству'}.</p>
            ) : (
              <p className="text-sm opacity-90 mb-4">Расширенный сервис. Доступен ремонт и ТО.</p>
            )}`
    ],
    [/<p className="text-sm mb-2">Осталось консультаций: <strong>\{store\.activeSubscription\.consultationsLeft\}<\/strong><\/p>/,
    `<p className="text-sm mb-2">Осталось консультаций: <strong>{store.activeSubscription.consultationsLeft}</strong></p>
            {planId === 'postgarantia' && (
              <p className="text-sm mb-4">Покрыто устройств: <strong>{store.activeSubscription.coveredDeviceIds.length}/5</strong></p>
            )}`
    ]
]);

// 4. SubDetailsScreen
processFile('pages/SubDetails.jsx', [
    [/<h1 className="text-2xl font-bold mb-6">Ваша подписка: \{t\.title\}<\/h1>/,
    `<h1 className="text-2xl font-bold mb-6">Ваша подписка: {t.title}</h1>
      <p className="text-gray-600 mb-4">
        {planId === 'garantia' 
          ? 'Подключена к устройству. Включает 10 видеоконсультаций, приоритетное гарантийное обслуживание и скидку на негарантийные случаи.'
          : 'Расширенный сервисный тариф. Включает безлимит видеоконсультаций, ремонт со скидкой и ТО 5 устройств.'}
      </p>`
    ]
]);

