// The JanShram service catalogue, as the business wrote it (October 2026).
//
// Imported from the Categories screen with one click; the import skips every
// name that already exists, so it is safe to run again and never touches what
// an admin has edited. Icons are lucide names, the same library the icon picker
// uses.
//
// The tree is two levels deep (the API refuses deeper nesting), so the
// numbered categories are the top level and `group` — the thirteen headings
// above them — is kept for ordering and for the import preview only.
//
// Category names are unique across the whole tree. Where the list repeats a
// trade under a second heading it lives under the first only, and a name that
// would read the same in two contexts is qualified ("Car AC Repair", "Event
// Cook") rather than dropped.

export interface CatalogueEntry {
  group: string;
  name: string;
  icon: string;
  children: string[];
}

const HOME = 'Home Services & Household Work';
const BUILD = 'Construction, Labour & Contractor Services';
const EDU = 'Education, Teachers & Training';
const TAILOR = 'Tailoring, Clothing & Fashion';
const BEAUTY = 'Beauty, Massage & Personal Care';
const IT = 'Mobile, Laptop, Computer & IT Services';
const VEHICLE = 'Vehicle Repair & Transport';
const AGRI = 'Agriculture, Gardening & Rural Services';
const HEALTH = 'Health Support & Care Services';
const EVENT = 'Security & Event Services';
const OFFICE = 'Office, Business & Professional Services';
const RETAIL = 'Delivery, Warehouse & Retail';
const OTHER = 'Other Local Services';

