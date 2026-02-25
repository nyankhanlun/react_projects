
'use client';
import { useState } from 'react';
import { editUser, registerUser } from '../actions/users_route';
import { User } from '../types';
import classes from './user-form.module.css'


export default function UserForm({ user }: { user?: User }) {
  const [role, setRole] = useState(user?.role || "user");
  const [isUserEnable, setUserEnable] = useState(user?.isUserEnable);

  return (
    <>
      <form action={editUser} className='w-full bg-white p-6 rounded-lg shadow-md'>
        {user && <input type="hidden" name="id" value={user.id} />}
        <div className="mb-6">
          <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900">
            Name
          </label>
          <input type="text" id="last_name" defaultValue={user?.name}
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder-gray-400"
            placeholder="Enter Name" required />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
            Email address
          </label>
          <input type="email" id="email" name='email' defaultValue={user?.email}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder-gray-400"
            placeholder="Enter Email" required />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
            Password
          </label>
          <input type="password" id="password" name="password" defaultValue={user?.password}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder-gray-400"
            placeholder="enter password" required />
        </div>

        <div className="mb-6" >
          <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900">
            Confirm password
          </label>
          <input type="password" id="confirm_password" name="confirmpassword" defaultValue={user?.password}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder-gray-400"
            placeholder="enter confirm password" required />
        </div>

        <div className="mb-6">
          <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900">
            User Role
          </label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="block w-full px-3 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="plan" className="block mb-2 text-sm font-medium text-gray-900">
            Plan(Days)
          </label>
          <input type="text" id="plan" name="plan" defaultValue={user?.plan}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder-gray-400"
            placeholder="Enter plan of days" required />
        </div>

        <div className="mb-6">
          <fieldset>
            <legend className="block mb-2 text-sm font-medium text-gray-900">
              Is User Enable?
            </legend>
            <div className={classes.card}>
              <div className={classes.container}>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <input
                      id="enable"
                      type="radio"
                      name="isUserEnable"
                      value="true"
                      checked={isUserEnable === true}
                      onChange={() => setUserEnable(true)}
                      readOnly
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="enable"
                      className="ml-2 text-sm font-medium text-gray-900 select-none"
                    >
                      Enable
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="disable"
                      type="radio"
                      name="isUserEnable"
                      value="false"
                      checked={isUserEnable === false}
                      readOnly
                      onChange={() => setUserEnable(false)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="disable"
                      className="ml-2 text-sm font-medium text-gray-900 select-none"
                    >
                      Disable
                    </label>
                  </div>
                </div>
              </div></div>
          </fieldset>
        </div>
        <div className="text-right">
          <button type="submit"
            className="text-white bg-blue-600 hover:bg-blue-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-3 focus:outline-none shadow-sm">
            Update User
          </button>
        </div>

      </form>

    </>

  );
}
