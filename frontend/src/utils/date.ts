import { format } from 'date-fns'

export const formatTimeToDate = (
  time: number,
  formatTime = 'HH:mm - dd/MM/yyyy'
) => {
  return format(time * 1000, formatTime)
}

export const formatDateToTime = (date: number | Date) => {
  return Math.floor(new Date(date).getTime() / 1000)
}
