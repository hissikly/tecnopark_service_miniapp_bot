const fs = require('fs');

const homeContent = `import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight, ShieldCheck } from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-tp-darker p-4 space-y-6 pt-10 pb-20">
      <div className="flex items-center bg-tp-card rounded-xl p-3 text-tp-textMuted border border-white/5">
        <Search size={20} className="mr-2" />
        <span className="text-sm">Искать в Технопарк</span>
      </div>

      <div className="space-y-4">
        {/* Banner */}
        <div 
          onClick={() => navigate('/catalog')}
          className="bg-gradient-to-br from-blue-700/80 to-tp-darker rounded-2xl p-6 relative overflow-hidden h-40 border border-white/5 cursor-pointer"
        >
          <div className="relative z-10 w-2/3">
            <h2 className="text-xl font-bold mb-2 text-white">Новинки техники</h2>
            <p className="text-xs text-white/90">Выбирайте лучшее в каталоге</p>
          </div>
          <div className="absolute -right-4 top-4 w-32 h-32 opacity-90 transition-transform hover:scale-110 flex justify-center items-center">
             <span className="text-7xl drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">🎧</span>
          </div>
        </div>

        {/* Promo banner for subscription */}
        <div className="bg-tp-card rounded-2xl p-4 border border-tp-cyan/20 flex justify-between items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-tp-cyan/10 blur-xl rounded-full" />
          <div className="flex items-center gap-3 relative z-10">
            <div className="bg-tp-cyan/10 p-2 rounded-xl text-tp-cyan">
               <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-0.5">Сервис Гарантия+</h3>
              <p className="text-[11px] text-tp-textMuted">Помощь с техникой после покупки</p>
            </div>
          </div>
          <div className="bg-tp-dark p-2 rounded-full relative z-10 border border-white/5">
            <ChevronRight size={16} className="text-tp-cyan" />
          </div>
        </div>

        {/* Categories preview */}
        <div className="grid grid-cols-2 gap-3">
          <div onClick={() => navigate('/product')} className="bg-gradient-to-br from-stone-500/20 to-stone-800/10 bg-tp-card rounded-2xl p-4 h-32 flex flex-col justify-between border border-white/5 cursor-pointer relative overflow-hidden active:scale-95 transition-transform">
            <span className="text-[13px] font-medium leading-snug relative z-10">Для кухни</span>
            <div className="absolute -right-2 -bottom-2 w-16 h-16 flex items-center justify-center z-10 transition-transform hover:scale-110">
               <img 
                 src="/fridge.png" 
                 alt="Холодильник" 
                 className="w-16 h-16 object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
                 onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} 
               />
               <span className="text-5xl drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] hidden">🫖</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-700/20 to-gray-900/10 bg-tp-card rounded-2xl p-4 h-32 flex flex-col justify-between border border-white/5 relative overflow-hidden active:scale-95 transition-transform">
            <span className="text-[13px] font-medium leading-snug relative z-10">Смартфоны</span>
            <div className="absolute -right-2 -bottom-2 w-16 h-16 flex items-center justify-center z-10 transition-transform hover:scale-110">
                <span className="text-5xl drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">📱</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/pages/Home.jsx', homeContent);
console.log("Home updated!");
