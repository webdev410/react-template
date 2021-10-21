import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import ThoughtForm from "../components/ThoughtForm";
import ThoughtList from "../components/ThoughtList";

import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = () => {
	const { username: userParam } = useParams();

	const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
		variables: { username: userParam },
	});

	const user = data?.me || data?.user || {};
	// redirect to personal profile page if username is yours
	if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
		return <Redirect to="/me" />;
	}

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!user?.username) {
		return (
			<div className="d-flex justify-content-center">
				<h4 className="text-center">
					You need to be logged in to see this. Use the navigation
					links above to sign up or log in!
				</h4>
			</div>
		);
	}

	return (
		<div>
			<div className="d-flex row justify-content-center">
				<p className="col-12 col-md-10 bg-dark text-light text-center ">
					Viewing {userParam ? `${user.username}'s` : "your"} Profile.
				</p>
				{!userParam && (
					<div
						className="col-12 col-md-10 mb-3 p-3"
						style={{ border: "1px dotted #1a1a1a" }}
					>
						<ThoughtForm />
					</div>
				)}
				<h2 className="text-center mb-3">Your Posts</h2>
				<div className="col-12 col-md-10 mb-5">
					<ThoughtList
						thoughts={user.thoughts}
						title={`${user.username}'s thoughts...`}
						showTitle={false}
						showUsername={false}
					/>
				</div>
			</div>
		</div>
	);
};

export default Profile;
