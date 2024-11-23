export default {
  title: "DigitalSignager.JP",
  description: "This is a components list site for homemade(craft) speakers, electronics, and digital signage, etc. for fans.",

  menu: {
    home: "Home",
    bh_speaker_units_db: "Speaker Units for BH",
    speaker_components_list: "Speaker Units(Components) List",
    grouped_by_baffle_hole_diameter: "Grouped by Baffle Hole Diameter",
    grouped_by_categories: "Grouped by Categories",
    for_backloadedhorn: "for Backloaded-Horn Speaker Units List",
  },

  speakers_dir: {
    title: "Speaker Units(Components) Database",
    abst: "Displays all the speaker units registered on this site.",

    speakers_id_title: "Speaker Unit Details",
    related_speakers_title: "Related Speaker Units List",

    grouped_by_baffle_hole_diameter: {
      title: "List Grouped by Baffle Hole Diameter",
      baffle_hole_diameter: "Baffle Hole Diameter",
      abst: "Speaker units across manufacturers can be easily swapped and enjoyed as long as the baffle diameter (speaker hole) and mounting holes match. With this in mind, we've grouped units by baffle diameter and mounting holes. This categorization can help you find compatible units for your existing enclosure. However, please note that inserting bass-reflex-oriented units into back-loaded horn enclosures may not produce the desired sound. We have allowed a margin of ±1mm for discrepancies, but in many cases, a difference of up to 3mm might still work if the mounting holes align."
    },

    grouped_by_categories: {
      title: "List Grouped by Categories",
      abst: "We have independently categorized each unit based on their unique features. This categorization is primarily based on product model numbers, materials, and characteristic traits. Occasionally, there may be errors or omissions, so feel free to notify us if you spot any issues."
    },

    for_backloadedhorn: {
      title: "List of Speaker Units for Back-Loaded Horn",
      abst: "For selecting speaker units suitable for back-loaded horn enclosures, it is commonly recommended to choose units with a strong magnetic circuit, a low Qts (Total Quality Factor, also referred to as Q0) indicating an over-damped tendency, and components made from high-rigidity materials with appropriate internal loss (often paper, kenaf, kevlar, etc.). These characteristics often result in units with high efficiency (Sound Pressure Level, SPL). Here, we have listed speaker units explicitly designed for back-loaded horn enclosures by manufacturers, sorted by Qts values. Please use this as a reference for your selection."
    }
  },

  breadcrumbs: {
    home: "HOME",

    speakers: "Speakers",
    grouped_by_baffle_hole_diameter: "Grouped by Baffle Hole Diameter",
    grouped_by_categories: "Grouped by Categories",
    backloaded_horn_speakers: "for Backloaded-Horn Speakers",
    for_backloadedhorn: "for Backloaded-Horn Speaker Units List",

    categories: "Categories",
    details: "Details"
  }
};
