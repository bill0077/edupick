import { useContext, useEffect } from "react";
import { SocketContext } from "../contexts/SocketContext";

function useSocketReceiver(channel, onReceive) {
  const socket = useContext(SocketContext);
  
  useEffect(() => {
    socket.on(channel, onReceive);
    return () => {
      socket.off(channel, onReceive);
    };
  }, [channel, onReceive]);
}

export default useSocketReceiver;