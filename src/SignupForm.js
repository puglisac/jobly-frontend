import React, { useState } from "react";
import { Button, Form, Label, Input, FormGroup } from "reactstrap";
import "./SignupForm.css";

/** 
 *
 * Has state for the name/quantity of the item; on submission,
 * sends {name, qty} to fn rec'd from parent.
 *
 */

const SignupForm = ({ signup }) => {
	const INITIAL_STATE = { username: "", password: "", firstName: "", lastName: "", email: "" };
	const [ formData, setFormData ] = useState(INITIAL_STATE);

	const handleSubmit = (evt) => {
		evt.preventDefault();
		const { username, password, firstName, lastName, email } = formData;
		signup(username, password, firstName, lastName, email);
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
					<h5 className="font-weight-bold text-center">Sign Up</h5>
					<Label htmlFor="username">Username:</Label>
					<Input
						className="text-center"
						id="username"
						name="username"
						value={formData.username}
						onChange={handleChange}
						required
					/>

					<Label htmlFor="password">Password:</Label>
					<Input
						className="text-center"
						type="password"
						id="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						required
					/>

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

					<Button color="success">Sign Up!</Button>
				</FormGroup>
			</Form>
		</section>
	);
};

export default SignupForm;
