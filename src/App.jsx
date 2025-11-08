import React, { useState } from 'react';

// 环节动物与其他动物门混合选择题（难度较高，不超纲）
// -----------------------------------------------------
// 特点：
// 1. 涵盖环节动物门全部知识点（分节、体腔、循环、排泄、刚毛、类群比较、生殖）。
// 2. 加入节肢动物、软体动物、扁形动物等作干扰项，但所有内容均在动物学基础范围内。
// 3. 每题为单选题，部分需理解概念或类比。
// 4. 末尾附 Vercel 部署说明。

export default function AnnelidQuiz() {
  const [score, setScore] = useState(null);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 1,
      q: '下列关于“分节”的叙述中正确的是：',
      options: [
        'A. 所有节肢动物的分节都是同律分节',
        'B. 环节动物的分节主要表现为体腔和肌肉的重复',
        'C. 扁形动物也具有典型的体节结构',
        'D. 异律分节指体节间完全无差异',
      ],
      answer: 'B',
      explanation: '环节动物体腔、神经节、肌肉等重复排列，属同律分节或部分异律。',
    },
    {
      id: 2,
      q: '环节动物的体腔属于哪一类？',
      options: [
        'A. 假体腔',
        'B. 无体腔',
        'C. 真体腔',
        'D. 体腔仅在胚胎期存在',
      ],
      answer: 'C',
      explanation: '环节动物具有真体腔（中胚层衍生体腔膜包裹）。',
    },
    {
      id: 3,
      q: '与节肢动物相比，环节动物的循环系统通常为：',
      options: [
        'A. 开放式循环',
        'B. 闭合式循环',
        'C. 无循环系统',
        'D. 混合式循环（部分开放部分闭合）',
      ],
      answer: 'B',
      explanation: '环节动物（如蚯蚓）血液封闭于血管中流动，属于闭合式循环。',
    },
    {
      id: 4,
      q: '下列关于环节动物排泄系统的说法正确的是：',
      options: [
        'A. 每一体节都有成对的排泄管',
        'B. 排泄管随机分布于体腔中',
        'C. 所有环节动物排泄物都通过肠道排出',
        'D. 环节动物无排泄器官',
      ],
      answer: 'A',
      explanation: '环节动物的排泄系统具节段性，每节一对肾管。',
    },
    {
      id: 5,
      q: '关于刚毛（setae）的叙述中，错误的是：',
      options: [
        'A. 多毛纲刚毛多且发达，用于游泳',
        'B. 寡毛纲刚毛少，用于爬行',
        'C. 蛭纲完全无刚毛',
        'D. 昆虫的刚毛主要由肌肉和体腔形成',
      ],
      answer: 'D',
      explanation: '昆虫刚毛为表皮衍生物，不同于环节动物体壁刚毛。',
    },
    {
      id: 6,
      q: '下列哪类动物的神经系统最接近环节动物的“腹神经链”结构？',
      options: [
        'A. 扁形动物',
        'B. 软体动物（如章鱼）',
        'C. 节肢动物（如昆虫）',
        'D. 棘皮动物（如海星）',
      ],
      answer: 'C',
      explanation: '节肢动物与环节动物均具腹神经链，为共同祖先特征之一。',
    },
    {
      id: 7,
      q: '以下哪项最能体现环节动物的生理优势？',
      options: [
        'A. 体腔液形成液压骨架，提高运动效率',
        'B. 神经系统呈放射对称结构',
        'C. 血液与体腔液合一，循环效率低',
        'D. 通过气孔进行呼吸',
      ],
      answer: 'A',
      explanation: '液压骨架是环节动物运动的重要基础。',
    },
    {
      id: 8,
      q: '以下哪类动物与环节动物的发育方式最接近？',
      options: [
        'A. 扁形动物（原肠胚阶段直接形成成体）',
        'B. 软体动物（有担轮幼体）',
        'C. 腔肠动物（出芽生殖）',
        'D. 原口动物中的节肢动物（螺旋卵裂）',
      ],
      answer: 'D',
      explanation: '环节动物与节肢动物同属原口动物，螺旋卵裂发育。',
    },
  ];

  const handleSubmit = () => {
    let s = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.answer) s++;
    });
    setScore(s);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-4">环节动物与其他动物比较选择题</h1>
        <p className="text-slate-600 mb-6 text-sm">（含环节动物门、节肢动物、软体动物、扁形动物等干扰项；全部题目不超纲）</p>

        {questions.map((q) => (
          <div key={q.id} className="mb-6 border rounded-lg p-4">
            <h2 className="font-semibold mb-2">{q.id}. {q.q}</h2>
            <div className="space-y-2">
              {q.options.map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`q${q.id}`}
                    value={opt.charAt(0)}
                    checked={answers[q.id] === opt.charAt(0)}
                    onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
            {score !== null && (
              <p className={`mt-2 text-sm ${answers[q.id] === q.answer ? 'text-green-600' : 'text-red-600'}`}>
                {answers[q.id] === q.answer ? '✅ 正确' : `❌ 错误，正确答案：${q.answer}。${q.explanation}`}
              </p>
            )}
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          提交答案
        </button>

        {score !== null && (
          <div className="mt-4 text-lg font-semibold">
            总分：{score} / {questions.length}
          </div>
        )}

        <footer className="mt-6 text-xs text-slate-500 border-t pt-3">
          <div>Vercel 部署说明：</div>
          <ol className="list-decimal list-inside">
            <li>用 Create React App 或 Next.js 创建项目，将此文件命名为 App.jsx 或 pages/index.jsx。</li>
            <li>运行 npm run build，本地测试后推送到 GitHub。</li>
            <li>在 vercel.com 导入仓库并点击 Deploy 即可。</li>
          </ol>
        </footer>
      </div>
    </div>
  );
}
