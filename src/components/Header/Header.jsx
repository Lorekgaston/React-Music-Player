import * as React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import User from '../../components/User/User';
import MenuIcon from '@material-ui/icons/Menu';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Button from '@material-ui/core/Button';
import SearchInput from '../../components/SearchInput/SearchInput';
import useResize from '../../hooks/useResize';
import logo from '../../assets/img/Logo Music.jpg';
import './Header.scss';

const Menu = ({ children, isClicked }) => {
    return (
        <div className={isClicked ? 'Navbar__nav open' : 'Navbar__nav'}>
            {isClicked ? children : null}
        </div>
    );
};

const Header = ({ token }) => {
    const [isClicked, setIsClicked] = React.useState(false);
    const { isMobile } = useResize();

    const handleClasses = () => {
        const classes = ['Navbar__nav'];
        if (isClicked) {
            classes.push('open');
        }
        return classes;
    };

    const renderMobileHeader = () => (
        <>
            <div className="Navbar__container">
                <div className="Navbar__searchbar">
                    <SearchInput token={token} />
                </div>
                <Menu isClicked={isClicked}>
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
                            <Link className="Navbar__link" to="/categories">
                                Categories
                            </Link>
                        </li>
                        <li className="Navbar__menuItem" onClick={() => setIsClicked(false)}>
                            <Link className="Navbar__link" to="/search">
                                Search
                            </Link>
                        </li>
                        <li>
                            <div className="Navbar__button">
                                <Button color="inherit" variant="text">
                                    Log Out
                                </Button>
                            </div>
                        </li>
                    </ul>
                </Menu>

                <div className="Navbar__iconContainer">
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
        </>
    );

    return (
        <div className="Navbar">
            <div className="Navbar__container">
                <div className="Navbar__logo">
                    <img src={logo} alt="" />
                </div>
                <Menu isClicked={isClicked}>
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
                            <Link className="Navbar__link" to="/categories">
                                Categories
                            </Link>
                        </li>
                        <li className="Navbar__menuItem" onClick={() => setIsClicked(false)}>
                            <Link className="Navbar__link" to="/search">
                                Search
                            </Link>
                        </li>
                    </ul>
                    <div className="Navbar__button">
                        <Button variant="contained">Log Out</Button>
                    </div>
                </Menu>
                <div className="Navbar__iconContainer">
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
        </div>
    );
};

export default Header;

Header.propTypes = {
    token: PropTypes.string
};

{
    /* <nav className="Navbar__nav">
                    <ul className="Navbar__menu">
                        <li className="Navbar__menuItem" onClick={() => setIsClicked(false)}>
                            <Link className="Navbar__link" to="/home">
                                Home
                            </Link>
                        </li>
                        <li className="Navbar__menuItem" onClick={() => setIsClicked(false)}>
                            <Link className="Navbar__link" to="/categories">
                                Categories
                            </Link>
                        </li>
                        <li className="Navbar__menuItem" onClick={() => setIsClicked(false)}>
                            <Link className="Navbar__link" to="/search">
                                Search
                            </Link>
                        </li>
                        <li>
                            <div className="Navbar__user">
                                <User token={token} />
                            </div>
                        </li>
                        <li>
                            <div className="Navbar__button">
                                <Button color="inherit" variant="text">
                                    Log Out
                                </Button>
                            </div>
                        </li>
                    </ul>
                </nav> */
}
