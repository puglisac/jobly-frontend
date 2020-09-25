import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, CardHeader, CardBody, CardTitle, CardText } from "reactstrap";

const CompanyCard = ({ handle, name, description, logoUrl, numEmployees, toggleJobs, toggleText }) => {
	return (
		<Card className="m-4">
			<CardHeader>
				<Link to={`/companies/${handle}`}>{name}</Link>
			</CardHeader>
			<CardBody>
				<CardTitle>{description}</CardTitle>
				{numEmployees ? <CardText>Employees: {numEmployees}</CardText> : null}
				<img src={logoUrl} width="50px" className="float-right" alt="company logo" />
				{toggleJobs ? <Button onClick={toggleJobs}>{toggleText}</Button> : null}
			</CardBody>
		</Card>
	);
};
export default CompanyCard;
