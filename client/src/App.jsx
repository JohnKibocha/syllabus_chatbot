import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Ask from './pages/Ask';
import Upload from './pages/Upload';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/ask" replace />} />
            <Route path="/ask" element={<Ask />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/ask" element={<Ask />} />
        </Routes>
    );
}
