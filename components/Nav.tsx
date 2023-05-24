"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const Nav = () => {
	const { data: session } = useSession();
	return (
		<div className="navbar bg-base-100">
			<div className="flex-1">
				<a className="btn btn-ghost normal-case text-xl">SWJ 3.0</a>
			</div>
			<div>{session && <p>{session.user?.name}</p>}</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal px-1">
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
