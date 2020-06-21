import { ErrorMessage, FieldAttributes, useField } from "formik";
import React from "react";
import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

export const MyTextField: React.FC<FieldAttributes<{}> & any> = ({
  errName,
  label,
  ...props
}) => {
  const [field] = useField(props);
  return (
    <View>
      <TextInput label={label} {...(field as any)} />
      <HelperText>
        <ErrorMessage {...(field as any)} />
      </HelperText>
    </View>
  );
};
