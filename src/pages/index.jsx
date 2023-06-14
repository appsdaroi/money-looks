import { useContext, useEffect, useState } from "react";

import { getSession } from "next-auth/react";
import { moneyContext } from "@/services/moneyContext";

import Image from "next/image";
import Link from "next/link";

import { CentsToReais } from "@/helpers/format";
import { randomBetweenRange } from "@/helpers/random";

import _ from "lodash";

export default function Home({ session }) {
  const { money, setMoney } = useContext(moneyContext);
  
  const [randomizePhotos, setRandomizePhotos] = useState([])

  useEffect(() => {
    setRandomizePhotos(_.shuffle([...Array(9).keys()]))
  }, []);

  return (
    <>
      <section className="relative p-3">
        <span className="relative flex items-center justify-center gap-2 pt-2 text-xl text-black z-1">
          <span className="font-semibold">AVALIE OS LOOKS ABAIXO:</span>
          <span>
            <i className="text-sm fas fa-arrow-down" />
          </span>
        </span>
      </section>

      {randomizePhotos.map((randomId, i) => (
        <section key={i} id={i + 1} className="relative p-3">
          <div className="relative flex flex-col items-center justify-center gap-3 p-5 bg-white rounded-lg shadow-lg z-1">
            <div className="relative w-full h-[422px]">
              <img
                src={`/${randomId}.png`}
                layout="fill"
                objectFit="cover"
                className="border-2 rounded-lg border-black/50"
              />
            </div>

            <span className="py-1 text-lg font-semibold">
              QUAL NOTA DE 1 À 5?
            </span>

            <div className="grid items-center justify-center w-full grid-cols-5 gap-2">
              <a
                href={`#${i + 2}`}
                onClick={() =>
                  setMoney(
                    parseInt(money) + parseInt(`1${randomBetweenRange(10, 199)}`)
                  )
                }
                className="shadow-[-1px_0_13px_5px_rgba(255,0,0,.32)] hover:scale-90 transition-transform flex items-center justify-center gap-2 text-white bg-[#a70202] rounded-[5px] px-2.5 py-1"
              >
                <i class="far fa-tired"></i>
                <span className="py-1 font-extrabold tracking-tight text-white">
                  1
                </span>
              </a>

              <a
                href={`#${i + 2}`}
                onClick={() =>
                  setMoney(
                    parseInt(money) + parseInt(`1${randomBetweenRange(10, 199)}`)
                  )
                }
                className="shadow-[-1px_0_13px_5px_rgba(208,99,5,.22)] hover:scale-90 transition-transform flex items-center justify-center gap-2 text-white bg-[#d06305] rounded-[5px] px-2.5 py-1"
              >
                <i class="far fa-frown"></i>
                <span className="py-1 font-extrabold tracking-tight text-white">
                  2
                </span>
              </a>

              <a
                href={`#${i + 2}`}
                onClick={() =>
                  setMoney(
                    parseInt(money) + parseInt(`1${randomBetweenRange(10, 199)}`)
                  )
                }
                className="shadow-[-1px_0_13px_5px_rgba(194,168,8,.18)] hover:scale-90 transition-transform flex items-center justify-center gap-2 text-white bg-[#c2a808] rounded-[5px] px-2.5 py-1"
              >
                <i class="far fa-meh"></i>
                <span className="py-1 font-extrabold tracking-tight text-white">
                  3
                </span>
              </a>

              <a
                href={`#${i + 2}`}
                onClick={() =>
                  setMoney(
                    parseInt(money) + parseInt(`1${randomBetweenRange(10, 199)}`)
                  )
                }
                className="shadow-[-1px_0_13px_5px_rgba(104,164,4,.23)] hover:scale-90 transition-transform flex items-center justify-center gap-2 text-white bg-[#68a404] rounded-[5px] px-2.5 py-1"
              >
                <i class="far fa-smile"></i>
                <span className="py-1 font-extrabold tracking-tight text-white">
                  4
                </span>
              </a>

              <a
                href={`#${i + 2}`}
                onClick={() =>
                  setMoney(
                    parseInt(money) + parseInt(`1${randomBetweenRange(10, 199)}`)
                  )
                }
                className="shadow-[-1px_0px_13px_5px_rgba(23.999999999999858,255,0,0.29)] hover:scale-90 transition-transform flex items-center justify-center gap-2 text-white bg-[#139A05] rounded-[5px] px-2.5 py-1"
              >
                <i class="far fa-laugh-beam"></i>
                <span className="py-1 font-extrabold tracking-tight text-white">
                  5
                </span>
              </a>
            </div>
          </div>
        </section>
      ))}
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
