import React, { useState } from "react";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink
} from "reactstrap";

const NavBar = ({currUser}) => {
	const [ isOpen, setIsOpen ] = useState(false);

	const INITIAL_STATE = { text:""};
	const [formData, setFormData] = useState(INITIAL_STATE);
  
	const handleSubmit = evt => {
	  evt.preventDefault();
	  const {text}=formData;
	//   search(text)
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

	const toggle = () => setIsOpen(!isOpen);
	return (
		<div>
			<Navbar color="light" light expand="md">
				<NavbarBrand href="/">Jobly</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="mr-auto" navbar>
						{currUser ? (
						<>
						<NavItem>
							<NavLink href="/jobs">Jobs</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/companies">Companies</NavLink>
						</NavItem> 
						<NavItem>
							<form onSubmit={handleSubmit} class="form-inline my-2 my-lg-0">
      						<input name="text" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={handleChange}/>
      						<button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
    						</form>
						</NavItem>
						</>
						)
						:(
						<>
						<NavItem>
							<NavLink href="/login">login</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/users">Sign Up</NavLink>
						</NavItem>
						</>
						)}
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
};

export default NavBar;
