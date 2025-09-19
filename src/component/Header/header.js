import React,{ useEffect,useState} from "react"
import "./header_styles.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/auth";



export default function Header() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState();
    
    useEffect(() => {
           const data = localStorage.getItem("userData");
           if (data) {
               setFormData(JSON.parse(data));
               console.log("Formdata---------",formData)
               
           }
       }, []);
    const handleLogout = () => {
        logout(); 
        navigate("/")
    }
    return (
        <div>
            <nav className="navbar fixed-top  ">
                <div className="header-content">
                    <img
                        src={ formData?.avatar? formData.avatar : "../assets/no-profile-img.jpeg"}
                        alt="Profile"
                        className="rounded-circle border border-3"
                        width="40"
                        height="40"
                        style={{ objectFit: "cover" }}
                    />
                    <p style={{marginLeft:"10px", padding:"5px"}}>Welcome,{formData?.name}</p>
                    <button className="btn btn-outline-success" onClick={handleLogout}>Logout</button>
                </div>
            </nav>

        </div>
    )
}