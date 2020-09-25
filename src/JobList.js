import React, { useState, useEffect, useContext } from "react";
import JobCard from "./JobCard";
import JoblyApi from "./JoblyApi";
import { useParams, useHistory } from "react-router-dom";
import FilterForm from "./FilterForm";
import UserContext from "./UserContext";
import Pages from "./Pages";
import Paginate from "./Paginate";

const JobList = () => {
	const [ isLoading, setIsLoading ] = useState(true);
	const [ jobs, setJobs ] = useState();
	const [ userJobs, setUserJobs ] = useState();
	const [ start, setStart ] = useState(0);
	const { id } = useParams();
	const currUser = useContext(UserContext);
	const history = useHistory();

	const search = async (text) => {
		const res = await JoblyApi.request(`jobs/?search=${text}`);
		setJobs(Pages(res.jobs, start));
	};
	const getJobs = async (id = "") => {
		try {
			const res = await JoblyApi.request(`jobs/${id}`);
			if (id) {
				setJobs([ res.job ]);
			} else {
				setJobs(Pages(res.jobs, start));
			}
			setUserJobs(await getUserJobs(currUser.username));
			setIsLoading(false);
		} catch (e) {
			alert(e);
			history.push("/");
		}
	};

	const getUserJobs = async (username) => {
		const user = await JoblyApi.request(`users/${username}`);
		return user.user.jobs;
	};

	const handleClick = (up) => {
		up ? setStart(start + 20) : setStart(start - 20);
	};

	useEffect(
		() => {
			getJobs(id);
		},
		[ id, start ]
	);
	if (isLoading || !userJobs) {
		return <p>Loading &hellip;</p>;
	}

	return (
		<div>
			<h1>Jobs</h1>
			<FilterForm search={search} />
			{jobs.map((j) => (
				<JobCard
					key={j.id}
					id={j.id}
					title={j.title}
					salary={`$${j.salary}.00`}
					equity={j.equity}
					company={j.company_handle}
					userJobs={userJobs}
				/>
			))}
			<Paginate handleClick={handleClick} start={start} length={jobs.length} />
		</div>
	);
};
export default JobList;
