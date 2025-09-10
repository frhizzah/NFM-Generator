let uldIndex = 1;
let availableIndices = [];


function populateDateDropdown() {
  const dateSelect = document.getElementById('flightDate');
  const today = new Date();
  for (let i = 1; i <= 31; i++) {
    const option = document.createElement('option');
    const value = String(i).padStart(2, '0');
    option.value = value;
    option.textContent = value;
    if (i === today.getDate()) option.selected = true;
    dateSelect.appendChild(option);
  }

  const monthSelect = document.getElementById('flightMonth');
  const monthNames = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  monthSelect.value = monthNames[today.getMonth()];
}

function getNextIndex() {
  return availableIndices.length > 0 ? availableIndices.shift() : uldIndex++;
}

function addULD() {

  if (document.querySelectorAll('.tab-list li').length >= 20) {
    alert("You cannot add more than 20 tabs.");
    return;
  }

  const index = getNextIndex();
  const tabList = document.getElementById('tabList');
  const uldContainer = document.getElementById('uldContainer');

  // Create tab button
  const tab = document.createElement('li');
  tab.textContent = `#${index}`;
  tab.dataset.tab = `uld${index}`;
  tab.onclick = () => switchTab(tab.dataset.tab);
  tab.id = `tab-uld${index}`;
  tabList.appendChild(tab);

  // Create ULD container with trash bin
  const form = document.createElement('div');
  form.className = 'uld-entry';
  form.id = `uld${index}`;
  form.innerHTML = `
    <div class="trash-bin" onclick="deleteULD(${index})">🗑️</div>
    
    ${generateULDFormHTML(index)}
  `;
  uldContainer.appendChild(form);

  switchTab(`uld${index}`);
}

function switchTab(id) {
  document.querySelectorAll('#tabList li').forEach(li => li.classList.remove('active'));
  document.querySelectorAll('.tab-content > div').forEach(div => div.classList.remove('active'));

  const activeTab = document.querySelector(`#tabList li[data-tab="${id}"]`);
  const activeContent = document.getElementById(id);
  if (activeTab && activeContent) {
    activeTab.classList.add('active');
    activeContent.classList.add('active');
  }
}

function deleteULD(index) {
  if (confirm(`Are you sure you want to delete ULD #${index}?`)) {
    const uldEntry = document.getElementById(`uld${index}`);
    const tab = document.getElementById(`tab-uld${index}`);
    
    // Remove the ULD entry and tab
    if (uldEntry) uldEntry.remove();
    if (tab) tab.remove();
    
    // Recycle the index and ensure it's available for the next ULD
    availableIndices.push(index);
    availableIndices.sort((a, b) => a - b);
    
    // After deletion, switch to the first tab
    if (tabList.children.length > 0) {
      switchTab(tabList.children[0].dataset.tab);
    }
  }
}

function generateULDFormHTML(index) {
    return `
      <div class="form-row">
        <div class="form-group">
          <label class="required">ULD Type</label>
          <select class="uldType" required>
            <option value="">Select</option>
            <option value="AKE">AKE</option>
            <option value="PAG">PAG</option>
            <option value="PMC">PMC</option>
            <option value="PKC">PKC</option>
            <option value="PLA">PLA</option>
            <option value="PLD">PLD</option>
          </select>
        </div>
        <div class="form-group">
          <label class="required">ULD Number</label>
          <input class="uldNumber" required>
        </div>
        <div class="form-group">
          <label class="required">ULD Suffix</label>
          <input class="uldSuffix" required>
        </div>
      </div>
  
      <div class="form-row">
        <div class="form-group">
          <label class="required">Build Code</label>
          <select class="buildCode" required>
            <option value="">Select</option>
            <option value="E">E - Built by GHA</option>
            <option value="A">A - Received Intact</option>
          </select>
        </div>
        <div class="form-group">
          <label class="required">LHR/LGW Handling Code</label>
          <select class="handlingCode" required>
            <option value="">Select</option>
            <option value="T">T - Transhipment Unit</option>
            <option value="B">B - Unit for Break</option>
            <option value="D">D - Intact Dispatch</option>
          </select>
        </div>
        <div class="form-group">
          <label class="required">Product Code</label>
          <select class="productCode" required>
            <option value="">Select</option>
            <option value="F">F - Express ULD</option>
            <option value="M">M - General Cargo</option>
          </select>
        </div>
      </div>
  
      <div class="form-row">
        <div class="form-group">
          <label class="required">Overhang</label>
          <select class="overhang" required>
            <option value="0" selected>0 - No Overhang</option>
            <option value="1">1 - Overhang 1 Side</option>
            <option value="2">2 - Overhang Both Sides</option>
          </select>
        </div>
        <div class="form-group">
          <label class="required">Gross Weight (kg)</label>
          <input class="grossWeight" type="number" required>
        </div>
      </div>
  
      <div class="form-row">
        <div class="form-group">
          <label>Transfer Routing 1</label>
          <input class="transferRouting1">
        </div>
        <div class="form-group">
          <label>Handling Code 1</label>
          <select class="handlingCode1">
            <option value="">Select</option>
            <option value="T">T - Transhipment Unit</option>
            <option value="B">B - Unit for Break</option>
            <option value="D">D - Intact Dispatch</option>
          </select>
        </div>
      </div>
  
      <div class="form-row">
        <div class="form-group">
          <label>Transfer Routing 2</label>
          <input class="transferRouting2">
        </div>
        <div class="form-group">
          <label>Handling Code 2</label>
          <select class="handlingCode2">
            <option value="">Select</option>
            <option value="T">T - Transhipment Unit</option>
            <option value="B">B - Unit for Break</option>
            <option value="D">D - Intact Dispatch</option>
          </select>
        </div>
      </div>
  
      <div class="form-row">
        <div class="form-group">
          <label>Transfer Routing 3</label>
          <input class="transferRouting3">
        </div>
        <div class="form-group">
          <label>Handling Code 3</label>
          <select class="handlingCode3">
            <option value="">Select</option>
            <option value="T">T - Transhipment Unit</option>
            <option value="B">B - Unit for Break</option>
            <option value="D">D - Intact Dispatch</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Transfer Routing 4</label>
          <input class="transferRouting4">
        </div>
        <div class="form-group">
          <label>Handling Code 4</label>
          <select class="handlingCode4">
            <option value="">Select</option>
            <option value="T">T - Transhipment Unit</option>
            <option value="B">B - Unit for Break</option>
            <option value="D">D - Intact Dispatch</option>
          </select>
        </div>
      </div>
    `;
  }
  

