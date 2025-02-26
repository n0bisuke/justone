import React, { useState, useEffect } from 'react';

const JustOneApp = () => {
  const [isStartScreen, setIsStartScreen] = useState(true);
  const [countdown, setCountdown] = useState(null);
  // お題の単語リスト - たくさんの単語を追加
  const allTopics = [
    // 物
    '船', 'ボーリング', 'キュウリ', 'スマホ', 'パソコン', '財布', '傘', '鞄', '時計', '鍵',
    'テレビ', '冷蔵庫', 'カメラ', '自転車', '電車', '飛行機', '車', 'バス', 'ノート', '本',
    '椅子', 'テーブル', 'ベッド', 'ソファ', 'ドア', '窓', '鏡', '花瓶', 'カップ', 'お皿',
    
    // 人物
    'アインシュタイン', 'スパイ', '医者', '先生', '警察官', '消防士', '俳優', '歌手', 'シェフ', 'デザイナー',
    '政治家', '科学者', '宇宙飛行士', '画家', '作家', '社長', '学生', '子供', '赤ちゃん', '老人',
    
    // 食べ物
    'ラーメン', 'カレー', 'ピザ', 'ハンバーガー', '寿司', 'ケーキ', 'アイス', 'チョコレート', 'りんご', 'バナナ',
    '牛肉', '豚肉', '鶏肉', '卵', '牛乳', 'チーズ', '納豆', 'みそ汁', 'うどん', 'そば',
    
    // 場所
    '学校', '病院', '図書館', '映画館', 'レストラン', 'カフェ', '公園', 'ビーチ', '山', '川',
    '湖', '森', '砂漠', '島', '都市', '田舎', '空港', '駅', 'ホテル', '遊園地',
    
    // 活動
    '水泳', 'サッカー', '野球', 'テニス', 'バスケ', 'ゴルフ', 'スキー', '釣り', 'キャンプ', 'ハイキング',
    '料理', '掃除', '買い物', '勉強', '読書', '映画鑑賞', 'ゲーム', '旅行', 'ヨガ', 'ダンス'
  ];
  
  // 現在表示されているお題の状態管理
  const [topics, setTopics] = useState([
    { id: 1, text: '船' },
    { id: 2, text: 'ボーリング' },
    { id: 3, text: 'アインシュタイン' },
    { id: 4, text: 'キュウリ' },
    { id: 5, text: 'スパイ' }
  ]);
  
  const colors = [
    { border: '#4B9CD3', bg: '#E6F0F8' }, // 青系
    { border: '#8DC63F', bg: '#F0F7E6' }, // 緑系
    { border: '#F15A29', bg: '#FEF0EB' }, // 赤/オレンジ系
    { border: '#F7941D', bg: '#FEF5E9' }, // オレンジ系
    { border: '#FFC20E', bg: '#FFFBE6' }  // 黄色系
  ];
  
  useEffect(() => {
    if (countdown !== null) {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setIsStartScreen(false);
      }
    }
  }, [countdown]);
  
  const handleStart = () => {
    // 新しいお題をランダムに5つ選ぶ（順番は1-5で固定）
    const newTopics = [];
    const usedIndices = new Set();
    
    // ランダムに5つの異なるお題を選ぶ
    for (let i = 1; i <= 5; i++) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * allTopics.length);
      } while (usedIndices.has(randomIndex));
      
      usedIndices.add(randomIndex);
      newTopics.push({ id: i, text: allTopics[randomIndex] });
    }
    
    setTopics(newTopics);
    setCountdown(5);
  };
  
  const handleReset = () => {
    setIsStartScreen(true);
    setCountdown(null);
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {isStartScreen ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-8">Just One カードアプリ</h1>
          <button 
            onClick={handleStart}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg"
          >
            {countdown === null ? 'スタート' : `${countdown}秒後に表示`}
          </button>
        </div>
      ) : (
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
            <ul className="space-y-3">
              {topics.map((topic, index) => (
                <li key={topic.id} className="flex items-center">
                  <div 
                    className="w-8 h-8 flex items-center justify-center mr-3 font-bold text-lg"
                    style={{ color: colors[index].border }}
                  >
                    {topic.id}
                  </div>
                  <div 
                    className="flex-1 p-2 rounded-md border-2"
                    style={{ 
                      borderColor: colors[index].border,
                      backgroundColor: colors[index].bg
                    }}
                  >
                    <p className="text-center font-medium text-lg">{topic.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center">
            <button 
              onClick={handleReset}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              戻る
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JustOneApp;