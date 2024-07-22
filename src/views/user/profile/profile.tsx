import React from 'react';
import { useSelector } from 'react-redux';
//import { userSelectors } from '';

const UserProfile: React.FC = () => {
//   const user = useSelector(userSelectors.selectUser);

//   if (!user) {
//     return <div>Please sign in to view your profile.</div>;
//   }

  return (
    <div>
        <h1>welcome user profile</h1>
      {/* <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p> */}
    </div>
  );
};

export default UserProfile;
