import { useContext, useEffect } from "react";

import { getSession } from "next-auth/react";
import { moneyContext } from "@/services/moneyContext";

import Image from "next/image";
import Link from "next/link";

import { CentsToReais } from "@/helpers/format";
import { randomBetweenRange } from "@/helpers/random";

import { signOut } from "next-auth/react";

import Cookies from "js-cookie";

export default function Home({ session }) {
  const { money, setMoney } = useContext(moneyContext);
  const initialMoney = session.session.user.balance;

  useEffect(() => {
    setMoney(initialMoney);
    Cookies.set("balance", initialMoney);
  }, []);

  return (
    <>
      <nav className="fixed top-0 z-50 flex items-center w-full gap-5 px-3 py-2 font-bold text-black bg-white">
        <i className="text-4xl cursor-pointer fas fa-bars" onClick={() => signOut()}/>
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

      <section className="relative p-3">
        <span className="relative flex items-center justify-center gap-2 pt-2 pb-3 text-xl text-black z-1">
          <span className="font-semibold">AVALIE OS LOOKS ABAIXO:</span>
          <span>
            <i className="text-sm fas fa-arrow-down" />
          </span>
        </span>

        <div className="relative flex flex-col items-center justify-center gap-3 p-5 bg-white rounded-lg shadow-lg z-1">
          <div className="relative w-full h-[422px]">
            <Image src="/1.png" layout="fill" objectFit="cover" className="border-2 rounded-lg border-black/50" />
          </div>

          <span className="py-1 text-lg font-semibold">
            QUAL NOTA DE 1 À 5?
          </span>

          <div className="grid items-center justify-center w-full grid-cols-5 gap-2">
            <a
              href="#2"
              onClick={() =>
                setMoney(
                  parseInt(money) + parseInt(`1${randomBetweenRange(10, 99)}`)
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
              href="#2"
              onClick={() =>
                setMoney(
                  parseInt(money) + parseInt(`1${randomBetweenRange(10, 99)}`)
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
              href="#2"
              onClick={() =>
                setMoney(
                  parseInt(money) + parseInt(`1${randomBetweenRange(10, 99)}`)
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
              href="#2"
              onClick={() =>
                setMoney(
                  parseInt(money) + parseInt(`1${randomBetweenRange(10, 99)}`)
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
              href="#2"
              onClick={() =>
                setMoney(
                  parseInt(money) + parseInt(`1${randomBetweenRange(10, 99)}`)
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

      <section id="2" className="relative p-3">
        <div className="relative flex flex-col items-center justify-center gap-3 p-5 bg-white rounded-lg shadow-lg z-1">
          <div className="relative w-full h-[422px]">
            <Image src="/2.png" layout="fill" objectFit="cover" className="border-2 rounded-lg border-black/50" />
          </div>

          <span className="py-1 text-lg font-semibold">
            QUAL NOTA DE 1 À 5?
          </span>

          <div className="grid items-center justify-center w-full grid-cols-5 gap-2">
            <a
              href="#3"
              onClick={() =>
                setMoney(
                  parseInt(money) + parseInt(`1${randomBetweenRange(10, 99)}`)
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
              href="#3"
              onClick={() =>
                setMoney(
                  parseInt(money) + parseInt(`1${randomBetweenRange(10, 99)}`)
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
              href="#3"
              onClick={() =>
                setMoney(
                  parseInt(money) + parseInt(`1${randomBetweenRange(10, 99)}`)
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
              href="#3"
              onClick={() =>
                setMoney(
                  parseInt(money) + parseInt(`1${randomBetweenRange(10, 99)}`)
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
              href="#3"
              onClick={() =>
                setMoney(
                  parseInt(money) + parseInt(`1${randomBetweenRange(10, 99)}`)
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

      <section id="3" className="relative p-3">
        <div className="relative flex flex-col items-center justify-center gap-3 p-5 bg-white rounded-lg shadow-lg z-1">
          <div className="relative w-full h-[422px]">
            <Image src="/3.png" layout="fill" objectFit="cover" className="border-2 rounded-lg border-black/50" />
          </div>

          <span className="py-1 text-lg font-semibold">
            QUAL NOTA DE 1 À 5?
          </span>

          <div className="grid items-center justify-center w-full grid-cols-5 gap-2">
            <a
              href="#4"
              onClick={() =>
                setMoney(
                  parseInt(money) + parseInt(`1${randomBetweenRange(10, 99)}`)
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
              href="#4"
              onClick={() =>
                setMoney(
                  parseInt(money) + parseInt(`1${randomBetweenRange(10, 99)}`)
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
              href="#4"
              onClick={() =>
                setMoney(
                  parseInt(money) + parseInt(`1${randomBetweenRange(10, 99)}`)
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
              href="#4"
              onClick={() =>
                setMoney(
                  parseInt(money) + parseInt(`1${randomBetweenRange(10, 99)}`)
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
              href="#4"
              onClick={() =>
                setMoney(
                  parseInt(money) + parseInt(`1${randomBetweenRange(10, 99)}`)
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

      <section id="4" className="relative p-3">
        <div className="relative flex flex-col items-center justify-center gap-3 p-5 bg-white rounded-lg shadow-lg z-1">
          <div className="relative w-full h-[422px]">
            <Image src="/4.png" layout="fill" objectFit="cover" className="border-2 rounded-lg border-black/50" />
          </div>

          <span className="py-1 text-lg font-semibold">
            QUAL NOTA DE 1 À 5?
          </span>

          <div className="grid items-center justify-center w-full grid-cols-5 gap-2">
            <Link
              href="/progress"
              onClick={() =>
                setMoney(
                  parseInt(money) + parseInt(`1${randomBetweenRange(10, 99)}`)
                )
              }
              className="shadow-[-1px_0_13px_5px_rgba(255,0,0,.32)] hover:scale-90 transition-transform flex items-center justify-center gap-2 text-white bg-[#a70202] rounded-[5px] px-2.5 py-1"
            >
              <i class="far fa-tired"></i>
              <span className="py-1 font-extrabold tracking-tight text-white">
                1
              </span>
            </Link> 
            
            <Link
              href="/progress"
              onClick={() =>
                setMoney(
                  parseInt(money) + parseInt(`1${randomBetweenRange(10, 99)}`)
                )
              }
              className="shadow-[-1px_0_13px_5px_rgba(208,99,5,.22)] hover:scale-90 transition-transform flex items-center justify-center gap-2 text-white bg-[#d06305] rounded-[5px] px-2.5 py-1"
            >
              <i class="far fa-frown"></i>
              <span className="py-1 font-extrabold tracking-tight text-white">
                2
              </span>
            </Link>

            <Link
              href="/progress"
              onClick={() =>
                setMoney(
                  parseInt(money) + parseInt(`1${randomBetweenRange(10, 99)}`)
                )
              }
              className="shadow-[-1px_0_13px_5px_rgba(194,168,8,.18)] hover:scale-90 transition-transform flex items-center justify-center gap-2 text-white bg-[#c2a808] rounded-[5px] px-2.5 py-1"
            >
              <i class="far fa-meh"></i>
              <span className="py-1 font-extrabold tracking-tight text-white">
                3
              </span>
            </Link>

            <Link
              href="/progress"
              onClick={() =>
                setMoney(
                  parseInt(money) + parseInt(`1${randomBetweenRange(10, 99)}`)
                )
              }
              className="shadow-[-1px_0_13px_5px_rgba(104,164,4,.23)] hover:scale-90 transition-transform flex items-center justify-center gap-2 text-white bg-[#68a404] rounded-[5px] px-2.5 py-1"
            >
              <i class="far fa-smile"></i>
              <span className="py-1 font-extrabold tracking-tight text-white">
                4
              </span>
            </Link>

            <Link
              href="/progress"
              onClick={() =>
                setMoney(
                  parseInt(money) + parseInt(`1${randomBetweenRange(10, 99)}`)
                )
              }
              className="shadow-[-1px_0px_13px_5px_rgba(23.999999999999858,255,0,0.29)] hover:scale-90 transition-transform flex items-center justify-center gap-2 text-white bg-[#139A05] rounded-[5px] px-2.5 py-1"
            >
              <i class="far fa-laugh-beam"></i>
              <span className="py-1 font-extrabold tracking-tight text-white">
                5
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* <footer
        className="fixed bottom-0 flex w-full text-white bg-black"
        onClick={() => signOut()}
      >
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
