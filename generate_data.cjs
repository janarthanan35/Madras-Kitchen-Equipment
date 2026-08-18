const fs = require('fs');

const categories = [
  "Dosa & Tawa Equipment",
  "Idli & Steaming Equipment",
  "Grinding & Pulverizing",
  "Boiling & Cooking",
  "Work Tables & Storage",
  "Commercial Ranges",
  "Refrigeration",
  "Display & Service",
  "Wash & Exhaust",
  "Bakery & Sweets"
];

const categoryImagePlaceholders = {
  "Dosa & Tawa Equipment": ["__IMG_DOSA_TAWA__", "__IMG_GAS_RANGE__"],
  "Idli & Steaming Equipment": ["__IMG_IDLI_STEAMER__", "__IMG_RICE_BOILER__"],
  "Grinding & Pulverizing": ["__IMG_WET_GRINDER__"],
  "Boiling & Cooking": ["__IMG_RICE_BOILER__", "__IMG_DOSA_TAWA__"],
  "Work Tables & Storage": ["__IMG_WORK_TABLE__"],
  "Commercial Ranges": ["__IMG_GAS_RANGE__", "__IMG_TANDOOR_OVEN__"],
  "Refrigeration": ["__IMG_VISI_COOLER__"],
  "Display & Service": ["__IMG_BAIN_MARIE__"],
  "Wash & Exhaust": ["__IMG_EXHAUST_HOOD__", "__IMG_WORK_TABLE__"],
  "Bakery & Sweets": ["__IMG_BAKING_OVEN__", "__IMG_WET_GRINDER__"]
};

function getProductKeywords(name, catName, desc) {
  const set = new Set();
  
  // Lowercase words from name & category
  name.toLowerCase().split(/[\s/()]+/).filter(Boolean).forEach(w => set.add(w));
  catName.toLowerCase().split(/[\s&/()]+/).filter(Boolean).forEach(w => set.add(w));

  const lowerName = name.toLowerCase();

  // Synonyms & related kitchen terms
  if (lowerName.includes("dosa")) {
    ["dosa", "dosa pan", "dosa plate", "tawa", "griddle", "flat top", "commercial dosa equipment", "cooking equipment"].forEach(k => set.add(k));
  }
  if (lowerName.includes("idli") || lowerName.includes("steamer") || lowerName.includes("steam")) {
    ["idli", "idly", "idli equipment", "steamer", "steaming", "rice", "dhokla", "momo", "puttu", "idiyappam", "steam"].forEach(k => set.add(k));
  }
  if (lowerName.includes("chapati") || lowerName.includes("puffer")) {
    ["chapati", "puffer", "roaster", "tawa", "flat top", "dosa pan"].forEach(k => set.add(k));
  }
  if (lowerName.includes("parotta")) {
    ["parotta", "kothu", "kothu parotta", "tawa", "flat top"].forEach(k => set.add(k));
  }
  if (lowerName.includes("grinder") || lowerName.includes("pulverizer") || lowerName.includes("peeler") || lowerName.includes("mixer") || lowerName.includes("gravy")) {
    ["grinder", "wet grinder", "tilting grinder", "batter", "pulverizer", "peeler", "potato peeler", "coconut scraper", "mixer", "mixer grinder", "gravy machine", "gravy master"].forEach(k => set.add(k));
  }
  if (lowerName.includes("boiler") || lowerName.includes("sambar") || lowerName.includes("rice") || lowerName.includes("soup") || lowerName.includes("dum") || lowerName.includes("milk") || lowerName.includes("tea")) {
    ["boiler", "rice", "rice boiler", "sambar", "sambar boiler", "soup", "milk", "tea", "coffee", "biryani", "vessel", "dum", "cooking equipment"].forEach(k => set.add(k));
  }
  if (lowerName.includes("table") || lowerName.includes("rack") || lowerName.includes("shelf") || lowerName.includes("sink") || lowerName.includes("bin")) {
    ["ss", "ss equipment", "stainless steel", "work table", "table", "sink", "storage", "rack", "shelf"].forEach(k => set.add(k));
  }
  if (lowerName.includes("burner") || lowerName.includes("range") || lowerName.includes("stove") || lowerName.includes("tandoor") || lowerName.includes("salamander") || lowerName.includes("shawarma")) {
    ["stove", "commercial stove", "burner", "gas range", "tandoor", "charcoal tandoor", "gas tandoor", "shawarma", "cooking equipment"].forEach(k => set.add(k));
  }
  if (lowerName.includes("cooler") || lowerName.includes("chiller") || lowerName.includes("freezer") || lowerName.includes("refrigeration")) {
    ["cooler", "chiller", "visi cooler", "freezer", "deep freezer", "chest freezer", "fridge", "refrigerator"].forEach(k => set.add(k));
  }
  if (lowerName.includes("bain marie") || lowerName.includes("display") || lowerName.includes("warmer") || lowerName.includes("counter") || lowerName.includes("showcase")) {
    ["bain marie", "hot bain marie", "sweet display", "bakery display", "chaat counter", "warmer", "display counter", "food warmer"].forEach(k => set.add(k));
  }
  if (lowerName.includes("oven") || lowerName.includes("baking") || lowerName.includes("pizza") || lowerName.includes("blender") || lowerName.includes("waffle") || lowerName.includes("sheeter") || lowerName.includes("slicer")) {
    ["oven", "baking oven", "deck oven", "rotary oven", "dough mixer", "pizza oven", "conveyor pizza oven", "waffle", "blender"].forEach(k => set.add(k));
  }
  if (lowerName.includes("fish fry") || lowerName.includes("fry")) {
    ["deep fryer", "fryer", "fish fry", "tawa", "shallow fry"].forEach(k => set.add(k));
  }

  set.add("kitchen equipment");
  if (lowerName.includes("ss") || catName.includes("Work Tables") || catName.includes("Wash")) {
    set.add("ss equipment");
    set.add("stainless steel");
  }

  return Array.from(set);
}

