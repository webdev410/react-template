import React from "react";
import { useQuery } from "@apollo/client";

import ThoughtList from "../components/ThoughtList";
import ThoughtForm from "../components/ThoughtForm";

import { QUERY_THOUGHTS } from "../utils/queries";

const Post = () => {
	const { loading, data } = useQuery(QUERY_THOUGHTS);
	const thoughts = data?.thoughts || [];

	return (
		<main>
			<div className="d-flex row flex-column align-items-center">
				<div className="col-12 col-md-10 mb-3 p-3 component-container">
					<ThoughtForm />
				</div>
			</div>
		</main>
	);
};

export default Post;
