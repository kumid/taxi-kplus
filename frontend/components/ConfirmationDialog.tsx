import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export interface ConfirmationDialogProps {
  requestText: string;
  setIsConfirmationDialogVisible: (isVisible: boolean) => void;
  itemDeleteAction: () => void;
} 

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ requestText, setIsConfirmationDialogVisible, itemDeleteAction }) => {
  return (
    <View style={styles.dialogOverlay}>
      <View style={styles.dialogContainer}>
        <Text style={styles.dialogText}>{requestText}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.cancelButton]} 
            onPress={() => setIsConfirmationDialogVisible(false)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.okButton]} 
            onPress={() => itemDeleteAction()}>
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
    // padding: 20,
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

export default ConfirmationDialog;
