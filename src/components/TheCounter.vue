<template>
  <div class="counter">
    <button class="counter__button" :disabled="!canDecrease" @click="minus">-</button>
    <div class="counter__value">
      <slot :counter="counter">
        {{ counter }}
      </slot>
    </div>
    <button class="counter__button" :disabled="!canIncrease" @click="plus">+</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useCounter from '../hooks/useCounter'

interface IProps {
  isIncreaseDisabled?: boolean
  isDecreaseDisabled?: boolean
  modelValue: Record<string, unknown>
  min?: number
  max?: number
  keyAnchor: string
  keyCounter: string
  data: Record<string, unknown>[]
}

const props = withDefaults(defineProps<IProps>(), {
  min: 0,
  isIncreaseDisabled: false,
  isDecreaseDisabled: false
})
const emit = defineEmits<{
  (event: 'plus'): void
  (event: 'minus'): void
  (event: 'update:modelValue', value: number): void
}>()

const counter = computed({
  get() {
    return props.modelValue
  },
  set(value: number) {
    return emit('update:modelValue', value)
  }
})
const COUNTER_VALUE = 1

const { handleMinus, handlePlus, canDecrease, canIncrease } = useCounter(
  data,
  props.modelValue,
  keyAnchor,
  keyCounter
)
const plus = () => {
  counter.value = handlePlus(COUNTER_VALUE)
  emit('plus')
}

const minus = () => {
  counter.value = handleMinus(COUNTER_VALUE)
  emit('minus')
}
</script>

<style scoped lang="scss">
.counter {
  display: grid;
  grid-template-columns: repeat((3, min-content));
  gap: px-to-rem(8px);

  &__value {
    display: flex;
    align-items: center;
    justify-content: center;
    width: px-to-rem(42px);
  }

  &__text {
    color: var(--vkd-black-100);
    text-align: center;
    font-size: px-to-rem(14px);
  }

  &__button {
    background: none;
    border: none;
    font-size: px-to-rem(30px);
  }
}
</style>
