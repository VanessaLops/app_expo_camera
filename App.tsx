import React from "react";
import { StatusBar } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import AppLoading from "expo-app-loading";
import Routes from "./src/routes";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, useAuth } from "./src/context/auth";
import { ThemeProvider } from "styled-components";
import theme from "./src/global/theme";
export default function App() {
  const { isLoadingUserData } = useAuth();

  if (isLoadingUserData) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
