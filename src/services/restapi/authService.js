import axios from "axios";

const API_URL = process.env.REACT_APP_API_KEY

class AuthService {
  login(email_id, password) {
    return axios
      .post(API_URL + "signin", { email_id, password })
      .then((response) => {
        return response.data;
      });
  }

  
  logoutUser(obj) {
    return axios.post(API_URL + "users/logout", obj).then((response) => {
     
      return response.data;
    });
  }

  logintrack(emailid) {
    return axios
      .post(API_URL + "users/login_track", {email_id:emailid})
      .then((response) => {
        return response.data;
      });
  }


  register(first_name, last_name, user_name, email_id, password) {
    return axios.post(API_URL + "signup", {
      first_name,
      last_name,
      user_name,
      email_id,
      password,
    }).then((response) => {

      return response.data;
    });;
  }


  addProfileImage(formData, userid) {
    return axios.post( API_URL + "utilities/userprofile_upload/" + userid, formData)

  }

  updateProfile(obj) {
    return axios.post(API_URL + "users/update_user",obj).then((response) => {
        return response.data;
    });
}

 userverification(obj) {
  return axios.post(API_URL + "users/verify_email",obj).then((response) => {
      return response.data;
  });
}

}

export default new AuthService();