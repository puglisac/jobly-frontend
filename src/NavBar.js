import React, { useState } from "react";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	Button,
	NavLink
} from "reactstrap";
import './NavBar.css'

const NavBar = ({currUser, logout}) => {
	const [ isOpen, setIsOpen ] = useState(false);





	const toggle = () => setIsOpen(!isOpen);
	return (
		<div>
			<Navbar className="NavBar" light  expand="md">
				<NavbarBrand href="/">Jobly</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="mr-auto" navbar>
						{currUser ? (
						<>
						<NavItem active={window.location.pathname === "/jobs"}>
							<NavLink href="/jobs">Jobs</NavLink>
						</NavItem>
						<NavItem active={window.location.pathname === "/companies"}>
							<NavLink href="/companies">Companies</NavLink>
						</NavItem> 
						<NavItem active={window.location.pathname === `/users/${currUser.username}`}>
							<NavLink href={`/users/${currUser.username}`}>{currUser.username}</NavLink>
						</NavItem> 
							<Button  onClick={logout}>Logout</Button>
						</>
						)
						:(
						<>
						<NavItem active={window.location.pathname === "/login"}>
							<NavLink href="/login">login</NavLink>
						</NavItem>
						<NavItem active={window.location.pathname === "/signup"}>
							<NavLink href="/signup">Sign Up</NavLink>
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
