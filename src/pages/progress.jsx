import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import { moneyContext } from "@/services/moneyContext";
import { CentsToReais } from "@/helpers/format";

import { getSession } from "next-auth/react";
import ProgressBar from "@/modules/progressBar";

import { motion } from "framer-motion";

export default function Home({ session }) {
  const { money, setMoney } = useContext(moneyContext);

  const router = useRouter();

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    for (var i = 0; i <= 100; i++) {
      (function (ind) {
        setTimeout(function () {
          setProgress(ind);
        }, 50 * ind);
      })(i);
    }

    setTimeout(() => {
      router.push("/withdraw")
    }, 7000);
  }, []);

  return (
    <>
      <nav className="fixed top-0 z-50 flex items-center w-full gap-5 px-3 py-2 font-bold text-black bg-white">
        <i className="text-4xl fas fa-bars" />
        <img src="/img/LDM-WHITE.png" className="object-contain w-20 h-12" />
        <div className="bg-[#00AC05] grid grid-cols-2 px-3 py-0 rounded-lg h-11 flex-1 items-center justify-center shadow-[1px_3px_10px_2px_rgba(0,178,5,.28)]">
          <div className="flex items-center text-white">
            <i className="mr-3 text-2xl fas fa-dollar-sign text-[#42ff47]" />
            SALDO:
          </div>
          <span className="text-center text-white line-clamp-1">
            {!!money ? CentsToReais(money) : "Carregando..."}
          </span>
        </div>
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

      <section className="relative p-3 h-[calc(100vh-64px)]">
        <div className="relative flex flex-col items-center justify-center h-full gap-4 p-3 bg-white shadow-lg z-1 rounded-2xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex items-center justify-center w-full gap-4"
          >
            <i className="text-2xl fas fa-tshirt" />
            <span className="py-1 pr-3 text-xl font-semibold leading-none text-center">
              ENVIANDO SUA <br />
              AVALIAÇÃO...
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex items-center justify-center w-full bg-[#00AC05] rounded-[1rem]"
          >
            <ProgressBar bgcolor="black" completed={progress} />
          </motion.div>
        </div>
      </section>
      {/* 
      <footer className="fixed bottom-0 flex w-full text-white bg-black">
        <div className="flex items-center justify-center w-1/5 py-3">
          <i className="text-4xl fas fa-bars" />
        </div>
        <div className="flex items-center justify-center w-3/5 py-3 bg-[#292929] rounded-2xl">
          <i className="text-4xl fas fa-home" />
        </div>
        <div className="flex items-center justify-center w-1/5 py-3">
          <i className="text-4xl fas fa-user-circle" />
        </div>
      </footer>

      <div className="flex invisible w-full text-white bg-black">
        <div className="flex items-center justify-center w-1/5 py-3">
          <i className="text-4xl fas fa-bars" />
        </div>
        <div className="flex items-center justify-center w-3/5 py-3 bg-[#292929] rounded-2xl">
          <i className="text-4xl fas fa-home" />
        </div>
        <div className="flex items-center justify-center w-1/5 py-3">
          <i className="text-4xl fas fa-user-circle" />
        </div>
      </div> */}
    </>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (!session)
    return {
      redirect: { destination: "/auth/signin" },
    };

  return {
    props: {
      session: session,
    },
  };
}
