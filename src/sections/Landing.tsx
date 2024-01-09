import React, { useEffect, useState, ChangeEvent } from 'react';
import Image from 'next/image';
import SplineWindow from '@/components/common/spline';
import postHandler from '@/handlers/postHandler';
import TypewriterComponent from 'typewriter-effect';
const Landing = () => {
    const [messages, setMessages] = useState<
        { content: string; isUser: boolean; isError?: boolean }[]
    >([]);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim() !== '') {
            setMessages([...messages, { content: inputValue, isUser: true }]);
            setInputValue('');

            try {
                const response = await postHandler(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat`,
                    {
                        content: inputValue,
                    }
                );

                if (response.status === 1) {
                    setMessages([
                        ...messages,
                        { content: inputValue, isUser: true },
                        { content: response.data.response, isUser: false },
                    ]);
                } else {
                    setMessages([
                        ...messages,
                        { content: inputValue, isUser: true },
                        {
                            content:
                                'An error occurred. Please try again later.',
                            isUser: false,
                            isError: true,
                        },
                    ]);
                }
            } catch (error) {
                setMessages([
                    ...messages,
                    { content: inputValue, isUser: true },
                    {
                        content: 'An error occurred. Please try again later.',
                        isUser: false,
                        isError: true,
                    },
                ]);
                console.log(error);
            }
        }
    };

    const handleResetChat = () => {
        setMessages([]);
    };

    useEffect(() => {
        const chatContainer = document.getElementById('chat-container');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="w-full px-4 sm:px-40 flex flex-col">
            <div className="flex h-[10vh]  items-center ">
                <h1 className="text-3xl text-white">
                    <Image
                        src="/vitLogo2.png"
                        alt="logo"
                        height={10000}
                        width={10000}
                        className="sm:w-[30vw] lg:w-[10vw] object-cover cursor-pointer"
                    />
                </h1>
            </div>
            <div className="h-[90vh] sm:py-10   ">
                <div
                    id="chat-container"
                    className="h-[85%] overflow-y-auto overflow-x-hidden rounded px-2 sm:px-4 relative flex flex-col"
                >
                    <SplineWindow />

                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`max-w-[60%] rounded-2xl glassMorphism w-max border-[2px] border-white text-white  my-3 py-3 px-5  z-50 ${
                                message.isUser
                                    ? 'text-end self-end'
                                    : 'self-start'
                            } ${message.isError ? '' : ''}`}
                            style={{ transition: 'opacity 0.2s', zIndex: 50 }}
                        >
                            {!message.isUser && (
                                <TypewriterComponent
                                    options={{
                                        delay: 50,
                                    }}
                                    onInit={(typewriter) => {
                                        typewriter
                                            .pauseFor(2500)
                                            .typeString(message.content)
                                            .start();
                                    }}
                                />
                            )}

                            {message.isUser && message.content}
                        </div>
                    ))}
                </div>
                <form
                    onSubmit={handleFormSubmit}
                    className="flex items-center gap-x-8 mt-4"
                >
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        className="flex-1 rounded-l py-2 px-4 focus:outline-none bg-[#131314] text-white"
                        placeholder="Type a message..."
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                    >
                        Send
                    </button>
                    <div
                        onClick={handleResetChat}
                        className="max-sm:hidden cursor-pointer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="32"
                            viewBox="0 -960 960 960"
                            width="32"
                            fill="white"
                        >
                            <path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z" />
                        </svg>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Landing;
