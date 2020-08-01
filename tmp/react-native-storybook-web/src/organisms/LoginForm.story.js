// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import LoginForm from "./LoginForm";
import { text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("Organisms", module)
  .addDecorator(withKnobs)
  .add("LoginForm", () => (
    <LoginForm
      username={text("Username", "Foo")}
      password={text("Password", "bar")}
      onChangeUserName={action("onChangeUserName")}
      onChangePassword={action("onChangePassword")}
      onSubmit={action("onSubmit")}
    />
  ));
