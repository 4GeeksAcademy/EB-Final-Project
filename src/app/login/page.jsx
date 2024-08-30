"use client";

import { login, signup } from "@/services/auth";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async () => {
    const credentials = form.getValues();
    await login(credentials);
  };

  const handleSignup = async (data) => {
    const credentials = form.getValues();
    await signup(credentials);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-semibold">
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              {...form.register("email")}
              className="border rounded p-2"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 font-semibold">
              Password:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              {...form.register("password")}
              className="border rounded p-2"
            />
          </div>

          <div>
            <button
              type="button"
              onClick={handleLogin}
              className="bg-sky-500 text-white rounded p-2 w-full hover:bg-sky-600"
            >
              Log in
            </button>
          </div>

          <div>
            <button
              type="button"
              onClick={handleSignup}
              className="bg-sky-600 text-white rounded p-2 w-full hover:bg-sky-700"
            >
              Sign up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
