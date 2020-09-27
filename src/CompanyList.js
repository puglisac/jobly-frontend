import React, { useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";
import JoblyApi from "./JoblyApi";
import FilterForm from "./FilterForm";
import Pages from "./Pages";
import Paginate from "./Paginate";

const CompanyList = () => {
	const [ isLoading, setIsLoading ] = useState(true);
	const [ companies, setCompanies ] = useState();
	const [ start, setStart ] = useState(0);

	const search = async (text) => {
		try {
			const res = await JoblyApi.request(`companies/?search=${text}`);
			setCompanies(Pages(res.companies, start));
		} catch (e) {
			alert(e);
		}
	};

	useEffect(
		() => {
			const getCompanies = async () => {
				try {
					const res = await JoblyApi.request(`companies/`);
					setCompanies(Pages(res.companies, start));
					setIsLoading(false);
				} catch (e) {
					alert(e);
				}
			};
			getCompanies();
		},
		[ start ]
	);

	const handleClick = (up) => {
		up ? setStart(start + 20) : setStart(start - 20);
	};

	if (isLoading) {
		return <p>Loading &hellip;</p>;
	}
	return (
		<div>
			<h1>Companies</h1>
			<FilterForm search={search} />
			{companies.map((c) => (
				<CompanyCard
					key={c.handle}
					handle={c.handle}
					name={c.name}
					description={c.description}
					numEmployees={c.num_employees}
					logoUrl={c.logo_url}
				/>
			))}

			<Paginate handleClick={handleClick} start={start} length={companies.length} />
		</div>
	);
};
export default CompanyList;
