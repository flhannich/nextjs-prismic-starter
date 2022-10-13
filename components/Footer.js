import NextLink from 'next/link'
import { linkResolver } from 'prismicio'
import { LanguageSwitcher, SocialLinks } from '@components/index';
import styles from './Footer.module.scss';
import { Subscribe, Button } from '@components/index'

const Footer = ({ menu, config, altLangs, lang, subscribe_form}) => {


    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    return (

        <footer className={styles.container}>

            <div className={styles.top}>

                <nav className={styles.contact}>
                    <ul>
                        <li>
                            <a href={`tel:+49 ${config.data.phone.substring(1)}`}>{config.data.phone}</a>
                        </li>
                        <li>
                            <a href={`mailto:${config.data.mail}`}>{config.data.mail}</a>
                        </li>
                    </ul>
                </nav>
                

                <div className={styles.social}>
                    <ul>
                        {config.data?.social.map((item, index) => (
                            <li key={index}>
                                <a href={item.link.url} rel="noreferrer nofollow">{item.provider}</a>
                            </li>
                        ))}
                    </ul>
                </div>


                <div className={styles.newsletter}>
                    <Subscribe data={subscribe_form} />
                </div>

                <div className={styles.scrollTop}>  
                    <Button
                        handler={() => scrollToTop()}
                        label={null}
                        classname="icon"
                        icon={`scroll_top`}
                    />
                </div>
                
            </div>



             <div className={styles.bottom}>

                <div className={styles.copyright}>
                    <span>&copy; 2022 {config.data.sitename}</span>
                </div>

                <nav className={styles.legal}>
                    <ul>
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