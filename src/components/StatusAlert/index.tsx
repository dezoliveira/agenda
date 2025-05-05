import { MdErrorOutline, MdMarkEmailRead, MdOutlineEmail } from "react-icons/md"

interface StatusAlertProps {
  status: 'success' | 'error' | 'idle'
  title?: string,
  message?: string
  icon?: React.ReactNode
  color?:string
}

const statusMap = {
  success: {
    icon: <MdMarkEmailRead size={60} className="text-green-500" />,
    title: "Email enviado com sucesso!",
    message: "Te enviamos um email, siga os passos para recuperar a sua senha.",
    color: "text-green-500"
  },

  error: {
    icon: <MdErrorOutline size={60} className="text-red-500" />,
    title: "Erro ao enviar o email!",
    message: "Ocorreu um erro ao enviar o email. Tente novamente",
    color: "text-red-500"
  },

  idle: {
    icon: <MdOutlineEmail size={60} className="text-yellow-500" />,
    title: "Aguardando o email para envio.",
    message: "Informe seu e-mail para continuarmos com a recuperação da sua senha.",
    color: "text-yellow-500"
  }
}

export default function StatusAlert({ status, title, message, icon, color } : StatusAlertProps) {
  const defaultData = statusMap[status]
  
  return (
    <>
      <div className="flex items-center flex-col justify-between gap-[5px]">
        {icon ?? defaultData.icon}
        <p className={color ?? defaultData.color}>{title ?? defaultData.title}</p>
      </div>
      <p>{message ?? defaultData.message}</p>
    </>
  )
}