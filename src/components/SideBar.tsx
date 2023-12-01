"use client";
import React from "react";
import { auth, db } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, DocumentData } from "firebase/firestore";
import { CgSpinner } from "react-icons/cg";
import UserListItem from "./UserListItem";
import { signOut } from "firebase/auth";
import Router from "next/router";
import { useRouter } from "next/navigation";

const SideBar = () => {

  const router = useRouter();
  const [user] = useAuthState(auth);

  const [snapshotUser] = useCollection(collection(db, "users"));
  const users = snapshotUser?.docs.map((doc: DocumentData) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const filteredUsers = users?.filter(
    (singleUser) => singleUser.email !== user?.email
  );

  const logout = () {
    signOut(auth)
    router.push("/")
  }

  if (!user) {
    return (
      <div className="flex justify-center mt-10">
        <CgSpinner className="w-8 h-8 text-gray-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start w-full h-screen border-l border-r border-gray-200">
      <div className="flex items-center justify-between w-full p-4 text-xl font-bold border-b border-gray-200 h-[70px]">
        <p>채팅</p>
        <button className="text-small font-medium" onClick={() => logout()}>
          로그아웃
        </button>
      </div>
      <div>
        <UserListItem />
      </div>
    </div>
  );
};

export default SideBar;
