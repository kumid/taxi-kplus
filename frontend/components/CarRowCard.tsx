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
import { Feather } from "@expo/vector-icons";

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
  payment: number;

  customerName: string; // имя покупателя
  customerPhone: string; // телефон покупателя
  customerAddress: string; // адрес покупателя
  customerPassport: string; // паспорт покупателя,
  latestNumber: string;
  nexpPaymentDate: Date;
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
  const [isAddPaymentDialogVisible, setIsPaymentAddDialogVisible] = useState<boolean>(false);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState<Map<number, boolean>>(new Map());

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

  const ostatokSumma = useCallback(() => {
    let summa = element.summa_sell;
    element.payments.forEach((payment: any) => {
      summa -= payment.sum;
    });
    return summa;
  }, [element])

  // const nexpPaymentDate = useCallback(() => {
  //   const today = new Date();
  //   const currentYear = today.getFullYear();
  //   const currentMonth = today.getMonth();
  
  //   let nextPaymentDate = new Date(currentYear, currentMonth, element.payment_day);
   
  //   // If today is past the payment day, move to next month
  //   if (today.getDate() > element.payment_day) {
  //     nextPaymentDate = new Date(currentYear, currentMonth + 1, element.payment_day);
  //   }
  
  //   return nextPaymentDate.toLocaleDateString();
  // }, [element])


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
        <View style={{ ...styles.rowStyle, paddingLeft: 8, paddingTop: 24, paddingBottom: (isDetailsExpanded.get(element.id) ? 0 : 24) }}>
        
          <View style={{ width: "10%",  }}>
            <Text style={{borderWidth: 2, borderColor: 'blue', marginEnd: 'auto', padding: 8, borderRadius: 8, fontWeight: 700}}>
              {element.latestNumber}
              </Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={{marginVertical: 'auto'}}>{element.model}</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={{marginVertical: 'auto'}}>{element.year}</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={{marginVertical: 'auto'}}>{element.customerName}</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={{marginVertical: 'auto'}}>{element.customerPhone}</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={{marginVertical: 'auto', color: 'blue', fontWeight: 700}}>{formatNumber(element.summa_sell)}</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={{marginVertical: 'auto', color: 'red', fontWeight: 700}}>{formatNumber(ostatokSumma())}</Text>
          </View>
          <View style={{ width: "10%", marginVertical: 'auto',  }}>
            <Text style={{}}>{element.buy_terms}</Text> 
          </View>
          <View style={{ width: "10%" }}>
            <Text style={{marginVertical: 'auto'}}>{element.nexpPaymentDate.toLocaleDateString()}</Text>
            <Text style={{fontWeight: 900}}>{formatNumber(element.payment)}</Text>
          </View> 
          <View style={{ width: "7%",  }}>
            <Text style={{borderWidth: 2, borderColor: 'blue', marginEnd: 'auto', padding: 8, borderRadius: 8, 
              fontWeight: 700, backgroundColor: 'blue', color: 'yellow'}}>
              {element.status}
              </Text>
          </View>
          <View style={{ width: "3%", padding:'auto' }}>
            <TouchableOpacity
              style={{ margin: 'auto' }}
              onPress={elementEdit}>
              <Feather name="edit" size={24} color="gray" />
            </TouchableOpacity>
          </View>
        </View>

        {isDetailsExpanded.get(element.id) && (
          <CarDetails element={element} 
            elementEdit={() => {}} 
            addPayment={() => {setIsPaymentAddDialogVisible(!isAddPaymentDialogVisible);}}/> 
          )}
      </Pressable>

      <Dialog
        isVisible={isAddPaymentDialogVisible}
        onClose={() => {setIsPaymentAddDialogVisible(!isAddPaymentDialogVisible)}}
        dialogWidth={dialogSize}
        scrollable={true}
      >
        <AddPaymentDialog requestText={`Платеж за ${element.latestNumber} от ${element.customerName}`} 
          setIsDialogVisible={setIsPaymentAddDialogVisible }
          car={element} 
          setter={ (summa) => {console.log("Summa: ", summa)} } />
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
