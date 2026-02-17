const spreadTypes = {
	three: { name: "三张牌阵", positions: 3, layout: "horizontal" },
	five: { name: "五张牌阵", positions: 5, layout: "horizontal" },
	nine: { name: "九宫牌阵", positions: 9, layout: "grid" },
	grandTableau: {
		name: "大桌牌阵(36张)",
		positions: 36,
		layout: "grandTableau",
	},
	grandTableau40: {
		name: "大桌牌阵(40张)",
		positions: 40,
		layout: "grandTableau40",
	},
};

const cardData = [
	{
		id: 1,
		name: "骑士",
		nature: "neutral",
		description:
			"他的消息可以是正面的，负面的，也可以是正面的，或者他只是一个访客",
	},
	{
		id: 2,
		name: "四叶草",
		nature: "positive",
		description: "给解读带来好运和快乐",
	},
	{
		id: 3,
		name: "船",
		nature: "neutral",
		description: "航行、变化、过渡；它取决于周围的牌来描述它",
	},
	{
		id: 4,
		name: "房子",
		nature: "neutral",
		description:
			"消极的牌会使家庭功能失调，而积极的卡片则表示家庭幸福或只是房地产",
	},
	{
		id: 5,
		name: "树",
		nature: "neutral",
		description: "你的健康取决于这张牌周围是正面牌还是负面牌",
	},
	{
		id: 6,
		name: "云",
		nature: "negative",
		description: "总是带来麻烦、困惑或误解",
	},
	{
		id: 7,
		name: "蛇",
		nature: "negative",
		description: "谎言、欺骗和背叛的牌",
	},
	{ id: 8, name: "棺材", nature: "negative", description: "带来结局和悲伤" },
	{
		id: 9,
		name: "花",
		nature: "positive",
		description: "带来欢乐和感恩的理由",
	},
	{
		id: 10,
		name: "镰刀",
		nature: "negative",
		description: "危险、分离和事故（但在代表决策时可以是中性的）",
	},
	{
		id: 11,
		name: "鞭子",
		nature: "negative",
		description: "带来攻击性和不和谐；在它的中性状态下，可以谈论运动、清洁或性",
	},
	{
		id: 12,
		name: "鸟",
		nature: "neutral",
		description:
			"当后一张牌是消极的时候，很容易出现诽谤；有了正面的牌，鸟的喋喋不休可以是赞扬",
	},
	{
		id: 13,
		name: "小孩",
		nature: "neutral",
		description: "快乐的孩子和困难的孩子的区别就在这张牌旁边的牌上",
	},
	{
		id: 14,
		name: "狐狸",
		nature: "negative",
		description:
			"当它与雇佣我/员工/工作/营业问题无关时，它指的是操纵和偷偷摸摸（在工作环境中是中性的）",
	},
	{
		id: 15,
		name: "熊",
		nature: "neutral",
		description:
			"正面的牌会让你看起来很有教养，但负面的牌会让你提防恃强凌弱或专横的人",
	},
	{ id: 16, name: "星星", nature: "positive", description: "给人希望和指引" },
	{
		id: 17,
		name: "鹳",
		nature: "positive",
		description: "表示进步，通常是好的变化",
	},
	{
		id: 18,
		name: "狗",
		nature: "positive",
		description:
			"好的，保护性的，忠诚的朋友，但是当负面的牌在你身边时，你需要确定狗是在保护你不受它们的伤害",
	},
	{
		id: 19,
		name: "塔",
		nature: "neutral",
		description:
			"负面牌参与可以是隔离或评税员；而和积极牌在一起，你就可以赢得官司或拿到学位",
	},
	{
		id: 20,
		name: "花园",
		nature: "neutral",
		description:
			"有了积极的牌，它可以是丰饶和多产的；对于负面牌，它可能意味着一个坏的人群或坏的宣传",
	},
	{
		id: 21,
		name: "山",
		nature: "negative",
		description:
			"障碍、阻碍、挑战和困难（只有当你想躲着或不想去任何地方时才是积极的）",
	},
	{
		id: 22,
		name: "路口",
		nature: "neutral",
		description:
			"这取决于周围的正面和负面牌，以提供更多的描述或澄清这是一个好的选择还是一个坏的选择",
	},
	{
		id: 23,
		name: "老鼠",
		nature: "negative",
		description: "压力，总是蚕食，腐烂，破坏，唠叨",
	},
	{ id: 24, name: "心", nature: "positive", description: "表达激情和幸福" },
	{ id: 25, name: "戒指", nature: "positive", description: "表示完成和契合" },
	{
		id: 26,
		name: "书",
		nature: "neutral",
		description:
			"一个好的小秘密或是一个恶意的秘密，周围的牌会告诉你它是积极的还是消极的",
	},
	{
		id: 27,
		name: "信",
		nature: "neutral",
		description: "交流可以是正面的高兴的，也可以是负面的失望的",
	},
	{
		id: 28,
		name: "男人",
		nature: "neutral",
		description: "说谎者或你一生的挚爱（取决于蛇或心）；也可能只是一个符号",
	},
	{
		id: 29,
		name: "女人",
		nature: "neutral",
		description:
			"有正面的牌，她很讨人喜欢，但有负面的牌时要小心；也可能只是一个符号",
	},
	{
		id: 30,
		name: "百合",
		nature: "neutral",
		description: "积极的卡片能带来快乐和满足，但消极的牌能表明老年痴呆症",
	},
	{ id: 31, name: "太阳", nature: "positive", description: "宣布成功和胜利" },
	{
		id: 32,
		name: "月亮",
		nature: "positive",
		description: "荣誉和诱惑（但当消极牌出现时变为负面）",
	},
	{
		id: 33,
		name: "钥匙",
		nature: "positive",
		description: "解决方案和茅塞顿开的时刻",
	},
	{
		id: 34,
		name: "鱼",
		nature: "positive",
		description:
			'表示丰富、充足和倍增（当被负面因素包围时，"丰富"的鱼实际上可以倍增负面因素）',
	},
	{
		id: 35,
		name: "锚",
		nature: "positive",
		description:
			"稳定性、安全性（但如果负面牌在周围，可能会被压下、被束缚或被重压）",
	},
	{
		id: 36,
		name: "十字架",
		nature: "negative",
		description: "痛苦、悲伤、负担（当它代表信仰和宗教时可以是中性的）",
	},
];

