import Head from 'next/head'
import Image from 'next/image'
import Router from 'next/router'
import loadingImage from '../../../public/images/loading.gif'
import useAuthData from '../../data/hook/useAuthData'

interface VerificaAutenticacaoProps {
    children: any
}

export default function VerificaAutenticacao(props: VerificaAutenticacaoProps) {

    const { user, loading } = useAuthData()

    function renderConteudo() {

        /* Este pedaço de código reforça a proteção de rotas
        *  Implementa código JS no Head da APP
        *  Vai ser executado em todas as páginas no momento do carregamento
        *  Se o cookie for eliminado força a página a ir para o Login
        */
        return <>
            <Head>
                <script dangerouslySetInnerHTML={{
                    __html: `
                if(!document.cookie.includes("admin-template-auth")) {
                    window.location.href = "/login"
                }
                `
                }} />
            </Head>
            {props.children}
        </>
    }

    function renderCarregando() {
        return (
            <div className="flex justify-center items-center h-screen">
                <Image src={loadingImage} alt="Imagem de carregamento de página" />
            </div>
        )
    }

    if (!loading && user?.email) {
        return renderConteudo()
    } else if (loading) {
        return renderCarregando()
    } else {
        Router.push('/login')
        return null
    }
}