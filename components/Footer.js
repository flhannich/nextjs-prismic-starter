import NextLink from 'next/link'
import { linkResolver } from 'prismicio'
import { LanguageSwitcher, SocialLinks } from '@components/index';
import styles from './Footer.module.scss';
import { Subscribe, Button } from '@components/index'
import { useContext } from 'react';
import { AppContext } from 'context/AppContext';

const Footer = ({ menu, config,altLangs, lang, subscribe_form}) => {

    const { configRef } = useContext(AppContext);

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    return (

        <footer className={styles.container}>

            <div className={styles.top}>

                {config && 
                    <nav className={styles.contact}>
                        <ul>
                            <li>
                                <a href={`tel:+49 ${config.data.phone.substring(1)}`}>{config.data.phone}</a>
                            </li>
                            <li>
                                <a href={`mailto:${config.data.mail}`}>{config.data.mail}</a>
                            </li>
                        </ul>
                        <ul>
                            {config.data?.social.map((item, index) => (
                                <li key={index}>
                                    <a href={item.link.url} rel="noreferrer nofollow">{item.provider}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                }

                <div className={styles.newsletter}>
                    <Subscribe data={subscribe_form} />
                </div>

                <div className={styles.scrollTop}>  
                    <Button
                        handler={() => scrollToTop()}
                        label={null}
                        style="none"
                        icon={`scroll_top`}
                    />
                </div>
                
            </div>



             <div className={styles.bottom}>

                <nav className={styles.legal}>
                    <ul>
                        <li>
                            {config && <span>&copy; 2022 {config.data.sitename}</span>}
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