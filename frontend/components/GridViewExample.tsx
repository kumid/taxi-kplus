import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform, TextInput, Button, ViewStyle } from "react-native";
import { ScrollView } from "react-native-gesture-handler";



interface ColProps {
  numRows: number;
  children: React.ReactNode;
}

const Col: React.FC<ColProps> = ({ numRows, children }) => {
  const styleCol = `${numRows}col` as keyof typeof styles;
  return (
    <View style={styles[styleCol] as ViewStyle}>
      {children}
    </View>
  );
};

const Row: React.FC<{ children: any }> = ({ children }) => (
  <View style={styles.row}>{children}</View>
)



const GridViewExample: React.FC = () => {


  const handleNumericChange = (setter: React.Dispatch<React.SetStateAction<any>>) => (value: string) => {
    const numericValue = value ? parseFloat(value) : 0;
    setter(numericValue);
  };

  return (

    <View style={styles.app}>
      <Row>
        <Col numRows={1}>
          <Text>First column</Text>
        </Col>
        <Col numRows={1}>
          <Text>Second Column</Text>
        </Col>
      </Row>
      <Row>
        <Col numRows={2}>
          <Text>First column</Text>
        </Col>
        <Col numRows={2}>
          <Text>Second Column</Text>
        </Col>
      </Row>
      
      <Row>
        <Col numRows={1}>
          <Text>First column</Text>
        </Col>
        <Col numRows={3}>
          <Text>Second Column</Text>
        </Col>
      </Row>
      <Button title="Save" onPress={() => alert('Saved!')} />

    </View>
  );
};

const styles = StyleSheet.create({

  app: {
    flex: 4, // the number of columns you want to devide the screen into
    marginHorizontal: "auto",
    width: 400,
    // backgroundColor: "red"
  },
  row: {
    flexDirection: "row"
  },
  "1col": {
    // backgroundColor: "lightblue",
    // borderColor: "#fff",
    // borderWidth: 1,
    flex: 1
  },
  "2col": {
    // backgroundColor: "green",
    // borderColor: "#fff",
    // borderWidth: 1,
    flex: 2
  },
  "3col": {
    // backgroundColor: "orange",
    // borderColor: "#fff",
    // borderWidth: 1,
    flex: 3
  },
  "4col": {
    // borderWidth: 1,
    flex: 4
  },

});



export default GridViewExample; 
