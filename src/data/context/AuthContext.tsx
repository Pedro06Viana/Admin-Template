import { createContext, useEffect, useState } from 'react'
import firebase from '../../firebase/config'
import User from '../../model/User'
import route from "next/router";
import Cookies from 'js-cookie';

interface AuthContextProps {
    user?: User,
    loading?: boolean
    registo?: (email: string, password: string) => Promise<void>
    loginGoogle?: () => Promise<void>
    login?: (email: string, password: string) => Promise<void>
    logout?: () => Promise<void>
}

/* Recebe os dados do utilizador após Login 
* e retorna um obj com a sua informação 
*/
async function userNormalizado(userFirebase: firebase.User): Promise<User> {
    const token = await userFirebase.getIdToken()
    return {
        uid: userFirebase.uid,
        nome: userFirebase.displayName,
        email: userFirebase.email,
        token,
        provider: userFirebase.providerData[0].providerId,
        imgUrl: userFirebase.photoURL
    }
}

/* 
* Cria ou elemina o cookie admin-template-auth
* este cookie vai ser utilizado para saber se o user
* 1 Fez Login | 2 Fez Logout
*/
/* expires: campo em dias */
function gerirCookie(logado: boolean) {
    if (logado) {
        Cookies.set("admin-template-auth", "true", {
            expires: 7
        })
    } else {
        Cookies.remove("admin-template-auth")
    }
}

const AuthContext = createContext<AuthContextProps>({})
export function AuthProvider(props) {

    const [user, setUser] = useState<User>(null)
    const [loading, setLoading] = useState(true)

    async function login(email, password) {
        try {
            setLoading(true)
            const res = await firebase.auth().signInWithEmailAndPassword(email, password)
            await configSession(res.user)
            route.push('/')
        } finally {
            setLoading(false)
        }
    }

    async function registo(email, password) {
        try {
            setLoading(true)
            const res = await firebase.auth().createUserWithEmailAndPassword(email, password)
            await configSession(res.user)
            route.push('/')
        } finally {
            setLoading(false)
        }
    }

    async function loginGoogle() {
        try {
            setLoading(true)
            const res = await firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider()
            )
            await configSession(res.user)
            route.push('/')
        } finally {
            setLoading(false)
        }
    }

    async function logout() {
        try {
            setLoading(true)
            await firebase.auth().signOut()
            await configSession(null)
        } finally {
            setLoading(false)
        }
    }

    /* 
    * Recebe o utilizador após Login 
    * se o utilizador estiver setado com sucesso
    * 1 - Noramaliza os dados do User recebido
    * 2 - Cria o cookie
    * 3 - Stop Loading
    * 4 - Retorna o email, que vai ser importante no processo de continuar com o loggin efetuado
    */
    async function configSession(userFirebase) {
        if (userFirebase?.email) {
            const newUser = await userNormalizado(userFirebase)
            setUser(newUser)
            gerirCookie(true)
            setLoading(false)
            return newUser.email
        } else {
            setUser(null)
            gerirCookie(false)
            setLoading(false)
            return false
        }
    }

    /*
    * O useEffect é chamada em cada refresh do Browser
    * A cada vez que for chamado a função a baixo, internamente vai detetar se existe mudança no token do User
    * Quando o Id do Token for modificado
    * onIdTokenChanged -> esta função chama uma função passada por parametro e passa por parametro a essa função o userFirebase
    * onIdTokenChanged(configSession(userFirebase))
    * retorna um função que vai cancelar a propria função, por ser um Observer!!
    */
    useEffect(() => {
        if (Cookies.get("admin-template-auth")) {
            const cancel = firebase.auth().onIdTokenChanged(configSession)
            return () => cancel()
        } else {
            setLoading(false)
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            registo,
            loginGoogle,
            login,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext