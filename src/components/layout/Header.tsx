"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import UserAuthButton from "./UserAuthButton";

type DropdownItem = {
  name: string;
  path: string;
};

type NavLink = {
  linkKey: string;
  path: string;
  name: string;
  dropdown?: DropdownItem[];
};

/** Home is exact match only; other links stay active on nested routes (e.g. /seat-sharing/:id). */
function isNavLinkActive(pathname: string, linkPath: string) {
  if (linkPath === "/") {
    return pathname === "/" || pathname === "";
  }
  return pathname === linkPath || pathname.startsWith(`${linkPath}/`);
}

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(
    null
  );

  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const pathname = usePathname();

  const navlinks: NavLink[] = [
    { linkKey: "home", path: "#hero", name: "Home" },
    { linkKey: "about", path: "#about", name: "About Us" },
    { linkKey: "services", path: "#services", name: "Services" },
    { linkKey: "clients", path: "#clients", name: "Our Clients" },
    { linkKey: "projects", path: "#projects", name: "Our Projects" },
    { linkKey: "contact", path: "#contact", name: "Contact Us" },
  ];

  const navVariants = {
    hidden: { y: "-200%" },
    visible: {
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
    exit: {
      y: "-100%",
      transition: { duration: 0.3 },
    },
  };

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`header fixed top-0 z-20 py-1 transition-all duration-300 ease-in-out lg:px-4 h-[110px] flex ${
        scrolled ? "bg-transparent" : "bg-transparent"
      }`}
      id={navlinks[0].name}
    >
      <div className="header_inner container relative">
        <div className="min-w-[90px]">
          <Link href={"/"}>
            <Image src="/images/logo.svg" alt=" Logo" width={197} height={92} />
          </Link>
        </div>

        <button
          className="w-full justify-end transition-all duration-200 flex md:hidden"
          onClick={toggleMenu}
        >
          {!isOpen && (
            <RxHamburgerMenu
              className={`cursor-pointer text-3xl duration-300 active:scale-95 !text-white`}
            />
          )}
        </button>

        {/* Desktop Nav */}
        <nav className="items-center gap-6 hidden md:flex">
          {navlinks.map((navlink, i) => {
            const fullPath = navlink.path;

            if (navlink.dropdown) {
              const isDropdownActive = navlink.dropdown.some((d) =>
                pathname.includes(d.path)
              );
              return (
                <div
                  key={i}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(navlink.linkKey)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={`link flex items-center gap-1 ${
                      isDropdownActive ? "active" : ""
                    }`}
                  >
                    {navlink.name}
                    <svg
                      className={`w-3 h-3 transition-transform duration-200 ${
                        openDropdown === navlink.linkKey ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M2 4L6 8L10 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {openDropdown === navlink.linkKey && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-secondary border border-white/10 rounded-xl p-1.5 min-w-[150px] shadow-lg z-50"
                      >
                        {navlink.dropdown.map((item, j) => (
                          <Link
                            key={j}
                            href={item.path}
                            className="block px-4 py-2.5 rounded-lg text-sm text-white hover:bg-white/10 whitespace-nowrap transition-colors duration-150"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={i}
                href={fullPath}
                className={`link ${isNavLinkActive(pathname, fullPath) ? "active" : ""}`}
              >
                {navlink.name}
              </Link>
            );
          })}
        </nav>

        {/* <UserAuthButton /> */}
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            variants={navVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-accent fixed -left-3 top-0 z-50 flex h-screen w-[105%] flex-col items-start bg-secondary px-10 py-10"
          >
            <div className="flex w-full justify-end pr-6 text-6xl">
              <IoMdClose
                className={`cursor-pointer text-white`}
                onClick={toggleMenu}
              />
            </div>

            <div className="flex h-full flex-col items-start gap-10">
              {navlinks.map((navlink, i) => {
                const fullPath = navlink.path;

                if (navlink.dropdown) {
                  const isDropdownActive = navlink.dropdown.some((d) =>
                    pathname.includes(d.path)
                  );
                  const isExpanded = mobileOpenDropdown === navlink.linkKey;

                  return (
                    <motion.div
                      key={i}
                      // variants={navLists}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="flex flex-col gap-4"
                    >
                      <button
                        onClick={() =>
                          setMobileOpenDropdown(
                            isExpanded ? null : navlink.linkKey
                          )
                        }
                        className={`text-3xl font-light flex items-center gap-3 ${
                          isDropdownActive
                            ? "font-semibold text-white"
                            : "text-[#7B879D]"
                        }`}
                      >
                        {navlink.name}
                        <svg
                          className={`w-5 h-5 transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M2 4L6 8L10 4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col gap-4 pl-4 border-l border-white/20 overflow-hidden"
                          >
                            {navlink.dropdown.map((item, j) => (
                              <Link
                                key={j}
                                href={item.path}
                                onClick={toggleMenu}
                                className={`text-xl font-light hover:text-white transition-colors ${
                                  pathname.includes(item.path)
                                    ? "font-semibold text-white"
                                    : "text-[#7B879D]"
                                }`}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={i}
                    // variants={navLists}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Link
                      href={fullPath}
                      onClick={toggleMenu}
                      className={`text-3xl  font-light ${
                        isNavLinkActive(pathname, fullPath)
                          ? "font-semibold text-white"
                          : "text-[#7B879D]"
                      }`}
                    >
                      {navlink.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
