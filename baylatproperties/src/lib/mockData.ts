import { Property, Service, Testimonial, TeamMember, BlogPost, Estate } from '@/types';

// export const MOCK_PROPERTIES: Property[] = [
//   {
//     id: 'prop-001',
//     name: 'Luxurious 5-Bedroom Detached Duplex',
//     description: 'A stunning fully-detached duplex nestled in the heart of Lekki Phase 1, featuring contemporary architecture, marble flooring, a fitted kitchen, and a beautifully landscaped garden. Perfect for families seeking comfort and style in one of Lagos\'s most prestigious neighbourhoods.',
//     address: '14 Admiralty Way, Lekki Phase 1',
//     state: 'Lagos State',
//     regularPrice: 285000000,
//     discountPrice: 265000000,
//     offer: true,
//     bedrooms: 5,
//     bathrooms: 6,
//     sqft: 4200,
//     furnished: true,
//     parking: true,
//     type: 'sale',
//     images: [
//       'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
//       'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
//       'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80',
//       'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
//       'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80'],

//     createdAt: '2026-07-10T08:00:00Z',
//     featured: true
//   },
//   {
//     id: 'prop-002',
//     name: 'Modern 3-Bedroom Apartment with Ocean View',
//     description: 'Experience elevated living in this beautifully designed 3-bedroom apartment on Victoria Island. Floor-to-ceiling windows offer breathtaking ocean views. The unit comes with a fully-equipped kitchen, en-suite bathrooms, and 24/7 security.',
//     address: 'Block 7, Ocean Drive Estate, Victoria Island',
//     state: 'Lagos State',
//     regularPrice: 850000,
//     offer: false,
//     bedrooms: 3,
//     bathrooms: 3,
//     sqft: 1800,
//     furnished: true,
//     parking: true,
//     type: 'rent',
//     images: [
//       'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
//       'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
//       'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
//       'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80'],

//     createdAt: '2026-07-12T09:00:00Z',
//     featured: true
//   },
//   {
//     id: 'prop-003',
//     name: 'Executive 4-Bedroom Terrace in Maitama',
//     description: 'A tastefully finished 4-bedroom terrace in the exclusive Maitama district of Abuja. This property boasts premium finishes, a private garden, American-style kitchen, and is located minutes from the Central Business District.',
//     address: '22 Adetokunbo Ademola Crescent, Maitama',
//     state: 'FCT',
//     regularPrice: 175000000,
//     offer: false,
//     bedrooms: 4,
//     bathrooms: 4,
//     sqft: 3100,
//     furnished: false,
//     parking: true,
//     type: 'sale',
//     images: [
//       'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80',
//       'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80',
//       'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=1200&q=80',
//       'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1200&q=80'],

//     createdAt: '2026-07-08T10:00:00Z',
//     featured: true
//   },
//   {
//     id: 'prop-004',
//     name: 'Smart 2-Bedroom Flat in Gwarinpa',
//     description: 'A well-maintained 2-bedroom flat in the serene Gwarinpa Estate, Abuja. Features include a spacious living room, modern bathroom tiles, fitted wardrobes, and an uninterrupted power supply via solar backup.',
//     address: 'Plot 45, 4th Avenue, Gwarinpa Estate',

//     state: 'FCT',
//     regularPrice: 320000,
//     offer: false,
//     bedrooms: 2,
//     bathrooms: 2,
//     sqft: 1100,
//     furnished: false,
//     parking: true,
//     type: 'rent',
//     images: [
//       'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80',
//       'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80',
//       'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80'],

//     createdAt: '2026-07-15T07:00:00Z',
//     featured: false
//   },
//   {
//     id: 'prop-005',
//     name: 'Palatial 6-Bedroom Mansion, Ikoyi',
//     description: 'Unmatched opulence awaits in this palatial 6-bedroom mansion in the prestigious Ikoyi neighbourhood. Spanning over 6,000 sqft, it features a private swimming pool, cinema room, staff quarters, and a 4-car garage.',
//     address: '8 Bourdillon Road, Ikoyi',

