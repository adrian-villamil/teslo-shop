'use client';

import Link from "next/link"
import { titleFont } from "@/config/fonts"
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import { useUIStore } from "@/store";

const menuLinks = [
  {
    path: '/category/men',
    title: 'Hombres',
  },
  {
    path: '/category/women',
    title: 'Mujeres',
  },
  {
    path: '/category/kids',
    title: 'Niños',
  },
];

export const TopMenu = () => {
  const openMenu = useUIStore(state => state.openSideMenu);
  
  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* Logo */}
      <div>
        <Link href={'/'}>
          <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
          <span> | Shop</span>
        </Link>
      </div>
      {/* Center Menu */}
      <div className="hidden sm:block">
        {menuLinks.map(({ path, title }) => (
          <Link
            key={path}
            href={path}
            className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          >
            {title}
          </Link>
        ))}
      </div>
      {/* Search, Cart, Menu */}
      <div className="flex items-center">
        <Link href={'/search'} className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        <Link href={'/search'} className="mx-2">
          <div className="relative">
            <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">3</span>
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>
        <button
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          onClick={openMenu}
        >
          Menú
        </button>
      </div>
    </nav>
  )
}
