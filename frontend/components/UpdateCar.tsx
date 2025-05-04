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
  const [ctc, setCtc] = useState<string>("");
  const [vin, setVin] = useState<string>("");
  const [year, setYear] = useState<string>("2025");
  const [organization, setOrganization] = useState<string>("");
  const [summa_buy, setSumma_buy] = useState<string>("0");
  const [summa_sell, setSumma_sell] = useState<string>("0");
  const [status, setStatus] = useState<string>("Не выбрано");
  const [buy_price, setBuy_price] = useState<string>("0");
  const [buy_terms, setBuy_terms] = useState<string>("0");
  const [payment_day, setPayment_day] = useState<string>("0");
  const [customer_name, setCustomerName] = useState<string>("");
  const [customer_phone, setCustomerPhone] = useState<string>("");
  const [customer_address, setCustomerAddress] = useState<string>("");
  const [customer_passport, setCustomerPassport] = useState<string>("");
  const [first_payment, setFirst_payment] = useState<string>("0");
  const [last_payment, setLast_payment] = useState<string>("0");
  const [payment, setPayment] = useState<string>("0");
  const [paymentCalc, setPaymentCalc] = useState<string>("0");
  const [latestnumber, setLatestNumber] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [customer_driver, setCustomerDriver] = useState<string>("");
  const [park_comission, setParkComission] = useState<string>("3.5");
  const [park_rent, setParkRent] = useState<string>("80000");
  const [tax, setTax] = useState<string>("2000");
  const [sign1, setSign1] = useState<string>("Мамадова Г.А.");
  const [sign2, setSign2] = useState<string>("Даминов М.С.");
  const [sign3, setSign3] = useState<string>("Эркинжанов С.Г.");
  const [sign4, setSign4] = useState<string>("Юсупов Бахтиёр Иномидинович");
  const [sign4tel, setSign4tel] = useState<string>("+79687653333");
  const [sign5, setSign5] = useState<string>("Тажибаев Жахангир Абдихалилович");
  const [sign5tel, setSign5tel] = useState<string>("+79258692383");

  const defaultOrganization = "Мамадова Гусния Аладдин-Кызы, 10.07.1991 г.р.";

  React.useEffect(() => {
    setId(element.id);
    setModel(element.model);
    setCtc(element.ctc);
    setVin(element.vin)
    setYear(element.year ? element.year.toString() : "");
    setOrganization(element.organization);
    setSumma_buy(element.summa_buy ? element.summa_buy.toString() : "");
    setSumma_sell(element.summa_sell ? element.summa_sell.toString() : "");
    setStatus(element.status);
    setBuy_price(element.buy_price ? element.buy_price.toString() : "");
    setBuy_terms(element.buy_terms ? element.buy_terms.toString() : "");
    setPayment_day(element.payment_day ? element.payment_day.toString() : "");
    setPayment(element.payment ? element.payment.toString() : "");
    setFirst_payment(
      element.first_payment ? element.first_payment.toString() : ""
    );
    setCustomerName(element.customer_name);
    setCustomerPhone(element.customer_phone);
    setCustomerAddress(element.customer_address);
    setCustomerPassport(element.customer_passport);
    setLatestNumber(element.latestnumber);

    setColor(element.color);
    setCustomerDriver(element.customer_driver);
    setParkComission(
      element.park_comission ? element.park_comission.toString() : "3.5"
    );
    setParkRent(element.park_rent ? element.park_rent.toString() : "80000");
    setTax(element.tax ? element.tax.toString() : "2000");
    setSign1(element.sign1);
    setSign2(element.sign2);
    setSign3(element.sign3);
    setSign4(element.sign4);
    setSign5(element.sign5);
    setSign4tel(element.sign4tel);
    setSign5tel(element.sign5tel);

    if (element.id && element.id !== 0) setTitle("Редактировать машину");
    else setTitle("Новая машина");
  }, [element]);

  useEffect(() => {
    let summa = 0, ostatok = 0
    ostatok = Number(summa_sell);
    if (summa_sell.length != 0 && buy_terms.length != 0 && buy_terms != "0") {
      ostatok -= Number(first_payment)
      summa = Math.round( 
        (Number(summa_sell) - Number(first_payment)) / Number(buy_terms)
      );
    }
    setPaymentCalc(summa.toString());
  }, [summa_sell, buy_terms, first_payment]);

  const handleSave = () => {
    const organization2save = organization && organization.length != 0 ? organization : defaultOrganization 
    const data: CarElement = {
      id: id,
      model: model,
      ctc: ctc,
      vin: vin,
      year: Number(year),
      organization: organization2save,
      summa_buy: Number(summa_buy),
      summa_sell: Number(summa_sell),
      status: status,
      buy_price: Number(buy_price),
      buy_terms: Number(buy_terms),
      payment_day: Number(payment_day),
      customer_name: customer_name,
      customer_phone: customer_phone,
      customer_address: customer_address,
      customer_passport: customer_passport,
      latestnumber: latestnumber,
      payment: Number(payment),
      first_payment: Number(first_payment),

      color: color,
      customer_driver: customer_driver,
      park_comission: Number(park_comission),
      park_rent: Number(park_rent),
      tax: Number(tax),
      sign1: sign1,
      sign2: sign2,
      sign3: sign3,
      sign4: sign4,
      sign5: sign5,
      sign4tel: sign4tel,
      sign5tel: sign5tel,

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
          <LabeledTextInput
            value={latestnumber}
            onChangeText={setLatestNumber}
            inputType={TextInputType.latestnumber}
          />
          <LabeledTextInput
            value={model}
            onChangeText={setModel}
            inputType={TextInputType.model}
          />
          <LabeledTextInput
            value={year}
            onChangeText={setYear}
            inputType={TextInputType.year}
          />
          <LabeledTextInput
            value={ctc}
            onChangeText={setCtc}
            inputType={TextInputType.ctc}
          />
          <LabeledTextInput
            value={color}
            onChangeText={setColor}
            inputType={TextInputType.color}
          />
        </View>
        

        {/* <View style={{ ...styles.rowStyle, marginStart: 10, marginBottom: 16 }}>
          <LabeledTextInput
            value={summa_buy}
            onChangeText={(value) => handleIntegerChange(setSumma_buy, value)}
            inputType={TextInputType.summa_buy}
          />
          <LabeledTextInput
            value={buy_price}
            onChangeText={(value) => handleIntegerChange(setBuy_price, value)}
            inputType={TextInputType.buy_price}
          />
        </View> */}

        <View style={{ ...styles.rowStyle, marginStart: 10, marginBottom: 16 }}>
          <LabeledTextInput
            value={summa_sell}
            onChangeText={(value) => handleIntegerChange(setSumma_sell, value)}
            inputType={TextInputType.summa_sell}
          />
          <LabeledTextInput
            value={first_payment}
            onChangeText={(value) =>
              handleIntegerChange(setFirst_payment, value)
            }
            inputType={TextInputType.first_payment}
          />
          <LabeledTextInput
            value={buy_terms}
            onChangeText={(value) => handleIntegerChange(setBuy_terms, value)}
            inputType={TextInputType.buy_terms}
          />
          <LabeledTextInput
            value={payment_day}
            onChangeText={(value) => handleIntegerChange(setPayment_day, value)}
            inputType={TextInputType.payment_day}
          />
          <View style={{ width: "20%" }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                color: "dark-gray",
                marginLeft: 12,
                marginBottom: 16,
              }}
            >
              Расчет Платежа
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "900",
                color: "red",
                marginLeft: 12,
              }}
            >
              {formatNumber(paymentCalc)}
            </Text>
          </View>
        </View>

        <View style={{ ...styles.rowStyle, marginStart: 10, marginBottom: 16 }}>
          <LabeledTextInput
            value={park_comission}
            onChangeText={(value) =>
              handleIntegerChange(setParkComission, value)
            }
            inputType={TextInputType.park_comission}
          />
          <LabeledTextInput
            value={park_rent}
            onChangeText={(value) => handleIntegerChange(setParkRent, value)}
            inputType={TextInputType.park_rent}
          />
          <LabeledTextInput
            value={tax}
            onChangeText={(value) => handleIntegerChange(setTax, value)}
            inputType={TextInputType.tax}
          />

          <LabeledTextInput
            value={vin}
            onChangeText={setVin}
            inputType={TextInputType.vin}
          />

          <LabeledTextInput
            value={payment}
            onChangeText={setPayment}
            inputType={TextInputType.payment}
          />
        </View>

        <View style={{ ...styles.rowStyle, marginStart: 10, marginBottom: 16 }}>
          <LabeledTextInput
            value={customer_name}
            onChangeText={setCustomerName}
            inputType={TextInputType.customer_name}
            styleUI={{ input: { width: 525, marginStart: 10 } }}
          />
          <LabeledTextInput
            value={customer_passport}
            onChangeText={setCustomerPassport}
            inputType={TextInputType.customer_passport}
            styleUI={{ input: { width: 525, marginHorizontal: 10 } }}
          />
        </View>

        <View style={{ ...styles.rowStyle, marginStart: 10, marginBottom: 16 }}>
          <LabeledTextInput
            value={customer_phone}
            onChangeText={setCustomerPhone}
            inputType={TextInputType.customer_phone}
            styleUI={{ input: { width: 240, marginHorizontal: 10 } }}
          />
          <LabeledTextInput
            value={customer_address}
            onChangeText={setCustomerAddress}
            inputType={TextInputType.customer_address}
            styleUI={{ input: { width: 240, marginHorizontal: 10 } }}
          />
          <LabeledTextInput
            value={customer_driver}
            onChangeText={setCustomerDriver}
            inputType={TextInputType.customer_driver}
            styleUI={{ input: { width: 525, marginHorizontal: 10 } }}
          />
        </View>

        <View
          style={{
            width: "100%",
            borderBottomWidth: 1,
            borderColor: "gray",
            marginBottom: 16,
          }}
        />

        <View style={{ ...styles.rowStyle, marginStart: 10, marginBottom: 16, marginEnd: 0 }}>
          <View style={{ width: 470, marginStart: 10, marginEnd: 0 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                color: "dark-gray",
                marginBottom: 4,
              }}
            >
              Организация
            </Text>
            <Picker
              style={{ height: 40, borderColor: "gray", marginEnd: 48 }}
              selectedValue={organization}
              onValueChange={(itemValue, itemIndex) => {
                console.log("onValueChange", organization);
                setOrganization(itemValue);
              }}
            > 
            <Picker.Item
              label={defaultOrganization}
              value={defaultOrganization}
            />
            <Picker.Item
              label={"Абдиев Илхом Мухторович, 08.12.1975 г.р."}
              value={"Абдиев Илхом Мухторович, 08.12.1975 г.р."}
            />
            <Picker.Item
              label={"Абдуганиев Анвар Гафуржанович, 04.04.1983 г.р."}
              value={"Абдуганиев Анвар Гафуржанович, 04.04.1983 г.р."}
            />
            </Picker>
          </View>

          <View style={{ width: "20%", marginStart: 0 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                color: "dark-gray",
                marginBottom: 4,
              }}
            >
              Статус
            </Text>
            <Picker
              style={{ height: 40, borderColor: "gray", marginEnd: 48 }}
              selectedValue={status}
              onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}
            >
              <Picker.Item label="Не выбрано" value="Не выбрано" />
              <Picker.Item label="Куплена" value="Куплена" />
              <Picker.Item label="В лизинге" value="В лизинге" />
              <Picker.Item label="Выплачена" value="Выплачена" />
            </Picker>
          </View>

          {/* 
          <LabeledTextInput
            value={organization}
            onChangeText={setOrganization}
            inputType={TextInputType.organization}
            styleUI={{ input: { width: 650, marginStart: 10 } }}
          /> */}

          <LabeledTextInput
            value={sign4}
            onChangeText={setSign4}
            inputType={TextInputType.sign}
          />
          <LabeledTextInput
            value={sign5}
            onChangeText={setSign5}
            inputType={TextInputType.sign}
          />
        </View>

        <View style={{ ...styles.rowStyle, marginStart: 10, marginBottom: 16 }}>
          <LabeledTextInput
            value={sign1}
            onChangeText={setSign1}
            inputType={TextInputType.sign}
          />
          <LabeledTextInput
            value={sign2}
            onChangeText={setSign2}
            inputType={TextInputType.sign}
          />
          <LabeledTextInput
            value={sign3}
            onChangeText={setSign3}
            inputType={TextInputType.sign}
          />
          <LabeledTextInput
            value={sign4tel}
            onChangeText={setSign4tel}
            inputType={TextInputType.tel}
          />
          <LabeledTextInput
            value={sign5tel}
            onChangeText={setSign5tel}
            inputType={TextInputType.tel}
          />
        </View>

        <View
          style={{ ...styles.rowStyle, marginStart: 10, marginBottom: 16 }}
        ></View>

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
