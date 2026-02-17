<script setup>
import { computed } from 'vue'
import { natureLabels } from '../data/cards.js'

const props = defineProps({
  cards: {
    type: Array,
    required: true
  },
  usedCardIds: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['select-card'])

function handleDragStart(e, card) {
  e.dataTransfer.setData('cardId', card.id.toString())
}

function getNatureInfo(card) {
  if (!card?.nature) return null
  return natureLabels[card.nature]
}
</script>

<template>
  <div class="card-deck">
    <h3 class="deck-title">牌库</h3>
    <div class="deck-legend">
      <span class="legend-item positive">积极</span>
      <span class="legend-item neutral">中性</span>
      <span class="legend-item negative">消极</span>
    </div>
    <div class="deck-grid">
      <div
        v-for="card in cards"
        :key="card.id"
        class="deck-card"
        :class="{ 
          'used': usedCardIds.includes(card.id),
          'positive': card.nature === 'positive',
          'neutral': card.nature === 'neutral',
          'negative': card.nature === 'negative'
        }"
        :draggable="!usedCardIds.includes(card.id)"
        @dragstart="handleDragStart($event, card)"
        @click="!usedCardIds.includes(card.id) && $emit('select-card', card)"
      >
        <img :src="card.image" :alt="card.name" class="deck-card-image" />
        <div 
          class="deck-card-nature"
          :style="{ 
            backgroundColor: getNatureInfo(card)?.bgColor, 
            color: getNatureInfo(card)?.color 
          }"
        >
          {{ getNatureInfo(card)?.label }}
        </div>
        <div class="deck-card-label">{{ card.id }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-deck {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 12px;
  padding: 16px;
  max-height: 450px;
  overflow-y: auto;
}

.deck-title {
  color: #d4af37;
  font-size: 16px;
  margin: 0 0 8px 0;
  text-align: center;
  font-weight: 600;
}

.deck-legend {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 12px;
}

.legend-item {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 500;
}

.legend-item.positive {
  background: rgba(39, 174, 96, 0.15);
  color: #27ae60;
}

.legend-item.neutral {
  background: rgba(243, 156, 18, 0.15);
  color: #f39c12;
}

.legend-item.negative {
  background: rgba(231, 76, 60, 0.15);
  color: #e74c3c;
}

.deck-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
}

.deck-card {
  width: 50px;
  height: 70px;
  border-radius: 6px;
  overflow: hidden;
  cursor: grab;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  position: relative;
}

.deck-card:hover:not(.used) {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(155, 89, 182, 0.4);
}

.deck-card.positive:not(.used) {
  border-color: rgba(39, 174, 96, 0.5);
}

.deck-card.neutral:not(.used) {
  border-color: rgba(243, 156, 18, 0.5);
}

.deck-card.negative:not(.used) {
  border-color: rgba(231, 76, 60, 0.5);
}

.deck-card.used {
  opacity: 0.3;
  cursor: not-allowed;
}

.deck-card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.deck-card-nature {
  position: absolute;
  top: 2px;
  right: 2px;
  padding: 1px 4px;
  border-radius: 6px;
  font-size: 8px;
  font-weight: 600;
}

.deck-card-label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-size: 10px;
  text-align: center;
  padding: 2px 0;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1a1a2e;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #4a4a6a;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6a6a8a;
}
</style>
