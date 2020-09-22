import React from "react";
import { Card, Button, CardTitle, CardText } from "reactstrap";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div className="container">
			<Card body className="text-center">
				<CardTitle>Welcome to Jobly</CardTitle>
				<CardText>Login or Sign-up to start looking for jobs!</CardText>
				<div className="row w">
					<Link className="col" to="/login">
						<Button color="primary">Login</Button>
					</Link>
					<Link className="col " to="/signup">
						<Button color="primary">Sign Up</Button>
					</Link>
				</div>
			</Card>
		</div>
	);
};
export default Home;
