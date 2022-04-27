import NextLink from 'next/link'
import { linkResolver } from 'prismicio'
import { LanguageSwitcher, SocialLinks } from '@components/index';
import styles from './Footer.module.scss';
import { Subscribe, Button } from '@components/index'
import { useContext } from 'react';
import { AppContext } from 'context/AppContext';

const Footer = ({ menu, altLangs, lang }) => {

    const { contactsRef } = useContext(AppContext);

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    return (

        <footer className={styles.container}>

            <div className={styles.top}>

                {contactsRef.current && 
                    <nav className={styles.contact}>
                        <ul>
                            <li>
                                <a href={`tel:+49 ${contactsRef.current.data.phone.substring(1)}`}>{contactsRef.current.data.phone}</a>
                            </li>
                            <li>
                                <a href={`mailto:${contactsRef.current.data.mail}`}>{contactsRef.current.data.mail}</a>
                            </li>
                        </ul>
                        <ul>
                            {contactsRef.current.data?.social.map((item, index) => (
                                <li key={index}>
                                    <a href={item.link.url} rel="noreferrer nofollow">{item.provider}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                }

                <div className={styles.newsletter}>
                    <Subscribe />
                </div>

                <div className={styles.scrollTop}>  
                    <Button
                        handler={() => scrollToTop()}
                        label={null}
                        variant="none"
                        icon={`scroll_top`}
                    />
                </div>
                
            </div>



             <div className={styles.bottom}>

                <nav className={styles.legal}>
                    <ul>
                        <li>
                            {contactsRef.current && <span>&copy; 2022 {contactsRef.current.data.sitename}</span>}
                        </li>
                        {menu.data.legal.map((item, index) => (
                            <li key={index}>
                                <NextLink
                                    href={linkResolver(item.link)}
                                    prefetch={false}
                                >
                                    <a>{item.label}</a>
                                </NextLink>
                            </li>
                       ))}
                    </ul>
                </nav>

                <div className={styles.languageSwitcher}>
                    <LanguageSwitcher altLangs={altLangs} lang={lang} />
                </div>

            </div>               


        </footer>

    )
};

export default Footer;