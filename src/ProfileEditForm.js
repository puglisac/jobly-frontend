import React, { useState, useContext } from "react";
import { Button, Form, Label, Input, FormGroup } from "reactstrap";
import "./SignupForm.css";
import { useParams, useHistory } from "react-router-dom";
import UserContext from "./UserContext";
/** 
 *
 * Has state for the name/quantity of the item; on submission,
 * sends {name, qty} to fn rec'd from parent.
 *
 */

const ProfileEditForm = ({ editProfile }) => {
	const currUser = useContext(UserContext);
	const INITIAL_STATE = {
		firstName: currUser.first_name,
		lastName: currUser.last_name,
		email: currUser.email,
		image: currUser.photo_url,
		password: ""
	};
	const [ formData, setFormData ] = useState(INITIAL_STATE);
	const { username } = useParams();

	const history = useHistory();

	// updates a user profile on submit
	const handleSubmit = (evt) => {
		evt.preventDefault();
		const { firstName, lastName, email, password, image } = formData;
		editProfile(username, password, firstName, lastName, email, image);
		history.push(`/users/${username}`);
	};

	/** Update local state w/curr state of input elem */

	const handleChange = (evt) => {
		const { name, value } = evt.target;
		setFormData((fData) => ({
			...fData,
			[name]: value
		}));
	};

	/** render form */

	return (
		<section className=" SignupForm col">
			<Form onSubmit={handleSubmit}>
				<FormGroup>
					<h5 className="font-weight-bold text-center">Edit Info</h5>

					<Label htmlFor="firstName">First Name:</Label>
					<Input
						className="text-center"
						id="firstName"
						name="firstName"
						value={formData.firstName}
						onChange={handleChange}
						required
					/>
					<Label htmlFor="lastName">Last Name:</Label>
					<Input
						className="text-center"
						id="lastName"
						name="lastName"
						value={formData.lastName}
						onChange={handleChange}
						required
					/>
					<Label htmlFor="email">Email:</Label>
					<Input
						className="text-center"
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						required
					/>

					<Label htmlFor="image">Image Url:</Label>
					<Input
						className="text-center"
						id="image"
						name="image"
						value={formData.image}
						onChange={handleChange}
						required
					/>
					<Label htmlFor="password">Confirm Password:</Label>
					<Input
						className="text-center"
						type="password"
						id="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						required
					/>
					<Button color="success">Edit!</Button>
				</FormGroup>
			</Form>
		</section>
	);
};

export default ProfileEditForm;
