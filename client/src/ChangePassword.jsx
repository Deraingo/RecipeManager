import React, { useState, useEffect } from "react";
import { useApi } from "./utils/use_api";
import { useDispatch, useSelector } from "react-redux"; // Added useSelector here
import { setAuthToken } from "./store/application_slice";
import { useNavigate, useParams } from "react-router-dom";

export const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [user, setUser] = useState(null);
    const api = useApi();
    const userId = useParams();
    useEffect(() => {
        getUser();
    }, []);

    async function getUser() {
        try {
          const { user } = await api.get("/users/me");
          setUser(user);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
    }

    const handleChangePassword = async (event) => {
        event.preventDefault();
        if (user) {
            try {
                await api.post(`/users/${user.id}/change_password`, {
                    currentPassword,
                    newPassword,
                  });
                alert('Password changed successfully');
            } catch (error) {
                console.error('Error changing password:', error);
                alert('Failed to change password');
            }
        } else {
            alert('User not found');
        }
    };
    return (
        <div>
        <h2>Profile</h2>
        <form onSubmit={handleChangePassword}>
            <label>
            Current Password:
            <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
            </label>
            <label>
            New Password:
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            </label>
            <button type="submit">Change Password</button>
        </form>
        </div>
    );
};