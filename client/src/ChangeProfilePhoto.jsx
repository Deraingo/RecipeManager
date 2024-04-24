import React, { useState, useEffect } from "react";
import { useApi } from './utils/use_api';
import { useNavigate, useParams } from "react-router-dom";

export const ChangeProfilePicture = () => {
    const [profileImage, setProfileImage] = useState(null);
    const [user, setUser] = useState(null);
    const api = useApi();
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

    const handleImageChange = (event) => {
        setProfileImage(event.target.files[0]);
    };

    const handleImageUpload = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('profileImage', profileImage);
        try {
            const response = await api.post(`/users/${user.id}/upload_profile_image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Uploaded image URL:', response.data.message);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div>
            <h2>Change Profile Picture</h2>
            <form onSubmit={handleImageUpload}>
                <label>
                    Select image:
                    <input type="file" onChange={handleImageChange} required />
                </label>
                <button type="submit">Upload Image</button>
            </form>
        </div>
    );
};