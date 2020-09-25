import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
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
import ProfileEditForm from './ProfileEditForm'
import useLocalStorage from './useLocalStorage'

function App() {
	const [currUser, setCurrUser]=useLocalStorage("currUser", null);
	const [token, setToken]=useLocalStorage("token", null);


	const login=async (username, password)=>{
		try{
			const resp = await JoblyApi.request("login", {username, password}, "post");
			setToken(resp.token);
			setCurrUser(resp.user);

		} catch(e){
			alert(e);
		}

	}
	const signup=async (username, password, first_name, last_name, email)=>{
		try{
			const resp = await JoblyApi.request("users", {username, password, first_name, last_name, email}, "post");
			setToken(resp.token);
			setCurrUser( resp.user);
		}catch(e){
			alert(e);
		}
	
	}
	const logout = () =>{
		setToken(null);
		setCurrUser(null);
	}

	const editProfile=async (username, password, first_name, last_name, email, photo_url)=>{
		try{
			const resp = await JoblyApi.request(`users/${username}`, {password, first_name, last_name, email, photo_url}, "patch")
			setCurrUser(resp.user)
		}catch(e){
			alert(e)
		}
	}
	return (
		<UserContext.Provider value={currUser}>
		<div className="App">
			
			<BrowserRouter>
			<NavBar currUser={currUser} logout={logout}/>
				<main>
					<Switch>
						<Route exact path="/">
							{currUser ? <Redirect to="/jobs"/> : <Home/>}
						</Route>
						<Route exact path="/signup">
						{currUser ? <Redirect to="/jobs"/> : <SignupForm signup={signup} />}
						</Route>
						<Route exact path="/login">
						{currUser ? <Redirect to="/jobs"/> :<LoginForm login={login}/>}
						</Route>

						<Route exact path="/jobs">
						{currUser ? <JobList/>: <Redirect to="/"/>}
						</Route>
						<Route exact path="/companies">
						{currUser ? <CompanyList/>: <Redirect to="/"/>}
						</Route>
						<Route exact path="/companies/:handle">
						{currUser ? <CompanyDetails/>: <Redirect to="/"/>}
						</Route>
						<Route exact path="/jobs/:id">
						{currUser ? <JobList/>: <Redirect to="/"/>}
						</Route>
						<Route exact path="/users/:username">
						{currUser ? <Profile/>: <Redirect to="/"/>}
						</Route>
						<Route exact path="/users/:username/edit">
						{currUser ? <ProfileEditForm editProfile={editProfile}/>: <Redirect to="/"/>}
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
