import React, {useState, useEffect} from 'react';
import JobCard from './JobCard';
import JoblyApi from './JoblyApi';
import {useParams} from 'react-router-dom';
import FilterForm from './FilterForm'

const JobList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [jobs, setJobs]=useState();
    const {id} = useParams();

    const search = async (text) => {
        const res = await JoblyApi.request(`jobs/?search=${text}`);
        setJobs(res.jobs)
    }

    const getJobs= async (id="") => {
            const res = await JoblyApi.request(`jobs/${id}`);
            if (id){setJobs([res.job])}
            else{
                setJobs(res.jobs);
            }
			setIsLoading(false);
	}
	useEffect(()=>{
        getJobs(id)}, [id]
    );
	if(isLoading){
		return <p>Loading &hellip;</p>;
	}
    return(
        <div>
            <h1>Jobs</h1>
        <FilterForm search={search}/>
        {jobs.map(j => (
        <JobCard key={j.id} 
        id={j.id}
        title={j.title} 
        salary={`$${j.salary}.00`} 
        equity={j.equity} 
        company={j.company_handle}/>))}
        </div>
    )
}
export default JobList;