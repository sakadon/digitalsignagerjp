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
      <div ref={modalRef} className="modal bg-white rounded-lg p-6 max-w-3xl w-full mx-4">
        <p className="mb-1 font-bold text-center">{languageData.categoryText}</p>
        <h2 className="text-2xl font-bold mb-4 text-center">
          <span className="text-orange-600">{speaker.brand}</span>&nbsp;
          <span title={speaker.model}>{speaker.name}</span>
        </h2>
        <p className="mb-1"><time title={speaker.release}>{languageData.releaseText}</time></p>
        <p className="mb-1">{languageData.priceText}</p>

        <p className="mb-4">
          Nominal Impedance: {speaker.electricalParameters.nominalImpedance.value}{' '}
          {speaker.electricalParameters.nominalImpedance.unit}
        </p>
        <div className="mb-4 flex flex-wrap gap-2">
          {speaker.category && speaker.category.map((cat, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
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
              <td className="border px-4 py-2">
                <p>Qms: {speaker.lossFactors.Qms.value}</p>
                <p>Qes: {speaker.lossFactors.Qes.value}</p>
                <p>Qts: {speaker.lossFactors.Qts.value}</p>
              </td>
              <td className="border px-4 py-2">
                <p>Re: {speaker.electricalParameters.Re.value} {speaker.electricalParameters.Re.unit}</p>
                <p>Le: {speaker.electricalParameters.Le.value} {speaker.electricalParameters.Le.unit}</p>
                <p>fs: {speaker.electricalParameters.fs.value} {speaker.electricalParameters.fs.unit}</p>
              </td>
              <td className="border px-4 py-2">
                <p>Mms: {speaker.mechanicalParameters.Mms.value} {speaker.mechanicalParameters.Mms.unit}</p>
                <p>Cms: {speaker.mechanicalParameters.Cms.value} {speaker.mechanicalParameters.Cms.unit}</p>
                <p>Bl: {speaker.mechanicalParameters.Bl.value} {speaker.mechanicalParameters.Bl.unit}</p>
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
              <td className="border px-4 py-2">
                <p>Baffle Hole Diameter: Φ{speaker.otherParameters.baffleHoleDiameter.value}{' '}
                {speaker.otherParameters.baffleHoleDiameter.unit}</p>
                <p>Overall Diameter: {speaker.otherParameters.overallDiameter.value}{' '}
                {speaker.otherParameters.overallDiameter.unit}</p>
                <p>Vas: {speaker.otherParameters.Vas.value} {speaker.otherParameters.Vas.unit}</p>
                <p>Reproduction Frequency Response: {speaker.otherParameters.reproductionFrequencyResponse.value}</p>
                <p>Recommended Enclosure: {speaker.otherParameters.recommendedEnclosure.value}</p>
              </td>

              <td className="border px-4 py-2">
                <p>Rated Input: {speaker.otherParameters.ratedInput.value} {speaker.otherParameters.ratedInput.unit}</p>
                <p>SPL: {speaker.otherParameters.SPL.value} {speaker.otherParameters.SPL.unit}</p>
                <p>Equivalent Diaphragm Radius: {speaker.otherParameters.equivalentDiaphragmRadius.value}{' '}{speaker.otherParameters.equivalentDiaphragmRadius.unit}</p>
                <p>Voice Coil Diameter: {speaker.otherParameters.voiceCoilDiameter.value}{' '}{speaker.otherParameters.voiceCoilDiameter.unit}</p>
                <p>Magnet Weight: {speaker.otherParameters.magnetWeight.value} {speaker.otherParameters.magnetWeight.unit}</p>
                <p>Net Weight: {speaker.otherParameters.netWeight.value} {speaker.otherParameters.netWeight.unit}</p>
                <p>Limited Edition: {speaker.limited ? 'Yes' : 'No'}</p>
              </td>
            </tr>
          </tbody>
        </table>

        <h3 className="text-xl font-semibold mb-2">Recommended Enclosure List</h3>
        <ul className="list-disc list-inside">
          {speaker.recommendedEnclosureList && speaker.recommendedEnclosureList.map((enclosure, index) => (
            <li key={index}>{enclosure}</li>
          ))}
        </ul>

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
      `}</style>
    </div>
  );
}
