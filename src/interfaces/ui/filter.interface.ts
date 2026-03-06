import type { Roles } from "../dto/user.interface"

// General filters

export interface PriceRange {
    minPrice: number | null
    maxPrice: number | null
}

export interface DateRange {
    dateStart: string | null,
    dateEnd: string | null
}

// Sale filters

export interface FilterSales {
    dates: DateRange,
    price: PriceRange,
    user: {
        id: string | null,
        name: string | null
    },
}

export interface FilterSalesDTO {
    userId: string | null,
    dateStart: string | null,
    dateEnd: string | null,
    minPrice: number | null,
    maxPrice: number | null
}

// Purchase filters

export interface FilterPurchases extends FilterSales  {
    supplier: {
        id: string | null,
        name: string | null
    },
}

export interface FilterPurchasesDTO {
  userId: string | null
  supplierId: string | null
  dateStart: string | null
  dateEnd: string | null
  minPrice: number | null
  maxPrice: number | null
}

// User filters

export interface FilterUsers {
    userName: string | null,
    status: string | null,
    role: Roles | null
}

export interface FilterUsersDTO {
  userName: string | null,
  status: string | null,
  role: Roles | null
}