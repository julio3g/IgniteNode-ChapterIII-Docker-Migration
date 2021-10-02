import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ImportCateogoryController } from './ImportCategoryController';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

const categoriesRepository = CategoriesRepository.getInstance();
const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);
const importCateogoryController = new ImportCateogoryController(
  importCategoryUseCase,
);

export { importCateogoryController };
