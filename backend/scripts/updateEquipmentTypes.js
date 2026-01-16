import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../data');
const equipmentPath = path.join(DATA_DIR, 'equipment.json');

// Read equipment data
const equipment = JSON.parse(fs.readFileSync(equipmentPath, 'utf8'));

// Keywords to identify equipment types
const typePatterns = {
  'WEAPON': ['dominion', 'lance', 'blast', 'bow', 'hammer', 'shield', 'scepter', 'khan', 'pride'],
  'HELMET': ['helm', 'mask', 'diadem'],
  'CHEST': ['armor', 'plate', 'cloak', 'milky way', 'navar'],
  'GLOVES': ['armband', 'vambraces', 'choice', 'grips', 'gauntlets', 'sacred grips'],
  'LEGS': ['ash of the dawn', 'tassets', 'greaves', 'eternal night', 'chausses'],
  'BOOTS': ['boots', 'shio', 'return'],
  'ACCESSORY': ['ring', 'horn', 'gg', 'vengeance', 'hilt', 'dagger', 'pendant', 'glory', 'fury', 'doom', 'trial', 'amulet']
};

// Set names for equipment
const setPatterns = {
  'Hellish Wasteland': ['hw', 'hellish'],
  'Dragon\'s Breath': ['db', 'dragon'],
  'Eternal Empire': ['ee', 'eternal empire'],
  'Garb of the Glorious Goddess': ['gg', 'glorious goddess'],
};

function determineType(name) {
  const lowerName = name.toLowerCase();

  // Check patterns in order (more specific first)
  for (const [type, patterns] of Object.entries(typePatterns)) {
    for (const pattern of patterns) {
      if (lowerName.includes(pattern)) {
        return type;
      }
    }
  }

  // Default based on position/common equipment
  return 'WEAPON';
}

function determineSet(name) {
  const lowerName = name.toLowerCase();

  if (lowerName.includes('hw') || lowerName.includes('hellish')) return 'Hellish Wasteland';
  if (lowerName.includes('db') || lowerName.includes('dragon')) return 'Dragon\'s Breath';
  if (lowerName.includes('ee') || lowerName.includes('eternal empire')) return 'Eternal Empire';
  if (lowerName.includes('gg') || lowerName.includes('goddess') || lowerName.includes('glorious')) return 'Garb of the Glorious Goddess';

  return null;
}

// Update each equipment item
const updatedEquipment = equipment.map(item => {
  const type = determineType(item.name);
  const set = determineSet(item.name);

  return {
    ...item,
    type: type,
    set_name: set
  };
});

// Log the changes
console.log('Equipment Type Distribution:');
const typeCounts = {};
updatedEquipment.forEach(item => {
  typeCounts[item.type] = (typeCounts[item.type] || 0) + 1;
});
console.log(typeCounts);

console.log('\nEquipment Set Distribution:');
const setCounts = {};
updatedEquipment.forEach(item => {
  const setName = item.set_name || 'No Set';
  setCounts[setName] = (setCounts[setName] || 0) + 1;
});
console.log(setCounts);

// Save updated data
fs.writeFileSync(equipmentPath, JSON.stringify(updatedEquipment, null, 2));
console.log('\n✅ Equipment data updated successfully!');
