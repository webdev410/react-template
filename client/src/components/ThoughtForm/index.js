import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_THOUGHT } from "../../utils/mutations";
import { QUERY_THOUGHTS, QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";

const ThoughtForm = () => {
	const [thoughtText, setThoughtText] = useState("");

	const [characterCount, setCharacterCount] = useState(0);

	const [addThought, { error }] = useMutation(ADD_THOUGHT, {
		update(cache, { data: { addThought } }) {
			try {
				const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });

				cache.writeQuery({
					query: QUERY_THOUGHTS,
					data: { thoughts: [addThought, ...thoughts] },
				});
			} catch (e) {
				console.error(e);
			}

			// update me object's cache
			const { me } = cache.readQuery({ query: QUERY_ME });
			cache.writeQuery({
				query: QUERY_ME,
				data: { me: { ...me, thoughts: [...me.thoughts, addThought] } },
			});
		},
	});

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			const { data } = await addThought({
				variables: {
					thoughtText,
					thoughtAuthor: Auth.getProfile().data.username,
				},
			});

			setThoughtText("");
		} catch (err) {
			console.error(err);
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		if (name === "thoughtText" && value.length <= 280) {
			setThoughtText(value);
			setCharacterCount(value.length);
		}
	};

	return (
		<div className="d-flex flex-column text-center justify-content-center">
			<h3>What's on your mind?</h3>

			{Auth.loggedIn() ? (
				<>
					<p
						className={`m-0 ${
							characterCount === 280 || error ? "text-danger" : ""
						}`}
					>
						Character Count: {characterCount}/280
					</p>
					<form
						className="d-flex flex-column justify-content-center justify-space-between align-items-center mt-1"
						onSubmit={handleFormSubmit}
					>
						<div className="col-12 col-lg-9">
							<textarea
								name="thoughtText"
								placeholder="Here's a new post..."
								value={thoughtText}
								className=" w-100 p-2"
								style={{
									lineHeight: "1.5",
									resize: "vertical",
								}}
								onChange={handleChange}
							></textarea>
						</div>

						<div className="col-12 col-lg-3">
							<button className="btn btn-primary " type="submit">
								Add Post
							</button>
						</div>
						{error && (
							<div className="col-12 my-3 bg-danger text-white p-3">
								{error.message}
							</div>
						)}
					</form>
				</>
			) : (
				<p>
					You need to be logged in to share your thoughts. Please{" "}
					<Link to="/login">login</Link> or{" "}
					<Link to="/signup">signup.</Link>
				</p>
			)}
		</div>
	);
};

export default ThoughtForm;
