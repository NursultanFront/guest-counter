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

interface IProps {
  isIncreaseDisabled?: boolean
  isDecreaseDisabled?: boolean
  modelValue: number
  min?: number
  max?: number
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
    return props.modelValue ?? 0
  },
  set(value: number) {
    return emit('update:modelValue', value)
  }
})

const plus = () => {
  emit('plus')

  counter.value = counter.value + 1
}

const minus = () => {
  emit('minus')

  counter.value = counter.value - 1
}

const canIncrease = computed(() => {
  const isNumber = typeof props.max === 'number' && Number.isInteger(props.max)

  // Линтер подчеркиевает props.max как возможно неопределенную переменную
  // Хотя сверху есть явное вычисление типа, а ниже перед использованием проверка
  // @ts-ignore
  const isNonDefinedOrLessThenMax = !isNumber || (isNumber && counter.value < props.max)

  return !props.isIncreaseDisabled && isNonDefinedOrLessThenMax
})

const canDecrease = computed(() => !props.isDecreaseDisabled && counter.value > props.min)
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
