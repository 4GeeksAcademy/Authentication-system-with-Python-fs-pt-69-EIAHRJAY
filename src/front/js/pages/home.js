import React, { useState } from "react";
import { Mysinguplogin } from "../component/Mysignuplogin";
import { Login } from "../component/Login";
import "../../styles/home.css"

export const Home = () => {
	    const [activeTab, setActiveTab] = useState("Singup");

		const handleTabClick = (tab) => {
			setActiveTab(tab);
			if (tab === "Login") {
				window.history.pushState({}, "", "/api/Login");
			} else {
				window.history.pushState({}, "", "/api/Singup");
			}
		};
	
	
	return (
		        <div className="login-container">
					<div className="myclass">
						<div className="login-tabs ">
							<div
								className={`login-tab ${activeTab === "Singup" ? "active" : ""}`}
								onClick={() => handleTabClick("Singup")}
							>
								Singup
							</div>
							<div
								className={`login-tab ${activeTab === "Login" ? "active" : ""}`}
								onClick={() => handleTabClick("Login")}
							>
								Login
							</div>
						</div>
			
						<div className="login-form">
							{activeTab === "Singup" ? (
									<Mysinguplogin/>
								) : (
										<Login/>
									)}
								</div>
					</div>	
				</div>
	 );
}; 


