import { StyleSheet } from "react-native";
import { color } from "./color";

export const styles = StyleSheet.create({
  scrollview: {
    width: "100%",
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  login: {
    flex: 9,
    width: "75%",
    justifyContent: "center",
    alignItems: "center",
  },
  login_title: {
    fontSize: 32,
    fontWeight: "bold",
    // fontFamily: "NanumBarunGothic",
    color: color.blue,
  },
  location: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },

  logo: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  userinfo: {
    width: "100%",
  },
  input: {
    backgroundColor: color.gray,
    color: color.blue,
    height: 40,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  input_focus: {
    backgroundColor: color.gray,
    color: color.blue,
    height: 40,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submit_btn: {
    width: "100%",
    height: 40,
    marginTop: 30,
    backgroundColor: color.blue,
    borderRadius: 5,
    justifyContent: "center",
    alignContent: "center",
  },

  submit_btn_title: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  checkbox: {
    width: "100%",
    justifyContent: "flex-start",
    paddingLeft: 5,
    // marginBottom: 10,
  },
  dropdown: {
    margin: 5,
    width: "100%",
    height: 40,
    backgroundColor: "transparent",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },
  placeholderStyle: {
    fontSize: 14,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
});
