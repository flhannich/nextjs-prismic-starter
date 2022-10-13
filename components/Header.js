import styles from './Header.module.scss';
import NextLink from 'next/link'
import { linkResolver } from 'prismicio'
import { useContext } from 'react';
import { AppContext } from '@context/AppContext';
import { Button } from '@components/index';

const Header = ({ menu }) => {

    const { darkMode, setDarkMode } = useContext(AppContext);

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

            <Button
                handler={() => setDarkMode(!darkMode)}
                ariaLabel="Toggle Mode"
                classname="default"
                icon={false}
            >
                {darkMode ? 'Light Mode' : 'Dark Mode'}
            </Button>
 
        </header>

    )
};

export default Header;