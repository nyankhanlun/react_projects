"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { clientAuth } from "@/lib/firebase-client";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await signInWithEmailAndPassword(clientAuth, email, password);
            router.push("/songs");
        } catch (err: any) {
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <section className="bg-gray-50 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-lg shadow-md">

                    <div className="p-6 sm:p-8 space-y-4">

                        <div className="flex flex-col items-center mb-6">
                            {/* <img
                                className="w-10 h-10 mb-2"
                                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                                alt="logo"
                            /> */}
                            <h2 className="text-2xl font-semibold text-gray-900">
                                Worship Library
                            </h2>
                        </div>

                        <form className="space-y-4" onSubmit={handleSubmit}>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter email"
                                    className="w-full p-3 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    className="w-full p-3 text-sm bg-gray-50 border border-gray-300 rounded-lg 
                                    
                                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                {/* <label className="flex items-center text-sm text-gray-500">
                                    <input
                                        type="checkbox"
                                        className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    Remember me
                                </label>

                                <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                                    Forgot password?
                                </a> */}
                            </div>

                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 text-sm font-medium text-white bg-blue-600 rounded-lg 
                                disabled:bg-gray-200 
                                disabled:text-gray-500 
                                disabled:cursor-not-allowed
                                hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
                            >
                                {loading ? <p className="animate-bounce">Logging in...</p> : "Log in"}
                            </button>

                            <p className="text-sm text-gray-500 text-center">
                                Don’t have an account yet?{" "}
                                <Link href="/signup" className="font-medium text-blue-600 hover:underline">
                                    Sign up
                                </Link>
                            </p>

                        </form>
                    </div>
                </div>
            </section>


        </>
    )
}