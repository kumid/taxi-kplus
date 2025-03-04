import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";

export interface CardProps {
  element: {
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
    active: string;
    site: string;
  };
  elementEdit: () => void;
  elementCopy: () => void;
  elementDelete: () => void;
}

const CarCardV2: React.FC<CardProps> = ({
  element,
  elementEdit,
  elementCopy,
  elementDelete,
}) => {
  return (
    <View>
      <View style={styles.card}>
        <View style={styles.columnStyle}>
          <View style={styles.topSection}>
            <Image
              source={{ uri: element.image }}
              style={styles.logo}
              resizeMode="contain"
            />
            <View style={{ ...styles.columnStyle, marginStart: 10 }}>
              <Text style={styles.lineName}>Название</Text>
              <Text style={styles.title}>{element.name}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginStart: "auto",
                marginBottom: "auto",
              }}
            >
              <TouchableOpacity onPress={elementEdit} style={{ padding: 4 }}>
                <Feather name="edit" size={20} color="red" />
              </TouchableOpacity>
              <TouchableOpacity onPress={elementCopy} style={{ padding: 4 }}>
                <FontAwesome6 name="copy" size={20} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity onPress={elementDelete} style={{ padding: 4 }}>
                <MaterialCommunityIcons
                  name="delete-sweep-outline"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.rowStyle}>
            <Text style={styles.lineName}>Рейтинг</Text>
            <Text style={styles.ratingText}>⭐ {element.rate}</Text>
          </View>

          <View style={styles.rowStyle}>
            <Text style={styles.lineName}>Предложение:</Text>
            <Text style={styles.lineValue}>{element.offer_short_sum}</Text>
          </View>
          {/* <View style={styles.rowStyle}>
            <Text style={styles.lineName}>Грейс-период:</Text>
            <Text style={styles.lineValue}>{element.grace_period}</Text>
          </View>
          <View style={styles.rowStyle}>
            <Text style={styles.lineName}>Кэшбек:</Text>
            <Text style={styles.lineValue}>{element.cashback}</Text>
          </View>
          <View style={styles.rowStyle}>
            <Text style={styles.lineName}>Сервис:</Text>
            <Text style={styles.lineValue}>{element.service}</Text>
          </View>
          <View style={styles.rowStyle}>
            <Text style={styles.lineName}>Открытие карты:</Text>
            <Text style={styles.lineValue}>{element.opening_card}</Text>
          </View>
          <View style={styles.rowStyle}>
            <Text style={styles.lineName}>Ожидание:</Text>
            <Text style={styles.lineValue}>{element.release_date}</Text>
          </View>
          <View style={styles.rowStyle}>
            <Text style={styles.lineName}>Кредиты:</Text>
            <Text style={styles.lineValue}>{element.credits}</Text>
          </View>
          <View style={styles.rowStyle}>
            <Text style={styles.lineName}>Дополнительно:</Text>
            <Text style={styles.lineValue}>{element.additionally}</Text>
          </View>
          <View style={styles.rowStyle}>
            <Text style={styles.lineName}>Регистрация:</Text>
            <Text style={styles.lineValue}>{element.registration}</Text>
          </View>
          <View style={styles.rowStyle}>
            <Text style={styles.lineName}>Срок:</Text>
            <Text style={styles.lineValue}>{element.term}</Text>
          </View> */}
          <View style={styles.rowStyle}>
            <Text style={styles.lineName}>Одобрение:</Text>
            <Text style={styles.lineValue}>{element.approval}</Text>
          </View>
          <View style={styles.rowStyle}>
            <Text style={styles.lineName}>Просмотрено:</Text>
            <Text style={styles.lineValue}>{element.views}</Text>
          </View>
          <View style={styles.rowStyle}>
            <Text style={styles.lineName}>Преимущества:</Text>
            <Text style={styles.lineValue}>{element.advantage}</Text>
          </View>
          <View style={styles.rowStyle}>
            <Text style={styles.lineName}>Сумма займа:</Text>
            <Text style={styles.lineValue}>{element.loan_sum}</Text>
          </View>
          <View style={styles.rowStyle}>
            <Text style={styles.lineName}>Возраст:</Text>
            <Text style={styles.lineValue}>{element.age}</Text>
          </View>
          <View style={styles.rowStyle}>
            <Text style={styles.lineName}>Документы:</Text>
            <Text style={styles.lineValue}>{element.docs}</Text>
          </View>
          <View style={styles.rowStyle}>
            <Text style={styles.lineName}>График работы:</Text>
            <Text style={styles.lineValue}>{element.schedule}</Text>
          </View>
          <View style={styles.rowStyle}>
            <Text style={styles.lineName}>Лицензия:</Text>
            <Text style={styles.lineValue}>{element.license}</Text>
          </View>
        </View>

        <View style={styles.offerDetails}>
          <Text style={styles.lineName}>Детали предложения:</Text>
          <Text style={styles.lineValue}>{element.offer_detail}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default CarCardV2;
