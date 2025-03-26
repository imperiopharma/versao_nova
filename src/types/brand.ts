
export type BrandCategory = 'imported' | 'premium' | 'national' | 'various';

export interface Brand {
  id: string;
  name: string;
  logo: string;
  description?: string;
  slug?: string;
  status?: string;
  category?: BrandCategory;
  logoUrl?: string; // Campo para a URL da logo armazenada no Supabase
}

export interface BrandCategories {
  imported: Brand[];
  premium: Brand[];
  national: Brand[];
  various: Brand[];
  categories: {
    id: string;
    name: string;
    icon: () => JSX.Element;
  }[];
}
