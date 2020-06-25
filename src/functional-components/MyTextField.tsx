import {
  ErrorMessage,
  FieldAttributes,
  useField,
  FieldProps,
  useFormikContext,
  Field,
} from "formik";
import React from "react";
import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import { Wrapper } from "../styled-components/ReusedUI";

export const MyTextField: React.FC<FieldAttributes<{}> & any> = (props) => {
  return (
    <View>
      <TextInput label={`${props.fieldName}`} />
      {/* <HelperText>
        <ErrorMessage name={`${props.fieldName}`} />
      </HelperText> */}
    </View>
  );
};
