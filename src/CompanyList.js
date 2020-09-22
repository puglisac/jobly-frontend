import React, {useState, useEffect} from 'react';
import CompanyCard from './CompanyCard';
import JoblyApi from './JoblyApi';
import {useParams} from 'react-router-dom';
import FilterForm from './FilterForm';

const CompanyList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [companies, setCompanies]=useState();

    const search = async (text) => {
        const res = await JoblyApi.request(`companies/?search=${text}`);
        setCompanies(res.companies)
    }
    const getCompanies= async () => {
            const res = await JoblyApi.request(`companies/`);
                setCompanies(res.companies);
			    setIsLoading(false);
	}
	useEffect(()=>{
        getCompanies()}, []
    );
	if(isLoading){
		return <p>Loading &hellip;</p>;
	}
    return(

        <div>
            <h1>Companies</h1>
        <FilterForm search={search}/>
        {companies.map(c => (
        <CompanyCard key={c.handle} 
        handle={c.handle}
        name={c.name} 
        description={c.description} 
        numEmployees={c.num_employees} 
        logoUrl={c.logo_url}
        />))}

        </div>
    )
}
export default CompanyList;