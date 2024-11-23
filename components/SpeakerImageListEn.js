export default function SpeakerImageListEn({ speaker }) {
  if (!speaker) return null;

  return (
    <div id="SpeakerImageList" data-component-name="SpeakerImageListEn">

      {speaker.image && Object.keys(speaker.image).filter(key => key !== 'main' && key !== 'sub' && speaker.image[key]).length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Images</h3>
          {Object.entries(speaker.image)
            .filter(([key, img]) => key !== 'main' && key !== 'sub' && img) // main, sub以外の画像がある場合のみ
            .map(([key, img], index) => (
              <div key={index} className="flex flex-col items-center mb-5">
                <h4 className="font-medium mb-1 text-sm">{key}</h4>
                <img
                  src={img}
                  alt={`${speaker.brand} ${speaker.name} - ${key}`}
                  className="w-2/3 h-auto object-contain rounded"
                  onError={(e) => e.target.style.display = 'none'} // 画像エラーの場合非表示
                />
              </div>
            ))}
        </div>
      )}

      <style jsx>{`
      `}</style>
    </div>
  );
}
