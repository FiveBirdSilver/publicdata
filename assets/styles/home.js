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
  header: {
    // flex: 1,
    width: "100%",
    justifyContent: "center",
    marginBottom: 10,
    padding: 16,
  },

  title: {
    textAlign: "left",
    fontSize: 24,
    fontWeight: "bold",
  },

  subtitle: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 16,
    color: color.darkgray,
  },
  userinfo: {
    flex: 0.7,
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: color.blue,
    padding: 16,
  },
  userimg: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "white",
    height: 45,
    width: 45,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginRight: 20,
  },
  userid: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
  },
  userloc: {
    color: "white",
    fontSize: 16,
  },
  today: {
    flex: 0.5,
    width: "100%",
    padding: 16,
  },
  today_title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  today_item: {
    flex: 4,
    width: "100%",
    paddingLeft: 16,
    flexDirection: "column",
  },
  today_item_title: {
    fontSize: 20,
  },
  item_text: {
    fontSize: 20,
    marginBottom: 5,
  },
  footer: {
    flex: 2,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  footer_container: {
    justifyContent: "center",
    alignItems: "center",
  },
  footer_title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  icon_wrap: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: color.blue,
    height: 45,
    width: 45,
    marginBottom: 5,
  },
});
