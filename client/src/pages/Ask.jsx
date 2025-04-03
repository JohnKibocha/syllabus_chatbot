import React, { useEffect, useState } from 'react';
import {
    Container, Typography, TextField, Button,
    MenuItem, Box, CircularProgress, Snackbar, Alert, Paper, Divider, IconButton
} from '@mui/material';
import Markdown from 'react-markdown';
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from 'axios';

export default function Ask() {
    const [courses, setCourses] = useState([]);
    const [courseId, setCourseId] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

    useEffect(() => {
        async function fetchCourses() {
            try {
                const res = await axios.get('http://localhost:5000/api/courses');
                setCourses(res.data);
            } catch {
                setSnackbar({ open: true, message: '❌ Failed to load courses', severity: 'error' });
            }
        }
        fetchCourses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!courseId || !question) {
            return setSnackbar({ open: true, message: 'Please select a course and enter your question.', severity: 'warning' });
        }
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:5000/api/query', {
                courseId,
                question
            });
            setAnswer(res.data.response);
            setHistory(prev => [...prev, { q: question, a: res.data.response }]);
            setQuestion('');
        } catch {
            setSnackbar({ open: true, message: '❌ Failed to get response', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleFollowUp = (q) => {
        setQuestion(prev => `${prev ? prev + ' ' : ''}${q}`);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 8 }}>
            
            <Paper sx={{ p: 4 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h4">Ask a Question</Typography>
                    <Button
                        variant="outlined"
                        onClick={() => window.location.href = '/login'}
                    >
                        Staff Portal
                    </Button>
                </Box>

                <form onSubmit={handleSubmit}>
                    <TextField
                        select fullWidth required
                        label="Select Course"
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)}
                        margin="normal"
                    >
                        {courses.map(course => (
                            <MenuItem key={course._id} value={course._id}>
                                {course.department} {course.courseNumber} - {course.courseName}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
                        <TextField
                            fullWidth multiline minRows={2} required
                            label="Your Question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            sx={{ mr: 2 }}
                        />
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{ minWidth: 100, height: 56 }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Ask'}
                        </Button>
                    </Box>
                </form>

                {answer && (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom>AI Answer:</Typography>
                        <Paper sx={{ p: 2, bgcolor: '#f4f4f4' }}>
                            <Markdown>{answer}</Markdown>
                        </Paper>
                    </Box>
                )}

                {history.length > 0 && (
                    <Box sx={{ mt: 4 }}>
                        <Divider sx={{ mb: 2 }} />
                        <Typography variant="h6" gutterBottom>Previous Questions</Typography>
                        <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
                            {history.map((entry, i) => (
                                <Paper key={i} sx={{ p: 2, mb: 2, bgcolor: '#fafafa' }}>
                                    <Typography variant="subtitle2" color="text.secondary">Q:</Typography>
                                    <Typography>{entry.q}</Typography>
                                    <Typography variant="subtitle2" color="text.secondary" mt={1}>A:</Typography>
                                    <Markdown>{entry.a}</Markdown>
                                    <Box mt={1}>
                                        <Button
                                            variant="text"
                                            size="small"
                                            onClick={() => handleFollowUp(entry.q)}
                                        >
                                            Ask Follow-up
                                        </Button>
                                    </Box>
                                </Paper>
                            ))}
                        </Box>
                    </Box>
                )}

                {courseId && (
                    <Box display="flex" justifyContent="flex-end" mt={3}>
                        <Button variant="outlined" onClick={() => setSnackbar({
                            open: true,
                            message: 'Course preview not yet implemented',
                            severity: 'info'
                        })}>
                            Preview Course File
                        </Button>
                    </Box>
                )}
            </Paper>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={5000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert severity={snackbar.severity} variant="filled">
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}
