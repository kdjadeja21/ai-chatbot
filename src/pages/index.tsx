import React from "react";
import { AppBar } from "@mui/material";
import ChatBox from './ChatBox/chatBox';
import Head from "next/head";

const Index: React.FC = () => {
  return (
    <>
      <Head>
        <title>ChatBot</title>
      </Head>
      <AppBar className="text-center" position="static">
        <h1 className="pt-6 pb-8">ChatBot</h1>
      </AppBar>
      <ChatBox />
    </>
  )
};

export default Index;
