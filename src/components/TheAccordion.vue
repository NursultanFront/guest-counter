<template>
  <div class="accordion">
    <div class="accordion-label" @click="toggle">
      <slot name="value" :placeholder="props.placeholder" :value="props.value">
        <div class="accrodion-preview">
          <div class="accrodion-preview__placeholder">{{ props.placeholder }}</div>
          <div class="accrodion-preview__value">{{ props.value }}</div>
        </div>
      </slot>
    </div>
    <div
      v-if="isExpanded"
      class="accordion-content"
      :class="{ 'accordion-content_visible': isExpanded }"
    >
      <UiInput
        v-if="isSearchable"
        v-model="searchText"
        placeholder="Поиск..."
        class="accordion-search"
      />
      <slot>
        <div
          v-for="(item, index) in items"
          :key="item.label"
          class="content-item"
          :class="{ 'content-item_darken': index % 2 === 0 && props.isZebraItems }"
        >
          <div v-if="item.label && item.label.length > 0" class="content-item__placeholder">
            {{ item.label }}
          </div>
          <div class="content-item__value">{{ item.value }}</div>
        </div>
      </slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'

interface IItem {
  label?: string
  value: string
}

interface IProps {
  placeholder: string
  value: string
  list: IItem[]
  isSearchable?: boolean
  isZebraItem?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  list: () => [],
  isZebraItems: true
})

const searchText = ref<string>('')

const isExpanded = ref<boolean>(false)

const toggle = () => (isExpanded.value = !isExpanded.value)

const items = computed(() => {
  const hasSearchText = searchText.value && searchText.value.length > 0

  let newList: IItem[] = props.list

  if (hasSearchText) {
    const searchQuery = searchText.value

    newList = newList.filter(({ label, value }) => {
      const lowercaseLabel = label?.toLocaleLowerCase() ?? ''
      const lowercaseValue = value.toLocaleLowerCase()

      return lowercaseLabel.includes(searchQuery) || lowercaseValue.includes(searchQuery)
    })
  }

  return newList
})
</script>
<style lang="scss">
.accordion {
  min-width: px-to-rem(200px);

  // TODO: theme var
  // @include border(1px, #e1e1e1);
  border: 1px solid #e1e1e1;
  border-radius: 15px;
}

.content-item {
  padding: 5px 20px;
}

.accrodion-preview,
.content-item {
  flex: 1 0;

  &__placeholder {
    color: var(--vkd-black-100);
  }

  &__value {
    color: var(--vkd-black-900);
  }

  &_darken {
    // TODO: theme variable
    background-color: #eef6f7;

    &:last-child {
      border-bottom-left-radius: 15px;
      border-bottom-right-radius: 15px;
    }
  }
}

.accordion-label {
  display: flex;
  align-items: center;

  // @include padding(20px);
  padding: 20px;

  &__icon {
    width: px-to-rem(24px);
    height: px-to-rem(24px);
    min-width: px-to-rem(24px);

    &_up {
      transform: rotate(180deg);
    }
  }
}

.accordion-content {
  padding-bottom: px-to-rem(10px);
}

.accordion-search {
  margin-bottom: px-to-rem(17px);

  // @include padding(0px, 20px);
  padding: 0 20px;
}
</style>
