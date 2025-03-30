
import { productService } from './productService';
import { categoryService } from './categoryService';
import { brandService } from './brandService';
import { customerService } from './customerService';

// Exportar cada serviço individualmente
export { productService, categoryService, brandService, customerService };

// Exportar todos os serviços em um objeto único
export default {
  products: productService,
  categories: categoryService,
  brands: brandService,
  customers: customerService
};
