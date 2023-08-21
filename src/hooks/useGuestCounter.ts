import { reactive } from 'vue'

export const useGuests = () => {
  type GuestValue = {
    title: string
    anchor: string
    subtitle: string
    counter: number
    disabledNext?: boolean
  }

  const guestValues = reactive<GuestValue[]>([
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

  const getItemByAnchor = (anchor: string) => {
    return guestValues.find((item) => item.anchor === anchor)
  }

  const resetCounters = () => {
    const adultCounter = getItemByAnchor('adult')?.counter

    if (!adultCounter) {
      guestValues.forEach((item) => {
        if (item.anchor !== 'adult') {
          item.counter = 0
        }
      })
    } else {
      guestValues.forEach((item) => {
        if (item.anchor !== 'adult') {
          item.disabledNext = false
        }
      })
    }
  }

  const handleMinus = (anchor: string) => {
    const item = getItemByAnchor(anchor)
    if (item && item.counter > 0) {
      item.counter--
    }
    resetCounters()
  }

  const handlePlus = (anchor: string) => {
    const item = getItemByAnchor(anchor)
    if (item && item.counter < 5) {
      item.counter++
    }
    resetCounters()
  }

  return {
    guestValues,
    handleMinus,
    handlePlus
  }
}
