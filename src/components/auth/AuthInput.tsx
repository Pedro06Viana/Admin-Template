type Tipo = 'text' | 'email' | 'password'

interface AuthInputProps {
    id: string
    label: string
    valor: any
    tipo?: Tipo
    obrigatorio?: boolean
    render?: boolean
    valorAlterado: (novoValor: any) => void
}

export default function AuthInput(props: AuthInputProps) {
    return props.render ? null : (
        <div className={`
            flex flex-col mt-4
        `}>
            <label htmlFor={props.id}>{props.label}</label>
            <input type={props.tipo ?? 'text'} name={props.id} id={props.id} value={props.valor}
                onChange={(e) => props.valorAlterado?.(e.target.value)}
                required={props.obrigatorio}
                className={`
                    px-4 py-3 mt-2
                    rounded-lg
                    bg-gray-200
                    border focus:border-blue-500 focus:outline-none focus:bg-white
                `}
            />
        </div>
    );
}