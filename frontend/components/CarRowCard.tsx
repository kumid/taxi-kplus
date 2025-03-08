import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Pressable,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";

export interface CarElement {
  id: number;
  model: string;
  ctc: string;
  year: number;
  organization: string;
  summa_buy: number; // bought
  summa_sell: number; // price
  status: string; // статус машины (bought-куплена, installment - в рассрочке, sold - выплачена)

  buy_price: number; // price in market
  buy_terms: number; // terms
  payment_day: number;

  customerName: string; // имя покупателя
  customerPhone: string; // телефон покупателя
  customerAddress: string; // адрес покупателя
  customerPassport: string; // паспорт покупателя,
  latestNumber: string;
};

export interface CardProps {
  element: CarElement;
  elementEdit: () => void;
  elementCopy: () => void;
  elementDelete: () => void;
}

const CarRowCard: React.FC<CardProps> = ({
  element,
  elementEdit,
  elementCopy,
  elementDelete,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Pressable 
        style={[styles.card, isHovered && styles.cardHovered]} 
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
        onPress={() => elementEdit()}
        >
        <View style={{ ...styles.rowStyle, paddingVertical: 24 }}>
          <View style={{ width: "10%" }}>
            <Text style={{}}>{element.model}</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={{}}>{element.ctc}</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={{}}>{element.year}</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={{}}>{element.organization}</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={{}}>{element.summa_sell}</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={{}}>{element.buy_terms}</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={{}}>{element.payment_day}</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={{}}>{element.customerName}</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={{}}>{element.customerPhone}</Text>
          </View>
          <View style={{ width: "10%" }}></View>
        </View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  card: { 
  },
  cardHovered: {
    backgroundColor: "#f2f2f2",
  },
  rowStyle: {
    flexDirection: "row",
    marginBottom: 0,
    justifyContent: "space-between",
  },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  columnStyle: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  lineName: {
    fontSize: 14,
    color: "#777",
  },
  lineValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  lineValueUP: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
  ratingText: {
    fontSize: 14,
    color: "#f39c12",
  },
  offerDetails: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 10,
  },
});

export default CarRowCard;
