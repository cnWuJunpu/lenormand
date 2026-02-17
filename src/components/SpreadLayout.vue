<script setup>
import CardSlot from './CardSlot.vue'
import { getHouseCard } from '../data/cards.js'

const props = defineProps({
  spreadType: {
    type: String,
    required: true
  },
  placedCards: {
    type: Array,
    default: () => []
  },
  selectedPosition: {
    type: Number,
    default: null
  }
})

const emit = defineEmits(['slot-click', 'slot-drop'])

function getCardAtPosition(position) {
  return props.placedCards.find(p => p.position === position)?.card || null
}

function isGrandTableau() {
  return props.spreadType === 'grandTableau' || props.spreadType === 'grandTableau40'
}
</script>

<template>
  <div class="spread-container" :class="spreadType">
    <div v-if="spreadType === 'three'" class="spread horizontal">
      <CardSlot
        v-for="pos in 3"
        :key="pos"
        :position="pos"
        :card="getCardAtPosition(pos)"
        :is-selected="selectedPosition === pos"
        @click="$emit('slot-click', pos)"
        @drop="(cardId) => $emit('slot-drop', pos, cardId)"
      />
    </div>

    <div v-else-if="spreadType === 'five'" class="spread horizontal">
      <CardSlot
        v-for="pos in 5"
        :key="pos"
        :position="pos"
        :card="getCardAtPosition(pos)"
        :is-selected="selectedPosition === pos"
        @click="$emit('slot-click', pos)"
        @drop="(cardId) => $emit('slot-drop', pos, cardId)"
      />
    </div>

    <div v-else-if="spreadType === 'nine'" class="spread grid-3x3">
      <CardSlot
        v-for="pos in 9"
        :key="pos"
        :position="pos"
        :card="getCardAtPosition(pos)"
        :is-selected="selectedPosition === pos"
        @click="$emit('slot-click', pos)"
        @drop="(cardId) => $emit('slot-drop', pos, cardId)"
      />
    </div>

    <div v-else-if="spreadType === 'grandTableau'" class="spread grand-tableau">
      <div class="gt-row" v-for="row in 4" :key="'row-' + row">
        <CardSlot
          v-for="col in 8"
          :key="'col-' + col"
          :position="(row - 1) * 8 + col"
          :card="getCardAtPosition((row - 1) * 8 + col)"
          :is-selected="selectedPosition === (row - 1) * 8 + col"
          :show-position="true"
          :house-card="getHouseCard((row - 1) * 8 + col)"
          @click="$emit('slot-click', (row - 1) * 8 + col)"
          @drop="(cardId) => $emit('slot-drop', (row - 1) * 8 + col, cardId)"
        />
      </div>
      <div class="gt-row center-row">
        <CardSlot
          v-for="col in 4"
          :key="'last-col-' + col"
          :position="32 + col"
          :card="getCardAtPosition(32 + col)"
          :is-selected="selectedPosition === 32 + col"
          :show-position="true"
          :house-card="getHouseCard(32 + col)"
          @click="$emit('slot-click', 32 + col)"
          @drop="(cardId) => $emit('slot-drop', 32 + col, cardId)"
        />
      </div>
    </div>

    <div v-else-if="spreadType === 'grandTableau40'" class="spread grand-tableau">
      <div class="gt-row" v-for="row in 5" :key="'row-' + row">
        <CardSlot
          v-for="col in 8"
          :key="'col-' + col"
          :position="(row - 1) * 8 + col"
          :card="getCardAtPosition((row - 1) * 8 + col)"
          :is-selected="selectedPosition === (row - 1) * 8 + col"
          :show-position="true"
          :house-card="getHouseCard((row - 1) * 8 + col)"
          @click="$emit('slot-click', (row - 1) * 8 + col)"
          @drop="(cardId) => $emit('slot-drop', (row - 1) * 8 + col, cardId)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.spread-container {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.spread {
  display: flex;
  gap: 12px;
}

.spread.horizontal {
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.spread.grid-3x3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.grand-tableau {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.gt-row {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.center-row {
  padding-top: 8px;
}
</style>
