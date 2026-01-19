import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import connectDB from '../config/database.js';
import Commander from '../models/Commander.js';
import Equipment from '../models/Equipment.js';
import Inscription from '../models/Inscription.js';
import Armament from '../models/Armament.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../data');

async function seedDatabase() {
  try {
    // Connect to database
    await connectDB();

    console.log('\n🌱 Starting database seeding...\n');

    // Clear existing reference data (not governor data)
    console.log('🗑️  Clearing existing reference data...');
    await Commander.deleteMany({});
    await Equipment.deleteMany({});
    await Inscription.deleteMany({});
    await Armament.deleteMany({});
    console.log('✅ Existing reference data cleared\n');

    // Seed Commanders
    console.log('👤 Seeding Commanders...');
    const commandersData = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'commanders.json'), 'utf8'));
    await Commander.insertMany(commandersData);
    console.log(`✅ Seeded ${commandersData.length} commanders\n`);

    // Seed Equipment
    console.log('⚔️  Seeding Equipment...');
    const equipmentData = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'equipment.json'), 'utf8'));
    await Equipment.insertMany(equipmentData);
    console.log(`✅ Seeded ${equipmentData.length} equipment items\n`);

    // Seed Inscriptions
    console.log('📜 Seeding Inscriptions...');
    const inscriptionsData = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'inscriptions.json'), 'utf8'));
    await Inscription.insertMany(inscriptionsData);
    console.log(`✅ Seeded ${inscriptionsData.length} inscriptions\n`);

    // Seed Armaments (formations)
    console.log('🛡️  Seeding Armaments...');
    const armamentsData = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'armaments.json'), 'utf8'));
    await Armament.insertMany(armamentsData);
    console.log(`✅ Seeded ${armamentsData.length} armaments\n`);

    console.log('🎉 Database seeding completed successfully!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
