'use client';

import { useEffect, useState } from "react";
import { useCartStore } from "@/store";
import { ProductImage, QuantitySelector } from "@/components";
import Link from "next/link";

export const ProducstInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore(state => state.cart);
  const updateProductQuantity = useCartStore(state => state.updateProductQuantity);
  const removeProduct = useCartStore(state => state.removeProduct);

  useEffect(() => {
    setLoaded(true);
  }, [])

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {productsInCart.map(product => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <ProductImage
            src={product.image}
            width={100}
            height={100}
            style={{
              width: '100px',
              height: '100px',
              objectFit: 'cover',
            }}
            alt={product.title}
            className="mr-5 rounded-none"
          />
          <div>
            <Link
              href={`/product/${product.slug}`}
              className="hover:underline cursor-pointer"
            >
              {product.size} - {product.title}
            </Link>
            <p>${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(quantity: number) => updateProductQuantity(product, quantity)}
            />
            <button
              className="underline mt-3"
              onClick={() => removeProduct(product)}
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  )
}
