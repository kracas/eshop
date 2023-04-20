import Head from "@modules/common/components/head"
import Image from 'next/image'
import logo from "@assets/logo.png"

export default function Home() {
  return (
    <>
      <Head
        title="Soon"
        description="We're busy creating amazing jewelry but we'll be back on 1 May 2023"
      />
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
        <Image
          src={logo}
          alt="ForeverSeptember Logo"
          width={280}
          priority
          className="invert mb-10"
        />
        <h1 className="text-3xl text-white font-bold mb-8 text-center animate-pulse">
          First of May Two Thousand Twenty Three
        </h1>
        <p className="text-white text-lg mb-8 text-center">
          We&apos;re busy creating amazing jewelry. <br />Stay tuned!
        </p>
      </div>
    </>
  )
}