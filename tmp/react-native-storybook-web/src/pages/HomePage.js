// @flow
import React from "react";
import { LoginForm } from "../organisms";
import { Page } from "../templates";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleChangeName(event) {
    this.setState({ username: event });
  }
  handleChangePassword(event) {
    this.setState({ password: event });
  }

  render() {
    const { username, password } = this.state;
    return (
      <Page>
        <LoginForm
          username={username}
          password={password}
          onChangeName={this.handleChangeName}
          onChangePassword={this.handleChangePassword}
          onSubmit={() => {}}
        />
      </Page>
    );
  }
}
export default HomePage;
