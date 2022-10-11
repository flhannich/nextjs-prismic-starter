import { RichText } from "prismic-reactjs";
import styles from "./PageTitle.module.scss";

const PageTitle = ({data}) => {

    return (

        <header className={styles.container}>

            {RichText.render(data.data.title)}

        </header>

    )   
}

export default PageTitle;