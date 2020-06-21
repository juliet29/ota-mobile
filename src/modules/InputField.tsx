import { FieldProps, FieldAttributes, useField, ErrorMessage } from "formik";
import React from "react";
import { TextInput, HelperText } from "react-native-paper";

import * as yup from "yup";
import { View } from "react-native";

interface InputFieldProps {}

// export const InputField: React.FC<InputFieldProps> = ({}) => {
//         return ();
// }

export const InputField = ({ field, ...props }: FieldProps) => {
  return <TextInput {...field} {...props} />;
};

export const MyTextField: React.FC<FieldAttributes<{}> & any> = ({
  errName,
  label,
  ...props
}) => {
  const [field, meta] = useField(props);
  //   const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <View>
      <TextInput label={label} {...(field as any)} />
      <HelperText>
        <ErrorMessage {...(field as any)} />
      </HelperText>
    </View>
  );
};

export const validationSchema = yup.object({
  username: yup.string().required().min(5),
  email: yup.string().required().email(),
  password: yup.string().required().min(5),
});
