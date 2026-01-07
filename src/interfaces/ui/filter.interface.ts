export interface Filter {
    dates: DateRange,
    price: PriceRange,
    supplier: {
        id: string | null,
        name: string | null
    },
    user: {
        id: string | null,
        name: string | null
    },
}

export interface PriceRange {
    minPrice: number | null
    maxPrice: number | null
}

export interface DateRange {
    dateStart: string | null,
    dateEnd: string | null
}