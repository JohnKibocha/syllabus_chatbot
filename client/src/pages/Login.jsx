import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container, Box, TextField, Typography,
    Button, Paper, Link, Snackbar, Alert
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
    const navigate = useNavigate();

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/users/login', form);
            localStorage.setItem('token', res.data.token);
            setSnackbar({ open: true, message: '✅ Login successful!', severity: 'success' });
            setTimeout(() => navigate('/upload'), 1500);
        } catch (err) {
            setSnackbar({ open: true, message: '❌ Login failed: ' + err.response?.data?.message, severity: 'error' });
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
                <Typography variant="h5" gutterBottom>Professor Login</Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField fullWidth label="Email" name="email" value={form.email} onChange={handleChange} required margin="normal" />
                    <TextField fullWidth label="Password" name="password" type="password" value={form.password} onChange={handleChange} required margin="normal" />
                    <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>Log In</Button>
                </Box>
                <Typography mt={2}>
                    Don't have an account?{' '}
                    <Link component={RouterLink} to="/register" underline="hover">Register</Link>
                </Typography>
            </Paper>

            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                <Alert severity={snackbar.severity} variant="filled">{snackbar.message}</Alert>
            </Snackbar>
        </Container>
    );
}
