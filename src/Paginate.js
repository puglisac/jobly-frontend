import React from "react";
import { Pagination, PaginationLink } from "reactstrap";

const Paginate = ({ handleClick, length, start }) => {
	return (
		<Pagination className="nav justify-content-center" aria-label="Page navigation">
			{start ? (
				<div onClick={() => handleClick(false)}>
					<PaginationLink previous />
				</div>
			) : null}
			{length < 20 ? null : (
				<div onClick={() => handleClick(true)}>
					<PaginationLink next />
				</div>
			)}
		</Pagination>
	);
};

export default Paginate;
