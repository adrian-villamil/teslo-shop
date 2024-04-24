export const revalidate = 60; // 60 segundos

import type { Metadata } from 'next';
import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";

interface Props {
  params: { gender: string };
  searchParams: { page?: string };
}

const labels: Record<string, string> = {
  men: 'hombres',
  women: 'mujeres',
  kid: 'niños',
  unisex: 'todos',
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { gender } = params;
  return { title: `Artículos de ${labels[gender]}` };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { gender } = params;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  // const products = initialData.products.filter((product) => product.gender === id);
  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page, gender: gender as Gender });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  // if (id === 'kid') {
  //   notFound();
  // }

  return (
    <>
      <Title
        title={`Artículos para ${labels[gender]}`}
        subtitle='Todos los productos'
        className="mb-2"
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}