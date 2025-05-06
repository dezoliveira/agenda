import styles from './styles.module.css'
import Link from 'next/link'

type AuthLinkProps = {
  message: string
  hrefLink: string
  hrefText: string
}

export function AuthLink({  message, hrefLink, hrefText } : AuthLinkProps) {
  return (
    <div className={styles.authLinkContainer}>
      <p>{message}
        <Link href={hrefLink}>
          <strong>{hrefText}</strong>
        </Link>
      </p>
    </div>
  )
}