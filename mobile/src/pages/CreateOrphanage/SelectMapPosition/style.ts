import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  mapStyle: {
    width,
    height,
  },

  nextButton: {
    backgroundColor: "#15c3d6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 56,

    position: "absolute",
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: "NunitoExtrabold",
    fontSize: 16,
    color: "#FFF",
  },
});

export default styles;
