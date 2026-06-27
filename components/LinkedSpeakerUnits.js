import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';

// Phase 1 requirement defines compatibility around mount-hole ±1mm.
const MOUNT_HOLE_TOLERANCE_MM = 1;

const getMountHoleValue = (speaker) => {
  const value = speaker?.otherParameters?.baffleHoleDiameter?.value;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
};

export default function LinkedSpeakerUnits({ speakerIds = [], allSpeakers = [], mountHoleDiameter }) {
  const { t: tCommon } = useTranslation('common');
  const linkedSpeakers = allSpeakers.filter((speaker) => speakerIds.includes(speaker.id));

  if (linkedSpeakers.length === 0) return null;

  const getReason = (speaker) => {
    const speakerHole = getMountHoleValue(speaker);
    const enclosureHole = Number(mountHoleDiameter);

    if (Number.isFinite(speakerHole) && Number.isFinite(enclosureHole)) {
      const diff = Math.abs(speakerHole - enclosureHole);
      if (diff <= MOUNT_HOLE_TOLERANCE_MM) {
        return tCommon('enclosures_dir.reasons.mount_hole_close', { speakerHole, diff });
      }

      return tCommon('enclosures_dir.reasons.mount_hole_check', { speakerHole, diff });
    }

    return tCommon('enclosures_dir.reasons.mount_hole_incomplete');
  };

  return (
    <section id="LinkedSpeakerUnits" data-component-name="LinkedSpeakerUnits" className="mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {linkedSpeakers.map((speaker) => (
          <article key={speaker.id} className="border rounded-lg p-3 bg-white shadow-sm">
            <div className="aspect-square mb-3 bg-gray-100 rounded overflow-hidden">
              <img
                src={speaker.image?.main || '/images/noimage.jpg'}
                alt={`${speaker.brand} ${speaker.name}`}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.src = '/images/noimage.jpg';
                }}
              />
            </div>

            <h4 className="font-bold leading-tight mb-1">{speaker.name}</h4>
            <p className="text-sm text-gray-700">{speaker.brand}</p>
            <p className="text-sm text-gray-700 mb-2">{speaker.model}</p>
            <p className="text-xs text-gray-600 mb-3">{getReason(speaker)}</p>

            <Link
              href={`/speakers/${speaker.id}`}
              className="inline-block w-full text-center bg-blue-600 text-white rounded px-3 py-2 text-sm hover:bg-blue-700"
            >
              {tCommon('enclosures_dir.labels.view_details')}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
