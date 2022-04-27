import NextLink from 'next/link'
import { linkResolver } from 'prismicio'
import styles from './LanguageSwitcher.module.scss'
import { AppContext } from 'context/AppContext';
import { useContext, useState } from 'react';
import { Icons, Button, Dropdown } from '@components/index';

const LanguageSwitcher = ({ altLangs, lang }) => {

  const [ dropdownState, setDropdownState ] = useState(false);

  const getCountryName = val => {

    if(val === 'en-us') {
      return 'Englisch'
    }
    if(val === 'de-de') {
      return 'Deutsch'
    }
  }

  const getCountryCode = val => {
      return val.slice(-2).toLowerCase()
  }


  const handleClick = altLang => {
    setDropdownState(false)
  }
    
  return (
      <>
        {/* Hide when no alternative Language is avaible */}
        {altLangs.length > 0 &&

          <div className={styles.container} >

              <Button            
                variant="none"
                handler={() => setDropdownState(!dropdownState)}
                label={`Change Language`}
                icon={`globe`}
                // label={getCountryName(lang.currentLang)}
              />

              <Dropdown state={dropdownState} setState={setDropdownState} variant="top-left">
                  <div className={styles.list}>
                    { lang.locales.map((item, index) => (
                      <NextLink
                        key={index}
                        locale={item}
                        href={linkResolver(item)}
                        passHref
                      >
                        <a 
                          onClick={() => handleClick(item)}
                          className={`${item === lang.currentLang ? styles.isSelected : ''}`}
                        >
                          <>
                          {getCountryName(item)}
                          {/* <Icons
                            name={getCountryCode(item)}
                            width={20}
                            height={16}
                          /> */}
                          </>
                        </a>
                      </NextLink>
                    ))}
                  </div>
                </Dropdown>

          </div>

        }
      </>
    )
  }

export default LanguageSwitcher;