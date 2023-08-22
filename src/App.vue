<script setup lang="ts">
import TheCounter from '@/components/TheCounter.vue'
import TheAccordion from '@/components/TheAccordion.vue'
import { guestValues, type GuestValue } from '@/data'
import { computed, ref, type Ref } from 'vue'

const data = ref(guestValues)

const guestCount = computed(() => {
  const adults = data.value.find((item) => item.anchor === 'adult')?.counter
  const children = data.value.find((item) => item.anchor === 'children')?.counter

  if (adults === 0) {
    return ''
  }

  let result = ''
  if (adults) result += `${adults} взр`
  if (children) result += ` + ${children} реб`
  return result.trim()
})
</script>

<template>
  <TheAccordion placeholder="Сколько гостей" :value="guestCount">
    <div class="guest-content">
      <div v-for="(item, idx) in data" :key="idx" class="guest-content__item">
        <div class="guest-content__info">
          <span class="guest-content__title">{{ item.title }}</span>
          <span class="guest-content__subtitle">{{ item.subtitle }}</span>
        </div>
        <TheCounter v-model="item.counter" :min="0" :max="5" />
      </div>
    </div>
  </TheAccordion>
</template>

<style scoped lang="scss">
.guest-content {
  // @include padding(0px, 20px);
  padding: 0 20px;

  &__item {
    display: flex;
    justify-content: space-between;
    gap: px-to-rem(50px);

    // @include padding(10px, 0px);

    padding: 10px 0px;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: px-to-rem(6px);
  }

  &__title {
    color: var(--vkd-black-main);
  }

  &__subtitle {
    color: var(--vkd-black-100);
    white-space: nowrap;
  }
}
</style>
