import React from "react";
import { Link } from "react-router-dom";

const ThoughtList = ({
	thoughts,
	title,
	showTitle = true,
	showUsername = true,
}) => {
	if (!thoughts.length) {
		return (
			<h3 className="text-center bg-danger text-light">
				No Thoughts Yet
			</h3>
		);
	}

	return (
		<div className="component-container">
			{showTitle && <h3>{title}</h3>}
			{thoughts &&
				thoughts.map((thought) => (
					<div key={thought._id} className="card mb-3 ">
						<h4 className="card-header p-2 m-0">
							{showUsername ? (
								<Link
									className=""
									to={`/profiles/${thought.thoughtAuthor}`}
								>
									{thought.thoughtAuthor} <br />
									<span
										className="text-muted"
										style={{
											fontSize: "1rem",
											lineHeight: "1em",
										}}
									>
										{thought.createdAt}
									</span>
								</Link>
							) : (
								<>
									<span style={{ fontSize: "1rem" }}>
										Posted on {thought.createdAt}
									</span>
								</>
							)}
						</h4>
						<div className="card-body bg-light p-2">
							<p>{thought.thoughtText}</p>
						</div>
						<Link className="btn " to={`/thoughts/${thought._id}`}>
							Comment & Post Details
						</Link>
					</div>
				))}
		</div>
	);
};

export default ThoughtList;
