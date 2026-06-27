export default function EnclosureImageSection({ enclosure, locale = 'en' }) {
  if (!enclosure) return null;

  const labels = locale === 'ja'
    ? {
      main: '外観',
      cross_section: '断面図',
      sub: '側面図',
      blueprint: '図面資料',
      frequency: '周波数特性',
    }
    : {
      main: 'Appearance',
      cross_section: 'Cross section',
      sub: 'Side view',
      blueprint: 'Blueprint',
      frequency: 'Frequency response',
    };

  const fallbackSrc = '/images/no-image.jpg';

  const imageSrc = (value) => value || fallbackSrc;

  return (
    <section className="mb-8" id="EnclosureImageSection" data-component-name="EnclosureImageSection">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-100 rounded p-3">
          <h3 className="font-semibold mb-2">{labels.main}</h3>
          <img
            src={imageSrc(enclosure.image?.main)}
            alt={`${enclosure.brand} ${enclosure.name} ${labels.main}`}
            className="w-full h-72 object-contain rounded bg-white"
            onError={(e) => {
              e.target.src = fallbackSrc;
            }}
          />
        </div>

        <div className="bg-gray-100 rounded p-3">
          <h3 className="font-semibold mb-2">{labels.cross_section}</h3>
          <img
            src={imageSrc(enclosure.image?.cross_section)}
            alt={`${enclosure.brand} ${enclosure.name} ${labels.cross_section}`}
            className="w-full h-72 object-contain rounded bg-white"
            onError={(e) => {
              e.target.src = fallbackSrc;
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {['sub', 'blueprint', 'frequency', 'cross_section'].map((key) => (
          <div key={key} className="bg-gray-100 rounded p-2">
            <p className="text-xs font-medium mb-1">{labels[key]}</p>
            <img
              src={imageSrc(enclosure.image?.[key])}
              alt={`${enclosure.brand} ${enclosure.name} ${labels[key]}`}
              className="w-full h-24 object-contain rounded bg-white"
              onError={(e) => {
                e.target.src = fallbackSrc;
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
