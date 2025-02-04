import { Button, TextField, Typography, Box } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const [formdata, setFormdata] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormdata({ ...formdata, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/auth/register`, formdata);
            if (response.status === 201) {
                setSuccess(true);
                setError('');
                setTimeout(() => navigate('/login'), 2000);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Помилка реєстрації')
        }
    };

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
                textAlign: 'center',
                boxShadow: 3,
            }}
        >
            <Typography variant="h5" component='h1' gutterBottom>
                Реєстрація
            </Typography>
            <form
                onSubmit={handleSubmit}
                style={{ width: '100%' }}>
                <TextField
                    label="Ім'я"
                    name='name'
                    value={formdata.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Email"
                    name='email'
                    type="email"
                    value={formdata.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Пароль"
                    name='password'
                    type="password"
                    value={formdata.password}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: '20px' }}
                >
                    Зареєструватись
                </Button>
            </form>
            {success && <Typography color='succes.main'>Реєстрація успішна!</Typography>}
            {error && <Typography color='error'>{error}</Typography>}
        </Box>
    )
}

export default RegisterForm;