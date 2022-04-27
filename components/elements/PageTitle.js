import { RichText } from "prismic-reactjs";
import styles from "./PageTitle.module.scss";

const PageTitle = ({data}) => {

    return (

        <div className={styles.container}>

            {RichText.render(data.data.title)}

        </div>

    )   
}

export default PageTitle;