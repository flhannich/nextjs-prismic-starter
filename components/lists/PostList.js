import { RichText } from "prismic-reactjs";
import styles from "./PostList.module.scss";
import NextLink from "next/link";
import { linkResolver } from "prismicio";

const PostList = ({data}) => {

    return (

        <div className={styles.container}>

            {data.length !== 0 
                ? data.map(item => (
                    <h2 key={item.id}>
                        <NextLink 
                            href={linkResolver(item)}
                        >
                            <a>{RichText.asText(item.data.title)}</a>  
                        </NextLink>
                    </h2>
                ))
                : <h3>No Posts avaible</h3>
        }

        </div>

    )   
}

export default PostList;