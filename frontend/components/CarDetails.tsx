import { AntDesign, FontAwesome } from "@expo/vector-icons";
import React, { useCallback, useMemo, useState } from "react";
import { View, FlatList, Text, TouchableOpacity, Platform } from "react-native";
import AddPaymentDialog from "./AddPaymentDialog";
import { useDataContext } from "@/providers/DataProvider";

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

  customer_name: string; // имя покупателя
  customer_phone: string; // телефон покупателя
  customer_address: string; // адрес покупателя
  customer_passport: string; // паспорт покупателя,
  latestnumber: string;
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

const CarDetails: React.FC<CardProps> = ({
  element,
  elementEdit,
  addPayment,
}) => {
  const { deletePayment } = useDataContext();

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
  }, [element]);

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
          <Text style={{}}>{element.customer_address}</Text>
        </View>
        <View style={{ width: "10%", marginTop: 20 }}>
          <Text style={{ fontWeight: 900, marginBottom: 10 }}>
            Паспорт Покупателя
          </Text>
          <Text style={{}}>{element.customer_passport}</Text>
        </View>

        <FlatList
          style={{ width: "50%" }}
          contentContainerStyle={{}}
          data={element.payments}
          keyExtractor={(item) => item.id}
          numColumns={1} // Display 4 cards per row
          renderItem={({ item }) => (
            <View style={{ width: "50%", flexDirection: "row", marginTop: 16 }}>
              <View style={{ width: "20%" }}>
                <Text style={{ marginTop: 4 }}>{item.date}</Text>
              </View>
              <View style={{ width: "53%" }}>
                <Text style={{ marginTop: 4 }}>{item.comment}</Text>
              </View>
              <View style={{ width: "20%" }}>
                <Text style={{ marginLeft: "auto", marginTop: 4 }}>
                  {formatNumber(item.sum)}
                </Text>
              </View>
              <View style={{ width: "7%" }}>
                <TouchableOpacity
                  style={{ marginLeft: "auto" }}
                  onPress={() => {
                    deletePayment(item);
                  }}
                >
                  <FontAwesome name="trash" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListHeaderComponent={
            <View style={{}}>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                  width: "50%",
                  flexDirection: "row",
                  marginBottom: 10,
                }}
              >
                <h3 style={{ marginBottom: 12 }}>Платежи</h3>
                <TouchableOpacity
                  style={{ marginVertical: "auto", marginLeft: "auto" }}
                  onPress={() => {
                    addPayment();
                  }}
                >
                  <AntDesign name="pluscircle" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <View
                style={{ width: "50%", flexDirection: "row", marginBottom: 10 }}
              >
                <View style={{ width: "20%" }}>
                  <Text style={{ fontWeight: "bold" }}>Дата</Text>
                </View>
                <View style={{ width: "53%" }}>
                  <Text style={{ fontWeight: "bold" }}>Комментарий</Text>
                </View>
                <View style={{ width: "20%" }}>
                  <Text style={{ fontWeight: "bold", marginLeft: "auto" }}>
                    Сумма
                  </Text>
                </View>
                <View style={{ width: "7%" }}></View>
              </View>
            </View>
          }
          ListFooterComponent={
            <View style={{ width: "50%", flexDirection: "row", marginTop: 16 }}>
              <View style={{ width: "20%" }}>
                <Text style={{ fontWeight: "bold" }}>Итого</Text>
              </View>
              <View style={{ width: "53%" }}></View>
              <View style={{ width: "20%" }}>
                <Text style={{ fontWeight: "bold", marginLeft: "auto" }}>
                  {formatNumber(paymentSum())}
                </Text>
              </View>
              <View style={{ width: "7%" }}></View>
            </View>
          }
        />
      </View>
    </>
  );
};

export default CarDetails;
