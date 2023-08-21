import { type Ref, computed } from 'vue'

interface CounterDataItem {
  [key: string]: number | string | boolean
}

export default function useCounter(
  data: Ref<CounterDataItem[]>,
  item: Ref<CounterDataItem>,
  keyAnchor: string,
  keyCounter: string,
  defaultAnchorValue: string,
  maxPlusCounter?: number
) {
  const getItemByAnchor = (anchor: string) => {
    return data.value.find((dataItem) => dataItem[keyAnchor] === anchor)
  }

  const resetCounters = () => {
    const mainCounter = getItemByAnchor(defaultAnchorValue)?.[keyCounter]

    if (!mainCounter) {
      data.value.forEach((dataItem) => {
        if (dataItem[keyAnchor] !== defaultAnchorValue) {
          dataItem[keyCounter] = 0
        }
      })
    } else {
      data.value.forEach((dataItem) => {
        if (dataItem[keyAnchor] !== defaultAnchorValue) {
          dataItem.disabledNext = false
        }
      })
    }
  }

  const handleMinus = (value: number): number => {
    if ((item.value[keyCounter] as number) > 0) {
      item.value[keyCounter] = (item.value[keyCounter] as number) - value
    }
    return item.value[keyCounter] as number
  }

  const handlePlus = (value: number): number => {
    if (
      typeof maxPlusCounter === 'undefined' ||
      (item.value[keyCounter] as number) < maxPlusCounter
    ) {
      item.value[keyCounter] = (item.value[keyCounter] as number) + value
    }

    return item.value[keyCounter] as number
  }

  const canIncrease = computed(() => {
    const isNumber = typeof maxPlusCounter === 'number'
    return !isNumber || (isNumber && (item.value[keyCounter] as number) < maxPlusCounter)
  })

  const canDecrease = computed(() => (item.value[keyCounter] as number) > 0)

  return {
    handleMinus,
    handlePlus,
    resetCounters,
    canIncrease,
    canDecrease
  }
}
