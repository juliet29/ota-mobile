import * as React from "react";
// import { Picker } from "@react-native-community/picker";
import { Picker } from "react-native";
import { NumberSchema } from "yup";

interface LengthPickerProps {
  // using `interface` is also ok
  days: number;
  setDays: React.Dispatch<React.SetStateAction<number>>;
}

export class LengthPicker extends React.PureComponent<LengthPickerProps> {
  //   state = {
  //     language: "java",
  //   };
  render() {
    return (
      <Picker
        selectedValue={this.props.days}
        style={{ height: 20, width: 80, marginTop: -20 }}
        onValueChange={(itemValue, itemIndex) => {
          this.props.setDays(+itemValue);
        }}>
        <Picker.Item label="1 day" value={1} />
        <Picker.Item label="2 days" value={2} />
        <Picker.Item label="3 days" value={3} />
      </Picker>
    );
  }
}
