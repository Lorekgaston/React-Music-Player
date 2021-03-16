import * as React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import User from '../../components/User/User';
import MenuIcon from '@material-ui/icons/Menu';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Button from '@material-ui/core/Button';
import useResize from '../../hooks/useResize';
import logo from '../../assets/img/Logo Music.jpg';
import Menu from '../Menu/Menu';
import './Header.scss';

const Header = ({ token }) => {
    const [isClicked, setIsClicked] = React.useState(false);
    const { isMobile } = useResize();

    return (
        <div className="Navbar">
            <div className="Navbar__container">
                <div className="Navbar__logo">
                    <img src={logo} alt="" />
                </div>
                {isMobile < 600 ? (
                    <Menu isClicked={isClicked} classes={'Navbar__nav'} open={'open'}>
                        <div className="Navbar__user">
                            <User token={token} />
                        </div>
                        <ul className="Navbar__menu">
                            <li className="Navbar__menuItem" onClick={() => setIsClicked(false)}>
                                <Link className="Navbar__link" to="/home">
                                    Home
                                </Link>
                            </li>
                            <li className="Navbar__menuItem" onClick={() => setIsClicked(false)}>
                                <Link className="Navbar__link" to="/Categories">
                                    Categories
                                </Link>
                            </li>
                        </ul>
                        <div className="Navbar__button">
                            <Button variant="contained">Log Out</Button>
                        </div>
                    </Menu>
                ) : (
                    <nav className="Navbar__nav">
                        <ul className="Navbar__menu">
                            <li className="Navbar__menuItem">
                                <Link className="Navbar__link" to="/home">
                                    Home
                                </Link>
                            </li>
                            <li className="Navbar__menuItem">
                                <Link className="Navbar__link" to="/Categories">
                                    Categories
                                </Link>
                            </li>
                        </ul>
                        <div className="Navbar__navLeft">
                            <div className="Navbar__user">
                                <User token={token} />
                            </div>

                            <div className="Navbar__button">
                                <Button variant="contained">Log Out</Button>
                            </div>
                        </div>
                    </nav>
                )}
                {isClicked ? (
                    <CloseRoundedIcon
                        className="Navbar__icon"
                        onClick={() => setIsClicked(prevState => !prevState)}
                    />
                ) : (
                    <MenuIcon
                        className="Navbar__icon"
                        onClick={() => setIsClicked(prevState => !prevState)}
                    />
                )}
            </div>
        </div>
    );
};

export default Header;

Header.propTypes = {
    token: PropTypes.string
};
