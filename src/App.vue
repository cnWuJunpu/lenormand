<script setup>
import { ref, computed, nextTick } from "vue";
import html2canvas from "html2canvas";
import { cards, spreadTypes } from "./data/cards";
import SpreadLayout from "./components/SpreadLayout.vue";
import CardDeck from "./components/CardDeck.vue";

const currentSpread = ref("grandTableau");
const placedCards = ref([]);
const selectedPosition = ref(null);
const selectedCard = ref(null);
const spreadContainerRef = ref(null);
const showPreview = ref(false);
const previewImage = ref("");
const notesText = ref("");
const includeNotes = ref(true);

const usedCardIds = computed(() => {
	return placedCards.value.map((p) => p.card.id);
});

const currentSpreadInfo = computed(() => {
	return spreadTypes[currentSpread.value];
});

function selectSpread(spreadType) {
	currentSpread.value = spreadType;
	clearSpread();
}

function clearSpread() {
	placedCards.value = [];
	selectedPosition.value = null;
	selectedCard.value = null;
}

function handleSlotClick(position) {
	if (selectedCard.value) {
		placeCard(position, selectedCard.value);
		selectedCard.value = null;
	} else {
		selectedPosition.value =
			selectedPosition.value === position ? null : position;
		const existing = placedCards.value.find((p) => p.position === position);
		if (existing) {
			placedCards.value = placedCards.value.filter(
				(p) => p.position !== position,
			);
		}
	}
}

function handleSlotDrop(position, cardId) {
	const card = cards.find((c) => c.id === cardId);
	if (card && !usedCardIds.value.includes(cardId)) {
		placedCards.value = placedCards.value.filter(
			(p) => p.position !== position,
		);
		placedCards.value.push({ position, card });
	}
}

function handleCardSelect(card) {
	if (selectedPosition.value !== null) {
		placeCard(selectedPosition.value, card);
		selectedPosition.value = null;
	} else {
		selectedCard.value = selectedCard.value?.id === card.id ? null : card;
	}
}

function placeCard(position, card) {
	placedCards.value = placedCards.value.filter((p) => p.position !== position);
	placedCards.value = placedCards.value.filter((p) => p.card.id !== card.id);
	placedCards.value.push({ position, card });
}

function randomDraw() {
	clearSpread();
	const totalPositions = currentSpreadInfo.value.positions;
	const shuffled = [...cards].sort(() => Math.random() - 0.5);

	for (let i = 0; i < totalPositions; i++) {
		placedCards.value.push({
			position: i + 1,
			card: shuffled[i],
		});
	}
}

async function takeScreenshot() {
	if (!spreadContainerRef.value) return;

	const spreadEl = spreadContainerRef.value.querySelector(".spread");
	if (!spreadEl) return;

	try {
		const rect = spreadEl.getBoundingClientRect();
		const padding = 20;

		const canvas = await html2canvas(spreadEl, {
			backgroundColor: "#1a1a2e",
			scale: 2,
			x: -padding,
			y: -padding,
			width: rect.width + padding * 2,
			height: rect.height + padding * 2,
		});

		previewImage.value = canvas.toDataURL("image/png");
		showPreview.value = true;
	} catch (err) {
		console.error("截图失败:", err);
	}
}

async function generateScreenshot(withNotes) {
	if (!spreadContainerRef.value) return null;

	const spreadEl = spreadContainerRef.value.querySelector(".spread");
	if (!spreadEl) return null;

	if (withNotes && notesText.value.trim()) {
		const wrapper = document.createElement("div");
		wrapper.style.cssText = "background: #1a1a2e; padding: 20px; display: inline-block;";
		
		const spreadClone = spreadEl.cloneNode(true);
		wrapper.appendChild(spreadClone);
		
		const notesDiv = document.createElement("div");
		notesDiv.style.cssText = "margin-top: 16px; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 8px; color: #d4af37; font-size: 14px; line-height: 1.6; white-space: pre-wrap; max-width: " + spreadEl.offsetWidth + "px;";
		notesDiv.textContent = notesText.value;
		wrapper.appendChild(notesDiv);
		
		document.body.appendChild(wrapper);
		
		await nextTick();
		
		try {
			const canvas = await html2canvas(wrapper, {
				backgroundColor: "#1a1a2e",
				scale: 2,
			});
			document.body.removeChild(wrapper);
			return canvas.toDataURL("image/png");
		} catch (err) {
			document.body.removeChild(wrapper);
			throw err;
		}
	} else {
		const rect = spreadEl.getBoundingClientRect();
		const padding = 20;

		const canvas = await html2canvas(spreadEl, {
			backgroundColor: "#1a1a2e",
			scale: 2,
			x: -padding,
			y: -padding,
			width: rect.width + padding * 2,
			height: rect.height + padding * 2,
		});
		return canvas.toDataURL("image/png");
	}
}

