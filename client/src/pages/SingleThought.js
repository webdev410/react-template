import React from "react";

// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

import { QUERY_SINGLE_THOUGHT } from "../utils/queries";

const SingleThought = () => {
	// Use `useParams()` to retrieve value of the route parameter `:profileId`
	const { thoughtId } = useParams();

	const { loading, data } = useQuery(QUERY_SINGLE_THOUGHT, {
		// pass URL parameter
		variables: { thoughtId: thoughtId },
	});

	const thought = data?.thought || {};

	if (loading) {
		return <div>Loading...</div>;
	}
	return (
		<div className="row justify-content-center ">
			<div className="card component-container col-11 col-md-10 col-lg-9">
				<div className="">
					<h3 className="card-header m-0">
						{thought.thoughtAuthor} <br />
						<span style={{ fontSize: "1rem" }}>
							had this thought on {thought.createdAt}
						</span>
					</h3>
					<div className="bg-light py-4">
						<blockquote
							className="p-4"
							style={{
								fontSize: "1.5rem",
								fontStyle: "italic",
								border: "2px dotted #1a1a1a",
								lineHeight: "1.5",
							}}
						>
							{thought.thoughtText}
						</blockquote>
					</div>

					<div className="">
						<CommentList comments={thought.comments} />
					</div>
					<div className="m-3 p-4">
						<CommentForm thoughtId={thought._id} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleThought;
