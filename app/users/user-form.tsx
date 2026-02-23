
'use client';
import { createUser, updateUser } from '../actions/users';
import { registerUser } from '../actions/users_route';
import { User } from '../types';


export default function UserForm({ user }: { user?: User }) {

  return (
    <>
      <form action={user ? updateUser : registerUser}>
        {user && <input type="hidden" name="id" value={user.id} />}
        <div className="mb-6">
          <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900">
            Name
          </label>
          <input type="text" id="last_name" defaultValue={user?.name}
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder-gray-400"
            placeholder="Doe" required />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
            Email address
          </label>
          <input type="email" id="email" name='email' defaultValue={user?.email}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder-gray-400"
            placeholder="john.doe@company.com" required />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
            Password
          </label>
          <input type="password" id="password" name="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder-gray-400"
            placeholder="•••••••••" required />
        </div>
        <div className="mb-6" >
          <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900">
            Confirm password
          </label>
          <input type="password" id="confirm_password" name="confirmpassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder-gray-400"
            placeholder="•••••••••" required />
        </div>


        <div className="mb-6">
          <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900">
            Country
          </label> 
          <input type="text" id="country" name="country" defaultValue={user?.country}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder-gray-400"
            placeholder="Flowbite" required />
        </div>


        <button type="submit"
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-2.5 focus:outline-none shadow-sm">
          {user ? 'Update' : 'Create'}
        </button>
      </form>

    </>

  );
}
