import { Component } from "react";
import adminService from "../services/admin";
 
class Logout extends Component {
  componentDidMount() {
    adminService.logout();
    window.location = "/";
  }
 
  render() {
    return null;
  }
}
 
export default Logout;