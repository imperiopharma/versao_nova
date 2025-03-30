
/**
 * Representa uma marca de produto na loja
 */
export interface Brand {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  logo: string;
  logoUrl?: string;
  status?: 'active' | 'inactive';
  category?: string;
}

/**
 * Tipos de categorias de marcas
 */
export type BrandCategory = 'imported' | 'premium' | 'national' | 'various';

/**
 * Interface que organiza marcas por categoria
 */
export interface BrandsByCategory {
  imported: Brand[];
  premium: Brand[];
  national: Brand[];
  various: Brand[];
}
