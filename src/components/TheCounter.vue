<template>
  <div class="counter">
    <button class="counter__button" :disabled="!canDecrease" @click="minus">-</button>
    <div class="counter__value">
      <slot>
        {{ counterValue }}
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
  modelValue: number
  incrementBy?: number
  min?: number
  max?: number
}

const props = withDefaults(defineProps<IProps>(), {
  min: 0,
  incrementBy: 1,
  isIncreaseDisabled: false,
  isDecreaseDisabled: false
})
const emit = defineEmits<{ (event: 'update:modelValue', value: number): void }>()

const INCREMENT_BY = props.incrementBy
const counterValue = computed({
  get() {
    return props.modelValue ?? 0
  },
  set(value: number) {
    return emit('update:modelValue', value)
  }
})
const { handleMinus, handlePlus, canDecrease, canIncrease } = useCounter(
  counterValue,
  props.max,
  props.min
)
const plus = () => {
  counterValue.value = handlePlus(INCREMENT_BY)
}
const minus = () => {
  counterValue.value = handleMinus(INCREMENT_BY)
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
