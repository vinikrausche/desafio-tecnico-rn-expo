import { productModel } from './product';
import { storeModel } from './store';

// ! This facade preserves the public Mirage API while each entity owns its own model file.
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
