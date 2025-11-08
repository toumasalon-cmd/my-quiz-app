import React, { useState } from 'react';

// 单文件 React 组件：环节动物门知识点答题器
// 说明：该文件可直接作为 React 组件使用（例如在 Vite + React 项目中）
// 使用 Tailwind CSS 进行样式（请确保项目已安装并配置 Tailwind）

const QUESTIONS = [
  {
    id: 1,
    type: 'single',
    q: '“分节”在环节动物门概念中指的是什么？',
    options: [
      '身体由若干相似或不相似的部分构成，每一部分叫一个体节',
      '体腔由中胚层和外胚层构成',
      '循环系统总是开放式的',
      '有翅膀的附肢'
    ],
    a: 0,
    explain: '分节是指身体由若干部分组成，每个部分称为体节，体节之间可以相似也可以不相似。'
  },
  {
    id: 2,
    type: 'single',
    q: '哪一项是环节动物的体腔（真体腔）特征？',
    options: [
      '体腔是中胚层之间的空腔，称为真体腔',
      '没有体腔，只有原腔',
      '体腔由外胚层和内胚层构成',
      '体腔充满了血液'
    ],
    a: 0,
    explain: '环节动物具有真体腔（由中胚层形成的体腔），体腔内有体液并包裹器官。'
  },
  {
    id: 3,
    type: 'single',
    q: '环节动物的循环系统可以分为哪两类？',
    options: [
      '闭式循环和开式循环',
      '动脉和静脉',
      '单循环和双循环',
      '肺循环和体循环'
    ],
    a: 0,
    explain: '环节动物通常有闭式循环（血液在血管内流动）或开式循环（血液流入体腔）。'
  },
  {
    id: 4,
    type: 'single',
    q: '环节动物后肠管排泄系统的特点包括：',
    options: [
      '成对的排泄管，具有肾管结构',
      '没有排泄结构，通过扩散排出废物',
      '以鳃为排泄器官',
      '用触手过滤废物'
    ],
    a: 0,
    explain: '许多环节动物具有成对的排泄管（肾管）用于排泄。'
  },
  {
    id: 5,
    type: 'single',
    q: '下列哪一项不是环节动物的三大类之一？',
    options: ['多毛纲', '软体纲', '寡毛纲', '蚂蟥纲'],
    a: 1,
    explain: '软体动物属于软体动物门，不是环节动物门的类。环节动物主要包括多毛纲、寡毛纲和蚂蟥纲（蛭纲）。'
  },
  {
    id: 6,
    type: 'single',
    q: '多毛纲（Polychaeta）的典型特征是：',
    options: [
      '头部明显，有跗足和刚毛，通常有分节的附肢',
      '没有刚毛，体节间无明显附肢',
      '为寄生生活，体节退化',
      '羽毛状的外骨骼'
    ],
    a: 0,
    explain: '多毛纲通常头部明显，体节有成对的副肢和刚毛，用于运动和感觉。'
  },
  {
    id: 7,
    type: 'single',
    q: '寡毛纲（Oligochaeta）的代表动物是：',
    options: ['蚯蚓', '海星', '蜗牛', '海葵'],
    a: 0,
    explain: '蚯蚓属于寡毛纲，体节有少量刚毛，头部不明显。'
  },
  {
    id: 8,
    type: 'single',
    q: '蚂蟥纲（蛭纲）的生活方式通常是：',
    options: ['半寄生或寄生，吸血或捕食', '自由游泳捕食藻类', '在土壤中以植物残体为食', '以浮游生物为食'],
    a: 0,
    explain: '蛭类通常为寄生或半寄生，以吸血或捕食为主。'
  },
  {
    id: 9,
    type: 'single',
    q: '下列关于环节动物神经系统的描述，哪个是正确的？',
    options: [
      '链状神经系统：腹侧有腹神经索，节间有节神经节',
      '放射状神经系统：从中心放射出去',
      '完全没有神经系统',
      '只有感觉细胞没有神经索'
    ],
    a: 0,
    explain: '环节动物通常具有链状神经系统，腹部有腹神经索和节神经节。'
  },
  {
    id: 10,
    type: 'single',
    q: '真体腔在环节动物机体功能上带来的一个重要好处是：',
    options: [
      '提供了器官独立于体壁的活动空间，利于器官运动与循环',
      '使动物失去分节性',
      '使循环系统必然成为开放式',
      '减少了器官的复杂性'
    ],
    a: 0,
    explain: '真体腔提供了器官悬浮和独立运动的空间，有利于循环与内部器官功能。'
  },
  {
    id: 11,
    type: 'single',
    q: '环节动物的多样化适应包括下列哪项？',
    options: [
      '形成分节以增强运动能力',
      '失去一切附肢以减少阻力',
      '完全依赖光合作用',
      '拥有内骨骼'
    ],
    a: 0,
    explain: '分节化是环节动物的重要特征，有利于运动、环境适应及器官分工。'
  }
];

