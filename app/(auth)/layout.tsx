import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/app/components/auth/footer";

export const metadata: Metadata = {
  description: "Login or Signup to Urological Society of India",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-r from-[#d0ebff] to-[#a9d6fb]">
      {/* Header Section */}
      <header className="w-full py-10 flex flex-col items-center">
        {/* Logo & Title */}
        <div className="flex flex-col items-center justify-center space-y-3 mb-4">
          <Image
            src="/urological.png"
            alt="Urological Society of India"
            width={200}
            height={20}
            className="mb-2"
          />
        </div>

        {/* Stats Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 px-6">
          {/* Card 1 - USI Webniars */}
          <div className="bg-white/40 rounded-xl p-6 w-60 flex flex-col items-center backdrop-blur-sm">
            <Image
              src="/login-calender.png"
              alt="Events"
              width={130}
              height={130}
              className="mb-3"
            />
            <p className="text-xl font-bold text-[#1F5C9E]">USI Webniars</p>
            <p className="text-2xl font-bold text-[#007AFF]">20</p>
          </div>

          {/* Card 2 - Smart Learning Program */}
          <div className="bg-white/40 rounded-xl p-6 w-60 flex flex-col items-center backdrop-blur-sm">
            <Image
              src="/login-mic.png"
              alt="Talks"
              width={130}
              height={130}
              className="mb-3"
            />
            <p className="text-xl font-bold text-[#1F5C9E]">Smart Learning Program</p>
            <p className="text-2xl font-bold text-[#007AFF]">200</p>
          </div>

          {/* Card 3 - Past Operative Workshops */}
          <div className="bg-white/40 rounded-xl p-6 w-60 flex flex-col items-center backdrop-blur-sm">
            <Image
              src="/login-speaker.png"
              alt="Speakers"
              width={130}
              height={130}
              className="mb-3"
            />
            <p className="text-xl font-bold text-[#1F5C9E]">Past Operative Workshops</p>
            <p className="text-2xl font-bold text-[#007AFF]">40</p>
          </div>

          {/* Card 4 - Mock Ups */}
          <div className="bg-white/40 rounded-xl p-6 w-60 flex flex-col items-center backdrop-blur-sm">
            <Image
              src="/login-speaker.png"
              alt="Speakers"
              width={130}
              height={130}
              className="mb-3"
            />
            <p className="text-xl font-bold text-[#1F5C9E]">Mock Ups</p>
            <p className="text-2xl font-bold text-[#007AFF]">40</p>
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-8 px-4">
        <div className="flex w-full max-w-3xl bg-white/60 rounded-2xl overflow-hidden backdrop-blur-sm">
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
