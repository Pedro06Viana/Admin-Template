import Link from 'next/link';

interface MenuItemProps {
    url?: string
    texto: string
    icon: any
    className?: string
    onClick?: (e: any) => void
}

export default function MenuItem(props: MenuItemProps) {

    function renderLink() {
        return (
            <a className={`
                    flex flex-col justify-center items-center
                    w-20 h-20
                    text-gray-600
                    dark:text-gray-200
                    ${props.className}
                `}>
                {props.icon}
                <span className={`
                        text-xs font-light 
                    `}>
                    {props.texto}
                </span>
            </a>
        )
    }

    return (
        <li onClick={props.onClick}
            className={`
                hover:bg-gray-100
                dark:hover:bg-gray-800
                cursor-pointer
            `}>
            {props.url ? (
                <Link href={props.url}>
                    {renderLink()}
                </Link>
            ) : (
                renderLink()
            )}
        </li>
    );
}