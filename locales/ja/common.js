export default {
  title: "DigitalSignager.JP",
  description: "さかどんの自作スピーカーや電子工作、デジタルサイネージに関する部品や商品をまとめたサイトです",

  menu: {
    home: "ホーム",
    bh_speaker_units_db: "BH向けスピーカーユニットたち",
    speaker_components_list: "スピーカーユニット データベース",
    grouped_by_baffle_hole_diameter: "バッフル径別にグループ化",
    grouped_by_categories: "カテゴリー毎にグループ化",
    for_backloadedhorn: "BH向けスピーカーユニット一覧",
  },

  speakers_dir: {
    title: "スピーカーユニット データベース",
    abst: "このサイトに登録されているスピーカーユニット全部表示します。",

    speakers_id_title: "スピーカーユニット詳細",

    grouped_by_baffle_hole_diameter: {
      title: "バッフル径別にグループ化した一覧",
      baffle_hole_diameter: "バッフル径",
      abst: "スピーカーユニットはメーカー横断的にバッフル口径(スピーカー穴)とネジ穴(Mounting Hole)が合えば、気軽に差し替えて遊ぶことができます。ということで、バッフル径とマウントホール別でグループ化してみました。お持ちのエンクロージャの同じバッフル径で、何が使えるか探すのに便利だと思うので、参考にしてみてください。ただしバックロードホーンの場合、バスレフ向けユニットを入れても思ったような音にならない事があるので注意してください。なお、誤差の範囲はプラスマイナス1mmにしていますが、概ね3mmぐらいなら行けるかもしれません(ネジ穴が合えば)。",
    },

    grouped_by_categories: {
      title: "カテゴリー毎にグループ化した一覧",
      abst: "独自に製品特徴をユニットごとに選定し、カテゴライズしました。概ね製品型番や素材、特性の特徴から勝手にピックアップしたものです。たまに乱丁落丁あるので、その時は教えて下さい。"
    },

    for_backloadedhorn: {
      title: "BH向けスピーカーユニット一覧",
      abst: "バックロードホーンエンクロージャ向けのスピーカーユニットを選定する基準として、基本的によく言われているのは磁気回路として強力なマグネット搭載し、Qts(Total Quality Factor、Q0とも表記される)値が低くオーバーダンピング傾向にあり、内部欠損が適切かつ剛性の高い素材(多くはペーパーやケナフ、ケブラーなど)を使った部品で構成され、結果として能率(Sound Pressure Level、SPL)が高いユニットが選ばれる傾向にあります。ここでは、そもそもメーカーからバックロードホーン向けとして設計されたスピーカーユニットの中から、Qts値が低い順に並べました。選定の参考にしてください。",
    }
  },

  breadcrumbs: {
    home: "ホーム",

    speakers: "スピーカー",
    grouped_by_baffle_hole_diameter: "バッフル開口径でグループ化",
    grouped_by_categories: "カテゴリーでグループ化",
    backloaded_horn_speakers: "バックロードホーンスピーカー",
    for_backloadedhorn: "BH向けスピーカーユニット一覧",

    categories: "カテゴリー",
    details: "詳細"
  }
};
