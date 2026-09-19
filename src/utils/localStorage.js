export  function loadState(){
    try {
        const serialized = localStorage.getItem('FlashcardAppState');
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