const products = [
  // 1. Dosa & Tawa Equipment
  { name: "Commercial Dosa Tawa 3ft", category: 0, desc: "Commercial heavy duty Dosa Tawa crafted for hotel and restaurant kitchens." },
  { name: "Commercial Dosa Tawa 4ft", category: 0, desc: "Large 4ft commercial Dosa Tawa for high-volume morning breakfast service." },
  { name: "Commercial Dosa Tawa 5ft", category: 0, desc: "Extra-large 5ft commercial Dosa Tawa for banquet and catering operations." },
  { name: "Chapati Puffer Plate", category: 0, desc: "Commercial Chapati puffer and roasting plate unit." },
  { name: "Omelette Tawa", category: 0, desc: "Dedicated commercial round cast iron tawa for fast egg preparations." },
  { name: "Fish Fry Tawa", category: 0, desc: "Shallow fry commercial tawa designed for fish and meat pan frying." },
  { name: "Parotta Master Tawa", category: 0, desc: "Heavy gauge steel tawa designed specifically for South Indian Parotta making." },
  { name: "Appam Chatti Range", category: 0, desc: "Customized multi-burner gas range built for holding traditional Appam pans." },
  { name: "Paniyaram Tawa (Commercial)", category: 0, desc: "Commercial multi-cavity cast iron pan unit for Kuzhi Paniyaram." },
  { name: "Kothu Parotta Station", category: 0, desc: "Heavy reinforced steel flat top cooking station for chopping Kothu Parotta." },

  // 2. Idli & Steaming Equipment
  { name: "Idli Steamer 54 Plates", category: 1, desc: "Commercial stainless steel Idli steaming chamber with 54-plate capacity." },
  { name: "Idli Steamer 72 Plates", category: 1, desc: "High-capacity commercial Idli steamer for large restaurants and messes." },
  { name: "Idli Steamer 108 Plates", category: 1, desc: "Industrial scale Idli steamer cabinet for institutional catering." },
  { name: "Gas Rice Steamer", category: 1, desc: "Heavy duty gas-operated steaming plant for bulk rice preparation." },
  { name: "Electric Rice Steamer", category: 1, desc: "Commercial electric steamer unit for uniform rice cooking." },
  { name: "Momo Steamer 3 Tier", category: 1, desc: "Stainless steel multi-tier steamer unit for dim sums and momos." },
  { name: "Puttu Maker Commercial", category: 1, desc: "Multi-pipe steam attachment for commercial Kerala Puttu preparation." },
  { name: "Idiyappam Steamer", category: 1, desc: "Tray-based commercial steaming unit designed for string hoppers / Idiyappam." },
  { name: "Commercial Dhokla Steamer", category: 1, desc: "Heavy duty stainless steel tray steamer for bulk snack production." },
  { name: "Idli Box (Table Top)", category: 1, desc: "Compact table-top steamer box for small eateries and tiffin centers." },

  // 3. Grinding & Pulverizing
  { name: "Tilting Wet Grinder 10L", category: 2, desc: "Commercial granite stone wet grinder with easy tilting mechanism." },
  { name: "Tilting Wet Grinder 20L", category: 2, desc: "20 Liter commercial wet grinder for continuous batter grinding." },
  { name: "Tilting Wet Grinder 40L", category: 2, desc: "Heavy industrial 40 Liter granite wet grinder for high volume batter production." },
  { name: "Conventional Wet Grinder 15L", category: 2, desc: "Standard commercial upright stone wet grinder unit." },
  { name: "Potato Peeler 10kg", category: 2, desc: "Commercial abrasive drum potato and root vegetable peeling machine." },
  { name: "Potato Peeler 20kg", category: 2, desc: "Heavy-duty 20kg batch vegetable peeler for bulk preparation." },
  { name: "Coconut Scraper Machine", category: 2, desc: "Motorized dual-blade commercial coconut grater unit." },
  { name: "Masala Pulverizer", category: 2, desc: "Commercial stainless steel dry spice pulverizer machine." },
  { name: "Commercial Mixer Grinder", category: 2, desc: "Heavy-duty high RPM commercial kitchen mixer grinder." },
  { name: "Gravy Machine / Gravy Master", category: 2, desc: "Continuous wet grinding machine for onion, tomato, and gravy pastes." },

  // 4. Boiling & Cooking
  { name: "SS Rice Boiler 50kg", category: 3, desc: "Stainless steel double-jacketed steam rice boiling vessel." },
  { name: "SS Rice Boiler 100kg", category: 3, desc: "Industrial volume steam rice boiler kettle for mass feeding." },
  { name: "Sambar Boiler 100L", category: 3, desc: "Steam jacketed cooking kettle for Sambar, Rasam, and curries." },
  { name: "Sambar Boiler 200L", category: 3, desc: "Large capacity tilting liquid boiling vessel." },
  { name: "Milk Boiler 50L", category: 3, desc: "Water-jacketed commercial milk boiling vessel to prevent scorching." },
  { name: "Tea / Coffee Boiler 20L", category: 3, desc: "Commercial electric hot water and beverage dispensing boiler." },
  { name: "Tilting Boiling Pan 100L", category: 3, desc: "Easy-tilt cooking pan for gravies, stocks, and liquid foods." },
  { name: "Gas Soup Boiler", category: 3, desc: "Heavy duty stock pot stove and kettle unit for soups and broth." },
  { name: "Steam Generator Unit", category: 3, desc: "Dedicated gas or electric steam boiler for kitchen equipment line." },
  { name: "Biryani Dum Vessel", category: 3, desc: "Traditional thick-bottom stainless steel vessel for dum cooking." },

  // 5. Work Tables & Storage
  { name: "SS Work Table (4ft)", category: 4, desc: "Stainless steel food preparation table with under-shelf." },
  { name: "SS Work Table (6ft)", category: 4, desc: "Heavy gauge stainless steel kitchen work table." },
  { name: "SS Work Table with Sink", category: 4, desc: "Integrated preparation table with built-in washing sink." },
  { name: "SS Chopping Table", category: 4, desc: "Reinforced steel table fitted with commercial poly cutting board." },
  { name: "Dough Kneading Table", category: 4, desc: "Heavy sturdy work table designed for dough rolling and bakery prep." },
  { name: "SS Storage Rack 4 Tier", category: 4, desc: "4-tier stainless steel open storage shelving rack." },
  { name: "Pot Rack", category: 4, desc: "Heavy duty tubular steel rack for drying large pots and pans." },
  { name: "Wall Mounted SS Shelf", category: 4, desc: "Space-saving wall-mounted stainless steel shelf." },
  { name: "Onion / Potato Bin", category: 4, desc: "Perforated stainless steel ventilated storage bin for vegetables." },
  { name: "Plate Rack", category: 4, desc: "Stainless steel dish draining and storage rack." },

  // 6. Commercial Ranges
  { name: "2 Burner Indian Gas Range", category: 5, desc: "Heavy duty 2-burner commercial gas stove." },
  { name: "3 Burner Indian Gas Range", category: 5, desc: "Commercial 3-burner gas cooking range." },
  { name: "4 Burner Continental Range", category: 5, desc: "4-burner range with heavy cast iron pan supports." },
  { name: "2 Burner Chinese Range", category: 5, desc: "High pressure wok burner range with water wash channel." },
  { name: "Stock Pot Stove (Single)", category: 5, desc: "Low-height heavy duty burner stove for stock pots." },
  { name: "Bulk Cooking Gas Range", category: 5, desc: "Extra heavy cast iron gas range for large vessel cooking." },
  { name: "SS Charcoal Tandoor", category: 5, desc: "Stainless steel jacketed traditional clay tandoor oven." },
  { name: "Gas Tandoor Oven", category: 5, desc: "Gas-fired commercial clay tandoor for naans and kebabs." },
  { name: "Shawarma Machine 2 Burner", category: 5, desc: "Vertical gas burner rotisserie for Shawarma." },
  { name: "Commercial Salamander", category: 5, desc: "Overhead radiant heater for grilling, melting, and browning." },

  // 7. Refrigeration
  { name: "Visi Cooler 300L", category: 6, desc: "Glass door display chiller for beverages and dairy." },
  { name: "Visi Cooler 500L", category: 6, desc: "Double door commercial glass display refrigerator." },
  { name: "Under Counter Chiller 2 Door", category: 6, desc: "Under-counter refrigerated worktable unit." },
  { name: "Under Counter Chiller 3 Door", category: 6, desc: "3-door stainless steel under-counter chiller." },
  { name: "Chest Freezer 300L", category: 6, desc: "Hard-top commercial deep freezer." },
  { name: "Chest Freezer 500L", category: 6, desc: "Large storage commercial chest freezer." },
  { name: "Vertical Freezer 2 Door", category: 6, desc: "Upright stainless steel commercial freezer." },
  { name: "Vertical Chiller 4 Door", category: 6, desc: "Reach-in 4 door commercial storage chiller." },
  { name: "Salad Prep Counter", category: 6, desc: "Refrigerated preparation counter with ingredient pan cutouts." },
  { name: "Water Cooler 150L", category: 6, desc: "Commercial stainless steel chilled water dispenser." },

  // 8. Display & Service
  { name: "Hot Bain Marie 4 Pan", category: 7, desc: "Electric warm food display counter with GN pan inserts." },
  { name: "Hot Bain Marie 6 Pan", category: 7, desc: "6-pan hot food holding service counter." },
  { name: "Sweet Display Counter (Curved Glass)", category: 7, desc: "Refrigerated curved glass showcase for sweet shops." },
  { name: "Bakery Display Counter", category: 7, desc: "Glass display cabinet for cakes and pastries." },
  { name: "Chaat Counter Unit", category: 7, desc: "Customized stainless steel counter for street food preparation." },
  { name: "Juice Counter", category: 7, desc: "Stainless steel preparation counter with ice trough for juice bars." },
  { name: "Ice Cream Display Freezer", category: 7, desc: "Glass canopy scooping freezer for ice cream parlors." },
  { name: "Popcorn Machine", category: 7, desc: "Commercial heated popcorn popping unit." },
  { name: "Hot Dog Roller", category: 7, desc: "Commercial rotating roller grill for sausages." },
  { name: "Food Warming Showcase", category: 7, desc: "Heated glass cabinet display for hot bakery items." },

  // 9. Wash & Exhaust
  { name: "Single Sink Unit", category: 8, desc: "Commercial deep bowl stainless steel washing sink." },
  { name: "Double Sink Unit", category: 8, desc: "Two-compartment pot and dish washing sink." },
  { name: "Pre-Wash Sink with Spray", category: 8, desc: "Pre-rinse sink fitted with overhead spray tap." },
  { name: "Commercial Dishwasher (Hood Type)", category: 8, desc: "High-capacity pass-through hood dishwasher." },
  { name: "Under Counter Dishwasher", category: 8, desc: "Compact under-counter glass and dish washer." },
  { name: "SS Exhaust Hood (Island)", category: 8, desc: "Stainless steel island exhaust canopy with baffle filters." },
  { name: "SS Exhaust Hood (Wall Mounted)", category: 8, desc: "Wall-mounted commercial kitchen ventilation hood." },
  { name: "Fresh Air Makeup Unit", category: 8, desc: "Commercial kitchen air supply and ventilation unit." },
  { name: "Grease Trap", category: 8, desc: "Stainless steel under-sink grease interceptor unit." },
  { name: "Garbage Bin Trolley", category: 8, desc: "Mobile stainless steel frame waste container." },

  // 10. Bakery & Sweets
  { name: "Single Deck Baking Oven", category: 9, desc: "Commercial gas/electric tray deck baking oven." },
  { name: "Double Deck Baking Oven", category: 9, desc: "Two-deck commercial baking oven for bakeries." },
  { name: "Rotary Rack Oven", category: 9, desc: "Industrial rotating rack baking oven." },
  { name: "Spiral Dough Mixer 20kg", category: 9, desc: "Heavy duty spiral dough kneader for bread and pizza." },
  { name: "Planetary Mixer 20L", category: 9, desc: "Multi-purpose commercial mixer for batter, cream, and dough." },
  { name: "Dough Sheeter", category: 9, desc: "Floor-standing commercial pastry dough laminating sheeter." },
  { name: "Bread Slicer", category: 9, desc: "Electric commercial loaf slicing machine." },
  { name: "Conveyor Pizza Oven", category: 9, desc: "Continuous conveyor baking oven for pizza." },
  { name: "Waffle Baker", category: 9, desc: "Commercial cast iron waffle iron." },
  { name: "Commercial Blender", category: 9, desc: "High speed commercial bar and kitchen blender." }
];

