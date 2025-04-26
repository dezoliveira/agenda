import { IoExitOutline, IoHelpCircleOutline, IoMailOutline } from "react-icons/io5";
import { GrConfigure } from "react-icons/gr";
import { LiaUserEditSolid } from "react-icons/lia";
import { AiOutlineUser } from "react-icons/ai";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const getDropdownItens = (router: AppRouterInstance, handleLogout: () => void) => [
  { label: "Meu Perfil", icon: <AiOutlineUser size={18} />, onClick: () => router.push("/profile") },
  { label: "Editar Perfil", icon: <LiaUserEditSolid size={18}/>, onClick: () => router.push("/profile-edit") },
  { label: "Inbox", icon: <IoMailOutline size={18}/>, onClick: () => router.push("/inbox") },
  { label: "Configurações", icon: <GrConfigure size={18}/>, onClick: () => router.push("/config") },
  { label: "Ajuda", icon: <IoHelpCircleOutline size={18}/>, onClick: () => router.push("/help") },
  { label: "Sair", icon: <IoExitOutline size={18}/>, onClick: handleLogout},
]