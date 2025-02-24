import React, { createContext, useState, useContext, useEffect, useMemo } from "react";
import axios from 'axios'; 
import Constants from "expo-constants"; 

interface DataContextType {
  cachedCards: any[];
  cachedLoans: any[];
  loadingCards: boolean;
  loadingLoans: boolean;
  updateCards: (element: any) => void;
  updateCardsResult: {success: boolean, error: string};
  deleteCard: (element: any) => void;
  updateLoans: (element: any) => void;
  updateLoansResult: {success: boolean, error: string},
  deleteLoan: (element: any) => void,
}
 

export enum OfferCollection {
  LOANS = 1,
  CARDS = 2,
}

export const offerCollections = ["loans", "cards"];


const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cachedCards, setCachedCards] = useState<any[]>([]);
  const [loadingCards, setLoadingCards] = useState<boolean>(false);

  const [cachedLoans, setCachedLoans] = useState<any[]>([]);
  const [loadingLoans, setLoadingLoans] = useState<boolean>(false);
  const [updateCardsResult, setUpdateCardsResult] = useState<{success: boolean, error: string}>({success: false, error: ''});
  const [updateLoansResult, setUpdateLoansResult] = useState<{success: boolean, error: string}>({success: false, error: ''});
  
  // const [apiUrl, setApiUrl] = useState<string>('');
  
  const apiUrl = useMemo(() => {
    console.log("DataProvider -> ", process.env.API_URL);  
    
    return Constants.manifest.extra.API_URL ?? Constants.manifest2.extra.API_URL
  }, [])

  const getCards = async () => {
    try {
      const response = await axios.get(`${apiUrl}/cards/admin`);
      setCachedCards(response.data ?? [])
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }; 
 
  const getLoans = async () => {
    try {
      const response = await axios.get(`${apiUrl}/loans/admin`);
      setCachedLoans(response.data)
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const updateCards = async (element: any) => {
    console.log(element);
    try {
      setLoadingCards(true);
      setUpdateCardsResult({success: false, error: ''})
      if (element.id != 0) {
        console.log(`Call.....................${apiUrl}/cards/${element.id}`);
        
        const response = await axios.patch(`${apiUrl}/cards/${element.id}`, element);
      } else {
        delete element.id
        const response = await axios.post(`${apiUrl}/cards`, element);
      }
      await getCards();
      setLoadingCards(false);
      setUpdateCardsResult({success: true, error: ''})
    } catch (error) {
      setLoadingCards(false);
      setUpdateCardsResult({success: false, error: `${error}`})
      console.error('Error update data:', error);
    }
  };

  const deleteCard = async (element: any) => {
    console.log(element);
    try {
      setLoadingCards(true);
      if (element.id == undefined || element.id == 0)
        return
      const response = await axios.delete(`${apiUrl}/cards/${element.id}`);      
      await getCards();
      setLoadingCards(false);      
    } catch (error) {
      setLoadingCards(false); 
      console.error('Error delete data:', error);
    }
  };

  
  const updateLoans = async (element: any) => {
    console.log(element);
    try {
      setLoadingLoans(true);
      setUpdateLoansResult({success: false, error: ''})
      if (element.id != 0) {
        const response = await axios.patch(`${apiUrl}/loans/${element.id}`, element);
      } else {
        delete element.id
        const response = await axios.post(`${apiUrl}/loans`, element);
      }
      await getLoans();
      setLoadingLoans(false);
      setUpdateLoansResult({success: true, error: ''})
    } catch (error) {
      setLoadingLoans(false);
      setUpdateLoansResult({success: false, error: `${error}`})
      console.error('Error update data:', error);
    }
  };

  const deleteLoan = async (element: any) => {
    console.log(element);
    try {
      setLoadingCards(true);
      if (element.id == undefined || element.id == 0)
        return
      const response = await axios.delete(`${apiUrl}/loans/admin/${element.id}`);      
      await getCards();
      setLoadingCards(false);      
    } catch (error) {
      setLoadingCards(false); 
      console.error('Error delete data:', error);
    }
  };

  useEffect(() => {
    getCards();
    getLoans();
  }, []); 
 
  return (
    <DataContext.Provider
      value={{
        cachedCards,
        cachedLoans,
        loadingCards,
        loadingLoans,
        updateCards,
        updateCardsResult,
        deleteCard,
        updateLoans,
        updateLoansResult,
        deleteLoan,
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
