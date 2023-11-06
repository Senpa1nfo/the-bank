import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import {FC, forwardRef, useState} from "react";
import {IMaskInput} from "react-imask";
import TextField from "@mui/material/TextField";
import {useMutation, useQuery, useQueryClient} from "react-query";
import CardService from "../services/CardService.ts";
import {Skeleton} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import TransactionService from "../services/TransactionService.ts";

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

const TextMaskCustom = forwardRef<HTMLInputElement, CustomProps>(
    function TextMaskCustom(props, ref) {
        const {onChange, ...other} = props;
        return (
            <IMaskInput
                {...other}
                mask="0000 0000 0000 0000"
                definitions={{
                    '#': /[1-9]/,
                }}
                inputRef={ref}
                onAccept={(value) => onChange({target: {name: props.name, value}})}
                overwrite
            />
        );
    },
);

interface CardActionsProps {
    cardNumber: string
}

interface ITransaction {
    amount: number
    fromCardNumber: string
    toCardNumber: string
}

const fetchData = async (cardNumber: string) => {
    const card = await CardService.getOne(cardNumber)
    return card.data
}

const transfer = async ({amount, fromCardNumber, toCardNumber}: ITransaction) => {
    return await TransactionService.create(amount, fromCardNumber, toCardNumber)
}

const CardActions: FC<CardActionsProps> = ({cardNumber}) => {

    const queryClient = useQueryClient()
    const [isSending, setIsSending] = useState(false)

    const {
        data,
        isLoading,
        isError
    } = useQuery(['card', cardNumber], () => fetchData(cardNumber), {
        keepPreviousData: true
    })

    const {mutate, error} = useMutation(['transaction'],
        (transaction: ITransaction) => transfer(transaction), {
            onSuccess: () => {
                queryClient.invalidateQueries(['transactions'])
                queryClient.invalidateQueries(['card'])
            }
        })

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<ITransaction>()

    const onSubmit: SubmitHandler<ITransaction> = async ({amount, toCardNumber}) => {
        setIsSending(true)
        mutate({amount, fromCardNumber: cardNumber, toCardNumber: toCardNumber.replace(/ /g, '')})
        setIsSending(false)
    }

    return (
        <Box sx={{
            width: '300px',
            minWidth: '300px',
            height: '100%',
            borderRadius: '20px',
            border: '1px solid rgba(224, 224, 224, 1)',
            color: '#333',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            textTransform: 'none'
        }}>
            {isLoading ? (
                <Skeleton/>
            ) : (
                <>
                    {isError ? (
                        <Box>Виникла помилка</Box>
                    ) : (
                        <Typography fontSize='20px'>Balance: ${data?.balance}</Typography>
                    )}
                </>
            )}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
            }}
                 component='form'
                 onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    label={errors.toCardNumber?.message || "Card number"}
                    variant="outlined"
                    size='small'
                    InputProps={{
                        inputComponent: TextMaskCustom as any
                    }}
                    {...register('toCardNumber', {
                        required: 'Card number is required',
                        pattern: {
                            value: /[1-9]/,
                            message: 'Please enter valid card number'
                        }
                    })}
                    error={!!errors.toCardNumber?.message}
                />
                <TextField
                    label={errors.amount?.message || "Amount"}
                    type='number'
                    variant="outlined"
                    size='small'
                    {...register('amount', {
                        required: 'Amount is required',
                        pattern: {
                            value: /[1-9]/,
                            message: 'Please enter valid amount'
                        }
                    })}
                    error={!!errors.amount?.message}
                />
                <LoadingButton
                    endIcon={<SendIcon/>}
                    type='submit'
                    loading={isSending}
                    loadingPosition="end"
                    variant="contained"
                    color={error ? 'error' : 'primary'}
                >
                    <span>Send</span>
                </LoadingButton>
            </Box>
        </Box>
    );
};

export default CardActions;