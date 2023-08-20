export default function useCounter(
  data: Record<string, unknown>[],
  item: Record<string, unknown>,
  keyAnchor: string,
  keyCounter: string,
  maxPlusCounter?: number
) {
  const getItemByAnchor = (anchor: string) => {
    return data.find((item) => item[keyAnchor] === anchor)
  }

  const resetCounters = () => {
    const adultCounter = getItemByAnchor('adult')?.counter

    if (!adultCounter) {
      data.forEach((item) => {
        if (item.anchor !== 'adult') {
          item[keyCounter] = 0
        }
      })
    } else {
      data.forEach((item) => {
        if (item.anchor !== 'adult') {
          item.disabledNext = false
        }
      })
    }
  }

  const handleMinus = (value: number): number => {
    if (item && item[keyCounter] && typeof item[keyCounter] === 'number' && item[keyCounter] > 0) {
      item[keyCounter] -= value
    }
    return item[keyCounter]
    // resetCounters()
  }
  const canIncrease = computed(() => {
    const isNumber = typeof maxPlusCounter === 'number' && Number.isInteger(maxPlusCounter)
    // Линтер подчеркиевает props.max как возможно неопределенную переменную
    // Хотя сверху есть явное вычисление типа, а ниже перед использованием проверка
    // @ts-ignore

    //TODO: item && item[keyCounter]
    const isNonDefinedOrLessThenMax = !isNumber || (isNumber && counter.value < maxPlusCounter)

    return !props.isIncreaseDisabled && isNonDefinedOrLessThenMax
  })

  const canDecrease = computed(() => !props.isDecreaseDisabled && counter.value > props.min)

  const handlePlus = (value: number): number => {
    if (maxPlusCounter !== undefined || maxPlusCounter !== null) {
      ///TODO
    }
    if (item && item[keyCounter] < maxPlusCounter) {
      item[keyCounter] += value
    }

    return item[keyCounter]
    // resetCounters()
  }

  return {
    handleMinus,
    handlePlus,
    resetCounters,
    canIncrease,
    canDecrease
  }
}
