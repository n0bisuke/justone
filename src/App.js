import React, { useState, useEffect } from 'react';
import './App.css'; // 基本的なスタイルを適用

function App() {
  const [isStartScreen, setIsStartScreen] = useState(true);
  const [countdown, setCountdown] = useState(null);
  
  // お題の単語リスト
  const allTopics = [
    '船', 'ボーリング', 'アインシュタイン', 'キュウリ', 'スパイ', 
    'テレビ', '冷蔵庫', 'カメラ', '自転車', '電車'
    // 他の単語は省略
  ];
  
  // 現在表示されているお題の状態
  const [topics, setTopics] = useState([
    { id: 1, text: '船' },
    { id: 2, text: 'ボーリング' },
    { id: 3, text: 'アインシュタイン' },
    { id: 4, text: 'キュウリ' },
    { id: 5, text: 'スパイ' }
  ]);
  
  // 色の設定
  const colors = [
    { border: '#4B9CD3', bg: '#E6F0F8' }, // 青系
    { border: '#8DC63F', bg: '#F0F7E6' }, // 緑系
    { border: '#F15A29', bg: '#FEF0EB' }, // 赤/オレンジ系
    { border: '#F7941D', bg: '#FEF5E9' }, // オレンジ系
    { border: '#FFC20E', bg: '#FFFBE6' }  // 黄色系
  ];
  
  // カウントダウン処理
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
  
  // スタートボタン処理
  const handleStart = () => {
    // 新しいお題をランダムに5つ選ぶ
    const newTopics = [];
    const usedIndices = new Set();
    
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
  
  // リセットボタン処理
  const handleReset = () => {
    setIsStartScreen(true);
    setCountdown(null);
  };
  
  // 開始画面
  if (isStartScreen) {
    return (
      <div className="app-container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        backgroundColor: '#f5f5f5'
      }}>
        <h1 style={{ fontSize: '24px', marginBottom: '32px' }}>Just One カードアプリ</h1>
        <button 
          onClick={handleStart}
          style={{
            backgroundColor: '#4B9CD3',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            fontSize: '18px',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
        >
          {countdown === null ? 'スタート' : `${countdown}秒後に表示`}
        </button>
      </div>
    );
  }
  
  // お題表示画面
  return (
    <div className="app-container" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '350px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        padding: '16px',
        marginBottom: '16px'
      }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {topics.map((topic, index) => (
            <li key={topic.id} style={{ 
              display: 'flex', 
              alignItems: 'center',
              marginBottom: index < 4 ? '12px' : 0 
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px',
                fontWeight: 'bold',
                fontSize: '18px',
                color: colors[index].border
              }}>
                {topic.id}
              </div>
              <div style={{
                flex: 1,
                padding: '8px',
                borderRadius: '4px',
                border: `2px solid ${colors[index].border}`,
                backgroundColor: colors[index].bg
              }}>
                <p style={{ 
                  textAlign: 'center', 
                  margin: 0,
                  fontWeight: '500',
                  fontSize: '18px'
                }}>
                  {topic.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <button 
        onClick={handleReset}
        style={{
          backgroundColor: '#888888',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        戻る
      </button>
    </div>
  );
}

export default App;