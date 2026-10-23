import mongoose from 'mongoose';
import { connectDB, disconnectDB } from '../config/db.js';
import { User } from '../models/User.js';
import { Listing } from '../models/Listing.js';
import { Favorite } from '../models/Favorite.js';
import { Conversation } from '../models/Conversation.js';
import { Message } from '../models/Message.js';
import { Report } from '../models/Report.js';
import { AuditLog } from '../models/AuditLog.js';
import { USER_ROLES, LISTING_CONDITIONS, LISTING_STATUSES } from '../constants/index.js';

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('[Seed] Connected to database. Clearing old collections...');

    await Promise.all([
      User.deleteMany({}),
      Listing.deleteMany({}),
      Favorite.deleteMany({}),
      Conversation.deleteMany({}),
      Message.deleteMany({}),
      Report.deleteMany({}),
      AuditLog.deleteMany({})
    ]);

    console.log('[Seed] Creating demo users...');
    const adminPassword = await User.hashPassword('AdminPass123!');
    const sellerPassword = await User.hashPassword('SellerPass123!');
    const buyerPassword = await User.hashPassword('BuyerPass123!');

    const admin = await User.create({
      name: 'System Admin',
      email: 'admin@mobilemart.com',
      passwordHash: adminPassword,
      role: USER_ROLES.ADMIN,
      city: 'San Francisco, CA',
      phone: '+1 (555) 019-2831',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      bio: 'MobileMart Marketplace Operations and Trust & Safety Supervisor.'
    });

    const seller = await User.create({
      name: 'Alex Rivera',
      email: 'seller@mobilemart.com',
      passwordHash: sellerPassword,
      role: USER_ROLES.USER,
      city: 'Austin, TX',
      phone: '+1 (555) 349-8120',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
      bio: 'Tech enthusiast & verified phone upgrader. Selling gently used flagship hardware with pristine care.'
    });

    const buyer = await User.create({
      name: 'Sarah Chen',
      email: 'buyer@mobilemart.com',
      passwordHash: buyerPassword,
      role: USER_ROLES.USER,
      city: 'Seattle, WA',
      phone: '+1 (555) 782-9014',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
      bio: 'Mobile software developer looking for high-end test devices.'
    });

    console.log('[Seed] Seeding phone listings...');

    const sampleListings = [
      {
        sellerId: seller._id,
        title: 'Apple iPhone 16 Pro Max - 256GB - Desert Titanium (Factory Unlocked)',
        brand: 'Apple',
        model: 'iPhone 16 Pro Max',
        variant: '256GB / 8GB RAM',
        condition: LISTING_CONDITIONS.NEW,
        price: 1199,
        currency: 'USD',
        negotiable: false,
        city: 'Austin, TX',
        description: 'Brand new, sealed in original factory box. Purchased directly from Apple Store. Never activated, includes full 1-year Apple manufacturer warranty. Unlocked for all major GSM & CDMA carriers worldwide.',
        images: [
          'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80'
        ],
        specifications: {
          storage: '256GB',
          ram: '8GB',
          batteryHealth: 100,
          color: 'Desert Titanium',
          carrier: 'Unlocked',
          screenCondition: 'Flawless',
          accessoriesIncluded: ['Original Box', 'Braided USB-C Cable', 'Documentation']
        },
        status: LISTING_STATUSES.ACTIVE
      },
      {
        sellerId: seller._id,
        title: 'Samsung Galaxy S24 Ultra 5G - 512GB - Titanium Black (Mint Condition)',
        brand: 'Samsung',
        model: 'Galaxy S24 Ultra',
        variant: '512GB / 12GB RAM',
        condition: LISTING_CONDITIONS.LIKE_NEW,
        price: 980,
        currency: 'USD',
        negotiable: true,
        city: 'Austin, TX',
        description: 'Flawless Galaxy S24 Ultra with embedded S-Pen and Snapdragon 8 Gen 3. Kept in a Spigen case with tempered glass screen protector since day one. 99% battery health. Comes with original packaging.',
        images: [
          'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80'
        ],
        specifications: {
          storage: '512GB',
          ram: '12GB',
          batteryHealth: 99,
          color: 'Titanium Black',
          carrier: 'Unlocked',
          screenCondition: 'Flawless',
          accessoriesIncluded: ['S-Pen', 'Original Box', 'Fast Charging Cable']
        },
        status: LISTING_STATUSES.ACTIVE
      },
      {
        sellerId: seller._id,
        title: 'Google Pixel 9 Pro XL - 128GB - Porcelain (Certified Pre-Owned)',
        brand: 'Google',
        model: 'Pixel 9 Pro XL',
        variant: '128GB / 16GB RAM',
        condition: LISTING_CONDITIONS.GOOD,
        price: 749,
        currency: 'USD',
        negotiable: true,
        city: 'San Antonio, TX',
        description: 'Certified pre-owned Google Pixel 9 Pro XL with Gemini AI on-device processing. Minor hairline scratch on corner bezel (hardly visible). Cameras and 120Hz display are in immaculate working condition.',
        images: [
          'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'
        ],
        specifications: {
          storage: '128GB',
          ram: '16GB',
          batteryHealth: 95,
          color: 'Porcelain',
          carrier: 'Unlocked',
          screenCondition: 'Minor Wear',
          accessoriesIncluded: ['Charging Cable']
        },
        status: LISTING_STATUSES.ACTIVE
      },
      {
        sellerId: seller._id,
        title: 'OnePlus 12 5G - 256GB - Silky Black (100W SuperVOOC Charger Included)',
        brand: 'OnePlus',
        model: 'OnePlus 12',
        variant: '256GB / 12GB RAM',
        condition: LISTING_CONDITIONS.LIKE_NEW,
        price: 599,
        currency: 'USD',
        negotiable: false,
        city: 'Houston, TX',
        description: 'Hasselblad 4th Gen camera system with Qualcomm Snapdragon 8 Gen 3. Blazing 100W wired fast charging goes 1-100% in 26 minutes. Dual nano-SIM support, pristine body.',
        images: [
          'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80'
        ],
        specifications: {
          storage: '256GB',
          ram: '12GB',
          batteryHealth: 98,
          color: 'Silky Black',
          carrier: 'Unlocked',
          screenCondition: 'Flawless',
          accessoriesIncluded: ['100W SuperVOOC Adapter', 'Red Cable']
        },
        status: LISTING_STATUSES.ACTIVE
      },
      {
        sellerId: seller._id,
        title: 'Samsung Galaxy Z Fold6 - 512GB - Silver Shadow (Foldable Dual Screen)',
        brand: 'Samsung',
        model: 'Galaxy Z Fold6',
        variant: '512GB / 12GB RAM',
        condition: LISTING_CONDITIONS.NEW,
        price: 1450,
        currency: 'USD',
        negotiable: true,
        city: 'Dallas, TX',
        description: 'New factory sealed Galaxy Z Fold6. Ultra-thin folding glass with zero crease wear, IP48 water resistance, and Galaxy AI multi-window productivity.',
        images: [
          'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80'
        ],
        specifications: {
          storage: '512GB',
          ram: '12GB',
          batteryHealth: 100,
          color: 'Silver Shadow',
          carrier: 'Unlocked',
          screenCondition: 'Flawless',
          accessoriesIncluded: ['Original Sealed Box', 'Warranty Card']
        },
        status: LISTING_STATUSES.ACTIVE
      },
      {
        sellerId: seller._id,
        title: 'Apple iPhone 14 Pro Max - 128GB - Deep Purple (Fair / Great Value)',
        brand: 'Apple',
        model: 'iPhone 14 Pro Max',
        variant: '128GB / 6GB RAM',
        condition: LISTING_CONDITIONS.FAIR,
        price: 520,
        currency: 'USD',
        negotiable: true,
        city: 'Austin, TX',
        description: 'Dynamic Island, 48MP main camera. Has light cosmetic wear and micro-scratches on back glass, but screen is 100% responsive and Face ID works without issue. Battery health at 86%. Great budget flagship!',
        images: [
          'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
        ],
        specifications: {
          storage: '128GB',
          ram: '6GB',
          batteryHealth: 86,
          color: 'Deep Purple',
          carrier: 'Verizon (Unlocked)',
          screenCondition: 'Light Scratches',
          accessoriesIncluded: ['Lightning Cable']
        },
        status: LISTING_STATUSES.ACTIVE
      }
    ];

    const createdListings = await Listing.insertMany(sampleListings);
    console.log(`[Seed] Created ${createdListings.length} listings.`);

    // Add favorite for buyer
    await Favorite.create({
      userId: buyer._id,
      listingId: createdListings[0]._id
    });
    console.log('[Seed] Created demo favorite for buyer.');

    // Add demo conversation
    const demoConv = await Conversation.create({
      listingId: createdListings[1]._id,
      buyerId: buyer._id,
      sellerId: seller._id,
      proposedPrice: 950,
      lastMessage: 'Hi Alex! Would you be willing to do $950 cash if we meet tomorrow at the downtown library?',
      lastMessageAt: new Date()
    });

    await Message.create({
      conversationId: demoConv._id,
      senderId: buyer._id,
      body: 'Hi Alex! Would you be willing to do $950 cash if we meet tomorrow at the downtown library?'
    });

    await Message.create({
      conversationId: demoConv._id,
      senderId: seller._id,
      body: 'Hey Sarah! $950 sounds fair. The downtown library public lobby works great for me around 2 PM.'
    });

    console.log('[Seed] Created demo conversation and messages.');
    console.log('[Seed] Database successfully seeded!');
    await disconnectDB();
    process.exit(0);
  } catch (err) {
    console.error('[Seed Error] Failed to seed database:', err);
    await disconnectDB();
    process.exit(1);
  }
};

seedDatabase();
