/*
 * oefenen.js
 *
 * Dit script genereert knoppen voor elke categorie uit de dataset (oefenen_data.js).
 * Wanneer op een categorieknop geklikt wordt, worden de woorden van die categorie
 * weergegeven in een tabel met kolommen voor Nederlands, Chinees, pinyin en emoji.
 */

document.addEventListener('DOMContentLoaded', () => {
  const practiceButtons = document.getElementById('practice-buttons');
  const categorySection = document.getElementById('category-section');
  const categoryTitle = document.getElementById('category-title');
  const categoryTableBody = document.querySelector('#category-table tbody');

  // Overlay elementen voor het tonen van grote emoji's
  const emojiOverlay = document.getElementById('emoji-overlay');
  const emojiDisplay = document.getElementById('emoji-display');
  const nextEmojiBtn = document.getElementById('next-emoji');
  const closeEmojiBtn = document.getElementById('close-emoji');
  // Huidige lijst met items en index voor overlay navigatie
  let currentCategoryItems = [];
  let currentIndex = 0;

  // Maak een knop voor elke categorie
  Object.keys(oefenenWords).forEach(category => {
    const btn = document.createElement('button');
    btn.textContent = category;
    btn.addEventListener('click', () => {
      showCategory(category);
    });
    practiceButtons.appendChild(btn);
  });

  function showCategory(category) {
    // Stel titel in
    categoryTitle.textContent = category;
    // Maak tabel lichaam leeg
    categoryTableBody.innerHTML = '';
    // Voeg een rij toe voor elk woord in de categorie
    const items = oefenenWords[category];
    currentCategoryItems = items;
    currentIndex = 0;
    items.forEach((item, index) => {
      const tr = document.createElement('tr');
      // Nederlands
      const tdNl = document.createElement('td');
      tdNl.textContent = item.nederlands;
      tr.appendChild(tdNl);
      // Chinees
      const tdCh = document.createElement('td');
      tdCh.textContent = item.chinees;
      tr.appendChild(tdCh);
      // Pinyin
      const tdPy = document.createElement('td');
      tdPy.textContent = item.pinyin;
      tr.appendChild(tdPy);
      // Emoji
      const tdEm = document.createElement('td');
      tdEm.textContent = item.emoji;
      tdEm.classList.add('emoji-cell');
      // Klik op emoji toont overlay
      tdEm.addEventListener('click', () => {
        openEmojiOverlay(index);
      });
      tr.appendChild(tdEm);
      categoryTableBody.appendChild(tr);
    });
    // Toon sectie
    categorySection.hidden = false;
    // Scroll naar boven zodat de tabel zichtbaar is zonder scrollen
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Toon overlay met grote emoji voor het gegeven index van currentCategoryItems
   */
  function openEmojiOverlay(index) {
    currentIndex = index;
    updateEmojiDisplay();
    emojiOverlay.hidden = false;
  }

  /**
   * Update de emoji die in de overlay wordt weergegeven
   */
  function updateEmojiDisplay() {
    if (!currentCategoryItems || currentCategoryItems.length === 0) return;
    const item = currentCategoryItems[currentIndex];
    emojiDisplay.textContent = item.emoji;
  }

  /**
   * Ga naar volgende emoji in de huidige categorie
   */
  function showNextEmoji() {
    if (!currentCategoryItems || currentCategoryItems.length === 0) return;
    currentIndex = (currentIndex + 1) % currentCategoryItems.length;
    updateEmojiDisplay();
  }

  /**
   * Sluit de emoji-overlay
   */
  function closeOverlay() {
    emojiOverlay.hidden = true;
  }

  // Eventlisteners voor navigatieknoppen in overlay
  nextEmojiBtn.addEventListener('click', showNextEmoji);
  closeEmojiBtn.addEventListener('click', closeOverlay);
  // Klik buiten content sluit overlay
  emojiOverlay.addEventListener('click', (event) => {
    if (event.target === emojiOverlay) {
      closeOverlay();
    }
  });
});