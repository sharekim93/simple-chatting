"use client";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import Loader from "@/components/Loader";
import { auth } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const RegisterClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const router = useRouter();

  const registerUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== cPassword) {
      toast.error("비밀번호가 일치하지 않습니다.");
      return;
    }
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setIsLoading(false);

        toast.success("회원가입을 축하합니다");
        router.push("/");
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.message);
      });
  };

  if (isLoading) return <Loader />;

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="w-[392px]">
        <h2 className="text-2xl font-extrabold text-center text-gray-800">
          회원가입
        </h2>
        <form onSubmit={registerUser}>
          <div className="mt-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm text-[#999999]"
            >
              이메일
            </label>
            <input
              id="email"
              name="email"
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
              name="password"
              className="border border-[#CFCFCF] text-sm rounded-md block w-full p-2.5"
              placeholder="비밀번호를 입력하세요"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="cPassword"
              className="block mb-2 text-sm text-[#999999]"
            >
              비밀번호 확인
            </label>
            <input
              id="cPassword"
              className="border border-[#CFCFCF] text-sm rounded-md block w-full p-2.5"
              placeholder="비밀번호를 입력하세요"
              type="password"
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
            />
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="px-6 w-full py-2 duration-200 mt-4 border rounded-3xl bg-[#00B98D] text-white hover:bg-white hover:text-[#00B98D]"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterClient;
