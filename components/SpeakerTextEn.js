export default function SpeakerTextEn({ speaker, languageData }) {
  if (!speaker) return null;

  return (
    <div id="SpeakerText" data-component-name="SpeakerTextEn">
      <p className="mb-4 leading-7">
        This speaker unit,
        {speaker.name && (
          <> the &quot;{speaker.name}&quot;, </>
        )}
        {languageData.categoryText && (
          <>is an {languageData.categoryText}</>
        )}
        {languageData.releaseText && (
          <> {languageData.releaseText}</>
        )}
        {speaker.brand && (
          <> under the {speaker.brand} brand</>
        )}
        {speaker.limited ? (
          <> as a Limited-edition model, </>
        ) : (
          <> as a regular model, </>
        )}
        {languageData.priceText && (
          <>priced at {languageData.priceText}. </>
        )}
        Its main specifications
        {speaker.electricalParameters?.nominalImpedance?.value && (
          <> include an Impedance of {speaker.electricalParameters.nominalImpedance.value}{speaker.electricalParameters.nominalImpedance.unit}, </>
        )}
        {speaker.otherParameters?.SPL?.value && (
          <>a Sound Pressure Level (sensitivity) of {speaker.otherParameters.SPL.value}{speaker.otherParameters.SPL.unit}, </>
        )}
        {speaker.otherParameters?.ratedInput?.value && (
          <>and a rated power handling of {speaker.otherParameters.ratedInput.value}{speaker.otherParameters.ratedInput.unit}, </>
        )}
        {speaker.otherParameters?.maxInput?.value && (
          <>with a maximum power capacity of up to {speaker.otherParameters.maxInput.value}{speaker.otherParameters.maxInput.unit}.</>
        )}

        {speaker.category.includes("W VoiceCoil") && (
          <><br />Note: This product features a dual voice coil, so please pay attention to the specifications.</>
        )}
      </p>

      <p className="mb-4 leading-7">
        To provide reference values for enclosure design,
        {speaker.electricalParameters?.fs?.value && (
          <> the Lowest Resonance Frequency (fs, f0) is {speaker.electricalParameters.fs.value}{speaker.electricalParameters.fs.unit}, </>
        )}
        {speaker.otherParameters?.reproductionFrequencyResponse?.value && (
          <> and the Reproduction Frequency Response range is ensured from {speaker.otherParameters.reproductionFrequencyResponse.value}. </>
        )}
        {speaker.category.includes("for BH") && (
          <>Designed as a component for back-loaded horn enclosures</>
        )}
        {speaker.otherParameters?.Qts?.value && (
          <>, this product has a Qts(Q0) value of {speaker.otherParameters.Qts.value}</>
        )}
        {speaker.mechanicalParameters?.Mms?.value && (
          <>, an Mms (m0) of {speaker.mechanicalParameters.Mms.value}{speaker.mechanicalParameters.Mms.unit}</>
        )}
        {speaker.otherParameters?.Vas?.value && (
          <>, and a Vas of {speaker.otherParameters.Vas.value}{speaker.otherParameters.Vas.unit}</>
        )}
        {speaker.otherParameters?.recommendedEnclosure?.value && (
          <>. The manufacturer-recommended enclosure type is a {speaker.otherParameters.recommendedEnclosure.value}.</>
        )}
      </p>

      <p className="mb-4 leading-7">
        {languageData.frameText && (
          <>The frame is made of {languageData.frameText}, </>
        )}
        {speaker.otherParameters?.baffleHoleDiameter?.value && (
          <>the required baffle hole diameter is Φ{speaker.otherParameters.baffleHoleDiameter.value}{speaker.otherParameters.baffleHoleDiameter.unit}, </>
        )}
        {speaker.otherParameters?.mountingHoles?.value && (
          <>it requires {speaker.otherParameters.mountingHoles.value} mounting holes, </>
        )}
        {speaker.otherParameters?.magnetWeight?.value && (
          <>the magnet weight is {speaker.otherParameters.magnetWeight.value}{speaker.otherParameters.magnetWeight.unit}, </>
        )}
        {speaker.otherParameters?.netWeight?.value && (
          <>the total net weight is {speaker.otherParameters.netWeight.value}{speaker.otherParameters.netWeight.unit}, </>
        )}
        {speaker.otherParameters?.overallDiameter?.value && (
          <>the overall diameter of the unit is {speaker.otherParameters.overallDiameter.value}{speaker.otherParameters.overallDiameter.unit}, </>
        )}
        {speaker.otherParameters?.depth?.value && (
          <>and the depth is {speaker.otherParameters.depth.value}{speaker.otherParameters.depth.unit}.</>
        )}
      </p>

      <>
        {speaker.category.includes("WoodCorn") && (
          <p className="mb-4 leading-7">
            The diaphragm features a wood cone, with its distinctive patterns being naturally derived, giving each product a unique appearance. Depending on the manufacturer, differences can be observed in the thickness of the wood, the part of the tree used, the grain direction, and the number of laminated layers, which contribute to the unique characteristics of each brand. For more details, refer to the <a href="https://dream-creation.jp/blog/25" title="About PARC Audio Wood Cones">PARC Audio's past blog post (Japanese post)</a>.
          </p>
        )}

        {speaker.category.includes("En") && (
          <p className="mb-4 leading-7">
            The FOSTEX FE-En series is a traditional full-range regular unit by FOSTEX. It delivers bright and clear sound with a wide lineup ranging from 8cm to 20cm. The ES cone, made from perennial plants related to banana trees, features fine, flexible fibers that are well-entwined, with a broad cross-sectional shape and high aspect ratio. This results in a diaphragm with minimal loss and significantly enhanced information density. Equipped with a powerful ferrite magnet circuit, it is a versatile full-range unit suitable for both bass reflex and back-loaded horn enclosures.
          </p>
        )}

        {speaker.category.includes("NV") && (
          <p className="mb-4 leading-7">
            The FOSTEX FE-NV series continues the tradition of FOSTEX's full-range regular units. It offers bright and clear sound, with added transparency and crispness in the NV iteration. Available in a wide range of sizes from 8cm to 20cm, the series features a newly developed cone made primarily from ultra-refined kenaf, combined with chemical fibers and minerals to enhance propagation speed and rigidity. The series eliminates eyelets across all sizes to reduce harmonic distortion in the midrange. Additionally, its design aesthetics have been updated.
          </p>
        )}

        {speaker.category.includes("NV2") && (
          <p className="mb-4 leading-7">
            The FOSTEX FE-NV2 series continues FOSTEX's tradition of full-range regular units. While maintaining its bright and resonant sound, the series achieves a three-dimensional soundstage representation. It offers a relaxed low-frequency response and a refined, smooth reproduction of mid-to-high frequencies for a fulfilling music experience. Available in sizes ranging from 8cm to 20cm, the NV2 series uses a newly developed cone paper made from ultra-refined kenaf as the primary material. By blending non-wood pulp, chemical fibers, and minerals, it enhances propagation speed and rigidity. Additionally, it eliminates eyelets across all sizes to reduce harmonic distortion in the midrange. With changes in adhesives, the NV2 series further improves environmental compatibility compared to its predecessor.
          </p>
        )}

        {speaker.category.includes("Sol") && (
          <p className="mb-4 leading-7">
            The FOSTEX FE-Sol series is a full-range speaker unit designed for back-loaded horn enclosures. The Sol series employs a double-layer ES cone made from dense, fine fibers. This innovative two-layer papermaking technique achieves both higher rigidity and appropriate internal damping while maintaining a lightweight design. The core layer, composed of long-fiber pulp, provides structural stiffness, while the surface layer of short-fiber pulp enhances the propagation speed on the diaphragm surface. This allows for bright and resonant midrange tones, sharp and clear high frequencies, and rich, full-bodied low frequencies.
          </p>
        )}

        {speaker.category.includes("SS-HP") && (
          <p className="mb-4 leading-7">
            The FOSTEX FE-SS-HP series is a limited-edition full-range speaker unit developed with FOSTEX's foundational acoustic philosophy and advanced proprietary technology. It features a powerful, low-distortion external magnetic circuit with dual ferrite magnets and an HP-shaped diaphragm with a cellulose nanofiber-coated surface. The diaphragm's coating improves Young's modulus, specific bending rigidity, and sound velocity while minimizing internal loss. The HP (Hyperbolic Paraboloid) diaphragm disperses resonances and ensures both lightweight and high rigidity. This series offers fast transient response, robust low frequencies, rich midrange, and extended high frequencies, providing a highly expressive and enjoyable musical experience.
          </p>
        )}

        {speaker.category.includes("Σ-RE") && (
          <p className="mb-4 leading-7">
            The FOSTEX FE-Σ-RE series is a modern revival of the original FE203Σ, blending its classic technologies with cutting-edge innovations. Designed specifically for back-loaded horn applications, this special limited-production unit maximizes the unique characteristics of back-loaded horn designs. It features a two-layer ultra-refined NUKP diaphragm, made with unbleached softwood kraft pulp. The core layer combines long and short fibers for optimal rigidity and internal loss, while the surface layer of short fibers enhances propagation speed. This achieves a rich and resonant tone with sharp transient response in the mid-to-high range and deep, full-bodied low frequencies, staying true to the legacy of the FE203Σ.
          </p>
        )}

        {speaker.category.includes("W VoiceCoil") && (
          <p className="mb-4 leading-7">
            A double voice coil features two separate coils instead of the usual single coil, allowing different signals to be input into each coil. This design enables a single speaker unit to reproduce two sounds simultaneously, or to handle separate signals from different amplifiers. It also supports single-coil operation. By leveraging impedance variations, it can be used for volume adjustments, frequency response changes, and even matrix connections for achieving complex acoustic effects with multiple units.
          </p>
        )}
      </>

      <style jsx>{`
        a {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
