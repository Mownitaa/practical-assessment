"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import InputField from "@/components/InputField";
import Link from "next/link";

export default function SignUp() {
  const { signup, error } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup.mutate({ username, email, phone, password });
    router.push("/");
  };

  return (
    <div className="mb-40 text-center flex flex-col justify-center align-center">
      <h1 className="mt-28 mb-8 text-3xl text-yellow-900 font-bold">Sign Up</h1>

      <form
        className="mx-auto sm:w-2/4 md:w-80 lg:w-96 text-left mt-8"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4">
          <div>
            <InputField
              label="Your Name"
              id="name"
              name="name"
              type="text"
              placeholder="Ex. Elon Mask"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <InputField
              label="Email"
              id="email"
              name="email"
              type="email"
              placeholder="Ex. abc@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <InputField
              label="Phone No"
              id="phone"
              name="phone"
              type="text"
              placeholder="Ex. 019xx-xxxxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <InputField
              label="Password"
              id="password"
              name="password"
              type="password"
              placeholder="xxxxxxxx"
              value={setPassword}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button
            className="mt-6 w-full text-yellow-900 px-4 py-2 bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 font-bold rounded bottom-2"
            type="submit"
          >
            Sign Up
          </button>
        </div>
        <div className="mt-6 text-center">
          <p className="text-base text-yellow-700">Already have an account?</p>
          <Link href="/login">
            <span className="text-xl font-bold text-yellow-900">Login</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
