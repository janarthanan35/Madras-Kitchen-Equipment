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

const FALLBACK_IMAGE = "__COMING_SOON__";

// Exact-match public domain / un-copyrighted high quality images for standard commercial equipment
const realImageMap = {
  "SS Work Table (4ft)": {
    front: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800",
    side: FALLBACK_IMAGE,
    rear: FALLBACK_IMAGE,
    top: FALLBACK_IMAGE,
    detail: FALLBACK_IMAGE
  },
  "SS Work Table (6ft)": {
    front: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800",
    side: FALLBACK_IMAGE,
    rear: FALLBACK_IMAGE,
    top: FALLBACK_IMAGE,
    detail: FALLBACK_IMAGE
  },
  "Visi Cooler 300L": {
    front: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&q=80&w=800",
    side: FALLBACK_IMAGE,
    rear: FALLBACK_IMAGE,
    top: FALLBACK_IMAGE,
    detail: FALLBACK_IMAGE
  },
  "Single Deck Baking Oven": {
    front: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=800",
    side: FALLBACK_IMAGE,
    rear: FALLBACK_IMAGE,
    top: FALLBACK_IMAGE,
    detail: FALLBACK_IMAGE
  },
  "Planetary Mixer 20L": {
    front: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=800",
    side: FALLBACK_IMAGE,
    rear: FALLBACK_IMAGE,
    top: FALLBACK_IMAGE,
    detail: FALLBACK_IMAGE
  }
};

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
  { name: "Tilting Wet Grinder 40L", category: 4, desc: "Heavy industrial 40 Liter granite wet grinder for high volume batter production." },
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
  const images = realImageMap[p.name] || {
    front: FALLBACK_IMAGE,
    side: FALLBACK_IMAGE,
    rear: FALLBACK_IMAGE,
    top: FALLBACK_IMAGE,
    detail: FALLBACK_IMAGE
  };

  return {
    id: i + 1,
    name: p.name,
    category: categories[p.category],
    description: p.desc,
    images: images,
    price: null, // "Contact for Price"
    specs: []   // "Contact us for specifications"
  };
});

let fileContent = 'import comingSoon from \'./assets/coming-soon.svg\';\n\n' +
  'export const products = ' + JSON.stringify(generatedData, null, 2) + ';\n\n' +
  'export const categories = ' + JSON.stringify(categories, null, 2) + ';\n';

fileContent = fileContent.replaceAll('"__COMING_SOON__"', 'comingSoon');

fs.writeFileSync('src/data.js', fileContent);
console.log("data.js generated successfully with imported asset fallback!");

