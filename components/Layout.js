import Head from 'next/head';
import {
    Header,
    Footer,
    ExitPreviewButton,
    Modal,
    LangModal
} from '@components/index'

const Layout = ({ isPreview, children, altLangs, lang, menu, config, subscribe_form }) => {

  return (

  <>

    <Header
      menu={menu}
    />

    <Head>

    </Head>
    
    <main>{children}</main>


    {isPreview && 
      <ExitPreviewButton lang={lang.currentLang}/>
    }

    
      {/* <Modal state={!lang.isMyMainLanguage && true}>
        <LangModal 
          locales={lang.locales}
        />
      </Modal> */}
    

    <Footer
      altLangs={altLangs}
      lang={lang}
      menu={menu}
      subscribe_form={subscribe_form}
      config={config}
    />

  </>
)};

export default Layout;