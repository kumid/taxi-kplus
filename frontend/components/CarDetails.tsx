import { AntDesign } from "@expo/vector-icons";
import React, { useCallback, useMemo, useState } from "react";
import { View, FlatList, Text, TouchableOpacity, Platform } from "react-native";
import AddPaymentDialog from "./AddPaymentDialog"; 
 
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
  numbers: any[];
  payments: any[];
}

export interface CardProps {
  element: CarElement;
  elementEdit: () => void;
  addPayment: () => void;
}

export const formatNumber = (num: number | string): string => {
  return Number(num).toLocaleString(); // Default uses browser locale
};

const CarDetails: React.FC<CardProps> = ({ element, elementEdit, addPayment }) => { 


  const dialogSize = useMemo(() => {
    if (Platform.OS === "web") {
      return "xl";
    } else {
      return "full";
    }
  }, []);
  
const paymentSum = useCallback(() => {
    let summa = 0;
    element.payments.forEach((payment: any) => {
      summa += payment.sum;
    });
    return summa;
  }, [element])

  return (
    <>
      <View style={{ marginLeft: 16, marginBottom: 16, flexDirection: "row" }}>
        <View style={{ width: "10%", marginTop: 20 }}>
          <Text style={{ fontWeight: 900, marginBottom: 10 }}>СТС</Text>
          <Text style={{}}>{element.ctc}</Text>
        </View>
        <View style={{ width: "10%", marginTop: 20 }}>
          <Text style={{ fontWeight: 900, marginBottom: 10 }}>Куплена за</Text>
          <Text style={{}}>{formatNumber(element.summa_buy)}</Text>
        </View>
        <View style={{ width: "10%", marginTop: 20 }}>
          <Text style={{ fontWeight: 900, marginBottom: 10 }}>
            Стоимость на рынке
          </Text>
          <Text style={{}}>{formatNumber(element.buy_price)}</Text>
        </View>
        <View style={{ width: "10%", marginTop: 20 }}>
          <Text style={{ fontWeight: 900, marginBottom: 10 }}>
            Адрес Покупателя
          </Text>
          <Text style={{}}>{element.customerAddress}</Text>
        </View>
        <View style={{ width: "10%", marginTop: 20 }}>
          <Text style={{ fontWeight: 900, marginBottom: 10 }}>
            Паспорт Покупателя
          </Text>
          <Text style={{}}>{element.customerPassport}</Text>
        </View>
        {/* <FlatList
          style={{ width: "30%" }}
          contentContainerStyle={{}}
          data={element.numbers}
          keyExtractor={(item) => item.id}
          numColumns={1} // Display 4 cards per row
          renderItem={({ item }) => (
            <View
              style={{ width: "100%", flexDirection: "row", marginBottom: 10 }}
            >
              <View style={{ width: "20%" }}>
                <Text
                  style={{
                    borderWidth: 1,
                    borderColor: "black",
                    marginEnd: "auto",
                    padding: 8,
                    borderRadius: 8,
                    fontWeight: 700,
                  }}
                >
                  {item.gov_number}
                </Text>
              </View>
              <View style={{ width: "40%" }}>
                <Text style={{ marginVertical: "auto" }}>{item.comment}</Text>
              </View>
            </View>
          )}
          ListHeaderComponent={
            <View>
              <h3 style={{ marginBottom: 12 }}>Номера</h3>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  marginBottom: 10,
                }}
              >
                <View style={{ width: "20%" }}>
                  <Text style={{ fontWeight: "bold" }}>Номер</Text>
                </View>
                <View style={{ width: "40%" }}>
                  <Text style={{ fontWeight: "bold" }}>Комментарий</Text>
                </View>
              </View>
            </View>
          }
        /> */}

        <FlatList
          style={{ width: "50%" }}
          contentContainerStyle={{}}
          data={element.payments}
          keyExtractor={(item) => item.id}
          numColumns={1} // Display 4 cards per row
          renderItem={({ item }) => (
            <View style={{ width: "50%", flexDirection: "row", marginTop: 16 }}>
              <View style={{ width: "20%" }}>
                <Text style={{}}>{item.date}</Text>
              </View>
              <View style={{ width: "60%" }}>
                <Text style={{}}>{item.comment}</Text>
              </View>
              <View style={{ width: "20%" }}>
                <Text style={{ marginLeft: "auto" }}>
                  {formatNumber(item.sum)}
                </Text>
              </View>
            </View>
          )}
          ListHeaderComponent={
            <View>
              <View style={{ width: "50%", flexDirection: "row", marginBottom: 10 }}>
                <h3 style={{ marginBottom: 12 }}>Платежи</h3>
                <TouchableOpacity style={{marginVertical: 'auto', marginLeft: 'auto'}} 
                  onPress={() => {addPayment()}}>
                  <AntDesign name="pluscircle" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <View
                style={{ width: "50%", flexDirection: "row", marginBottom: 10 }}
              >
                <View style={{ width: "20%" }}>
                  <Text style={{ fontWeight: "bold" }}>Дата</Text>
                </View>
                <View style={{ width: "60%" }}>
                  <Text style={{ fontWeight: "bold" }}>Комментарий</Text>
                </View>
                <View style={{ width: "20%" }}>
                  <Text style={{ fontWeight: "bold", marginLeft: "auto" }}>
                    Сумма
                  </Text>
                </View>
              </View>
            </View>
          }
          ListFooterComponent={
            <View style={{ width: "50%", flexDirection: "row", marginTop: 16 }}>
              <View style={{ width: "20%" }}>
                <Text style={{ fontWeight: "bold" }}>Итого</Text>
              </View>
              <View style={{ width: "60%" }}></View>
              <View style={{ width: "20%" }}>
                <Text style={{ fontWeight: "bold", marginLeft: "auto" }}>
                  {formatNumber(paymentSum())}
                </Text>
              </View>
            </View>
          }
        />  
      </View>

           
    </>
  );
};

export default CarDetails;
