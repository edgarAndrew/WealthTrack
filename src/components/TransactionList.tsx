import { StyleSheet, View,FlatList } from 'react-native'
import { Button, useTheme,List,Text,DataTable } from 'react-native-paper';
import React, { useEffect, useState,PropsWithChildren } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { RootState } from '../store';
import { categoryColors } from '../helpers/util';
import { getAllTransactions } from '../actions/home';
import Loader from './Loader';

type TransactionProps = PropsWithChildren<{setPage:Function,page:number}>

const PaginatedList = (props:TransactionProps) => {
    const dispatch = useDispatch();

    const { pagination, isLoading,transactionType,
        date:reduxDate,range
    } = useSelector((state: RootState) => state.home); // Assuming you have a transactions reducer
  
  console.log(pagination)
  
    const loadMoreTransactions = () => {
      // Check if there are more pages to load
      if (pagination.totalPages > pagination.number + 1) {
        // Dispatch action to fetch next page of transactions
        props.setPage(props.page + 1)
        //getAllTransactions(dispatch,transactionType,reduxDate,range,page)
      }
    };
  
    const renderFooter = () => {
      return isLoading ? <Loader loading={isLoading}/> : null;
    };

    const renderItem = (props:PaginationItem):JSX.Element => (
      <View style={{ padding: 20 }}>
        <Text style={{color:"#000"}}>{props.category}</Text>
        <Text>{props.amount}</Text>
        <Text>{props.date}</Text>
        <Text>{props.type}</Text>
      </View>
    );
  
    return (
      <FlatList
        data={pagination.content}
        renderItem={renderItem}
        keyExtractor={(item:PaginationItem)=>item.id}
        onEndReached={loadMoreTransactions}
        onEndReachedThreshold={0.1} // Load more when reaching 10% from the bottom
        ListFooterComponent={renderFooter}
      />
    );
  };

export default function TransactionList() {
    const {date:reduxDate,transactionType,range,transactions,pagination} = useSelector((state: RootState) => state.home)
    const theme = useTheme()
    const dispatch = useDispatch()

    const [active,setActive] = useState('')
    const [page,setPage] = useState(0)
    
    const getByCategories = () =>{
        setActive('category')
    }

    const getTransactions = () =>{
        setActive('all')
    }

    useEffect(()=>{
        if(active === 'all'){
            getAllTransactions(dispatch,transactionType,reduxDate,range,page)
        }
    },[active,page])

    return (
        <View>
            <View>
                <Button mode="text" compact={true} onPress={getByCategories}>
                    <Text style={{color:active === 'category'? theme.colors.primary:theme.colors.secondary}} variant='titleMedium'>By category</Text>
                </Button>
                <Button mode="text" onPress={getTransactions}>
                    <Text variant='titleMedium' style={{color:active === 'all'? theme.colors.primary:theme.colors.secondary}}>All transactions</Text>
                </Button>
            </View>
            {
                active === 'category' ? 
                <View>
                {
                    transactions.length !== 0 ? 
                    <List.Section>
                    {
                        transactions.map((ele,index)=>
                            <List.Item key={index} title={ele.categoryName} titleStyle={{color:categoryColors[ele.categoryName]}} />
                        )
                    }
                    </List.Section>
                    :
                    <Text style={{color:theme.colors.primary}} variant={'titleMedium'}>No Transactions</Text>
                }
                </View> :
                <View>
                    <PaginatedList setPage={setPage} page={page}/>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
})