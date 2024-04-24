import { useEffect, useState } from 'react';
import { useApi } from './utils/use_api';
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
export const Profile = () => {
    const [user, setUser] = useState(null);
    const api = useApi();

    useEffect(() => {
        async function fetchUser() {
        const { user } = await api.get("/users/me");
        setUser(user);
        }

        fetchUser();
    }, []);
    return (
        <div>
          <h2>Profile</h2>
          {user && <img src={user.profileImageUrl} alt="Profile" />}
          <Link className="action-button" to="change_password">Change Password</Link>
          {/* <Link className="action-button" to="change_profile_picture">Change Profile Picture</Link> */}
          {/* ... rest of your profile component ... */}
          <Outlet />
        </div>
    );
};
