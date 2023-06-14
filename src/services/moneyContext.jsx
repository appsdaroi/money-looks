import { createContext, useState, useEffect } from "react";

import _ from "lodash";

const moneyContext = createContext({
  money: 0,
  setMoney: (money) => {},
});

const MoneyContextProvider = ({ children, initialValue }) => {
  const [money, setMoney] = useState(initialValue);
  
  return (
    <moneyContext.Provider value={{ money, setMoney }}>
      {children}
    </moneyContext.Provider>
  );
};

export { moneyContext, MoneyContextProvider };
