import React from "react";

const CommentList = ({ comments = [] }) => {
	if (!comments.length) {
		return <h3>No Comments Yet</h3>;
	}

	return (
		<div className="">
			<h3
				className="p-3 display-inline-block"
				style={{ borderBottom: "1px dotted #1a1a1a" }}
			>
				Comments
			</h3>
			<div className=" my-2">
				{comments &&
					comments.map((comment) => (
						<div key={comment._id} className="col-12 mb-1 ">
							<div className="card-header">
								<h5>{comment.commentAuthor}</h5>

								<p>
									commented{" "}
									<span style={{ fontSize: "0.825rem" }}>
										on {comment.createdAt}
									</span>
								</p>
							</div>
							<p className="card-body">{comment.commentText}</p>
						</div>
					))}
			</div>
		</div>
	);
};

export default CommentList;
