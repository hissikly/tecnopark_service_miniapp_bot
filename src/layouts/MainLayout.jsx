import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingCart, User } from 'lucide-react';

export default function MainLayout() {
  const location = useLocation();
  const isFullScreen = ['/success', '/profile/chat', '/profile/video', '/profile/call'].includes(location.pathname);

  return (
    <div className="min-h-[100dvh] bg-slate-900 text-slate-50 flex flex-col mx-auto max-w-md relative pb-safe">
      <main className="flex-1 w-full flex flex-col selection:bg-cyan-500/30">
        <Outlet />
      </main>

      {!isFullScreen && (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-slate-900/90 backdrop-blur-xl border-t border-slate-800 z-50 px-6 py-2 pt-3 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <div className="flex justify-between items-center">
            <NavLink to="/" className={({isActive}) => `flex flex-col items-center gap-1 ${isActive ? 'text-cyan-500' : 'text-slate-500'}`}>
              <Home size={22} className="text-slate-500" />
              <span className="text-[10px] font-medium">Главная</span>
            </NavLink>
            <NavLink to="/catalog" className={({isActive}) => `flex flex-col items-center gap-1 ${isActive ? 'text-cyan-500' : 'text-slate-500'}`}>
              <Search size={22} />
              <span className="text-[10px] font-medium">Каталог</span>
            </NavLink>
            <NavLink to="/cart" className={({isActive}) => `flex flex-col items-center gap-1 ${isActive ? 'text-cyan-500' : 'text-slate-500'}`}>
              <ShoppingCart size={22} />
              <span className="text-[10px] font-medium">Корзина</span>
            </NavLink>
            <NavLink to="/profile" className={({isActive}) => `flex flex-col items-center gap-1 ${isActive ? 'text-cyan-500' : 'text-slate-500'}`}>
              <User size={22} />
              <span className="text-[10px] font-medium">Профиль</span>
            </NavLink>
          </div>
        </nav>
      )}
    </div>
  );
}