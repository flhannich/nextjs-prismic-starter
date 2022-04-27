import { withRouter } from 'next/router'
import styles from "./ExitPreviewButton.module.scss"
import NextLink from 'next/link'

function ExitPreviewButton({ router, lang }) {

  const previewExitUrl = '/api/exit-preview'
  const linkUrl = router.asPath ? `${previewExitUrl}?currentUrl=/${lang}${router.asPath}` : previewExitUrl

  return (
    <div className={styles.container}>
      <NextLink 
        href={linkUrl}
        passHref
      >
        <a>Exit Preview</a>
      </NextLink>
    </div>


  )
}

export default withRouter(ExitPreviewButton)