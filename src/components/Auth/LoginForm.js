import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { Box, Button, TextField, Typography } from "@mui/material";

const LoginForm = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${apiUrl}/auth/login`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('authToken', data.token)
            localStorage.setItem('userName', data.name);
            login(data.token);
            navigate('/dashboard', { replace: true })
        } else {
            alert(data.message);
        }
    }
    return (
        <Box
            sx={{
                width: '80%',
                maxWidth: '400px',
                margin: '50px auto',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: '#fff',
                borderRadius: '8px',
                boxShadow: 3,
            }}
        >
            <Typography variant="h5" component='h1' gutterBottom>
                Авторизація
            </Typography>
            <form onSubmit={handleSubmit}
                style={{ width: '100%' }}>
                <TextField
                    label='Email'
                    name='email'
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    required
                />
                <TextField
                    label="Пароль"
                    name='password'
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    required
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: '20px' }}
                >Вхід</Button>
            </form>
        </Box>
    )
};

export default LoginForm;