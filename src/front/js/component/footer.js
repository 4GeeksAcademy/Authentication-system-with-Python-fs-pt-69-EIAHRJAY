import React, { Component } from "react";

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center"style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: '#f8f9fa',
        color: '#6c757d',
        textAlign: 'center',
        padding: '10px',
        marginTop: 'auto',
        boxShadow: '0 -1px 5px rgba(0,0,0,0.1)' 
    }}>
		<p>
			© 2024 Thanks for visiting. Come back soon!
		</p>
	</footer>
);
