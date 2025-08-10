"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDownIcon, ArrowRightIcon, CloseIcon, HamburgerIcon } from "@/components/Icons";
import { usePathname, useRouter } from "next/navigation";

export interface MenuGroup {
  title: string;
  items: { label: string; href: string }[];
}

export interface MenuItem {
  label: string;
  href?: string;
  active?: boolean;
  groups?: MenuGroup[];
}

const menuItems: MenuItem[] = [
  { label: "HOME", href: "/", active: true },
  { label: "ABOUT US", href: "/about-us/" },
  {
    label: "SERVICES",
    groups: [
      {
        title: "Photo Editing",
        items: [
          { label: "Single Exposure", href: "/services/single-exposure" },
          { label: "HDR Bracket", href: "/services/hdr-bracket" },
          { label: "Flambient", href: "/services/flambient" },
          {
            label: "Day To Twilight or Dusk",
            href: "/services/day-to-twilight",
          },
          { label: "Water in Pool", href: "/services/water-in-pool" },
        ],
      },
      {
        title: "3D Visualizations",
        items: [
          { label: "360° Image Enhancement", href: "/services/360-image" },
          { label: "Virtual Staging", href: "/services/virtual-staging" },
          {
            label: "Virtual Renovations",
            href: "/services/virtual-renovations",
          },
          {
            label: "360° Virtual Staging",
            href: "/services/360-virtual-staging",
          },
          { label: "Changing Seasons", href: "/services/changing-seasons" },
        ],
      },
      {
        title: "Advanced Editing",
        items: [
          {
            label: "Real Estate Video Editing",
            href: "/services/video-editing",
          },
          { label: "Item Removal", href: "/services/item-removal" },
          { label: "Aerial/ Drone Highlight", href: "/services/aerial-drone" },
          { label: "Yacht", href: "/services/yacht" },
          { label: "Lawn Replacement", href: "/services/lawn-replacement" },
        ],
      },
    ],
  },
  { label: "BLOG", href: "/blog/" },
  { label: "CONTACT", href: "/contact/" },
];

const Navbar: React.FC<{ onSendFreeTest?: () => void }> = ({ onSendFreeTest }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState<number | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [selectedMobileGroup, setSelectedMobileGroup] = useState<MenuGroup[] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div
        className={`
          fixed inset-0 z-40 bg-black/50 backdrop-blur-sm
          transition-all duration-300 ease-in-out
          ${isMegaMenuOpen !== null && menuItems[isMegaMenuOpen]?.groups ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />
      <div
        className={`
          fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden
          transition-all duration-300 ease-in-out
          ${isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />
      <header
        className="bg-white shadow-[0px_4px_8px_0px_rgba(21,58,160,0.1)] md:mx-auto px-4 py-3 md:py-5  relative z-50 transition-all duration-300"
        ref={containerRef}
      >
        <div className="max-w-content mx-auto px-4 flex items-center justify-between">
          <Link href="/">
            <Image src="/images/logo.png" alt="Logo" width={130} height={50} className="object-contain" />
          </Link>
          <ul className="hidden md:flex gap-6 text-sm font-medium">
            {menuItems.map((item, idx) => (
              <li key={item.label} className="relative" onMouseEnter={() => setIsMegaMenuOpen(idx)} onMouseLeave={() => setIsMegaMenuOpen(null)}>
                {item.groups ? (
                  <>
                    <button className="text-[16px] flex items-center gap-1 hover:text-black/80 transition">
                      {item.label} <ChevronDownIcon size={16} />
                    </button>

                    {isMegaMenuOpen === idx && (
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 w-[200px] h-[40px] z-40"
                        onMouseEnter={() => setIsMegaMenuOpen(idx)}
                        onMouseLeave={() => setIsMegaMenuOpen(null)}
                      ></div>
                    )}

                    <div
                      className={`
                      absolute top-[calc(100%+40px)] left-1/2 -translate-x-1/2
                      bg-white shadow-2xl rounded-3xl p-10 flex gap-12 z-50
                      transition-all duration-300 ease-in-out
                      ${isMegaMenuOpen === idx ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"}
                    `}
                      onMouseEnter={() => setIsMegaMenuOpen(idx)}
                      onMouseLeave={() => setIsMegaMenuOpen(null)}
                    >
                      {item.groups.map((group) => (
                        <div key={group.title} className="min-w-[200px]">
                          <div className="font-semibold text-[#A78956] mb-3">{group.title}</div>
                          <ul className="space-y-2">
                            {group.items.map((sub) => (
                              <li key={sub.label}>
                                <Link href={sub.href} className="text-black/80 hover:text-black transition">
                                  {sub.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href!}
                    className={`transition text-[16px] font-medium hover:text-black ${pathname === item.href ? "text-black" : ""}`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <button
            onClick={onSendFreeTest}
            className="hidden md:flex ml-6 bg-black rounded-full text-white px-6 py-3 text-sm font-medium items-center gap-2 shadow hover:bg-black/90 transition"
          >
            Send Free Test <ArrowRightIcon />
          </button>
          <button
            className="md:hidden bg-white w-[44px] h-[44px] flex items-center justify-center shadow"
            onClick={() => {
              setIsMobileOpen(!isMobileOpen);
              setSelectedMobileGroup(null);
            }}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? "X" : <HamburgerIcon />}
          </button>
        </div>
      </header>
      {/* <div className="h-[90px] md:h-[90px]" /> */}

      {/* Mobile menu */}
      {isMobileOpen && (
        <div className="fixed top-0 inset-x-0 p-4 mt-[90px] z-50">
          <div className="bg-white rounded-3xl p-4 space-y-4 transition-all">
            {!selectedMobileGroup ? (
              <>
                {menuItems.map((item) => (
                  <div key={item.label}>
                    {item.groups ? (
                      <button
                        onClick={() => setSelectedMobileGroup(item.groups!)}
                        className="w-full text-left py-2 px-3 text-black font-medium flex justify-between items-center"
                      >
                        {item.label} <ChevronDownIcon size={16} />
                      </button>
                    ) : (
                      <Link href={item.href!} onClick={() => setIsMobileOpen(false)} className="block py-2 px-3 text-black font-medium">
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <div className="space-y-4">
                <button onClick={() => setSelectedMobileGroup(null)} className="text-sm text-gray-600 flex items-center gap-1">
                  ← Back
                </button>
                {selectedMobileGroup.map((group) => (
                  <div key={group.title}>
                    <div className="font-semibold text-[#A78956] mb-2">{group.title}</div>
                    <ul className="space-y-2">
                      {group.items.map((sub) => (
                        <li key={sub.label}>
                          <Link
                            href={sub.href}
                            onClick={() => setIsMobileOpen(false)}
                            className="text-black/80 hover:text-black transition block px-3"
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={onSendFreeTest}
              className="bg-black rounded-full text-white px-6 py-3 text-sm font-medium w-full flex items-center justify-center gap-2 shadow hover:bg-black/90 transition"
            >
              Send Free Test <ArrowRightIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