export const CATEGORY_CATALOGUE: CatalogueEntry[] = [
  // ── 1. Home Services & Household Work ──
  {
    group: HOME, name: 'Home Repair & Maintenance', icon: 'hammer',
    children: [
      'Carpenter / बढ़ई', 'Electrician / बिजली मिस्त्री', 'Plumber / प्लंबर', 'Painter / पेंटर',
      'Mason / राजमिस्त्री', 'Furniture Repair & Assembly', 'Door, Window & Lock Repair',
      'Ceiling Fan & Light Installation', 'Switchboard & Wiring Repair', 'Welding & Grill Work',
      'POP, False Ceiling & Gypsum Work', 'Tiles & Marble Fitting', 'Waterproofing & Leakage Repair',
      'Glass & Aluminium Work',
    ],
  },
  {
    group: HOME, name: 'Home & Toilet Cleaning', icon: 'sparkles',
    children: [
      'Full House Cleaning', 'Bathroom Cleaning', 'Toilet / WC Deep Cleaning', 'Indian Toilet Cleaning',
      'Western Toilet Cleaning', 'Kitchen Deep Cleaning', 'Chimney Cleaning', 'Sofa & Carpet Cleaning',
      'Mattress Cleaning', 'Water Tank Cleaning', 'Drain & Sewer Cleaning', 'Septic Tank Cleaning',
      'Balcony & Terrace Cleaning', 'Office & Shop Cleaning', 'Move-in / Move-out Cleaning',
      'Post-construction Cleaning',
    ],
  },
  {
    group: HOME, name: 'Appliance Repair & Installation', icon: 'air-vent',
    children: [
      'AC Installation, Repair & Servicing', 'Refrigerator Repair', 'Washing Machine Repair', 'LED TV Repair',
      'Microwave & Oven Repair', 'Geyser Repair', 'Water Purifier / RO Repair', 'Cooler & Fan Repair',
      'Inverter & Battery Repair', 'Solar Panel Installation & Repair', 'Water Pump & Motor Repair',
      'Dishwasher Repair',
    ],
  },
  {
    group: HOME, name: 'Domestic & Daily Help', icon: 'hand-helping',
    children: [
      'Maid / घरेलू सहायिका', 'Housekeeping', 'Cooking / Home Cook', 'Kitchen Helper', 'Laundry & Ironing',
      'Utensil Cleaning', 'Home Organising', 'Gardener / माली', 'Driver for Family', 'Home Shifting Helper',
      'Packing & Unpacking', 'Errand & Household Assistance',
    ],
  },

  // ── 2. Construction, Labour & Contractor Services ──
  {
    group: BUILD, name: 'Construction Workers', icon: 'hard-hat',
    // Mason, tile/marble fitter, POP and waterproofing are in Home Repair &
    // Maintenance; "Helper" already exists under Home Services.
    children: ['Construction Helper', 'Construction Labour', 'Shuttering Carpenter', 'Bar Bender', 'Steel Fixer', 'Plaster Worker'],
  },
  {
    group: BUILD, name: 'Painting & Finishing', icon: 'paint-roller',
    children: ['House Painter', 'Commercial Painter', 'Spray Painter', 'Texture Painter', 'Polish Worker', 'Putty Worker', 'Wallpaper Installer'],
  },
  {
    group: BUILD, name: 'Skilled Technicians', icon: 'cog',
    // Electrician and plumber are in Home Repair & Maintenance.
    children: ['Welder', 'Fabricator', 'Solar Technician', 'Lift Technician', 'Generator Technician', 'CCTV Installer'],
  },
  {
    group: BUILD, name: 'Contractor & Project Services', icon: 'clipboard-list',
    children: [
      'House Construction Contractor', 'Renovation Contractor', 'Civil Contractor', 'Interior Contractor',
      'Electrical Contractor', 'Plumbing Contractor', 'Road Contractor', 'Labour Contractor',
      'Material Supply Contractor',
    ],
  },
  {
    group: BUILD, name: 'Labour Hiring', icon: 'users',
    children: [
      'Daily Wage Workers', 'Unskilled Labour', 'Skilled Labour', 'Loading / Unloading Workers', 'Factory Labour',
      'Warehouse Workers', 'Agricultural Labour', 'Seasonal Labour', 'Bulk Workforce Hiring',
    ],
  },

  // ── 3. Education, Teachers & Training ──
  {
    group: EDU, name: 'Home Tutors & School Teachers', icon: 'graduation-cap',
    children: [
      'Nursery / KG Teacher', 'Primary Teacher (Class 1–5)', 'Middle School Teacher (Class 6–8)',
      'Secondary Teacher (Class 9–10)', 'Senior Secondary Teacher (Class 11–12)', 'Mathematics Teacher',
      'Science Teacher', 'Physics, Chemistry & Biology', 'English, Hindi & Sanskrit', 'Social Science & History',
      'Geography & Civics', 'Accountancy & Economics', 'Home Tuition / Group Tuition', 'Online Tutor',
      'Special Learning Support',
    ],
  },
  {
    group: EDU, name: 'Coaching & Professional Training', icon: 'book-open',
    children: [
      'Competitive Exam Coaching', 'SSC / Railway / Banking Preparation', 'UPSC / BPSC Coaching',
      'NEET / JEE Coaching', 'Spoken English', 'Computer Basics & MS Office', 'Programming & Coding Teacher',
      'Tally & Accounting Training', 'Typing Teacher', 'Digital Marketing Training', 'Graphic Design Training',
      'Web Development Training', 'Vocational & Skill Training', 'Music, Dance & Art Teacher',
      'Yoga & Fitness Instructor',
    ],
  },

  // ── 4. Tailoring, Clothing & Fashion ──
  {
    group: TAILOR, name: 'Tailor & Stitching', icon: 'scissors',
    children: [
      "Men's Tailor", "Ladies' Tailor", "Kids' Tailor", 'Blouse Stitching', 'Suit Stitching',
      'Shirt & Trouser Stitching', 'Kurta-Pajama Stitching', 'Salwar-Suit Stitching', 'Uniform Stitching',
      'Designer Wear',
    ],
  },
  {
    group: TAILOR, name: 'Alteration & Repair', icon: 'ruler',
    children: ['Length Alteration', 'Fitting Adjustment', 'Zip Replacement', 'Button Replacement', 'Torn Cloth Repair', 'Fall-Pico', 'Saree Finishing'],
  },
  {
    group: TAILOR, name: 'Embroidery & Handicrafts', icon: 'flower',
    children: ['Hand Embroidery', 'Machine Embroidery', 'Zari Work', 'Crochet', 'Knitting', 'Quilting', 'Decorative Stitching'],
  },
  {
    group: TAILOR, name: 'Fashion & Custom Clothing', icon: 'shirt',
    children: ['Fashion Designer', 'Boutique Services', 'Bridal Outfit Design', 'Costume Designer', 'Custom Measurements', 'Made-to-Order Clothing'],
  },
  {
    group: TAILOR, name: 'Laundry & Fabric Care', icon: 'washing-machine',
    // Carpet cleaning is "Sofa & Carpet Cleaning" under Home & Toilet Cleaning.
    children: ['Dry Cleaning', 'Steam Ironing', 'Clothes Washing', 'Stain Removal', 'Curtain Cleaning'],
  },

  // ── 5. Beauty, Massage & Personal Care ──
  {
    group: BEAUTY, name: 'Salon & Grooming', icon: 'brush',
    children: [
      'Barber / Haircut', 'Hair Styling', 'Beard Trimming', 'Home Salon for Men', "Women's Home Salon",
      'Makeup Artist', 'Bridal Makeup', 'Facial & Cleanup', 'Hair Spa & Hair Styling', 'Manicure & Pedicure',
      'Mehndi Artist', 'Nail Art', 'Waxing & Threading',
    ],
  },
  {
    // Non-sexual wellness services only; providers need a verified
    // professional profile and a clear service description.
    group: BEAUTY, name: 'Massage & Wellness', icon: 'flower-2',
    children: [
      'Full Body Relaxation Massage', 'Head & Shoulder Massage', 'Foot Massage', 'Back Massage',
      'Spa & Wellness Therapist', 'Chair Massage', 'Yoga Instructor', 'Meditation Instructor',
      'General Wellness Services',
    ],
  },

  // ── 6. Mobile, Laptop, Computer & IT Services ──
  {
    group: IT, name: 'Mobile Repair & Services', icon: 'smartphone',
    children: [
      'Android Mobile Repair', 'iPhone Repair', 'Display / Screen Replacement', 'Battery Replacement',
      'Charging Port Repair', 'Speaker & Microphone Repair', 'Camera Repair', 'Water Damage Repair',
      'Software & OS Installation', 'Data Backup & Transfer', 'Mobile Unlocking (authorized only)',
      'Mobile Accessories Installation', 'Tablet Repair', 'Doorstep Mobile Repair',
    ],
  },
  {
    group: IT, name: 'Laptop & Computer Repair', icon: 'laptop',
    children: [
      'Laptop Repair', 'Desktop PC Repair', 'MacBook Repair', 'Motherboard Repair', 'RAM & SSD Upgrade',
      'Keyboard & Trackpad Repair', 'Laptop Screen Replacement', 'Battery & Charging Repair',
      'Windows Installation', 'Linux Installation', 'Driver & Software Installation',
      'Virus & Malware Removal', 'Data Recovery', 'Printer & Scanner Repair', 'Computer Assembly',
      'Networking & Wi-Fi Setup', 'Remote Technical Support',
    ],
  },
  {
    group: IT, name: 'IT & Software Services', icon: 'code',
    children: [
      'Website Development', 'E-commerce Website Development', 'Android App Development', 'iOS App Development',
      'Custom Software Development', 'SaaS & CRM Development', 'ERP & Billing Software',
      'School Management Software', 'Hospital Management Software', 'UI/UX Design', 'Figma Design',
      'Frontend Development', 'Backend Development', 'API Integration', 'Database Development',
      'Cloud & Server Setup', 'Website Maintenance', 'Bug Fixing & Performance Optimization',
    ],
  },
  {
    group: IT, name: 'Digital Marketing & Creative', icon: 'megaphone',
    children: [
      'SEO Services', 'Local SEO & Google Business Profile', 'Social Media Management',
      'Facebook & Instagram Ads', 'Google Ads', 'Content Writing', 'Hindi & English Translation',
      'Logo & Brand Identity Design', 'Poster & Banner Design', 'Video Editing', 'Reels & Short Video Creation',
      'Product Photography', 'AI Content & Automation', 'Lead Generation', 'Email Marketing',
    ],
  },

  // ── 7. Vehicle Repair & Transport ──
  {
    group: VEHICLE, name: 'Two-Wheeler Services', icon: 'bike',
    children: ['Bike Mechanic', 'Scooter Repair', 'Puncture Repair', 'Bike Battery Replacement', 'Bike Washing', 'Bike Servicing', 'Tyre Replacement'],
  },
  {
    group: VEHICLE, name: 'Car Repair & Maintenance', icon: 'car',
    children: [
      'Car Mechanic', 'Car Electrician', 'Car AC Repair', 'Denting & Painting', 'Car Washing', 'Car Detailing',
      'Car Tyre Service', 'Car Battery Service', 'Roadside Breakdown Support',
    ],
  },
  {
    group: VEHICLE, name: 'Commercial Vehicle Services', icon: 'bus',
    children: ['Truck Mechanic', 'Tractor Mechanic', 'JCB Mechanic', 'Bus Repair', 'Commercial Vehicle Electrician'],
  },
  {
    group: VEHICLE, name: 'Transport & Moving', icon: 'truck',
    // Packers & Movers already exists under Transport & Logistics; loading and
    // unloading is "Loading / Unloading Workers" under Labour Hiring.
    children: ['Bike Taxi (where permitted)', 'Car Driver', 'Goods Transport', 'Mini Truck', 'Pickup Van', 'Local Delivery'],
  },

  // ── 8. Agriculture, Gardening & Rural Services ──
  {
    group: AGRI, name: 'Farming Labour', icon: 'wheat',
    children: ['Sowing', 'Transplanting', 'Harvesting', 'Crop Cutting', 'Farm Helpers', 'Seasonal Agricultural Labour'],
  },
  {
    group: AGRI, name: 'Farm Equipment', icon: 'tractor',
    children: ['Tractor Rental', 'Tractor Driver', 'Rotavator', 'Harvester', 'Agricultural Pump Repair', 'Agricultural Machinery Maintenance'],
  },
  {
    group: AGRI, name: 'Gardening & Landscaping', icon: 'trees',
    // Gardener is "Gardener / माली" under Domestic & Daily Help.
    children: ['Lawn Maintenance', 'Tree Pruning', 'Plant Care', 'Nursery Services', 'Landscaping', 'Irrigation Setup'],
  },
  {
    group: AGRI, name: 'Livestock & Dairy Support', icon: 'milk',
    children: ['Dairy Farm Workers', 'Cattle Shed Cleaning', 'Animal Feeding Assistance', 'Poultry Farm Workers', 'Fish Farming Labour'],
  },

  // ── 9. Health Support & Care Services ──
  {
    group: HEALTH, name: 'Elderly Care', icon: 'heart-handshake',
    children: ['Senior Citizen Companion', 'Daily Assistance for Elderly', 'Mobility Support', 'Household Assistance for Elderly'],
  },
  {
    group: HEALTH, name: 'Childcare', icon: 'baby',
    children: ['Babysitter', 'Nanny', 'After-School Child Supervision'],
  },
  {
    group: HEALTH, name: 'Patient Assistance', icon: 'accessibility',
    children: ['Non-Medical Patient Attendant', 'Hospital Attendant', 'Mobility Assistance', 'Home-Care Support'],
  },
  {
    // Qualification verification required — not ordinary unqualified labour.
    group: HEALTH, name: 'Allied Professional Services', icon: 'stethoscope',
    children: ['Physiotherapist', 'Licensed Nursing Professional', 'Other Qualified Health Professional'],
  },

  // ── 10. Security & Event Services ──
  {
    group: EVENT, name: 'Security Services', icon: 'shield',
    children: ['Security Guard', 'Event Security', 'Residential Security', 'Office Security', 'Security Supervisor', 'CCTV Monitoring'],
  },
  {
    group: EVENT, name: 'Event Management', icon: 'party-popper',
    children: ['Wedding Planner', 'Event Coordinator', 'Decorator', 'Tent House', 'Stage Setup', 'Lighting Technician', 'Sound System Operator'],
  },
  {
    group: EVENT, name: 'Event Staff', icon: 'concierge-bell',
    // "Cook" already exists under Home Services.
    children: ['Waiter', 'Catering Helper', 'Event Cook', 'Event Housekeeping Staff', 'Event Cleaner', 'Temporary Event Worker', 'Photographer', 'Videographer'],
  },

  // ── 11. Office, Business & Professional Services ──
  {
    group: OFFICE, name: 'Office Support', icon: 'briefcase',
    children: ['Office Boy', 'Receptionist', 'Office Assistant', 'Office Housekeeping Staff', 'Pantry Worker', 'Data Entry Operator'],
  },
  {
    group: OFFICE, name: 'Accounting & Documentation', icon: 'calculator',
    children: ['Accountant', 'Bookkeeper', 'GST Documentation Assistance', 'Billing Operator', 'Payroll Support', 'Business Documentation Assistance'],
  },
  {
    group: OFFICE, name: 'Business Support', icon: 'headset',
    children: ['Virtual Assistant', 'Customer Support Executive', 'Telecaller', 'Sales Executive', 'HR Recruiter', 'Business Consultant'],
  },
  {
    // Subject to appropriate qualifications.
    group: OFFICE, name: 'Legal & Compliance Professionals', icon: 'scale',
    children: ['Lawyer', 'Legal Documentation Professional', 'Company Compliance Consultant', 'Tax Professional'],
  },

  // ── 12. Delivery, Warehouse & Retail ──
  {
    group: RETAIL, name: 'Delivery Services', icon: 'package',
    children: ['Local Parcel Delivery', 'Courier Pickup', 'Document Delivery', 'Grocery Delivery', 'Business Delivery Staff'],
  },
  {
    group: RETAIL, name: 'Warehouse Services', icon: 'warehouse',
    // Loading/unloading is under Labour Hiring.
    children: ['Picker', 'Packer', 'Inventory Helper', 'Warehouse Supervisor'],
  },
  {
    group: RETAIL, name: 'Retail & Shop Services', icon: 'store',
    children: ['Shop Helper', 'Sales Assistant', 'Cashier', 'Store Manager', 'Stock Arranger', 'Merchandiser'],
  },
  {
    group: RETAIL, name: 'Food & Catering', icon: 'chef-hat',
    // Home cook and kitchen helper are under Domestic & Daily Help.
    children: ['Chef', 'Tiffin Service', 'Catering Worker', 'Bakery Worker', 'Food Preparation Assistant'],
  },

  // ── 13. Other Local Services ──
  {
    // "Pest Control" itself is already a sub-category under Home Services.
    group: OTHER, name: 'Pest Control Services', icon: 'bug',
    children: ['Termite Treatment', 'Mosquito Control', 'Cockroach Treatment', 'Rodent Control', 'General Pest Control'],
  },
  {
    group: OTHER, name: 'Water & Sanitation', icon: 'droplets',
    // Drain and septic tank cleaning are under Home & Toilet Cleaning.
    children: ['Water Tanker Services', 'Water Filter Servicing', 'Sewer Maintenance'],
  },
  {
    group: OTHER, name: 'Rental Services', icon: 'tent',
    children: ['Tools & Equipment Rental', 'Construction Equipment Rental', 'Furniture Rental', 'Tent & Event Equipment Rental'],
  },
  {
    group: OTHER, name: 'Miscellaneous', icon: 'key-round',
    // Packer is under Warehouse Services, helper under Home Services, CCTV
    // under Skilled Technicians.
    children: ['Key Maker', 'Locksmith', 'Signboard Installer', 'Appliance Installation', 'Other Local Services'],
  },
];

