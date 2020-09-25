import React, { useContext } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";
import { useParams, useHistory, Redirect } from "react-router-dom";
import UserContext from "./UserContext";

const Profile = () => {
	const history = useHistory();
	const handleClick = () => {
		history.push(`/users/${currUser.username}/edit`);
	};

	const { username } = useParams();
	const currUser = useContext(UserContext);

	if (username !== currUser.username) {
		return <Redirect to="/" />;
	}
	return (
		<div>
			<Card>
				<CardImg top width="100%" src={currUser.photo_url} alt="profile" />
				<CardBody>
					<CardTitle>Username: {username}</CardTitle>
					<CardSubtitle>Email: {currUser.email}</CardSubtitle>
					<CardText>
						Full Name: {currUser.first_name} {currUser.last_name}
					</CardText>
					<Button color="primary" onClick={handleClick}>
						Edit
					</Button>
				</CardBody>
			</Card>
		</div>
	);
};

export default Profile;