//     state: 'Lagos State',
//     regularPrice: 450000000,
//     discountPrice: 420000000,
//     offer: true,
//     bedrooms: 6,
//     bathrooms: 7,
//     sqft: 6200,
//     furnished: true,
//     parking: true,
//     type: 'sale',
//     images: [
//       'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80',
//       'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1200&q=80',
//       'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=80',
//       'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80',
//       'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80'],

//     createdAt: '2026-07-05T08:00:00Z',
//     featured: true
//   },
//   {
//     id: 'prop-006',
//     name: 'Brand New 3-Bedroom Bungalow, GRA Port Harcourt',
//     description: 'A newly built 3-bedroom bungalow in the Government Residential Area of Port Harcourt. Features include quality tiles, a large compound, borehole water, and a diesel generator. Ideal for young families.',
//     address: 'Plot 19, Peter Odili Road, GRA Phase 2',
//     state: 'Rivers State',
//     regularPrice: 95000000,
//     offer: false,
//     bedrooms: 3,
//     bathrooms: 3,
//     sqft: 1650,
//     furnished: false,
//     parking: true,
//     type: 'sale',
//     images: [
//       'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200&q=80',
//       'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
//       'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80'],

//     createdAt: '2026-07-18T11:00:00Z',
//     featured: true
//   },
//   {
//     id: 'prop-007',
//     name: 'Serviced 1-Bedroom Studio, Oniru',
//     description: 'A premium fully-serviced studio apartment in Oniru Private Estate. The unit includes a kitchenette, smart TV, high-speed internet, and access to shared facilities including a pool and gym.',
//     address: 'Block A, Oniru Private Estate, Victoria Island Extension',

//     state: 'Lagos State',
//     regularPrice: 450000,
//     offer: false,
//     bedrooms: 1,
//     bathrooms: 1,
//     sqft: 650,
//     furnished: true,
//     parking: false,
//     type: 'rent',
//     images: [
//       'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=1200&q=80',
//       'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200&q=80'],

//     createdAt: '2026-07-20T12:00:00Z',
//     featured: false
//   },
//   {
//     id: 'prop-008',
//     name: 'Commercial Plaza, Wuse Zone 5',
//     description: 'A prime commercial property in Wuse Zone 5, Abuja. The building has 12 shops on the ground floor and 8 offices on the first floor, with ample parking. Ideal for retail or corporate lease.',
//     address: '3 Aminu Kano Crescent, Wuse Zone 5',

//     state: 'FCT',
//     regularPrice: 320000000,
//     offer: false,
//     bedrooms: 0,
//     bathrooms: 4,
//     sqft: 8500,
//     furnished: false,
//     parking: true,
//     type: 'sale',
//     images: [
//       'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
//       'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80'],

//     createdAt: '2026-07-02T09:00:00Z',
//     featured: false
//   },
//   {
//     id: 'prop-009',
//     name: 'Cozy 4-Bedroom Detached House, Ajah',
//     description: 'A beautifully maintained 4-bedroom detached house in the fast-growing Ajah area of Lagos. Set within a secured estate with CCTV, 24/7 security, and excellent road access to the Lekki-Epe Expressway.',
//     address: 'Pinnacle Estate, Ogombo Road, Ajah',

//     state: 'Lagos State',
//     regularPrice: 120000000,
//     discountPrice: 110000000,
//     offer: true,
//     bedrooms: 4,
//     bathrooms: 4,
//     sqft: 2400,
//     furnished: false,
//     parking: true,
//     type: 'sale',
//     images: [
//       'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80',
//       'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1200&q=80',
//       'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80'],

//     createdAt: '2026-07-22T08:00:00Z',
//     featured: false
//   }];
 

