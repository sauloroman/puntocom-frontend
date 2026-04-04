import React, { useEffect } from 'react'
import { useDashboard } from '../../../../shared/hooks'

export const DashboardPurchases: React.FC = () => {
    const { stats, getPurchasesStats } = useDashboard()

    useEffect(() => {
        if ( stats.purchasesStats! ) getPurchasesStats()
    }, [])

    return (
        <div>DashboardPurchases</div>
    )
}
