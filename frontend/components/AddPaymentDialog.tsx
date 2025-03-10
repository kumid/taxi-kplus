import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LabeledTextInput, { TextInputType } from './LabeledTextInput';
import { handleIntegerChange } from './handleIntegerChange';

import { useDataContext } from "@/providers/DataProvider";

export interface AddPaymentDialogProps {
  requestText: string;
  setIsDialogVisible: (isVisible: boolean) => void;
  car: any;
  setter: (num: string) => void;
} 

const AddPaymentDialog: React.FC<AddPaymentDialogProps> = ({ requestText, setIsDialogVisible, car, setter }) => {

  const [valueNumber, setValueNumber] = useState<string>("0");
  const [comment, setComment] = useState<string>(""); 
  const { addPayment } = useDataContext();
  
  const savePayment = useCallback(async() => {
    console.log("savePayment......", valueNumber, comment);
    
    const res = await addPayment({
      carId: car.id,
      sum: valueNumber,
      date: new Date().toISOString(),
      type: comment
    })
    if (res) setIsDialogVisible(false);
  }, [valueNumber, comment])

  return (
    <View style={styles.dialogOverlay}>
      <View style={styles.dialogContainer}>
        <Text style={styles.dialogText}>{requestText}</Text>
        <LabeledTextInput value={valueNumber} 
          onChangeText={(value) => {
            console.log("NUmber changed:", value);
                        
            handleIntegerChange(setValueNumber, value)
            }
          } 
          inputType={TextInputType.summa_payment}
          styleUI={
            { label: {}, input: {marginHorizontal: 0, marginBottom: 10}}
          }/>
        <LabeledTextInput value={comment} 
          onChangeText={setComment} 
          inputType={TextInputType.comment_payment}
          styleUI={
            { label: {marginTop: 4}, input: {marginHorizontal: 0}}
          }/>
          
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.cancelButton]} 
            onPress={() => setIsDialogVisible(false)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.okButton]} 
            onPress={savePayment}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Overlay for background dimming
  dialogOverlay: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent dark overlay
  },
  dialogContainer: {
    width: '80%',
    // backgroundColor: 'white',
    marginHorizontal: 50,
    borderRadius: 10,
    alignItems: 'center',
    // elevation: 5, // Shadow for Android
    // shadowColor: '#000', // Shadow for iOS
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.2,
    // shadowRadius: 6,
  },
  dialogText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', 
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '45%', // Button takes 45% of the width for spacing
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  okButton: {
    backgroundColor: '#FF6347', // Tomato color for the OK button
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AddPaymentDialog;
