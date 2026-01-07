import type { Supplier } from "../../interfaces/dto/supplier.interface";

export const formatSupplierNames = ( suppliers: Supplier[] ) => {
    const suppliersNames = suppliers?.map(suppliers => `${suppliers.name} ${suppliers.lastname}`) ?? []
    return suppliersNames
}

export const getSupplierByFormattedName = ( suppliers: Supplier[], supplierNameFormatted: string ): Supplier | null => {
    const supplier = suppliers?.find(supplier => `${supplier.name} ${supplier.lastname}` === supplierNameFormatted)
    if (!supplier) return null
    return supplier
}