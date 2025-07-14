const fs = require('fs');
const path = require('path');

// 統一的なデータ構造のテンプレート
const speakerTemplate = {
  id: '',
  brand: '',
  name: '',
  model: '',
  limited: false,
  price: 0,
  release: '',
  category: [],
  image: {
    main: '',
    sub: '',
    frequency: '',
    outline: ''
  },
  ja: {
    frameText: '',
    categoryText: '',
    priceText: '',
    releaseText: '',
    recommendedEnclosureList: []
  },
  en: {
    frameText: '',
    categoryText: '',
    priceText: '',
    releaseText: '',
    recommendedEnclosureList: []
  },
  electricalParameters: {
    nominalImpedance: { value: '', unit: 'ohm' },
    Re: { value: '', unit: 'ohm' },
    Le: { value: '', unit: 'mH' },
    fs: { value: '', unit: 'Hz' }
  },
  mechanicalParameters: {
    Mms: { value: '', unit: 'g' },
    Cms: { value: '', unit: 'mm/N' },
    Rms: { value: '', unit: 'kg/s' },
    Bl: { value: '', unit: 'T-m' },
    Sd: { value: '', unit: 'cm²' },
    Xmax: { value: '', unit: 'mm' }
  },
  lossFactor: {
    Qms: { value: '', unit: '-' },
    Qes: { value: '', unit: '-' },
    Qts: { value: '', unit: '-' }
  },
  otherParameters: {
    SPL: { value: '', unit: 'dB' },
    equivalentDiaphragmRadius: { value: '', unit: 'cm' },
    ratedInput: { value: '', unit: 'W' },
    maxInput: { value: '', unit: 'W' },
    overallDiameter: { value: '', unit: 'mm' },
    voiceCoilDiameter: { value: '', unit: 'mm' },
    reproductionFrequencyResponse: { value: '', unit: 'Hz' },
    Vas: { value: '', unit: 'l' },
    baffleHoleDiameter: { value: '', unit: 'mm' },
    mountingHoles: { value: '', unit: 'holes' },
    unitDepth: { value: '', unit: 'mm' },
    netWeight: { value: '', unit: 'g' },
    recommendedEnclosure: ''
  },
  links: {
    manufacturer: '',
    koizumi: '',
    amazon: '',
    rakuten: '',
    yodobashi: '',
    eleshop: ''
  }
};

