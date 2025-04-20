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
  vin = "vin",
  year = "year",
  organization = "organization",
  summa_buy = "summa_buy", // bought
  summa_sell = "summa_sell", // price
  status = "status", // статус машины (bought-куплена, installment - в рассрочке, sold - выплачена)
  buy_price = "buy_price", // price in market
  buy_terms = "buy_terms", // terms
  payment_day = "payment_day",
  payment = "payment",
  first_payment = "first_payment",
  customer_name = "customer_name", // имя покупателя
  customer_phone = "customer_phone", // телефон покупателя
  customer_driver = "customer_driver",
  customer_address = "customer_address", // адрес покупателя
  customer_passport = "customer_passport", // паспорт покупателя,
  latestnumber = "latestnumber",

  summa_payment = "summa_payment", //
  comment_payment = "comment_payment", //
  park_comission = "park_comission", // комиссия парка 3,5
  park_rent = "park_rent",
  tax = "tax",
  color = "color",
  sign = "sign",
  tel = "tel",
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
  readOnly?: boolean;
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
  readOnly = false,
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
      case TextInputType.vin:
        keyboardType = "default";
        placeholder = "Введите VIN";
        label = "VIN";
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
      case TextInputType.payment:
        keyboardType = "numeric";
        placeholder = "Введите сумму выплаты";
        label = "Выплата";
        break;
      case TextInputType.first_payment:
        keyboardType = "numeric";
        placeholder = "Первоначальная взнос";
        label = "Первоначальная взнос";
        break;
      case TextInputType.customer_name:
        keyboardType = "default";
        placeholder = "Введите Покупателя";
        label = "Покупатель";
        break; // имя покупателя
      case TextInputType.customer_phone:
        keyboardType = "default";
        placeholder = "Введите Телефон Покупателя";
        label = "Телефон Покупателя";
        break; // телефон покупателя
      case TextInputType.customer_address:
        keyboardType = "default";
        placeholder = "Введите адрес Покупателя";
        label = "Адрес Покупателя";
        break; // адрес покупателя
      case TextInputType.customer_passport:
        keyboardType = "default";
        placeholder = "Введите паспорт Покупателя";
        label = "Паспорт Покупателя";
        break; // паспорт покупателя,
      case TextInputType.customer_driver:
        keyboardType = "default";
        placeholder = "Водитель";
        label = "Водитель";
        break;
      case TextInputType.latestnumber:
        keyboardType = "default";
        placeholder = "Введите госномер";
        label = "Госномер";
        break;
      case TextInputType.summa_payment:
        keyboardType = "numeric";
        placeholder = "Введите сумму платежа";
        label = "Сумма платежа";
        break; // bought
      case TextInputType.tax:
        keyboardType = "numeric";
        placeholder = "Налог";
        label = "Налог";
        break; // bought
      case TextInputType.park_comission:
        keyboardType = "numeric";
        placeholder = "Комиссия парка";
        label = "Комиссия парка";
        break; // bought
      case TextInputType.park_rent:
        keyboardType = "numeric";
        placeholder = "Аренда";
        label = "Аренда";
        break; // bought
      case TextInputType.comment_payment:
        placeholder = "Комментарий";
        label = "Комментарий";
        keyboardType = "default";
        break;
      case TextInputType.color:
        placeholder = "Цвет";
        label = "Цвет";
        keyboardType = "default";
        break;
      case TextInputType.sign:
        keyboardType = "default";
        placeholder = "Подпись";
        label = "Подпись";
        break;

      case TextInputType.tel:
        keyboardType = "default";
        placeholder = "Телефон";
        label = "Телефон";
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
          {value && value.length > 0 && labelState.length > 0
            ? labelState
            : "..."}
        </Text>
        <TextInput
          style={{ ...styles.input, ...styleUI?.input }}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholderState}
          secureTextEntry={secureTextEntryState}
          keyboardType={keyboardTypeState}
          autoCapitalize={autoCapitalizeState}
          placeholderTextColor={"gray"}
          readOnly={readOnly}
        />
      </View>
    </>
  );
};

export default LabeledTextInput;
