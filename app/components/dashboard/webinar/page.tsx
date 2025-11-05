"use client";

import { useState } from "react";
import Image from "next/image";
import { CalendarDays, Clock, MapPin, ChevronDown } from "lucide-react";
import { webinars as allWebinars } from "@/app/data/webinar";

export default function WebinarPage() {
  const [activeTab, setActiveTab] = useState("live");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const today = new Date();

  // --- Filter by tab ---
  const filteredByTab = allWebinars.filter((item) => {
    const start = new Date(item.startDate);
    const end = new Date(item.endDate);

    if (activeTab === "live") {
      return start <= today && end >= today; // ongoing
    } else if (activeTab === "upcoming") {
      return start > today; // future
    } else if (activeTab === "past") {
      return end < today; // completed
    }
    return true;
  });

  // --- Apply search ---
  const filteredWebinars = filteredByTab.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  // --- Apply sorting ---
  const sortedWebinars = [...filteredWebinars].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    } else if (sortBy === "popularity") {
      return b.popularity - a.popularity;
    }
    return 0;
  });

  return (
    <div className="p-3">
      {/* Header Row (Title + Sort By Button) */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-[#252641]">USI Webinars</h1>

        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 text-sm border px-4 py-2 rounded-md hover:bg-gray-50"
          >
            <span>Sort By</span>
            <ChevronDown size={16} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white shadow-md rounded-md border z-20">
              <button
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                  sortBy === "newest" ? "text-[#FF7A1B] font-semibold" : ""
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
                  sortBy === "popularity" ? "text-[#FF7A1B] font-semibold" : ""
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
      <div className="flex items-center gap-6 mb-6 border-b border-gray-200 pb-2">
        {["live", "upcoming", "past"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-1 capitalize ${
              activeTab === tab
                ? "text-[#1F5C9E] font-semibold border-b-2 border-[#1F5C9E]"
                : "text-gray-500 hover:text-[#1F5C9E]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex justify-start mb-6">
        <input
          type="text"
          placeholder="Search webinars..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-80 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F5C9E]"
        />
      </div>

      {/* Webinars Grid */}
      {sortedWebinars.length === 0 ? (
        <p className="text-gray-500 mt-10 text-center">
          No webinars found for this category.
        </p>
      ) : (
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
                {new Date(item.startDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}{" "}
                -{" "}
                {new Date(item.endDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </div>

              <div className="flex items-center text-sm text-gray-600 gap-2 mb-1">
                <Clock size={16} />
                {item.time}
              </div>

              <div className="flex items-center text-sm text-gray-600 gap-2 mb-3">
                <MapPin size={16} />
                <span className="text-green-600 font-medium">{item.mode}</span>
              </div>

              <h3 className="text-md font-semibold text-[#252641] mb-4">
                {item.title}
              </h3>

              <div className="mt-auto">
                {item.price > 0 ? (
                  <button className="w-full bg-orange-500 text-white font-semibold py-2 rounded-md hover:bg-orange-600 transition">
                    ₹{item.price} | Buy Now
                  </button>
                ) : (
                  <button className="w-full bg-[#1F5C9E] text-white font-semibold py-2 rounded-md hover:bg-[#184b84] transition">
                    View Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
