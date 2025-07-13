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