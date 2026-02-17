import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = "https://akashic-lenormand.amm.ist/media/posts/";

const cards = [
	{ num: 1, file: "A-Qia-Xi-Zhi-Yan_Lei-Nuo-Man_01-3.png" },
	{ num: 2, file: "A-Qia-Xi-Zhi-Yan_Lei-Nuo-Man_02-3.png" },
	{ num: 3, file: "A-Qia-Xi-Zhi-Yan_Lei-Nuo-Man_03-3.png" },
	{ num: 4, file: "A-Qia-Xi-Zhi-Yan_Lei-Nuo-Man_04-3.png" },
	{ num: 5, file: "A-Qia-Xi-Zhi-Yan_Lei-Nuo-Man_05-3.png" },
	{ num: 6, file: "A-Qia-Xi-Zhi-Yan_Lei-Nuo-Man_06-3.png" },
	{ num: 7, file: "A-Qia-Xi-Zhi-Yan_Lei-Nuo-Man_07-2.png" },
	{ num: 8, file: "A-Qia-Xi-Zhi-Yan_Lei-Nuo-Man_08-2.png" },
	{ num: 9, file: "A-Qia-Xi-Zhi-Yan_Lei-Nuo-Man_09-2.png" },
	{ num: 10, file: "A-Qia-Xi-Zhi-Yan_Lei-Nuo-Man_10-2.png" },
	{ num: 11, file: "A-Qia-Xi-Zhi-Yan_Lei-Nuo-Man_11-2.png" },
	{ num: 12, file: "A-Qia-Xi-Zhi-Yan_Lei-Nuo-Man_12.png" },
	{ num: 13, file: "A-Qia-Xi-Zhi-Yan_Lei-Nuo-Man_13.png" },
	{ num: 14, file: "A-Qia-Xi-Zhi-Yan_Lei-Nuo-Man_14-2.png" },
	{ num: 15, file: "A-Qia-Xi-Zhi-Yan_Lei-Nuo-Man_15-2.png" },
	{ num: 16, file: "A-Qia-Xi-Zhi-Yan_Lei-Nuo-Man_16-2.png" },
	{ num: 17, file: "A-Qia-Xi-Zhi-Yan_Lei-Nuo-Man_17-2.png" },
	{ num: 18, file: "A-Qia-Xi-Zhi-Yan_Lei-Nuo-Man_18-2.png" },
	{ num: 19, file: "A-Qia-Xi-Zhi-Yan_Lei-Nuo-Man_19-2.png" },
	{ num: 20, file: "A-Qia-Xi-Zhi-Yan_Lei-Nuo-Man_20-2.png" },
	{ num: 21, file: "A-Qia-Xi-Zhi-Yan_Lei-Nuo-Man_21-2.png" },
	{ num: 22, file: "A-Qia-Xi-Zhi-Yan_Lei-Nuo-Man_22-2.png" },
	{ num: 23, file: "A-Qia-Xi-Zhi-Yan_Lei-Nuo-Man_23.png" },
	{ num: 24, file: "A-Qia-Xi-Zhi-Yan_Lei-Nuo-Man_24-2.png" },
	{ num: 25, file: "A-Qia-Xi-Zhi-Yan_Lei-Nuo-Man_25-2.png" },
	{ num: 26, file: "A-Qia-Xi-Zhi-Yan_Lei-Nuo-Man_26-2.png" },
	{ num: 27, file: "A-Qia-Xi-Zhi-Yan_Lei-Nuo-Man_27-2.png" },
	{ num: 28, file: "A-Qia-Xi-Zhi-Yan_Lei-Nuo-Man_28-2.png" },
	{ num: 29, file: "A-Qia-Xi-Zhi-Yan_Lei-Nuo-Man_29-2.png" },
	{ num: 30, file: "A-Qia-Xi-Zhi-Yan_Lei-Nuo-Man_32-2.png" },
	{ num: 31, file: "A-Qia-Xi-Zhi-Yan_Lei-Nuo-Man_33-2.png" },
	{ num: 32, file: "A-Qia-Xi-Zhi-Yan_Lei-Nuo-Man_34-2.png" },
	{ num: 33, file: "A-Qia-Xi-Zhi-Yan_Lei-Nuo-Man_35-2.png" },
	{ num: 34, file: "A-Qia-Xi-Zhi-Yan_Lei-Nuo-Man_36-2.png" },
	{ num: 35, file: "A-Qia-Xi-Zhi-Yan_Lei-Nuo-Man_37-2.png" },
	{ num: 36, file: "A-Qia-Xi-Zhi-Yan_Lei-Nuo-Man_38-2.png" },
];

const outputDir = path.join(__dirname, "public", "cards-akashic");

if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true });
}

function downloadImage(url, filepath) {
	return new Promise((resolve, reject) => {
		const file = fs.createWriteStream(filepath);
		https
			.get(url, (response) => {
				if (response.statusCode === 301 || response.statusCode === 302) {
					downloadImage(response.headers.location, filepath)
						.then(resolve)
						.catch(reject);
					return;
				}
				response.pipe(file);
				file.on("finish", () => {
					file.close();
					resolve();
				});
			})
			.on("error", (err) => {
				fs.unlink(filepath, () => {});
				reject(err);
			});
	});
}

async function downloadAll() {
	console.log("开始下载阿卡西之眼雷诺曼牌图片...\n");

	for (const card of cards) {
		const url = `${baseUrl}${card.num}/${card.file}`;
		const paddedNum = String(card.num).padStart(2, "0");
		const filepath = path.join(outputDir, `${paddedNum}.png`);

		try {
			console.log(`下载第 ${card.num} 张...`);
			await downloadImage(url, filepath);
			console.log(`  ✓ 已保存: ${filepath}`);
		} catch (err) {
			console.error(`  ✗ 下载失败: ${err.message}`);
		}

		await new Promise((r) => setTimeout(r, 500));
	}

	console.log("\n下载完成！");
}

downloadAll();
