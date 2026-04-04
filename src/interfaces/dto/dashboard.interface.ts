export interface SalesStats {
    salesbycategory: {
        categoryid: string,
        categoryname: string,
        categoryicon: string,
        totalsales: number,
        quantitysold: number,
        percetage: number
    }[],
    salesByDate: {
        date: string
        total: number
    }[],
    salesByUser: {
        userid: string
        username: string,
        role: string,
        totalsales: number,
        orderscount: number,
        averageordervalue: number,
        percentage: number
    }[],
    productsWithoutSales: {
        productid: string
        productname: string
        stock: number
    }[],
    salesSummary: {
        totalorders: number,
        averageordervalue: number,
        maxordervalue: number,
        minordervalue: number
    },
    getTopSellingProducts: {
        productid: string
        productname: string
        quantitysold: number
        totalgenerated: number
    }[]
}

export interface PurchasesStats {
    purchaseSummary: {
        totalOrders: number,
        averageOrderValue: number,
        maxOrderValue: number,
        minOrderValue: number
    },
    purchasesByDate: {
        date: string
        total: number
    }[],
    purchasesBySupplier: {
        supplierId: string,
        supplierCompany: string,
        totalPurchases: number,
        ordersCount: number,
        percentage: number
    }[],
}

export interface KpisStats {
    totalSales: number
    totalPurchases: number
    netProfit: number,
    criticalStockProducts: number,
    totalActiveProducts: number,
    totalStockValue: number,
    totalActiveUsers: number
}

export interface ProductsStats {
    productsCritialStock: {
        productId: string,
        productName: string,
        stock: number,
        stockMin: number,
        stockValue: number
    }[],
    productsByCategory: {
        categoryId: string,
        categoryName: string,
        categoryIcon: string,
        productCount: number,
        activeProductCount: number
    }[],
    inventoryAdjustmentSummary: {
        totalAdjustments: number
        totalEntradas: number
        totalSalidas: number
        totalUnitsAdded: number
        totalUnitsRemoved: number
    },
    productsMostAdjusted: {
        productId: string
        productName: string
        adjustmentCount: number
        totalUnitsAdded: number
        totalUnitsRemoved: number
    }[]
}

export interface StatsSlice {
    salesStats?: SalesStats,
    purchasesStats?: PurchasesStats,
    kpisStats?: KpisStats,
    productsStats?: ProductsStats
}

export interface ChartDataPoint {
  date: string
  sales: number
  purchases: number
}

// Responses
export interface SalesStatsResponse {
    ok: boolean,
    stats: SalesStats
}

export interface PurchasesStatsResponse {
    ok: boolean,
    stats: PurchasesStats
}

export interface KpisStatsResponse {
    ok: boolean,
    stats: KpisStats
}

export interface ProductsStatsResponse {
    ok: boolean,
    stats: ProductsStats
}