import React, { useState } from 'react';
import {
    Button, TextField, Typography, Container, Box,
    Snackbar, Alert, IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function Upload() {
    const [department, setDepartment] = useState('');
    const [courseNumber, setCourseNumber] = useState('');
    const [courseName, setCourseName] = useState('');
    const [file, setFile] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            return setSnackbar({ open: true, message: 'Please select a PDF file.', severity: 'error' });
        }

        try {
            const courseRes = await axios.get('http://localhost:5000/api/courses');
            const existingCourse = courseRes.data.find(
                (course) =>
                    course.department.toLowerCase() === department.toLowerCase() &&
                    course.courseNumber.toString() === courseNumber
            );

            let courseId;
            if (existingCourse) {
                courseId = existingCourse._id;
            } else {
                const newCourseRes = await axios.post('http://localhost:5000/api/courses', {
                    department, courseNumber, courseName
                });
                courseId = newCourseRes.data._id;
            }

            const token = localStorage.getItem('token');
            const decoded = jwtDecode(token);
            const professorId = decoded.userId;

            const formData = new FormData();
            formData.append('pdf', file);
            formData.append('courseId', courseId);
            formData.append('professorId', professorId);

            await axios.post('http://localhost:5000/api/syllabus/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });

            setSnackbar({
                open: true,
                message: 'Syllabus uploaded successfully!',
                severity: 'success'
            });

            setTimeout(() => navigate('/ask'), 1200);
        } catch (error) {
            const msg = error.response?.data?.message || 'Upload failed';
            setSnackbar({ open: true, message: `Upload failed: ${msg}`, severity: 'error' });
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 2 }}>
                <IconButton onClick={() => navigate('/ask')}>
                    <ArrowBackIcon />
                </IconButton>
            </Box>

            <Box sx={{ mt: 2, p: 4, bgcolor: '#fff', borderRadius: 2, boxShadow: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Upload Syllabus
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField fullWidth label="Department" value={department} onChange={(e) => setDepartment(e.target.value)} margin="normal" required />
                    <TextField fullWidth label="Course Number" value={courseNumber} onChange={(e) => setCourseNumber(e.target.value)} margin="normal" required />
                    <TextField fullWidth label="Course Name" value={courseName} onChange={(e) => setCourseName(e.target.value)} margin="normal" required />
                    <Button variant="contained" component="label" sx={{ mt: 2 }}>
                        Upload PDF File
                        <input type="file" accept="application/pdf" hidden onChange={(e) => setFile(e.target.files[0])} />
                    </Button>
                    {file && <Typography sx={{ mt: 1 }} variant="body2">Selected: {file.name}</Typography>}
                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 4 }}>Upload</Button>
                </form>
            </Box>

            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                <Alert severity={snackbar.severity} variant="filled">{snackbar.message}</Alert>
            </Snackbar>
        </Container>
    );
}
