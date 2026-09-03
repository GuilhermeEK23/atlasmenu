import type { Product } from '@/types';

// ==========================================================
// productsService — camada de acesso a dados de produtos.
// Retorna dados vazios até a conexão com um backend real.
// ==========================================================

export async function getProducts(): Promise<Product[]> {
  return [];
}

export async function getProductById(_id: string): Promise<Product | null> {
  return null;
}

export async function createProduct(
  _data: Omit<Product, 'id'>
): Promise<Product | null> {
  // TODO: implementar chamada ao backend
  return null;
}

export async function updateProduct(
  _id: string,
  _data: Partial<Product>
): Promise<void> {
  // TODO: implementar chamada ao backend
}

export async function deleteProduct(_id: string): Promise<void> {
  // TODO: implementar chamada ao backend
}
