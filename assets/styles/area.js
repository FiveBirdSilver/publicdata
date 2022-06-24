import { StyleSheet } from "react-native";
import { color } from "./color";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  area: {
    // flex: 0.7,
    width: "100%",
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
  area_title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  scrollview: {
    width: "100%",
  },
  area_container: {
    // flex: 5,
    width: "100%",
    padding: 16,
  },
  sub_title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  area_wrapper: {
    width: "100%",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  area_btn: {
    width: "45%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: color.darkgray,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  area_btn_title: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
