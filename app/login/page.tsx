'use client'
import React, { useEffect, useState , useContext} from 'react';

import { Typography, Box, Stack, TextField, Button, Container } from '@mui/material';
import { AppContext, AppContextType } from '@/components/AppContextProvider';


const title = "Ad Composer"
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {tenantId, tenantName} = useContext(AppContext) as AppContextType;

    useEffect(()=>{
        console.log(`Login: useEffect = tenantId is ${tenantId}`);
    },[tenantId, tenantName]);

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle login logic here
        console.log("Logging in with email:", email, "and password:", password);
    };

    console.log(`Login render: tenantId: ${tenantId}`);

    if (tenantId==-1) return (<></>); // suppress the initial render that happens before the app context is loaded

    return (
        <Container component="main" maxWidth="xs" sx={{ border: 1, mt: 8 }}>
            <Stack direction="column" sx={{ m: 2, alignItems: 'center' }}>
                <Typography component="h1" variant="h5">{`${title} (${tenantName})`}</Typography>
                <Box sx={{ mt: 1, width: "100%" }}>
                    <form onSubmit={handleLogin}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 0, my: 2 }}
                        >
                            Sign In
                        </Button>
                    </form>
                </Box>
            </Stack>
        </Container>
    );
};

export default Login;
