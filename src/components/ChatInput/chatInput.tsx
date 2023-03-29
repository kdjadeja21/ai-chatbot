import React, { useEffect, useRef, useState } from "react";

interface IChatInputProps {
    theme: string;
    loading: boolean;
    sendMessage: (msg: string) => void;
}

const ChatInput: React.FC<IChatInputProps> = ({ theme, loading, sendMessage }) => {
    const [msg, setMsg] = useState<string>("");
    const inputRef = useRef<null | HTMLInputElement>(null);

    const msgHandler = () => {
        sendMessage(msg);
        setMsg("");
    }

    useEffect(() => {
        inputRef?.current?.focus();
    }, [])

    return (
        <>
            <div className="flex flex-row items-center h-16 rounded-xl dark:bg-gray-700 w-full pr-4">
                <div className="flex-grow ml-4">
                    <div className="relative w-full">
                        <input
                            ref={inputRef}
                            disabled={loading}
                            value={msg}
                            type="text"
                            className="flex w-full border box-border dark:border-gray-600 dark:bg-gray-600 dark:text-white rounded-xl focus:outline-none focus:border-indigo-300 pl-4 pr-4 h-10"
                            placeholder="Type your query..."
                            onChange={(e) => {
                                setMsg(e.target.value);
                            }}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    msgHandler();
                                }
                            }}
                        />
                        {
                            loading &&
                            (<div className="loader-position">
                                <i className={theme === "dark" ? "loader" : "loader2"}></i>
                            </div>)
                        }

                    </div>

                </div>
                <div className="ml-4">
                    <button
                        className="flex items-center justify-center bg-cyan-500 hover:bg-cyan-600 dark:bg-cyan-800 rounded-xl text-white px-4 py-1 flex-shrink-0"
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