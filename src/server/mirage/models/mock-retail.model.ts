import { productModel } from './product';
import { storeModel } from './store';

// ! Esta fachada preserva a API publica do Mirage sem misturar regras de produto e loja.
export const mockRetailModel = {
  createProduct: productModel.create,
  createStore: storeModel.create,
  deleteProduct: productModel.delete,
  deleteStore: storeModel.delete,
  getStore: storeModel.get,
  listProducts: productModel.list,
  listStores: storeModel.list,
  updateProduct: productModel.update,
  updateStore: storeModel.update,
};
