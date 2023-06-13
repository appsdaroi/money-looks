import { createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import _ from "lodash";
import axios from "axios";

const moneyContext = createContext({
  money: 0,
  setMoney: (money) => {},
});

const MoneyContextProvider = ({ children }) => {
  const { data: session } = useSession();
  const [money, setMoney] = useState(0);
  
  return (
    <moneyContext.Provider value={{ money, setMoney }}>
      {children}
    </moneyContext.Provider>
  );
};

export { moneyContext, MoneyContextProvider };
