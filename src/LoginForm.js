import React, { useState} from "react";
import { Button, Form, Label, Input, FormGroup } from 'reactstrap';
/** 
 *
 * Has state for the name/quantity of the item; on submission,
 * sends {name, qty} to fn rec'd from parent.
 *
 */

const LoginForm = ({login}) => {
  const INITIAL_STATE = { username:"", password: ""};
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleSubmit = evt => {
    evt.preventDefault();
    const {username, password}=formData;
    login(username, password);
    setFormData(INITIAL_STATE);
  };

  /** Update local state w/curr state of input elem */

  const handleChange = evt => {
    const { name, value }= evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value
    }));
  };

  /** render form */

  return (
<section className=" SignupForm col">
    <Form onSubmit={handleSubmit}>
      <FormGroup >
      <h5 className="font-weight-bold text-center">Log In</h5>
      <Label htmlFor="username">Username:</Label>
      <Input className="text-center"
        id="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required/> 
    

      <Label htmlFor="password">Password:</Label>
      <Input className="text-center"
      type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />


      <Button color="success">Login</Button>
      </FormGroup>
    </Form>
    </section>
  );
};

export default LoginForm;