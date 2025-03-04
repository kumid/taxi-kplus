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

export interface EditComponentProps {
  label: string;
  placeholder: string;
  value: string;
  style?: any;
  onChangeText: (text: string) => void;
}

export const EditComponent: React.FC<EditComponentProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  style = {},
}) => {
  return (
    <>
      <View style={{ ...styles.columnStyle, marginLeft: 4 }}>
        <Text style={{ ...styles.lineName, marginBottom: 4 }}>{label}</Text>
        <TextInput
          style={{ ...styles.input, ...style }}
          placeholder={placeholder}
          placeholderTextColor="#A9A9A9"
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </>
  );
};

export interface CardProps {
  element: {
    id: number;
    name: string;
    rate: number;
    offer_short: string;
    offer_short_sum: string;
    grace_period: string;
    service: string;
    opening_card: string;
    cashback: string;
    release_date: string;
    credits: string;
    additionally: string;
    registration: string;
    term: string;
    approval: string;
    views: number;
    advantage: string;
    loan_sum: string;
    age: string;
    docs: string;
    schedule: string;
    license: string;
    offer_detail: string;
    image: string;
    lang: string;
    active: boolean;
    site: string;
  };
  updateElement: (element: any) => void;
}

const UpdateCarCardMobile: React.FC<CardProps> = ({
  element,
  updateElement,
}) => {
  const [title, setTitle] = useState<string>("Новый оффер");

  const [name, setName] = useState<string>("");
  const [id, setId] = useState<number>(0);
  const [rate, setRate] = useState<number | string>(0);
  const [offerShort, setOfferShort] = useState<string>("");
  const [offerShortSum, setOfferShortSum] = useState<string>("");
  const [gracePeriod, setGracePeriod] = useState<string>("");
  const [service, setService] = useState<string>("");
  const [openingCard, setOpeningCard] = useState<string>("");
  const [cashback, setCashback] = useState<string>("");
  const [releaseDate, setReleaseDate] = useState<string>("");
  const [credits, setCredits] = useState<string>("");
  const [additionally, setAdditionally] = useState<string>("");
  const [registration, setRegistration] = useState<string>("");
  const [term, setTerm] = useState<string>("");
  const [approval, setApproval] = useState<string>("");
  const [views, setViews] = useState<number>(0);
  const [advantage, setAdvantage] = useState<string>("");
  const [loanSum, setLoanSum] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [docs, setDocs] = useState<string>("");
  const [schedule, setSchedule] = useState<string>("");
  const [license, setLicense] = useState<string>("");
  const [offerDetail, setOfferDetail] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [lang, setLang] = useState<string>("ru");
  const [active, setActive] = useState<boolean>(false);
  const [site, setSite] = useState<string>("");

  React.useEffect(() => {
    setId(element.id);
    setName(element.name);
    setRate(element.rate);
    setOfferShort(element.offer_short);
    setOfferShortSum(element.offer_short_sum);
    setGracePeriod(element.grace_period);
    setService(element.service);
    setOpeningCard(element.opening_card);
    setCashback(element.cashback);
    setReleaseDate(element.release_date);
    setCredits(element.credits);
    setAdditionally(element.additionally);
    setRegistration(element.registration);
    setTerm(element.term);
    setApproval(element.approval);
    setViews(element.views);
    setAdvantage(element.advantage);
    setLoanSum(element.loan_sum);
    setAge(element.age);
    setDocs(element.docs);
    setSchedule(element.schedule);
    setLicense(element.license);
    setOfferDetail(element.offer_detail);
    setImage(element.image);
    setLang(element.lang);
    setActive(element.active);
    setSite(element.site);

    if (element.id && element.id !== 0) setTitle("Редактировать оффер");
    else setTitle("Новый оффер");
  }, [element]);

  const handleIntegerChange =
    (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (value: string) => {
      const numericValue = value ? parseFloat(value) : 0;
      setter(numericValue);
    };

  const handleSave = () => {
    // TODO: validate rating
    let numericValue = parseFloat(rate?.toString());
    if (!isNaN(numericValue)) {
      numericValue = Math.min(Math.max(numericValue, 0), 5);
      setRate(numericValue);
    } else {
      setRate(4.8);
    }

    const data = {
      id: id,
      name,
      rate,
      offer_short: offerShort,
      offer_short_sum: offerShortSum,
      grace_period: gracePeriod,
      service,
      opening_card: openingCard,
      cashback,
      release_date: releaseDate,
      credits,
      additionally,
      registration,
      term,
      approval,
      views,
      advantage,
      loan_sum: loanSum,
      age,
      docs,
      schedule,
      license,
      offer_detail: offerDetail,
      lang,
      image,
      active,
      site,
    };

    updateElement(data);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={{ marginBottom: 8, fontSize: 14, fontWeight: 500 }}>
          {title}
        </Text>

        <EditComponent
          label={"Название"}
          placeholder={"Название"}
          value={name}
          onChangeText={setName}
        />
        <EditComponent
          label={"Предложение"}
          placeholder={"Предложение"}
          value={offerShortSum}
          onChangeText={setOfferShortSum}
        />
        <EditComponent
          label={"Преимущества"}
          placeholder={"Преимущества"}
          value={advantage}
          onChangeText={setAdvantage}
        />
        <EditComponent
          label={"Сумма займа"}
          placeholder={"Сумма займа"}
          value={loanSum}
          onChangeText={setLoanSum}
        />

        <EditComponent
          label={"Возраст"}
          placeholder={"Возраст"}
          value={age}
          onChangeText={setAge}
        />
        <EditComponent
          label={"Документы"}
          placeholder={"Документы"}
          value={docs}
          onChangeText={setDocs}
        />
        <EditComponent
          label={"График работы"}
          placeholder={"График работы"}
          value={schedule}
          onChangeText={setSchedule}
        />
        <EditComponent
          label={"Лицензия"}
          placeholder={"Лицензия"}
          value={license}
          onChangeText={setLicense}
        />

        <EditComponent
          label={"Одобрение"}
          placeholder={"Одобрение"}
          value={approval}
          onChangeText={setApproval}
        />
        <EditComponent
          label={"Рейтинг"}
          placeholder={"Рейтинг"}
          value={rate?.toString()}
          onChangeText={setRate}
        />

        <View style={{ ...styles.columnStyle }}>
          <Text style={styles.lineName}>Просмотры</Text>
          <TextInput
            style={styles.input}
            placeholder="1000"
            placeholderTextColor="#A9A9A9"
            keyboardType="numeric" // Numeric keyboard for rate input
            value={views?.toString()}
            onChangeText={handleIntegerChange(setViews)}
          />
        </View>

        <View style={{ ...styles.columnStyle }}>
          <Text style={styles.lineName}>Активный</Text>
          <View style={{ ...styles.input, borderWidth: 0 }}>
            <Checkbox
              style={{ marginTop: 8 }}
              value={active}
              color={active ? "#4630EB" : undefined}
              onValueChange={setActive}
            />
          </View>
        </View>

        <EditComponent
          label={"Детали предложения"}
          placeholder={"Детали предложения"}
          value={offerDetail}
          onChangeText={setOfferDetail}
        />
        <EditComponent
          label={"Лого"}
          placeholder={"https://"}
          value={image}
          onChangeText={setImage}
        />
        <EditComponent
          label={"Сайт"}
          placeholder={"Сайт"}
          value={site}
          onChangeText={setSite}
        />

        <View style={{ ...styles.rowStyle, marginStart: "auto" }}>
          <Button title="Save" onPress={() => handleSave()} />
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
    marginBottom: 10,
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

export default UpdateCarCardMobile;
