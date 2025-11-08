import React, { useEffect, useMemo, useState } from "react";

/**
 * src/App.jsx
 * 环节动物测试 — 顺序答题（24 题） — 蓝紫霓虹未来风
 * 说明：
 * - 直接复制到 Create React App 的 src/App.jsx
 * - 无需 Tailwind（样式内置在组件里）
 * - 部署到 Vercel：push to GitHub -> vercel.com import -> deploy
 */

function shuffle(array) {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function App() {
  useEffect(() => {
    document.title = "环节动物测试";
  }, []);

  const baseQuestions = useMemo(
    () => [
      { id: 1, category: "分节", q: "下列关于“同律分节”的描述哪项最准确？", options: ["A. 各体节形态和功能基本相似", "B. 各体节高度分化为不同器官", "C. 只存在于节肢动物", "D. 指的是胚胎期分节"], ans: "A", exp: "同律分节指体节间在外形与功能上高度重复，这在许多环节动物中可见。" },
      { id: 2, category: "体腔", q: "环节动物的体腔通常称为什么？", options: ["A. 假体腔", "B. 真体腔", "C. 无体腔", "D. 衬膜腔"], ans: "B", exp: "环节动物具有由中胚层衍生并被膜包覆的真体腔。" },
      { id: 3, category: "循环", q: "蚯蚓的循环系统特点是：", options: ["A. 开放式循环", "B. 闭合式循环", "C. 没有血液", "D. 仅靠体腔液循环"], ans: "B", exp: "蚯蚓等环节动物具有血液在血管中流动的闭合式循环。" },
      { id: 4, category: "排泄", q: "环节动物节段化的排泄器官通常表现为：", options: ["A. 每节一对肾管", "B. 排泄孔随机分布", "C. 只有头节有排泄器官", "D. 通过鳃进行排泄"], ans: "A", exp: "环节动物排泄系统通常节段性，每节可有成对肾管或过滤结构。" },
      { id: 5, category: "刚毛", q: "下列哪项关于刚毛（setae）的描述是错误的？", options: ["A. 刚毛可作为附着或推进工具", "B. 多毛类刚毛通常发达", "C. 刚毛为皮肤的角质层衍生物", "D. 蛭类通常刚毛退化或缺失"], ans: "C", exp: "刚毛为体壁特化的表皮结构，不是角质层衍生物。" },
      { id: 6, category: "神经", q: "环节动物的主神经索位于体壁的哪一侧？", options: ["A. 背侧", "B. 腹侧", "C. 侧面", "D. 环形分布"], ans: "B", exp: "环节动物典型具有腹神经链（腹侧主神经索）。" },
      { id: 7, category: "发育", q: "环节动物与节肢动物在早期胚胎发育中共有的特点是：", options: ["A. 放射对称", "B. 螺旋卵裂", "C. 无体腔形成", "D. 口胚与无胚同时形成"], ans: "B", exp: "许多原口动物（包括环节动物和节肢动物）表现为螺旋卵裂。" },
      { id: 8, category: "比较", q: "下列哪项是环节动物相对于昆虫的典型区别？", options: ["A. 昆虫具有真体腔而环节动物无", "B. 环节动物体节在外形上可重复", "C. 昆虫的血液完全在血管中流动", "D. 环节动物属于后口动物"], ans: "B", exp: "环节动物体节在许多种类中相对一致重复，是显著特征。" },

      { id: 9, category: "生殖", q: "蚯蚓的生殖方式通常为：", options: ["A. 雌雄同体互交", "B. 单性生殖（孤雌生殖）", "C. 无性出芽", "D. 体外孵化的带游泳幼体"], ans: "A", exp: "蚯蚓为雌雄同体，但一般通过互相接触交换精子进行有性生殖。" },
      { id: 10, category: "分节", q: "若某动物体节高度分化（头胸腹明显不同），该现象称为：", options: ["A. 同律分节", "B. 异律分节", "C. 无节化", "D. 假节化"], ans: "B", exp: "异律分节指体节在形态与功能上发生分区分化。" },
      { id: 11, category: "体腔", q: "假体腔动物的一个典型代表是：", options: ["A. 线虫", "B. 环节动物", "C. 软体动物", "D. 扁形动物"], ans: "A", exp: "线虫属于假体腔动物（pseudocoelomate）。" },
      { id: 12, category: "循环", q: "下面哪个特征最能支持“闭合式循环”比“开放式循环”运输效率高？", options: ["A. 血液与体腔液混合", "B. 血液被血管限制，能维持较高压力", "C. 血液直接淋浴组织", "D. 没有血细胞"], ans: "B", exp: "血管限制导致可维持压力梯度，从而更高效运输物质。" },
      { id: 13, category: "排泄", q: "若用染料局部注入某一体节并观测染料由同一节的排泄孔排出，这支持了哪项结论？", options: ["A. 排泄系统非节段化", "B. 排泄系统节段化", "C. 染料可被肌肉吸收而不排出", "D. 染料不是水溶性的"], ans: "B", exp: "局部注入并从对应节段排出支持节段化排泄结构的存在。" },
      { id: 14, category: "刚毛", q: "在分类学测量中，下列哪组指标最适合用于依据刚毛区分类群？", options: ["A. 刚毛数目、平均长度、分布类型", "B. 仅刚毛颜色", "C. 体重、体温、刚毛硬度", "D. 栖息地深度与刚毛长度无关"], ans: "A", exp: "数目、长度与分布是可量化且有分类信息的指标。" },
      { id: 15, category: "神经", q: "环节动物神经系统中“链状节”最直接对应的结构是：", options: ["A. 背索", "B. 腹神经节与腹神经索", "C. 星形神经环", "D. 神经节只在头部存在"], ans: "B", exp: "环节动物有腹神经链，由分节的神经节和连合的神经索构成。" },
      { id: 16, category: "比较", q: "软体动物（如腹足类）与环节动物的一个显著差异是：", options: ["A. 软体动物普遍具有刚毛", "B. 环节动物通常无明显外壳", "C. 软体动物都属于原口动物", "D. 环节动物为放射对称动物"], ans: "B", exp: "许多软体动物具有外壳或贝壳；环节动物通常无外壳并表现细长节段化。" },

      { id: 17, category: "发育", q: "下列哪项是节肢动物与环节动物共同的进化特征线索？", options: ["A. 刚毛退化", "B. 节段化与重复的体节结构", "C. 背侧神经索", "D. 放射对称幼体"], ans: "B", exp: "体节化与重复器官是两者的共同特征，提示系统发育关系。" },
      { id: 18, category: "生殖", q: "多毛类（polychaetes）常见的生殖策略包括：", options: ["A. 直接发育，无游泳幼体", "B. 体外受精并产生带游泳能力的幼体", "C. 仅无性繁殖", "D. 在宿主体内发育"], ans: "B", exp: "许多多毛纲动物通过体外受精产生游泳幼体以扩大传播范围。" },
      { id: 19, category: "循环", q: "如果一动物的血液在大部分组织间游动而不受血管限制，则它更可能是：", options: ["A. 闭合式循环动物", "B. 开放式循环动物", "C. 无循环动物", "D. 真体腔动物"], ans: "B", exp: "开放式循环指血液/血淋巴不完全被血管约束，直接淋浴组织。" },
      { id: 20, category: "排泄", q: "比较环节动物与节肢动物的排泄系统，下列说法正确的是：", options: ["A. 两者都使用肾管完全相同的结构", "B. 节肢动物常有马氏管等特化排泄结构", "C. 环节动物没有任何排泄系统", "D. 节肢动物通过鳃排泄"], ans: "B", exp: "节肢动物常见马氏管等结构用于离子调节与排泄，环节动物则有肾管。" },
      { id: 21, category: "比较", q: "扁形动物与环节动物相比，扁形动物通常缺乏：", options: ["A. 完整的消化道（口肛分开）", "B. 三胚层", "C. 身体的左右对称", "D. 移动能力"], ans: "A", exp: "许多扁形动物没有完整的直通消化道，通常口只有一个开口。" },
      { id: 22, category: "刚毛", q: "在土壤生态位中，寡毛纲（如蚯蚓）刚毛的主要功能是：", options: ["A. 游泳推进", "B. 附着于宿主体内壁", "C. 协助爬行与抓地", "D. 过滤食物颗粒"], ans: "C", exp: "寡毛纲刚毛较少但用于抓地与推进土壤中爬行。" },
      { id: 23, category: "分节", q: "哪种陈述最能说明分节对局部损伤的适应价值？", options: ["A. 分节使个体更易一次性丧失全部器官", "B. 分节允许局部组织受损时其它节保持功能", "C. 分节阻碍再生", "D. 分节与再生无关"], ans: "B", exp: "分节化使得局部损伤不会必然影响整体现象，有利于再生与功能保留。" },
      { id: 24, category: "生殖", q: "蛭类（Hirudinea）在刚毛与生殖策略上通常的特点是：", options: ["A. 刚毛发达且为游泳结构", "B. 刚毛退化且常有特殊繁殖适应（如囊/涂层）", "C. 完全无性繁殖", "D. 与多毛类相同的幼体阶段"], ans: "B", exp: "蛭类多数刚毛退化，并有寄生或吸血相关的特殊生殖/生命周期适应。" }
    ],
    []
  );

  const [questions] = useState(() => shuffle(baseQuestions));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});
  const [finished, setFinished] = useState(false);

  const current = questions[currentIndex];

  const handleAnswer = (id, choice) => {
    if (revealed[id]) return;
    setAnswers((s) => ({ ...s, [id]: choice }));
    setRevealed((r) => ({ ...r, [id]: true }));
  };

  const next = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
      // scroll to top (optional)
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setFinished(true);
    }
  };

  const total = questions.length;
  const correctCount = questions.reduce((acc, q) => acc + (answers[q.id] === q.ans ? 1 : 0), 0);

  // 统计每个知识点掌握率（按已答题计）
  const categories = Array.from(new Set(questions.map((q) => q.category)));
  const stats = categories.map((cat) => {
    const items = questions.filter((q) => q.category === cat);
    const attempted = items.filter((q) => answers[q.id]).length;
    const correct = items.filter((q) => answers[q.id] === q.ans).length;
    const pct = attempted === 0 ? 0 : Math.round((correct / attempted) * 100);
    return { category: cat, total: items.length, attempted, correct, pct };
  });

  const restart = () => {
    window.location.reload();
  };

  // inline styles & neon gradients
  const styles = {
    page: {
      minHeight: "100vh",
      background:
        "radial-gradient(ellipse at 10% 10%, rgba(89, 55, 170,0.18), transparent 10%), radial-gradient(ellipse at 90% 90%, rgba(90, 120, 255,0.12), transparent 10%), linear-gradient(180deg,#0b0426 0%, #140a36 40%, #26104f 100%)",
      color: "#e6e9f2",
      padding: "32px 20px",
      fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    },
    card: {
      maxWidth: 920,
      margin: "0 auto",
      background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
      borderRadius: 16,
      boxShadow: "0 10px 30px rgba(8,6,20,0.6), inset 0 1px 0 rgba(255,255,255,0.02)",
      padding: 22,
      border: "1px solid rgba(255,255,255,0.04)",
    },
    neonTitle: {
      fontSize: 20,
      fontWeight: 800,
      letterSpacing: 0.6,
      color: "white",
      textShadow:
        "0 0 8px rgba(136, 77, 255, 0.9), 0 0 18px rgba(64, 155, 255, 0.45), 0 6px 30px rgba(0,0,0,0.6)",
    },
    subtitle: { color: "#aeb5db", fontSize: 13, marginTop: 6 },
    centerBox: { display: "flex", flexDirection: "column", alignItems: "center" },
    questionCard: {
      width: "100%",
      maxWidth: 780,
      background: "linear-gradient(180deg, rgba(10,8,30,0.5), rgba(14,9,40,0.6))",
      borderRadius: 12,
      padding: 20,
      marginTop: 14,
      border: "1px solid rgba(128, 90, 255, 0.12)",
    },
    questionText: {
      textAlign: "center",
      fontSize: 18,
      fontWeight: 600,
      marginBottom: 14,
      color: "#eaf0ff",
    },
    optionBtn: {
      display: "block",
      width: "100%",
      padding: "12px 14px",
      borderRadius: 10,
      border: "1px solid rgba(255,255,255,0.06)",
      background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
      color: "#eaf0ff",
      textAlign: "left",
      cursor: "pointer",
      fontWeight: 600,
      transition: "all 180ms ease",
      boxShadow: "0 4px 14px rgba(70,20,150,0.06)",
    },
    optionGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
    progressWrap: {
      height: 10,
      background: "rgba(255,255,255,0.04)",
      borderRadius: 999,
      overflow: "hidden",
      marginTop: 12,
    },
    progressInner: (pct) => ({
      height: "100%",
      width: `${pct}%`,
      transition: "width 450ms cubic-bezier(.2,.9,.2,1)",
      background: "linear-gradient(90deg,#7a42ff,#2be6ff,#7a42ff)",
      boxShadow: "0 6px 24px rgba(70,20,150,0.18)",
    }),
    neonSmall: { color: "#cbd6ff", fontSize: 12 },
    cardFooter: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 },
  };

  // render finished
  if (finished) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={styles.neonTitle}>环节动物测试</div>
              <div style={styles.subtitle}>完成测验 · 成绩总结</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, color: "#cbd6ff" }}>题目已完成</div>
              <div style={{ fontWeight: 700, marginTop: 6, fontSize: 18 }}>{correctCount} / {total} （{Math.round((correctCount / total) * 100)}%）</div>
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <div style={{ color: "#dfe7ff", fontWeight: 700, marginBottom: 10 }}>按知识点掌握率</div>
            <div style={{ display: "grid", gap: 12 }}>
              {stats.map((s) => (
                <div key={s.category} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#c9d4ff", fontSize: 13 }}>
                    <div>{s.category} · 已答 {s.attempted}/{s.total}</div>
                    <div>{s.pct}%</div>
                  </div>
                  <div style={{ width: "100%", height: 12, borderRadius: 8, background: "rgba(255,255,255,0.04)", overflow: "hidden" }}>
                    <div style={{
                      height: "100%",
                      width: `${s.pct}%`,
                      background: `linear-gradient(90deg, rgba(114, 41, 255, 1), rgba(2, 205, 255, 1))`,
                      boxShadow: "0 6px 18px rgba(60, 20, 140, 0.24)"
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: 12 }}>
            <button onClick={restart} style={{
              padding: "10px 16px",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              background: "linear-gradient(90deg,#5b2cff,#00d1ff)",
              color: "#0b0720",
              boxShadow: "0 10px 30px rgba(90,30,200,0.18)"
            }}>再测一次</button>
          </div>

          <div style={{ marginTop: 18, borderTop: "1px dashed rgba(255,255,255,0.04)", paddingTop: 12, color: "#aeb5db", fontSize: 12 }}>
            Vercel 部署说明：在项目根目录初始化 Git 仓库并推到 GitHub，登录 vercel.com -> Import Project -> 选择仓库 -> Deploy 即可。若使用 CRA，构建命令为 <code>npm run build</code>，输出目录为 <code>build</code>。
          </div>
        </div>
      </div>
    );
  }

  // current progress pct
  const progressPct = Math.round(((currentIndex) / total) * 100);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={styles.neonTitle}>环节动物测试</div>
            <div style={styles.subtitle}>蓝紫霓虹 · 顺序答题 · 逐题解析</div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, color: "#c9d4ff" }}>题目 {currentIndex + 1} / {total}</div>
            <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ fontSize: 13, color: "#e8eeff", fontWeight: 700 }}>{correctCount} 正确</div>
              <div style={{ width: 140 }}>
                <div style={styles.progressWrap}>
                  <div style={styles.progressInner(progressPct)} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ ...styles.centerBox }}>
          <div style={styles.questionCard}>
            <div style={styles.questionText}>{current.q}</div>

            <div style={styles.optionGrid}>
              {current.options.map((opt) => {
                const choice = opt.charAt(0);
                const selected = answers[current.id] === choice;
                const isCorrect = current.ans === choice;
                const show = revealed[current.id];

                // dynamic styles
                const base = { ...styles.optionBtn };
                if (!show) {
                  base.background = "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))";
                  base.border = "1px solid rgba(255,255,255,0.06)";
                } else {
                  if (isCorrect) {
                    base.background = "linear-gradient(90deg, rgba(120,60,255,0.18), rgba(20,210,255,0.12))";
                    base.border = "1px solid rgba(120,60,255,0.6)";
                    base.boxShadow = "0 6px 26px rgba(60,20,140,0.22)";
                    base.color = "#e8f9ff";
                  } else if (selected) {
                    base.background = "linear-gradient(90deg, rgba(255,90,110,0.12), rgba(255,60,90,0.06))";
                    base.border = "1px solid rgba(255,90,110,0.28)";
                    base.color = "#ffecec";
                    base.boxShadow = "0 6px 20px rgba(200,20,40,0.12)";
                  } else {
                    base.background = "linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.005))";
                  }
                }

                return (
                  <button
                    key={opt}
                    disabled={show}
                    onClick={() => handleAnswer(current.id, choice)}
                    style={base}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        minWidth: 36,
                        height: 36,
                        borderRadius: 8,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                        color: "#dfe7ff",
                        fontWeight: 800,
                        boxShadow: show && isCorrect ? "0 6px 18px rgba(50,180,255,0.12)" : "none"
                      }}>{choice}</div>
                      <div style={{ fontSize: 14 }}>{opt.slice(3)}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {revealed[current.id] && (
              <div style={{ marginTop: 16, padding: 14, borderRadius: 10, background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)))", border: "1px solid rgba(255,255,255,0.03)" }}>
                <div style={{ fontWeight: 700, color: answers[current.id] === current.ans ? "#7fffd4" : "#ffb3b3" }}>
                  {answers[current.id] === current.ans ? "回答正确 ✅" : `回答错误 ❌（正确：${current.ans}）`}
                </div>
                <div style={{ marginTop: 8, color: "#d4ddff", fontSize: 14 }}>{current.exp}</div>

                <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ color: "#aeb5db", fontSize: 13 }}>
                    当前得分：{correctCount} / {total}
                  </div>
                  <div>
                    <button onClick={next} style={{
                      padding: "10px 14px",
                      borderRadius: 10,
                      border: "none",
                      cursor: "pointer",
                      fontWeight: 800,
                      background: "linear-gradient(90deg,#8a4dff,#00e1ff)",
                      color: "#0b0720",
                      boxShadow: "0 10px 30px rgba(80,30,200,0.18)"
                    }}>
                      {currentIndex + 1 === questions.length ? "查看成绩" : "下一题 →"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={styles.cardFooter}>
          <div style={styles.neonSmall}>提示：答完一题后解析会出现，刷新页面可重新随机题序</div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={restart} style={{
              padding: "8px 12px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.04)",
              background: "transparent",
              color: "#c9d4ff",
              cursor: "pointer",
              fontWeight: 700
            }}>重置</button>
          </div>
        </div>
      </div>
    </div>
  );
}
