import type { Product } from "../../interfaces/product.interface";

export const productsValidToSale = ( products: Product[] ): Product[] => {
    return products.filter( pro => pro.stock > 0 && pro.isActive )
}