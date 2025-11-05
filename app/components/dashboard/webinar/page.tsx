"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CalendarDays, Clock, MapPin, ChevronDown } from "lucide-react";
import { webinars as allWebinars } from "@/app/data/webinar";

export default function WebinarList() {
  const [activeTab, setActiveTab] = useState("live");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const today = new Date();

  const filteredByTab = allWebinars.filter((item) => {
    const start = new Date(item.startDate);
    const end = new Date(item.endDate);
    if (activeTab === "live") return start <= today && end >= today;
    if (activeTab === "upcoming") return start > today;
    if (activeTab === "past") return end < today;
    return true;
  });

  const filteredWebinars = filteredByTab.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const sortedWebinars = [...filteredWebinars].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    } else if (sortBy === "popularity") {
      return b.popularity - a.popularity;
    }
    return 0;
  });

  return (
    <div className="p-4">
      {/* Header with Sort Button */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-[#252641]">USI Webinars</h1>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 text-sm border px-4 py-2 rounded-md hover:bg-gray-50"
          >
            Sort By
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white shadow-md rounded-md border z-20">
              <button
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                  sortBy === "newest" ? "text-[#1F5C9E] font-semibold" : ""
                }`}
                onClick={() => {
                  setSortBy("newest");
                  setDropdownOpen(false);
                }}
              >
                Newest First
              </button>
              <button
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                  sortBy === "popularity" ? "text-[#1F5C9E] font-semibold" : ""
                }`}
                onClick={() => {
                  setSortBy("popularity");
                  setDropdownOpen(false);
                }}
              >
                Popularity
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b mb-6">
        {["live", "upcoming", "past"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 capitalize ${
              activeTab === tab
                ? "text-[#1F5C9E] border-b-2 border-[#1F5C9E]"
                : "text-gray-500 hover:text-[#1F5C9E]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search webinars..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-80 px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#1F5C9E]"
        />
      </div>

      {/* Webinars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedWebinars.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-sm p-4 hover:shadow-lg transition flex flex-col"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={400}
              height={200}
              className="rounded-xl object-cover mb-4"
            />
            <div className="flex items-center text-sm text-gray-600 gap-2 mb-1">
              <CalendarDays size={16} />
              {item.startDate} - {item.endDate}
            </div>
            <div className="flex items-center text-sm text-gray-600 gap-2 mb-1">
              <Clock size={16} /> {item.time}
            </div>
            <div className="flex items-center text-sm text-gray-600 gap-2 mb-3">
              <MapPin size={16} />
              <span className="text-green-600 font-medium">{item.mode}</span>
            </div>
            <h3 className="text-md font-semibold text-[#252641] mb-4">
              {item.title}
            </h3>

            <div className="mt-auto">
              <button
                onClick={() => router.push(`/dashboard/webinar/${item.id}`)}
                className={`w-full ${
                  item.price > 0
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-[#1F5C9E] hover:bg-[#184b84]"
                } text-white font-semibold py-2 rounded-md transition`}
              >
                {item.price > 0 ? `₹${item.price} | Buy Now` : "View Now"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
