import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../services/ProfileService';
import { getUserDataFromToken, getToken, isAdmin, isLoggedIn } from '../services/AuthService';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();
    const user = getUserDataFromToken();
    const token = getToken();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (newPassword !== confirmNewPassword) {
            setErrorMessage('New password and confirm password do not match');
            setOpenSnackbar(true);
            return;
        }
        try {
            const userId = user.id.toString();
            
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
        
            const res = await changePassword({ currentPassword, newPassword, userId }, config);
        
            if (res.data.err === 0 || res.data.err === 1) {
                setSuccessMessage('Password changed successfully');
                setOpenSnackbar(true);
                setTimeout(() => navigate("/profile"), 5000);
            } 
            else if (res.data.err === 1) {
                setErrorMessage(res.data.msg || 'Failed to change password');
                setOpenSnackbar(true);
            }
            else {
                setErrorMessage(res.data.msg || 'Failed to change password');
                setOpenSnackbar(true);
            }
        } catch (error) {
            setErrorMessage('Failed to change password');
            setOpenSnackbar(true);
        }
        
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <TextField
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Confirm New Password"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                fullWidth
                margin="normal"
                required
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
            >
                Change Password
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
        </Box>
    );
};

export default ChangePassword
