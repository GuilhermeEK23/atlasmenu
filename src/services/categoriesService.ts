import type { Category } from '@/types';

// ==========================================================
// categoriesService — camada de acesso a dados de categorias.
// Retorna dados vazios até a conexão com um backend real.
// ==========================================================

export async function getCategories(): Promise<Category[]> {
  return [];
}

export async function createCategory(
  _data: Omit<Category, 'id'>
): Promise<Category | null> {
  // TODO: implementar chamada ao backend
  return null;
}

export async function updateCategory(
  _id: string,
  _data: Partial<Category>
): Promise<void> {
  // TODO: implementar chamada ao backend
}

export async function deleteCategory(_id: string): Promise<void> {
  // TODO: implementar chamada ao backend
}
