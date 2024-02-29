import axios from 'axios'

const AuthService = {
  
    loginService: async (identity, password) => {
        const response = await axios.post("http://localhost:80/auth/login", {
            "identity": identity,
            "password": password
        })
        if(response.data.role){
            sessionStorage.setItem("user", JSON.stringify(response.data))
        }
        return response.data
    },
  
    logoutService() {
      sessionStorage.removeItem("user")
    },

    getCurrentUser: () => {
        return JSON.parse(sessionStorage.getItem("user"))
    }
  };
  
  export default AuthService;