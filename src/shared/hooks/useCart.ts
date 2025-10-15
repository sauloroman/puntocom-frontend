import { useSelector } from "react-redux"
import type { RootState } from "../../store"
import { useEffect, useState } from "react"

export const useCart = () => {
    
    const { cart } = useSelector( (state: RootState) => state.pos )
    const [ cartResults, setCartResult ] = useState({
        subtotal: 0,
        discount: 0,
        total: 0
    })

    const calculateTotal = () => {
        const subtotal = calculateSubtotal()
        const discount = calculateDiscount()
        setCartResult({
            subtotal,
            discount,
            total: subtotal - discount
        })
    }

    const calculateSubtotal = () => {
        return cart?.reduce((total, pro) => total + (pro.product.sellingPrice * pro.quantity), 0) ?? 0
    }

    const calculateDiscount = (): number => {
        return cart?.reduce( (total, pro) => total + pro.discount, 0) ?? 0
    }

    useEffect(() => {
        calculateTotal()
    }, [cart])

    return {
        cart,
        subtotal: cartResults.subtotal,
        discount: cartResults.discount,
        total: cartResults.total,
    }

}