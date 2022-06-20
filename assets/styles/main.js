import { StyleSheet } from "react-native";
import { color } from "./color";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  login: {
    flex: 9,
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  login_title: {
    fontSize: 28,
    fontWeight: "bold",
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
  location_btn: {
    margin: 3,
    width: "50%",
    height: 40,
    backgroundColor: color.gray,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  location_btn_title: {
    fontSize: 18,
    fontWeight: "bold",
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
    marginTop: 10,
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
});
