"use client";
import SideBar from "@/components/SideBar";
import { useParams } from "next/navigation";
import React from "react";

const Chat = () => {
  const { id } = useParams();

  return (
    <main className="grid w-full grid-cols-8">
      <aside className="col-span-2">
        <SideBar selectedChatId={id} />
      </aside>
      <div className="col-span-6 flex justify-center h-screen">
        <div className="flex flex-col items-center justfy-center space-y-4"></div>
      </div>
    </main>
  );
};

export default Chat;
