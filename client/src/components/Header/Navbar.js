import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

function Navbar() {
	const logout = (event) => {
		event.preventDefault();
		Auth.logout();
	};
	return (
		<div className="container-fluid justify-space-between ">
			<div className="nav navbar">
				<div>
					<Link className="site-title" to="/">
						<h1 className="m-0">Site Title</h1>
					</Link>
					<p className="m-0">Official slogan of this website!</p>
				</div>
				<div className="d-flex">
					{Auth.loggedIn() ? (
						<>
							<Link className="nav-link" to="/post">
								Create Post
							</Link>
							<Link className="nav-link" to="/feed">
								Feed
							</Link>
							<Link className="nav-link" to="/me">
								{Auth.getProfile().data.username}'s Profile
							</Link>
							<Link className="nav-link" onClick={logout}>
								Logout
							</Link>
						</>
					) : (
						<>
							<Link className="nav-link" to="/login">
								Login
							</Link>
							<Link className="nav-link" to="/signup">
								Signup
							</Link>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default Navbar;
