import styles from './styles.module.css'
import React, { FormEvent } from 'react'

interface AuthFormProps {
  title: string
  fields: {
    label: string
    type: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  }[]
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  buttonLabel: string
  loading: boolean
  error?: string | null
  children?: React.ReactNode
  afterFields?: React.ReactNode
}

export default function AuthForm({
  title,
  fields,
  onSubmit,
  buttonLabel,
  loading,
  error,
  children,
  afterFields
}: AuthFormProps) {
  return (
    <div className={styles.AuthFormContainer}>
      <form className={styles.AuthFormContent} onSubmit={onSubmit}>
        <h1 className={styles.title}>{title}</h1>
        {
          fields.map((field, i) => (
            <div key={i} className={styles.inputBox}>
              <label>{field.label}</label>
              <input
                type={field.type}
                value={field.value}
                onChange={field.onChange}
              />
            </div>
          ))
        }

        {
          afterFields && (
            <>
              {afterFields}
            </>
          )
        }

        { 
          error && (
            <div className={styles.errorMessage}>
              <p>{error}</p>
            </div>
          )
        }

        <div className={styles.inputBox}>
          <button
            type="submit"
            className={styles.button}
            disabled={loading}
          >
            {loading ? "Carregando..." : buttonLabel}
          </button>
        </div>

        {children}
      </form>
    </div>
  )
}