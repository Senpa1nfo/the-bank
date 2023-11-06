import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '../components/Link.tsx';
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {SubmitHandler, useForm} from "react-hook-form";
import {FC, useState} from "react";
import {useAuthStore} from "../stores/useAuthStore.ts";
import {useNavigate} from "react-router-dom";

interface ISignIn {
    email: string
    password: string
}

const SignIn: FC = () => {

    const [showPassword, setShowPassword] = useState(true);
    const [errorMessage, setErrorMessage] = useState();
    const login = useAuthStore(state => state.login)
    const navigate = useNavigate()

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<ISignIn>()

    const onSubmit: SubmitHandler<ISignIn> = async ({email, password}) => {
        login(email, password)
            .then(() => navigate('/'))
            .catch((e) => setErrorMessage(e.response.data.message))
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label={errors.email?.message || 'Email'}
                        autoComplete="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
                                message: 'Please enter valid email'
                            }
                        })}
                        error={!!errors.email?.message}
                        autoFocus
                    />
                    <FormControl variant="outlined" fullWidth sx={{marginTop: '12px'}}>
                        <InputLabel
                            htmlFor="outlined-adornment-password"
                            error={!!errors.password?.message}
                        >
                            {errors.password?.message || 'Password *'}
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={!showPassword ? 'text' : 'password'}
                            autoComplete='current-password'
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label={errors.password?.message || 'Password *'}
                            {...register('password', {
                                required: 'Password is required',
                            })}
                            error={!!errors.password?.message}
                        />
                    </FormControl>
                    <Typography marginTop='12px' color='error'>{errorMessage}</Typography>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default SignIn