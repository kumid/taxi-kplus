import React, { useCallback, useEffect, useMemo, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Dialog from "@/components/DialogComponent ";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Pressable,
  FlatList,
} from "react-native";
import AddPaymentDialog from "./AddPaymentDialog";
import CarDetails, { formatNumber } from "./CarDetails";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { generateContract } from "@/services/generateContract";

export interface CarElement {
  id: number;
  model: string;
  ctc: string;
  vin: string,
  year: number;
  organization: string;
  summa_buy: number; // bought
  summa_sell: number; // price
  status: string; // статус машины (bought-куплена, installment - в рассрочке, sold - выплачена)

  buy_price: number; // price in market
  buy_terms: number; // terms
  payment_day: number;
  first_payment: number;
  payment: number;

  customer_name: string; // имя покупателя
  customer_phone: string; // телефон покупателя
  customer_address: string; // адрес покупателя
  customer_passport: string; // паспорт покупателя,
  latestnumber: string;
  nexpPaymentDate?: Date;

  color: string;
  customer_driver: string;
  park_comission: number;
  park_rent: number;
  tax: number;
  sign1: string;
  sign2: string;
  sign3: string;
  sign4: string;
  sign5: string;
  sign4tel: string;
  sign5tel: string;

  numbers: any[];
  payments: any[];
}

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
  const [isAddPaymentDialogVisible, setIsPaymentAddDialogVisible] =
    useState<boolean>(false);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState<
    Map<number, boolean>
  >(new Map());

  // Function to toggle an item's expansion state
  const toggleDetails = (id: number) => {
    setIsDetailsExpanded((prev) => {
      const newMap = new Map(prev);
      newMap.set(id, !newMap.get(id)); // Toggle value
      return newMap;
    });
  };

  const dialogSize = useMemo(() => {
    if (Platform.OS === "web") {
      return "xl";
    } else {
      return "full";
    }
  }, []);
  useEffect(() => {
    console.log(element, "element....................");
  }, [element]);

  const ostatokSumma = useCallback(() => {
    let summa = element.summa_sell - element.first_payment;

    element.payments.forEach((payment: any) => {
      summa -= payment.sum;
    });
    return summa;
  }, [element]);

  const contractCreate = useCallback(() => {
    generateContract(element);
  }, [element]);

  return (
    <>
      <Pressable
        style={[styles.card, isHovered && styles.cardHovered]}
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
        onPress={() => {
          toggleDetails(element.id);
          // elementEdit();
        }}
      >
        <View
          style={{
            ...styles.rowStyle,
            paddingLeft: 8,
            paddingTop: 24,
            paddingBottom: isDetailsExpanded.get(element.id) ? 0 : 24,
          }}
        >
          <View style={{ width: "10%" }}>
            <Text
              style={{
                borderWidth: 2,
                borderColor: "blue",
                marginEnd: "auto",
                padding: 8,
                borderRadius: 8,
                fontWeight: 700,
              }}
            >
              {element.latestnumber}
            </Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={{ marginVertical: "auto" }}>{element.model}</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={{ marginVertical: "auto" }}>{element.year}</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={{ marginVertical: "auto" }}>
              {element.customer_name}
            </Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={{ marginVertical: "auto" }}>
              {element.customer_phone}
            </Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text
              style={{ marginVertical: "auto", color: "blue", fontWeight: 700 }}
            >
              {formatNumber(element.summa_sell)}
            </Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text
              style={{ marginVertical: "auto", color: "red", fontWeight: 700 }}
            >
              {formatNumber(ostatokSumma())}
            </Text>
          </View>
          <View style={{ width: "10%", marginVertical: "auto" }}>
            <Text style={{}}>{element.buy_terms}</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={{ marginVertical: "auto" }}>
              {element.nexpPaymentDate?.toLocaleDateString()}
            </Text>
            <Text style={{ fontWeight: 900 }}>
              {formatNumber(element.payment)}
            </Text>
          </View>
          <View style={{ width: "7%" }}>
            <Text
              style={{
                borderWidth: 2,
                borderColor: "blue",
                marginEnd: "auto",
                padding: 8,
                borderRadius: 8,
                fontWeight: 700,
                backgroundColor: "blue",
                color: "yellow",
              }}
            >
              {element.status}
            </Text>
          </View>
          <View style={{ width: "3%", padding: "auto" }}>
            <TouchableOpacity style={{ margin: "auto" }} onPress={elementEdit}>
              <Feather name="edit" size={24} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginHorizontal: "auto", marginTop: 16 }}
              onPress={contractCreate}
            >
              <MaterialIcons name="picture-as-pdf" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {isDetailsExpanded.get(element.id) && (
          <CarDetails
            element={element}
            elementEdit={() => {}}
            addPayment={() => {
              setIsPaymentAddDialogVisible(!isAddPaymentDialogVisible);
            }}
          />
        )}
      </Pressable>

      <Dialog
        isVisible={isAddPaymentDialogVisible}
        onClose={() => {
          setIsPaymentAddDialogVisible(!isAddPaymentDialogVisible);
        }}
        dialogWidth={dialogSize}
        scrollable={true}
      >
        <AddPaymentDialog
          requestText={`Платеж за ${element.latestnumber} от ${element.customer_name}`}
          setIsDialogVisible={setIsPaymentAddDialogVisible}
          car={element}
          setter={(summa) => {
            console.log("Summa: ", summa);
          }}
        />
      </Dialog>
    </>
  );
};

const styles = StyleSheet.create({
  card: {},
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
