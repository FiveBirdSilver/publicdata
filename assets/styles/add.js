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
  content: {
    flex: 9,
    width: "90%",
  },
  add: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: color.darkgray,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  add_title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  add_title_container: {
    width: "80%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  add_title_wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  add_container: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  add_wrapper: {
    width: "100%",
    padding: 16,
  },
  input_wrapper: {
    width: "50%",
    height: 40,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 10,
    marginLeft: 20,
  },
  input: {
    width: "100%",
    backgroundColor: color.gray,
    height: 40,
    paddingLeft: 10,
    borderRadius: 5,
  },
  add_subtitle: {
    fontSize: 16,
    alignItems: "center",
    justifyContent: "flex-start",
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
  img: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  img_container: {
    width: "50%",
    marginTop: 16,
    justifyContent: "center",
  },
  img_container_title: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  imgchoose: {
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.gray,
    margin: 5,
  },
  season: {
    flexDirection: "row",
    alignContent: "center",
    height: 30,
    marginTop: 16,
  },
  season_title: {
    fontSize: 18,
    marginRight: 20,
  },
  season_ps: {
    marginBottom: 10,
    fontSize: 12,
    color: "orange",
  },
  season_container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  radio: {
    flexDirection: "row",
    width: "50%",
  },
  radio_wrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  scrollview: {
    width: "100%",
  },
});
