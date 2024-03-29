import { StyleSheet } from "react-native";
import { color } from "./color";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
  },
  header_container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  area: {
    width: "100%",
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
  area_title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 10,
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
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
  area_btn_complete: {
    width: "45%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.gray,
    borderRadius: 5,
    marginBottom: 10,
  },
  area_btn_title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  area_btn_title_complete: {
    fontSize: 18,
    fontWeight: "bold",
    color: color.darkgray,
  },
  icon_wrap: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "orange",
    height: 45,
    width: 45,
    margin: 10,
  },
  footer_title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  completeAlert: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
    padding: 15,
  },

  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    // padding: 10,
  },
});
