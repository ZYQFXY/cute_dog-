
import React, { useState, useMemo } from 'react';
import { Heart, Star, Sparkles, Coffee } from 'lucide-react';

// Stages of the interaction
enum Stage {
  INITIAL = 0,
  BEGGING = 1,
  CRYING = 2,
  SMUG = 3,
  HAPPY = 4
}

interface DogState {
  image: string;
  text: string;
  bgColor: string;
}

const DOG_STATES: Record<Stage, DogState> = {
  [Stage.INITIAL]: {
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600&h=600&fit=crop', // Cute puppy
    text: '艺萍姐姐可以请我喝奶茶吗？',
    bgColor: 'bg-pink-50',
  },
  [Stage.BEGGING]: {
    image: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=600&h=600&fit=crop', // Begging pug
    text: '求求你了嘛~',
    bgColor: 'bg-orange-50',
  },
  [Stage.CRYING]: {
    image: 'https://images.unsplash.com/photo-1504595403659-9088ce801e29?w=600&h=600&fit=crop', // Sad dog
    text: '我什么都会做的...',
    bgColor: 'bg-blue-50',
  },
  [Stage.SMUG]: {
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=600&fit=crop', // Smug/Funny corgi
    text: '那可由不得你，哼！',
    bgColor: 'bg-purple-50',
  },
  [Stage.HAPPY]: {
    image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?w=600&h=600&fit=crop', // Super happy
    text: '谢谢姐姐！最喜欢姐姐了！',
    bgColor: 'bg-yellow-50',
  },
};

const App: React.FC = () => {
  const [stage, setStage] = useState<Stage>(Stage.INITIAL);
  const [noClicks, setNoClicks] = useState(0);

  const handleNoClick = () => {
    const nextClicks = noClicks + 1;
    setNoClicks(nextClicks);

    if (nextClicks === 1) setStage(Stage.BEGGING);
    else if (nextClicks === 2) setStage(Stage.CRYING);
    else if (nextClicks >= 3) setStage(Stage.SMUG);
  };

  const handleYesClick = () => {
    setStage(Stage.HAPPY);
  };

  // 动态计算“可以”按钮的样式，使用 padding 而非 scale，确保布局正确撑开
  const yesButtonStyle = useMemo(() => {
    if (stage === Stage.HAPPY) return {};
    
    // 基础大小
    let paddingX = 32;
    let paddingY = 16;
    let fontSize = 20;

    if (stage === Stage.SMUG) {
        return {
            width: '100%',
            paddingTop: '60px',
            paddingBottom: '60px',
            fontSize: '48px',
        };
    }

    // 每次点击“不可以”增加的大小
    paddingX += noClicks * 20;
    paddingY += noClicks * 15;
    fontSize += noClicks * 8;

    return {
      paddingLeft: `${paddingX}px`,
      paddingRight: `${paddingX}px`,
      paddingTop: `${paddingY}px`,
      paddingBottom: `${paddingY}px`,
      fontSize: `${fontSize}px`,
    };
  }, [noClicks, stage]);

  const noButtonScale = useMemo(() => {
    return Math.max(0.3, 1 - noClicks * 0.2); // 缩小但不消失
  }, [noClicks]);

  const currentState = DOG_STATES[stage];

  return (
    <div className={`min-h-screen transition-colors duration-1000 flex flex-col items-center justify-center p-4 ${currentState.bgColor}`}>
      {/* 装饰元素 */}
      <div className="absolute top-10 left-10 text-pink-300 opacity-50 floating">
        <Heart size={48} />
      </div>
      <div className="absolute top-20 right-20 text-yellow-300 opacity-50 floating" style={{ animationDelay: '1s' }}>
        <Star size={40} />
      </div>
      <div className="absolute bottom-10 left-20 text-blue-300 opacity-50 floating" style={{ animationDelay: '1.5s' }}>
        <Coffee size={44} />
      </div>
      <div className="absolute bottom-20 right-10 text-purple-300 opacity-50 floating" style={{ animationDelay: '0.5s' }}>
        <Sparkles size={52} />
      </div>

      {/* 主卡片 */}
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-[40px] shadow-2xl border-4 border-pink-200 max-w-md w-full flex flex-col items-center text-center space-y-6 transition-all duration-500 overflow-hidden">
        
        {/* 狗狗图片 */}
        <div className="relative w-64 h-64 rounded-3xl overflow-hidden border-4 border-white shadow-lg floating flex-shrink-0">
          <img 
            key={currentState.image}
            src={currentState.image} 
            alt="Cute Puppy" 
            className="w-full h-full object-cover transition-all duration-700 transform hover:scale-110"
          />
          {stage === Stage.HAPPY && (
            <div className="absolute inset-0 flex items-center justify-center bg-pink-500/20">
               <Heart className="text-white animate-ping" size={80} fill="currentColor" />
            </div>
          )}
        </div>

        {/* 文字内容 */}
        <div className="min-h-[60px] flex items-center justify-center">
            <h1 className={`text-2xl md:text-3xl font-bold transition-all duration-500 leading-tight ${
              stage === Stage.HAPPY ? 'text-pink-600 scale-110' : 
              stage === Stage.SMUG ? 'text-purple-700' : 'text-gray-800'
            }`}>
              {currentState.text}
            </h1>
        </div>

        {/* 按钮容器 */}
        <div className={`flex flex-col items-center justify-center gap-4 w-full transition-all duration-500 ${stage === Stage.HAPPY ? 'mt-4' : ''}`}>
          
          {/* “可以”按钮 */}
          <button
            onClick={handleYesClick}
            style={yesButtonStyle}
            className={`
              transition-all duration-300 rounded-full font-bold shadow-lg active:scale-95 z-10
              ${stage === Stage.HAPPY ? 'bg-pink-500 text-white animate-bounce px-12 py-4 text-2xl' : 'bg-green-400 hover:bg-green-500 text-white'}
              flex items-center justify-center gap-2 whitespace-nowrap
            `}
          >
            {stage === Stage.HAPPY ? '太棒啦！✨' : '可以'}
            {stage === Stage.HAPPY && <Sparkles />}
          </button>

          {/* “不可以”按钮 - 仅在未成功且不是强买强卖阶段显示 */}
          {stage !== Stage.SMUG && stage !== Stage.HAPPY && (
            <button
              onClick={handleNoClick}
              style={{ transform: `scale(${noButtonScale})` }}
              className="transition-all duration-300 bg-gray-200 hover:bg-gray-300 text-gray-500 px-8 py-3 rounded-full font-bold text-lg shadow-md active:scale-90"
            >
              不可以
            </button>
          )}

          {/* 重新开始 */}
          {stage === Stage.HAPPY && (
            <button
              onClick={() => { setStage(Stage.INITIAL); setNoClicks(0); }}
              className="mt-6 text-pink-400 hover:text-pink-600 underline text-sm transition-colors"
            >
              还想喝？
            </button>
          )}
        </div>
      </div>

      {/* 撒花效果 */}
      {stage === Stage.HAPPY && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="absolute animate-bounce" 
              style={{ 
                left: `${Math.random() * 100}%`, 
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: 0.6
              }}
            >
              <Heart className="text-pink-400" size={16 + Math.random() * 24} fill="currentColor" />
            </div>
          ))}
        </div>
      )}

      {/* 页脚 */}
      <p className="mt-8 text-pink-400 font-medium tracking-widest opacity-80 uppercase text-xs">
        Made with ❤️ for Yiping Sister
      </p>
    </div>
  );
};

export default App;
