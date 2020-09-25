import React, { useState } from "react";

import { Form, Input, FormGroup } from "reactstrap";
/** 
 *
 * Has state for the name/quantity of the item; on submission,
 * sends {name, qty} to fn rec'd from parent.
 *
 */

const FilterForm = ({ search }) => {
	const INITIAL_STATE = { text: "" };
	const [ formData, setFormData ] = useState(INITIAL_STATE);

	const handleSubmit = (evt) => {
		evt.preventDefault();
	};

	/** Update local state w/curr state of input elem */

	const handleChange = (evt) => {
		const { name, value } = evt.target;
		setFormData((fData) => ({
			...fData,
			[name]: value
		}));
		search(formData.text);
	};

	/** render form */

	return (
		<section className="col">
			<Form onSubmit={handleSubmit}>
				<FormGroup>
					<Input
						className="text-center"
						id="search"
						name="text"
						value={formData.text}
						onChange={handleChange}
						placeholder="Filter"
					/>
				</FormGroup>
			</Form>
		</section>
	);
};

export default FilterForm;
