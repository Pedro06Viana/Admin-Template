import useAppData from '../../data/hook/useAppData';
import AvatarUser from './AvatarUser';
import BotaoAlterarTema from './BotaoAlterarTema';
import Titulo from './Titulo';

interface CabecalhoProps {
    titulo: string
    subTitulo: string
}

export default function Cabecalho(props: CabecalhoProps) {
    const { tema, alterarTema } = useAppData()
    return (
        <div className={`
            flex 
        `}>
            <Titulo titulo={props.titulo} subTitulo={props.subTitulo} />
            <div className={`
                flex flex-grow justify-end items-center
            `}>
                <BotaoAlterarTema tema={tema} alterarTema={alterarTema} />
                <AvatarUser clasName='ml-3' />
            </div>
        </div>
    );
}