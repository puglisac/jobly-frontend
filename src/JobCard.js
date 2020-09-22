import React from 'react';
import {Link} from 'react-router-dom'

import { Card, Button, CardHeader, CardBody,
    CardTitle, CardText } from 'reactstrap';

const JobCard = ({id, title, salary, equity, company}) =>{

return(

    <Card className="m-4">
        {company ? <CardHeader><Link to={`/companies/${company}`}>{company}</Link> is hiring</CardHeader>:null}
        <CardBody>
        <CardTitle><Link to={`/jobs/${id}`}>{title}</Link></CardTitle>
            <CardText>Salary: {salary}</CardText>
            <CardText>Equity: {equity}</CardText>
            <Link to={`/jobs/${id}`}><Button>Apply!</Button></Link> 
        </CardBody>
    </Card>
)

}
export default JobCard;