export const MOCK_SERVICES: Service[] = [
  {
    id: 'svc-001',
    slug: 'property-sales',
    title: 'Property Sales',
    shortDesc: 'Expert guidance through every step of buying or selling residential and commercial property in Nigeria.',
    description: 'Our property sales team combines deep market knowledge with a personalised approach to help you buy or sell with confidence. From market valuation to closing, we manage the entire process.',
    icon: 'Home',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_14b35a26d-1769083178481.png",
    features: ['Market valuation', 'Buyer-seller matching', 'Legal documentation', 'Negotiation support', 'Post-sale follow-up']
  },
  {
    id: 'svc-002',
    slug: 'property-consultancy',
    title: 'Property Consultancy',
    shortDesc: 'Expert advice on market trends, investment opportunities, and property valuation to help you make informed decisions.',
    description: 'Strategic real estate investment guidance tailored for local and diaspora clients. Our expert advisory team analyses target growth corridors and yields to help you build a high-performing property portfolio.',
    icon: 'Key',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f3392fb8-1772549802423.png",
    features: ['Market analysis', 'Portfolio planning', 'ROI projections', 'Diaspora investment advisory', 'Risk assessment']
  },
  {
    id: 'svc-003',
    slug: 'estate-development',
    title: 'Estate Development',
    shortDesc: 'Developing premium residential estates with world-class infrastructure across Lagos, Abuja, and beyond.',
    description: 'Baylat Properties develops thoughtfully designed residential estates that blend modern architecture with community living. Our developments feature paved roads, drainage, electricity, and security.',
    icon: 'Building2',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1caa41952-1785303191127.png",
    features: ['Land acquisition', 'Infrastructure development', 'Architectural design', 'Construction management', 'Community amenities']
  },
  {
    id: 'svc-004',
    slug: 'property-management',
    title: 'Property Management',
    shortDesc: 'Full-service property management so you earn without the stress of day-to-day property oversight.',
    description: 'Let us handle your investment. Our property management service covers maintenance, tenant relations, rent collection, and financial reporting so your asset keeps performing.',
    icon: 'Settings',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_11d142379-1773228942526.png",
    features: ['24/7 maintenance', 'Tenant management', 'Financial reporting', 'Vacancy marketing', 'Legal compliance']
  },
  {
    id: 'svc-005',
    slug: 'land-survey',
    title: 'Land Survey',
    shortDesc: 'Professional geographic mapping, perimeter layout design, and certified boundary delineations.',
    description: 'Our licensed surveyors execute comprehensive land charting, topographic mapping, and perimeter mapping. We deliver precision surveys essential for securing legal titles, building approvals, and preventing documentation disputes.',
    icon: 'TrendingUp',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_18de2c42e-1767497889251.png",
    features: ['Boundary surveys', 'Topographic charting', 'Governor’s Consent charting', 'Perimeter mapping', 'Beacons installation']
  },
  {
    id: 'svc-006',
    slug: 'architectural-drawing',
    title: 'Architectural Drawing',
    shortDesc: 'Bespoke modern architectural drafting and structural design frameworks tailored to your building vision.',
    description: 'Transforming conceptual living requirements into precise structural Blueprints. Our architectural design team provides detailed 2D layouts and luxury 3D renderings optimized for swift town planning and construction approvals.',
    icon: 'FileText',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_147c4e432-1785066341991.png",
    features: ['2D Floor plans', '3D Exterior concepts', 'Structural engineering drawings', 'Mechanical/Electrical specs', 'Approval-ready blue prints']
  }
]

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-001',
    name: 'Adaeze Okonkwo',
    location: 'Lagos, Nigeria',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80',
    rating: 5,
    text: 'Baylat Properties made buying my first home in Lekki an absolute breeze. Their team was professional, responsive, and genuinely cared about finding me the right property within my budget. I couldn\'t be happier with my new home!',
    propertyType: 'Property Purchase'
  },
  {
    id: 'test-002',
    name: 'Emeka Nwosu',
    location: 'Abuja, Nigeria',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80',
    rating: 5,
    text: 'As a diaspora investor, I was nervous about buying property in Nigeria remotely. Baylat handled everything — from site visits to documentation. My Maitama property is now generating excellent rental income. Highly recommended!',
    propertyType: 'Investment Property'
  },
  {
    id: 'test-003',
    name: 'Fatima Al-Hassan',
    location: 'Abuja, Nigeria',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    rating: 5,
    text: 'The property management service is exceptional. I own three flats in Gwarinpa and Baylat handles everything — tenant screening, maintenance, rent collection. My investment is truly stress-free. Thank you, Baylat!',
    propertyType: 'Property Management'
  },
  {
    id: 'test-004',
    name: 'Chukwuemeka Eze',
    location: 'Port Harcourt, Nigeria',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    rating: 5,
    text: 'I sold my GRA property through Baylat and got ₦8 million more than I expected. Their valuation team accurately priced the property and their marketing brought serious buyers within two weeks. Outstanding service!',
    propertyType: 'Property Sale'
  },
  {
    id: 'test-005',
    name: 'Ngozi Adeleke',
    location: 'Lagos, Nigeria',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&q=80',
    rating: 5,
    text: 'Renting through Baylat was the smoothest experience I\'ve had in Lagos. No agent wahala, transparent pricing, and the apartment was exactly as advertised. The team even helped me negotiate a better rate. 10/10!',
    propertyType: 'Property Rental'
  }];


