import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { MicOff, VideoOff, PhoneOff, Camera, Maximize } from 'lucide-react';

export const VideoCall = () => {
  const navigate = useNavigate();
  const { dispatch } = useStore();
  const handleEnd = () => {
    dispatch({ type: "SUPPORT_ADD_HISTORY" });
    navigate(-1);
  };

  return (
    <div className="h-screen w-full bg-black relative overflow-hidden font-sans text-white">
      {/* Background - Mock Expert Video Video */}
      <div className="absolute inset-0 bg-[#2a2a2a] flex items-center justify-center">
        {/* Placeholder for Expert Video */}
        <div className="text-center opacity-50">
          <Camera size={64} className="mx-auto mb-4 text-gray-500" />
          <p className="text-lg font-medium">Ожидание видео от эксперта...</p>
        </div>
        
        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
      </div>

      {/* Header Info */}
      <div className="absolute top-12 left-0 right-0 px-6 flex items-center justify-between z-10">
        <div>
          <h2 className="text-2xl font-bold shadow-sm">Алексей З.</h2>
          <p className="text-[#00D1FF] font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00D1FF] animate-pulse"></span>
            Эксперт M.Видео
          </p>
        </div>
        <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-mono tracking-wider border border-white/10">
          02:45
        </div>
      </div>

      {/* Minimal Local Video Preview */}
      <div className="absolute top-12 right-6 w-28 h-40 bg-[#141414] rounded-2xl overflow-hidden border-2 border-white/10 shadow-lg z-20 hidden md:block">
        <div className="w-full h-full flex flex-col justify-center items-center text-gray-600 bg-[#1a1a1a]">
           Вы
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center items-end px-6 z-10">
        <div className="flex items-center gap-6 bg-black/40 backdrop-blur-lg px-8 py-5 rounded-full border border-white/10">
          
          <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md">
            <MicOff size={22} className="text-white" />
          </button>
          
          <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md">
            <VideoOff size={22} className="text-white" />
          </button>
          
          <div className="w-px h-8 bg-white/10 mx-2"></div>

          {/* End Call Button */}
          <button 
            onClick={handleEnd}
            className="w-16 h-16 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-500 transition-colors shadow-[0_0_20px_rgba(220,38,38,0.4)]"
          >
            <PhoneOff size={28} className="text-white" />
          </button>
          
        </div>
      </div>
    </div>
  );
};


