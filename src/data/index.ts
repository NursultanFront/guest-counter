import { reactive } from 'vue'

export type GuestValue = {
  title: string
  anchor: string
  subtitle: string
  counter: number
  disabledNext?: boolean
}

export const guestValues = reactive<GuestValue[]>([
  {
    title: 'Взрослые',
    anchor: 'adult',
    subtitle: 'От 13 лет',
    counter: 0
  },
  {
    title: 'Дети',
    anchor: 'children',
    subtitle: 'От 2 до 12 лет',
    counter: 0,
    disabledNext: true
  }
])
