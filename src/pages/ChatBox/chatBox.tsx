import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import ChatBubble from "../ChatBubble/chatBubble";
import ChatInput from "../ChatInput/chatInput";

interface IMsg {
    user: string;
    msg: string;
}

interface IRequestParams {
    role: string,
    content: string
}

const ChatBox: React.FC<{ theme: string }> = ({ theme }) => {
    const [chat, setChat] = useState<IMsg[]>([]);
    const [userId, setUserId] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const viewRef = useRef<null | HTMLDivElement>(null);

    useEffect((): any => {

        if (viewRef) {
            viewRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
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

            const chatAray = [...chat];
            chatAray.push(message)
            setChat(chatAray)

            const reqArray: IRequestParams[] = [];
            chatAray.map((chat: IMsg): void => {
                if (chat.user === "User_AI")
                    reqArray.push({ role: "assistant", content: chat.msg })
                reqArray.push({ role: "user", content: chat.msg })
            }
            )

            // dispatch message to other users
            const resp = await axios.post("/api/script", reqArray,);

            if (resp.status === 200) {
                setLoading(false);
            }
            const chatRes = [...chatAray];
            chatRes.push(resp.data)
            setChat(chatRes)
        }
    };

    return (
        <div className="flex h-responsive antialiased text-gray-800">
            <div className="flex flex-row h-full w-full overflow-x-hidden">
                <div className="flex flex-col flex-auto h-full p-6">
                    <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 dark:bg-gray-700 h-full p-4 shadow" >
                        <div className="flex flex-col h-full overflow-x-auto mb-4">
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
                                    chat.length === 0 && (<div className="flex justify-center items-center text-center dark:text-white">
                                        No chat messages
                                    </div>)
                                }
                                <div ref={viewRef} />
                            </div>
                        </div>
                        <ChatInput
                            theme={theme}
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