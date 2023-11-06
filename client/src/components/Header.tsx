import Container from "@mui/material/Container";
import {useAuthStore} from "../stores/useAuthStore.ts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "./Link.tsx";
import {Skeleton} from "@mui/material";

const Header = () => {

    const userName = useAuthStore(state => state.user.name)
    const isAuth = useAuthStore(state => state.isAuth)
    const logout = useAuthStore(state => state.logout)
    const isLoading = useAuthStore(state => state.isLoading)

    return (
        <Box sx={{
            position: 'fixed',
            width: '100%',
            height: '60px',
            boxShadow: '0 0 6px rgba(0, 0, 0, 0.4)'
        }}>
            <Container sx={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography fontSize='20px' fontWeight='700'>onlybank</Typography>
                {isLoading ? (
                    <>
                        <Skeleton variant="text" sx={{fontSize: '20px', width: '200px'}}/>
                        <Skeleton variant="rounded" width={90} height={36}/>
                    </>
                ) : (
                    <>
                        <Typography fontSize='20px'>{userName || 'Welcome'}</Typography>
                        {isAuth ? (
                            <Button onClick={logout} variant='outlined'>Logout</Button>
                        ) : (
                            <Link href='/signin'>
                                <Button variant='outlined'>
                                    SignIn
                                </Button>
                            </Link>
                        )}
                    </>
                )}

            </Container>
        </Box>
    );
};

export default Header;