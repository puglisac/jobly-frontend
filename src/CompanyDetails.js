import React, {useState, useEffect, useContext} from 'react';
import CompanyCard from './CompanyCard';
import JoblyApi from './JoblyApi';
import {useParams} from 'react-router-dom';
import JobCard from './JobCard'
import UserContext from './UserContext'


const CompanyList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [company, setCompany]=useState();
    const {handle}=useParams();
    const [jobsVisible, setJobsVisible]=useState(false);
    const [toggleText, setToggleText]=useState("See Jobs!");
    const [userJobs, setUserJobs]=useState();


    const currUser = useContext(UserContext);

	const getUserJobs=async (username)=> {
		const user = await JoblyApi.request(`users/${username}`);
		return(user.user.jobs)
        
    }
    
    const toggleJobs = () =>{
        if(toggleText==="See Jobs!"){
            setToggleText("Hide")
        }else{
            setToggleText("See Jobs!")
        }
        setJobsVisible(!jobsVisible);
    }

    const getCompany= async () => {
            const res = await JoblyApi.request(`companies/${handle}`);
                setCompany(res.company);
                setUserJobs(await getUserJobs(currUser.username))
			    setIsLoading(false);
	}
	useEffect(()=>{
        getCompany()}, [handle]
    );
    
	if(isLoading||!userJobs){
		return <p>Loading &hellip;</p>;
	}
    return(

        <div>
        <h1>{company.name}</h1>
        <CompanyCard key={company.handle} 
        handle={company.handle}
        name={company.name} 
        description={company.description} 
        numEmployees={company.num_employees} 
        logoUrl={company.logo_url}
        toggleJobs={toggleJobs}
        toggleText={toggleText}
        />
        {jobsVisible ? 
        company.jobs.map(j => (
        <JobCard key={j.id} 
        id={j.id}
        title={j.title} 
        salary={`$${j.salary}.00`} 
        equity={j.equity} 
        company={j.company_handle}
        userJobs={userJobs}/>)):null}
        </div>
    )
}
export default CompanyList;