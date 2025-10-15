import React from 'react'
import { IoAddCircleOutline } from "react-icons/io5";
import { FiBox } from "react-icons/fi";
import { useModal } from '../../../shared/hooks';
import { ModalNames } from '../../../interfaces/ui/modal.interface';
import { usePos } from '../../../shared/hooks/usePos';

interface Props {
  name: string
  price: number
  stock: number
  image: string
  id: string
}

export const ProductItem: React.FC<Props> = ({ id, image, name, price, stock }) => {

  const { onSetProductToAdd } = usePos()
  const { onOpenModal } = useModal()

  const onSelectProduct = () => {
    onSetProductToAdd(id)
    onOpenModal(ModalNames.addProduct)
  }

  return (
    <div onClick={onSelectProduct} className="flex flex-col bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <div className="relative w-full h-24 bg-gray-100 flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="object-cover w-24 h-24 transition-transform duration-300 hover:scale-105"
        />
        {stock === 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
            Agotado
          </span>
        )}
      </div>

      <div className="flex flex-col justify-between p-4 gap-2">
        <h3 className="text-gray-800 font-semibold text-sm truncate">{name}</h3>

        <div className="flex items-center justify-between">
          <p className="text-gray-500 text-xl font-bold flex items-center gap-2"><FiBox size={20} /> {stock}</p>
          <span className="text-green-600 font-bold text-lg">${price.toFixed(2)}</span>
        </div>

        <button
          disabled={stock === 0}
          className={`flex items-center justify-center gap-2 p-1 rounded-xl font-medium text-sm transition
            ${stock > 0
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
            `}
        >
          <IoAddCircleOutline size={18} />
          Agregar
        </button>

      </div>
    </div>
  )
}
