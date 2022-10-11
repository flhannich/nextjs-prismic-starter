
import styles from './LangModal.module.scss'
import { LanguagePicker } from "@components/index";
import { useRouter } from 'next/router'

const LangModal = ({ locales }) => {

    const text = {
        "languagePicker": {
            "title": {
                "de-de": "Wähle deine Sprache",
                "en-us": "Choose your Language"
            },
            "description": {
                "de-de": "Du kannst deine Sprache jederzeit ändern",
                "en-us": "You can change your language at any time"
            }
        }
    }

    const lang = useRouter();

    return (
        <div 
            className={styles.container}
        >   
            <h3>{text.languagePicker.title[lang]}</h3>
            <p>{text.languagePicker.description[lang]}</p>

            <LanguagePicker locales={locales} />

        </div>
    )
  }

export default LangModal;