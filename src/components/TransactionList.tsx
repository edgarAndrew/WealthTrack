import { StyleSheet, View,FlatList } from 'react-native'
import { Button, useTheme,List,Text,DataTable } from 'react-native-paper';
import React, { useEffect, useState,PropsWithChildren } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { RootState } from '../store';
import { categoryColors } from '../helpers/util';
import { getAllTransactions,getCategoryTransactions } from '../actions/home';
import Loader from './Loader';

type PaginationProps = PropsWithChildren<{setPage:Function,page:number,pageSize:number,setPageSize:Function}>

const Pagination = ({page,setPage,pageSize,setPageSize}:PaginationProps) => {
  const {pagination,transactionType,isLoading} = useSelector((state: RootState) => state.home)
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
        page={page}
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

export default function TransactionList() {
    const {date:reduxDate,transactionType,range,transactions,isLoading} = useSelector((state: RootState) => state.home)
    const theme = useTheme()
    const dispatch = useDispatch()

    const [active,setActive] = useState('category')
    const [page,setPage] = useState(0)
    const [pageSize,setPageSize] = useState(3)
    
    const getByCategories = () =>{
        setActive('category')
    }

    const getTransactions = () =>{
        setActive('all')
    }

    useEffect(()=>{
      //console.log(reduxDate)
        if(active === 'all'){
            getAllTransactions(dispatch,transactionType,reduxDate,range,page,pageSize)
        }
        if(active === 'category'){
          getCategoryTransactions(dispatch,transactionType,reduxDate,range)
        }
        if(transactionType === "BOTH")
          setActive('all')
        
    },[active,page,reduxDate,transactionType,pageSize])

    return (
        <View>
            <View>
                {
                  transactionType !== "BOTH" &&
                  <Button mode="text" compact={true} onPress={getByCategories}>
                    <Text style={{color:active === 'category'? theme.colors.primary:theme.colors.secondary}} variant='titleMedium'>By category</Text>
                  </Button>
                }
                <Button mode="text" onPress={getTransactions}>
                    <Text variant='titleMedium' style={{color:active === 'all'? theme.colors.primary:theme.colors.secondary}}>All transactions</Text>
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
                    <List.Section>
                    {
                        transactions.map((ele,index)=>
                            <List.Item key={index} title={ele.categoryName + "    "+ele.percentage.toFixed(1) + "%    Rs." + ele.amount} titleStyle={{color:categoryColors[ele.categoryName]}} />
                        )
                    }
                    </List.Section>
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
        </View>
    )
}

const styles = StyleSheet.create({
})