export interface ImportPlan {
  /** Top-level categories to create, with the sub-categories to create inside. */
  create: { entry: CatalogueEntry; parentId: string | null; children: string[] }[];
  newCategories: number;
  newSubCategories: number;
  /** Names skipped because they already exist somewhere in the tree. */
  skipped: string[];
}

const key = (s: string) => s.trim().toLowerCase();

/**
 * Works out what an import would create against the tree as it is now.
 *
 * Matching is case-insensitive: "AC repair" and "AC Repair" would be two rows
 * to the database but one trade to everybody looking at the list.
 */
export function planImport(
  existing: { id: string; name: string; children?: { name: string }[] }[],
  catalogue: CatalogueEntry[] = CATEGORY_CATALOGUE,
): ImportPlan {
  const topLevel = new Map(existing.map((c) => [key(c.name), c.id]));
  const taken = new Set<string>();
  for (const c of existing) {
    taken.add(key(c.name));
    for (const s of c.children ?? []) taken.add(key(s.name));
  }

  const plan: ImportPlan = { create: [], newCategories: 0, newSubCategories: 0, skipped: [] };
  for (const entry of catalogue) {
    const k = key(entry.name);
    let parentId: string | null = topLevel.get(k) ?? null;
    if (!parentId && taken.has(k)) {
      // The name is a sub-category elsewhere; making it a parent too would
      // collide, so leave this heading for the admin to resolve by hand.
      plan.skipped.push(entry.name);
      continue;
    }
    if (!parentId) {
      plan.newCategories += 1;
      taken.add(k);
    }

    const children: string[] = [];
    for (const child of entry.children) {
      const ck = key(child);
      if (taken.has(ck)) {
        plan.skipped.push(child);
        continue;
      }
      taken.add(ck);
      children.push(child);
    }
    plan.newSubCategories += children.length;
    if (!parentId || children.length) plan.create.push({ entry, parentId, children });
  }
  return plan;
}
