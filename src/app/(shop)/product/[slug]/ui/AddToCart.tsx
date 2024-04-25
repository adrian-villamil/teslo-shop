'use client';

import { useState } from "react";
import { QuantitySelector, SizeSelector } from "@/components"
import { Product, Size } from "@/interfaces"

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();

  return (
    <>
      {/* Selector de tallas */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={setSize}
      />

      {/* Selector de cantidad */}
      <QuantitySelector quantity={2} />

      {/* Button */}
      <button className="btn-primary my-5">Agregar al carrito</button>
    </>
  )
}
