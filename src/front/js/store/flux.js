const apiUrl = process.env.BACKEND_URL + "/api";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,

			token: null,
			user_id: null,

			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch( apiUrl +  "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},


			signupUsuario: async (data) => {
				const response = await fetch( `${apiUrl}/signup`, {
				  method: "POST",
				  headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				  },
				  
					body: JSON.stringify(data),

				});
				
				const responseData = await response.json();
				if (response.ok) {
				  alert("User created successfully");
				} else {
				  alert("An error occurred while created the user");
				}
			  },

			
			login: async (info) => {
				console.log("Login function called");
				const resp = await fetch(apiUrl + "/login", {
					method: "POST",
					body: JSON.stringify(info),
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*",
					},
				});
				console.log("API response status:", resp.status);
				if (!resp.ok) {
					console.error("Login failed:", await resp.text());
					setStore({ token: null });
					return false;
				}
				let data = await resp.json();
				console.log("Login successful, data received:", data);
				setStore({ token: data.token, user_id: data.user_id });
				localStorage.setItem("token", data.token);
				localStorage.setItem("user_id", data.user_id);
				return true;
			},

			  logout: async () => {
				let { token } = getStore();
				let resp = await fetch(apiUrl + "/logout", {
					method: "POST",
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Authorization": "Bearer " + token
					},
				});
					setStore({ token: null, user_id: null });
					localStorage.removeItem("token");
					localStorage.removeItem("user_id");
				// if (!resp.ok) return false;
				// setStore({ token: null, userInfo: null });
				// localStorage.removeItem("token");
				// localStorage.removeItem("user_id");
				// localStorage.removeItem("booleano");
				return true;
			  },

			  loadSession: async () => {
                try {
                    let storageToken = localStorage.getItem("token");
                    let storageUser = localStorage.getItem("user_id");
					console.log("Loaded session - Token:", storageToken, "User ID:", storageUser);


                    if (!storageToken) return;
                    setStore({ token: storageToken });

                    if (storageUser) {
                        setStore({ user_id: storageUser });
                    }

                    // Opcional: Puedes hacer una petición para validar el token
                    // y obtener información adicional del usuario si es necesario
                } catch (error) {
                    console.error("Error loading session:", error);
                    setStore({ token: null });
                    localStorage.clear();
                }
            },
		}
	};
};

export default getState;
