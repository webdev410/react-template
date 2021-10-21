import React from "react";
import { useQuery } from "@apollo/client";

import ThoughtList from "../components/ThoughtList";
import ThoughtForm from "../components/ThoughtForm";

import { QUERY_THOUGHTS } from "../utils/queries";

const Feed = () => {
	const { loading, data } = useQuery(QUERY_THOUGHTS);
	const thoughts = data?.thoughts || [];

	return (
		<main>
			<div className="d-flex row flex-column align-items-center">
				<div className="col-12 col-md-8 mb-3">
					{loading ? (
						<div>Loading...</div>
					) : (
						<ThoughtList thoughts={thoughts} title="Feed" />
					)}
				</div>
			</div>
		</main>
	);
};

export default Feed;
