"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import { Skeleton } from "@/components/ui/skeleton";

// Helper to get a valid image URL or a fallback
const getImageUrl = (path: string | null | undefined): string => {
  if (path) {
    if (path.startsWith("http")) return path;
    return `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL || ""}${path}`;
  }
  return "/profile.jpeg"; // Fallback if no photo is set
};

export default function DashboardHeader() {
  const router = useRouter();
  const { user, loading } = useUser();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-gradient-to-r from-[#B5D9FF] to-[#D6E7FF] shadow-md flex items-center justify-between px-8 z-50">
      {/* Left Section: Logos */}
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => router.push("/dashboard/events")}
      >
        {/* Urological Society of India Logo */}
        <Image
          src="/urological.png"
          alt="Urological Society of India"
          width={170}
          height={170}
          className="object-contain"
        />

        {/* Indian School of Urology Logo */}
        <Image
          src="/ISU_Logo.png"
          alt="Indian School of Urology"
          width={60}
          height={60}
          className="object-contain"
        />
            <p className="text-m sm:text-l font-bold text-[#1F5C9E] leading-tight">
              Indian School <br /> of Urology
            </p>
      </div>

      {/* Right Section: Profile + Logout */}
      <div className="flex items-center gap-6">
        {/* Profile Icon */}
        <button
          onClick={() => router.push("/dashboard/myprofile")}
          className="focus:outline-none"
        >
          {loading ? (
            <Skeleton className="w-[45px] h-[45px] rounded-full" />
          ) : (
            <img
              src={getImageUrl(user?.profilePhoto)}
              alt="Profile"
              width={45}
              height={45}
              className="rounded-full object-cover border-2 border-white shadow-sm hover:opacity-90 transition w-[45px] h-[45px]"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/profile.jpeg";
              }}
            />
          )}
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-orange-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-orange-600 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
