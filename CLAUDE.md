# CLAUDE.md

このファイルは、このリポジトリで作業する際のClaude Code (claude.ai/code)への指針を提供します。

## プロジェクト概要

DigitalSignager.JP (https://digitalsignager.jp) は、さかどん氏による自作スピーカー、電子工作、デジタルサイネージに関する部品や商品をまとめたサイトです。GitHubリポジトリからVercel経由でデプロイされています。

### 特徴
- 日本製スピーカーユニットを中心に、統一的かつ網羅的なデータを掲載
- 現在はバックロードホーン向けユニットを中心に構成
- 将来的にバスレフ、密閉型、ダブルバスレフ、TQWT型など、他のエンクロージャー向けユニット一覧ページの追加も可能

## 開発コマンド

```bash
# 開発サーバーを起動
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバーを起動
npm start

# 静的サイトをエクスポート
npm run export
```

## アーキテクチャ

### 技術スタック
- **フレームワーク**: Next.js 15.0.2 (React)
- **スタイリング**: Tailwind CSS 3.4.13 + Styled JSX (SASS対応)
- **国際化**: next-translate-plugin
- **アナリティクス**: Vercel Analytics + Hotjar

### プロジェクト構造
```
/pages/              # Next.jsルート (speakers/, speakers/[category].js)
/components/         # Reactコンポーネント (Layout, SpeakerList, SpeakerModal等)
/public/speakers.json # メインスピーカーデータベース
/locales/           # 翻訳ファイル (en/, ja/)
/assets/            # グローバルCSSファイル
```

### データフローの要点
1. スピーカーデータは `/public/speakers.json` に格納
2. `/pages/speakers/` 内のページがこのデータを取得・フィルタリング
3. `SpeakerList` や `SpeakerModal` などのコンポーネントがデータを表示
4. ユーザーの選択に基づいて `/locales/[lang]/` から翻訳を読み込み

## 重要なパターン

### 新しいスピーカーの追加
1. `/public/speakers.json` を以下の情報で更新:
   - 基本情報 (model, maker, release_date, price)
   - 電気的・機械的パラメータ
   - 画像パス (main_image, sub_image, frequency_response, outline)
   - ローカライズテキスト (speaker_text_en, speaker_text_ja)
   - categories配列

### 新しいルートの作成
`/pages/speakers/` 内のページは静的生成を使用:
```javascript
export async function getStaticProps() {
  const data = await import("../../public/speakers.json");
  // データをフィルタリング/処理
  return { props: { speakers: filteredData } };
}
```

### コンポーネントの規約
- スタイリングにはTailwindクラスを使用
- `useTranslation()` フックで英語・日本語両対応
- 画像のフォールバックは `/images/noimage.jpg`
- レスポンシブグリッドレイアウト (grid-cols-1 sm:grid-cols-2 lg:grid-cols-3)

### 状態管理
- ローカル状態にはReactフック (useState, useEffect) を使用
- モーダル状態は親コンポーネントで管理
- ソート・フィルターロジックはページコンポーネントに実装

## 設定ファイル
- `next.config.js`: SASSサポート、末尾スラッシュ、i18n統合
- `i18n.js`: 言語設定 (en/ja、デフォルト: en)
- `tailwind.config.js`: pages/とcomponents/ディレクトリをスキャン

## スピーカーデータの統一構造

`/public/speakers.json`のデータは以下の統一構造に従います。値が不明な場合は空文字列('')で表現されます：

```javascript
{
  id: string,                    // 一意識別子
  brand: string,                 // ブランド名
  name: string,                  // モデル名
  model: string,                 // モデル番号
  limited: boolean,              // 限定品フラグ
  price: number,                 // 価格（円）
  release: string,               // リリース日（YYYY-MM形式）
  category: string[],            // カテゴリータグの配列
  image: {
    main: string,                // メイン画像パス
    sub: string,                 // サブ画像パス
    frequency: string,           // 周波数特性画像パス
    outline: string              // 外形図画像パス
  },
  ja/en: {                       // 日本語/英語テキスト
    frameText: string,
    categoryText: string,
    priceText: string,
    releaseText: string,
    recommendedEnclosureList: string[]
  },
  electricalParameters: {        // 電気的パラメータ（単位付き）
    nominalImpedance: { value: string|number, unit: 'ohm' },
    Re: { value: string|number, unit: 'ohm' },
    Le: { value: string|number, unit: 'mH' },
    fs: { value: string|number, unit: 'Hz' }
  },
  mechanicalParameters: {        // 機械的パラメータ（単位付き）
    Mms: { value: string|number, unit: 'g' },
    Cms: { value: string|number, unit: 'mm/N' },
    Rms: { value: string|number, unit: 'kg/s' },
    Bl: { value: string|number, unit: 'T-m' },
    Sd: { value: string|number, unit: 'cm²' },
    Xmax: { value: string|number, unit: 'mm' }
  },
  lossFactor: {                  // 損失係数（単位付き）
    Qms: { value: string|number, unit: '-' },
    Qes: { value: string|number, unit: '-' },
    Qts: { value: string|number, unit: '-' }
  },
  otherParameters: {             // その他のパラメータ
    SPL: { value: string|number, unit: 'dB' },
    equivalentDiaphragmRadius: { value: string|number, unit: 'cm' },
    ratedInput: { value: string|number, unit: 'W' },
    maxInput: { value: string|number, unit: 'W' },
    overallDiameter: { value: string|number, unit: 'mm' },
    voiceCoilDiameter: { value: string|number, unit: 'mm' },
    reproductionFrequencyResponse: { value: string, unit: 'Hz' },
    Vas: { value: string|number, unit: 'l' },
    baffleHoleDiameter: { value: string|number, unit: 'mm' },
    mountingHoles: { value: string|number, unit: 'holes' },
    unitDepth: { value: string|number, unit: 'mm' },
    netWeight: { value: string|number, unit: 'g' },
    recommendedEnclosure: string
  },
  links: {                       // リンク情報
    manufacturer: string,
    koizumi: string,
    amazon: string,
    rakuten: string,
    yodobashi: string,
    eleshop: string
  }
}
```

### データ正規化スクリプト
`/scripts/normalize-speakers-data.js`でデータを統一構造に正規化できます。