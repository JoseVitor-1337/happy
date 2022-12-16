import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width,
    height,
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255,255,255, 1)",
    borderRadius: 16,
    justifyContent: "center",
  },

  calloutText: {
    color: "#0089A5",
    fontSize: 14,
    fontFamily: "NunitoBold",
  },

  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: "#FFF",
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    elevation: 3,
  },

  footerText: {
    color: "#8FA7B3",
    fontFamily: "NunitoBold",
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: "#15c3D6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
