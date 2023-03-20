import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { AppBar, TextField } from "@mui/material";

interface IMsg {
  user: string;
  msg: string;
}

// component
const Index: React.FC = () => {
  const inputRef = useRef(null);

  // connected flag
  const [connected, setConnected] = useState<boolean>(true);

  // init chat and message
  const [chat, setChat] = useState<IMsg[]>([]);
  const [msg, setMsg] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);



  useEffect((): any => {

    // update chat on new message dispatched

    // chat.push(message);
    // setChat([...chat]);
    setUserId("User_" + String(new Date().getTime()).substr(-3));

  }, []);

  const sendMessage = async () => {
    if (msg) {
      setLoading(true);
      // build message obj
      const message: IMsg = {
        user: userId,
        msg,
      };

      console.log({ message })
      chat.push(message)

      // dispatch message to other users
      const resp = await axios.post("/api/script", message,);

      console.log(resp)
      // reset field if OK
      if (resp.status === 200) {
        setMsg("");
        setLoading(false);
      }
      chat.push(resp.data)


    }

    // focus after click
    // inputRef?.current?.focus();
  };

  return (
    <div >
      <div >
        <AppBar className="text-center" position="static">
          <h1 className="pt-6 pb-8">Chat App</h1>
        </AppBar>
      </div>
      <div >
        <div >
          {chat.length ? (
            chat.map((chat, i) => (
              <div
                className={`${chat.user === userId ? "place-items-end bg-slate-700 text-gray-50 float-right" : "place-items-start"} space-y-1 bg-white p-2 rounded-2xl m-6`}
                key={"msg_" + i}
              >
                <span >{chat.user === userId ? "Me :" : chat.user + " : "}</span>
                <span>{chat.msg}</span>
              </div>
            ))
          ) : (
            <div >
              No chat messages
            </div>
          )}
        </div>
        <div >
          <div >
            <div >
              <center>
                <TextField
                  ref={inputRef}
                  value={msg}
                  placeholder={connected ? "Type a message..." : "Connecting..."}
                  className="align-middle"
                  id="standard-basic"
                  label="Enter your query..."
                  variant="standard"
                  disabled={loading}
                  onChange={(e) => {
                    setMsg(e.target.value);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                />
              </center>
            </div>
            <div>
              <button
                onClick={sendMessage}
                disabled={loading}
              >
                SEND
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Index;
