import React, { useState } from "react";

interface IChatInputProps {
    loading: boolean;
    sendMessage: (msg: string) => void;
}

const ChatInput: React.FC<IChatInputProps> = ({ loading, sendMessage }) => {
    const [msg, setMsg] = useState<string>("");

    const msgHandler = () => {
        sendMessage(msg);
        setMsg("");
    }

    return (
        <>
            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full pr-4">
                <div className="flex-grow ml-4">
                    <div className="relative w-full">
                        <input
                            autoFocus
                            disabled={loading}
                            value={msg}
                            type="text"
                            className="flex w-full border box-border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                            placeholder="Type your query..."
                            onChange={(e) => {
                                setMsg(e.target.value);
                            }}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    msgHandler();
                                }
                            }}
                        />
                        {
                            loading &&
                            (<div className="loader-position">
                                <i className="loader"></i>
                            </div>)
                        }

                    </div>

                </div>
                <div className="ml-4">
                    <button
                        className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                        disabled={loading}
                        onClick={msgHandler}
                    >
                        <span className="ml-1">
                            <svg
                                className="w-4 h-4 transform rotate-45 -mt-px"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                ></path>
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default ChatInput;