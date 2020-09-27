import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import JoblyApi from "./JoblyApi";
import UserContext from "./UserContext";

import { Card, Button, CardHeader, CardBody, CardTitle, CardText } from "reactstrap";

const JobCard = ({ id, title, salary, equity, company, userJobs }) => {
	const currUser = useContext(UserContext);
	const history = useHistory();

	// check if user has applied to job
	const checkStatus = (jobId) => {
		return userJobs.some((j) => j.id === jobId);
	};

	// apply for a job on click
	const apply = async () => {
		try {
			await JoblyApi.request(`jobs/${id}/apply`, { username: currUser.username }, "post");
			alert("Applied!");
			history.push("/");
		} catch (e) {
			alert(e);
		}
	};

	return (
		<Card className="m-4">
			{company ? (
				<CardHeader>
					<Link to={`/companies/${company}`}>{company}</Link> is hiring
				</CardHeader>
			) : null}
			<CardBody>
				<CardTitle>
					<Link to={`/jobs/${id}`}>{title}</Link>
				</CardTitle>
				<CardText>Salary: {salary}</CardText>
				<CardText>Equity: {equity}</CardText>
				{checkStatus(id) ? null : <Button onClick={apply}>Apply!</Button>}
			</CardBody>
		</Card>
	);
};
export default JobCard;
