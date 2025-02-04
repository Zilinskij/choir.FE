import { Button, AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function AppMenu() {
    const navigate = useNavigate();

    return (
        <Box sx={{
            flexGrow: 1,
            marginBottom: '100px'
        }}>
            <AppBar position="static"
                sx={{
                    bgcolor: '#d6d1cb',
                    borderRadius: '5px'
                }}>
                <Toolbar>
                    <Typography
                        variant="h7"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            margin: '10px',
                            color: 'black'
                        }}>
                        <b><i>Хор "Осанна"</i></b>
                    </Typography>
                    <Button
                        color="inherit"
                        variant="contained"
                        size="small"
                        sx={{
                            margin: '10px',
                            bgcolor: '#7b8c5a'
                        }}
                        onClick={() => navigate('/login')}>
                        Вхід
                    </Button>
                    <Button
                        color="inherit"
                        variant="outlined"
                        size="small"
                        sx={{
                            margin: '10px',
                            bgcolor: '#7b8c5a'

                        }}
                        onClick={() => navigate('/register')}>
                        Реєстрація
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}