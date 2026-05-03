// =============================================
//  CANVAS & CONSTANTS
// =============================================
const canvas  = document.getElementById('gameCanvas');
const ctx     = canvas.getContext('2d');
const W       = canvas.width;
const H       = canvas.height;
const CELL    = 32;
const COLS    = 20;
const ROWS    = 20;

function resizeCanvas() {
  const m = Math.min(window.innerWidth - 20, 640);
  canvas.style.width  = m + 'px';
  canvas.style.height = (640 * m / 640) + 'px';
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// =============================================
//  FRUIT DATABASE — 水果系統
// =============================================
const RARITY = {
  COMMON:    { label: '普通', color: '#aaa',    glow: 'rgba(170,170,170,.3)',  weight: 50   },
  UNCOMMON:  { label: '優良', color: '#4CAF50', glow: 'rgba(76,175,80,.4)',    weight: 28   },
  RARE:      { label: '稀有', color: '#2196F3', glow: 'rgba(33,150,243,.5)',   weight: 14   },
  EPIC:      { label: '史詩', color: '#9C27B0', glow: 'rgba(156,39,176,.5)',   weight: 6    },
  LEGENDARY: { label: '傳說', color: '#FF9800', glow: 'rgba(255,152,0,.5)',    weight: 4    },
  MYTHIC:    { label: '神話', color: '#F44336', glow: 'rgba(244,67,54,.6)',    weight: 1.5  },
  DIVINE:    { label: '至高', color: '#FFD700', glow: 'rgba(255,215,0,.6)',    weight: 0.5  },
};

// Effect types
const FX = {
  NONE:    'none',
  SPEED:   'speed',
  SLOW:    'slow',
  SHRINK:  'shrink',
  MAGNET:  'magnet',
  GHOST:   'ghost',
  SCORE2X: 'score2x',
  BOMB:    'bomb',
};

const FRUITS = [
  // ───── 普通 COMMON ─────
  { emoji:'🍎', name:'蘋果',     color:'#FF4444', glow:'#FF0000', pts:10,  rarity:'COMMON',    effect:'NONE',    desc:'基本水果' },
  { emoji:'🍐', name:'梨子',     color:'#C8E64A', glow:'#A8C62A', pts:10,  rarity:'COMMON',    effect:'NONE',    desc:'清甜爽口' },
  { emoji:'🍊', name:'橘子',     color:'#FF9800', glow:'#F57C00', pts:10,  rarity:'COMMON',    effect:'NONE',    desc:'酸酸甜甜' },
  { emoji:'🍋', name:'檸檬',     color:'#FFEB3B', glow:'#FBC02D', pts:10,  rarity:'COMMON',    effect:'NONE',    desc:'酸到瞇眼' },
  { emoji:'🍌', name:'香蕉',     color:'#FFE082', glow:'#FFB300', pts:10,  rarity:'COMMON',    effect:'NONE',    desc:'補充能量' },
  { emoji:'🥝', name:'奇異果',   color:'#8BC34A', glow:'#689F38', pts:12,  rarity:'COMMON',    effect:'NONE',    desc:'綠色維他命' },
  { emoji:'🍉', name:'西瓜',     color:'#EF5350', glow:'#E53935', pts:12,  rarity:'COMMON',    effect:'NONE',    desc:'消暑聖品' },
  { emoji:'🍈', name:'哈密瓜',   color:'#FFE0B2', glow:'#FFB74D', pts:12,  rarity:'COMMON',    effect:'NONE',    desc:'香甜多汁' },

  // ───── 優良 UNCOMMON ─────
  { emoji:'🍇', name:'葡萄',     color:'#9B59B6', glow:'#8E44AD', pts:15,  rarity:'UNCOMMON',  effect:'NONE',    desc:'一串好運' },
  { emoji:'🍓', name:'草莓',     color:'#E74C3C', glow:'#C0392B', pts:15,  rarity:'UNCOMMON',  effect:'NONE',    desc:'少女最愛' },
  { emoji:'🍑', name:'桃子',     color:'#FFAB91', glow:'#FF7043', pts:15,  rarity:'UNCOMMON',  effect:'NONE',    desc:'甜蜜蜜' },
  { emoji:'🫐', name:'藍莓',     color:'#5C6BC0', glow:'#3949AB', pts:15,  rarity:'UNCOMMON',  effect:'NONE',    desc:'超級食物' },
  { emoji:'🥭', name:'芒果',     color:'#FFB300', glow:'#FF8F00', pts:16,  rarity:'UNCOMMON',  effect:'NONE',    desc:'熱帶之王' },
  { emoji:'🍍', name:'鳳梨',     color:'#FDD835', glow:'#F9A825', pts:16,  rarity:'UNCOMMON',  effect:'NONE',    desc:'酸甜好滋味' },
  { emoji:'🥥', name:'椰子',     color:'#D7CCC8', glow:'#A1887F', pts:16,  rarity:'UNCOMMON',  effect:'NONE',    desc:'南國風情' },

  // ───── 稀有 RARE ─────
  { emoji:'🍒', name:'櫻桃',     color:'#FF1744', glow:'#D50000', pts:25,  rarity:'RARE',      effect:'NONE',    desc:'雙倍甜蜜' },
  { emoji:'🫒', name:'橄欖',     color:'#689F38', glow:'#558B2F', pts:25,  rarity:'RARE',      effect:'NONE',    desc:'地中海珍寶' },
  { emoji:'🥑', name:'酪梨',     color:'#66BB6A', glow:'#43A047', pts:28,  rarity:'RARE',      effect:'SCORE2X', desc:'🥑 雙倍分數！', effectDur:6 },
  { emoji:'🌰', name:'栗子',     color:'#8D6E63', glow:'#6D4C41', pts:25,  rarity:'RARE',      effect:'NONE',    desc:'秋日限定' },
  { emoji:'🧁', name:'杯子蛋糕', color:'#F48FB1', glow:'#EC407A', pts:30,  rarity:'RARE',      effect:'SPEED',   desc:'🧁 加速衝刺！', effectDur:5 },

  // ───── 史詩 EPIC ─────
  { emoji:'🍰', name:'蛋糕',     color:'#FF80AB', glow:'#FF4081', pts:40,  rarity:'EPIC',      effect:'SCORE2X', desc:'🍰 雙倍分數！', effectDur:8 },
  { emoji:'🍩', name:'甜甜圈',   color:'#CE93D8', glow:'#AB47BC', pts:40,  rarity:'EPIC',      effect:'GHOST',   desc:'👻 穿透模式！', effectDur:5 },
  { emoji:'🍫', name:'巧克力',   color:'#795548', glow:'#5D4037', pts:45,  rarity:'EPIC',      effect:'NONE',    desc:'幸福感爆棚' },
  { emoji:'🍭', name:'棒棒糖',   color:'#F06292', glow:'#E91E63', pts:45,  rarity:'EPIC',      effect:'SLOW',    desc:'🕐 時間減速！', effectDur:5 },

  // ───── 傳說 LEGENDARY ─────
  { emoji:'🌈', name:'彩虹果',   color:'#FF6D00', glow:'#FF6D00', pts:60,  rarity:'LEGENDARY', effect:'SCORE2X', desc:'🌈 雙倍分數！', effectDur:10 },
  { emoji:'🔥', name:'火焰果',   color:'#FF3D00', glow:'#DD2C00', pts:60,  rarity:'LEGENDARY', effect:'SPEED',   desc:'🔥 超級加速！', effectDur:8 },
  { emoji:'❄️', name:'冰晶果',   color:'#80DEEA', glow:'#4DD0E1', pts:60,  rarity:'LEGENDARY', effect:'SLOW',    desc:'❄️ 超級慢動作！', effectDur:8 },
  { emoji:'🧲', name:'磁力果',   color:'#78909C', glow:'#546E7A', pts:55,  rarity:'LEGENDARY', effect:'MAGNET',  desc:'🧲 食物自來！', effectDur:10 },
  { emoji:'🌸', name:'櫻花果',   color:'#F8BBD0', glow:'#F48FB1', pts:65,  rarity:'LEGENDARY', effect:'SHRINK',  desc:'🌸 縮短蛇身！', effectDur:0 },
  { emoji:'💎', name:'鑽石果',   color:'#4FC3F7', glow:'#29B6F6', pts:70,  rarity:'LEGENDARY', effect:'NONE',    desc:'極度珍貴' },

  // ───── 神話 MYTHIC ─────
  { emoji:'🌟', name:'超新星',   color:'#FFAB00', glow:'#FF6D00', pts:100, rarity:'MYTHIC',    effect:'BOMB',    desc:'💥 全場爆炸加分！', effectDur:0 },
  { emoji:'🍄', name:'魔法蘑菇', color:'#FF1744', glow:'#D50000', pts:100, rarity:'MYTHIC',    effect:'GHOST',   desc:'👻 無敵穿透！', effectDur:10 },
  { emoji:'🍀', name:'四葉草',   color:'#00C853', glow:'#00B248', pts:100, rarity:'MYTHIC',    effect:'SCORE2X', desc:'🍀 超級雙倍！', effectDur:15 },
  { emoji:'🧪', name:'變異藥水', color:'#7C4DFF', glow:'#651FFF', pts:100, rarity:'MYTHIC',    effect:'SPEED',   desc:'🧪 超級加速！', effectDur:12 },

  // ───── 至高 DIVINE ─────
  { emoji:'👑', name:'國王之冠', color:'#FFD700', glow:'#FFC107', pts:200, rarity:'DIVINE',    effect:'SCORE2X', desc:'👑 三倍分數！', effectDur:15, scoreMult:3 },
  { emoji:'🐉', name:'龍之果',   color:'#FF5722', glow:'#E64A19', pts:200, rarity:'DIVINE',    effect:'BOMB',    desc:'🐉 全場大爆炸！', effectDur:0, bombRadius:6 },
  { emoji:'✨', name:'星辰之淚', color:'#E0E0E0', glow:'#BDBDBD', pts:250, rarity:'DIVINE',    effect:'NONE',    desc:'宇宙至寶' },
];

// Build weighted spawn table
function buildSpawnTable() {
  const table = [];
  for (const f of FRUITS) {
    const w = RARITY[f.rarity].weight;
    for (let i = 0; i < Math.round(w * 10); i++) table.push(f);
  }
  return table;
}
const SPAWN_TABLE = buildSpawnTable();

function pickRandomFruit() {
  return SPAWN_TABLE[Math.floor(Math.random() * SPAWN_TABLE.length)];
}

// =============================================
//  GAME STATE
// =============================================
let snake           = [];
let food            = null;
let specialFood     = null;
let dir             = { x: 1, y: 0 };
let nextDir         = { x: 1, y: 0 };
let score           = 0;
let highScore       = parseInt(localStorage.getItem('snakeHigh') || '0');
let level           = 1;
let gameRunning     = false;
let paused          = false;
let gameOver        = false;
let tickTimer       = 0;
let baseSpeed       = 130;
let particles       = [];
let floatTexts      = [];
let comboCount      = 0;
let comboTimer      = 0;
let shakeAmount     = 0;
let tongueTimer     = 0;
let tongueOut       = false;
let blinkTimer      = 0;
let specialFoodTimer = 0;

// Active effects
let activeEffects = {};
let ghostMode     = false;
let magnetMode    = false;

document.getElementById('highVal').textContent = highScore;

// =============================================
//  EFFECT SYSTEM
// =============================================
function activateEffect(fruit) {
  if (fruit.effect === FX.NONE) return;
  const now = performance.now();
  const dur = (fruit.effectDur || 5) * 1000;

  switch (fruit.effect) {
    case FX.SPEED:
      activeEffects.speed = now + dur;
      showEffectBadge('🔥 加速中！', '#FF3D00', dur / 1000);
      break;

    case FX.SLOW:
      activeEffects.slow = now + dur;
      showEffectBadge('🕐 慢動作！', '#4DD0E1', dur / 1000);
      break;

    case FX.GHOST:
      activeEffects.ghost = now + dur;
      ghostMode = true;
      showEffectBadge('👻 穿透模式！', '#CE93D8', dur / 1000);
      break;

    case FX.MAGNET:
      activeEffects.magnet = now + dur;
      magnetMode = true;
      showEffectBadge('🧲 磁鐵模式！', '#78909C', dur / 1000);
      break;

    case FX.SCORE2X: {
      const mult = fruit.scoreMult || 2;
      activeEffects.scoreMult = now + dur;
      activeEffects.currentMult = mult;
      showEffectBadge(`✨ ${mult}倍分數！`, '#FFD700', dur / 1000);
      break;
    }

    case FX.SHRINK: {
      const removeCount = Math.floor(snake.length / 3);
      for (let i = 0; i < removeCount; i++) {
        if (snake.length > 2) {
          const removed = snake.pop();
          const cx = removed.x * CELL + CELL / 2;
          const cy = removed.y * CELL + CELL / 2;
          for (let j = 0; j < 4; j++) {
            particles.push(new Particle(
              cx, cy, '#F8BBD0',
              Math.random() * 3 + 1,
              (Math.random() - 0.5) * 120,
              (Math.random() - 0.5) * 120, 0.4
            ));
          }
        }
      }
      showEffectBadge('🌸 蛇蛇變瘦了！', '#F8BBD0', 2);
      break;
    }

    case FX.BOMB: {
      const bombR = fruit.bombRadius || 3;
      const bonus = 50 * bombR;
      const currentMult = activeEffects.currentMult || 1;
      score += currentMult > 1 ? bonus * currentMult : bonus;
      const hx = fruit._x !== undefined ? fruit._x : snake[0].x;
      const hy = fruit._y !== undefined ? fruit._y : snake[0].y;

      for (let i = 0; i < 40; i++) {
        const ang = Math.random() * Math.PI * 2;
        const spd = Math.random() * 300 + 100;
        const hue = Math.random() * 60 + 20;
        particles.push(new Particle(
          hx * CELL + CELL / 2, hy * CELL + CELL / 2,
          `hsl(${hue},100%,60%)`,
          Math.random() * 6 + 3,
          Math.cos(ang) * spd,
          Math.sin(ang) * spd,
          Math.random() * 0.8 + 0.4
        ));
      }
      floatTexts.push(new FloatText(
        hx * CELL + CELL / 2, hy * CELL + CELL / 2 - 20,
        `💥 爆炸 +${bonus}`, '#FF6D00', 30
      ));
      shakeAmount = 18;
      showEffectBadge('💥 爆炸加分！', '#FF3D00', 2);
      break;
    }
  }
}

function updateEffects() {
  const now = performance.now();
  if (activeEffects.speed    && now > activeEffects.speed)    { delete activeEffects.speed; }
  if (activeEffects.slow     && now > activeEffects.slow)     { delete activeEffects.slow; }
  if (activeEffects.ghost    && now > activeEffects.ghost)    { delete activeEffects.ghost; ghostMode = false; }
  if (activeEffects.magnet   && now > activeEffects.magnet)   { delete activeEffects.magnet; magnetMode = false; }
  if (activeEffects.scoreMult && now > activeEffects.scoreMult) { delete activeEffects.scoreMult; delete activeEffects.currentMult; }
}

function getSpeedMult() {
  let mult = 1;
  if (activeEffects.speed) mult *= 0.6;
  if (activeEffects.slow)  mult *= 1.8;
  return mult;
}

function getScoreMult() {
  return activeEffects.currentMult || 1;
}

let badgeTimeout = null;
function showEffectBadge(text, color, dur) {
  const badge = document.getElementById('effectBadge');
  badge.textContent = text;
  badge.style.background = color;
  badge.style.opacity = '1';
  if (badgeTimeout) clearTimeout(badgeTimeout);
  badgeTimeout = setTimeout(() => { badge.style.opacity = '0'; }, dur * 1000);
}

// =============================================
//  MATH HELPERS
// =============================================
function lerp(a, b, t) { return a + (b - a) * t; }
function clamp(v, mn, mx) { return Math.max(mn, Math.min(mx, v)); }
function normalize(v) { const l = Math.sqrt(v.x * v.x + v.y * v.y) || 1; return { x: v.x / l, y: v.y / l }; }

function catmullRom(p0, p1, p2, p3, t) {
  const t2 = t * t, t3 = t2 * t;
  return {
    x: 0.5 * ((2 * p1.x) + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
    y: 0.5 * ((2 * p1.y) + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3)
  };
}

function smoothCurve(pts, sps) {
  if (pts.length < 2) return pts.slice();
  const res = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[Math.min(pts.length - 1, i + 1)];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    for (let s = 0; s < sps; s++) {
      res.push(catmullRom(p1, p1, p2, p3, s / sps));
    }
  }
  res.push(pts[pts.length - 1]);
  return res;
}

function calcNormals(spine) {
  const normals = [];
  for (let i = 0; i < spine.length; i++) {
    let dx, dy;
    if (i === 0) {
      dx = spine[1].x - spine[0].x;
      dy = spine[1].y - spine[0].y;
    } else if (i === spine.length - 1) {
      dx = spine[i].x - spine[i - 1].x;
      dy = spine[i].y - spine[i - 1].y;
    } else {
      dx = spine[i + 1].x - spine[i - 1].x;
      dy = spine[i + 1].y - spine[i - 1].y;
    }
    const l = Math.sqrt(dx * dx + dy * dy) || 1;
    normals.push({ x: -dy / l, y: dx / l });
  }
  return normals;
}

// =============================================
//  SNAKE RENDERER — 蛇形體繪製
// =============================================
const SnakeRenderer = {

  getSections() {
    const positions = snake.map(s => ({ x: s.x * CELL + CELL / 2, y: s.y * CELL + CELL / 2 }));
    if (positions.length < 2) return [positions];
    const sections = [];
    let cur = [positions[0]];
    for (let i = 1; i < positions.length; i++) {
      if (Math.abs(positions[i].x - positions[i - 1].x) > CELL * 1.5 ||
          Math.abs(positions[i].y - positions[i - 1].y) > CELL * 1.5) {
        sections.push(cur);
        cur = [positions[i]];
      } else {
        cur.push(positions[i]);
      }
    }
    sections.push(cur);
    return sections;
  },

  getBodyWidth(t, totalSegs) {
    const fatBonus = Math.min(totalSegs * 0.25, CELL * 0.12);
    const headR = CELL * 0.58 + fatBonus;
    const bodyR = CELL * 0.43 + fatBonus;
    const tailR = CELL * 0.06;
    if (t < 0.015) return headR;
    if (t < 0.05)  return lerp(headR * 0.95, bodyR + CELL * 0.06, (t - 0.015) / 0.035);
    if (t < 0.12)  return lerp(bodyR + CELL * 0.06, bodyR, (t - 0.05) / 0.07);
    if (t < 0.75) {
      const bt = (t - 0.12) / 0.63;
      return bodyR + Math.sin(bt * Math.PI) * CELL * 0.04;
    }
    const tt = (t - 0.75) / 0.25;
    return lerp(bodyR, tailR, tt * tt * 0.8 + tt * 0.2);
  },

  drawShadow(spine, normals, widths) {
    ctx.save();
    ctx.globalAlpha = 0.15;
    ctx.filter = 'blur(6px)';
    const left = [], right = [];
    for (let i = 0; i < spine.length; i++) {
      left.push({ x: spine[i].x + normals[i].x * widths[i] + 4, y: spine[i].y + normals[i].y * widths[i] + 6 });
      right.push({ x: spine[i].x - normals[i].x * widths[i] + 4, y: spine[i].y - normals[i].y * widths[i] + 6 });
    }
    ctx.beginPath();
    ctx.moveTo(left[0].x, left[0].y);
    for (let i = 1; i < left.length; i++) ctx.lineTo(left[i].x, left[i].y);
    const ll = left[left.length - 1], rr = right[right.length - 1];
    ctx.quadraticCurveTo((ll.x + rr.x) / 2 + 4, (ll.y + rr.y) / 2 + 6, rr.x, rr.y);
    for (let i = right.length - 1; i >= 0; i--) ctx.lineTo(right[i].x, right[i].y);
    ctx.closePath();
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.filter = 'none';
    ctx.restore();
  },

  drawBody(spine, normals, widths, totalSegs) {
    const left = [], right = [];
    for (let i = 0; i < spine.length; i++) {
      left.push({ x: spine[i].x + normals[i].x * widths[i], y: spine[i].y + normals[i].y * widths[i] });
      right.push({ x: spine[i].x - normals[i].x * widths[i], y: spine[i].y - normals[i].y * widths[i] });
    }
    const bodyPath = new Path2D();
    bodyPath.moveTo(left[0].x, left[0].y);
    for (let i = 1; i < left.length; i++) bodyPath.lineTo(left[i].x, left[i].y);
    const ll = left[left.length - 1], rr = right[right.length - 1];
    bodyPath.quadraticCurveTo((ll.x + rr.x) / 2, (ll.y + rr.y) / 2, rr.x, rr.y);
    for (let i = right.length - 1; i >= 0; i--) bodyPath.lineTo(right[i].x, right[i].y);
    bodyPath.closePath();

    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.25)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 4;

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const p of spine) {
      minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x);
      minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y);
    }

    // Ghost mode translucency
    if (ghostMode) ctx.globalAlpha = 0.5 + Math.sin(gameTime * 8) * 0.2;

    // Base gradient fill
    const grad = ctx.createLinearGradient(minX, minY, maxX, maxY);
    grad.addColorStop(0,   '#7ED957');
    grad.addColorStop(0.3, '#5CBF2A');
    grad.addColorStop(0.6, '#4CAF30');
    grad.addColorStop(1,   '#3A8C1E');
    ctx.fillStyle = grad;
    ctx.fill(bodyPath);
    ctx.shadowColor = 'transparent';

    // Scale pattern (clipped)
    ctx.save();
    ctx.clip(bodyPath);
    const segSamples = 8, bandWidth = segSamples * 2;
    for (let i = 0; i < spine.length - bandWidth; i += bandWidth) {
      const idx = Math.floor(i / bandWidth);
      if (idx % 2 !== 0) continue;
      const i2 = Math.min(i + bandWidth, spine.length - 1);
      const l1 = { x: spine[i].x + normals[i].x * widths[i] * 1.1,  y: spine[i].y + normals[i].y * widths[i] * 1.1 };
      const r1 = { x: spine[i].x - normals[i].x * widths[i] * 1.1,  y: spine[i].y - normals[i].y * widths[i] * 1.1 };
      const l2 = { x: spine[i2].x + normals[i2].x * widths[i2] * 1.1, y: spine[i2].y + normals[i2].y * widths[i2] * 1.1 };
      const r2 = { x: spine[i2].x - normals[i2].x * widths[i2] * 1.1, y: spine[i2].y - normals[i2].y * widths[i2] * 1.1 };
      ctx.beginPath();
      ctx.moveTo(l1.x, l1.y); ctx.lineTo(l2.x, l2.y); ctx.lineTo(r2.x, r2.y); ctx.lineTo(r1.x, r1.y);
      ctx.closePath();
      ctx.fillStyle = 'rgba(30,80,15,0.3)';
      ctx.fill();

      // Diamond
      const cx = (spine[i].x + spine[i2].x) / 2;
      const cy = (spine[i].y + spine[i2].y) / 2;
      const dw = widths[i] * 0.5, dl = widths[i] * 0.15;
      ctx.beginPath();
      ctx.moveTo(cx + normals[i].x * dw, cy + normals[i].y * dw);
      const tani = { x: normals[i].y, y: -normals[i].x };
      ctx.lineTo(cx + tani.x * dl, cy + tani.y * dl);
      ctx.lineTo(cx - normals[i].x * dw, cy - normals[i].y * dw);
      ctx.lineTo(cx - tani.x * dl, cy - tani.y * dl);
      ctx.closePath();
      ctx.fillStyle = 'rgba(25,65,10,0.2)';
      ctx.fill();
    }

    // Belly highlight
    for (let i = 0; i < spine.length - 1; i += 2) {
      const t = i / (spine.length - 1);
      const alpha = 0.12 * (1 - t * 0.5);
      const w = widths[i], off = 0.2;
      const i2 = Math.min(i + 2, spine.length - 1), w2 = widths[i2];
      ctx.beginPath();
      ctx.moveTo(spine[i].x + normals[i].x * w * off,   spine[i].y + normals[i].y * w * off);
      ctx.lineTo(spine[i].x + normals[i].x * w * 0.85,  spine[i].y + normals[i].y * w * 0.85);
      ctx.lineTo(spine[i2].x + normals[i2].x * w2 * 0.85, spine[i2].y + normals[i2].y * w2 * 0.85);
      ctx.lineTo(spine[i2].x + normals[i2].x * w2 * off,  spine[i2].y + normals[i2].y * w2 * off);
      ctx.closePath();
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fill();
    }

    // Specular highlight
    ctx.beginPath();
    for (let i = 0; i < spine.length; i++) {
      const ox = -normals[i].x * widths[i] * 0.2, oy = -normals[i].y * widths[i] * 0.2;
      if (i === 0) ctx.moveTo(spine[i].x + ox, spine[i].y + oy);
      else ctx.lineTo(spine[i].x + ox, spine[i].y + oy);
    }
    for (let i = spine.length - 1; i >= 0; i--) {
      const ox = -normals[i].x * widths[i] * 0.35, oy = -normals[i].y * widths[i] * 0.35;
      ctx.lineTo(spine[i].x + ox, spine[i].y + oy);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.fill();
    ctx.restore(); // un-clip

    // Speed / Slow effect glow
    if (activeEffects.speed) {
      ctx.save(); ctx.clip(bodyPath);
      const g = ctx.createLinearGradient(minX, minY, maxX, maxY);
      g.addColorStop(0, 'rgba(255,80,0,0.15)');
      g.addColorStop(1, 'rgba(255,150,0,0.08)');
      ctx.fillStyle = g; ctx.fill(bodyPath); ctx.restore();
    }
    if (activeEffects.slow) {
      ctx.save(); ctx.clip(bodyPath);
      const g = ctx.createLinearGradient(minX, minY, maxX, maxY);
      g.addColorStop(0, 'rgba(0,180,255,0.12)');
      g.addColorStop(1, 'rgba(0,100,200,0.06)');
      ctx.fillStyle = g; ctx.fill(bodyPath); ctx.restore();
    }

    ctx.strokeStyle = 'rgba(0,0,0,0.18)';
    ctx.lineWidth = 1.5;
    ctx.lineJoin = 'round';
    ctx.stroke(bodyPath);
    ctx.restore();
  },

  drawTailTip(spine, normals, widths) {
    if (spine.length < 4) return;
    const tipI = spine.length - 1, prevI = Math.max(0, tipI - 6);
    const tip = spine[tipI], prev = spine[prevI];
    const d = normalize({ x: tip.x - prev.x, y: tip.y - prev.y });
    const n = { x: -d.y, y: d.x };
    const tw = CELL * 0.06, tl = CELL * 0.22;

    ctx.beginPath();
    ctx.moveTo(tip.x + n.x * tw, tip.y + n.y * tw);
    ctx.quadraticCurveTo(
      tip.x + d.x * tl * 0.5 + n.x * tw * 1.5,
      tip.y + d.y * tl * 0.5 + n.y * tw * 1.5,
      tip.x + d.x * tl, tip.y + d.y * tl
    );
    ctx.quadraticCurveTo(
      tip.x + d.x * tl * 0.5 - n.x * tw * 1.5,
      tip.y + d.y * tl * 0.5 - n.y * tw * 1.5,
      tip.x - n.x * tw, tip.y - n.y * tw
    );
    ctx.closePath();
    ctx.fillStyle = '#3A8C1E';
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Tip highlight
    ctx.beginPath();
    ctx.arc(tip.x + d.x * tl * 0.4, tip.y + d.y * tl * 0.4, 2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.fill();
  },

  drawHead(spine, normals, widths, gameTime) {
    if (spine.length < 2) return;
    const headP = spine[0];
    const nextP = spine[Math.min(3, spine.length - 1)];
    const headDir  = normalize({ x: headP.x - nextP.x, y: headP.y - nextP.y });
    const headNorm = { x: -headDir.y, y: headDir.x };
    const headR = widths[0];

    ctx.save();
    ctx.translate(headP.x, headP.y);
    if (ghostMode) ctx.globalAlpha = 0.5 + Math.sin(gameTime * 8) * 0.2;

    // Shadow
    ctx.beginPath();
    ctx.ellipse(3, 5, headR * 0.9, headR * 0.7, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fill();

    // Head sphere
    const hGrad = ctx.createRadialGradient(-headR * 0.2, -headR * 0.2, headR * 0.1, 0, 0, headR);
    hGrad.addColorStop(0,   '#8EE060');
    hGrad.addColorStop(0.6, '#5CBF2A');
    hGrad.addColorStop(1,   '#3A8C1E');
    ctx.beginPath();
    ctx.arc(0, 0, headR, 0, Math.PI * 2);
    ctx.fillStyle = hGrad;
    ctx.fill();

    // Highlight
    ctx.beginPath();
    ctx.arc(-headR * 0.2, -headR * 0.2, headR * 0.45, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    ctx.fill();

    ctx.strokeStyle = 'rgba(0,0,0,0.15)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Face
    const faceAngle   = Math.atan2(headDir.y, headDir.x);
    const eyeDist     = headR * 0.35;
    const eyeForward  = headR * 0.2;
    const eyeR        = headR * 0.28;
    const pupilR      = headR * 0.17;

    blinkTimer -= 0.016;
    if (blinkTimer <= 0) blinkTimer = Math.random() * 3.5 + 2;
    const blinking  = blinkTimer < 0.12;
    const eyeScaleY = blinking ? 0.08 : 1;

    // Eyes
    for (let side = -1; side <= 1; side += 2) {
      const ex = headDir.x * eyeForward + headNorm.x * eyeDist * side;
      const ey = headDir.y * eyeForward + headNorm.y * eyeDist * side;
      ctx.save();
      ctx.translate(ex, ey);
      ctx.rotate(faceAngle);
      ctx.scale(1, eyeScaleY);

      ctx.beginPath();
      ctx.ellipse(0, 0, eyeR, eyeR * 1.1, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();

      const lookX = Math.sin(gameTime * 1.8 + side) * 1.2;
      const lookY = Math.cos(gameTime * 2.2 + side) * 0.8;
      ctx.beginPath();
      ctx.arc(lookX, lookY, pupilR, 0, Math.PI * 2);
      ctx.fillStyle = '#1a1a2e';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(lookX - pupilR * 0.3, lookY - pupilR * 0.3, pupilR * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(lookX + pupilR * 0.2, lookY + pupilR * 0.35, pupilR * 0.18, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.fill();

      ctx.restore();
    }

    // Blush cheeks
    for (let side = -1; side <= 1; side += 2) {
      const bx = headNorm.x * headR * 0.6 * side + headDir.x * headR * 0.05;
      const by = headNorm.y * headR * 0.6 * side + headDir.y * headR * 0.05;
      ctx.beginPath();
      ctx.arc(bx, by, headR * 0.16, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,130,160,0.4)';
      ctx.fill();
    }

    // Smile
    const smileX = headDir.x * headR * 0.45;
    const smileY = headDir.y * headR * 0.45;
    ctx.save();
    ctx.translate(smileX, smileY);
    ctx.rotate(faceAngle);
    ctx.beginPath();
    ctx.arc(0, 0, headR * 0.18, 0.15, Math.PI - 0.15);
    ctx.strokeStyle = 'rgba(60,20,10,0.5)';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Tongue
    tongueTimer -= 0.016;
    if (tongueTimer <= 0) {
      tongueTimer = Math.random() * 4 + 2;
      tongueOut = true;
      setTimeout(() => { tongueOut = false; }, 350);
    }
    if (tongueOut) {
      ctx.beginPath();
      ctx.moveTo(headR * 0.12, headR * 0.04);
      ctx.quadraticCurveTo(headR * 0.22, headR * 0.06, headR * 0.25, 0);
      ctx.quadraticCurveTo(headR * 0.22, -headR * 0.06, headR * 0.12, -headR * 0.04);
      ctx.fillStyle = '#FF5577';
      ctx.fill();
    }
    ctx.restore();

    // Crown accessory
    if (score >= 50) {
      const cX = -headDir.x * headR * 0.6;
      const cY = -headDir.y * headR * 0.6;
      ctx.save();
      ctx.translate(cX, cY);
      ctx.rotate(faceAngle - Math.PI / 2);
      ctx.font = `${headR * 0.7}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('👑', 0, 0);
      ctx.restore();
    }

    ctx.restore();
  },

  render(gameTime) {
    const sections  = this.getSections();
    const totalSegs = snake.length;

    for (const sec of sections) {
      if (sec.length < 2) continue;
      const sps   = 8;
      const spine = smoothCurve(sec, sps);
      if (spine.length < 3) continue;

      const normals = calcNormals(spine);
      // Organic wobble
      for (let i = 2; i < spine.length; i++) {
        const t = i / (spine.length - 1);
        const wobble = Math.sin(gameTime * 3.5 + i * 0.4) * 1.8 * t;
        spine[i].x += normals[i].x * wobble;
        spine[i].y += normals[i].y * wobble;
      }

      const norms2 = calcNormals(spine);
      const widths = spine.map((_, i) => this.getBodyWidth(i / (spine.length - 1), totalSegs));

      this.drawShadow(spine, norms2, widths);
      this.drawBody(spine, norms2, widths, totalSegs);
      this.drawTailTip(spine, norms2, widths);
    }

    // Head (first section only)
    if (sections.length > 0 && sections[0].length >= 2) {
      const sec   = sections[0];
      const sps   = 8;
      const spine = smoothCurve(sec, sps);
      const norms = calcNormals(spine);
      const widths = spine.map((_, i) => this.getBodyWidth(i / (spine.length - 1), totalSegs));
      this.drawHead(spine, norms, widths, gameTime);
    }
  }
};

// =============================================
//  PARTICLES & FLOAT TEXT
// =============================================
class Particle {
  constructor(x, y, color, size, vx, vy, life) {
    this.x = x; this.y = y; this.color = color; this.size = size;
    this.vx = vx; this.vy = vy; this.life = life; this.maxLife = life;
    this.rot = Math.random() * Math.PI * 2;
    this.rotSpd = (Math.random() - 0.5) * 0.2;
  }
  update(dt) {
    this.x += this.vx * dt; this.y += this.vy * dt;
    this.vy += 150 * dt; this.life -= dt; this.rot += this.rotSpd;
  }
  draw() {
    const a = Math.max(0, this.life / this.maxLife), s = this.size * a;
    ctx.save();
    ctx.translate(this.x, this.y); ctx.rotate(this.rot); ctx.globalAlpha = a;
    ctx.beginPath(); ctx.arc(0, 0, s, 0, Math.PI * 2);
    ctx.fillStyle = this.color; ctx.shadowColor = this.color; ctx.shadowBlur = s * 2;
    ctx.fill(); ctx.restore();
  }
}

class FloatText {
  constructor(x, y, text, color, size) {
    this.x = x; this.y = y; this.text = text; this.color = color;
    this.size = size; this.life = 1.5; this.maxLife = 1.5;
  }
  update(dt) { this.y -= 40 * dt; this.life -= dt; }
  draw() {
    const a = Math.max(0, this.life / this.maxLife), sc = 1 + (1 - a) * 0.3;
    ctx.save();
    ctx.translate(this.x, this.y); ctx.scale(sc, sc); ctx.globalAlpha = a;
    ctx.font = `bold ${this.size}px 'Segoe UI'`;
    ctx.textAlign = 'center'; ctx.fillStyle = this.color;
    ctx.shadowColor = this.color; ctx.shadowBlur = 15;
    ctx.fillText(this.text, 0, 0); ctx.restore();
  }
}

function spawnEatParticles(x, y, color, count) {
  count = count || 14;
  for (let i = 0; i < count; i++) {
    const ang = (Math.PI * 2 / count) * i + Math.random() * 0.3;
    const spd = Math.random() * 200 + 70;
    particles.push(new Particle(x, y, color, Math.random() * 5 + 2,
      Math.cos(ang) * spd, Math.sin(ang) * spd - 70, Math.random() * 0.6 + 0.3));
  }
  for (let i = 0; i < 6; i++) {
    particles.push(new Particle(
      x + (Math.random() - 0.5) * 30, y + (Math.random() - 0.5) * 30, '#FFD700',
      Math.random() * 3 + 1, (Math.random() - 0.5) * 50, -Math.random() * 130 - 30,
      Math.random() * 0.4 + 0.2));
  }
}

function spawnRarityParticles(x, y, rarity) {
  const r = RARITY[rarity];
  if (!r) return;
  const count = rarity === 'DIVINE'    ? 25 :
                rarity === 'MYTHIC'    ? 20 :
                rarity === 'LEGENDARY' ? 15 :
                rarity === 'EPIC'      ? 10 :
                rarity === 'RARE'      ? 6  : 0;
  for (let i = 0; i < count; i++) {
    const ang = Math.random() * Math.PI * 2;
    const spd = Math.random() * 150 + 50;
    particles.push(new Particle(x, y, r.color, Math.random() * 4 + 2,
      Math.cos(ang) * spd, Math.sin(ang) * spd - 60, Math.random() * 0.8 + 0.4));
  }
}

// =============================================
//  BACKGROUND PARTICLES
// =============================================
let bgP = [];
function initBg() {
  bgP = [];
  for (let i = 0; i < 25; i++) {
    bgP.push({
      x: Math.random() * W, y: Math.random() * H,
      s: Math.random() * 2.5 + 0.8, sp: Math.random() * 15 + 5,
      a: Math.random() * 0.25 + 0.08, h: Math.random() * 60 + 200
    });
  }
}
initBg();

function drawBg() {
  for (const p of bgP) {
    p.y -= p.sp * 0.016;
    if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
    ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${p.h},60%,70%,${p.a})`; ctx.fill();
  }
}

// =============================================
//  FOOD SYSTEM
// =============================================
function randPos() {
  let p;
  do {
    p = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (
    snake.some(s => s.x === p.x && s.y === p.y) ||
    (specialFood && specialFood.x === p.x && specialFood.y === p.y)
  );
  return p;
}

function spawnFood() {
  const p     = randPos();
  const fruit = pickRandomFruit();
  food = { ...p, fruit, pulse: 0, spawnTime: performance.now() };

  // Magnet: place near head
  if (magnetMode && snake.length > 0) {
    const hx = snake[0].x, hy = snake[0].y;
    let bestP = null, bestDist = Infinity;
    for (let attempt = 0; attempt < 20; attempt++) {
      const cand = randPos();
      const d = Math.abs(cand.x - hx) + Math.abs(cand.y - hy);
      if (d < bestDist) { bestDist = d; bestP = cand; }
    }
    if (bestP && bestDist > 3) { food.x = bestP.x; food.y = bestP.y; }
  }
}

function spawnSpecial() {
  const p = randPos();
  specialFood = { ...p, pts: 50, pulse: 0, life: 8 };
}

function drawFood(f, t) {
  if (!f) return;
  const cx = f.x * CELL + CELL / 2;
  const cy = f.y * CELL + CELL / 2;
  f.pulse = (f.pulse || 0) + 0.03;
  const ps = 1 + Math.sin(f.pulse * 3) * 0.08;
  const bob = Math.sin(t * 3 + f.x) * 3;
  const rarity = RARITY[f.fruit.rarity];

  ctx.save();
  ctx.translate(cx, cy + bob);
  ctx.scale(ps, ps);

  // Rarity ring
  if (rarity.weight <= 14) {
    ctx.beginPath();
    ctx.arc(0, 0, CELL * 0.44 + Math.sin(t * 4) * 2, 0, Math.PI * 2);
    ctx.strokeStyle = rarity.glow;
    ctx.lineWidth = rarity.weight <= 2 ? 3 : 2;
    ctx.stroke();
  }

  // Glow
  ctx.shadowColor = f.fruit.glow;
  ctx.shadowBlur = 12 + Math.sin(t * 5) * 4;
  if (rarity.weight <= 6) ctx.shadowBlur = 22 + Math.sin(t * 5) * 6;

  // Base circle
  const fg = ctx.createRadialGradient(-3, -3, 2, 0, 0, CELL * 0.38);
  fg.addColorStop(0, '#fff');
  fg.addColorStop(0.35, f.fruit.color);
  fg.addColorStop(1, 'rgba(0,0,0,0.15)');
  ctx.beginPath();
  ctx.arc(0, 0, CELL * 0.38, 0, Math.PI * 2);
  ctx.fillStyle = fg;
  ctx.fill();
  ctx.shadowBlur = 0;

  // Emoji
  ctx.font = `${CELL * 0.55}px serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(f.fruit.emoji, 0, 2);

  // Points label (for valuable items)
  const pts = f.fruit.pts * getScoreMult();
  if (pts >= 25) {
    ctx.font = `bold ${CELL * 0.28}px 'Segoe UI'`;
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.strokeStyle = 'rgba(0,0,0,0.4)';
    ctx.lineWidth = 2;
    ctx.strokeText(pts + '', 0, -CELL * 0.38);
    ctx.fillText(pts + '', 0, -CELL * 0.38);
  }
  ctx.restore();

  // Rare+ ambient particles
  if (rarity.weight <= 6 && Math.random() < 0.3) {
    particles.push(new Particle(
      cx + Math.random() * 10 - 5, cy + Math.random() * 10 - 5,
      rarity.color, Math.random() * 2 + 1,
      (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, 0.4
    ));
  }
}

function drawSpecialFood(t) {
  if (!specialFood) return;
  const cx = specialFood.x * CELL + CELL / 2;
  const cy = specialFood.y * CELL + CELL / 2;
  specialFood.pulse += 0.05;
  const ps = 1 + Math.sin(specialFood.pulse * 2) * 0.12;
  const bob = Math.sin(t * 5) * 4;

  ctx.save();
  ctx.translate(cx, cy + bob);
  for (let i = 0; i < 8; i++) {
    const ang = (Math.PI * 2 / 8) * i + t * 2.5;
    ctx.beginPath();
    ctx.moveTo(Math.cos(ang) * CELL * 0.25, Math.sin(ang) * CELL * 0.25);
    ctx.lineTo(Math.cos(ang) * CELL * 0.5,  Math.sin(ang) * CELL * 0.5);
    ctx.strokeStyle = 'rgba(255,215,0,0.35)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  ctx.scale(ps, ps);
  ctx.shadowColor = '#FFD700';
  ctx.shadowBlur = 25;
  ctx.font = `${CELL * 0.65}px serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('⭐', 0, 2);
  ctx.shadowBlur = 0;
  ctx.restore();

  const lr = Math.max(0, specialFood.life / 8);
  ctx.fillStyle = `rgba(255,255,255,${lr * 0.5})`;
  ctx.fillRect(cx - 14, cy + CELL * 0.5, 28 * lr, 3);
  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  ctx.lineWidth = 1;
  ctx.strokeRect(cx - 14, cy + CELL * 0.5, 28, 3);
}

// =============================================
//  GAME LOGIC
// =============================================
function getSpeed() {
  return Math.max(45, baseSpeed - (level - 1) * 7) * getSpeedMult();
}

function initGame() {
  snake = [];
  const sx = Math.floor(COLS / 2), sy = Math.floor(ROWS / 2);
  for (let i = 0; i < 3; i++) snake.push({ x: sx - i, y: sy });
  dir = { x: 1, y: 0 }; nextDir = { x: 1, y: 0 };
  score = 0; level = 1; gameOver = false; paused = false;
  particles = []; floatTexts = [];
  comboCount = 0; comboTimer = 0; shakeAmount = 0;
  specialFood = null; specialFoodTimer = 0;
  activeEffects = {}; ghostMode = false; magnetMode = false;
  spawnFood();
  updateHUD();
}

function updateHUD() {
  document.getElementById('scoreVal').textContent = score;
  document.getElementById('lenVal').textContent   = snake.length;
  document.getElementById('levelVal').textContent  = level;
}

function gameTick() {
  if (gameOver || paused) return;
  dir = { ...nextDir };
  const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

  // Wrap around walls
  if (head.x < 0)      head.x = COLS - 1;
  if (head.x >= COLS)   head.x = 0;
  if (head.y < 0)      head.y = ROWS - 1;
  if (head.y >= ROWS)   head.y = 0;

  // Self collision (skip during ghost mode)
  if (!ghostMode && snake.some((s, i) => i > 0 && s.x === head.x && s.y === head.y)) {
    endGame();
    return;
  }

  snake.unshift(head);
  let ate = false;

  // Normal food
  if (food && head.x === food.x && head.y === food.y) {
    const f         = food.fruit;
    const scoreMult = getScoreMult();
    comboCount++; comboTimer = 2;
    const comboMult = Math.min(comboCount, 5);
    const total     = Math.round(f.pts * comboMult * scoreMult);
    score += total;
    ate = true;

    const cx = food.x * CELL + CELL / 2;
    const cy = food.y * CELL + CELL / 2;
    spawnEatParticles(cx, cy, f.color);
    spawnRarityParticles(cx, cy, f.rarity);

    floatTexts.push(new FloatText(cx, cy - 10, `+${total}`, '#FFD700', 26));
    if (comboMult > 1) {
      floatTexts.push(new FloatText(cx, cy - 36, `${comboMult}x COMBO!`, '#FF6B6B', 18));
    }

    const rarity = RARITY[f.rarity];
    if (rarity.weight <= 14) {
      floatTexts.push(new FloatText(cx, cy - 58, `${f.emoji} ${f.name}`, rarity.color, 14));
    }

    shakeAmount = 3 + comboMult * 2 + (rarity.weight <= 6 ? 8 : 0);
    level = Math.floor(score / 100) + 1;

    // Activate special effect
    f._x = food.x;
    f._y = food.y;
    activateEffect(f);

    spawnFood();
    specialFoodTimer++;
    if (specialFoodTimer >= 6 && !specialFood) {
      spawnSpecial();
      specialFoodTimer = 0;
    }
  }

  // Special food (⭐)
  if (specialFood && head.x === specialFood.x && head.y === specialFood.y) {
    const sMult = getScoreMult();
    score += specialFood.pts * sMult;
    comboCount += 2; comboTimer = 3;
    const cx = specialFood.x * CELL + CELL / 2;
    const cy = specialFood.y * CELL + CELL / 2;
    spawnEatParticles(cx, cy, '#FFD700', 20);
    for (let i = 0; i < 15; i++) {
      particles.push(new Particle(cx, cy, `hsl(${Math.random()*60+30},100%,65%)`,
        Math.random() * 5 + 2, (Math.random() - 0.5) * 280,
        -Math.random() * 280 - 40, Math.random() * 0.8 + 0.3));
    }
    floatTexts.push(new FloatText(cx, cy - 10, `⭐ +${specialFood.pts * sMult}`, '#FFD700', 30));
    shakeAmount = 10;
    specialFood = null;
    level = Math.floor(score / 100) + 1;
  }

  if (!ate) snake.pop();
  updateHUD();
}

function endGame() {
  gameOver = true;
  gameRunning = false;
  shakeAmount = 14;
  for (const seg of snake) {
    const cx = seg.x * CELL + CELL / 2, cy = seg.y * CELL + CELL / 2;
    for (let i = 0; i < 3; i++) {
      particles.push(new Particle(cx, cy, '#FF6B6B',
        Math.random() * 3 + 2, (Math.random() - 0.5) * 180,
        (Math.random() - 0.5) * 180, Math.random() * 0.6 + 0.2));
    }
  }
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('snakeHigh', highScore.toString());
    document.getElementById('highVal').textContent = highScore;
  }
  setTimeout(showGameOver, 800);
}

function showGameOver() {
  const o = document.getElementById('overlay');
  o.classList.remove('hidden');
  o.innerHTML = `
    <h1>💀 遊戲結束</h1>
    <div class="score-display">${score}</div>
    <div class="stats">
      <div class="stat-item">
        <div class="stat-val">${snake.length}</div>
        <div class="stat-label">最終長度</div>
      </div>
      <div class="stat-item">
        <div class="stat-val">${level}</div>
        <div class="stat-label">等級</div>
      </div>
      <div class="stat-item">
        <div class="stat-val">${highScore}</div>
        <div class="stat-label">最高紀錄</div>
      </div>
    </div>
    <button class="start-btn" onclick="startGame()">🔄 再來一局</button>
  `;
}

function startGame() {
  initGame();
  gameRunning = true;
  document.getElementById('overlay').classList.add('hidden');
}

document.getElementById('startBtn').addEventListener('click', startGame);

// =============================================
//  MAIN LOOP
// =============================================
let lastTime = 0, gameTime = 0;

function gameLoop(ts) {
  requestAnimationFrame(gameLoop);
  const dt = Math.min((ts - lastTime) / 1000, 0.05);
  lastTime = ts;
  gameTime += dt;

  // --- Tick ---
  if (gameRunning && !paused && !gameOver) {
    updateEffects();
    tickTimer += dt * 1000;
    if (tickTimer >= getSpeed()) { tickTimer -= getSpeed(); gameTick(); }
    if (comboTimer > 0) { comboTimer -= dt; if (comboTimer <= 0) comboCount = 0; }
    if (specialFood) {
      specialFood.life -= dt;
      if (specialFood.life <= 0) {
        const cx = specialFood.x * CELL + CELL / 2;
        const cy = specialFood.y * CELL + CELL / 2;
        for (let i = 0; i < 6; i++) {
          particles.push(new Particle(cx, cy, 'rgba(255,255,255,0.5)',
            2, (Math.random() - 0.5) * 80, (Math.random() - 0.5) * 80, 0.25));
        }
        specialFood = null;
      }
    }
  }

  // --- Update particles ---
  particles.forEach(p => p.update(dt));
  particles = particles.filter(p => p.life > 0);
  floatTexts.forEach(f => f.update(dt));
  floatTexts = floatTexts.filter(f => f.life > 0);
  shakeAmount *= 0.9;
  if (shakeAmount < 0.05) shakeAmount = 0;

  // --- Render ---
  ctx.save();
  if (shakeAmount > 0) {
    ctx.translate((Math.random() - 0.5) * shakeAmount, (Math.random() - 0.5) * shakeAmount);
  }

  // Background
  const bg = ctx.createRadialGradient(W / 2, H / 2, 40, W / 2, H / 2, W / 1.1);
  bg.addColorStop(0, '#1e1e52');
  bg.addColorStop(1, '#0d0d2b');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Grid lines
  ctx.strokeStyle = 'rgba(100,100,200,0.06)';
  ctx.lineWidth = 1;
  for (let x = 0; x <= COLS; x++) { ctx.beginPath(); ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, H); ctx.stroke(); }
  for (let y = 0; y <= ROWS; y++) { ctx.beginPath(); ctx.moveTo(0, y * CELL); ctx.lineTo(W, y * CELL); ctx.stroke(); }

  drawBg();

  // Effect tint overlay
  if (activeEffects.slow)  { ctx.fillStyle = 'rgba(0,100,200,0.04)'; ctx.fillRect(0, 0, W, H); }
  if (activeEffects.speed) { ctx.fillStyle = 'rgba(255,80,0,0.03)';  ctx.fillRect(0, 0, W, H); }

  // Draw food
  if (food) drawFood(food, gameTime);
  drawSpecialFood(gameTime);

  // Draw snake
  if (snake.length >= 2) SnakeRenderer.render(gameTime);

  // Draw particles & float texts
  particles.forEach(p => p.draw());
  floatTexts.forEach(f => f.draw());

  // Pause overlay
  if (paused && !gameOver) {
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.fillRect(0, 0, W, H);
    ctx.font = 'bold 44px "Segoe UI"';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('⏸️ 暫停中', W / 2, H / 2);
    ctx.font = '18px "Segoe UI"';
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillText('按空白鍵繼續', W / 2, H / 2 + 36);
  }

  ctx.restore();
}

// =============================================
//  INPUT HANDLING
// =============================================

// Keyboard
document.addEventListener('keydown', e => {
  const k = e.key.toLowerCase();
  if (k === ' ' || k === 'escape') {
    e.preventDefault();
    if (gameRunning && !gameOver) paused = !paused;
    return;
  }
  if (!gameRunning || paused || gameOver) return;
  switch (k) {
    case 'arrowup':    case 'w': if (dir.y !== 1)  nextDir = { x: 0, y: -1 }; e.preventDefault(); break;
    case 'arrowdown':  case 's': if (dir.y !== -1) nextDir = { x: 0, y: 1 };  e.preventDefault(); break;
    case 'arrowleft':  case 'a': if (dir.x !== 1)  nextDir = { x: -1, y: 0 }; e.preventDefault(); break;
    case 'arrowright': case 'd': if (dir.x !== -1) nextDir = { x: 1, y: 0 };  e.preventDefault(); break;
  }
});

// Mobile D-pad
document.getElementById('btnUp').addEventListener('touchstart',    e => { e.preventDefault(); if (dir.y !== 1)  nextDir = { x: 0, y: -1 }; });
document.getElementById('btnDown').addEventListener('touchstart',  e => { e.preventDefault(); if (dir.y !== -1) nextDir = { x: 0, y: 1 }; });
document.getElementById('btnLeft').addEventListener('touchstart',  e => { e.preventDefault(); if (dir.x !== 1)  nextDir = { x: -1, y: 0 }; });
document.getElementById('btnRight').addEventListener('touchstart', e => { e.preventDefault(); if (dir.x !== -1) nextDir = { x: 1, y: 0 }; });

// Touch swipe
let tx = 0, ty = 0;
canvas.addEventListener('touchstart', e => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; });
canvas.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - tx;
  const dy = e.changedTouches[0].clientY - ty;
  if (Math.max(Math.abs(dx), Math.abs(dy)) < 20) return;
  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 0 && dir.x !== -1) nextDir = { x: 1, y: 0 };
    else if (dx < 0 && dir.x !== 1) nextDir = { x: -1, y: 0 };
  } else {
    if (dy > 0 && dir.y !== -1) nextDir = { x: 0, y: 1 };
    else if (dy < 0 && dir.y !== 1) nextDir = { x: 0, y: -1 };
  }
});

// =============================================
//  INIT & START
// =============================================
const bgInit = ctx.createRadialGradient(W / 2, H / 2, 40, W / 2, H / 2, W / 1.1);
bgInit.addColorStop(0, '#1e1e52');
bgInit.addColorStop(1, '#0d0d2b');
ctx.fillStyle = bgInit;
ctx.fillRect(0, 0, W, H);
drawBg();
requestAnimationFrame(gameLoop);
