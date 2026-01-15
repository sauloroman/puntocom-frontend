import React from 'react'
import { KpiCard } from './'
import { IoIosTrendingUp } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { LuTriangleAlert } from "react-icons/lu";
import type { DashboardKpis } from '../../../interfaces/dto/dashboard.interface'


interface DashboardKpisProps {
  kpis: DashboardKpis
}

export const DashboardKpisSection: React.FC<DashboardKpisProps> = ({ kpis }) => {
  return (
    <section className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-6">

      <KpiCard
        title="Ventas totales"
        value={`$${kpis.totalSales.toLocaleString()}`}
        icon={<IoIosTrendingUp size={24} />}
      />

      <KpiCard
        title="Compras totales"
        value={`$${kpis.totalPurchases.toLocaleString()}`}
        icon={<FiShoppingCart size={24} />}
      />

      <KpiCard
        title="Productos en stock crítico"
        value={kpis.criticalStockProducts}
        icon={<LuTriangleAlert size={24} />}
      />

    </section>
  )
}
