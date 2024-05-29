
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { getUserDataFromToken, isAdmin, isLoggedIn } from '../services/AuthService';
import { updateProfile } from '../services/ProfileService';
import DefaultUserIcon from '../Images/defaultUserIcon.png'; // replace with actual path to default user icon
import Container from '@mui/material/Container';

const Profile = () => {
    const user = getUserDataFromToken();
    const [email, setEmail] = useState(user.email || '');
    const [firstName, setFirstName] = useState(user.firstName || '');
    const [lastName, setLastName] = useState(user.lastName || '');
    const [role, setRole] = useState(user.role || '');
    const [age, setAge] = useState(user.age || '');
    const [profileImage, setProfileImage] = useState( user.profileImage || null);
    const [profileImageUrl, setProfileImageUrl] = useState(user.profileImageUrl || DefaultUserIcon); // Assuming user object has profileImageUrl
    const [profileImageName, setProfileImageName] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (profileImage) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setProfileImageUrl(reader.result);
    //         };
    //         reader.readAsDataURL(profileImage);
    //     }
    // }, [profileImage]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('role', role);
        formData.append('age', age);
        if (profileImage) {
            formData.append('profileImage', profileImage);
        }

        try {
            const res = await updateProfile(formData);
            if (res.data.err === 0) {
                setSuccessMessage('Profile updated successfully');
                setOpenSnackbar(true);
                setTimeout(() => navigate("/"), 5000);
            } else {
                setErrorMessage('Failed to update profile');
                setOpenSnackbar(true);
            }
        } catch (error) {
            setErrorMessage('Failed to update profile');
            setOpenSnackbar(true);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setProfileImage(e.target.files[0]);
            setProfileImageName(e.target.files[0].name);
            setFormErrors((prevErrors) => ({ ...prevErrors, imageRef: '' }));
        }
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <Avatar
                    alt="Profile Image"
                    src={profileImage}
                    sx={{ width: 200, height: 200 }}
                />
            </Box>
            <TextField
                label="Email"
                value={email}
                fullWidth
                margin="normal"
                InputProps={{
                    readOnly: true,
                }}
            />
            <TextField
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                required
                fullWidth
                type="file"
                id="file"
                name="file"
                autoComplete="file"
                onChange={handleFileChange}
                error={!!formErrors.imageRef}
                helperText={formErrors.imageRef || profileImageName}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
            >
                Update Profile
            </Button>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                ContentProps={{
                  sx: { width: '100vh', paddingLeft: '5%', paddingRight: '5%' }
                }}

            >
                <Alert onClose={handleSnackbarClose} severity={successMessage ? "success" : "error"}
                sx= {{ width: '100vh', paddingLeft: '5%', paddingRight: '5%' }}
                >
                    {successMessage || errorMessage}
                </Alert>
            </Snackbar>

            <Container component="main" maxWidth="xs">
</Container>




        </Box>
    );
};

export default Profile;

