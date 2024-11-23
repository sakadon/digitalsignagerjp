export default function SpeakerLabel({ speaker, languageData }) {
  if (!speaker) return null;

  return (
    <div id="SpeakerLabel" data-component-name="SpeakerLabel">
      <p className="mb-4 text-center">
        <span className="mr-5 font-bold">{languageData.categoryText}</span>

        {languageData.releaseText && (
          <time className="mr-5 text-red-800" title={speaker.release}>{languageData.releaseText}</time>
        )}

        {languageData.priceText}<br />

        {languageData.frameText && (
          <span>{languageData.frameText}</span>
        )}
      </p>

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
