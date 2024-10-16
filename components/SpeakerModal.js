import { useRef } from 'react';
import { useRouter } from 'next/router';

export default function SpeakerModal({ speaker, onClose }) {
  if (!speaker) return null;

  const { locale } = useRouter(); // 言語を取得
  const languageData = locale === 'ja' ? speaker.ja : speaker.en; // ロケールに基づいてテキストを選択

  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose(); // モーダル外をクリックした場合にモーダルを閉じる
    }
  };

  return (
    <div
      className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleClickOutside}
    >
      <div ref={modalRef} className="modal bg-white rounded-lg p-6 max-w-4xl w-full mx-4">
      <h2 className="text-2xl font-bold mb-2 text-center flex flex-col items-center">
        <div className="text-center mt-2 mb-2">
          <span className="text-orange-600">{speaker.brand}</span>&nbsp;
          <span title={speaker.model}>{speaker.name}</span>
        </div>
        {/* 1番目と2番目の画像を横並びで表示 */}
        <div className="flex flex-wrap gap-2 justify-center">
          {speaker.image && Object.values(speaker.image).slice(0, 2).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${speaker.brand} ${speaker.name}`}
              className="w-56 h-56 object-contain rounded"
              onError={(e) => e.target.src = '/images/no-image.jpg'} // 画像がない場合に代替画像を表示
            />
          ))}
        </div>
      </h2>

        <p className="mb-4 text-center">
          <span className="mr-5 font-bold">{languageData.categoryText}</span>
          <time className="mr-5 text-red-800" title={speaker.release}>{languageData.releaseText}</time>
          {languageData.priceText}
        </p>

        <div className="mb-4 flex flex-wrap gap-2">
          {speaker.category && speaker.category.map((cat, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
              {cat}
            </span>
          ))}
        </div>

        <table className="table-auto w-full mb-4 border-collapse" style={{ tableLayout: 'fixed' }}>
          <thead>
            <tr>
              <th className="border px-4 py-2 w-1/3">Loss Factors</th>
              <th className="border px-4 py-2 w-1/3">Electrical Parameters</th>
              <th className="border px-4 py-2 w-1/3">Mechanical Parameters</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2 align-top">
                {speaker.lossFactors?.Qts?.value && (
                  <p className="text-red-800">Qts (Q0): {speaker.lossFactors.Qts.value}</p>
                )}
                {speaker.lossFactors?.Qms?.value && (
                  <p>Qms: {speaker.lossFactors.Qms.value}</p>
                )}
                {speaker.lossFactors?.Qes?.value && (
                  <p>Qes: {speaker.lossFactors.Qes.value}</p>
                )}
              </td>

              <td className="border px-4 py-2 align-top">
                {speaker.electricalParameters?.Re?.value && speaker.electricalParameters?.Re?.unit && (
                  <p>Re: {speaker.electricalParameters.Re.value} {speaker.electricalParameters.Re.unit}</p>
                )}
                {speaker.electricalParameters?.Le?.value && speaker.electricalParameters?.Le?.unit && (
                  <p>Le: {speaker.electricalParameters.Le.value} {speaker.electricalParameters.Le.unit}</p>
                )}
                {speaker.electricalParameters?.fs?.value && speaker.electricalParameters?.fs?.unit && (
                  <p>fs: {speaker.electricalParameters.fs.value} {speaker.electricalParameters.fs.unit}</p>
                )}
              </td>

              <td className="border px-4 py-2 align-top">
                {speaker.mechanicalParameters?.Mms?.value && speaker.mechanicalParameters?.Mms?.unit && (
                  <p>Mms: {speaker.mechanicalParameters.Mms.value} {speaker.mechanicalParameters.Mms.unit}</p>
                )}
                {speaker.mechanicalParameters?.Cms?.value && speaker.mechanicalParameters?.Cms?.unit && (
                  <p>Cms: {speaker.mechanicalParameters.Cms.value} {speaker.mechanicalParameters.Cms.unit}</p>
                )}
                {speaker.mechanicalParameters?.Bl?.value && speaker.mechanicalParameters?.Bl?.unit && (
                  <p>Bl: {speaker.mechanicalParameters.Bl.value} {speaker.mechanicalParameters.Bl.unit}</p>
                )}
              </td>
            </tr>
          </tbody>
        </table>

        <table className="table-auto w-full mb-4 border-collapse" style={{ tableLayout: 'fixed' }}>
          <thead>
            <tr>
              <th className="border px-4 py-2 w-1/3">Enclosure Parameters</th>
              <th className="border px-4 py-2 w-1/3">Other Parameters</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2 align-top">
                {languageData.frameText && (
                  <p>{languageData.frameText}</p>
                )}
                {speaker.otherParameters.baffleHoleDiameter && (
                  <p>Baffle Hole Diameter: Φ{speaker.otherParameters.baffleHoleDiameter.value}{' '}
                    {speaker.otherParameters.baffleHoleDiameter.unit}
                  </p>
                )}
                {speaker.otherParameters.baffleHole && (
                  <p>Baffle Hole: {speaker.otherParameters.baffleHole.value}</p>
                )}
                {speaker.otherParameters.overallDiameter && (
                  <p>Overall Diameter: {speaker.otherParameters.overallDiameter.value}{' '}
                    {speaker.otherParameters.overallDiameter.unit}
                  </p>
                )}
                {speaker.otherParameters.Vas && (
                  <p>Vas: {speaker.otherParameters.Vas.value} {speaker.otherParameters.Vas.unit}</p>
                )}
                {speaker.otherParameters.reproductionFrequencyResponse && (
                  <p>Reproduction Frequency Response: {speaker.otherParameters.reproductionFrequencyResponse.value}</p>
                )}
                {speaker.otherParameters.recommendedEnclosure && (
                  <p>Recommended Enclosure: {speaker.otherParameters.recommendedEnclosure.value}</p>
                )}
              </td>

              <td className="border px-4 py-2 align-top">
                {speaker.electricalParameters.nominalImpedance && (
                  <p className="text-red-800">
                    Nominal Impedance: {speaker.electricalParameters.nominalImpedance.value}{' '}
                    {speaker.electricalParameters.nominalImpedance.unit}
                  </p>
                )}
                {speaker.otherParameters.ratedInput && (
                  <p>
                    Rated Input: {speaker.otherParameters.ratedInput.value}{' '}
                    {speaker.otherParameters.ratedInput.unit}
                  </p>
                )}
                {speaker.otherParameters.SPL && (
                  <p>
                    SPL: {speaker.otherParameters.SPL.value}{' '}
                    {speaker.otherParameters.SPL.unit}
                  </p>
                )}
                {speaker.otherParameters.equivalentDiaphragmRadius && (
                  <p>
                    Equivalent Diaphragm Radius: {speaker.otherParameters.equivalentDiaphragmRadius.value}{' '}
                    {speaker.otherParameters.equivalentDiaphragmRadius.unit}
                  </p>
                )}
                {speaker.otherParameters.voiceCoilDiameter && (
                  <p>
                    Voice Coil Diameter: {speaker.otherParameters.voiceCoilDiameter.value}{' '}
                    {speaker.otherParameters.voiceCoilDiameter.unit}
                  </p>
                )}
                {speaker.otherParameters.magnetWeight && (
                  <p>
                    Magnet Weight: {speaker.otherParameters.magnetWeight.value}{' '}
                    {speaker.otherParameters.magnetWeight.unit}
                  </p>
                )}
                {speaker.otherParameters.netWeight && (
                  <p>
                    Net Weight: {speaker.otherParameters.netWeight.value}{' '}
                    {speaker.otherParameters.netWeight.unit}
                  </p>
                )}
                {speaker.limited !== undefined && (
                  <p>Limited Edition: {speaker.limited ? 'Yes' : 'No'}</p>
                )}
              </td>
            </tr>
          </tbody>
        </table>

        {speaker.recommendedEnclosureList && speaker.recommendedEnclosureList.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-2">Recommended Enclosure List</h3>
            <ul className="list-disc list-inside">
              {speaker.recommendedEnclosureList.map((enclosure, index) => (
                <li key={index}>{enclosure}</li>
              ))}
            </ul>
          </div>
        )}

        {speaker.image && (
          <div>
            <h3 className="text-xl font-semibold mb-2">Images</h3>
            <div className="flex flex-wrap gap-2 text-center flex-col items-center">
              {speaker.image && Object.values(speaker.image).slice(2).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${speaker.brand} ${speaker.name}`}
                  className="w-4/5 h-auto object-contain rounded"
                  onError={(e) => e.target.src = '/images/no-image.jpg'} // 画像がない場合に代替画像を表示
                />
              ))}
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-800"
        >
          Close
        </button>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal {
          max-height: 90vh; /* モーダル全体の高さを90%に制限 */
          overflow-y: auto; /* 縦スクロールを有効にする */
        }
      `}</style>
    </div>
  );
}
