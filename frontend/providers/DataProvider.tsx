import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import axios, { AxiosError } from "axios";
import Constants from "expo-constants";
import { CarElement } from "@/components/CarRowCard";
import { AuthContext, useAuth } from "@/providers/AuthContext";
import { Picker } from "@react-native-picker/picker";

interface DataContextType {
  cachedCars: any[];
  loadingCars: boolean;
  updateCars: (element: CarElement) => void;
  updateCarsResult: { success: boolean; error: string };
  deleteCar: (element: any) => void;
  addPayment: (element: any) => Promise<boolean>;
  // signin: (email: string, password: string) => Promise<{success: boolean, error?: string, token?: string}>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cachedCars, setCachedCars] = useState<any[]>([]);
  const [loadingCars, setLoadingCars] = useState<boolean>(false);
  const [headers, setHeaders] = useState<any>(null);
  const [updateCarsResult, setUpdateCarsResult] = useState<{
    success: boolean;
    error: string;
  }>({ success: false, error: "" });
  const auth = useAuth();

  useEffect(() => {
    console.log("auth.token: ", auth.token);
    setHeaders({
      Authorization: `Bearer ${auth.token}`,
    });
  }, [auth.token]);

  useEffect(() => {
    getCars();
  }, [headers]);

  const apiUrl = useMemo(() => {
    console.log("DataProvider -> ", process.env.API_URL);

    return (
      Constants.manifest.extra.API_URL ?? Constants.manifest2.extra.API_URL
    );
  }, []);

  const nexpPaymentDate = (element: any) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    let nextPaymentDate = new Date(
      currentYear,
      currentMonth,
      element.payment_day
    );

    // If today is past the payment day, move to next month
    if (today.getDate() > element.payment_day) {
      nextPaymentDate = new Date(
        currentYear,
        currentMonth + 1,
        element.payment_day
      );
    }

    return nextPaymentDate;
  };

  const getCars = async () => {
    try {
      console.log("Get cards....");
      const response = await axios.get(`${apiUrl}/cars`, {
        headers: headers,
      });
      console.log("Get cards....2:", response);

      const data = response.data ?? [];

      data.forEach((item: any) => {
        try {
          item.nexpPaymentDate = nexpPaymentDate(item);
        } catch (error) {
          console.log(error);
        }

        try {
          if (item.numbers) {
            if (item.numbers.length != 0) {
              item.latestNumber =
                item.numbers[item.numbers.length - 1]?.gov_number;
            }
          }
        } catch (error) {
          console.log(error);
        }
      });
      data.sort((a: any, b: any) => {
        const dateA = new Date(a.nexpPaymentDate);
        const dateB = new Date(b.nexpPaymentDate);

        return dateA.getTime() - dateB.getTime();
      });

      setCachedCars(data);
      console.log(data);
    } catch (error: any) {
      console.error("Error fetching data:", error);

      if (error.response?.status == 401) {
        auth.logout();
      }
    }
  };

  const updateCars = async (element: any) => {
    console.log(element);
    try {
      setLoadingCars(true);
      setUpdateCarsResult({ success: false, error: "" });
      if (element.id != 0) {
        console.log(`Call.....................${apiUrl}/cars/${element.id}`);

        const response = await axios.patch(
          `${apiUrl}/cars/${element.id}`,
          element,
          {
            headers: headers,
          }
        );
      } else {
        delete element.id;
        const response = await axios.post(`${apiUrl}/cars`, element, {
          headers: headers,
        });
      }
      await getCars();
      setLoadingCars(false);
      setUpdateCarsResult({ success: true, error: "" });
    } catch (error: any) {
      setLoadingCars(false);
      setUpdateCarsResult({ success: false, error: `${error}` });
      console.error("Error update data:", error);

      console.error("Error fetching data:", error);

      if (error.response?.status == 401) {
        auth.logout();
      }
    }
  };

  const deleteCar = async (element: any) => {
    console.log(element);
    try {
      setLoadingCars(true);
      if (element.id == undefined || element.id == 0) return;
      const response = await axios.delete(`${apiUrl}/cars/${element.id}`, {
        headers: headers,
      });
      await getCars();
      setLoadingCars(false);
    } catch (error: any) {
      setLoadingCars(false);
      console.error("Error delete data:", error);
      if (error.response?.status == 401) {
        auth.logout();
      }      
    }
  };

  const addPayment = async (element: any): Promise<boolean> => {
    console.log("savePayment......2 -> ", element);
    try {
      setLoadingCars(true);
      const response = await axios.post(`${apiUrl}/payments`, element, {
        headers: headers,
      });
      await getCars();
      console.log("savePayment......3");
      setLoadingCars(false);
      return true;
    } catch (error: any) {
      setLoadingCars(false);
      console.error("Error delete data:", error);
      if (error.response?.status == 401) {
        auth.logout();
      }
      return false;
    }
  };

  useEffect(() => {
    getCars();
  }, []);

  return (
    <DataContext.Provider
      value={{
        cachedCars,
        loadingCars,
        updateCars,
        updateCarsResult,
        deleteCar,
        addPayment,
        // signin
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Хук для доступа к данным
export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext должен использоваться внутри DataProvider");
  }
  return context;
};
