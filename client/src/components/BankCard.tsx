import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import visaIcon from "../assets/icons/visa.svg"
import {FC} from "react";
import {ICard} from "../models/ICard.ts";

interface BankCardProps {
    card: ICard
}

const BankCard:FC<BankCardProps> = ({card}) => {
    return (
        <Box sx={{
            width: '300px',
            minWidth: '300px',
            height: '180px',
            borderRadius: '20px',
            background: '#333',
            color: '#FFF',
            padding: '12px 16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            textTransform: 'none'
        }}>
            <Box sx={{display: 'flex', justifyContent: 'start'}}>
                <Typography>onlybank</Typography>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '20px'}}>
                <Typography fontSize='22px' letterSpacing='2px'>{card.number.replace(/(\d{4})/g, '$1 ')}</Typography>
                <Typography fontSize='14px' sx={{paddingLeft: '46px'}}>{card.date.slice(5,7)}/{card.date.slice(2,4)}</Typography>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'}}>
                <Typography>{card.owner.name}</Typography>
                <Box sx={{
                    maxWidth: '50px'
                }}
                     component='img'
                     src={visaIcon}
                     alt='visa'
                />
            </Box>
        </Box>
    );
};

export default BankCard;