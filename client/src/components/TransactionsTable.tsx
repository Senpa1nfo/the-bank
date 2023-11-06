import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useQuery} from "react-query";
import TransactionService from "../services/TransactionService.ts";
import {FC} from "react";
import {Skeleton} from "@mui/material";
import Box from "@mui/material/Box";
import dayjs from "dayjs";

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', type: 'number', width: 70},
    {field: 'amount', headerName: 'Amount', type: 'number', width: 100},
    {field: 'from', headerName: 'From', width: 160,},
    {field: 'to', headerName: 'To', width: 160,},
    {
        field: 'date',
        headerName: 'Date',
        width: 160,
        type: "date",
        valueFormatter: ({value}) => dayjs(value).format('YYYY-MM-DD HH:mm:ss')
    }
];

const fetchData = async (cardNumber: string) => {
    const transactions = await TransactionService.getAll(cardNumber)
    return transactions.data
}

interface TransactionsTableProps {
    cardNumber: string
}

const TransactionsTable:FC<TransactionsTableProps> = ({cardNumber}) => {

    const {
        data,
        isLoading,
        isError
    } = useQuery(['transactions', cardNumber], () => fetchData(cardNumber), {
        keepPreviousData: true
    })

    return (
        <Box sx={{width: '100%', height: '600px'}}>
            {isLoading ? (
                <Skeleton
                    width='100%'
                    height='600px'
                    sx={{borderRadius: '20px', transform: 'none'}}
                />
            ) : (
                <>
                    {isError ? (
                        <Box sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            Виникла помилка
                        </Box>
                    ) : (
                        <DataGrid
                            rows={data || []}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {page: 0, pageSize: 25},
                                },
                            }}
                            pageSizeOptions={[25, 50, 100]}
                            rowHeight={40}
                            sx={{borderRadius: '20px'}}
                        />
                    )}
                </>
            )}
        </Box>
    );
}

export default TransactionsTable