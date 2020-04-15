
import React from "react";
import { Auth } from "aws-amplify";
import axios from "axios";
import config from "../config";

class Register extends React.Component {
  state = {
    username: "",
    name: "",
    password: "",
    confirmpassword: "",
    email: "",
    errors: {
      cognito: null,
    },
  };
  handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    this.setState({ [key]: value });
  };

// import React from "react";
// import { Auth } from "aws-amplify";
// import axios from "axios";
// import config from "../config.json";

// class Register extends React.Component {
//   state = {
//     username: "",
//     name: "",
//     password: "",
//     confirmpassword: "",
//     email: "",
//     errors: {
//       cognito: null,
//       blankfield: false,
//       passwordMatch: false,
//     },
//   };
//   handleChange = (event) => {
//     const key = event.target.name;
//     const value = event.target.value;
//     this.setState({ [key]: value });
//   };


//   addUser = async (username, email, password, name) => {
//     const id = Math.floor(Math.random() * 10000000000).toString();
//     try {
//       const params = {
//         id: id,
//         name: name,
//         username: username,
//         email: email,
//         password: password,
//       };
//       await axios.post(`${config.api.invokeURL}/users`, params);
//     } catch (err) {
//       //ERROR HANDLING HERE
//     }
//   };


  addUser = async (username, email, password, name) => {
    const id = Math.floor(Math.random() * 10000000000).toString();
    try {
      const params = {
        id: id,
        name: name,
        username: username,
        email: email,
        password: password,
      };
      await axios.post(`${config.api.invokeURL}/users`, params);
      console.log(
        "Thanks for registering, check your email for verification link"
      );
    } catch (err) {
      //ERROR HANDLING HERE
      console.log(err);
      console.log(`Unable to create user ${err}`);
    }
  };
  addProfile = async (username) => {
    const profile_id = Math.floor(Math.random() * 10000).toString();

    try {
      const params = {
        profile_id: profile_id,
        username: username,
      };
      await axios.post(`${config.api.invokeURL}/profile/`, params);
    } catch (err) {
      //ERROR HANLDER
      console.dir(err);
      console.log(err);
      console.log(`Unable to create profile ${err}`);
    }
  };


//   handleSubmit = async (event) => {
//     event.preventDefault();
//     const { username, email, password, name } = this.state;

//     try {
//       const signUpResponse = await Auth.signUp({
//         username,
//         password,
//         name,
//         attributes: {
//           email: email,
//         },
//       }).then((data) => {
//         this.addUser(username, email, password, name);
//       });
//     } catch (error) {
//       let err = null;
//       !error.message ? (err = { message: error }) : (err = error);
//       this.setState({
//         error: {
//           ...this.state.errors,
//           cognito: err,
//         },
//       });
//     }
//   };

    try {
      await Auth.signUp({
        username,
        password,
        name,
        attributes: {
          email: email,
        },
      }).then(() => {
        this.addUser(username, email, password, name);
        this.addProfile(username);
      });
    } catch (error) {
      let err = null;
      console.dir(error);
      !error.message ? (err = { message: error }) : (err = error);
      this.setState({
        error: {
          ...this.state.errors,
          cognito: err,
        },
      });
    }
  };


//   render() {
//     return (
//       <div>
//         <form onSubmit={this.handleSubmit}>
//           <br />
//           <label>
//             Username:
//             <input
//               name="username"
//               required
//               value={this.state.username}
//               onChange={this.handleChange}
//             ></input>
//           </label>
//           <br />
//           <label>
//             Email:
//             <input
//               name="email"
//               required
//               value={this.state.email}
//               onChange={this.handleChange}
//             ></input>
//           </label>
//           <b />
//           <label>
//             Password:
//             <input
//               name="password"
//               required
//               value={this.state.password}
//               onChange={this.handleChange}
//             ></input>
//           </label>
//           <label>
//             Confirm Password:
//             <input
//               name="confirmpassword"
//               required
//               value={this.state.confirmpassword}
//               onChange={this.handleChange}
//             ></input>
//           </label>
//           <label>
//             Name:
//             <input
//               name="name"
//               required
//               value={this.state.name}
//               onChange={this.handleChange}
//             ></input>
//           </label>
//           <br />
//           <button type="submit">Create User</button>
//         </form>
//       </div>
//     );
//   }
// }
// export default Register;
