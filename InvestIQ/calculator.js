// ---- Tab switching ----
function showTab(name, clickedLink) {
  var allTabs = document.querySelectorAll('.tab-page');
  for (var i = 0; i < allTabs.length; i++) {
    allTabs[i].classList.remove('active');
  }

  document.getElementById('tab-' + name).classList.add('active');

  var allLinks = document.querySelectorAll('.nav-links a');
  for (var j = 0; j < allLinks.length; j++) {
    allLinks[j].classList.remove('active');
  }
  if (clickedLink) {
    clickedLink.classList.add('active');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---- Calculator panel switching ----
function switchCalc(btn, id) {
  var allBtns = document.querySelectorAll('.calc-btn');
  for (var i = 0; i < allBtns.length; i++) {
    allBtns[i].classList.remove('active');
  }
  btn.classList.add('active');

  var allPanels = document.querySelectorAll('.calc-panel');
  for (var j = 0; j < allPanels.length; j++) {
    allPanels[j].classList.remove('active');
  }
  document.getElementById('cp-' + id).classList.add('active');
}

// ---- Helper: format number as Indian currency ----
function formatINR(num) {
  var n = Math.round(num);
  if (n >= 10000000) return '₹' + (n / 10000000).toFixed(2) + ' Cr';
  if (n >= 100000)   return '₹' + (n / 100000).toFixed(2) + ' L';
  return '₹' + n.toLocaleString('en-IN');
}

function formatFull(num) {
  return '₹' + Math.round(num).toLocaleString('en-IN');
}

// ---- Home Loan EMI ----
function doHomeLoan() {
  var P = parseFloat(document.getElementById('hl-amt').value) || 5000000;
  var r = parseFloat(document.getElementById('hl-r').value) / 12 / 100;
  var n = parseFloat(document.getElementById('hl-t').value) * 12;

  var emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  var total = emi * n;
  var interest = total - P;
  var fee = P * 0.01;

  document.getElementById('hl-emi').textContent  = formatFull(emi);
  document.getElementById('hl-rp').textContent   = formatFull(P);
  document.getElementById('hl-ri').textContent   = formatFull(interest);
  document.getElementById('hl-rt').textContent   = formatFull(total);
  document.getElementById('hl-rf').textContent   = formatFull(fee);
  document.getElementById('hl-desc').textContent = 'For ' + formatINR(P) + ' at ' + document.getElementById('hl-r').value + '% for ' + document.getElementById('hl-t').value + ' years';

  var pPct = Math.round(P / total * 100);
  document.getElementById('hl-bp').style.width = pPct + '%';
  document.getElementById('hl-bi').style.width = (100 - pPct) + '%';
}

// ---- Car Loan EMI ----
function doCarLoan() {
  var price = parseFloat(document.getElementById('car-amt').value)  || 800000;
  var down  = parseFloat(document.getElementById('car-down').value) || 200000;
  var P = price - down;
  var r = parseFloat(document.getElementById('car-r').value) / 12 / 100;
  var n = parseFloat(document.getElementById('car-t').value) * 12;

  var emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  var total = emi * n;
  var interest = total - P;

  document.getElementById('car-emi').textContent  = formatFull(emi);
  document.getElementById('car-rp').textContent   = formatFull(P);
  document.getElementById('car-ri').textContent   = formatFull(interest);
  document.getElementById('car-rt').textContent   = formatFull(price + interest);
  document.getElementById('car-desc').textContent = 'For ' + formatINR(P) + ' at ' + document.getElementById('car-r').value + '% for ' + document.getElementById('car-t').value + ' years';

  var pPct = Math.round(P / total * 100);
  document.getElementById('car-bp').style.width = pPct + '%';
  document.getElementById('car-bi').style.width = (100 - pPct) + '%';
}

// ---- Bike Loan EMI ----
function doBikeLoan() {
  var price = parseFloat(document.getElementById('bike-amt').value)  || 150000;
  var down  = parseFloat(document.getElementById('bike-down').value) || 30000;
  var P = price - down;
  var r = parseFloat(document.getElementById('bike-r').value) / 12 / 100;
  var n = parseFloat(document.getElementById('bike-t').value) * 12;

  var emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  var total = emi * n;
  var interest = total - P;

  document.getElementById('bike-emi').textContent  = formatFull(emi);
  document.getElementById('bike-rp').textContent   = formatFull(P);
  document.getElementById('bike-ri').textContent   = formatFull(interest);
  document.getElementById('bike-rt').textContent   = formatFull(total);
  document.getElementById('bike-desc').textContent = 'For ' + formatINR(P) + ' at ' + document.getElementById('bike-r').value + '% for ' + document.getElementById('bike-t').value + ' years';

  var pPct = Math.round(P / total * 100);
  document.getElementById('bike-bp').style.width = pPct + '%';
  document.getElementById('bike-bi').style.width = (100 - pPct) + '%';
}

// ---- SIP Calculator ----
function doSIP() {
  var m = parseFloat(document.getElementById('sip-a').value) || 5000;
  var r = parseFloat(document.getElementById('sip-r').value) / 12 / 100;
  var n = parseFloat(document.getElementById('sip-p').value) * 12;

  var fv = m * (Math.pow(1 + r, n) - 1) / r * (1 + r);
  var invested = m * n;
  var returns = fv - invested;
  var gainPct = (returns / invested * 100).toFixed(1);

  document.getElementById('sip-final').textContent = formatINR(fv);
  document.getElementById('sip-desc').textContent  = 'Invested ' + formatINR(invested) + ' · Gains ' + formatINR(returns);
  document.getElementById('sip-val-a').textContent = formatINR(invested);
  document.getElementById('sip-val-b').textContent = formatINR(returns);
  document.getElementById('sip-val-c').textContent = formatINR(fv);
  document.getElementById('sip-gain').textContent  = '+' + gainPct + '%';

  var invPct = Math.round(invested / fv * 100);
  var retPct = 100 - invPct;
  document.getElementById('sip-bar-a').style.width = invPct + '%';
  document.getElementById('sip-bar-b').style.width = retPct + '%';
}

// ---- Lump Sum Calculator ----
function doLumpsum() {
  var P    = parseFloat(document.getElementById('ls-amt').value) || 100000;
  var rate = parseFloat(document.getElementById('ls-r').value)   || 12;
  var yrs  = parseFloat(document.getElementById('ls-p').value)   || 10;

  var fv   = P * Math.pow(1 + rate / 100, yrs);
  var gain = fv - P;
  var retPct = (gain / P * 100).toFixed(1);
  var doubleYrs = (72 / rate).toFixed(1);

  document.getElementById('ls-final').textContent  = formatINR(fv);
  document.getElementById('ls-ri').textContent     = formatFull(P);
  document.getElementById('ls-rg').textContent     = formatINR(gain);
  document.getElementById('ls-rr').textContent     = '+' + retPct + '%';
  document.getElementById('ls-rc').textContent     = rate + '%';
  document.getElementById('ls-double').textContent = doubleYrs + ' years';
}

// ---- FD Calculator ----
function doFD() {
  var P    = parseFloat(document.getElementById('fd-amt').value)  || 100000;
  var r    = parseFloat(document.getElementById('fd-r').value)    || 7;
  var n    = parseFloat(document.getElementById('fd-t').value)    || 3;
  var freq = parseInt(document.getElementById('fd-freq').value)   || 4;

  var fv       = P * Math.pow(1 + r / (freq * 100), freq * n);
  var interest = fv - P;
  var effYield = (Math.pow(1 + r / (freq * 100), freq) - 1) * 100;
  var tds      = interest * 0.10;
  var afterTDS = fv - tds;

  document.getElementById('fd-final').textContent = formatINR(fv);
  document.getElementById('fd-rp').textContent    = formatFull(P);
  document.getElementById('fd-ri').textContent    = formatINR(interest);
  document.getElementById('fd-ry').textContent    = effYield.toFixed(2) + '%';
  document.getElementById('fd-tds').textContent   = formatINR(afterTDS);
}

// ---- Stock picker ----
var stockInfo = {
  AAPL:  { price: '$192.40', name: 'Apple Inc.',     open: '$189.30', high: '$193.80', low: '$188.90', vol: '58.2M',  w52: '$199/$124', up: true  },
  MSFT:  { price: '$415.30', name: 'Microsoft Corp.',open: '$411.50', high: '$418.20', low: '$410.80', vol: '22.4M',  w52: '$430/$310', up: true  },
  GOOGL: { price: '$175.80', name: 'Alphabet Inc.',  open: '$177.40', high: '$178.10', low: '$174.20', vol: '28.1M',  w52: '$196/$128', up: false },
  NVDA:  { price: '$875.20', name: 'NVIDIA Corp.',   open: '$846.00', high: '$882.50', low: '$840.00', vol: '44.8M',  w52: '$974/$403', up: true  },
  AMZN:  { price: '$186.90', name: 'Amazon.com',     open: '$184.20', high: '$188.40', low: '$183.50', vol: '36.7M',  w52: '$201/$118', up: true  },
};

function pickStock(sym, price, name, el) {
  var all = document.querySelectorAll('.ticker-card');
  for (var i = 0; i < all.length; i++) {
    all[i].style.borderColor = '#1e2d40';
  }
  el.style.borderColor = '#3ddba8';

  var info = stockInfo[sym];
  if (!info) return;

  document.getElementById('chartPrice').textContent = info.price;
  document.getElementById('chartName').textContent  = sym + ' · ' + info.name;
  document.getElementById('ksOpen').textContent = info.open;
  document.getElementById('ksHigh').textContent = info.high;
  document.getElementById('ksLow').textContent  = info.low;
  document.getElementById('ksVol').textContent  = info.vol;
  document.getElementById('ks52w').textContent  = info.w52;

  var color = info.up ? '#3ddba8' : '#f43f5e';
  document.getElementById('chartLine').setAttribute('stroke', color);
}

function pickRange(btn) {
  var allBtns = document.querySelectorAll('.range-btn');
  for (var i = 0; i < allBtns.length; i++) {
    allBtns[i].classList.remove('active');
  }
  btn.classList.add('active');
}

// ---- Market movers ----
var gainersHTML = '<div class="mover-row"><div class="mv-left"><div class="mv-icon" style="background:rgba(61,219,168,0.1);">🔬</div><div><div class="mv-sym">NVDA</div><div class="mv-name-small">NVIDIA</div></div></div><div class="mv-right"><div class="mv-price">$875.20</div><div class="mv-chg-val up-text">▲ +3.4%</div></div></div><div class="mover-row"><div class="mv-left"><div class="mv-icon" style="background:rgba(61,219,168,0.1);">📱</div><div><div class="mv-sym">META</div><div class="mv-name-small">Meta</div></div></div><div class="mv-right"><div class="mv-price">$508.40</div><div class="mv-chg-val up-text">▲ +2.1%</div></div></div><div class="mover-row"><div class="mv-left"><div class="mv-icon" style="background:rgba(61,219,168,0.1);">🍎</div><div><div class="mv-sym">AAPL</div><div class="mv-name-small">Apple</div></div></div><div class="mv-right"><div class="mv-price">$192.40</div><div class="mv-chg-val up-text">▲ +1.2%</div></div></div><div class="mover-row"><div class="mv-left"><div class="mv-icon" style="background:rgba(61,219,168,0.1);">🛒</div><div><div class="mv-sym">AMZN</div><div class="mv-name-small">Amazon</div></div></div><div class="mv-right"><div class="mv-price">$186.90</div><div class="mv-chg-val up-text">▲ +1.6%</div></div></div>';

var losersHTML = '<div class="mover-row"><div class="mv-left"><div class="mv-icon" style="background:rgba(244,63,94,0.1);">⚡</div><div><div class="mv-sym">TSLA</div><div class="mv-name-small">Tesla</div></div></div><div class="mv-right"><div class="mv-price">$248.90</div><div class="mv-chg-val down-text">▼ -0.5%</div></div></div><div class="mover-row"><div class="mv-left"><div class="mv-icon" style="background:rgba(244,63,94,0.1);">🔍</div><div><div class="mv-sym">GOOGL</div><div class="mv-name-small">Alphabet</div></div></div><div class="mv-right"><div class="mv-price">$175.80</div><div class="mv-chg-val down-text">▼ -0.4%</div></div></div><div class="mover-row"><div class="mv-left"><div class="mv-icon" style="background:rgba(244,63,94,0.1);">💻</div><div><div class="mv-sym">TCS</div><div class="mv-name-small">Tata Consultancy</div></div></div><div class="mv-right"><div class="mv-price">₹3,980</div><div class="mv-chg-val down-text">▼ -0.3%</div></div></div><div class="mover-row"><div class="mv-left"><div class="mv-icon" style="background:rgba(244,63,94,0.1);">◎</div><div><div class="mv-sym">SOL</div><div class="mv-name-small">Solana</div></div></div><div class="mv-right"><div class="mv-price">$98.40</div><div class="mv-chg-val down-text">▼ -0.6%</div></div></div>';

function switchMovers(btn, type) {
  var allBtns = document.querySelectorAll('.mv-tab-btn');
  for (var i = 0; i < allBtns.length; i++) {
    allBtns[i].classList.remove('active');
  }
  btn.classList.add('active');
  document.getElementById('moversContent').innerHTML = (type === 'gainers') ? gainersHTML : losersHTML;
}

// ---- Run default calculations on page load ----
window.onload = function() {
  doHomeLoan();
  doCarLoan();
  doBikeLoan();
  doSIP();
  doLumpsum();
  doFD();
};