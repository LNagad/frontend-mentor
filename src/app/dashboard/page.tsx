"use client";

import { signOut, useSession } from 'next-auth/react';


const DashboardPage = () => {

  const { data: session, status } = useSession();

  // const session = await getServerSession();


  
  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex items-center flex-col gap-y-5">
      <h1 className='font-bold text-3xl'>Dashboard Page</h1>

      <pre className='bg-zinc-800 p-4'>{JSON.stringify({ session, status }, null, 2)}</pre>

      <button className='bg-zinc-800 px-4 py-2 block hover:bg-zinc-700 hover:transition hover:ease-in-out' onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

export default DashboardPage;