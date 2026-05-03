<div align="center">

# 🐍 3D 胖胖蛇 — Fat Snake 3D

### 史上最強貪食蛇遊戲

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge)

<br />

一款使用純 HTML + CSS + JavaScript 打造的 3D 貪食蛇遊戲。
蛇蛇會越吃越長、越來越胖，還會眨眼、吐舌頭、臉紅腮紅！😍

[🎮 立即遊玩](#-開始遊戲) · [🐛 回報問題](../../issues) · [💡 功能建議](../../issues)

<br />

![Game Preview](https://img.shields.io/badge/👇_往下看遊戲截圖-blueviolet?style=for-the-badge)

</div>

---

## 📸 遊戲截圖

> 💡 *歡迎 fork 後補上自己的遊戲截圖！*


---

## ✨ 遊戲特色

| 特色 | 說明 |
|:-----|:-----|
| 🎨 **3D 球體蛇身** | 每節身體都是帶有光影的 3D 球體，高光、陰影、深度感一應俱全 |
| 😊 **生動表情系統** | 蛇頭會眨眼 👀、吐舌頭 👅、臉紅腮紅，超級可愛 |
| 👑 **成長系統** | 分數達標後蛇頭會戴上皇冠，越吃越霸氣 |
| 🍎 **多種水果** | 🍎 蘋果 / 🍇 葡萄 / 🍓 草莓 / 🍑 桃子 / 🍒 櫻桃，各有不同分數 |
| ⭐ **特殊道具** | 連吃 5 顆後隨機出現金色星星（50 分！），帶有旋轉光芒特效 |
| 💥 **Combo 連擊** | 連續進食觸發倍數加分（最高 5x），搭配酷炫文字提示 |
| ✨ **粒子特效** | 吃到食物時噴發彩色粒子爆炸 + 浮動分數動畫 |
| 📈 **等級系統** | 每 100 分升級，速度逐漸加快，挑戰你的極限！ |
| 🌌 **星空背景** | 會閃爍的背景星空粒子 + 浮動光點 |
| 📱 **手機支援** | 方向按鈕 + 滑動手勢，手機也能暢玩 |
| 🏆 **最高紀錄** | 自動儲存至 `localStorage`，刷新頁面也不會丟失 |
| 🎮 **穿牆模式** | 蛇可以穿越牆壁從另一邊出來！ |

---

## 🕹️ 操作方式

### ⌨️ 鍵盤

| 按鍵 | 功能 |
|:-----|:-----|
| `↑` `↓` `←` `→` | 控制方向 |
| `W` `A` `S` `D` | 控制方向（備選） |
| `空白鍵` / `Esc` | 暫停 / 繼續 |

### 📱 手機 / 平板

- **螢幕方向按鈕**：點擊上下左右箭頭
- **滑動手勢**：在遊戲畫面上滑動手指

---

## 🚀 開始遊戲

### 方法一：直接開啟

下載 `index.html` 後，用瀏覽器直接打開即可遊玩：

```bash
# Clone 專案
git clone https://github.com/你的帳號/fat-snake-3d.git

# 進入目錄
cd fat-snake-3d

# 用瀏覽器開啟（任選一種方式）
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux

### 方法二：本地伺服器
# 使用 Python
python -m http.server 8080

# 使用 Node.js (npx)
npx serve .

# 使用 PHP
php -S localhost:8080


### 方法三：GitHub Pages
Fork 這個專案
前往 Settings → Pages
Source 選擇 main 分支
幾分鐘後就能透過 https://你的帳號.github.io/fat-snake-3d/ 開始玩
