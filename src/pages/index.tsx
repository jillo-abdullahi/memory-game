import Head from "next/head";
import { GameBoard } from "@/containers/GameBoard";

export default function Home() {
  return (
    <>
      <Head>
        <title>Memory</title>
        <meta name="description" content="a multi-player memory game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full h-full min-h-screen flex items-center justify-center bg-blue-200 font-atkinson">
        <GameBoard />
      </div>
    </>
  );
}
