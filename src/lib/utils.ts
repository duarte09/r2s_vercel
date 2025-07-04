import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Função para formatar o telefone
export const formatPhoneNumber = (value: string) => {
  // Remove tudo que não for número
  const numbers = value.replace(/\D/g, '')

  // Aplica a formatação conforme o tamanho da string
  if (numbers.length <= 2) {
    return `(${numbers}`
  } else if (numbers.length <= 6) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
  } else if (numbers.length <= 10) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`
  } else {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }
}

export const formatPhoneNumberMask = (phone: string) => {
  if (!phone) return ''

  // Remove qualquer caractere não numérico
  let cleaned = phone.replace(/\D/g, '')

  // Remove o código do Brasil (55) se estiver presente no início
  if (cleaned.startsWith('55')) {
    cleaned = cleaned.slice(2)
  }

  // Verifica se o número tem apenas 8 dígitos (sem o 9) e adiciona o 9 manualmente
  const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/)
  if (match) {
    const ddd = match[1]
    let firstPart = match[2]
    const secondPart = match[3]

    // Se a primeira parte tiver apenas 4 dígitos, adiciona o 9 antes
    if (firstPart.length === 4) {
      firstPart = '9' + firstPart
    }

    return `(${ddd}) ${firstPart}-${secondPart}`
  }

  return phone
}

// Função para limpar o número de telefone para a API
export const cleanPhoneNumberForAPI = (phone: string) => {
  // Remove toda a formatação (parênteses, espaços, hífen)
  const onlyNumbers = phone.replace(/\D/g, '')

  // Verifica se o número tem 11 dígitos (com o 9) e remove o 9 extra
  if (onlyNumbers.length === 11 && onlyNumbers.charAt(2) === '9') {
    // Retorna 55 + DDD (2 dígitos) + número sem o 9 inicial
    return '55' + onlyNumbers.substring(0, 2) + onlyNumbers.substring(3)
  }

  // Se não tiver o formato esperado, retorna apenas os números com 55 no início
  return '55' + onlyNumbers
}

export const validatePhone = (phone: string) => {
  const cleanPhone = phone.replace(/\D/g, '')
  const phoneRegex = /^(?:55)?\d{2}\d{8,11}$/
  return phoneRegex.test(cleanPhone)
}

export const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

export interface DecodedToken {
  company: string
  firstLogin: boolean
  permissionLevel: number
  iat: number
  exp: number
  sub: string
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const payload = JSON.parse(window.atob(base64))
    return payload
  } catch {
    return null
  }
}

export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true

  const decoded = decodeToken(token)
  if (!decoded) return true

  // exp está em segundos, convertemos para milissegundos
  const expirationTime = decoded.exp * 1000
  const currentTime = Date.now()

  return currentTime >= expirationTime
}

export const getTimeUntilExpiration = (token: string | null): number => {
  if (!token) return 0

  const decoded = decodeToken(token)
  if (!decoded) return 0

  const expirationTime = decoded.exp * 1000
  const currentTime = Date.now()

  return Math.max(0, expirationTime - currentTime)
}

// Verifica se o token vai expirar em breve (ex: próximos 5 minutos)
export const isTokenExpiringSoon = (
  token: string | null,
  minutesThreshold = 5
): boolean => {
  const timeUntilExpiration = getTimeUntilExpiration(token)
  const threshold = minutesThreshold * 60 * 1000 // converte minutos para milissegundos

  return timeUntilExpiration > 0 && timeUntilExpiration < threshold
}


export const getPasswordValidation = (password: string) => {
  return {
    hasMinLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasSymbol: /[^A-Za-z0-9]/.test(password),
    isValid:
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[^A-Za-z0-9]/.test(password),
  }
}
