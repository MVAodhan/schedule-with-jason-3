"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Tabs = [
	{
		id: 1,
		path: "/add",
		label: "Add Episode",
	},
	{
		id: 2,
		path: "/schedule",
		label: "Scheduled",
	},
];

const Nav = () => {
	const { data: session } = useSession();
	return (
		<div className="navbar bg-slate-50">
			<div className="flex-1">
				<a className="btn btn-ghost normal-case" href={"/"}>
					SWJ 3.0
				</a>
				{session && (
					<div className="avatar">
						<button className="w-8 rounded ml-2">
							<Image
								src={session.user?.image!}
								width={40}
								height={40}
								alt="user avatar"
								style={{ borderRadius: "50%" }}
							/>
						</button>
					</div>
				)}
			</div>
			<div className="hidden md:flex">
				<ul className="menu menu-horizontal px-1">
					{Tabs.map((tab) => (
						<li key={tab.id}>
							<Link href={tab.path}>{tab.label}</Link>
						</li>
					))}
					{session ? (
						<li>
							<button onClick={() => signOut()}>Signout</button>
						</li>
					) : (
						<li>
							<button onClick={() => signIn()}>Sign In</button>
						</li>
					)}
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
					{Tabs.map((tab) => (
						<li key={tab.id}>
							<Link href={tab.path}>{tab.label}</Link>
						</li>
					))}
					{session ? (
						<li>
							<button onClick={() => signOut()}>Signout</button>
						</li>
					) : (
						<li>
							<button onClick={() => signIn()}>Sign In</button>
						</li>
					)}
				</ul>
			</div>
		</div>
	);
};

export default Nav;