export default function AppQuiz() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showExplain, setShowExplain] = useState(false);
  const [completed, setCompleted] = useState(false);

  const q = QUESTIONS[index];

  function selectOption(optIndex) {
    setAnswers(prev => ({ ...prev, [q.id]: optIndex }));
  }

  function next() {
    setShowExplain(true);
  }

  function goNextAfterExplain() {
    setShowExplain(false);
    if (index < QUESTIONS.length - 1) setIndex(i => i + 1);
    else setCompleted(true);
  }

  function prev() {
    setShowExplain(false);
    if (index > 0) setIndex(i => i - 1);
  }

  function restart() {
    setIndex(0);
    setAnswers({});
    setCompleted(false);
    setShowExplain(false);
  }

  function calcScore() {
    let s = 0;
    for (const qq of QUESTIONS) {
      if (answers[qq.id] === qq.a) s += 1;
    }
    return s;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex items-start justify-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6">
        <header className="mb-4">
          <h1 className="text-2xl font-bold">环节动物门 — 学习 & 测验</h1>
          <p className="text-sm text-slate-500">共 {QUESTIONS.length} 题 · 当前第 {index + 1} 题</p>
        </header>

        {!completed ? (
          <main>
            <div className="mb-6">
              <div className="text-lg font-medium mb-2">{q.q}</div>
              <div className="grid gap-3">
                {q.options.map((opt, i) => {
                  const chosen = answers[q.id] === i;
                  const correct = q.a === i;
                  const showCorrectNow = showExplain && correct;
                  return (
                    <button
                      key={i}
                      onClick={() => selectOption(i)}
                      className={`text-left p-3 rounded-xl border flex items-center justify-between transition ${chosen ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200'} ${showExplain && !chosen && !correct ? 'opacity-60' : ''}`}
                    >
                      <span>{String.fromCharCode(65 + i)}. {opt}</span>
                      {showExplain ? (
                        <span className="text-sm">
                          {correct ? '正确答案' : (chosen ? (correct ? '你的答案（正确）' : '你的答案（错误）') : '')}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                className="px-4 py-2 rounded-lg border hover:bg-slate-50"
                disabled={index === 0}
              >上一步</button>

              {!showExplain ? (
                <button
                  onClick={next}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                >提交查看解析</button>
              ) : (
                <>
                  <div className="flex-1 text-sm text-slate-600">解析：{q.explain}</div>
                  <button onClick={goNextAfterExplain} className="px-4 py-2 rounded-lg bg-green-600 text-white">下一题</button>
                </>
              )}

              <button onClick={restart} className="ml-auto text-sm text-slate-500">重新开始</button>
            </div>

            <div className="mt-4 text-sm text-slate-500">已答题数：{Object.keys(answers).length} / {QUESTIONS.length}</div>
          </main>
        ) : (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold">测验完成</h2>
            <p className="mt-3 text-lg">得分：{calcScore()} / {QUESTIONS.length}</p>
            <div className="mt-6 flex justify-center gap-3">
              <button onClick={() => setCompleted(false)} className="px-4 py-2 rounded-lg bg-indigo-600 text-white">查看试卷</button>
              <button onClick={restart} className="px-4 py-2 rounded-lg border">重做</button>
            </div>

            <div className="mt-6 text-left">
              <h3 className="font-medium">答题详情：</h3>
              <ol className="mt-2 space-y-3">
                {QUESTIONS.map((qq, idx) => (
                  <li key={qq.id} className="p-3 border rounded-lg">
                    <div className="font-medium">{idx + 1}. {qq.q}</div>
                    <div className="text-sm text-slate-600 mt-1">你的答案：{answers[qq.id] !== undefined ? String.fromCharCode(65 + answers[qq.id]) + '. ' + qq.options[answers[qq.id]] : '未作答'}</div>
                    <div className="text-sm text-slate-600">正确答案：{String.fromCharCode(65 + qq.a)}. {qq.options[qq.a]}</div>
                    <div className="mt-2 text-sm text-slate-500">解析：{qq.explain}</div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        <footer className="mt-6 text-xs text-slate-400">本原型基于你提供的导图抽取常见考点生成题库，可按需扩展题量与题型。</footer>
      </div>
    </div>
  );
}
