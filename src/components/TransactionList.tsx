import { StyleSheet, View} from 'react-native'
import { Button, useTheme,Text,DataTable, Snackbar, Portal } from 'react-native-paper';
import React, { useEffect, useState,PropsWithChildren } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { RootState } from '../store';
import { categoryColors } from '../helpers/util';
import { getAllTransactions,getBankAccountTransactions,getCategoryTransactions } from '../actions/home';
import Loader from './Loader';

type PaginationProps = PropsWithChildren<{setPage:Function,page:number,pageSize:number,setPageSize:Function}>

const Pagination = ({page,setPage,pageSize,setPageSize}:PaginationProps) => {
  const {pagination,isLoading} = useSelector((state: RootState) => state.home)
  const [numberOfItemsPerPageList] = React.useState([3, 4, 5]);
  
  const theme = useTheme()

  if(pagination.empty && !isLoading)
    return (
      <Text style={{color:theme.colors.primary}} variant={'titleMedium'}>No Transactions</Text>
    )
  else
    return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Category</DataTable.Title>
        <DataTable.Title numeric>Date</DataTable.Title>
        <DataTable.Title numeric>Account</DataTable.Title>
        <DataTable.Title numeric>Amount</DataTable.Title>
      </DataTable.Header>

      {pagination.content.map((item) => (
        <DataTable.Row key={item.id}>
          <DataTable.Cell>{item.category}</DataTable.Cell>
          <DataTable.Cell numeric>{item.date.substring(0,10)}</DataTable.Cell>
          <DataTable.Cell numeric>{"****"+item.account.toString().split("").slice(-4).join("")}</DataTable.Cell>
          <DataTable.Cell numeric>
            {item.type === "INCOME" ? "+"+item.amount.toString() : "-"+item.amount.toString()}
          </DataTable.Cell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={pagination.number}
        numberOfPages={pagination.totalPages}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        onItemsPerPageChange={(val)=>setPageSize(val)}
        onPageChange={(page) => setPage(page)}
        label={`${pagination.pageable.offset+1}-${pagination.pageable.offset+pagination.numberOfElements} of ${pagination.totalElements}`}
        numberOfItemsPerPage={pageSize}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      />
    </DataTable>
  );
};

type CircleProps = PropsWithChildren<{color:string,size:number}>
const Circle = ({ color,size}:CircleProps) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
      }}
    />
  );
};

type TransactionListProps = PropsWithChildren<{page:number,setPage:Function}>

export default function TransactionList({page,setPage}:TransactionListProps) {
    const {date:reduxDate,transactionType,range,transactions,isLoading} = useSelector((state: RootState) => state.home)
    const {bankAccountId} = useSelector((state: RootState) => state.bank)
    const theme = useTheme()
    const dispatch = useDispatch()

    const [active,setActive] = useState('category')
    const [visible, setVisible] = React.useState(false);
    const [snackbarMsg,setSnackbarMsg] = React.useState('')

    // Set Page size here
    const [pageSize,setPageSize] = useState(5)
    
    const getByCategories = () =>{
        setActive('category')
    }

    const getTransactions = () =>{
        setActive('all')
    }

    const getByBankAccount = () =>{
        if(bankAccountId !== -1){
          setActive('account')
          setVisible(false)
        }
        else{
          setSnackbarMsg("Select Bank Account")
          setVisible(true)
        } 
    }

    useEffect(()=>{
      //console.log(reduxDate)
        if(active === 'all'){
            getAllTransactions(dispatch,transactionType,reduxDate,range,page,pageSize)
        }
        if(active === 'category'){
          getCategoryTransactions(dispatch,transactionType,reduxDate,range)
        }
        if(active === 'account'){
          getBankAccountTransactions(dispatch,bankAccountId,transactionType,page,pageSize);
        }
        if(transactionType === "BOTH")
          setActive('all')
        
    },[active,page,reduxDate,transactionType,pageSize,bankAccountId])

    return (
        <View>
            <View style={styles.cont}>
                {
                  transactionType !== "BOTH" &&
                  <Button mode="text" compact={true} onPress={getByCategories}>
                    <Text style={{color:active === 'category'? theme.colors.primary:theme.colors.secondary}} variant='titleMedium'>By category</Text>
                  </Button>
                }
                <Button mode="text" onPress={getTransactions}>
                    <Text variant='titleMedium' style={{color:active === 'all'? theme.colors.primary:theme.colors.secondary}}>All transactions</Text>
                </Button>
                <Button mode="text" onPress={getByBankAccount}>
                    <Text variant='titleMedium' style={{color:active === 'all'? theme.colors.primary:theme.colors.secondary}}>By Account</Text>
                </Button>
            </View>
            {
              active === 'category' ? 
                isLoading ? 
                <View>
                  <Loader loading={isLoading}/>
                </View>
                :
                <View>
                {
                    transactions.length !== 0 ? 
                    <DataTable>
                      <DataTable.Header>
                      <DataTable.Title>Code</DataTable.Title>
                        <DataTable.Title>Category</DataTable.Title>
                        <DataTable.Title numeric>Amount</DataTable.Title>
                      </DataTable.Header>

                      {transactions.map((item,index) => (
                        <DataTable.Row key={index}>
                          <DataTable.Cell><Circle color={categoryColors[item.categoryName]} size={20}/></DataTable.Cell>
                          <DataTable.Cell>{item.categoryName}</DataTable.Cell>
                          <DataTable.Cell numeric>{item.amount}</DataTable.Cell>
                        </DataTable.Row>
                      ))}
                    </DataTable>
                    :
                    <Text style={{color:theme.colors.primary}} variant={'titleMedium'}>No Transactions</Text>
                }
                </View> 
                :
                <View>
                    <Loader loading={isLoading}/>
                    <Pagination page={page} setPage={setPage} pageSize={pageSize} setPageSize={setPageSize}/>
                </View>    
            }
            <Portal>
              <Snackbar
                    visible={visible}
                    onDismiss={()=>setVisible(false)}
                    action={{
                      label: 'OK',
                      onPress: () => {
                        // Do something
                      },
                    }}>
                    {snackbarMsg}
              </Snackbar>
            </Portal>
        </View>
    )
}

const styles = StyleSheet.create({
  cont:{
    display:"flex",
    flexDirection:"row",
    columnGap:10
  }
})