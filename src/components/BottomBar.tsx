"use client";
import React, { FormEvent, useState } from "react";
import { User } from "firebase/auth";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";

interface IBottomBarProps {
  user: User;
  chatId: string;
}

const BottomBar = ({ user, chatId }: IBottomBarProps) => {
  const [input, setInput] = useState("");

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim().length === 0) return;

    await addDoc(collection(db, `chats/${chatId}/messages`), {
      text: input,
      sender: user.email,
      photoURL: user.photoURL,
      timestamp: serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div>
      <form
        onSubmit={sendMessage}
        className="flex items-end w-full px-6 pb-4 space-x-2"
      >
        <input
          placeholder="메시지를 입력하세요"
          className="w-full px-4 py-4 placeholder-gray-400 border border-gray-200 rounded-lg focus:border-gray-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">
          <IoPaperPlaneOutline className="mb-4 text-gray-6000 w-7 h-7 hover:text-gray-900" />
        </button>
      </form>
    </div>
  );
};

export default BottomBar;
