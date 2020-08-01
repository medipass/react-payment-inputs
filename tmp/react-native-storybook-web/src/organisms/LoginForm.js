import React from "react";
import { View, StyleSheet } from "react-native";
import { FormLabel, FormInput, Button, Card } from "react-native-elements";

const styles = StyleSheet.create({
  container: { paddingBottom: 10 }
});

const LoginForm = ({
  username,
  password,
  onChangeName,
  onChangePassword,
  onSubmit
}) => (
  <Card>
    <View style={styles.container}>
      <FormLabel>Username</FormLabel>
      <FormInput value={username} onChangeText={onChangeName} />
      <FormLabel>Password</FormLabel>
      <FormInput
        value={password}
        type="password"
        onChangeText={onChangePassword}
        secureTextEntry
      />
    </View>
    <Button
      onPress={onSubmit}
      icon={{ name: "code" }}
      backgroundColor="#03A9F4"
      buttonStyle={{
        borderRadius: 0,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0
      }}
      title="Login"
    />
  </Card>
);

export default LoginForm;
