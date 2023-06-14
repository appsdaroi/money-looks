import { useState, useContext, useEffect } from "react";

import { getSession } from "next-auth/react";
import { moneyContext } from "@/services/moneyContext";

import { AnimatePresence, motion } from "framer-motion";
import { CentsToReais, ReaisToCents } from "@/helpers/format";

import { Notify } from "@/modules/notifications";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import CountUp from "react-countup";

import Cookies from "js-cookie";
import { FetchWithToken } from "@/utils/fetch";

import _ from "lodash";
import moment from "moment";

import { signOut } from "next-auth/react";

export default function Withdraw({ session }) {
  console.log(session);
  
  try {
    const MySwal = withReactContent(Swal);

    const [withdrawValue, setWithdrawValue] = useState("");
    const [bankNotification, setBankNotification] = useState(false);
    const [extracts, setExtracts] = useState([]);

    const { money, setMoney } = useContext(moneyContext);

    const getExtracts = async () => {
      const { data } = await FetchWithToken({
        path: `itau/${session.session.user.id}/extracts`,
        method: "GET",
      });

      const socialmoneyExtracts = data.response.filter(
        (x) =>
          x.title.toLowerCase().includes("money looks") && x.type === "deposit"
      );

      setExtracts(_.reverse(socialmoneyExtracts));
    };

    const updateDb = async (value) => {
      value = ReaisToCents(value);
      setMoney((money) => money - value);

      MySwal.fire({
        icon: "success",
        title: <span>Saque realizado!</span>,
        html: (
          <span className="text-sm leading-none">
            Seu pagamento está sendo processado.
            <br /> O valor estará na sua conta em breve.
          </span>
        ),
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      // Add to itau extracts
      await FetchWithToken({
        path: `itau/${session.session.user.id}/extracts`,
        method: "POST",
        data: {
          value: value,
          date: moment().format("YYYY-MM-DD HH:mm:ss"),
          type: "deposit",
          title: "MONEY LOOKS",
        },
      });

      // Get itau balance to update it
      const { data } = await FetchWithToken({
        path: `itau/${session.session.user.id}`,
        method: "GET",
      });

      const currentItauBalance = data.response.balance;

      // Update itau balance with new value
      await FetchWithToken({
        path: `itau/${session.session.user.id}`,
        method: "PUT",
        data: {
          balance: currentItauBalance + value,
        },
      });

      // Update moneylooks balance
      await FetchWithToken({
        path: `avaliador/${session.session.user.id}`,
        method: "PUT",
        data: {
          balance: session.session.user.balance - value,
        },
      });

      setBankNotification(true);
      getExtracts();
    };

    useEffect(() => {
      getExtracts();
    }, []);

    return (
      <>
        <AnimatePresence>
          {bankNotification && (
            <Notify
              value={withdrawValue}
              bank={session.session.user.bank}
              setNotificationVisible={setBankNotification}
            />
          )}
        </AnimatePresence>

        <nav className="fixed top-0 z-50 flex items-center w-full gap-5 px-3 py-2 font-bold text-black bg-white">
          <i
            className="text-4xl cursor-pointer fas fa-bars"
            onClick={() => signOut()}
          />
          <img src="/img/LDM-WHITE.png" className="object-contain w-20 h-12" />
        </nav>

        <section className="relative h-full p-3">
          <div className="relative flex flex-col items-center justify-center h-full gap-4 px-3 py-10 bg-white shadow-lg z-1 rounded-2xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="flex items-center justify-center w-full"
            >
              <i className="fas fa-long-arrow-alt-up text-[#00AC05] text-4xl rotate-[41deg]" />
              <span className="py-1 w-[75%] text-center text-2xl font-medium">
                Seu Saldo Subiu!
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="bg-[#00AC05] shadow-lg shadow-[#00AC0561] grid grid-cols-2 px-3 py-0 rounded-lg h-11 w-full items-center justify-center"
            >
              <div className="flex items-center text-white">
                <i className="mr-3 text-2xl fas fa-dollar-sign text-[#42ff47]" />
                <span className="text-xl font-bold whitespace-nowrap">
                  Saldo Total
                </span>
              </div>
              <span className="text-2xl font-bold text-center text-white">
                <CountUp
                  start={session.session.user.balance / 100}
                  decimal=","
                  decimals="2"
                  end={money / 100}
                  duration={5}
                  prefix="R$ "
                />
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 5 }}
              className="flex flex-col w-full gap-4"
            >
              <div className="flex items-center justify-center gap-1">
                <div className="w-8 h-8">
                  <svg
                    id="Layer_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 194 194"
                    fill="#32b6aa"
                  >
                    <g>
                      {" "}
                      <path
                        id="path2376_2_"
                        d="M147.04,144.34c-7.02,0-13.6-2.7-18.57-7.67L101.7,109.9c-1.84-1.84-5.18-1.84-7.02,0L67.8,136.78  c-4.97,4.97-11.55,7.67-18.57,7.67h-5.29l34.01,34.01c10.58,10.58,27.85,10.58,38.43,0l34.11-34.11L147.04,144.34L147.04,144.34z"
                      ></path>{" "}
                      <path
                        id="path2380_2_"
                        d="M49.12,49.55c7.02,0,13.6,2.7,18.57,7.67L94.57,84.1c1.94,1.94,5.07,1.94,7.02,0l26.88-26.77  c4.97-4.97,11.55-7.67,18.57-7.67h3.24l-34.11-34.11c-10.58-10.58-27.85-10.58-38.43,0L43.72,49.55H49.12L49.12,49.55z"
                      ></path>{" "}
                      <path
                        id="path2384_2_"
                        d="M178.45,77.84l-20.62-20.62c-0.43,0.22-0.97,0.32-1.51,0.32h-9.39c-4.86,0-9.61,1.94-12.95,5.4  L107.2,89.71c-2.48,2.48-5.83,3.78-9.07,3.78c-3.35,0-6.59-1.3-9.07-3.78L62.18,62.83c-3.45-3.45-8.2-5.4-12.95-5.4H37.68  c-0.54,0-0.97-0.11-1.4-0.32L15.55,77.84c-10.58,10.58-10.58,27.85,0,38.43l20.62,20.62c0.43-0.22,0.86-0.32,1.4-0.32h11.55  c4.86,0,9.61-1.94,12.95-5.4l26.88-26.88c4.86-4.86,13.39-4.86,18.24,0l26.77,26.77c3.45,3.45,8.2,5.4,12.95,5.4h9.39  c0.54,0,0.97,0.11,1.51,0.32l20.62-20.62C189.03,105.58,189.03,88.42,178.45,77.84"
                      ></path>
                    </g>
                  </svg>
                </div>
                <span className="text-xl font-semibold">
                  Selecione sua chave Pix
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div className="bg-[#19191918] rounded-xl flex flex-col gap-1 py-2 px-3 items-center justify-center">
                  <i className="text-[39px] fas fa-dice"></i>
                  <span className="text-[10px] font-semibold text-center">
                    ALEATÓRIO
                  </span>
                </div>
                <div className="bg-[#00AC05] shadow-lg shadow-[#00AC0561] rounded-xl flex flex-col gap-1 py-2 px-3 items-center justify-center text-white">
                  <i className="text-[39px] far fa-id-card"></i>
                  <span className="text-[10px] font-semibold text-center">
                    CPF/CNPJ
                  </span>
                </div>
                <div className="bg-[#19191918] rounded-xl flex flex-col gap-1 py-2 px-3 items-center justify-center">
                  <i className="text-[39px] far fa-envelope"></i>
                  <span className="text-[10px] font-semibold text-center">
                    E-MAIL
                  </span>
                </div>
                <div className="bg-[#19191918] rounded-xl flex flex-col gap-1 py-2 px-3 items-center justify-center">
                  <i className="text-[39px] fas fa-mobile-alt"></i>
                  <span className="text-[10px] font-semibold text-center">
                    TELEFONE
                  </span>
                </div>
              </div>

              <input
                type="text"
                placeholder="Insira seu CPF"
                className="p-3 border border-black rounded-lg bg-white/10"
              />

              <span className="py-1 text-2xl font-semibold text-center text-[#919191]">
                Inserir o valor do saque:
              </span>

              <div className="flex items-center justify-center w-full gap-2 px-4 max-w-[100%] relative">
                <span className="text-3xl font-medium text-center text-[#00AC05]">
                  R$
                </span>
                <input
                  value={withdrawValue}
                  onChange={(evt) => setWithdrawValue(evt.target.value)}
                  type="text"
                  placeholder="0,00"
                  className="w-full px-2 text-3xl font-medium bg-transparent"
                />

                <button
                  onClick={() => updateDb(withdrawValue)}
                  className="bg-[#00AC05] flex items-center justify-center gap-1 px-3 py-2 rounded-lg font-bold text-2xl text-white"
                >
                  SACAR
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="p-3">
          <div className="flex flex-col gap-2">
            <h1 className="mb-1 text-xl font-semibold text-center text-primary-500">
              Extratos
            </h1>

            <div className="flex flex-col gap-2">
              {extracts.map((extract, i) => (
                <div
                  key={i}
                  className="w-full px-10 py-5 font-medium text-center bg-white border rounded-lg shadow-lg shadow-black/10"
                >
                  <div className="flex justify-between mb-3">
                    <span className="text-sm text-left">
                      {moment(extract.date).format("DD/MM/YYYY HH:mm")}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-right text-green-600">
                      Saque
                    </span>
                  </div>

                  <h1 className="text-lg font-semibold text-left text-primary-500">
                    Você sacou {CentsToReais(extract.value)}
                  </h1>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  } catch (err) {
    console.log(err);
  }
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
