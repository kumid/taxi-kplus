import React, { createContext, useState, useContext, useEffect, useMemo } from "react";
import axios from 'axios'; 
import Constants from "expo-constants"; 
import { CarElement } from "@/components/CarRowCard";

interface DataContextType {
  cachedCars: any[]; 
  loadingCars: boolean; 
  updateCars: (element: CarElement) => void;
  updateCarsResult: {success: boolean, error: string};
  deleteCar: (element: any) => void;  
}
  
 


const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cachedCars, setCachedCars] = useState<any[]>([]);
  const [loadingCars, setLoadingCars] = useState<boolean>(false);;
  const [updateCarsResult, setUpdateCarsResult] = useState<{success: boolean, error: string}>({success: false, error: ''});
 
  
  const apiUrl = useMemo(() => {
    console.log("DataProvider -> ", process.env.API_URL);  
    
    return Constants.manifest.extra.API_URL ?? Constants.manifest2.extra.API_URL
  }, [])

  const getCars = async () => {
    try {
      const response = await axios.get(`${apiUrl}/cars`);
      setCachedCars(response.data ?? [])
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }; 
  

  const updateCars = async (element: any) => {
    console.log(element);
    try {
      setLoadingCars(true);
      setUpdateCarsResult({success: false, error: ''})
      if (element.id != 0) {
        console.log(`Call.....................${apiUrl}/cars/${element.id}`);
        
        const response = await axios.patch(`${apiUrl}/cars/${element.id}`, element);
      } else {
        delete element.id
        const response = await axios.post(`${apiUrl}/cars`, element);
      }
      await getCars();
      setLoadingCars(false);
      setUpdateCarsResult({success: true, error: ''})
    } catch (error) {
      setLoadingCars(false);
      setUpdateCarsResult({success: false, error: `${error}`})
      console.error('Error update data:', error);
    }
  };

  const deleteCar = async (element: any) => {
    console.log(element);
    try {
      setLoadingCars(true);
      if (element.id == undefined || element.id == 0)
        return
      const response = await axios.delete(`${apiUrl}/cars/${element.id}`);      
      await getCars();
      setLoadingCars(false);      
    } catch (error) {
      setLoadingCars(false); 
      console.error('Error delete data:', error);
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
