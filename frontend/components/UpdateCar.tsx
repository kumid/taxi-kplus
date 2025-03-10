import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TextInput,
  Button,
  ViewStyle,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { EditComponent } from "./UpdateCarMobile";
import { CarElement } from "./CarRowCard";
import LabeledTextInput, { TextInputType } from "./LabeledTextInput";
import { handleIntegerChange } from "./handleIntegerChange";

export interface CardProps {
  element: CarElement;
  updateElement: (element: CarElement) => void;
}
   
const UpdateCarCard: React.FC<CardProps> = ({ element, updateElement }) => {
  const [title, setTitle] = useState<string>("Новая машина");

  const [id, setId] = useState<number>(0);
  const [model, setModel] = useState<string>("");
  const [ctc, setCtc] = useState<string>('');
  const [year, setYear] = useState<string>("2025");
  const [organization, setOrganization] = useState<string>("");
  const [summa_buy, setSumma_buy] = useState<string>("0");
  const [summa_sell, setSumma_sell] = useState<string>("0");
  const [status, setStatus] = useState<string>("");
  const [buy_price, setBuy_price] = useState<string>("0");
  const [buy_terms, setBuy_terms] = useState<string>("0");
  const [payment_day, setPayment_day] = useState<string>("0");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [customerAddress, setCustomerAddress] = useState<string>("");
  const [customerPassport, setCustomerPassport] = useState<string>("");
  const [latestNumber, setLatestNumber] = useState<string>("0");



  React.useEffect(() => {
    setId(element.id);
    setModel(element.model);
    setCtc(element.ctc);
    setYear(String(element.year));
    setOrganization(element.organization);
    setSumma_buy(String(element.summa_buy));
    setSumma_sell(String(element.summa_sell));
    setStatus(element.status);
    setBuy_price(String(element.buy_price));
    setBuy_terms(String(element.buy_terms));
    setPayment_day(String(element.payment_day));
    setCustomerName(element.customerName);
    setCustomerPhone(element.customerPhone);
    setCustomerAddress(element.customerAddress);
    setCustomerPassport(element.customerPassport);
    setLatestNumber(element.latestNumber);

    if (element.id && element.id !== 0) setTitle("Редактировать машину");
    else setTitle("Новая машина");
  }, [element]);

  
  
  const handleSave = () => {
      
    const data: CarElement = {
      id: id,
      model: model,
      ctc: ctc,
      year: Number(year),
      organization: organization,
      summa_buy: Number(summa_buy),
      summa_sell: Number(summa_sell),
      status: status,
      buy_price: Number(buy_price),
      buy_terms: Number(buy_terms),
      payment_day: Number(payment_day),
      customerName: customerName,
      customerPhone: customerPhone,
      customerAddress: customerAddress,
      customerPassport: customerPassport,
      latestNumber: latestNumber
    };

    updateElement(data);
  }; 
    

  return (
    <>
      <View style={styles.container}>
        <Text style={{ margin: 20, fontSize: 22, fontWeight: 500 }}>
          {title}
        </Text>

        <View style={{ ...styles.rowStyle, marginStart: 10, marginBottom: 16 }}>
          <LabeledTextInput value={model} onChangeText={setModel} inputType={TextInputType.model} />
          <LabeledTextInput value={ctc} onChangeText={setCtc} inputType={TextInputType.ctc} />
          <LabeledTextInput value={organization} onChangeText={setOrganization} inputType={TextInputType.organization} />
          <LabeledTextInput value={summa_buy} onChangeText={(value) => handleIntegerChange(setSumma_buy, value)} inputType={TextInputType.summa_buy}/>
        </View>  
    
        <View style={{ ...styles.rowStyle, marginStart: 10, marginBottom: 16 }}>
          <LabeledTextInput value={summa_sell} onChangeText={(value) => handleIntegerChange(setSumma_sell, value)}  inputType={TextInputType.summa_sell} />
          <LabeledTextInput value={status} onChangeText={setStatus} inputType={TextInputType.status} />
          <LabeledTextInput value={buy_price} onChangeText={(value) => handleIntegerChange(setBuy_price, value)}  inputType={TextInputType.buy_price} />
          <LabeledTextInput value={buy_terms} onChangeText={(value) => handleIntegerChange(setBuy_terms, value)} inputType={TextInputType.buy_terms} />
        </View> 
        <View style={{ ...styles.rowStyle, marginStart: 10, marginBottom: 16 }}>
          <LabeledTextInput value={payment_day} onChangeText={(value) => handleIntegerChange(setPayment_day, value)}  inputType={TextInputType.payment_day} />
          <LabeledTextInput value={latestNumber} onChangeText={setLatestNumber} inputType={TextInputType.latestNumber} />
        </View>
 
        <View style={{ ...styles.rowStyle, marginStart: 10, marginBottom: 16 }}>
          <LabeledTextInput value={customerName} onChangeText={setCustomerName} inputType={TextInputType.customerName} />
          <LabeledTextInput value={customerPhone} onChangeText={setCustomerPhone} inputType={TextInputType.customerPhone} />
          <LabeledTextInput value={customerAddress} onChangeText={setCustomerAddress} inputType={TextInputType.customerAddress} />
          <LabeledTextInput value={customerPassport} onChangeText={setCustomerPassport} inputType={TextInputType.customerPassport} />
        </View>

        <View style={{ ...styles.rowStyle, marginStart: "auto" }}>
          <Button title="Сохранить" onPress={() => handleSave()} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'center9',
    // padding: 20,
  },
  input: {
    height: 40,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
  inputNumber: {
    height: 40,
    width: 100,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    margin: 5,
    elevation: 3,
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

export default UpdateCarCard;
