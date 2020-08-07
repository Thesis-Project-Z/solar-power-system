import axios from "axios";

class AuthService {
  login(email, password) {
    console.log("hello");
    return axios
      .post("http://localhost:5000/user/login", {
        email,
        password,
      })
      .then((response) => {
        console.log("response: ", response);
        if (response.data) {
          localStorage.setItem("token", JSON.stringify(response.data));
        }

        return response.data;
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }
  logout() {
    localStorage.removeItem("token");
    window.location = "Home";
    // this.props.history.push("/");
  }
  register(name, email, password) {
    return axios.post("http://localhost:5000/user/register", {
      name,
      email,
      password,
    });
  }
}

export default new AuthService();
