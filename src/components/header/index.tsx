"use client";

import { HeartFilled, HomeFilled } from "@ant-design/icons";
import { LOGO } from "@public/index";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
  const className =
    "flex gap-2 font-semibold text-lg rounded-lg bg-yellow-300 p-2 hover:!bg-yellow-300";
  const path = usePathname();

  return (
    <nav className="w-full fixed z-50 py-5 top-0 bg-white shadow-md ">
      <div className="flex justify-between items-center container px-4 max-[576px]:justify-center">
        <Link href="/">
          <img className="h-16 cursor-pointer" src={LOGO} alt="logo" />
        </Link>
        <ul className="list-none flex gap-4 max-[576px]:hidden">
          <li>
            <Link
              className={`${className} ${path === "/" ? "" : "!bg-slate-100"}`}
              href="/"
            >
              <HomeFilled />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              className={`${className} ${
                path === "/favorites" ? "" : "!bg-slate-100"
              }`}
              href="/favorites"
            >
              <HeartFilled />
              <span>Favorites</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
