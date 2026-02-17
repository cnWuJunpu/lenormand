<script setup>
import { computed } from "vue";
import { natureLabels } from "../data/cards.js";

const props = defineProps({
	card: {
		type: Object,
		default: null,
	},
	position: {
		type: Number,
		required: true,
	},
	isSelected: {
		type: Boolean,
		default: false,
	},
	showPosition: {
		type: Boolean,
		default: false,
	},
	houseCard: {
		type: Object,
		default: null,
	},
});

const emit = defineEmits(["click", "drop"]);

const natureInfo = computed(() => {
	if (!props.card?.nature) return null;
	return natureLabels[props.card.nature];
});

function handleDrop(e) {
	e.preventDefault();
	const cardId = e.dataTransfer.getData("cardId");
	if (cardId) {
		emit("drop", parseInt(cardId));
	}
}

function handleDragOver(e) {
	e.preventDefault();
}
</script>

<template>
  <div class="card-slot-wrapper">
    <div 
      class="card-slot"
      :class="{ 
        'has-card': card, 
        'selected': isSelected
      }"
      @click="$emit('click', position)"
      @drop="handleDrop"
      @dragover="handleDragOver"
    >
      <div v-if="card" class="card-content">
        <img :src="card.image" :alt="card.name" class="card-image" />
        <div 
          v-if="natureInfo" 
          class="nature-badge"
          :style="{ backgroundColor: natureInfo.bgColor, color: natureInfo.color }"
        >
          {{ natureInfo.label }}
        </div>
      </div>
      <div v-else class="empty-slot">
        <span class="position-number">{{ position }}</span>
      </div>
    </div>
    <div v-if="showPosition && houseCard" class="house-info">
      <span class="house-label">{{ String(houseCard.id).padStart(2, '0') }}. {{ houseCard.name }}</span>
    </div>
    <div v-if="card && showPosition" class="card-info">
      <span class="card-label">→ {{ card.id }}. {{ card.name }}</span>
    </div>
    <div v-if="card && !showPosition" class="card-info">
      <span class="card-label">{{ card.id }}. {{ card.name }}</span>
    </div>
    <div v-if="showPosition && !card && !houseCard" class="position-info">
      <span class="position-label">{{ position }}</span>
    </div>
  </div>
</template>

<style scoped>
.card-slot-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-slot {
  width: 80px;
  height: 120px;
  border: 2px dashed #666;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
  position: relative;
}

.card-slot:hover {
  border-color: #9b59b6;
  background: rgba(155, 89, 182, 0.1);
}

.card-slot.has-card {
  border: 2px solid #8e44ad;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

.card-slot.selected {
  border-color: #e74c3c;
  box-shadow: 0 0 15px rgba(231, 76, 60, 0.5);
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 3px;
  position: relative;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.nature-badge {
  position: absolute;
  top: 4px;
  right: 4px;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 9px;
  font-weight: 600;
  cursor: help;
}

.empty-slot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.position-number {
  font-size: 24px;
  color: #555;
  font-weight: bold;
}

.house-info {
  margin-top: 4px;
  text-align: center;
}

.house-label {
  font-size: 10px;
  color: #888;
  font-weight: 500;
}

.card-info {
  margin-top: 2px;
  text-align: center;
}

.card-label {
  font-size: 10px;
  color: #d4af37;
  font-weight: 500;
}

.position-info {
  margin-top: 4px;
  text-align: center;
}

.position-label {
  font-size: 10px;
  color: #666;
  font-weight: 500;
}
</style>