const generatedData = products.map((p, i) => {
  const catName = categories[p.category];
  const catImgs = categoryImagePlaceholders[catName] || ["__COMING_SOON__"];
  const frontImg = catImgs[i % catImgs.length];
  const sideImg = catImgs[(i + 1) % catImgs.length] || "__COMING_SOON__";
  const keywords = getProductKeywords(p.name, catName, p.desc);

  return {
    id: i + 1,
    name: p.name,
    category: catName,
    description: p.desc,
    keywords: keywords,
    images: {
      front: frontImg,
      side: sideImg,
      rear: "__COMING_SOON__",
      top: "__COMING_SOON__",
      detail: "__COMING_SOON__"
    },
    price: null,
    specs: []
  };
});

const importsHeader = `import comingSoon from './assets/coming-soon.svg';
import imgDosaTawa from './assets/images/dosa-tawa.jpg';
import imgIdliSteamer from './assets/images/idli-steamer.jpg';
import imgWetGrinder from './assets/images/wet-grinder.jpg';
import imgRiceBoiler from './assets/images/rice-boiler.jpg';
import imgWorkTable from './assets/images/work-table.jpg';
import imgGasRange from './assets/images/gas-range.jpg';
import imgVisiCooler from './assets/images/visi-cooler.jpg';
import imgBainMarie from './assets/images/bain-marie.jpg';
import imgExhaustHood from './assets/images/exhaust-hood.jpg';
import imgBakingOven from './assets/images/baking-oven.jpg';
import imgTandoorOven from './assets/images/tandoor-oven.jpg';
`;

