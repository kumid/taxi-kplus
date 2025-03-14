import Checkbox from "expo-checkbox";
import React, { useCallback, useEffect, useState } from "react";
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
import { formatNumber } from "./CarDetails";
import { Picker } from "@react-native-picker/picker";

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
  const [status, setStatus] = useState<string>("Не выбрано");
  const [buy_price, setBuy_price] = useState<string>("0");
  const [buy_terms, setBuy_terms] = useState<string>("0");
  const [payment_day, setPayment_day] = useState<string>("0");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [customerAddress, setCustomerAddress] = useState<string>("");
  const [customerPassport, setCustomerPassport] = useState<string>("");
  const [payment, setPayment] = useState<string>("0");
  const [latestNumber, setLatestNumber] = useState<string>("");



  React.useEffect(() => {
    setId(element.id);
    setModel(element.model);
    setCtc(element.ctc);
    setYear(element.year ? element.year.toString() : "");
    setOrganization(element.organization);
    setSumma_buy(element.summa_buy ? element.summa_buy.toString() : "");
    setSumma_sell(element.summa_sell ? element.summa_sell.toString() : "");  
    setStatus(element.status);
    setBuy_price(element.buy_price ? element.buy_price.toString() : "");  
    setBuy_terms(element.buy_terms ? element.buy_terms.toString() : ""); 
    setPayment_day(element.payment_day ? element.payment_day.toString() : "");  
    setPayment(element.payment ? element.payment.toString() : "");  
    setCustomerName(element.customerName);
    setCustomerPhone(element.customerPhone);
    setCustomerAddress(element.customerAddress);
    setCustomerPassport(element.customerPassport);
    setLatestNumber(element.latestNumber);

    if (element.id && element.id !== 0) setTitle("Редактировать машину");
    else setTitle("Новая машина");
  }, [element]);

  useEffect(() => {
    let summa = 0
    if(summa_sell.length != 0 && buy_terms.length != 0 && buy_terms != "0") {
      summa = Math.round(Number(summa_sell) / Number(buy_terms)); 
    }

    setPayment(summa.toString());
  }, [summa_sell, buy_terms])
  
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
      latestNumber: latestNumber,
      payment: Number(payment),
      numbers: [],
      payments: [], 
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
          <LabeledTextInput value={latestNumber} onChangeText={setLatestNumber} inputType={TextInputType.latestNumber} />
          <LabeledTextInput value={model} onChangeText={setModel} inputType={TextInputType.model} />
          <LabeledTextInput value={year} onChangeText={setYear} inputType={TextInputType.year} />
        </View>  

        <View style={{ ...styles.rowStyle, marginStart: 10, marginBottom: 16 }}> 
          <LabeledTextInput value={ctc} onChangeText={setCtc} inputType={TextInputType.ctc} />
          <LabeledTextInput value={organization} onChangeText={setOrganization} inputType={TextInputType.organization} />
          <View style={{width: '33%'}}>
            <Text style={{ fontSize: 14, fontWeight: "500", color: "dark-gray", marginBottom: 4 }}>Статус</Text>
            <Picker
              style={{marginHorizontal: 8, height:40, borderColor: 'gray'}}
              
              selectedValue={status}
              onValueChange={(itemValue, itemIndex) =>
                setStatus(itemValue)
              }>
              <Picker.Item label="Не выбрано" value="Не выбрано" />
              <Picker.Item label="Куплена" value="Куплена" />
              <Picker.Item label="В лизинге" value="В лизинге" />
              <Picker.Item label="Выплачена" value="Выплачена" />
            </Picker>
          </View>
          {/* <LabeledTextInput value={status} onChangeText={setStatus} inputType={TextInputType.status} /> */}
        </View>  
     

        <View style={{ ...styles.rowStyle, marginStart: 10, marginBottom: 16 }}>
          <LabeledTextInput value={summa_buy} onChangeText={(value) => handleIntegerChange(setSumma_buy, value)} inputType={TextInputType.summa_buy}/>
          <LabeledTextInput value={buy_price} onChangeText={(value) => handleIntegerChange(setBuy_price, value)}  inputType={TextInputType.buy_price} />
        </View> 

        <View style={{width: '100%', borderBottomWidth: 1, borderColor: 'gray', marginBottom: 16}}/>

        <View style={{ ...styles.rowStyle, marginStart: 10, marginBottom: 16 }}>
          <LabeledTextInput value={summa_sell} onChangeText={(value) => handleIntegerChange(setSumma_sell, value)} inputType={TextInputType.summa_sell} />
          <LabeledTextInput value={customerName} onChangeText={setCustomerName} inputType={TextInputType.customerName} />
        </View>

        <View style={{ ...styles.rowStyle, marginStart: 10, marginBottom: 16 }}>
          <LabeledTextInput value={buy_terms} onChangeText={(value) => handleIntegerChange(setBuy_terms, value)} inputType={TextInputType.buy_terms} />
          <LabeledTextInput value={payment_day} onChangeText={(value) => handleIntegerChange(setPayment_day, value)}  inputType={TextInputType.payment_day} />     
          <View style={{width: '33%', marginLeft: 12,}}>
            <Text style={{ fontSize: 14, fontWeight: "500", color: "dark-gray", marginBottom: 16 }}>Платеж</Text>
            <Text style={{fontSize: 20, fontWeight: "900", color: 'red' }}>{formatNumber(payment)}</Text>
          </View> 
        </View>
        
        <View style={{ ...styles.rowStyle, marginStart: 10, marginBottom: 16 }}>
          <LabeledTextInput value={customerPhone} onChangeText={setCustomerPhone} inputType={TextInputType.customerPhone} />
          <LabeledTextInput value={customerAddress} onChangeText={setCustomerAddress} inputType={TextInputType.customerAddress} />
          <LabeledTextInput value={customerPassport} onChangeText={setCustomerPassport} inputType={TextInputType.customerPassport} />
        </View> 

        <View style={{ ...styles.rowStyle, marginStart: 10, marginBottom: 16 }}>
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
