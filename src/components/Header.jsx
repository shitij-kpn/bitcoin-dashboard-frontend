import { useState, useEffect } from "react";

const Header = ({ socket, mode, setMode }) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    socket.on("timer", (res) => {
      console.log(res.timer);
      setCounter(res.timer);
    });
    return () => {
      socket.on("disconnect");
    };
  }, [socket]);
  return (
    <header className="dark:bg-gray-800 dark:text-white bg-gray-100 text-gray-800 pt-4 px-2 shadow-md">
      <ul className="flex flex-col lg:flex-row justify-between items-center">
        <li className="p-2 ml-4 flex-auto">
          <div>
            <div>
              {" "}
              <span className="text-3xl text-green-300">HODLINFO</span>
              <span className="text-xl">.com</span>
            </div>
            <div>
              {" "}
              <span>Powered By </span>
              <span className="text-green-300">Finstreet</span>
            </div>
          </div>
        </li>
        <li className="p2 flex-1">
          <select
            className="select-styles"
            id="currency_from"
            name="currency_from"
          >
            <option className="appearance-none rounded-xl" value="INR">
              INR
            </option>
          </select>
          <select
            className="select-styles"
            id="currency_from"
            name="currency_from"
          >
            <option value="BTC">BTC</option>
          </select>
        </li>
        <li className="p2 mr-4 flex-1">
          <div className="m-2 flex justify-around items-center">
            <div
              className="m-2 border-2 rounded-full h-8 w-8 text-center border-green-300 text-green-300"
              id="counter"
            >
              {counter}
            </div>
            <div className=" m-2 flex justify-center bg-green-300 px-4 py-2 rounded-lg">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="telegram-plane"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-6 h-6"
              >
                <path
                  fill="currentColor"
                  d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"
                ></path>
              </svg>
              <p>Connect Telegram </p>
            </div>
            <div className="mx-4 my-2 ">
              <div className="switch">
                <input
                  className="switch-input"
                  id="switch-1"
                  type="checkbox"
                  defaultChecked={mode === "dark"}
                />
                <label
                  className="switch-label"
                  htmlFor="switch-1"
                  onClick={() => setMode(mode === "light" ? "dark" : "light")}
                >
                  Switch
                </label>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </header>
  );
};

export default Header;
