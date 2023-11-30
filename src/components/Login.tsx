"use client";
import React, { FormEvent, useState } from "react";
import { auth } from "@/firebase";
import {
  useSignInWithGoogle,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="w-[392px]">
        <h2 className="text-2xl font-extrabold text-center text-gray-800">
          로그인
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm text-[#999999]"
            >
              이메일
            </label>
            <input
              id="email"
              className="border border-[#CFCFCF] text-sm rounded-md block w-full p-2.5"
              placeholder="이메일을 입력하세요"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm text-[#999999]"
            >
              비밀번호
            </label>
            <input
              id="password"
              className="border border-[#CFCFCF] text-sm rounded-md block w-full p-2.5"
              placeholder="이메일을 입력하세요"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="px-6 w-full py-2 duration-200 border rounded-3xl bg-[#00B98D] text-white hover:bg-white hover:text-[#00B98D]"
            >
              로그인
            </button>
            <button
              className="px-6 w-full py-2 duration-200 mt-4 border rounded-3xl bg-white  hover:bg-[#00B98D] hover:text-white"
              onClick={() => signInWithGoogle()}
            >
              Google 계정으로 로그인
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
