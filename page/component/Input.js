import { View, Text, TextInput } from "react-native";
import { useState } from "react";

import { styles } from "../../assets/styles/add";

export default function Input(props) {
  const [value, setValue] = useState("");
  return (
    <>
      <View style={styles.add_container}>
        <Text style={styles.add_subtitle}>{props.title}</Text>
        <View style={styles.input_wrapper}>
          <TextInput
            name={props.name}
            value={value}
            placeholder={props.placeholder}
            onChangeText={(text) => {
              setValue(text);
              props.getText(text, props.name);
            }}
            style={styles.input}
          ></TextInput>
        </View>
      </View>
    </>
  );
}
