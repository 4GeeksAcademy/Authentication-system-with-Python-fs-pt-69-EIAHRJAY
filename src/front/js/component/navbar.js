import React, {useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { SiParrotsecurity } from "react-icons/si";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	console.log("Token in Navbar:", store.token);
	
	const handlelogout = async (e) => {
		e.preventDefault();

		const response = await actions.logout();

		if(response){
			navigate('/')
		}
	}
	
	
	
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<h1 className="mylogo"><SiParrotsecurity /></h1>
				</Link>
				<div className="ml-auto">
					{store.token ? (  // Verifica si el usuario está autenticado
						<button onClick={handlelogout} className="btn mybutton">Logout</button>
					) : (
						<Link to="/">
							<button className="btn mybutton">Login</button>
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
};
