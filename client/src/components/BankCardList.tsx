import {Skeleton, Tab, Tabs} from "@mui/material";
import BankCard from "./BankCard.tsx";
import {useMutation, useQuery, useQueryClient} from "react-query";
import CardService from "../services/CardService.ts";
import {useAuthStore} from "../stores/useAuthStore.ts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, {SyntheticEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";

function samePageLinkNavigation(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
) {
    return !(event.defaultPrevented ||
        event.button !== 0 || // ignore everything but left-click
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey);

}

const fetchData = async (userId: number) => {
    const card = await CardService.getAll(userId)
    return card.data
}

const createCard = async (userId: number) => {
    return await CardService.create(userId)
}

const BankCardList = () => {

    const userId = useAuthStore(state => state.user.id)
    const {data, isLoading, isError} = useQuery('cards', () => fetchData(userId))
    const [value, setValue] = useState(0);
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const {mutate} = useMutation(['transaction'],
        (userId: number) => createCard(userId), {
            onSuccess: () => queryClient.invalidateQueries(['cards'])
        })

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        if (
            event.type !== 'click' ||
            (event.type === 'click' &&
                samePageLinkNavigation(
                    event as React.MouseEvent<HTMLAnchorElement, MouseEvent>,
                ))
        ) {
            setValue(newValue);
        }
    };

    const handleChangeCard = (cardNumber: string) => {
        navigate(`/${cardNumber}`)
    }

    const handleCreateCard = () => {
        mutate(userId)
    }

    return (
        <>
            {isLoading ? (
                <Box sx={{display: 'flex'}}>
                    <Skeleton
                        variant="rounded"
                        width={300}
                        height={180}
                        sx={{borderRadius: '20px', marginRight: '16px'}}
                    />
                    <Skeleton
                        variant="rounded"
                        width={300}
                        height={180}
                        sx={{borderRadius: '20px', marginRight: '16px'}}
                    />
                    <Skeleton
                        variant="rounded"
                        width={300}
                        height={180}
                        sx={{borderRadius: '20px', marginRight: '16px'}}
                    />
                    <Skeleton
                        variant="rounded"
                        width={300}
                        height={180}
                        sx={{borderRadius: '20px'}}
                    />
                </Box>
            ) : (
                <>
                    {isError ? (
                        <Box
                            sx={{
                                width: '100%',
                                height: '180px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Typography
                                fontSize='32px'
                                fontWeight='700'
                                color='rgb(211, 47, 47)'
                            >
                                Виникла помилка
                            </Typography>
                        </Box>
                    ) : (
                        <>
                            {data?.length === 0 ? (
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: '180px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                    <Button variant='outlined' onClick={handleCreateCard}>Create a card</Button>
                                </Box>
                            ) : (
                                <Tabs
                                    variant="scrollable"
                                    scrollButtons='auto'
                                    value={value}
                                    onChange={handleChange}
                                    visibleScrollbar={false}
                                    TabIndicatorProps={{sx: {display: 'none'}}}
                                >
                                    {data?.map(card => (
                                        <Tab
                                            key={card.id}
                                            onClick={() => handleChangeCard(card.number)}
                                            label={<BankCard card={card}/>}
                                            sx={{padding: '0', borderRadius: '20px', marginRight: '16px'}}
                                        />
                                    ))}
                                </Tabs>
                            )}
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default BankCardList;