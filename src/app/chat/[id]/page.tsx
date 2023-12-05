"use client";
import BottomBar from "@/components/BottomBar";
import MessageBubble from "@/components/MessageBubble";
import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import { auth, db } from "@/firebase";
import { IMessage } from "@/types";
import { User } from "firebase/auth";
import { collection, doc, orderBy, query } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";
import Router from "next/router";
import React, { useRef, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { CgSpinner } from "react-icons/cg";
import { IoChatbubbleOutline } from "react-icons/io5";

const Chat = () => {
  const { id }: { id: string } = useParams();
  const [user] = useAuthState(auth);
  const router = useRouter();

  const q = query(
    collection(db, "chats", id, "messages"),
    orderBy("timestamp")
  );

  const ref = useRef<null | HTMLDivElement>(null);
  const [messages, loading] = useCollectionData(q);

  const [chat] = useDocumentData(doc(db, "chats", id));

  const getOtherUser = (users: User[], currentUser: User) => {
    return users?.filter((user) => user.email !== currentUser?.email)[0];
  };

  useEffect(() => {
    ref?.current?.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    if (!user) router.push("/");
  }, [user, router]);

  return (
    <main className="grid w-full grid-cols-8">
      <aside className="col-span-2">
        <SideBar selectedChatId={id} />
      </aside>
      <div className="flex flex-col w-full col-span-6">
        <TopBar user={getOtherUser(chat?.usersData, user as User)} />
        <div className="flex w-full h-full px-6 pt-4 mb-2 max-h-[calc(100vh_-_70px_-_74px_-_10px)] overflow-y-scroll no-scrollbar">
          <div className="flex flex-col w-full h-full">
            <div>
              {loading && (
                <div className="flex flex-col w-full h-full">
                  <CgSpinner className="w-12 h-12 text-gray-400 animate-spin" />
                </div>
              )}
              {!loading && messages?.length === 0 && (
                <div className="flex flex-col items-center justify-center flex-1">
                  <IoChatbubbleOutline className="w-24 h-24 text-gray-300" />
                  <p className="text-2xl font-medium tracking-tight text-gray-300">
                    대화를 시작합니다
                  </p>
                </div>
              )}

              {messages?.map((msg, idx) => (
                <MessageBubble
                  user={user!}
                  message={msg as IMessage}
                  key={idx}
                />
              ))}
            </div>
            <div ref={ref}></div>
          </div>
        </div>
        <BottomBar user={user as User} chatId={id} />
      </div>
    </main>
  );
};

export default Chat;