export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-001',
    slug: 'lagos-real-estate-market-2026',
    title: 'Lagos Real Estate Market: What Buyers Need to Know in 2026',
    excerpt: 'With Lekki and Ikoyi continuing to dominate luxury sales and emerging areas like Epe and Ibeju-Lekki gaining traction, we break down where the smart money is moving in Lagos this year.',
    content: '',
    category: 'Market Insights',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f8ff025c-1776899623307.png",
    author: 'Dada Lateef',
    publishedAt: '2026-07-15T08:00:00Z',
    readTime: 7
  },
  {
    id: 'blog-002',
    slug: 'buying-property-nigeria-diaspora-guide',
    title: 'The Complete Diaspora Guide to Buying Property in Nigeria',
    excerpt: 'Millions of Nigerians in the UK, US, and Canada are investing back home. Here\'s everything you need to know about buying property in Nigeria safely from abroad — legal steps, trusted agents, and red flags to avoid.',
    content: '',
    category: 'Buyer\'s Guide',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_14a923308-1768146199099.png",
    author: 'Chisom Obi',
    publishedAt: '2026-07-08T09:00:00Z',
    readTime: 10
  },
  {
    id: 'blog-003',
    slug: 'abuja-vs-lagos-property-investment',
    title: 'Abuja vs Lagos: Which City Offers Better Property Investment Returns?',
    excerpt: 'Both cities offer compelling investment cases, but they\'re very different markets. We compare capital appreciation, rental yields, infrastructure, and risk profiles to help you decide where to invest.',
    content: '',
    category: 'Investment',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a0120a1d-1766417202347.png",
    author: 'Aminu Garba',
    publishedAt: '2026-06-28T10:00:00Z',
    readTime: 8
  },
  {
    id: 'blog-004',
    slug: 'nigeria-land-documentation-guide',
    title: 'C of O, R of O, Governor\'s Consent: Understanding Nigerian Land Documents',
    excerpt: 'Land documentation in Nigeria can be confusing. This guide explains Certificate of Occupancy, Right of Occupancy, Deed of Assignment, and other critical documents — and what to watch out for.',
    content: '',
    category: 'Legal Guide',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_18d9e84f8-1773071494665.png",
    author: 'Dada Lateef',
    publishedAt: '2026-06-20T08:00:00Z',
    readTime: 9
  }];


