export default function SpeakerTextJa({ speaker, languageData }) {
  if (!speaker) return null;

  return (
    <div id="SpeakerText" data-component-name="SpeakerTextJa">
      <p className="mb-4 leading-7">
        このスピーカーユニットは
        {speaker.brand && (
          <>{speaker.brand}ブランドから</>
        )}
        {speaker.category.includes("FE") && (
          <>FEシリーズとして、</>
        )}

        {languageData.releaseText && (
          <>{languageData.releaseText}に</>
        )}
        {speaker.limited ? (
          <>限定販売モデル</>
        ) : (
          <>レギュラー販売モデル</>
        )}
        として
        {languageData.priceText && (
          <>{languageData.priceText}で</>
        )}
        発売された、
        {languageData.categoryText && (
          <>{languageData.categoryText}</>
        )}
        {speaker.name && (
          <>「{speaker.name}」</>
        )}
        です。主なスペックは、
        {speaker.electricalParameters?.nominalImpedance?.value && (
          <>インピーダンスは{speaker.electricalParameters.nominalImpedance.value}{speaker.electricalParameters.nominalImpedance.unit}、</>
        )}
        {speaker.otherParameters?.SPL?.value && (
          <>出力音圧レベル(能率)は{speaker.otherParameters.SPL.value}{speaker.otherParameters.SPL.unit}、</>
        )}
        {speaker.otherParameters?.ratedInput?.value && (
          <>耐入力は{speaker.otherParameters.ratedInput.value}{speaker.otherParameters.ratedInput.unit}</>
        )}
        {speaker.otherParameters?.maxInput?.value && (
          <>〜{speaker.otherParameters.maxInput.value}{speaker.otherParameters.maxInput.unit}が最大</>
        )}
        です。

        {speaker.category.includes("W VoiceCoil") && (
          <><br />※この製品はダブルボイスコイルを特徴としているので、特性表記に注意してください。</>
        )}
      </p>

      <p className="mb-4 leading-7">
        エンクロージャ設計の参考となる数値を挙げるとすると、まず
        {speaker.electricalParameters?.fs?.value && (
          <>最低共振周波数(fs、f0)は{speaker.electricalParameters.fs.value}{speaker.electricalParameters.fs.unit}、</>
        )}
        {speaker.otherParameters?.reproductionFrequencyResponse?.value && (
          <>再生周波数帯域は{speaker.otherParameters.reproductionFrequencyResponse.value}を確保しており、</>
        )}
        {speaker.category.includes("for BH") ? (
          <>バックロードホーン向けコンポーネントとして設計されたこの製品は、</>
        ) : (
          <>このコンポーネント製品は、</>
        )}
        {speaker.lossFactors?.Qts?.value && (
          <>Qts(Q0)が{speaker.lossFactors.Qts.value}という値</>
        )}
        {speaker.mechanicalParameters?.Mms?.value && (
          <>であり、Mms(m0)が{speaker.mechanicalParameters.Mms.value}{speaker.mechanicalParameters.Mms.unit}、</>
        )}
        {speaker.otherParameters?.Vas?.value && (
          <>Vasが{speaker.otherParameters.Vas.value}{speaker.otherParameters.Vas.unit}</>
        )}
        となっています。
        {speaker.otherParameters?.recommendedEnclosure?.value && (
          <>メーカー推奨のエンクロージャ方式は{speaker.otherParameters.recommendedEnclosure.value}です。</>
        )}
      </p>

      <p className="mb-4 leading-7">
        {languageData.frameText && (
          <>フレームは{languageData.frameText}製となっており、</>
        )}
        {speaker.otherParameters?.baffleHoleDiameter?.value && (
          <>必要なバッフル開口径はΦ{speaker.otherParameters.baffleHoleDiameter.value}{speaker.otherParameters.baffleHoleDiameter.unit}、</>
        )}
        {speaker.otherParameters?.mountingHoles?.value && (
          <>ネジ穴は{speaker.otherParameters.mountingHoles.value}穴あける必要があり、</>
        )}
        {speaker.otherParameters?.magnetWeight?.value && (
          <>マグネット質量は{speaker.otherParameters.magnetWeight.value}{speaker.otherParameters.magnetWeight.unit}背負っており、</>
        )}
        {speaker.otherParameters?.netWeight?.value && (
          <>総質量は{speaker.otherParameters.netWeight.value}{speaker.otherParameters.netWeight.unit}となります。</>
        )}
        {speaker.otherParameters?.overallDiameter?.value && (
          <>本体全体の直径は{speaker.otherParameters.overallDiameter.value}{speaker.otherParameters.overallDiameter.unit}、</>
        )}
        {speaker.otherParameters?.depth?.value && (
          <>奥行きが{speaker.otherParameters.depth.value}{speaker.otherParameters.depth.unit}あります。</>
        )}
      </p>

      <>
        {speaker.category.includes("WoodCorn") && (
          <p className="mb-4 leading-7">
            振動板にウッド（木材）コーンを採用しており、その特徴的な模様は自然由来のため製品それぞれで違った様子を見せてくれます。メーカーによって木材の厚みや使っている部位、方向や重ねる枚数などの違いがあり、そういったところで各社の特徴が出ています。詳しくは<a href="https://dream-creation.jp/blog/25" title="PARC Audio ウッドコーンについて">PARC Audio過去ブログの解説を参照してみてください。</a>
          </p>
        )}

        {speaker.category.includes("En") && (
          <p className="mb-4 leading-7">
            FOSTEX FE-Enシリーズはフォステクスの伝統的なフルレンジレギュラーユニットです。明るくクリアーなサウンドで、8cmから20cmまで豊富なラインナップが揃っています。振動板に採用された芭蕉の仲間に属する多年生植物を原料としたESコーンは繊維が細くしなやかで、繊維同士が良く絡み合い、繊維の断面形状が幅広で、アスペクト比が高いため、非常にロスの少ない振動板となり、情報量が飛躍的に増大しました。フェライトマグネットの強力磁気回路を採用して、バスレフ型からバックロード型まで万能なフルレンジユニット製品群です。
          </p>
        )}

        {speaker.category.includes("NV") && (
          <p className="mb-4 leading-7">
            FOSTEX FE-NVシリーズはフォステクスの伝統的なフルレンジレギュラーユニットです。明るくクリアーなサウンドで、NVになり響きに一層の透明感と爽快感が付与されました。8cmから20cmまで豊富なラインナップが揃っています。振動板に超叩解ケナフを主材料とする新規コーン紙が採用され、非木材パルプと副材に化学繊維と鉱石を混合することで伝搬速度の向上、高剛性化を達成しています。また全口径ハトメレスにすることで中音域の高調波歪を低減しています。外観も変化しました。
          </p>
        )}

        {speaker.category.includes("NV2") && (
          <p className="mb-4 leading-7">
            FOSTEX FE-NV2シリーズはフォステクスの伝統的なフルレンジレギュラーユニットです。明るく張りのある音色を維持しながらも立体的な音場表現を実現。低音再生には余裕感を持ち繊細で艶やかな中高音域の表現により充足感に満ちた音楽再生を可能にします。8cmから20cmまで豊富なラインナップが揃っています。振動板に超叩解ケナフを主材料とする新規コーン紙が採用され、非木材パルプと副材に化学繊維と鉱石を混合することで伝搬速度の向上、高剛性化を達成しています。また全口径ハトメレスにすることで中音域の高調波歪を低減しています。接着剤の変更などを行い前作NVシリーズより一層の環境対応を進めました。
          </p>
        )}

        {speaker.category.includes("Sol") && (
          <p className="mb-4 leading-7">
            FOSTEX FE-Solシリーズはフォステクスのバックロード用フルレンジスピーカーユニットです。Solでは繊維が細くしなやかで密度の高いESコーンを2層抄紙とする事で、軽量ながら更なる剛性の向上と、内部損失の確保を実現しました。2層抄紙とは振動板を2段階に抄紙する独自の技術で、基層に長繊維のパルプを主体にかさ高の構造による高剛性化と内部損失の保有を両立させ、表層には短繊維のパルプを配合し、振動板表面の伝播速度を高めています。これにより中域の明るく張りのある音色はそのままに、立ち上がりが良く切れのある高音と厚みのある低音の再生を可能にしました。
          </p>
        )}

        {speaker.category.includes("SS-HP") && (
          <p className="mb-4 leading-7">
            FOSTEX FE-SS-HPシリーズはフォステクスの音響の基礎に徹した開発理念と独自の技術を駆使して新たに開発された限定発売のフルレンジ・スピーカー・ユニットです。大型フェライト二枚重ねの強力低歪み外磁型磁気回路と独自開発のセルロース・ナノファイバ混在層を有するHP形状振動板により充実した低域とカラーレーションが少なく素直な中高域の音質を持ち、力強くも繊細で表現力豊かな音楽の再生を実現します。セルロース・ナノファイバ・コーティング HP形状振動板とは、基層の表面にセルロース・ナノファイバとマイカから成るコーティング層を形成して、ヤング率、比曲げ剛性、音速を向上しながら内部損失の低下は抑制される特徴を有しています。この処理を施したHP（Hyperbolic Paraboloid）形の振動板は、軽量にして剛性の確保と共振の分散を高度に実現しています。フルレンジらしい反応が早く切れの良い低域、充実した中低域、明るく張りが有る素直な中域、自然な響きの中高域、十分に伸びた高域によって音楽を楽しく聴くことが出来ます。
          </p>
        )}

        {speaker.category.includes("Σ-RE") && (
          <p className="mb-4 leading-7">
            FOSTEX FE-Σ-REシリーズはフォステクスの初代FE203Σ発売当時の要素技術と最新技術を融合して現代にリニューアル、FEシリーズのバックロードホーン専用モデルの原点を、現代の技術を投入してリニューアルしバックロードホーンの優れた特長を最大限引き出し存分にお楽しみいただける限定生産のスペシャルユニットです。2層抄紙超叩解NUKP振動板を採用しており、主材料にNUKP＝Nadelholz Unbleached Kraft Pulp(針葉樹未晒しパルプ)を採用し2層抄紙技術で製造しています。基層は長繊維パルプと短繊維パルプの配合比率を適正に調整した超叩解NUKPと、マニラ麻とミツマタの混合により適度な内部損失を保有しながら嵩高構造による剛性を両立しています。表層にはNUKPの短繊維パルプを配して振動板表面の高い伝播速度を実現しています。これにより、原点であるFE203Σのバックロードホーン使用時の厚みと張りのある音色を基に、より実体感のある立ち上がりが良い中高域と、重心の低い厚みのある低域再生を可能にしました。
          </p>
        )}

        {speaker.category.includes("W VoiceCoil") && (
          <p className="mb-4 leading-7">
            ダブルボイスコイルとは、通常は1段であるボイスコイルを2段にして、それぞれのボイスコイルに別々の信号を入力することが可能で、例えば1つのスピーカーユニットで2つの音を同時に再生することも、2つに同じ信号を違うアンプで入力させることも、もちろん片方1つだけの入力でも再生可能です。また接続方法を工夫するとインピーダンスの変化を利用して、音量の調整や周波数特性の変化を行うことも可能です。マトリックス接続にも応用可能で、複数のユニットを組み合わせて複雑な音響効果を得ることもできます。
          </p>
        )}
      </>

      <style jsx>{`
      `}</style>
    </div>
  );
}
