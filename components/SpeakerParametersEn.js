export default function SpeakerParametersEn({ speaker }) {
  if (!speaker) return null;

  return (
    <div id="SpeakerParameters" data-component-name="SpeakerParametersEn">
      <table className="table-auto w-full mb-4 border-collapse" style={{ tableLayout: 'fixed' }}>
        <thead>
          <tr>
            <th className="border px-4 py-2 w-1/3">Thiele&amp;Small Parameters</th>
            <th className="border px-4 py-2 w-1/3">Voice Coil Parameters</th>
            <th className="border px-4 py-2 w-1/3">Mechanical Parameters</th>
          </tr>
        </thead>
        <tbody className="speaker_spec_table">
          <tr>
            <td className="border px-4 py-2 align-top">
              {speaker.electricalParameters?.fs?.value && (
                <p><abbr title="Resonance Frequency">fs (f<sub>0</sub>)</abbr>: {speaker.electricalParameters.fs.value} {speaker.electricalParameters.fs.unit}</p>
              )}
              {speaker.lossFactors?.Qms?.value && (
                <p><abbr title="Mechanical Quality Factor">Qms</abbr>: {speaker.lossFactors.Qms.value}</p>
              )}
              {speaker.lossFactors?.Qes?.value && (
                <p><abbr title="Electrical Quality Factor">Qes</abbr>: {speaker.lossFactors.Qes.value}</p>
              )}
              {speaker.lossFactors?.Qts?.value && (
                <p className="text-red-800"><abbr title="Total Quality Factor">Qts</abbr> (Q<sub>0</sub>): {speaker.lossFactors.Qts.value}</p>
              )}
            </td>

            <td className="border px-4 py-2 align-top">
              {speaker.electricalParameters?.nominalImpedance?.value && (
                <p className="text-red-800"><abbr title="Nominal Impedance">Z</abbr>: {speaker.electricalParameters.nominalImpedance.value} {speaker.electricalParameters.nominalImpedance.unit}</p>
              )}
              {speaker.electricalParameters?.Re?.value && (
                <p><abbr title="DC Resistance">Re</abbr>: {speaker.electricalParameters.Re.value} {speaker.electricalParameters.Re.unit}</p>
              )}
              {speaker.electricalParameters?.Le?.value && (
                <p><abbr title="Inductance (1kHz)">Le</abbr>: {speaker.electricalParameters.Le.value} {speaker.electricalParameters.Le.unit}</p>
              )}
              {speaker.otherParameters?.voiceCoilDiameter?.value && (
                <p><abbr title="Voice Coil">VC</abbr> Diameter: {speaker.otherParameters.voiceCoilDiameter.value} {speaker.otherParameters.voiceCoilDiameter.unit}</p>
              )}
            </td>

            <td className="border px-4 py-2 align-top">

              {speaker.mechanicalParameters?.Mms?.value  && (
                <p><abbr title="Moving Mass">Mms (m<sub>0</sub>)</abbr>: {speaker.mechanicalParameters.Mms.value} {speaker.mechanicalParameters.Mms.unit}</p>
              )}
              {speaker.mechanicalParameters?.Cms?.value && (
                <p><abbr title="Suspension Compliance">Cms</abbr>: {speaker.mechanicalParameters.Cms.value} {speaker.mechanicalParameters.Cms.unit}</p>
              )}
              {speaker.otherParameters?.equivalentDiaphragmRadius?.value && (
                <p><abbr title="Equivalent Diaphragm Radius">Diaphragm R (a)</abbr>: {speaker.otherParameters.equivalentDiaphragmRadius.value} {speaker.otherParameters.equivalentDiaphragmRadius.unit}</p>
              )}
              {speaker.mechanicalParameters?.Bl?.value && (
                <p><abbr title="Magnet Force Factor">Bl</abbr>: {speaker.mechanicalParameters.Bl.value} {speaker.mechanicalParameters.Bl.unit}</p>
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
        <tbody className="speaker_spec_table">
          <tr>
            <td className="border px-4 py-2 align-top">
              {speaker.otherParameters?.SPL?.value && (
                <p><abbr title="Sound Pressure Level">SPL</abbr>: {speaker.otherParameters.SPL.value} {speaker.otherParameters.SPL.unit}</p>
              )}
              {speaker.otherParameters?.Vas?.value && (
                <p><abbr title="Compliance Equivalent Volume">Vas</abbr>: {speaker.otherParameters.Vas.value} {speaker.otherParameters.Vas.unit}</p>
              )}
              {speaker.otherParameters?.baffleHoleDiameter?.value && (
                <p>Baffle Hole Diameter: Φ{speaker.otherParameters.baffleHoleDiameter.value} {speaker.otherParameters.baffleHoleDiameter.unit}</p>
              )}
              {speaker.otherParameters?.baffleHole?.value && (
                <p>Baffle Hole: {speaker.otherParameters.baffleHole.value} Hole</p>
              )}
              {speaker.otherParameters?.depth?.value && (
                <p>Depth: {speaker.otherParameters.depth.value} {speaker.otherParameters.depth.unit}</p>
              )}
              {speaker.otherParameters?.reproductionFrequencyResponse?.value && (
                <p><abbr title="Reproduction Frequency Response">Frequency Response</abbr>: {speaker.otherParameters.reproductionFrequencyResponse.value}</p>
              )}
              {speaker.otherParameters?.recommendedEnclosure?.value && (
                <p>Recommended Enclosure: {speaker.otherParameters.recommendedEnclosure.value}</p>
              )}
            </td>

            <td className="border px-4 py-2 align-top">
              {speaker.otherParameters?.ratedInput?.value && (
                <p><abbr title="Nominal Rated Input">Nom.</abbr>: {speaker.otherParameters.ratedInput.value} {speaker.otherParameters.ratedInput.unit}</p>
              )}
              {speaker.otherParameters?.maxInput?.value && (
                <p><abbr title="Maximum Music Power (Rated Input)">Mus.</abbr>: {speaker.otherParameters.maxInput.value} {speaker.otherParameters.maxInput.unit}</p>
              )}
              {speaker.otherParameters?.overallDiameter?.value && (
                <p>Overall Diameter: {speaker.otherParameters.overallDiameter.value} {speaker.otherParameters.overallDiameter.unit}</p>
              )}
              {speaker.otherParameters?.magnetWeight?.value && (
                <p>Magnet Weight: {speaker.otherParameters.magnetWeight.value} {speaker.otherParameters.magnetWeight.unit}</p>
              )}
              {speaker.otherParameters?.netWeight?.value && (
                <p>Net Weight: {speaker.otherParameters.netWeight.value} {speaker.otherParameters.netWeight.unit}</p>
              )}
              {speaker.limited !== undefined && (
                <p>Limited Edition: {speaker.limited ? 'Yes' : 'No'}</p>
              )}
            </td>
          </tr>
        </tbody>
      </table>

      <style jsx>{`
        a {
          text-decoration: underline;
        }

        .speaker_spec_table {
          font-family: 'Fira Mono', monospace;
        }
      `}</style>
    </div>
  );
}
