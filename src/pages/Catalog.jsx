import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, Percent } from 'lucide-react';

const categories = [
  { title: "Акции", icon: "🛍️", customIcon: true, color: "from-blue-600/20 to-blue-900/10" },
  { title: "Центр инноваций", icon: "🤖", color: "from-slate-600/20 to-slate-800/10" },
  { title: "Смартфоны и гаджеты", icon: "📱", color: "from-gray-700/20 to-gray-900/10" },
  { title: "Компьютеры и ноутбуки", icon: "💻", color: "from-blue-500/20 to-blue-800/10" },
  { title: "Телевизоры Аудио Hi-Fi", icon: "📺", color: "from-cyan-600/20 to-cyan-900/10" },
  { title: "Крупная бытовая", icon: "🧺", color: "from-slate-500/20 to-slate-800/10" },
  { title: "Для кухни", icon: "🫖", color: "from-stone-500/20 to-stone-800/10", route: "/product" },
  { title: "Для дома", icon: "🧹", color: "from-neutral-500/20 to-neutral-800/10" },
  { title: "Красота и здоровье", icon: "💄", color: "from-pink-500/20 to-pink-900/10" },
  { title: "Спортивные товары", icon: "🚴", color: "from-orange-500/20 to-orange-900/10" },
  { title: "Климат", icon: "💨", color: "from-teal-500/20 to-teal-900/10" },
  { title: "Для сада, дома и ремонта", icon: "🛠️", color: "from-green-500/20 to-green-900/10" }
];

export const Catalog = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-tp-darker p-4 pt-10 pb-24">
      <div className="flex gap-2 mb-6">
        <div className="flex-1 flex items-center bg-tp-card rounded-xl p-3 text-tp-textMuted border border-white/5">
          <Search size={20} className="mr-2" />
          <span className="text-sm">Искать в Технопарк</span>
        </div>
        <div className="w-12 flex items-center justify-center bg-tp-card rounded-xl border border-white/5">
          <SlidersHorizontal size={20} className="text-white" />
        </div>
      </div>

      <div className="flex gap-2 p-1 bg-tp-card rounded-xl mb-6 border border-white/5">
        <button className="flex-1 py-1.5 bg-tp-darker rounded-lg text-sm font-medium shadow-sm">Каталог</button>
        <button className="flex-1 py-1.5 text-tp-textMuted text-sm font-medium">Бренды</button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat, i) => (
          <div 
            key={i}
            onClick={() => cat.route && navigate(cat.route)}
            className={`bg-gradient-to-br ${cat.color} bg-tp-card rounded-2xl p-4 h-32 flex flex-col justify-between border border-white/5 relative overflow-hidden cursor-pointer active:scale-95 transition-transform`}
          >
            <span className="text-[13px] font-medium leading-snug w-full pr-2 relative z-10">{cat.title}</span>
            <div className="absolute right-0 bottom-0 w-20 h-20 bg-white/5 rounded-tl-full blur-xl z-0" />
            
            {/* Image Placeholder (Emoji to mimic 3D renders) */}
            <div className="absolute -right-2 -bottom-2 w-16 h-16 flex items-center justify-center z-10 transition-transform hover:scale-110">
              {cat.customIcon ? (
                <div className="text-blue-500/80 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  <Percent size={48} strokeWidth={2.5} />
                </div>
              ) : (
                <span className="text-5xl drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] opacity-90">{cat.icon}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
