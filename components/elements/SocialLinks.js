
import { useContext } from 'react';
import { AppContext } from 'context/AppContext';
import NextLink from "next/link"
import { Icons } from "@components/index"
import styles from "./SocialLinks.module.scss"

const SocialLinks = () => {
    
    const { contacts } = useContext(AppContext);

    return (
        <ul className={styles.container}>
        {contacts?.data.social.map((item, index) => (
            <li key={index}>
                <NextLink
                    href={item.link.url}
                    passHref
                >
                    <a aria-label={item.provider} rel="noopener noreferrer">
                        {item.provider}
                    </a>
                </NextLink>
            </li>
        ))}
        </ul>
    )
}

export default SocialLinks;