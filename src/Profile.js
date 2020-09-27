import React, { useContext } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";
import { useParams, useHistory, Redirect } from "react-router-dom";
import UserContext from "./UserContext";

const Profile = () => {
	const history = useHistory();
	// directs to profile edit page
	const handleClick = () => {
		history.push(`/users/${currUser.username}/edit`);
	};

	// get username and user from params and context
	const { username } = useParams();
	const currUser = useContext(UserContext);

	// redirects if logged in user tries to access another user's profile
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
