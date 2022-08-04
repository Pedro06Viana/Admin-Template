import { createContext, useEffect, useState } from "react";

interface AppContextProps {
    tema?: string
    alterarTema?: () => void
}

const AppContext = createContext<AppContextProps>({
    tema: null,
    alterarTema: null
})

export function AppProvider(props) {

    const [tema, setTema] = useState('')

    function alterarTema() {
        const novoTema = (tema === '' ? 'dark' : '')
        setTema(novoTema)
        localStorage.setItem('tema', novoTema)
    }

    useEffect(() => {
        const temaSalvo = localStorage.getItem('tema')
        setTema(temaSalvo)
    }, [])

    return (
        <AppContext.Provider value={{
            tema: tema,
            alterarTema
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext