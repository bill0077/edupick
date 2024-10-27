import React from "react";
import io from "socket.io-client";

const socket = io('http://localhost:5000', {
  transports: ["websocket"],
  autoConnect: true,
});

const SocketContext = React.createContext(socket);

function SocketProvider({ children }) {
  React.useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export { SocketContext, SocketProvider };