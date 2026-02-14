import Link from "next/link";
import { registerUser } from "../actions/users_route";

export default function RegisterForm() {
    return (<>
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8 mx-auto">

                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                    {/* <img 
        className="w-8 h-8 mr-2" 
        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" 
        alt="logo"
      /> */}
                    Gospel Chord Library
                </a>

                <div className="w-full max-w-md bg-white rounded-lg shadow">
                    <div className="p-6 space-y-6 sm:p-8">

                        <h1 className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl">
                            Create an account
                        </h1>

                        <form className="space-y-6" action={registerUser}>

                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                                    placeholder="Enter Name"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                                    placeholder="Enter Email"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                                    placeholder="Enter password"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900">
                                    Confirm password
                                </label>
                                <input
                                    type="password"
                                    id="confirm_password"
                                    name="confirm_password"
                                    className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                                    placeholder="Enter confirm password"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                                    placeholder="Enter Country"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                            >
                                Create an account
                            </button>

                            <p className="text-sm text-gray-500">
                                Already have an account?
                                <Link href="/login" className="font-medium text-blue-600 hover:underline">
                                    Login here
                                </Link>
                            </p>

                        </form>
                    </div>
                </div>

            </div>
        </section>

    </>)
}