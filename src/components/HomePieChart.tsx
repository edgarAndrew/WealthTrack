import { StyleSheet, View,Dimensions } from 'react-native'
import React from 'react'
import { PieChart } from 'react-native-chart-kit';
import DateSelector from './DateSelector';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { categoryColors } from '../helpers/util';

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

export default function HomePieChart() {
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
      <DateSelector/>
      <PieChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        accessor={"amount"}
        backgroundColor={"transparent"}
        paddingLeft={"65"}
        center={[20, 10]}
        absolute
        hasLegend={false}
       />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        height:250
    },
})