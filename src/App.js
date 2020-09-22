import React, {useState} from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import JoblyApi from './JoblyApi'
import NavBar from "./NavBar";
import Home from "./Home";
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import JobList from './JobList';
import CompanyList from './CompanyList'
import UserContext from "./UserContext";
import Profile from './Profile';
import CompanyDetails from './CompanyDetails';


function App() {
	const [currUser, setCurrUser]=useState()

	const login=async (username, password)=>{
		const resp = await JoblyApi.request("login", {username, password}, "post");
		setCurrUser(resp);
	}
	const signup=async (username, password, firstName, lastName, email)=>{
		const resp = await JoblyApi.request("users", {username, password, firstName, lastName, email}, "post");
		setCurrUser(resp);
	}
	return (

		<UserContext.Provider value={currUser}>
		<div className="App">
			<NavBar currUser={currUser}/>
			<BrowserRouter>
				<main>
					<Switch>
						<Route exact path="/">
							{currUser ? null : <Home/>}
						</Route>
						<Route exact path="/signup">
							<SignupForm signup={signup} />
						</Route>
						<Route exact path="/login">
							<LoginForm login={login}/>
						</Route>
						<Route exact path="/jobs">
							<JobList/>
						</Route>
						<Route exact path="/companies">
							<CompanyList/>
						</Route>
						<Route exact path="/companies/:handle">
							<CompanyDetails/>
						</Route>
						<Route path="/jobs/:id">
							<JobList/>
						</Route>
						<Route path="/users/:username">
							<Profile />
						</Route>
						<Route>
							<p>Hmmm. I can't seem to find what you're looking for.</p>
						</Route>
					</Switch>
				</main>
			</BrowserRouter>
		</div>
		</UserContext.Provider>
	);
}

export default App;
