import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { Button, Navbar } from 'flowbite-react';
import Image from "next/image";

export function NavbarWithCTAButton() {
  return (
    <Navbar fluid rounded>
      <div className="grid place-items-center shadow-md">
        <div className="flex items-center px-2">
          <Image className="logo mr-2 py-2" src="/img/logo-1.png" alt=">:[" width={50} height={50} />
          <p className="text-[35px] px-1 font-anonymous text-2xl text-black">RILAB</p>
        </div>
        <div className="absolute right-5">
          <Button className=" font-anonymous tracking-widest bg-[#6ec2df] rounded-full px-2 py-[1px] text-black text-sm">
            registrarse
          </Button>
        </div>
      </div>
    </Navbar>
  );
}

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const { data: sessionData } = useSession();
  const { data: secretMessage } = api.example.getSecretMessage.useQuery(undefined, { enabled: sessionData?.user !== undefined });

  return (
    <>
      <NavbarWithCTAButton />
      <Head>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase sessionData={sessionData} secretMessage={secretMessage} />
          </div>
      </main>
    </>
  );
}

function AuthShowcase({ sessionData, secretMessage }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}