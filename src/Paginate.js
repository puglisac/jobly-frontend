import React from "react";
import { Pagination, Button, PaginationLink } from "reactstrap";

const Paginate = ({ handleClick, length, start }) => {
	return (
		<Pagination aria-label="Page navigation example">
			{start ? (
				<Button onClick={() => handleClick(false)}>
					<PaginationLink previous />
				</Button>
			) : null}
			{length < 20 ? null : (
				<Button onClick={() => handleClick(true)}>
					<PaginationLink next />
				</Button>
			)}
		</Pagination>
	);
};

export default Paginate;