async function downloadImage() {
	try {
		const imageData = await generateScreenshot(includeNotes.value);
		if (!imageData) return;
		
		const link = document.createElement("a");
		link.download = `lenormand-${currentSpread.value}-${Date.now()}.png`;
		link.href = imageData;
		link.click();
		closePreview();
	} catch (err) {
		console.error("下载失败:", err);
	}
}

async function toggleIncludeNotes() {
	if (!showPreview.value) return;
	try {
		const imageData = await generateScreenshot(includeNotes.value);
		if (imageData) {
			previewImage.value = imageData;
		}
	} catch (err) {
		console.error("更新预览失败:", err);
	}
}

function closePreview() {
	showPreview.value = false;
	previewImage.value = "";
}
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1 class="app-title">雷诺曼牌阵</h1>
      <p class="app-subtitle">Lenormand Spread Tool</p>
    </header>

    <div class="controls">
      <div class="control-group">
        <span class="control-label">牌阵:</span>
        <div class="spread-buttons">
          <button
            v-for="(info, type) in spreadTypes"
            :key="type"
            class="spread-btn"
            :class="{ active: currentSpread === type }"
            @click="selectSpread(type)"
          >
            {{ info.name }}
          </button>
        </div>
      </div>
      
      <div class="action-buttons">
        <button class="action-btn random" @click="randomDraw">
          随机抽牌
        </button>
        <button class="action-btn screenshot" @click="takeScreenshot">
          截图保存
        </button>
        <button class="action-btn clear" @click="clearSpread">
          清空牌阵
        </button>
      </div>
    </div>

    <div class="main-content">
      <div class="spread-area">
        <div class="spread-header">
          <span class="spread-name">{{ currentSpreadInfo.name }}</span>
          <span v-if="selectedCard" class="selected-hint">
            已选择: {{ selectedCard.name }} (点击位置放置)
          </span>
          <span v-else-if="selectedPosition" class="selected-hint">
            已选择位置 {{ selectedPosition }} (点击牌库中的牌)
          </span>
        </div>
        <div ref="spreadContainerRef" class="spread-container-wrapper">
          <SpreadLayout
            :spread-type="currentSpread"
            :placed-cards="placedCards"
            :selected-position="selectedPosition"
            @slot-click="handleSlotClick"
            @slot-drop="handleSlotDrop"
          />
        </div>
        
        <div class="notes-section">
          <label class="notes-label">解读笔记</label>
          <textarea 
            v-model="notesText" 
            class="notes-input" 
            placeholder="在此输入解读笔记..."
            rows="4"
          ></textarea>
        </div>
      </div>

      <aside class="deck-panel">
        <CardDeck
          :cards="cards"
          :used-card-ids="usedCardIds"
          @select-card="handleCardSelect"
        />
      </aside>
    </div>

    <footer class="app-footer">
      <p>拖拽或点击选择牌，放置到牌阵中</p>
    </footer>

    <Teleport to="body">
      <div v-if="showPreview" class="preview-overlay" @click.self="closePreview">
        <div class="preview-modal">
          <div class="preview-header">
            <h3>截图预览</h3>
            <button class="preview-close" @click="closePreview">×</button>
          </div>
          <div class="preview-content">
            <img :src="previewImage" alt="截图预览" class="preview-image" />
          </div>
          <div class="preview-options">
            <label class="checkbox-label">
              <input type="checkbox" v-model="includeNotes" @change="toggleIncludeNotes" />
              <span>包含解读笔记</span>
            </label>
          </div>
          <div class="preview-actions">
            <button class="preview-btn cancel" @click="closePreview">取消</button>
            <button class="preview-btn download" @click="downloadImage">下载</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.app-header {
  text-align: center;
  margin-bottom: 24px;
}

