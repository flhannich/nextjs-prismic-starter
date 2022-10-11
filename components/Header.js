import styles from './Header.module.scss';
import NextLink from 'next/link'
import { linkResolver } from 'prismicio'
import { useContext } from 'react';
import { AppContext } from '@context/AppContext';

const Header = ({ menu }) => {

    const {darkMode, setDarkMode} = useContext(AppContext);

    return (

        <header className={`${styles.container} grid`}>

            <nav>
                <ul>
                    {menu.data?.main.map((item, index) => (

                        <li key={index}>
                            <NextLink
                                href={linkResolver(item.link)}
                                passHref
                                >
                                <a>{item.label}</a>
                            </NextLink>
                        </li>
                        
                    ))}
                </ul>
            </nav>
            <button 
                aria-label="Toggle Mode"
                onClick={() => setDarkMode(!darkMode)}
            >
                {darkMode ? 'Light Mode' : 'Dark Mode'}

            </button>
        </header>

    )
};

export default Header;