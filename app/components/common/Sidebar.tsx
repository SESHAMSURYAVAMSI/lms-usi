"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";


const menuItems = [
  { label: "Webinar", path: "/dashboard/webinar", icon: "/icons/webinar.png" },
  { label: "eLearning Courses", path: "/dashboard/elearning", icon: "/icons/elearning.png" },
  { label: "Live Operative Workshops", path: "/dashboard/workshops", icon: "/icons/workshop.png" },
  { label: "Conferences", path: "/dashboard/conferences", icon: "/icons/conference.png" },
  { label: "Speakers", path: "/dashboard/speakers", icon: "/icons/speaker.png" },
  { label: "My Profile", path: "/dashboard/myprofile", icon: "/icons/my-profile.png" },
  { label: "My Purchases", path: "/dashboard/mypurchase", icon: "/icons/my-purchases.png" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // Adjust this to match your actual header height
  const HEADER_HEIGHT = 80;

  return (
    <aside
      className="fixed left-0 w-67 bg-white border-r border-black-400 flex flex-col font-poppins shadow-sm"
      style={{
        top: `${HEADER_HEIGHT}px`, // pushes sidebar below header
        height: `calc(100vh - ${HEADER_HEIGHT}px)`, // fills rest of viewport
      }}
    >
      {/* Menu Section */}
      <nav className="flex-1 mt-2 space-y-1 px-2 overflow-y-auto">
        {menuItems.map((item) => {
          const active = pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => router.push(item.path!)}
              className={`relative flex items-center gap-3 w-full text-left px-4 py-3 text-[15px] font-medium rounded-xl transition-all duration-300 ${
                active
                  ? "bg-orange-50 text-orange-600"
                  : "text-[#0A0A0A] hover:bg-orange-100 hover:text-orange-600"
              }`}
            >
              {/* Active Indicator */}
              {active && (
                <motion.span
                  layoutId="activeIndicator"
                  className="absolute left-0 top-0 h-full w-[4px] bg-orange-500 rounded-r-full"
                />
              )}

              {/* Icon */}
              <Image
                src={item.icon}
                alt={item.label}
                width={22}
                height={20}
                className="object-contain"
              />

              {/* Label */}
              <span className="z-10">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
