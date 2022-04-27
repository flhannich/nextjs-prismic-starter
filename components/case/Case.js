import { RichText } from "prismic-reactjs";
import styles from "./Case.module.scss";

const Case = ({doc}) => {

    return (

        <div className={styles.container}>
            <h1>
                {RichText.asText(doc.data.title)}
            </h1>
        </div>
        
    )
}

export default Case;