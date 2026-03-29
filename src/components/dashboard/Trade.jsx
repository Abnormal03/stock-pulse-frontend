import React, { useEffect, useState } from "react";

const Trade = ({ dashboard }) => {
  const [amount, setAmount] = useState(1);
  const { addBuyTransaction, addSellTransaction, error, isLoading } = dashboard;
  const [successMsg, setSuccessMsg] = useState(null);

  const handleChange = (event) => {
    setAmount(event.target.value);
  };

  const handleBuy = async () => {
    const success = await addBuyTransaction(amount);
    if (!success) {
      console.log("error while buying stock.");
    } else {
      setSuccessMsg("stock bought successfully.");
    }
  };
  const handleSell = async () => {
    const success = await addSellTransaction(amount);
    if (!success) {
      console.log("error while selling stock.");
    } else {
      setSuccessMsg("stock sold successfully");
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (successMsg) {
        setSuccessMsg(null);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [successMsg]);

  return (
    <div className="text-text-main lg:max-h-fit pb-5 flex flex-col items-center gap-3 rounded-3xl shadow-sm shadow-active-icon">
      <h1 className="text-3xl ">Trade</h1>
      <form className="flex flex-col gap-3 w-full px-10 items-center">
        <label htmlFor="amount" className="self-start ml-13">
          Amount:{"(buy or sell)"}
        </label>
        <input
          type="number"
          placeholder="amount"
          id="amount"
          name="amount"
          required
          className="border rounded-sm w-[80%] h-10 text-center border-amber-100 focus:outline-none"
          onChange={handleChange}
          value={amount}
        />

        <label htmlFor="" className="self-start ml-13">
          Available: {"0.0"}
        </label>

        <div className="flex  px-10 gap-5 w-full content-around items-center justify-around">
          <input
            type="button"
            value="Buy"
            className="px-10 py-2 rounded-lg bg-pulse-green text-black"
            onClick={handleBuy}
            disabled={isLoading}
          />
          <input
            type="button"
            value="Sell"
            className="px-10 py-2 rounded-lg bg-bear-red text-black"
            onClick={handleSell}
            disabled={isLoading}
          />
        </div>
      </form>
      {successMsg && (
        <div className="absolute rounded-sm border-pulse-green right-10 bottom-10 border px-10 py-3 bg-secondary-bg">
          <p className=" text-pulse-green">success: {successMsg}</p>
        </div>
      )}
    </div>
  );
};

export default Trade;
