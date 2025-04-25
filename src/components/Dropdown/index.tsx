import styles from './styles.module.css'

export default function Dropdown() {
  return (
    <div className={styles.dropdownContainer}>
      <div className='text-center pt-4'>
        <h4>Andres Oliveira</h4>
        <small className='text-slate-300'>andresoliveira@gmail.com</small>
      </div>
      <ul>
        <hr className='mx-[15px] my-[0]'/>
        <li>
          <div>Meu Perfil</div>
        </li>
        <hr className='mx-[15px] my-[0]'/>
        <li>
          <div>Editar Perfil</div>
        </li>
        <hr className='mx-[15px] my-[0]'/>
        <li>
          <div>Inbox</div>
        </li>
        <hr className='mx-[15px] my-[0]'/>
        <li>
          <div>Configurações</div>
        </li>
        <hr className='mx-[15px] my-[0]'/>
        <li>
          <div>Ajuda</div>
        </li>
        <hr className='mx-[15px] my-[0]'/>
        <li>
          <div>Sair</div>
        </li>
      </ul>
    </div>
  )
}