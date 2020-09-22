
import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import {useParams} from 'react-router-dom';


const Profile = () => {
    const {username}=useParams();
  return (
    <div>
      <Card>
        <CardImg top width="100%" src="photoUrl" alt="profile" />
        <CardBody>
          <CardTitle>{username}</CardTitle>
          <CardSubtitle>email</CardSubtitle>
          <CardText>First Name Last Name</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default Profile;