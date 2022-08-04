import Link from 'next/link';
import useAuthData from '../../data/hook/useAuthData';

interface AvatarUserProps {
    clasName?: string
}

export default function AvatarUser(props: AvatarUserProps) {

    const { user } = useAuthData()

    return (
        <Link href={'/perfil'}>
            <img src={user?.imgUrl ?? '/images/userAvatar.svg'} alt="Avatar de Utilizador" referrerPolicy="no-referrer"
                className={`h-10 w-10 rounded-full cursor-pointer ${props.clasName}`}
            />
        </Link>
    );
}