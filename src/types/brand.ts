
export type BrandCategory = 'imported' | 'premium' | 'national' | 'various';

export interface Brand {
  id: string;
  name: string;
  logo: string;
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
