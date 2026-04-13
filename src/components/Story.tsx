import { motion } from "motion/react";

const STORY_TEXT = [
  {
    title: "雲の中の仕事",
    content: "標高1,046メートル。天山の山中は、雨だった。\n4月の佐賀。平地では春の気配があっても、山の上はまだ冬と春のあいだで揺れている。雲が低く垂れ込め、というより、自分がすでに雲の中にいる。視界は白く塗りつぶされ、10メートル先の林道が滲んで見える。",
    image: "https://picsum.photos/seed/foggy-mountain/1200/800"
  },
  {
    content: "ふと、自分の判断が頭をよぎる。なぜ今日この機材を選んだのか。雨が降ることはわかっていた。山の中だということも。\n一眼レフカメラは接続部が多い。水が入れば一発でショートする。ポンチョで凌げる保証はない。悔やんでも、もう遅い。",
    image: "https://picsum.photos/seed/camera-rain/1200/800"
  },
  {
    content: "三脚を立て、ビデオカメラをセットし、置きカメラをさらに2台配置した。そしてカメラの上からポンチョを被せた。自分と同じように。人間も機材も、同じ格好で雨の中に立っている。それがこの現場の正直な姿だった。\nここにあるのはこの機材だ。天候を考えたら完全な判断ミス。それが悔しいというより、妙におかしかった。",
    image: "https://picsum.photos/seed/tripod-mist/1200/800"
  },
  {
    content: "突然、風が来る。暴風、と言っていいほどの勢いで、山の上から吹き下ろしてくる。ポンチョが激しくはためき、レンズに水滴が走る。構えていたカメラを思わず胸に抱える。10秒か、20秒か。それが、止む。\n嘘のように、止む。雨も、風も、いっせいに引いていく。雲の中がしんと静まり返る。雨粒の音が消えると、自分の呼吸が聞こえる。林道の水たまりに、波紋が広がるのが見える。",
    image: "https://picsum.photos/seed/mountain-wind/1200/800"
  },
  {
    content: "そしてまた、来る。「刻一刻と変わる」という言葉が頭に浮かんだが、それは違う気がした。刻一刻というのは、連続した変化だ。しかしここで起きていることは、もっと不連続だった。静と動が、予告なく切り替わる。間隔に法則はなく、強さにも規則性がない。山が何か別のリズムで呼吸しているような、あるいは雲が生き物のように気まぐれに動いているような——そういう感覚だった。",
    image: "https://picsum.photos/seed/forest-road/1200/800"
  },
  {
    content: "その中で、1号車を待つ。SS1のメディアポイントにはAとBがある。Aは多くのカメラマンが集まる。確率を取るなら、Aだ。今回、私はBを選んだ。同じ場所に同じ人数が集れば、仕上がりは似てくる。それは取材ではなく、消費だと思っている。確率を下げても、組み合わせで自分だけの画を狙う。それがこの仕事の、少なくとも私なりのやり方だ。雨でも、雲の中でも、その判断だけは変えない。",
    image: "https://picsum.photos/seed/rally-car/1200/800"
  },
  {
    content: "ただ、Bを選ぶ代償もある。ラリーは1号車から始まる。最初に来る一台が、最速のスピードでその日の撮影の基準になる。露出の感覚、距離感、マシンの速度とフレームの関係——それらを1号車で掴んでおかなければ、以降が安定しない。リバースオーダーの競技なら、遅い車から速い車へと順番に来るから、目と体を慣らす時間がある。だがここでは逆だ。最初の一台が、いきなり最速だ。一発目からそれを受け止めなければならない。",
    image: "https://picsum.photos/seed/speed-blur/1200/800"
  },
  {
    content: "雲の中で正確に物を指し示すことと、似ている。目標は見えているはずだ。位置もわかっているはずだ。しかし雲が邪魔をして、手が届かない。経験と勘と、それでも届かないかもしれないという覚悟を持って、それでも指を伸ばすしかない。様々な思いが頭をよぎる。露出は合っているか。風が来たらブレるか。音が聞こえてからでは遅いか。いつも通り、いつも通り‥",
    image: "https://picsum.photos/seed/focused-photographer/1200/800"
  },
  {
    content: "メインのクラスは全台来た。雲の中から音が届き、光が滲み、マシンが現れ、消えた。それを数回繰り返したが、間が空いた。どこかで競技車両が道を塞ぎ、赤旗が出た。三脚に固定したカメラが、赤旗スルーで通過する車両を記録していた。私はその横に立って、今日の取れ高を計算していた。\n雲の中で、雨の中で、ポンチョを被せたカメラと一緒に。悪くない、とは言えない。でも、次がある。\n私は機材を片付けた。次のステージに向かった。",
    image: "https://picsum.photos/seed/mountain-peak/1200/800"
  }
];

export function Story() {
  return (
    <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 space-y-32">
      {STORY_TEXT.map((section, index) => (
        <motion.section
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-8"
        >
          {section.title && (
            <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tighter text-white/90 mb-12">
              {section.title}
            </h1>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className={index % 2 === 0 ? "order-1" : "order-1 md:order-2"}>
              <p className="text-lg md:text-xl leading-relaxed text-white/70 font-serif whitespace-pre-wrap">
                {section.content}
              </p>
            </div>
            <div className={index % 2 === 0 ? "order-2" : "order-2 md:order-1"}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 group">
                <img
                  src={section.image}
                  alt="Story visual"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-transparent to-transparent opacity-60" />
              </div>
            </div>
          </div>
        </motion.section>
      ))}
      
      <footer className="pt-24 pb-12 text-center">
        <p className="text-white/30 font-mono text-sm tracking-widest uppercase">
          End of Chapter
        </p>
      </footer>
    </div>
  );
}
