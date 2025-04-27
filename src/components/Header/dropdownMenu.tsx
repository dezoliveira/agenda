import { AiOutlineUser } from "react-icons/ai";
import { LiaUserEditSolid } from "react-icons/lia";
import { IoMailOutline, IoHelpCircleOutline, IoExitOutline } from "react-icons/io5";
import { GrConfigure } from "react-icons/gr";

type DropdownItem = {
  label: string
  icon: React.ReactNode
  onClick: () => void
}

export function getDropdownMenu(router: any, handleLogout: () => void): DropdownItem[] {
  return [
    { label: "Meu Perfil", icon: <AiOutlineUser size={18} />, onClick: () => router.push("/profile") },
    { label: "Editar Perfil", icon: <LiaUserEditSolid size={18} />, onClick: () => router.push("/edit-profile") },
    { label: "Inbox", icon: <IoMailOutline size={18} />, onClick: () => router.push("/inbox") },
    { label: "Configurações", icon: <GrConfigure size={18} />, onClick: () => router.push("/config") },
    { label: "Ajuda", icon: <IoHelpCircleOutline size={18} />, onClick: () => router.push("/help") },
    { label: "Sair", icon: <IoExitOutline size={18} />, onClick: handleLogout },
  ]
}