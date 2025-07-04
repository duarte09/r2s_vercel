import {
  getTimeUntilExpiration,
  isTokenExpired,
  isTokenExpiringSoon,
} from '@/lib/utils'
import { useAppSelector } from '@/store'
import {
  addMilliseconds,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInSeconds,
  differenceInYears,
  formatDistanceToNow,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useEffect, useState } from 'react'

export function useTokenValidation() {
  const refresh_token = useAppSelector((state) => state.auth.refresh_token)
  const [isExpired, setIsExpired] = useState(false)
  const [isExpiringSoon, setIsExpiringSoon] = useState(false)
  const [timeUntilExpiration, setTimeUntilExpiration] = useState<number>(0)

  useEffect(() => {
    const checkToken = () => {
      if (!refresh_token) {
        setIsExpired(true)
        setIsExpiringSoon(false)
        setTimeUntilExpiration(0)
        return
      }

      const expired = isTokenExpired(refresh_token)
      const expiringSoon = isTokenExpiringSoon(refresh_token)
      const timeLeft = getTimeUntilExpiration(refresh_token)

      setIsExpired(expired)
      setIsExpiringSoon(expiringSoon)
      setTimeUntilExpiration(timeLeft)
    }

    checkToken()
    const interval = setInterval(checkToken, 60000)
    return () => clearInterval(interval)
  }, [refresh_token])

  return {
    isExpired,
    isExpiringSoon,
    timeUntilExpiration,
    formattedTimeLeft: formatTimeLeft(timeUntilExpiration),
  }
}

interface TimeUnit {
  value: number
  unit: string
  priority: number
}

function formatTimeLeft(ms: number): string {
  if (ms <= 0) return 'Expirado'

  const futureDate = addMilliseconds(new Date(), ms)

  // Usando formatDistanceToNow para casos simples
  if (ms < 60000) {
    // menos de 1 minuto
    return formatDistanceToNow(futureDate, {
      locale: ptBR,
      addSuffix: false,
    })
  }

  const now = new Date()
  const timeUnits: TimeUnit[] = [
    {
      value: differenceInYears(futureDate, now),
      unit: 'ano',
      priority: 1,
    },
    {
      value: differenceInMonths(futureDate, now) % 12,
      unit: 'mês',
      priority: 2,
    },
    {
      value: differenceInDays(futureDate, now) % 30,
      unit: 'dia',
      priority: 3,
    },
    {
      value: differenceInHours(futureDate, now) % 24,
      unit: 'hora',
      priority: 4,
    },
    {
      value: differenceInMinutes(futureDate, now) % 60,
      unit: 'minuto',
      priority: 5,
    },
    {
      value: differenceInSeconds(futureDate, now) % 60,
      unit: 'segundo',
      priority: 6,
    },
  ]

  const significantUnits = timeUnits
    .filter((unit) => unit.value > 0)
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 2)
    .map(({ value, unit }) => {
      const plural =
        value === 1 ? unit : `${unit}${unit === 'mês' ? 'es' : 's'}`
      return `${value} ${plural}`
    })

  return significantUnits.join(' e ')
}

// Hook personalizado para formatar o tempo restante de forma dinâmica
export function useFormattedTimeLeft(ms: number) {
  const [formattedTime, setFormattedTime] = useState(formatTimeLeft(ms))

  useEffect(() => {
    setFormattedTime(formatTimeLeft(ms))

    // Atualiza a cada segundo para tempos curtos
    const interval = setInterval(
      () => {
        setFormattedTime(formatTimeLeft(ms))
      },
      ms < 60000 ? 1000 : 60000
    )

    return () => clearInterval(interval)
  }, [ms])

  return formattedTime
}