let fileContent = importsHeader + '\n' +
  'export const products = ' + JSON.stringify(generatedData, null, 2) + ';\n\n' +
  'export const categories = ' + JSON.stringify(categories, null, 2) + ';\n';

fileContent = fileContent
  .replaceAll('"__COMING_SOON__"', 'comingSoon')
  .replaceAll('"__IMG_DOSA_TAWA__"', 'imgDosaTawa')
  .replaceAll('"__IMG_IDLI_STEAMER__"', 'imgIdliSteamer')
  .replaceAll('"__IMG_WET_GRINDER__"', 'imgWetGrinder')
  .replaceAll('"__IMG_RICE_BOILER__"', 'imgRiceBoiler')
  .replaceAll('"__IMG_WORK_TABLE__"', 'imgWorkTable')
  .replaceAll('"__IMG_GAS_RANGE__"', 'imgGasRange')
  .replaceAll('"__IMG_VISI_COOLER__"', 'imgVisiCooler')
  .replaceAll('"__IMG_BAIN_MARIE__"', 'imgBainMarie')
  .replaceAll('"__IMG_EXHAUST_HOOD__"', 'imgExhaustHood')
  .replaceAll('"__IMG_BAKING_OVEN__"', 'imgBakingOven')
  .replaceAll('"__IMG_TANDOOR_OVEN__"', 'imgTandoorOven');

fs.writeFileSync('src/data.js', fileContent);
console.log("data.js generated successfully with keywords and bundled local assets!");
