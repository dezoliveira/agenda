export function firebaseErrorMessage(code: string): string {
  const errors: Record<string, string> = { // Record porque o erro é um objeto
    'auth/invalid-email': 'E-mail inválido.',
    'auth/user-disabled': 'Usuário desativado.',
    'auth/user-not-found': 'Usuário não encontrado.',
    'auth/wrong-password': 'Senha incorreta.',
    'auth/email-already-in-use': 'Este e-mail já está em uso.',
    'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres.',
    'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
    'auth/network-request-failed': 'Erro de rede. Verifique sua conexão.',
  }

  return errors[code] || 'Erro desconhecido. Tente novamente'
}