import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProductInCart, Product } from "../../interfaces/product.interface";
import type { MetaPagination } from "../../interfaces/pagination.interface";

interface PosState {
  products: Product[] | null;
  productToAdd: Product | null;
  cart: ProductInCart[] | null;
  categoryActive: string | null;
  isLoading: boolean;
  pagination: MetaPagination & { itemsPerPage: number };
}

const initialState: PosState = {
  products: null,
  productToAdd: null,
  cart: [],
  categoryActive: "",
  isLoading: false,
  pagination: {
    page: 1,
    total: 1,
    totalPages: 1,
    itemsPerPage: 50,
  },
};

export const posSlice = createSlice({
  name: "pos",
  initialState,
  reducers: {
    setProductToAdd: (state, { payload }: PayloadAction<Product>) => {
      state.productToAdd = payload;
    },

    setProducts: (state, { payload }: PayloadAction<Product[]>) => {
      state.products = payload;
    },

    updateProduct: (state, {payload}: PayloadAction<{ productId: string, quantityDiscount: number }>) => {
      state.products = state.products?.map( pro => {
        if ( pro.id === payload.productId) {
          pro.stock = pro.stock - payload.quantityDiscount
        }
        return pro
      }) ?? []
    },

    setCategoryActive: (state, { payload }: PayloadAction<string | null>) => {
      state.categoryActive = payload;
    },

    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },

    setProductsMetaPagination: (
      state,
      { payload }: PayloadAction<MetaPagination & { itemsPerPage: number }>
    ) => {
      state.pagination = payload;
    },

    addProductToCart: (state, { payload }: PayloadAction<ProductInCart>) => {
      state.cart?.push(payload);
    },

    deleteProductFromCart: (state, { payload }: PayloadAction<string>) => {
      state.cart = state.cart?.filter(
        (pro) => pro.product.id !== payload
      ) ?? [];
    },

    clearCart: ( state ) => {
      state.cart = []
    },

    increaseQuantity: (state, { payload }: PayloadAction<string>) => {
      const productInCart = state.cart?.find(
        (pro) => pro.product.id === payload
      );
      if (productInCart) {
        productInCart.quantity++;
      }
    },

    decreaseQuantity: (state, { payload }: PayloadAction<string>) => {
      const productInCart = state.cart?.find(
        (pro) => pro.product.id === payload
      );

      if (!productInCart) return;

      if (productInCart.quantity > 1) {
        productInCart.quantity--;
      } else {
        state.cart = state.cart?.filter(
          (pro) => pro.product.id !== payload
        ) ?? [];
      }
    },
  },
});

export const {
  setProductToAdd,
  setProducts,
  setCategoryActive,
  setIsLoading,
  setProductsMetaPagination,
  addProductToCart,
  deleteProductFromCart,
  increaseQuantity,
  clearCart,
  decreaseQuantity,
  updateProduct,
} = posSlice.actions;
