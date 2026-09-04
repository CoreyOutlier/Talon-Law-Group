import { chromium } from "playwright";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await p.goto("http://localhost:3711/", { waitUntil: "networkidle" }); await p.waitForTimeout(4500);
const find = async (txt) => p.evaluate((t) => { const el=[...document.querySelectorAll("p,h2")].find(e => (e.textContent||"").toUpperCase().includes(t)); return el ? window.scrollY + el.getBoundingClientRect().top - 140 : 0; }, txt);
for (const [n,t,dy] of [["v3-proof","THE RECORD",0],["v3-gallery","THE LOFT",300],["v3-process","HOW IT WORKS",0],["v3-cta","NO FEE UNLESS WE WIN",0]]) {
  const y = await find(t); await p.evaluate(v => window.scrollTo({top:v,behavior:"instant"}), y+dy); await p.waitForTimeout(2200); await p.screenshot({ path: `/tmp/${n}.png` });
}
for (const path of ["/about","/practice-areas/truck-accidents","/offices/los-angeles","/contact"]) {
  await p.goto("http://localhost:3711"+path, { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
  await p.screenshot({ path: `/tmp/v3-${path.replace(/\//g,"_")}.png` });
}
console.log("ok"); await b.close();
