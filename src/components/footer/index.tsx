"use client";

import { HeartFilled, HomeFilled } from "@ant-design/icons";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Footer = () => {
  const className =
    " font-semibold text-lg rounded-lg bg-yellow-300 py-2 px-6 hover:!bg-yellow-300";
  const path = usePathname();

  return (
    <nav className="w-full fixed bottom-0 translate-y-2 z-50 py-5 bg-white shadow-md min-[576px]:hidden">
      <div className="flex justify-center items-center container">
        <ul className="list-none flex gap-6">
          <li>
            <Link
              className={`${className} ${path === "/" ? "" : "!bg-slate-100"}`}
              href="/"
            >
              <HomeFilled />
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
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
