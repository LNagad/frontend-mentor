"use client";

import axios, { AxiosError } from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';


const RegisterPage = () => {
  
  const [error, setError] = useState();
  const router = useRouter();

  const handleSubmit = async ( e: FormEvent<HTMLFormElement> ) => {
    e.preventDefault();

    const formData = new FormData( e.currentTarget );

    try {
      const signupResponse = await axios.post('/api/auth/signup', {
        email: formData.get('email'),
        password: formData.get('password'),
        fullname: formData.get('fullname')
      });
      
      const res = await signIn('credentials', {
        email: signupResponse.data.email,
        password: formData.get('password'),
        redirect: false
      });

      if ( res?.ok ) router.push('/dashboard');

    } catch (error) {
      console.log(error);
      if ( error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
    }

  };

  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-950 px-8 py-10 w-5/12 lg:w-3/12"
      >
        {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}

        <h1 className="text-4xl font-bold mb-7">Sign up</h1>

        <input
          autoComplete="off"
          type="text"
          placeholder="John Doe"
          name="fullname"
          className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
        />

        <input
          autoComplete="off"
          type="email"
          placeholder="JohnDoe@email.com"
          name="email"
          className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
        />

        <input
          autoComplete="off"
          type="password"
          placeholder="******"
          name="password"
          className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
        />

        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-400 px-4 py-2 rounded-lg transition ease-in-out w-full mt-5"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;