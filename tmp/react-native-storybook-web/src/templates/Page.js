// @flow
import React from "react";
import { View, StyleSheet } from "react-native";
import { Header } from "react-native-elements";

const styles = StyleSheet.create({
  container: { flex: 1 }
});

const Page = ({ children }) => (
  <View style={styles.container}>
    <Header
      leftComponent={{ icon: "menu", color: "#fff" }}
      centerComponent={{ text: "React Native Book", style: { color: "#fff" } }}
      rightComponent={{ icon: "home", color: "#fff" }}
    />
    {children}
  </View>
);

export default Page;
