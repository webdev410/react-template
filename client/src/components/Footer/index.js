import React from "react";
import { useLocation, useHistory } from "react-router-dom";

const Footer = () => {
	const location = useLocation();
	const history = useHistory();
	return (
		<footer className="w-100 p-3">
			<div className="container text-center mb-5">
				{location.pathname !== "/" && (
					<button
						className="btn btn-dark mb-3"
						onClick={() => history.goBack()}
					>
						&larr; Go Back
					</button>
				)}
				<p className="text-muted">
					{" "}
					&copy; 2021 Company Name. All Rights Reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
