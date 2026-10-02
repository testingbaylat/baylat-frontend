export interface Property {
  _id: string;
  name: string;
  description: string;
  address: string;
  state: string;
  regularPrice: number; 
  discountPrice?: number | null;
  offer: boolean;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  furnished: boolean;
  parking: boolean;
  type: 'sale' | 'rent';
  images: string[];
  youtubeUrl?: string;
  createdAt: string;
  featured?: boolean;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDesc: string;
  icon: string;
  image: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
  propertyType: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: string;
  publishedAt: string;
  readTime: number;
}

export interface Estate {
  id: string;
  name: string;
  location: string;
  description: string;
  phases: EstatePhase[];
  totalUnits: number;
  completedUnits: number;
  image: string;
  status: 'planning' | 'ongoing' | 'completed';
}

export interface EstatePhase {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'ongoing' | 'upcoming';
  completionDate: string;
  progress: number;
}

export interface FilterState {
  search: string;
  type: 'all' | 'sale' | 'rent';
  sort: 'newest' | 'price-asc' | 'price-desc';
  furnished: boolean | undefined;
  parking: boolean | undefined;
  offer: boolean | undefined;
}
