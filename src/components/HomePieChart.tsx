import { StyleSheet, View,Dimensions } from 'react-native'
import React,{PropsWithChildren} from 'react'
import { PieChart } from 'react-native-chart-kit';
import DateSelector from './DateSelector';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { categoryColors } from '../helpers/util';
import { Card } from 'react-native-paper';

const screenWidth = Dimensions.get("window").width
const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726"
    }
}

type HomePieChartProps = PropsWithChildren<{setPage:Function}>
export default function HomePieChart({setPage}:HomePieChartProps) {
  const {transactions} = useSelector((state: RootState) => state.home)

  const data = transactions.map((ele)=>{
    return {
      ...ele,
      name:ele.categoryName,
      color: categoryColors[ele.categoryName],
      // legendFontColor: categoryColors[ele.categoryName],
      // legendFontSize: 15
    }
  })

    return (
    <View>
      <DateSelector setPage={setPage}/>
      <Card style={styles.container}>
        <Card.Content >
          <PieChart
          data={data}
          width={screenWidth}
          height={210}
          chartConfig={chartConfig}
          accessor={"amount"}
          backgroundColor={"transparent"}
          // paddingLeft={"2"}
          paddingLeft='-25'
          center={[5, 10]}
          // absolute
          hasLegend={true}
        />
        </Card.Content>
      </Card>
      
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginVertical:10
    },
})