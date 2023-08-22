import { computed, toValue, type ComputedRef } from 'vue'
export default function useCounter(
  counter: number | ComputedRef<number>,
  maxValue?: number,
  minValue?: number
) {
  // const resetCounters = () => {
  //   const adultCounter = getItemByAnchor('adult')?.counter

  //   if (!adultCounter) {
  //     data.forEach((item) => {
  //       if (item.anchor !== 'adult') {
  //         item[keyCounter] = 0
  //       }
  //     })
  //   } else {
  //     data.forEach((item) => {
  //       if (item.anchor !== 'adult') {
  //         item.disabledNext = false
  //       }
  //     })
  //   }
  // }
  const couterValue = computed(() => toValue(counter))
  const handleMinus = (decrement = 1) => {
    if (!canDecrease.value) return couterValue.value
    return couterValue.value - decrement
  }

  const handlePlus = (increment = 1) => {
    if (!canIncrease.value) return couterValue.value
    return couterValue.value + increment
  }
  const canIncrease = computed(() => {
    if (maxValue === null || maxValue === undefined) return true
    return couterValue.value < maxValue
  })

  const canDecrease = computed(() => {
    if (minValue === null || minValue === undefined) return true
    return couterValue.value > minValue
  })

  return {
    handleMinus,
    handlePlus,
    canIncrease,
    canDecrease
  }
}
