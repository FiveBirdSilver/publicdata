import { View, Text, TextInput } from "react-native";
import { useState } from "react";

import { styles } from "../../assets/styles/add";

export default function Input(props) {
  const [text, setText] = useState("");
  return (
    <>
      <View style={styles.add_container}>
        <Text style={styles.add_subtitle}>{props.title}</Text>
        <View style={styles.input_wrapper}>
          <TextInput
            name={props.name}
            value={props.value ? `${props.value}` : text}
            placeholder={props.placeholder}
            onChangeText={(text) => {
              setText(text);
              props.getText(text, props.name);
            }}
            keyboardType={props.keyboardType}
            style={styles.input}
          ></TextInput>
        </View>
      </View>
    </>
  );
}
