import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

// const gitApi = [
//   {
//     avatar_url: "https://avatars3.githubusercontent.com/u/44178450?v=4",
//     company: "Scholar",
//     name: "JoseOgam",
//   },
//   {
//     avatar_url: "https://avatars2.githubusercontent.com/u/140611?v=4",
//     company: "facebook",
//     name: "Rafael Villar Burke (Pachi)",
//   },
//   {
//     avatar_url: "https://avatars2.githubusercontent.com/u/3344757?v=4",
//     company: "Twitter",
//     name: "oTTa",
//   },
// ];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: [],
    };
  }

  render() {
    var addProfile = (profileData) => {
      this.setState((prevState) => ({
        profiles: [...prevState.profiles, profileData],
      }));
    };
    return (
      <div>
        <h1 className="header">Github Card Title</h1>
        <div className="container">
          <Form onSubmit={addProfile} />
          <CardList profiles={this.state.profiles} />
        </div>
      </div>
    );
  }
}
const CardList = (props) => {
  return (
    <div>
      {props.profiles.map((profile) => (
        <Card key={profile.id} {...profile} />
      ))}
    </div>
  );
};

class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div>
        <img className="avatar" src={profile.avatar_url} alt="profile" />
        <p>{profile.name}</p>
        <p>{profile.company}</p>
      </div>
    );
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
    };
  }
  render() {
    // var inputUserName = React.createRef();
    var handleSubmit = async (e) => {
      e.preventDefault();
      const resp = await axios.get(
        `https://api.github.com/users/${this.state.userName}`
      );
      this.props.onSubmit(resp.data);
      this.setState({ userName: "" });
    };
    return (
      <div>
        <form>
          {
            <input
              placeholder="enter github username"
              required
              type="text"
              value={this.state.userName}
              onChange={(e) => this.setState({ userName: e.target.value })}
            />
          }
          <button onClick={handleSubmit}>add card</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
