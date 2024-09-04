import React from "react";
import { useContext, useState } from "react"; 
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { BsLock } from "react-icons/bs";
import { BsEnvelope } from "react-icons/bs";

export const Mysinguplogin = () => {
    
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        is_active: false
    });



    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };
       
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const { email, password, is_active } = formData;

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const data = { email, password, is_active };
        const response = await actions.signupUsuario(data); // Añadido await para esperar la respuesta de la acción
        console.log(response);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="text2"><BsEnvelope/> Email</label>
                <input 
                    name="email" 
                    id="exampleInputEmail1" 
                    aria-describedby="emailHelp" 
                    type="email" 
                    className="form-control"  
                    value={formData.email} 
                    onChange={handleChange} 
                    required  
                />
            </div>
            <div className="mb-3">
                <label className="text2"><BsLock /> Password</label>
                <input 
                    name="password" 
                    id="exampleInputPassword1" 
                    type="password" 
                    className="form-control" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                />
            </div>

            <div className="mb-3">
                <label className="text2"><BsLock /> Confirm Password</label>
                <input 
                    name="confirmPassword"  
                    id="exampleInputPassword2" 
                    type="password" 
                    className="form-control" 
                    value={confirmPassword} 
                    onChange={handleConfirmPasswordChange} 
                    required 
                />
            </div>

            <div className="mb-3 form-check">
                <input 
                    type="checkbox" 
                    className="form-check-input mycheckbox" 
                    id="exampleCheck1" 
                    checked={formData.is_active} 
                    name="is_active" 
                    onChange={handleChange} 
                />
                <label className="form-check-label myconditions" htmlFor="exampleCheck1">Terms & Conditions</label>
            </div>
            <div className="d-flex justify-content-center">
                <button type="submit" className="btn mybutton">Create Account</button>
            </div>
        </form>
    );
};
