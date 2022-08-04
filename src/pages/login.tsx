import { useState } from "react";
import AuthInput from "../components/auth/AuthInput";
import { IconWarning, LogoGoogle } from "../components/icons";
import useAuthData from "../data/hook/useAuthData";

type Modo = 'login' | 'registo'

export default function Login() {

    const [modo, setModo] = useState<Modo>('login')
    const [erro, setErro] = useState(null)

    const { registo, login, loginGoogle } = useAuthData()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function submit() {
        try {
            if (modo === 'login') {
                await login(email, password)
            } else {
                await registo(email, password)
            }
        } catch (error) {
            criarErro(error?.message ?? 'Ocorreu um erro inesperado!')
        }
    }

    function criarErro(msg, tempo = 5) {
        setErro(msg)
        setTimeout(() => setErro(null), tempo * 1000)
    }

    function renderErro() {
        return erro ?
            <div className={`
                flex items-center
                bg-red-400 text-white
                py-3 px-5 my-2
                border border-red-700 rounded-lg
            `} >
                {IconWarning()}
                < span className="ml-3" > {erro}</span >
            </div >
            : false
    }

    function renderMsgRodape() {
        return modo === 'login' ? (
            <p className="mt-8">
                <a className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer"
                    onClick={() => { setModo('registo') }}>Criar uma Conta</a>
            </p>
        ) : (
            <p className="mt-8">
                <a className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer"
                    onClick={() => { setModo('login') }}>Efetuar Login com suas credências</a>
            </p>
        )
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <div className={`hidden md:block md:w-1/2 lg:w-2/3`}>
                <img
                    src="https://source.unsplash.com/random"
                    alt="Imagem da Página de Login"
                    className="h-screen w-full object-cover"
                />
            </div>
            <div className="m-10 w-full md:w-1/2 lg:w-1/3">
                <h1 className={`text-3xl font-bold mb-5`}>
                    {modo === 'login' ? 'Efetuar Login' : 'Efetuar novo Registo'}
                </h1>

                {renderErro()}

                <AuthInput
                    id="email"
                    label="Email"
                    tipo="email"
                    valorAlterado={setEmail}
                    valor={email}
                    obrigatorio
                />
                <AuthInput
                    id="password"
                    label="Password"
                    tipo="password"
                    valorAlterado={setPassword}
                    valor={password}
                    obrigatorio
                />
                <button
                    onClick={submit}
                    className={`
                    w-full
                    bg-indigo-500 hover:bg-indigo-400 text-white
                    rounded-lg
                    px-4 py-3 mt-6
                `}
                >
                    {modo === 'login' ? 'Login' : 'Registo'}
                </button>

                <hr className="my-6 border-gray-300 w-full" />

                <button
                    onClick={loginGoogle}
                    className={`
                    flex justify-center items-center
                    w-full
                    bg-red-500 hover:bg-red-400 text-white
                    rounded-lg
                    px-4 py-3
                `}
                >
                    <span>{LogoGoogle()}</span>
                </button>

                {renderMsgRodape()}
            </div>
        </div>
    );
}