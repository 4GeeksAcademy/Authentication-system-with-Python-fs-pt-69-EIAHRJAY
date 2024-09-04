import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/single.css"

export const Single = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	return (
		<div className="jumbotron">
			<h1 className="display-4 welcome-text">Welcome to my page</h1>
			<div className="image-container">
				<img src="https://wallpaperaccess.com/full/2005096.jpg" alt="Decorative" />
			</div>
			<hr className="my-4" />

			{/* <Link to="/">
				<span className="btn btn-primary btn-lg" href="#" role="button">
					Back home
				</span>
			</Link> */}
		</div>
	);
};

// Single.propTypes = {
// 	match: PropTypes.object
// };
