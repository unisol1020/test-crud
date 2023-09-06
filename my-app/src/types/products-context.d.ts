import {IProduct} from './api/product';
import {Dispatch, SetStateAction} from 'react';

export interface IProductsContext {
  products: IProduct[];
  setProducts: Dispatch<SetStateAction<IProduct[]>>;
}