export const MOCK_ESTATES: Estate[] = [
  {
    id: 'est-001',
    name: 'Baylat Greens Estate',
    location: 'Epe, Lagos State',
    description: 'A 50-plot residential estate in the fast-growing Epe corridor, featuring paved roads, underground drainage, perimeter fencing, and a central park. Perfect for families seeking a secure, community-oriented neighbourhood.',
    totalUnits: 50,
    completedUnits: 38,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    status: 'ongoing',
    phases: [
      { id: 'ph-001-1', name: 'Phase 1 — Land Clearing & Survey', description: 'Land acquisition, topographic survey, and clearing of 25 plots', status: 'completed', completionDate: 'March 2024', progress: 100 },
      { id: 'ph-001-2', name: 'Phase 2 — Infrastructure', description: 'Road construction, drainage installation, electricity substation', status: 'completed', completionDate: 'September 2024', progress: 100 },
      { id: 'ph-001-3', name: 'Phase 3 — Building Construction', description: 'Construction of 38 residential units across the estate', status: 'ongoing', completionDate: 'December 2026', progress: 76 },
      { id: 'ph-001-4', name: 'Phase 4 — Finishing & Handover', description: 'Landscaping, amenities installation, and unit handover', status: 'upcoming', completionDate: 'March 2027', progress: 0 }]

  },
  {
    id: 'est-002',
    name: 'Baylat Heights',
    location: 'Lugbe, Abuja FCT',
    description: 'An 80-unit mixed-development estate in Lugbe, Abuja. Features detached and semi-detached homes with modern architecture, solar street lighting, a community centre, and gated access.',
    totalUnits: 80,
    completedUnits: 80,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_175a18ddf-1785303191203.png",
    status: 'completed',
    phases: [
      { id: 'ph-002-1', name: 'Phase 1 — Design & Planning', description: 'Architectural design, regulatory approvals, and site preparation', status: 'completed', completionDate: 'January 2022', progress: 100 },
      { id: 'ph-002-2', name: 'Phase 2 — Foundation & Structure', description: 'Foundation laying and structural framework for all 80 units', status: 'completed', completionDate: 'August 2022', progress: 100 },
      { id: 'ph-002-3', name: 'Phase 3 — Finishing', description: 'Internal and external finishing, tiling, painting, and fixtures', status: 'completed', completionDate: 'April 2023', progress: 100 },
      { id: 'ph-002-4', name: 'Phase 4 — Handover', description: 'Final inspections, documentation, and owner handover ceremonies', status: 'completed', completionDate: 'June 2023', progress: 100 }]

  },
  {
    id: 'est-003',
    name: 'Baylat Palms',
    location: 'Rumuola, Port Harcourt',
    description: 'An upcoming 30-unit luxury estate in Port Harcourt\'s Rumuola axis. Designed with tropical modern architecture, each unit will include a private garden, rooftop terrace, and smart home features.',
    totalUnits: 30,
    completedUnits: 0,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fbe58399-1785303190762.png",
    status: 'planning',
    phases: [
      { id: 'ph-003-1', name: 'Phase 1 — Land Acquisition', description: 'Final land title transfer and topographic survey', status: 'ongoing', completionDate: 'September 2026', progress: 60 },
      { id: 'ph-003-2', name: 'Phase 2 — Design & Approvals', description: 'Architectural designs, structural engineering, and PHCCIMA approvals', status: 'upcoming', completionDate: 'December 2026', progress: 0 },
      { id: 'ph-003-3', name: 'Phase 3 — Construction', description: 'Full construction of 30 luxury units', status: 'upcoming', completionDate: 'December 2027', progress: 0 },
      { id: 'ph-003-4', name: 'Phase 4 — Handover', description: 'Finishing, landscaping, and owner handover', status: 'upcoming', completionDate: 'March 2028', progress: 0 }]

  }];


export const MOCK_TEAM: TeamMember[] = [
  {
    id: 'team-001',
    name: 'Dada Lateef Adebayo',
    role: 'Founder & Managing Director',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_15b05c936-1773071491610.png",
    bio: 'With over 10 years in Nigerian real estate, Lateef founded Baylat Properties with a vision to make premium property accessible to all Nigerians. He holds an MBA from the University of Lagos.'
  },
  {
    id: 'team-002',
    name: 'Chisom Obi',
    role: 'Head of Property Sales',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_18652e93b-1785303191930.png",
    bio: 'Chisom leads our sales team with 8 years of experience in Lagos luxury property. She has facilitated over ₦4 billion in property transactions and is known for her client-first approach.'
  },
  {
    id: 'team-003',
    name: 'Aminu Garba',
    role: 'Head of Estate Development',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_10c4306aa-1772939132516.png",
    bio: 'Aminu oversees all estate development projects from land acquisition to handover. A civil engineer by training, he ensures every Baylat development meets international construction standards.'
  },
  {
    id: 'team-004',
    name: 'Ngozi Adeleke',
    role: 'Property Management Lead',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ba262af1-1785303191453.png",
    bio: 'Ngozi manages Baylat\'s portfolio of over 120 properties under management. Her background in facilities management and client relations makes her the go-to expert for landlord services.'
  }];


export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}