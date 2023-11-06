import Header from "../components/Header.tsx";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import BankCardList from "../components/BankCardList.tsx";
import CardActions from "../components/CardActions.tsx";
import TransactionsTable from "../components/TransactionsTable.tsx";
import {useAuthStore} from "../stores/useAuthStore.ts";
import {useParams} from "react-router-dom";

const Main = () => {

    const isAuth = useAuthStore(state => state.isAuth)
    const {cardNumber} = useParams()

    return (
        <>
            <Header/>
            <Box sx={{paddingTop: '60px'}}>
                <Container sx={{marginTop: '20px'}}>
                    {isAuth && <>
                        <BankCardList/>
                        {cardNumber &&
                            <Box sx={{height: '600px', marginTop: '20px', display: 'flex', gap: '20px'}}>
                                <CardActions cardNumber={cardNumber}/>
                                <TransactionsTable cardNumber={cardNumber}/>
                            </Box>
                        }
                    </>}
                </Container>
            </Box>
        </>
    );
};

export default Main;