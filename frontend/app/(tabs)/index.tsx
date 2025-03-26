import AntDesign from "@expo/vector-icons/AntDesign";

import { useDataContext } from "@/providers/DataProvider";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import CarCard from "@/components/CarCard";
import Dialog from "@/components/DialogComponent ";
import UpdateCarCard from "@/components/UpdateCar";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import UpdateCarCardMobile from "@/components/UpdateCarMobile";
import {
  Dimensions,
  Platform,
  Alert,
  View,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
} from "react-native";
import CarRowCard from "@/components/CarRowCard";
import { AuthContext } from "@/providers/AuthContext";
import { router } from "expo-router";

const sampleCard: any = {
  element: {
    id: 0,
    model: "",
    ctc: "",
    year: 2025,
    organization: "",
    summa_buy: 0,
    summa_sell: 0,
    status: "Куплена",

    buy_price: 0,
    buy_terms: 0,
    payment_day: 14,

    customerName: "",
    customerPhone: "",
    customerAddress: "",
    customerPassport: "",
    latestNumber: "",
  },
};

export default function CardsScreen() {
  const { cachedCars, loadingCars, updateCars, updateCarsResult, deleteCar } =
    useDataContext();
  const { width } = Dimensions.get("window"); // Get the screen width
  const columnCount = Platform.OS == "web" ? 1 : 1; // Number of columns per row
  const cardWidth =
    (width - (columnCount - 1) * 10) / columnCount -
    (Platform.OS == "web" ? 0 : 30); // Calculate card width with margin space
  const [selectedLang, setSelectedLang] = React.useState("ru");
  const [filteredCards, setFilteredCards] = React.useState<any[]>([]);
  const [isAddDialogVisible, setIsAddDialogVisible] = useState<boolean>(false);
  const [offerToDialog, setOfferToDialog] = useState<any>({ ...sampleCard });

  const [isConfirmationDialogVisible, setIsConfirmationDialogVisible] =
    useState<boolean>(false);
  const [offerToDelete, setOfferToDelete] = useState<any>(null);

  

  const handleItemPress = async (element: any, isCopy: boolean = false) => {
    if (isCopy) {
      element.id = 0;
      element.name = `${element.name} (копия)`;
    }
    setOfferToDialog(element);
    setIsAddDialogVisible(!isAddDialogVisible);
  };
  const handleItemDeletePress = async (element: any) => {
    setIsConfirmationDialogVisible(true);
    setOfferToDelete(element);
  };
  const itemDeleteAction = async () => {
    await deleteCar(offerToDelete);
    setIsConfirmationDialogVisible(false);
  };

  useEffect(() => {
    if (updateCarsResult.success === true) {
      setIsAddDialogVisible(false);
    }
  }, [updateCarsResult]);

  useEffect(() => { 

    const lst = cachedCars?.filter((card) => card.lang === selectedLang);
    setFilteredCards(lst);
  }, [cachedCars, selectedLang]);

  const toggleAddDialogModal = (): void => {
    setOfferToDialog({
      ...sampleCard,
      id: 0,
    });
    setIsAddDialogVisible(!isAddDialogVisible);
  };

  const dialogSize = useMemo(() => {
    if (Platform.OS === "web") {
      return "xl";
    } else {
      return "full";
    }
  }, []);

  const createTwoButtonAlert = () =>
    Alert.alert("Alert Title", "My Alert Msg", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  const Header = () => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 8,
        borderBottomColor: "black",
        paddingBottom: 16,
        borderBottomWidth: 1,
      }}
    >
      <View style={{ width: "10%" }}>
        <Text style={{ fontWeight: 900 }}>Госномер</Text>
      </View>
      <View style={{ width: "10%" }}>
        <Text style={{ fontWeight: 900 }}>Модель</Text>
      </View>
      <View style={{ width: "10%" }}>
        <Text style={{ fontWeight: 900 }}>Год</Text>
      </View>
      <View style={{ width: "10%" }}>
        <Text style={{ fontWeight: 900 }}>Покупатель</Text>
      </View>
      <View style={{ width: "10%" }}>
        <Text style={{ fontWeight: 900 }}>Телефон</Text>
      </View>
      <View style={{ width: "10%" }}>
        <Text style={{ fontWeight: 900 }}>Стоимость</Text>
      </View>
      <View style={{ width: "10%" }}>
        <Text style={{ fontWeight: 900 }}>Остаток</Text>
      </View>
      <View style={{ width: "10%" }}>
        <Text style={{ fontWeight: 900 }}>Срок</Text>
      </View>
      <View style={{ width: "10%" }}>
        <Text style={{ fontWeight: 900 }}>Ближайший платеж</Text>
      </View>
      <View style={{ width: "10%" }}>
        <Text style={{ fontWeight: 900 }}>Статус</Text>
      </View>
    </View>
  );

  return (
    <>
      <View style={{ flex: 1, padding: 15 }}>
        <View style={styles.header}>
          <View>
            <Text style={styles.welcome}>Лизинг</Text>
          </View>
          <TouchableOpacity
            style={styles.notificationIcon}
            onPress={toggleAddDialogModal}
          >
            <AntDesign name="pluscircle" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: "#fff",
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            paddingHorizontal: 20,
            paddingTop: 20,
            marginHorizontal: 5,
            elevation: 3,
          }}
        >
          <Header />
        </View>

        <FlatList
          style={{ ...styles.freeHeight, marginTop: 0 }}
          contentContainerStyle={styles.listContent}
          data={cachedCars}
          keyExtractor={(item) => item.id}
          numColumns={columnCount} // Display 4 cards per row
          renderItem={({ item }) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderBottom: "1px solid #ccc",
                background: "linear-gradient(to bottom, #f9f9f9, #f0f0f0)",
              }}
            >
              <View style={{ width: "100%" }}>
                <CarRowCard
                  element={item}
                  elementEdit={() => handleItemPress({ ...item })}
                  elementCopy={() => handleItemPress({ ...item }, true)}
                  elementDelete={() => handleItemDeletePress(item)}
                />
              </View>
            </div>
          )}
          // ListHeaderComponent={Header}
        />
      </View>
      <Dialog
        isVisible={isAddDialogVisible}
        onClose={toggleAddDialogModal}
        dialogWidth={dialogSize}
        scrollable={true}
      >
        {Platform.OS === "web" ? (
          <UpdateCarCard
            element={offerToDialog}
            updateElement={(element) => updateCars(element)}
          />
        ) : (
          <UpdateCarCardMobile
            element={offerToDialog}
            updateElement={(element) => updateCars(element)}
          />
        )}
      </Dialog>

      <Dialog
        isVisible={isConfirmationDialogVisible}
        onClose={() => setIsConfirmationDialogVisible(false)}
        dialogWidth={dialogSize}
        scrollable={false}
      >
        <ConfirmationDialog
          setIsConfirmationDialogVisible={setIsConfirmationDialogVisible}
          itemDeleteAction={itemDeleteAction}
          requestText="Вы уверены, что хотите удалить этот оффер?"
        />
      </Dialog>
    </>
  );
}
// Styles for the component
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
  },
  notificationIcon: {
    padding: 10,
  },
  infoBox: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
  infoText: {
    fontSize: 16,
    color: "#555",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  freeHeight: {
    flex: 1,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 20,
    margin: 5,
    elevation: 3,
  },
  listContent: {
    paddingBottom: 20, // Add some space at the bottom
  },
  cardContainer: {
    flex: 1,
    margin: 5, // Space between cards
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: "aliceblue",
  },
  box: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "oldlace",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    width: "auto",
    textAlign: "center",
  },
  selected: {
    backgroundColor: "coral",
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "coral",
  },
  selectedLabel: {
    color: "white",
  },
  label: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 24,
  },
});
