import {
  ErrorMessage,
  FieldAttributes,
  useField,
  FieldProps,
  useFormikContext,
} from "formik";
import React from "react";
import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

export const MyTextField: React.FC<FieldAttributes<{}> & any> = ({
  label,
  component: Field,
  ...props
}) => {
  const [field] = useField(props);
  const { handleChange, handleBlur, setFieldTouched } = useFormikContext();

  const fieldName = field.name;
  return (
    <View>
      <Field
        label={label}
        {...(field as any)}
        onChange={handleChange(fieldName)}
        onBlur={handleBlur(fieldName)}
        onTouch={() => setFieldTouched(fieldName)}
      />
      <HelperText>
        <ErrorMessage {...(field as any)} />
      </HelperText>
    </View>
  );
};

// MyTextField.propTypes = {
//   label: string.isRequired,
//   component: oneOfType([node, elementType])
// };

MyTextField.defaultProps = {
  component: TextInput,
};
