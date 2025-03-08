import { useEffect, useState } from "react";
import {
  TextInput,
  Text,
  Platform,
  TextStyle,
  KeyboardTypeOptions,
  View,
} from "react-native";

const styles =
  Platform.OS === "android"
    ? require("../styles/styles.android").default
    : require("../styles/styles.android").default;

export enum TextInputType {
  email = "email-address",
  numeric = "numeric",
  phone = "phone-pad",
  default = "default",
  password = "password",
  confirmPassword = "confirmPassword",

  model = "model",
  ctc = "ctc",
  year = "year",
  organization = "organization",
  summa_buy = "summa_buy", // bought
  summa_sell = "summa_sell", // price
  status = "status", // статус машины (bought-куплена, installment - в рассрочке, sold - выплачена)
  buy_price = "buy_price", // price in market
  buy_terms = "buy_terms", // terms
  payment_day = "payment_day",
  customerName = "customerName", // имя покупателя
  customerPhone = "customerPhone", // телефон покупателя
  customerAddress = "customerAddress", // адрес покупателя
  customerPassport = "customerPassport", // паспорт покупателя,
  latestNumber = "latestNumber",
}

interface LabeledTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  inputType?: TextInputType;
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  styleUI?: { label?: TextStyle; input?: TextStyle };
}
const LabeledTextInput: React.FC<LabeledTextInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder = "",
  inputType = TextInputType.default,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  styleUI,
}) => {
  const [placeholderState, setPlaceholderState] = useState<any>(null);
  const [labelState, setLabelState] = useState<string>("");
  const [secureTextEntryState, setSecureTextEntryState] =
    useState<boolean>(false);
  const [keyboardTypeState, setKeyboardTypeState] =
    useState<KeyboardTypeOptions>("default");
  const [autoCapitalizeState, setAutoCapitalizeState] = useState<
    "none" | "sentences" | "words" | "characters" | undefined
  >("none");

  useEffect(() => {
    switch (inputType) {
      case TextInputType.email:
        keyboardType = "email-address";
        placeholder = "Введите почту";
        autoCapitalize = "none";
        label = "Email";
        break;
      case TextInputType.numeric:
        keyboardType = "numeric";
        break;
      case TextInputType.password:
        keyboardType = "default";
        placeholder = "Введите пароль";
        label = "Пароль";
        secureTextEntry = true;
        break;
      case TextInputType.confirmPassword:
        keyboardType = "default";
        placeholder = "Подтвердить пароль";
        secureTextEntry = true;
        break;
      case TextInputType.phone:
        keyboardType = "phone-pad";
        break;

      case TextInputType.model:
        keyboardType = "default";
        placeholder = "Введите Модель";
        label = "Модель";
        break;

      case TextInputType.ctc:
        keyboardType = "default";
        placeholder = "Введите СТС";
        label = "СТС";
        break;
      case TextInputType.year:
        keyboardType = "numeric";
        placeholder = "Введите год выпуска";
        label = "Год выпуска";
        break;
      case TextInputType.organization:
        keyboardType = "default";
        placeholder = "Введите организацию";
        label = "Организация";
        break;
      case TextInputType.summa_buy:
        keyboardType = "numeric";
        placeholder = "Введите сумму покупки";
        label = "Сумма покупки";
        break; // bought
      case TextInputType.summa_sell:
        keyboardType = "numeric";
        placeholder = "Введите сумму продажи";
        label = "Сумму продажи";
        break; // price
      case TextInputType.status:
        keyboardType = "default";
        placeholder = "Введите статус";
        label = "Статус";
        break; // статус машины (bought-куплена, installment - в рассрочке, sold - выплачена)
      case TextInputType.buy_price:
        keyboardType = "numeric";
        placeholder = "Введите стоимость на рынке";
        label = "Стоимость на рынке";
        break; // price in market
      case TextInputType.buy_terms:
        keyboardType = "numeric";
        placeholder = "Введите срок в месяцах";
        label = "Срок в месяцах";
        break; // terms
      case TextInputType.payment_day:
        keyboardType = "numeric";
        placeholder = "Введите день выплаты";
        label = "День выплаты";
        break;
      case TextInputType.customerName:
        keyboardType = "default";
        placeholder = "Введите Покупателя";
        label = "Покупатель";
        break; // имя покупателя
      case TextInputType.customerPhone:
        keyboardType = "default";
        placeholder = "Введите Телефон Покупателя";
        label = "Телефон Покупателя";
        break; // телефон покупателя
      case TextInputType.customerAddress:
        keyboardType = "default";
        placeholder = "Введите адрес Покупателя";
        label = "Адрес Покупателя";
        break; // адрес покупателя
      case TextInputType.customerPassport:
        keyboardType = "default";
        placeholder = "Введите паспорт Покупателя";
        label = "Паспорт Покупателя";
        break; // паспорт покупателя,
      case TextInputType.latestNumber:
        keyboardType = "default";
        placeholder = "Введите госномер";
        label = "Госномер";
        break;

      default:
        keyboardType = "default";
        break;
    }
    setKeyboardTypeState(keyboardType);
    setPlaceholderState(placeholder);
    setAutoCapitalizeState(autoCapitalize);
    setLabelState(label ?? "");
    setSecureTextEntryState(secureTextEntry);
  }, []);

  return (
    <>
      <View>
        <Text
          style={{
            marginLeft: 12,
            marginBottom: 4,
            fontSize: 14,
            fontWeight: "500",
            color: "dark-gray",
            ...styleUI?.label,
          }}
        >
          {value && value.length > 0 && labelState.length > 0 ? labelState : "..."}
        </Text>
        <TextInput
          style={{ ...styles.input, ...styleUI?.input }}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholderState}
          secureTextEntry={secureTextEntryState}
          keyboardType={keyboardTypeState}
          autoCapitalize={autoCapitalizeState}
        />
      </View>
    </>
  );
};

export default LabeledTextInput;
