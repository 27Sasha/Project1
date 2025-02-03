async function getData() {
    
    const url = "https://opentdb.com/api.php?amount=10";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      return json.results
    } catch (error) {
      console.error(error.message);
    }}

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Get a random index
        [array[i], array[j]] = [array[j], array[i]];  // Swap elements
    }
    return array;
}
