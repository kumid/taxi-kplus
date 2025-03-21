import { View, Text, TouchableOpacity, Alert, Platform, StyleSheet} from 'react-native';
import { useRouter } from 'expo-router';
import { useContext, useEffect, useState,  } from 'react';  
import LabeledTextInput, { TextInputType } from '@/components/LabeledTextInput';
import { AuthContext } from '@/providers/AuthContext';
 

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useContext(AuthContext);
  const [error, setError] = useState("");
//   const { isLoading, setLoading } = useLoading();
//   const {user, signIn} = useAuth()
  const router = useRouter();
//   const { refreshRequest } = useDataContext()
//   useEffect(() => {
    // setLoading(true);
    // if (user) {
    //   const savedUser = SecureStore.get<AppUser>("USER");
    //   if (savedUser !== null) {
    //     setEmail(savedUser.email)
    //     getUser(savedUser.email).then((userFromFb) => {
    //       if (userFromFb) {
    //         router.push({
    //           pathname: '/(tabs)/activeTask',
    //           params: {
    //             user: userFromFb
    //           }
    //         });
    //       }
    //     })
    //   }
    // }
    // setLoading(false);
//   }, [user])

  const handleReg = () => {
    router.push({
      pathname: "/sign-up"
    })
  }

  const handleLogin = async () => {
    try {
      if (auth) {
        await auth.login(email, password);
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };


  return (
    <View style={styles.containerSignIn}>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <LabeledTextInput value={email} onChangeText={setEmail} inputType={TextInputType.email} />
      <LabeledTextInput value={password} onChangeText={setPassword} inputType={TextInputType.password} styleUI={{label: {marginTop: 20}}} />

      <TouchableOpacity style={styles.buttonSignIn} onPress={handleLogin}>
        <Text style={styles.buttonText}>Войти</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={{ alignSelf: "center", padding: 12 }} onPress={handleReg}>
        <Text style={{ fontSize: 18, color: "#007bff" }}>Регистрация</Text>
      </TouchableOpacity> */}
    </View>
  );
};
export default SignIn; 
// Styles for the component
const styles = StyleSheet.create({
    containerSignIn: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: 'white',
    },
    buttonSignIn: {
      backgroundColor: '#007bff',
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
    },
    error: {
      color: 'red',
      marginBottom: 10,
    },
  
});



