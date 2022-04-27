
import styles from './LangModal.module.scss'
import { LanguagePicker } from "@components/index";
import { AppContext } from 'context/AppContext';
import { useContext } from 'react';
import { useRouter } from 'next/router'

const LangModal = ({ locales }) => {

    const { uiContents } = useContext(AppContext);
    const lang = useRouter();

    return (
        <div 
            className={styles.container}
        >   
            <h3>{uiContents.languagePicker.title[lang]}</h3>
            <p>{uiContents.languagePicker.description[lang]}</p>

            <LanguagePicker locales={locales} />

        </div>
    )
  }

export default LangModal;