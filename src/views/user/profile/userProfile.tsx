import React, { useEffect } from 'react';
import { setUser } from '@/views/user/user.slice';
import { mockUserData } from '@/views/user/profile/mockData';
import { useAppDispatch } from '@/store';

const UserProfile: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userData = {
      userName : mockUserData.userName,
      email : mockUserData.email,
      avatar : mockUserData.avatar,
      authority : mockUserData.authority,
    };
    dispatch(setUser(userData));

  }, [dispatch])
  

  return (
    <div>
      <h1>Welcome to User Profile</h1>
    </div>
  );
};

export default UserProfile;