.app-title {
  font-size: 2.5rem;
  color: #d4af37;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  font-weight: 700;
}

.app-subtitle {
  color: #888;
  margin: 8px 0 0;
  font-size: 1rem;
  letter-spacing: 2px;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.control-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.control-label {
  color: #888;
  font-size: 0.9rem;
}

.spread-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.spread-btn {
  padding: 10px 20px;
  border: 2px solid #8e44ad;
  background: transparent;
  color: #d4af37;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.spread-btn:hover {
  background: rgba(142, 68, 173, 0.2);
}

.spread-btn.active {
  background: linear-gradient(135deg, #8e44ad, #9b59b6);
  color: white;
  box-shadow: 0 4px 15px rgba(142, 68, 173, 0.4);
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.action-btn {
  padding: 10px 24px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.action-btn.random {
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  color: white;
}

.action-btn.random:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(39, 174, 96, 0.4);
}

.action-btn.screenshot {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
}

.action-btn.screenshot:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.4);
}

.action-btn.clear {
  background: linear-gradient(135deg, #c0392b, #e74c3c);
  color: white;
}

.action-btn.clear:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(192, 57, 43, 0.4);
}

.main-content {
  display: flex;
  gap: 24px;
  flex: 1;
}

.spread-area {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.spread-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.spread-name {
  font-size: 1.2rem;
  color: #d4af37;
  font-weight: 600;
}

.selected-hint {
  font-size: 0.9rem;
  color: #9b59b6;
  background: rgba(155, 89, 182, 0.1);
  padding: 6px 12px;
  border-radius: 15px;
}

.spread-container-wrapper {
  background: rgba(26, 26, 46, 0.5);
  border-radius: 12px;
  padding: 10px;
}

.notes-section {
  margin-top: 16px;
}

.notes-label {
  display: block;
  color: #d4af37;
  font-size: 0.9rem;
  margin-bottom: 8px;
  font-weight: 500;
}

.notes-input {
  width: 100%;
  padding: 12px;
  background: rgba(26, 26, 46, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  line-height: 1.6;
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
}

.notes-input::placeholder {
  color: #666;
}

.notes-input:focus {
  outline: none;
  border-color: #8e44ad;
}

.deck-panel {
  width: 380px;
  flex-shrink: 0;
}

.app-footer {
  text-align: center;
  padding: 16px;
  color: #666;
  font-size: 0.9rem;
  margin-top: 24px;
}

.preview-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.preview-modal {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 16px;
  padding: 24px;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.preview-header h3 {
  color: #d4af37;
  margin: 0;
  font-size: 1.2rem;
}

.preview-close {
  background: none;
  border: none;
  color: #888;
  font-size: 28px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  transition: color 0.2s;
}

.preview-close:hover {
  color: #fff;
}

.preview-content {
  flex: 1;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.preview-image {
  max-width: 100%;
  max-height: 50vh;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.preview-options {
  margin-top: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #888;
  font-size: 0.9rem;
}

.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: #8e44ad;
  cursor: pointer;
}

.checkbox-label span {
  user-select: none;
}

.preview-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
}

.preview-btn {
  padding: 10px 24px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.preview-btn.cancel {
  background: rgba(255, 255, 255, 0.1);
  color: #888;
}

.preview-btn.cancel:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.preview-btn.download {
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  color: white;
}

.preview-btn.download:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(39, 174, 96, 0.4);
}

@media (max-width: 900px) {
  .main-content {
    flex-direction: column;
  }
  
  .deck-panel {
    width: 100%;
  }
  
  .controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .control-group {
    justify-content: center;
  }
  
  .spread-buttons,
  .action-buttons {
    justify-content: center;
  }
}
</style>
