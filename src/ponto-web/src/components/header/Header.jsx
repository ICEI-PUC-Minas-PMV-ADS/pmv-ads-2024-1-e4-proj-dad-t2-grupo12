import './Header.css';
import logotransparente from "/src/assets/logotransparente.png";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from 'react-icons/fa';
import {useEffect, useState} from "react";

const Header = () => {
    const navigateTo = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const parsedUser = JSON.parse(user);
            setUserData(parsedUser);
        } else {
            navigateTo('/');
        }
    }, [navigateTo]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigateTo('/');
    };

    return (
        <div className="app">
            <header className="header">
                <div>
                    <img src={logotransparente} alt="Logo" width="50" height="50" />
                </div>
                <div className="usuario-logado">
                    <span className="user-name">{userData && userData.nome}</span>
                    <FaSignOutAlt className="logout-icon" onClick={handleLogout} />
                </div>
            </header>
        </div>
    );
};

export default Header;