const cards = cardData.map((card) => ({
	...card,
	image: `./cards-akashic/${String(card.id).padStart(2, "0")}.png`,
}));

const natureLabels = {
	positive: {
		label: "积极",
		color: "#27ae60",
		bgColor: "rgba(39, 174, 96, 0.15)",
	},
	negative: {
		label: "消极",
		color: "#e74c3c",
		bgColor: "rgba(231, 76, 60, 0.15)",
	},
	neutral: {
		label: "中性",
		color: "#f39c12",
		bgColor: "rgba(243, 156, 18, 0.15)",
	},
};

function getHouseCard(position) {
	if (position < 1 || position > 36) return null;
	return cards[position - 1];
}

function getNatureInfo(card) {
	if (!card?.nature) return null;
	return natureLabels[card.nature];
}

let currentSpread = "grandTableau";
let placedCards = [];
let selectedPosition = null;
let selectedCard = null;

function getUsedCardIds() {
	return placedCards.map((p) => p.card.id);
}

function getCardAtPosition(position) {
	return placedCards.find((p) => p.position === position)?.card || null;
}

function isGrandTableau() {
	return currentSpread === "grandTableau" || currentSpread === "grandTableau40";
}

function renderDeck() {
	const deckGrid = document.getElementById("deckGrid");
	const usedIds = getUsedCardIds();

	deckGrid.innerHTML = cards
		.map((card) => {
			const natureInfo = getNatureInfo(card);
			return `
      <div class="deck-card ${usedIds.includes(card.id) ? "used" : ""} ${card.nature}" 
           data-card-id="${card.id}"
           draggable="${!usedIds.includes(card.id)}">
        <img src="${card.image}" alt="${card.name}" class="deck-card-image">
        <div class="deck-card-nature" style="background-color: ${natureInfo.bgColor}; color: ${natureInfo.color}">
          ${natureInfo.label}
        </div>
        <div class="deck-card-label">${card.id}</div>
      </div>
    `;
		})
		.join("");

	deckGrid.querySelectorAll(".deck-card:not(.used)").forEach((el) => {
		el.addEventListener("click", () =>
			handleCardSelect(parseInt(el.dataset.cardId)),
		);
		el.addEventListener("dragstart", (e) => {
			e.dataTransfer.setData("cardId", el.dataset.cardId);
		});
	});
}

function renderSlot(position, showPosition = false) {
	const card = getCardAtPosition(position);
	const isSelected = selectedPosition === position;
	const houseCard = showPosition ? getHouseCard(position) : null;
	const natureInfo = card ? getNatureInfo(card) : null;

	return `
    <div class="card-slot-wrapper">
      <div class="card-slot ${card ? "has-card" : ""} ${isSelected ? "selected" : ""}" 
           data-position="${position}">
        ${
					card
						? `
          <div class="card-content">
            <img src="${card.image}" alt="${card.name}" class="card-image">
            ${
							natureInfo
								? `
              <div class="nature-badge" style="background-color: ${natureInfo.bgColor}; color: ${natureInfo.color}">
                ${natureInfo.label}
              </div>
            `
								: ""
						}
          </div>
        `
						: `
          <div class="empty-slot">
            <span class="position-number">${position}</span>
          </div>
        `
				}
      </div>
      ${
				showPosition && houseCard
					? `
        <div class="house-info">
          <span class="house-label">${String(houseCard.id).padStart(2, "0")}. ${houseCard.name}</span>
        </div>
      `
					: ""
			}
      ${
				card && showPosition
					? `
        <div class="card-info">
          <span class="card-label">→ ${card.id}. ${card.name}</span>
        </div>
      `
					: ""
			}
      ${
				card && !showPosition
					? `
        <div class="card-info">
          <span class="card-label">${card.id}. ${card.name}</span>
        </div>
      `
					: ""
			}
      ${
				showPosition && !card && !houseCard
					? `
        <div class="position-info">
          <span class="position-label">${position}</span>
        </div>
      `
					: ""
			}
    </div>
  `;
}

function renderSpread() {
	const container = document.getElementById("spreadContainer");
	const spread = spreadTypes[currentSpread];
	const showPos = isGrandTableau();

	if (currentSpread === "three" || currentSpread === "five") {
		let html = `<div class="spread horizontal">`;
		for (let i = 1; i <= spread.positions; i++) {
			html += renderSlot(i, false);
		}
		html += "</div>";
		container.innerHTML = html;
	} else if (currentSpread === "nine") {
		let html = `<div class="spread grid-3x3">`;
		for (let i = 1; i <= 9; i++) {
			html += renderSlot(i, false);
		}
		html += "</div>";
		container.innerHTML = html;
	} else if (currentSpread === "grandTableau") {
		let html = '<div class="spread grand-tableau">';
		for (let row = 0; row < 4; row++) {
			html += '<div class="gt-row">';
			for (let col = 1; col <= 8; col++) {
				html += renderSlot(row * 8 + col, true);
			}
			html += "</div>";
		}
		html += '<div class="gt-row center-row">';
		for (let col = 33; col <= 36; col++) {
			html += renderSlot(col, true);
		}
		html += "</div></div>";
		container.innerHTML = html;
	} else if (currentSpread === "grandTableau40") {
		let html = '<div class="spread grand-tableau">';
		for (let row = 0; row < 5; row++) {
			html += '<div class="gt-row">';
			for (let col = 1; col <= 8; col++) {
				html += renderSlot(row * 8 + col, true);
			}
			html += "</div>";
		}
		html += "</div>";
		container.innerHTML = html;
	}

	container.querySelectorAll(".card-slot").forEach((el) => {
		el.addEventListener("click", () =>
			handleSlotClick(parseInt(el.dataset.position)),
		);
		el.addEventListener("dragover", (e) => e.preventDefault());
		el.addEventListener("drop", (e) => {
			e.preventDefault();
			const cardId = parseInt(e.dataTransfer.getData("cardId"));
			handleSlotDrop(parseInt(el.dataset.position), cardId);
		});
	});
}

function updateUI() {
	document.getElementById("spreadName").textContent =
		spreadTypes[currentSpread].name;

	const hint = document.getElementById("selectedHint");
	if (selectedCard) {
		hint.textContent = `已选择: ${selectedCard.name} (点击位置放置)`;
		hint.style.display = "inline";
	} else if (selectedPosition) {
		hint.textContent = `已选择位置 ${selectedPosition} (点击牌库中的牌)`;
		hint.style.display = "inline";
	} else {
		hint.style.display = "none";
	}

	document.querySelectorAll(".spread-btn").forEach((btn) => {
		btn.classList.toggle("active", btn.dataset.spread === currentSpread);
	});

	renderDeck();
	renderSpread();
}

function handleSlotClick(position) {
	if (selectedCard) {
		placeCard(position, selectedCard);
		selectedCard = null;
	} else {
		selectedPosition = selectedPosition === position ? null : position;
		const existing = placedCards.find((p) => p.position === position);
		if (existing) {
			placedCards = placedCards.filter((p) => p.position !== position);
		}
	}
	updateUI();
}

function handleSlotDrop(position, cardId) {
	const card = cards.find((c) => c.id === cardId);
	const usedIds = getUsedCardIds();

	if (card && !usedIds.includes(cardId)) {
		placedCards = placedCards.filter((p) => p.position !== position);
		placedCards.push({ position, card });
		updateUI();
	}
}

function handleCardSelect(cardId) {
	const card = cards.find((c) => c.id === cardId);

	if (selectedPosition !== null) {
		placeCard(selectedPosition, card);
		selectedPosition = null;
	} else {
		selectedCard = selectedCard?.id === cardId ? null : card;
	}
	updateUI();
}

function placeCard(position, card) {
	placedCards = placedCards.filter((p) => p.position !== position);
	placedCards = placedCards.filter((p) => p.card.id !== card.id);
	placedCards.push({ position, card });
}

function selectSpread(spreadType) {
	currentSpread = spreadType;
	clearSpread();
}

function clearSpread() {
	placedCards = [];
	selectedPosition = null;
	selectedCard = null;
	updateUI();
}

function randomDraw() {
	clearSpread();
	const totalPositions = spreadTypes[currentSpread].positions;
	const shuffled = [...cards].sort(() => Math.random() - 0.5);

	for (let i = 0; i < totalPositions; i++) {
		placedCards.push({
			position: i + 1,
			card: shuffled[i],
		});
	}
	updateUI();
}

async function takeScreenshot() {
	const imageData = await generateScreenshot(false);
	if (imageData) {
		showPreviewModal(imageData);
	}
}

async function generateScreenshot(withNotes) {
	const container = document.getElementById("spreadContainer");
	const spreadEl = container?.querySelector(".spread");
	if (!spreadEl) return null;

	const notesText = document.getElementById("notesInput")?.value?.trim() || "";

	if (withNotes && notesText) {
		const wrapper = document.createElement("div");
		wrapper.style.cssText =
			"background: #1a1a2e; padding: 20px; display: inline-block;";

		const spreadClone = spreadEl.cloneNode(true);
		wrapper.appendChild(spreadClone);

		const notesDiv = document.createElement("div");
		notesDiv.style.cssText =
			"margin-top: 16px; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 8px; color: #d4af37; font-size: 14px; line-height: 1.6; white-space: pre-wrap; max-width: " +
			spreadEl.offsetWidth +
			"px;";
		notesDiv.textContent = notesText;
		wrapper.appendChild(notesDiv);

		document.body.appendChild(wrapper);

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

function showPreviewModal(imageData) {
	const overlay = document.getElementById("previewOverlay");
	const previewImage = document.getElementById("previewImage");

	previewImage.src = imageData;
	overlay.style.display = "flex";
}

function closePreviewModal() {
	const overlay = document.getElementById("previewOverlay");
	const previewImage = document.getElementById("previewImage");

	overlay.style.display = "none";
	previewImage.src = "";
}

async function updatePreviewWithNotes() {
	const includeNotes =
		document.getElementById("includeNotes")?.checked ?? false;
	try {
		const imageData = await generateScreenshot(includeNotes);
		if (imageData) {
			document.getElementById("previewImage").src = imageData;
		}
	} catch (err) {
		console.error("更新预览失败:", err);
	}
}

async function downloadPreviewImage() {
	const includeNotes =
		document.getElementById("includeNotes")?.checked ?? false;
	try {
		const imageData = await generateScreenshot(includeNotes);
		if (!imageData) return;

		const link = document.createElement("a");
		link.download = `lenormand-${currentSpread}-${Date.now()}.png`;
		link.href = imageData;
		link.click();
		closePreviewModal();
	} catch (err) {
		console.error("下载失败:", err);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll(".spread-btn").forEach((btn) => {
		btn.addEventListener("click", () => selectSpread(btn.dataset.spread));
	});

	document.getElementById("randomBtn").addEventListener("click", randomDraw);
	document.getElementById("clearBtn").addEventListener("click", clearSpread);
	document
		.getElementById("screenshotBtn")
		.addEventListener("click", takeScreenshot);

	document
		.getElementById("previewClose")
		.addEventListener("click", closePreviewModal);
	document
		.getElementById("previewCancel")
		.addEventListener("click", closePreviewModal);
	document
		.getElementById("previewDownload")
		.addEventListener("click", downloadPreviewImage);
	document
		.getElementById("includeNotes")
		.addEventListener("change", updatePreviewWithNotes);
	document.getElementById("previewOverlay").addEventListener("click", (e) => {
		if (e.target.id === "previewOverlay") {
			closePreviewModal();
		}
	});

	updateUI();
});
