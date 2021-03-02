import Header from "./components/Header";
import Table from "./components/Table";

import { useEffect, useState } from "react";
import formatData from "./utils/formatData";
import { useDarkMode } from "./utils/useDarkMode";

import io from "socket.io-client";
const socket = io("http://localhost:8090", { transports: ["websocket"] });

function App() {
  const [data, setData] = useState([]);
  const [mode, setMode] = useDarkMode();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to the socket");
      socket.on("initialData", (res) => {
        setData(formatData(res.data.maindata));
      });
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("newData", (res) => {
      setData(formatData(res.data));
    });
  }, []);

  return (
    <div className={mode}>
      <Header socket={socket} mode={mode} setMode={setMode} />
      <main className="overflow-x-auto font-sans dark:bg-gray-800 bg-blue-50">
        <Table socket={socket} initialData={data} />
      </main>
    </div>
  );
}

export default App;
