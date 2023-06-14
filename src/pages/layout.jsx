import { useContext, useEffect } from "react";

import { moneyContext } from "@/services/moneyContext";

import Image from "next/image";
import Link from "next/link";

import { CentsToReais } from "@/helpers/format";
import { signOut } from "next-auth/react";

import Cookies from "js-cookie";

const Layout = ({ children, session }) => {
  const { money } = useContext(moneyContext);

  return (
    <>
      <nav className="fixed top-0 z-50 flex items-center w-full gap-5 px-3 py-2 font-bold text-black bg-white">
        <i
          className="text-4xl cursor-pointer fas fa-bars"
          onClick={() => signOut()}
        />
        <img src="/img/LDM-WHITE.png" className="object-contain w-20 h-12" />
        <Link
          href="/withdraw"
          className="bg-[#00AC05] grid grid-cols-2 px-3 py-0 rounded-lg h-11 flex-1 items-center justify-center shadow-[1px_3px_10px_2px_rgba(0,178,5,.28)]"
        >
          <div className="flex items-center text-white">
            <i className="mr-3 text-2xl fas fa-dollar-sign text-[#42ff47]" />
            SALDO:
          </div>
          <span className="text-center text-white line-clamp-1">
            {!!money ? CentsToReais(money) : "Carregando..."}
          </span>
        </Link>
      </nav>

      <nav className="relative z-50 flex items-center invisible w-full gap-5 px-3 py-2 font-bold text-black bg-white">
        <i className="text-4xl fas fa-bars" />
        <img src="/img/LDM-WHITE.png" className="object-contain w-20 h-12" />
        <div className="bg-[#00AC05] grid grid-cols-2 px-3 py-0 rounded-lg h-11 flex-1 items-center justify-center">
          <div className="flex items-center text-white">
            <i className="mr-3 text-2xl fas fa-dollar-sign text-[#42ff47]" />
            SALDO:
          </div>
          <span className="text-center text-white line-clamp-1"></span>
        </div>
      </nav>

      {children}

      <footer
        className="fixed bottom-0 flex justify-between px-8 w-full text-black bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)]"
      >
        <Link href="/" className="flex items-center justify-center py-3 rounded-2xl">
          <i className="text-4xl fas fa-home" />
        </Link>
        <Link href="/withdraw" className="flex items-center justify-center py-3">
          <i className="text-4xl fas fa-wallet" />
        </Link>
        <div className="flex items-center justify-center py-3">
          <i className="text-4xl fas fa-user-circle" />
        </div>
      </footer>

      <footer
        className="relative invisible bottom-0 flex justify-between px-8 w-full text-black bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)]"
      >
        <Link href="/" className="flex items-center justify-center py-3 rounded-2xl">
          <i className="text-4xl fas fa-home" />
        </Link>
        <Link href="/withdraw" className="flex items-center justify-center py-3">
          <i className="text-4xl fas fa-wallet" />
        </Link>
        <div className="flex items-center justify-center py-3">
          <i className="text-4xl fas fa-user-circle" />
        </div>
      </footer>
    </>
  );
};

export { Layout };
