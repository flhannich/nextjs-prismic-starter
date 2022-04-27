import styles from './Image.module.scss'
import NextImage from 'next/image'

const Image = ({data}) => {

    return (
        <>
        {data && 
            <div className={styles.container}>
                <NextImage 
                    width={data.dimensions.width}
                    height={data.dimensions.height}
                    src={data.url}
                    alt={data.alt}
                    layout="responsive"
                    quality={80}
                />
            </div>}
        </>
    )

}

export default Image