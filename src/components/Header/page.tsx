// 'use client';

import Image from "next/image";
import Link from "next/link";
import SearchBar from '../searchBar';

const Header = () => {
  return (
    <header className="bg-[#454445] flex flex-wrap items-center justify-between p-4 sm:pr-8 md:pr-8 lg:pr-8 border-b">
      <Link href="/" className="mr-4">
        <Image 
          src="/assets/VIVALINE.svg" 
          alt="Logo" 
          width={150} 
          height={100} 
          className="w-[5.5rem] sm:w-[6rem] md:w-[7rem] lg:w-[8rem]"
        />
      </Link>

      <div className="flex-1 mx-4">
        <SearchBar />
      </div>

      <ul className="flex items-center gap-3.5 sm:gap-4 lg:gap-8 pt-2 sm:pt-4">
        <li className="text-white text-xs sm:text-sm md:text-base lg:text-2xl">
          <Link href="/QuemSomos">Quem somos?</Link>
        </li>
        <li className="text-white text-xs sm:text-sm md:text-base lg:text-2xl">
          <Link href="/Duvidas">Dúvidas frequentes</Link>
        </li>
        <li className="text-white text-xs sm:text-sm md:text-base lg:text-2xl">
          <Link href="/colaboradores">Área do Colaborador</Link>
        </li>
        <li>
          <Link href="/cadastro">
            <Image 
              src="/assets/User-branco.svg" 
              alt="login" 
              width={40} 
              height={20} 
              className="w-4 sm:w-5 md:w-6 lg:w-10"
            />
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
