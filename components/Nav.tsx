"use client";
import { useUser, SignOutButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const tabs = [
  {
    id: 1,
    path: "/new",
    label: "New Episode",
  },
];

const Nav = () => {
  const { user } = useUser();
  const { userId } = useAuth();

  return (
    <div className="navbar bg-slate-50 w-screen">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case" href={"/"}>
          SWJ 3.0
        </a>
      </div>
      {user && (
        <>
          <div className="px-2">{user.firstName}</div>
          <div className="px-2">
            <SignOutButton />
          </div>
        </>
      )}

      <div className="hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <Link href={tab.path}>{tab.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="dropdown dropdown-end md:hidden">
        <label
          tabIndex={0}
          className="btn m-1 border-none bg-transparent hover:bg-transparent"
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 44 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="44" height="5" rx="2" fill="#0A0A0A" />
            <rect y="20" width="44" height="5" rx="2" fill="#0A0A0A" />
            <rect y="10" width="44" height="5" rx="2" fill="#0A0A0A" />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-slate-100 rounded-box w-52"
        >
          {tabs.map((tab) => (
            <li key={tab.id}>
              <Link href={tab.path}>{tab.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Nav;
