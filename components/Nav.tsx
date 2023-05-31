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
];

const Nav = () => {
	const { data: session } = useSession();
	return (
		<div className="navbar bg-base-100">
			<div className="flex-1">
				<a className="btn btn-ghost normal-case text-xl" href={"/"}>
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
			<div className="flex-none">
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
		</div>
	);
};

export default Nav;
