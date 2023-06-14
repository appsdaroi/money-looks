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
