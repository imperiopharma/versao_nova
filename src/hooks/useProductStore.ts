
import { useState, useEffect } from 'react';

// Singleton para armazenar os dados globalmente entre componentes
class ProductStore {
  private static instance: ProductStore;
  private products: any[] = [];
  private brands: any[] = [];
  private categories: any[] = [];
  private listeners: Function[] = [];

  private constructor() {
    // Inicializa com alguns dados de exemplo
    this.products = [
      {
        id: '1',
        name: 'Whey Protein Isolado',
        brand: 'Growth',
        price: 149.90,
        originalPrice: 189.90,
        image: 'https://via.placeholder.com/300x300?text=Whey+Protein',
        sku: 'WHEY-ISO-1',
        category: 'Proteínas',
        description: 'Whey Protein Isolado de alta qualidade',
        status: 'active',
        costPrice: 99.90,
        sellingPrice: 149.90,
        promoPrice: 129.90,
        stock: 50,
      },
      {
        id: '2',
        name: 'Creatina Monohidratada',
        brand: 'Optimum Nutrition',
        price: 89.90,
        originalPrice: 109.90,
        image: 'https://via.placeholder.com/300x300?text=Creatina',
        sku: 'CREAT-100',
        category: 'Suplementos',
        description: 'Creatina pura monohidratada',
        status: 'active',
        costPrice: 59.90,
        sellingPrice: 89.90,
        promoPrice: 79.90,
        stock: 30,
      },
    ];

    this.brands = [
      {
        id: 'growth',
        name: 'Growth',
        slug: 'growth',
        description: 'Marca nacional de suplementos de alta qualidade',
        status: 'active',
        logoUrl: 'https://via.placeholder.com/200x100?text=Growth',
        category: 'national'
      },
      {
        id: 'optimum',
        name: 'Optimum Nutrition',
        slug: 'optimum-nutrition',
        description: 'Marca internacional de suplementos premium',
        status: 'active',
        logoUrl: 'https://via.placeholder.com/200x100?text=Optimum+Nutrition',
        category: 'imported'
      },
    ];

    this.categories = [
      {
        id: 'proteinas',
        name: 'Proteínas',
        slug: 'proteinas',
        description: 'Suplementos proteicos para ganho de massa muscular',
        status: 'active'
      },
      {
        id: 'suplementos',
        name: 'Suplementos',
        slug: 'suplementos',
        description: 'Suplementos diversos para performance',
        status: 'active'
      },
    ];
  }

  public static getInstance(): ProductStore {
    if (!ProductStore.instance) {
      ProductStore.instance = new ProductStore();
    }
    return ProductStore.instance;
  }

  // Métodos para produtos
  getProducts(): any[] {
    return [...this.products];
  }

  addProduct(product: any): void {
    // Gera ID se não existir
    if (!product.id) {
      product.id = Date.now().toString();
    }
    this.products = [...this.products, product];
    this.notifyListeners();
  }

  updateProduct(product: any): void {
    this.products = this.products.map(p => 
      p.id === product.id ? product : p
    );
    this.notifyListeners();
  }

  // Métodos para marcas
  getBrands(): any[] {
    return [...this.brands];
  }

  addBrand(brand: any): void {
    // Gera ID se não existir
    if (!brand.id) {
      brand.id = brand.slug || Date.now().toString();
    }
    this.brands = [...this.brands, brand];
    this.notifyListeners();
  }

  updateBrand(brand: any): void {
    this.brands = this.brands.map(b => 
      b.id === brand.id ? brand : b
    );
    this.notifyListeners();
  }

  // Métodos para categorias
  getCategories(): any[] {
    return [...this.categories];
  }

  addCategory(category: any): void {
    // Gera ID se não existir
    if (!category.id) {
      category.id = category.slug || Date.now().toString();
    }
    this.categories = [...this.categories, category];
    this.notifyListeners();
  }

  updateCategory(category: any): void {
    this.categories = this.categories.map(c => 
      c.id === category.id ? category : c
    );
    this.notifyListeners();
  }

  // Gerenciamento de listeners para reatividade
  subscribe(listener: Function): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }
}

export function useProductStore() {
  const store = ProductStore.getInstance();
  const [products, setProducts] = useState<any[]>(store.getProducts());
  const [brands, setBrands] = useState<any[]>(store.getBrands());
  const [categories, setCategories] = useState<any[]>(store.getCategories());

  useEffect(() => {
    // Inscreve-se para atualizações no store
    const unsubscribe = store.subscribe(() => {
      setProducts(store.getProducts());
      setBrands(store.getBrands());
      setCategories(store.getCategories());
    });

    return unsubscribe;
  }, []);

  return {
    products,
    brands,
    categories,
    addProduct: (product: any) => store.addProduct(product),
    updateProduct: (product: any) => store.updateProduct(product),
    addBrand: (brand: any) => store.addBrand(brand),
    updateBrand: (brand: any) => store.updateBrand(brand),
    addCategory: (category: any) => store.addCategory(category),
    updateCategory: (category: any) => store.updateCategory(category),
  };
}
