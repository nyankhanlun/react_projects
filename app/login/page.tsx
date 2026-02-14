"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { loginUser } from "../actions/users_route";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        const us = await loginUser(email, password)
        setError(us)
    }
    return (
        <>
            <section className="bg-gray-50">
                <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8 mx-auto lg:py-0">

                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                        {/* <img
                            className="w-8 h-8 mr-2"
                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                            alt="logo"
                        /> */}
                        Gospel Chord Library
                    </a>

                    <div className="w-full bg-white rounded-lg shadow-md">

                        <div className="p-6 space-y-4 sm:p-8">

                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Sign in to your account
                            </h1>

                            <form className="space-y-4" onSubmit={handleSubmit}>

                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Enter email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg 
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Enter password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg 
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div className="flex items-center justify-between">

                                    <div className="flex items-center">
                                        <input
                                            id="remember"
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded 
                                   focus:ring-2 focus:ring-blue-500"
                                        />
                                        <label htmlFor="remember" className="ml-2 text-sm text-gray-500">
                                            Remember me
                                        </label>
                                    </div>

                                    <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                                        Forgot password?
                                    </a>
                                </div>
                                {error && <p className="text-red-500">{error}</p>}
                                <button
                                    type="submit"
                                    className="w-full px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg 
                           hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                >
                                    Sign in
                                </button>

                                <p className="text-sm font-light text-gray-500">
                                    Don’t have an account yet?
                                    <Link href="/signup" className="font-medium text-blue-600 hover:underline">
                                        Sign up
                                    </Link>
                                </p>

                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}