import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container, Box, TextField, Typography,
    Button, Paper, Link, Snackbar, Alert
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
    const navigate = useNavigate();

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/users/register', {
                ...form, role: 'professor',
            });
            setSnackbar({ open: true, message: '✅ Account created! You can now log in.', severity: 'success' });
            setTimeout(() => navigate('/login'), 1500);
        } catch (err) {
            setSnackbar({ open: true, message: '❌ Registration failed: ' + err.response?.data?.message, severity: 'error' });
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
                <Typography variant="h5" gutterBottom>Professor Registration</Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField fullWidth label="Full Name" name="name" value={form.name} onChange={handleChange} required margin="normal" />
                    <TextField fullWidth label="Email" name="email" type="email" value={form.email} onChange={handleChange} required margin="normal" />
                    <TextField fullWidth label="Password" name="password" type="password" value={form.password} onChange={handleChange} required margin="normal" />
                    <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>Register</Button>
                </Box>
                <Typography mt={2}>
                    Already have an account?{' '}
                    <Link component={RouterLink} to="/login" underline="hover">Log in</Link>
                </Typography>
            </Paper>

            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                <Alert severity={snackbar.severity} variant="filled">{snackbar.message}</Alert>
            </Snackbar>
        </Container>
    );
}
