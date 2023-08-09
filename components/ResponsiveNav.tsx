import React from "react";

const ResponsiveNav = () => {
	return (
		<nav className="mt-10">
			<section className="MOBILE-MENU flex lg:hidden ">
				<div className="HAMBURGER-ICON space-y-2">
					<span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
					<span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
					<span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
				</div>

				<div>
					<div className="absolute top-0 right-0 px-8 py-8">
						<div className="dropdown">
							<label tabIndex={0} className="btn m-1">
								Click
							</label>
							<ul
								tabIndex={0}
								className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
							>
								<li>
									<a>Item 1</a>
								</li>
								<li>
									<a>Item 2</a>
								</li>
							</ul>
						</div>
					</div>
					<ul className="NAVIGATION-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]">
						<li className="border-b border-gray-400 my-8 uppercase">
							<a href="/about">About</a>
						</li>
						<li className="border-b border-gray-400 my-8 uppercase">
							<a href="/portfolio">Portfolio</a>
						</li>
						<li className="border-b border-gray-400 my-8 uppercase">
							<a href="/contact">Contact</a>
						</li>
					</ul>
				</div>
			</section>

			<ul className="DESKTOP-MENU hidden space-x-8 lg:flex">
				<li>
					<a href="/about">About</a>
				</li>
				<li>
					<a href="/portfolio">Portfolio</a>
				</li>
				<li>
					<a href="/contact">Contact</a>
				</li>
			</ul>
		</nav>
	);
};

export default ResponsiveNav;
