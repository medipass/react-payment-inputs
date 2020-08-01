// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { View } from "react-native";
//import { Avatar } from "react-native-elements";
import { text, withKnobs, number, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

const options = {
  min: 0,
  max: 1,
  step: 0.1
};

storiesOf("Stories", module)
  .addDecorator(withKnobs)
  .add(
    "Input",
    () => (
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: "blue",
        }}
      />
    ),
  );
  //.add("Avatar", () => (
  //  <Avatar
  //    small={boolean("small", true)}
  //    medium={boolean("medium", false)}
  //    large={boolean("large", false)}
  //    rounded={boolean("rounded", true)}
  //    title={text("Initials", "MT")}
  //    onPress={action("onPress")}
  //    activeOpacity={number("activeOpacity", 0.7, options)}
  //  />
  //));