function generateNFM() {
  const flightNumber = document.getElementById('flightNumber').value.trim();
  const flightDate = document.getElementById('flightDate').value;
  const flightMonth = document.getElementById('flightMonth').value;
  const origin = document.getElementById('origin').value.trim().toUpperCase();
  const destination = document.getElementById('destination').value.trim().toUpperCase();

  if (!flightNumber || !flightDate || !flightMonth || !origin || !destination) {
    alert("Please complete the flight details.");
    return;
  }

  let nfm = `NFM/001\nFLT/${flightNumber}/${flightDate}${flightMonth}\nRTG/${origin}${destination}`;

  const ulds = document.querySelectorAll('.uld-entry');
  for (let uld of ulds) {
    const t = uld.querySelector('.uldType').value.trim();
    let n = uld.querySelector('.uldNumber').value.trim();
    const s = uld.querySelector('.uldSuffix').value.trim();
    const b = uld.querySelector('.buildCode').value.trim();
    const h = uld.querySelector('.handlingCode').value.trim();
    const p = uld.querySelector('.productCode').value.trim();
    const o = uld.querySelector('.overhang').value.trim();
    const g = uld.querySelector('.grossWeight').value.trim();

    if (!t || !n || !s || !b || !h || !p || !o || !g) {
      alert("Please complete all required ULD fields.");
      return;
    }

    if (isNaN(g)) {
      alert("Gross weight must be a number.");
      return;
    }

    n = n.padStart(5, '0');

    const r1 = uld.querySelector('.transferRouting1').value.trim();
    const hc1 = uld.querySelector('.handlingCode1').value.trim();
    const r2 = uld.querySelector('.transferRouting2').value.trim();
    const hc2 = uld.querySelector('.handlingCode2').value.trim();
    const r3 = uld.querySelector('.transferRouting3').value.trim();
    const hc3 = uld.querySelector('.handlingCode3').value.trim();
    const r4 = uld.querySelector('.transferRouting4').value.trim();
    const hc4 = uld.querySelector('.handlingCode4').value.trim();

    nfm += `\nULD/${t}${n}${s}/${b}/${h}/P${p}/O${o}/GK${g}/CL/V0`;

    if (r1 || hc1 || r2 || hc2 || r3 || hc3 || r4 || hc4) {
      let transfer = [];
      if (r1 || hc1) transfer.push(`${r1}/${hc1}`);
      if (r2 || hc2) transfer.push(`${r2}/${hc2}`);
      if (r3 || hc3) transfer.push(`${r3}/${hc3}`);
      if (r4 || hc4) transfer.push(`${r4}/${hc4}`);
      nfm += `\n${transfer.join('/')}`;
    }
  }

  document.getElementById('nfmOutput').textContent = nfm;
}

function copyNFM() {
  const nfmOutputElement = document.getElementById('nfmOutput');
  const nfmOutputText = nfmOutputElement ? nfmOutputElement.textContent.trim() : "";

  if (nfmOutputText) {
    // If there's content in the NFM output, copy it
    navigator.clipboard.writeText(nfmOutputText).then(() => {
      alert("NFM Message copied!");
    });
  } else {
    // If there's no content, display a message saying it cannot be copied
    alert("No NFM Message to Copy.");
  }
}


function clearAll() {
  document.getElementById('flightNumber').value = 'BA034';
  document.getElementById('origin').value = 'KUL';
  document.getElementById('destination').value = 'LHR';
  document.getElementById('tabList').innerHTML = '';
  document.getElementById('uldContainer').innerHTML = '';
  document.getElementById('nfmOutput').textContent = '';
  uldIndex = 1;
  availableIndices = [];
  addULD();
}

window.onload = function () {
  populateDateDropdown();
  document.getElementById('flightNumber').value = 'BA034';
  addULD();
};

