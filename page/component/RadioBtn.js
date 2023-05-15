import { useState } from "react";
import { RadioButton } from "react-native-paper";
import { View, Text } from "react-native";

import { styles } from "../../assets/styles/add";

export default function Radio(props) {
  const [check, setCheck] = useState("");

  return (
    <View style={styles.add_container}>
      <Text style={styles.add_subtitle}>{props.title}</Text>
      <RadioButton.Group
        onValueChange={(val) => {
          setCheck(val);
          props.getCheck(val, props.name);
        }}
        value={props.value ? props.value : check}
        style={styles.yesorno}
      >
        <View style={styles.radio}>
          <View style={styles.radio_wrap}>
            <Text>{props.yes}</Text>
            <RadioButton value="Y" />
          </View>
          <View style={styles.radio_wrap}>
            <Text>{props.no}</Text>
            <RadioButton value="N" />
          </View>
        </View>
      </RadioButton.Group>
    </View>
  );
}
