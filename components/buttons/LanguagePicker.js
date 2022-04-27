import NextLink from 'next/link'
import { linkResolver } from 'prismicio'
import styles from './LanguagePicker.module.scss'
import { AppContext } from 'context/AppContext';

const LanguagePicker = ({ locales }) => {

  const getCountryName = val => {

    if(val === 'en-us') {
      return 'Englisch'
    }
    if(val === 'de-de') {
      return 'Deutsch'
    }
  }

    return (

      <div className={styles.container}>

            <div className={styles.list}>

              { locales.map((lang) => (

                <NextLink
                  key={lang}
                  locale={lang}
                  href={linkResolver(lang)}
                  passHref
                >
                  <a>
                    {getCountryName(lang)}
                  </a>
                </NextLink>
              ))}

            </div>

      </div>

    )
  }

export default LanguagePicker;