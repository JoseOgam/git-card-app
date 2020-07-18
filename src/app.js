import React from "react";
import ReactDOM from "react-dom";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

const gitApi = [
  {
    avatar_url: "https://avatars3.githubusercontent.com/u/44178450?v=4",
    company: "Scholar",
    name: "JoseOgam",
  },
  {
    avatar_url: "https://avatars2.githubusercontent.com/u/140611?v=4",
    company: "facebook",
    name: "Rafael Villar Burke (Pachi)",
  },
  {
    avatar_url: "https://avatars2.githubusercontent.com/u/3344757?v=4",
    company: "Twitter",
    name: "oTTa",
  },
];

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="header">
          <h1 className="header-title">Github Card App</h1>
        </div>
        <div className="container">
          <Form />
          <CardList />
        </div>
      </div>
    );
  }
}
const CardList = () => {
  return (
    <div>
      {gitApi.map((profile) => (
        <Card key={profile.name} {...profile} />
      ))}
    </div>
  );
};
class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div className="card">
        <img className="avatar" src={profile.avatar_url} />
        <p>Name:- {profile.name}</p>
        <p>company:- {profile.company}</p>
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
    // var userNameInput = React.createRef();
    var handleSubmit = (e) => {
      e.preventDefault();
      const resp = axios.get(
        `https://api.github.com/users/${his.state.userName}`
      );
      console.log(resp);
    };
    return (
      <div>
        <form onSubmit={handleSubmit} className="add-user">
          <input
            type="text"
            className="form-input"
            placeholder="Github Username"
            // ref={userNameInput}
            value={this.state.userName}
            onChange={(e) => this.setState({ userName: e.target.value })}
            required
          />
          <button>add user</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
