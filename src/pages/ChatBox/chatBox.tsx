import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import ChatBubble from "../ChatBubble/chatBubble";
import ChatInput from "../ChatInput/chatInput";

interface IMsg {
    user: string;
    msg: string;
}

const ChatBox: React.FC = () => {
    const [chat, setChat] = useState<IMsg[]>([]);
    const [userId, setUserId] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const viewRef = useRef(null);

    const scrollToBottom = () => {
        // viewRef.current?.scrollIntoView({ block: "nearest", behavior: 'smooth' })
    }

    useEffect((): any => {

        scrollToBottom();
        setUserId("User_" + String(new Date().getTime()).substr(-3));

    }, [chat]);

    const sendMessage = async (msg: string) => {
        if (msg) {
            setLoading(true);
            // build message obj
            const message: IMsg = {
                user: userId,
                msg,
            };

            chat.push(message)

            // dispatch message to other users
            const resp = await axios.post("/api/script", message,);

            // reset field if OK
            if (resp.status === 200) {
                setLoading(false);
            }
            chat.push(resp.data)
        }

        // focus after click
        // inputRef?.current?.focus();
    };

    return (
        <div className="flex h-screen antialiased text-gray-800">
            <div className="flex flex-row h-full w-full overflow-x-hidden">
                <div className="flex flex-col flex-auto h-full p-6">
                    <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4 shadow">
                        <div className="flex flex-col h-full overflow-x-auto overflow-y-auto mb-4" ref={viewRef}>
                            <div className="flex flex-col h-full">
                                <div className="grid grid-cols-12 gap-y-2">

                                    {chat.length ? (
                                        chat.map((chat, i) => (
                                            <ChatBubble
                                                key={"msg_" + i}
                                                message={chat.msg}
                                                isAI={chat.user === "User_AI"}
                                            />
                                        ))
                                    ) : <></>

                                    }

                                </div>
                                {
                                    chat.length === 0 && (<div className="flex justify-center items-center text-center">
                                        No chat messages
                                    </div>)
                                }

                            </div>
                        </div>
                        <ChatInput
                            loading={loading}
                            sendMessage={sendMessage}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatBox;