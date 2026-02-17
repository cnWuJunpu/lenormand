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

export const cards = cardData.map((card) => ({
	...card,
	image: `/cards-akashic/${String(card.id).padStart(2, "0")}.png`,
}));

export const spreadTypes = {
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

export function getHouseCard(position) {
	if (position < 1 || position > 36) return null;
	return cards[position - 1];
}

export const natureLabels = {
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
