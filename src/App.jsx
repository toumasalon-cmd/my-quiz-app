import React, { useMemo, useState } from 'react';

// 环节动物混合选择题（24 题，混合难度，立即出解析 + 随机题序）
// 说明：
// - 单文件 React 页面（默认导出），使用 TailwindCSS 样式类。
// - 每次页面加载题目顺序会随机化；每题答题后立即显示解析与正确答案。
// - 页尾显示自动评分与按知识点的掌握率柱状图（原生 div 条形图实现）。
// - 将此文件放入你的 React/Next.js 项目（src/App.jsx 或 pages/index.jsx）并部署到 Vercel。

function shuffle(array) {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function AnnelidMixedQuiz() {
  // 题库（24 题），每题带 category 用于统计掌握率
  const baseQuestions = useMemo(() => [
    { id: 1, category: '分节', q: '下列关于“同律分节”的描述哪项最准确？', options: ['A. 各体节形态和功能基本相似', 'B. 各体节高度分化为不同器官', 'C. 只存在于节肢动物', 'D. 指的是胚胎期分节'], ans: 'A', exp: '同律分节指体节间在外形与功能上高度重复，这在许多环节动物中可见。' },
    { id: 2, category: '体腔', q: '环节动物的体腔通常称为什么？', options: ['A. 假体腔', 'B. 真体腔', 'C. 无体腔', 'D. 衬膜腔'], ans: 'B', exp: '环节动物具有由中胚层衍生并被膜包覆的真体腔。' },
    { id: 3, category: '循环', q: '蚯蚓的循环系统特点是：', options: ['A. 开放式循环', 'B. 闭合式循环', 'C. 没有血液', 'D. 仅靠体腔液循环'], ans: 'B', exp: '蚯蚓等环节动物具有血液在血管中流动的闭合式循环。' },
    { id: 4, category: '排泄', q: '环节动物节段化的排泄器官通常表现为：', options: ['A. 每节一对肾管', 'B. 排泄孔随机分布', 'C. 只有头节有排泄器官', 'D. 通过鳃进行排泄'], ans: 'A', exp: '环节动物排泄系统通常节段性，每节可有成对肾管或过滤结构。' },
    { id: 5, category: '刚毛', q: '下列哪项关于刚毛（setae）的描述是错误的？', options: ['A. 刚毛可作为附着或推进工具', 'B. 多毛类刚毛通常发达', 'C. 刚毛为皮肤的角质层衍生物', 'D. 蛭类通常刚毛退化或缺失'], ans: 'C', exp: '刚毛为体壁特化的角化或刚毛结构，但严格说为表皮衍生物，C 的表述易引起混淆（角质层不恰当）。' },
    { id: 6, category: '神经', q: '环节动物的主神经索位于体壁的哪一侧？', options: ['A. 背侧', 'B. 腹侧', 'C. 侧面', 'D. 环形分布'], ans: 'B', exp: '环节动物典型具有腹神经链（腹侧主神经索）。' },
    { id: 7, category: '发育', q: '环节动物与节肢动物在早期胚胎发育中共有的特点是：', options: ['A. 放射对称', 'B. 旋转卵裂（螺旋卵裂）', 'C. 口胚与无胚分化同时发生', 'D. 无体腔形成'], ans: 'B', exp: '许多原口动物（包括环节动物和节肢动物）表现为螺旋卵裂。' },
    { id: 8, category: '比较', q: '下列哪项是环节动物相对于昆虫的一个典型区别？', options: ['A. 昆虫具有真体腔而环节动物无', 'B. 环节动物的体节往往可在外形上重复', 'C. 昆虫的血液完全在血管中流动', 'D. 环节动物属于后口动物'], ans: 'B', exp: '环节动物体节在许多种类中相对一致重复，是其显著特征之一。' },

    // 9-16
    { id: 9, category: '生殖', q: '蚯蚓的生殖方式通常为：', options: ['A. 有性互相受精（雌雄同体互交）', 'B. 单性生殖（孤雌生殖）', 'C. 无性出芽', 'D. 外部孵化的带游泳幼体'], ans: 'A', exp: '蚯蚓为雌雄同体，但一般通过互相接触交换精子进行有性生殖。' },
    { id: 10, category: '分节', q: '若某动物体节高度分化（头胸腹明显不同），该现象称为：', options: ['A. 同律分节', 'B. 异律分节', 'C. 无节化', 'D. 假节化'], ans: 'B', exp: '异律分节指体节在形态与功能上发生分区分化。' },
    { id: 11, category: '体腔', q: '假体腔动物的一个典型代表是：', options: ['A. 线虫', 'B. 环节动物', 'C. 软体动物', 'D. 扁形动物'], ans: 'A', exp: '线虫属于假体腔动物（pseudocoelomate）。' },
    { id: 12, category: '循环', q: '下面哪个特征最能支持“闭合式循环”比“开放式循环”运输效率高？', options: ['A. 血液与体腔液混合', 'B. 血液被血管限制，能维持较高压力', 'C. 血液直接淋浴组织', 'D. 没有血细胞'], ans: 'B', exp: '血管限制导致可维持压力梯度，从而更高效运输物质。' },
    { id: 13, category: '排泄', q: '若用染料局部注入某一体节并观测染料由同一节的排泄孔排出，这支持了哪项结论？', options: ['A. 排泄系统非节段化', 'B. 排泄系统节段化', 'C. 染料可被肌肉吸收而不排出', 'D. 染料不是水溶性的'], ans: 'B', exp: '局部注入并从对应节段排出支持节段化排泄结构的存在。' },
    { id: 14, category: '刚毛', q: '在分类学测量中，下列哪组指标最适合用于依据刚毛区分类群？', options: ['A. 刚毛数目、平均长度、分布类型', 'B. 仅刚毛颜色', 'C. 体重、体温、刚毛硬度', 'D. 栖息地深度与刚毛长度无关'], ans: 'A', exp: '数目、长度与分布是可量化且有分类信息的指标。' },
    { id: 15, category: '神经', q: '环节动物神经系统中“链状节”最直接对应的结构是：', options: ['A. 背索', 'B. 腹神经节与腹神经索', 'C. 星形神经环', 'D. 神经节只在头部存在'], ans: 'B', exp: '环节动物有腹神经链，由分节的神经节和连合的神经索构成。' },
    { id: 16, category: '比较', q: '软体动物（如腹足类）与环节动物的一个显著差异是：', options: ['A. 软体动物普遍具有刚毛', 'B. 环节动物通常无明显外壳', 'C. 软体动物都属于原口动物', 'D. 环节动物为放射对称动物'], ans: 'B', exp: '许多软体动物具有外壳或贝壳；环节动物通常无外壳并表现细长节段化。' },

    // 17-24
    { id: 17, category: '发育', q: '下列哪项是节肢动物与环节动物共同的进化特征线索？', options: ['A. 刚毛退化', 'B. 节段化与重复的体节结构', 'C. 背侧神经索', 'D. 放射对称幼体'], ans: 'B', exp: '体节化与重复器官是两者的共同特征，提示系统发育关系。' },
    { id: 18, category: '生殖', q: '多毛类（polychaetes）常见的生殖策略包括：', options: ['A. 直接发育，无游泳幼体', 'B. 体外受精并产生带游泳能力的幼体', 'C. 仅无性繁殖', 'D. 在宿主体内发育'], ans: 'B', exp: '许多多毛纲动物通过体外受精产生游泳幼体以扩大传播范围。' },
    { id: 19, category: '循环', q: '如果一动物的血液在大部分组织间游动而不受血管限制，则它更可能是：', options: ['A. 闭合式循环动物', 'B. 开放式循环动物', 'C. 无循环动物', 'D. 真体腔动物'], ans: 'B', exp: '开放式循环指血液/血淋巴不完全被血管约束，直接淋浴组织。' },
    { id: 20, category: '排泄', q: '比较环节动物与节肢动物的排泄系统，下列说法正确的是：', options: ['A. 两者都使用肾管完全相同的结构', 'B. 节肢动物常有马氏管等特化排泄结构', 'C. 环节动物没有任何排泄系统', 'D. 节肢动物通过鳃排泄'], ans: 'B', exp: '节肢动物常见马氏管等结构用于离子调节与排泄，环节动物则有肾管。' },
    { id: 21, category: '比较', q: '扁形动物与环节动物相比，扁形动物通常缺乏：', options: ['A. 完整的消化道（口肛分开）', 'B. 三胚层', 'C. 身体的左右对称', 'D. 移动能力'], ans: 'A', exp: '许多扁形动物没有完整的直通消化道，通常口只有一个开口。' },
    { id: 22, category: '刚毛', q: '在土壤生态位中，寡毛纲（如蚯蚓）刚毛的主要功能是：', options: ['A. 游泳推进', 'B. 附着于宿主体内壁', 'C. 协助爬行与抓地', 'D. 过滤食物颗粒'], ans: 'C', exp: '寡毛纲刚毛较少但用于抓地与推进土壤中爬行。' },
    { id: 23, category: '分节', q: '哪种陈述最能说明分节对局部损伤的适应价值？', options: ['A. 分节使个体更易一次性丧失全部器官', 'B. 分节允许局部组织受损时其它节保持功能', 'C. 分节阻碍再生', 'D. 分节与再生无关'], ans: 'B', exp: '分节化使得局部损伤不会必然影响整体现象，有利于再生与功能保留。' },
    { id: 24, category: '生殖', q: '蛭类（Hirudinea）在刚毛与生殖策略上通常的特点是：', options: ['A. 刚毛发达且为游泳结构', 'B. 刚毛退化且常有特殊繁殖适应（如囊/涂层）', 'C. 完全无性繁殖', 'D. 与多毛类相同的幼体阶段'], ans: 'B', exp: '蛭类多数刚毛退化，并有寄生或吸血相关的特殊生殖/生命周期适应。' },
  ], []);

  // shuffle questions on initial render
  const [questions] = useState(() => shuffle(baseQuestions));
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});

  const handleAnswer = (id, choice) => {
    setAnswers((s) => ({ ...s, [id]: choice }));
    setRevealed((r) => ({ ...r, [id]: true }));
  };

  const total = questions.length;
  const correctCount = questions.reduce((acc, q) => acc + (answers[q.id] === q.ans ? 1 : 0), 0);

  // stats by category
  const categories = Array.from(new Set(questions.map((q) => q.category)));
  const stats = categories.map((cat) => {
    const items = questions.filter((q) => q.category === cat);
    const attempted = items.filter((q) => answers[q.id]).length;
    const correct = items.filter((q) => answers[q.id] === q.ans).length;
    const pct = attempted === 0 ? 0 : Math.round((correct / attempted) * 100);
    return { category: cat, total: items.length, attempted, correct, pct };
  });

  const reset = () => {
    setAnswers({});
    setRevealed({});
    window.location.reload(); // simplest way to reshuffle
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-6">
        <header className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-extrabold">环节动物混合选择题（24 题）</h1>
            <p className="text-sm text-slate-600 mt-1">混合型难度 · 每题答完即显解析 · 随机题序 · 自动掌握率统计</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-500">已作答：{Object.keys(answers).length} / {total}</div>
            <div className="text-lg font-semibold mt-2">当前得分：{correctCount} / {total}</div>
          </div>
        </header>

        <main className="space-y-4">
          {questions.map((q, idx) => (
            <article key={q.id} className="bg-slate-50 p-4 rounded-xl shadow-inner border">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full font-semibold shadow">{idx + 1}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm text-slate-500">知识点：{q.category}</div>
                      <h2 className="font-medium mt-1">{q.q}</h2>
                    </div>
                    <div className="text-xs text-slate-400">题号：{q.id}</div>
                  </div>

                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                    {q.options.map((opt) => {
                      const choice = opt.charAt(0);
                      const selected = answers[q.id] === choice;
                      const isCorrect = q.ans === choice;
                      const show = revealed[q.id];
                      const bgClass = show ? (isCorrect ? 'bg-green-50 border-green-300' : (selected ? 'bg-red-50 border-red-300' : 'bg-slate-50 border-slate-200')) : 'bg-white border-slate-200';

                      return (
                        <button
                          key={opt}
                          onClick={() => handleAnswer(q.id, choice)}
                          className={`text-left border p-3 rounded-lg ${bgClass} hover:scale-[1.01] transition`}
                        >
                          <div className="font-medium">{opt}</div>
                        </button>
                      );
                    })}
                  </div>

                  {revealed[q.id] && (
                    <div className="mt-3 p-3 rounded-md bg-white border">
                      <div className={`text-sm font-semibold ${answers[q.id] === q.ans ? 'text-green-700' : 'text-red-700'}`}>
                        {answers[q.id] === q.ans ? '回答正确' : `回答错误（你的答案：${answers[q.id] || '未选'} — 正确：${q.ans}）`}
                      </div>
                      <div className="mt-2 text-sm text-slate-700 whitespace-pre-wrap">解析：{q.exp}</div>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </main>

        <section className="mt-6 bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">统计与掌握率</h3>
            <div className="text-sm text-slate-500">得分：{correctCount} / {total} （{Math.round((correctCount / total) * 100)}%）</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-slate-500 mb-2">按知识点掌握率（仅统计已作答题目）</div>
              <div className="space-y-3">
                {stats.map((s) => (
                  <div key={s.category}>
                    <div className="flex justify-between text-xs text-slate-600 mb-1">
                      <div>{s.category} · 已答 {s.attempted}/{s.total} · 正确 {s.correct}</div>
                      <div>{s.pct}%</div>
                    </div>
                    <div className="w-full bg-slate-100 h-3 rounded overflow-hidden">
                      <div style={{ width: `${s.pct}%` }} className="h-3 rounded bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs text-slate-500 mb-2">题目分布（题数）</div>
              <ul className="text-sm space-y-1">
                {stats.map((s) => (
                  <li key={s.category}>{s.category}: {s.total} 题</li>
                ))}
              </ul>

              <div className="mt-4">
                <button onClick={reset} className="px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">重置并随机化题序</button>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-6 text-xs text-slate-500 border-t pt-3">
          <div className="mb-2">Vercel 部署简要步骤：</div>
          <ol className="list-decimal list-inside text-xs">
            <li>用 Create React App 或 Next.js 新建项目，把此文件保存为 <code>src/App.jsx</code> 或 <code>pages/index.jsx</code>。</li>
            <li>本地测试：<code>npm run start</code> 或 <code>npm run dev</code>（Next）。确认无误后 <code>git add .</code>，<code>git commit</code> 并推送到 GitHub。</li>
            <li>在 <strong>vercel.com</strong> 新建项目并从 GitHub 导入仓库，Vercel 会自动检测并部署。</li>
            <li>若使用 CRA，构建配置为 <code>npm run build</code>，输出目录 <code>build</code>。</li>
          </ol>
        </footer>
      </div>
    </div>
  );
}
