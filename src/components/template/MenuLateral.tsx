import useAuthData from "../../data/hook/useAuthData";
import { IconBell, IconConfig, IconHome, IconLogout } from "../icons";
import Logo from "./Logo";
import MenuItem from "./MenuItem";


export default function MenuLateral() {

    const { logout } = useAuthData()
    return (
        <aside className={`
            flex flex-col
            bg-gray-200 text-gray-900
            dark:bg-gray-900
        `}>
            <div className={`
                flex flex-col items-center justify-center
                h-20 w-20
                bg-gradient-to-r from-indigo-500 to-purple-800
            `}>
                <Logo />
            </div>
            <ul className="flex-1">
                <MenuItem url="/" texto="Início" icon={IconHome} />
                <MenuItem url="/definicoes" texto="Definições" icon={IconConfig} />
                <MenuItem url="/notificacoes" texto="Notificações" icon={IconBell} />
            </ul>
            <ul>
                <MenuItem onClick={logout}
                    texto="Sair"
                    icon={IconLogout}
                    className={`
                    text-red-600 
                    hover:bg-red-400 hover:text-white
                    dark:text-red-400 dark:hover:text-white
                `} />
            </ul>
        </aside>
    );
}