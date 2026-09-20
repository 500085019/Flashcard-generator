// Reads the persisted Redux state from the browser's localStorage.
// Returns undefined (instead of throwing) if nothing is saved yet,
// or if the saved data is malformed — this lets Redux fall back to
// its normal initial state instead of crashing on a bad read.
export  function loadState(){
    try {
        const serialized = localStorage.getItem('flashcardAppState');
        if (serialized == null) return undefined;
        return JSON.parse(serialized)
        
    } catch (error) {
        console.error('Could not load state',error)
        return undefined
        
    }
}

export function saveState(state) {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem('flashcardAppState', serialized);
  } catch (err) {
    console.error('Could not save state', err);
  }
}