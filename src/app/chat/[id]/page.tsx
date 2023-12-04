"use client";
import BottomBar from "@/components/BottomBar";
import SideBar from "@/components/SideBar";
import { auth } from "@/firebase";
import { User } from "firebase/auth";
import { useParams } from "next/navigation";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const Chat = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);

  return (
    <main className="grid w-full grid-cols-8">
      <aside className="col-span-2">
        <SideBar selectedChatId={id} />
      </aside>
      <div className="flex flex-col w-full col-span-6">
        {/* Top bar */}
        Top Bar
        <div className="flex w-full h-full px-6 pt-4 mb-2 overflow-y-scroll no-scrollbar">
          <div className="flex flex-col w-full h-full">
            <div>{/* Messages */}</div>
            Messages
          </div>
        </div>
        {/* Bottom Bar */}
        <BottomBar user={user as User} chatId={id} />
      </div>
    </main>
  );
};

export default Chat;