// データの正規化関数
function normalizeData(speaker) {
  const normalized = JSON.parse(JSON.stringify(speakerTemplate));
  
  // 基本情報をコピー
  normalized.id = speaker.id || '';
  normalized.brand = speaker.brand || '';
  normalized.name = speaker.name || '';
  normalized.model = speaker.model || '';
  normalized.limited = speaker.limited !== undefined ? speaker.limited : false;
  normalized.price = speaker.price || 0;
  normalized.release = speaker.release || '';
  normalized.category = speaker.category || [];
  
  // 画像情報をコピー
  if (speaker.image) {
    normalized.image.main = speaker.image.main || '';
    normalized.image.sub = speaker.image.sub || '';
    normalized.image.frequency = speaker.image.frequency || '';
    normalized.image.outline = speaker.image.outline || '';
  }
  
  // 日本語テキストをコピー
  if (speaker.ja) {
    normalized.ja.frameText = speaker.ja.frameText || '';
    normalized.ja.categoryText = speaker.ja.categoryText || '';
    normalized.ja.priceText = speaker.ja.priceText || '';
    normalized.ja.releaseText = speaker.ja.releaseText || '';
    normalized.ja.recommendedEnclosureList = speaker.ja.recommendedEnclosureList || [];
  }
  
  // 英語テキストをコピー
  if (speaker.en) {
    normalized.en.frameText = speaker.en.frameText || '';
    normalized.en.categoryText = speaker.en.categoryText || '';
    normalized.en.priceText = speaker.en.priceText || '';
    normalized.en.releaseText = speaker.en.releaseText || '';
    normalized.en.recommendedEnclosureList = speaker.en.recommendedEnclosureList || [];
  }
  
  // 電気的パラメータをコピー
  if (speaker.electricalParameters) {
    const ep = speaker.electricalParameters;
    if (ep.nominalImpedance) normalized.electricalParameters.nominalImpedance.value = ep.nominalImpedance.value || '';
    if (ep.Re) normalized.electricalParameters.Re.value = ep.Re.value || '';
    if (ep.Le) normalized.electricalParameters.Le.value = ep.Le.value || '';
    if (ep.fs) normalized.electricalParameters.fs.value = ep.fs.value || '';
  }
  
  // 機械的パラメータをコピー
  if (speaker.mechanicalParameters) {
    const mp = speaker.mechanicalParameters;
    if (mp.Mms) normalized.mechanicalParameters.Mms.value = mp.Mms.value || '';
    if (mp.Cms) normalized.mechanicalParameters.Cms.value = mp.Cms.value || '';
    if (mp.Rms) normalized.mechanicalParameters.Rms.value = mp.Rms.value || '';
    if (mp.Bl) normalized.mechanicalParameters.Bl.value = mp.Bl.value || '';
    if (mp.Sd) normalized.mechanicalParameters.Sd.value = mp.Sd.value || '';
    if (mp.Xmax) normalized.mechanicalParameters.Xmax.value = mp.Xmax.value || '';
  }
  
  // 損失係数をコピー
  if (speaker.lossFactor) {
    const lf = speaker.lossFactor;
    if (lf.Qms) normalized.lossFactor.Qms.value = lf.Qms.value || '';
    if (lf.Qes) normalized.lossFactor.Qes.value = lf.Qes.value || '';
    if (lf.Qts) normalized.lossFactor.Qts.value = lf.Qts.value || '';
  }
  
  // その他のパラメータをコピー
  if (speaker.otherParameters) {
    const op = speaker.otherParameters;
    if (op.SPL) normalized.otherParameters.SPL.value = op.SPL.value || '';
    if (op.equivalentDiaphragmRadius) normalized.otherParameters.equivalentDiaphragmRadius.value = op.equivalentDiaphragmRadius.value || '';
    if (op.ratedInput) normalized.otherParameters.ratedInput.value = op.ratedInput.value || '';
    if (op.maxInput) normalized.otherParameters.maxInput.value = op.maxInput.value || '';
    if (op.overallDiameter) normalized.otherParameters.overallDiameter.value = op.overallDiameter.value || '';
    if (op.voiceCoilDiameter) normalized.otherParameters.voiceCoilDiameter.value = op.voiceCoilDiameter.value || '';
    if (op.reproductionFrequencyResponse) normalized.otherParameters.reproductionFrequencyResponse.value = op.reproductionFrequencyResponse.value || '';
    if (op.Vas) normalized.otherParameters.Vas.value = op.Vas.value || '';
    if (op.baffleHoleDiameter) normalized.otherParameters.baffleHoleDiameter.value = op.baffleHoleDiameter.value || '';
    if (op.mountingHoles) normalized.otherParameters.mountingHoles.value = op.mountingHoles.value || '';
    if (op.unitDepth) normalized.otherParameters.unitDepth.value = op.unitDepth.value || '';
    if (op.netWeight) normalized.otherParameters.netWeight.value = op.netWeight.value || '';
    normalized.otherParameters.recommendedEnclosure = op.recommendedEnclosure || '';
  }
  
  // リンク情報をコピー
  if (speaker.links) {
    normalized.links.manufacturer = speaker.links.manufacturer || '';
    normalized.links.koizumi = speaker.links.koizumi || '';
    normalized.links.amazon = speaker.links.amazon || '';
    normalized.links.rakuten = speaker.links.rakuten || '';
    normalized.links.yodobashi = speaker.links.yodobashi || '';
    normalized.links.eleshop = speaker.links.eleshop || '';
  }
  
  // ルートレベルのrecommendedEnclosureListを処理
  if (speaker.recommendedEnclosureList && !normalized.ja.recommendedEnclosureList.length) {
    normalized.ja.recommendedEnclosureList = speaker.recommendedEnclosureList;
  }
  
  return normalized;
}

// メイン処理
function main() {
  const filePath = path.join(__dirname, '..', 'public', 'speakers.json');
  const backupPath = path.join(__dirname, '..', 'public', 'speakers.backup.json');
  
  // バックアップを作成
  const originalData = fs.readFileSync(filePath, 'utf8');
  fs.writeFileSync(backupPath, originalData);
  console.log('バックアップを作成しました: speakers.backup.json');
  
  // データを読み込む
  const speakers = JSON.parse(originalData);
  console.log(`${speakers.length}個のスピーカーデータを処理します...`);
  
  // 各スピーカーを正規化
  const normalizedSpeakers = speakers.map((speaker, index) => {
    console.log(`処理中: ${index + 1}/${speakers.length} - ${speaker.model}`);
    return normalizeData(speaker);
  });
  
  // 正規化したデータを保存
  fs.writeFileSync(filePath, JSON.stringify(normalizedSpeakers, null, 2));
  console.log('データの正規化が完了しました！');
  
  // 統計情報を出力
  const stats = {
    total: normalizedSpeakers.length,
    hasAllImages: normalizedSpeakers.filter(s => s.image.main && s.image.sub && s.image.frequency && s.image.outline).length,
    hasAllElectricalParams: normalizedSpeakers.filter(s => 
      s.electricalParameters.nominalImpedance.value && 
      s.electricalParameters.Re.value && 
      s.electricalParameters.Le.value && 
      s.electricalParameters.fs.value
    ).length,
    hasAllMechanicalParams: normalizedSpeakers.filter(s => 
      s.mechanicalParameters.Mms.value && 
      s.mechanicalParameters.Cms.value && 
      s.mechanicalParameters.Bl.value
    ).length
  };
  
  console.log('\n統計情報:');
  console.log(`総スピーカー数: ${stats.total}`);
  console.log(`全画像あり: ${stats.hasAllImages} (${(stats.hasAllImages/stats.total*100).toFixed(1)}%)`);
  console.log(`全電気的パラメータあり: ${stats.hasAllElectricalParams} (${(stats.hasAllElectricalParams/stats.total*100).toFixed(1)}%)`);
  console.log(`全機械的パラメータあり: ${stats.hasAllMechanicalParams} (${(stats.hasAllMechanicalParams/stats.total*100).toFixed(1)}%)`);
}

// スクリプトを実行
main();