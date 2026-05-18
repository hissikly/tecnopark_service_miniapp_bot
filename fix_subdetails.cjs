const fs = require('fs');

const content = `import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, ChevronRight, Video, MessageCircle, Clock, MapPin } from 'lucide-react';
import { useStore, TARIFFS } from '../store';

export const SubDetails = () => {
  const navigate = useNavigate();
  const { state } = useStore();
  const { activeSubscription, devices } = state;
  const isSubActive = activeSubscription?.isActive;

  if (!isSubActive) {
    return (
      <div className="min-h-screen bg-[#141414] text-white p-4 flex flex-col items-center justify-center">
        <h1 className="text-xl mb-4">Подписка не активна</h1>
        <button onClick={() => navigate(-1)} className="bg-[#222222] px-4 py-2 rounded">Назад</button>
      </div>
    );
  }

  const planId = activeSubscription.planId;
  const tariff = TARIFFS[planId];
  const isPost = planId === 'postgarantia';
  
  // Get covered devices
  const coveredDevicesList = devices.filter(d => activeSubscription.coveredDeviceIds.includes(d.id));

  return (
    <div className="min-h-screen bg-[#141414] text-white p-4 pb-20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pt-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-[#222222] rounded-full active:bg-[#333]">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Детали подписки</h1>
      </div>

      {/* Main Card */}
      <div className={\`border \${isPost ? 'border-cyan-500/50 bg-gradient-to-br from-cyan-900/30' : 'border-slate-700 bg-slate-800'} rounded-3xl p-6 mb-6 relative overflow-hidden\`}>
        {isPost && <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>}
        
        <div className="flex items-center gap-3 mb-4">
          <div className={\`\${isPost ? 'bg-cyan-500 text-black' : 'bg-slate-700 text-white'} p-2 rounded-xl\`}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold leading-tight">{tariff.title}</h2>
            <span className={\`text-sm font-medium \${isPost ? 'text-cyan-400' : 'text-slate-400'}\`}>Активна</span>
          </div>
        </div>

        <div className="space-y-3 mt-6 text-sm">
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <span className="text-gray-400">Действует до</span>
            <span className="font-medium text-white">{activeSubscription.expiresAt}</span>
          </div>
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <span className="text-gray-400">Видеоконсультации</span>
            <span className="font-medium bg-white/10 px-2 py-1 rounded-lg text-white">
              {activeSubscription.consultationsLeft === 'unlimited' ? 'Безлимит' : activeSubscription.consultationsLeft}
            </span>
          </div>
          {isPost && (
            <div className="flex justify-between items-center pb-2">
              <span className="text-gray-400">Устройства на ТО</span>
              <span className="font-medium text-white">{coveredDevicesList.length} / {tariff.maxDevices}</span>
            </div>
          )}
        </div>
      </div>

      {isPost && coveredDevicesList.length > 0 && (
         <div className="mb-6">
            <h3 className="font-medium mb-3 text-slate-300">Покрытые устройства:</h3>
            <div className="space-y-2">
               {coveredDevicesList.map(dev => (
                 <div key={dev.id} className="bg-slate-800 p-3 rounded-lg flex items-center justify-between text-sm">
                   <div className="font-medium">{dev.name}</div>
                   <div className="text-xs text-slate-400">{dev.category}</div>
                 </div>
               ))}
            </div>
         </div>
      )}

      {/* CTA Button */}
      <button 
        onClick={() => navigate('/profile/help')}
        className="w-full bg-cyan-500 text-black font-bold text-lg py-4 rounded-2xl mb-6 shadow-[0_0_20px_rgba(0,209,255,0.3)] active:scale-[0.98] transition-all"
      >
        Получить помощь
      </button>

      {/* Links */}
      <div className="space-y-3">
        <div onClick={() => navigate('/profile/history')} className="bg-[#222222] rounded-2xl p-4 flex items-center justify-between cursor-pointer active:bg-white/5">
          <div className="flex items-center gap-3">
            <Clock size={20} className="text-gray-400" />
            <span className="font-medium text-white">История обращений</span>
          </div>
          <ChevronRight size={20} className="text-gray-500" />
        </div>
        
        {!isPost && (
          <div onClick={() => navigate('/profile/post-garantia')} className="bg-[#222222] rounded-2xl p-4 flex items-center justify-between cursor-pointer active:bg-white/5">
            <div className="flex items-center gap-3">
              <ShieldCheck size={20} className="text-gray-400" />
              <div className="flex flex-col">
                <span className="font-medium text-white">Перейти на Постгарантия+</span>
                <span className="text-xs text-cyan-400">Чтобы добавить до 5 устройств</span>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-500" />
          </div>
        )}
      </div>
    </div>
  );
};
`
fs.writeFileSync('src/pages/SubDetails.jsx', content);
console.log('Fixed SubDetails.jsx');
