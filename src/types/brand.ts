
export type BrandCategory = 'imported' | 'premium' | 'national' | 'various';

export interface Brand {
  id: string;
  name: string;
  logo: string;
  description?: string;
  slug?: string;
  status?: string;
  category?: BrandCategory;
  logoUrl?: string; // Adicionando campo logoUrl para compatibilidade com o admin
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
