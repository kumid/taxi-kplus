

import AntDesign from "@expo/vector-icons/AntDesign";

import { useDataContext } from "@/providers/DataProvider";
import React, { useEffect, useMemo, useState } from "react";
import CarCard from "@/components/CarCard";
import Dialog from "@/components/DialogComponent ";
import UpdateCarCard from "@/components/UpdateCar";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import UpdateCarCardMobile from "@/components/UpdateCarMobile";
import { Dimensions, Platform, Alert, View, TouchableOpacity, FlatList, Text, StyleSheet} from "react-native";

const sampleCard: any = {
  element: {
    id: 0,
    name: "",
    rate: 5,
    offer_short: "",
    offer_short_sum: "",
    grace_period: "",
    service: "",
    opening_card: "",
    cashback: "",
    release_date: "",
    credits: "",
    additionally: "",
    registration: "",
    term: "",
    approval: "",
    views: 1000,
    advantage: "",
    loan_sum: "",
    age: "",
    docs: "",
    schedule: "",
    license: "",
    offer_detail: "",
    image: "",
    active: true,
    site: "",
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

    // const decrypted = await decryptStringWithIV(element.site);
    // router.push({
    //   pathname: "/webview",
    //   params: {
    //     site: decrypted,
    //     name: element.name
    //   }
    // })
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
    console.log(cachedCars, "cachedCars.......................");

    const lst = cachedCars?.filter((card) => card.lang === selectedLang);
    setFilteredCards(lst);
  }, [cachedCars, selectedLang]);

  const toggleAddDialogModal = (): void => {
    setOfferToDialog({
      ...sampleCard,
      id: 0,
      lang: selectedLang,
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

  return (
    <>
      <View style={{ flex: 1, padding: 15 }}>
        <View style={styles.header}>
          <View>
            <Text style={styles.welcome}>Карты</Text>
          </View>
          <TouchableOpacity
            style={styles.notificationIcon}
            onPress={toggleAddDialogModal}
          >
            <AntDesign name="pluscircle" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoBox}>
          <View style={styles.row}>
            {["ru", "en", "es", "vi"].map((value) => (
              <TouchableOpacity
                key={value}
                onPress={() => setSelectedLang(value)}
                style={[
                  styles.button,
                  selectedLang === value && styles.selected,
                ]}
              >
                <Text
                  style={[
                    styles.buttonLabel,
                    selectedLang === value && styles.selectedLabel,
                  ]}
                >
                  {value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <FlatList
          style={styles.freeHeight}
          contentContainerStyle={styles.listContent}
          data={filteredCards}
          keyExtractor={(item) => item.id}
          numColumns={columnCount} // Display 4 cards per row
          renderItem={({ item }) => (
            <View style={{ width: cardWidth }}>
              <CarCard
                element={item}
                elementEdit={() => handleItemPress({ ...item })}
                elementCopy={() => handleItemPress({ ...item }, true)}
                elementDelete={() => handleItemDeletePress(item)}
              />
            </View>
          )}
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
