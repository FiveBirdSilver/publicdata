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
  header: {
    justifyContent: "flex-start",
    padding: 16,
  },
  logout: {
    paddingTop: 10,
    paddingRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  logout_title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: color.darkgray,
  },
  userinfo: {
    flex: 0.5,
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
    height: 60,
    width: 60,
    marginRight: 20,
  },
  userid: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
  },
  userloc: {
    color: "white",
    fontSize: 20,
  },
  today: {
    flex: 0.5,
    width: "100%",
    padding: 16,
  },
  today_title: {
    fontSize: 28,
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
    height: 35,
    width: 35,
    marginBottom: 5,
  },
});
