// stateManager.js
const fs = require('fs');
const path = require('path');

// File to store the state
const ARR_STATE_FILE = path.join(__dirname, 'arrw.json');

// Default state
const defaultState = {
  item: "",
  theme: "",
  dateSet: null
};

// Load state from file, or use defaults
function loadState() {
  if (fs.existsSync(ARR_STATE_FILE)) {
    const raw = fs.readFileSync(ARR_STATE_FILE, 'utf-8');
    return JSON.parse(raw);
  }
  return { ...defaultState };
}

// Save state to file
function saveState(state) {
  fs.writeFileSync(ARR_STATE_FILE, JSON.stringify(state, null, 2));
}

// Update state and persist it
function updateState(updates) {
  const currentState = loadState();
  const newState = { ...currentState, ...updates };
  saveState(newState);
  return newState;
}

module.exports = {
  loadState,
  saveState,
  updateState
};