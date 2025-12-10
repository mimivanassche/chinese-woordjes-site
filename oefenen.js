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

  /**
   * Spreek de opgegeven tekst hardop met de gegeven taalcode.
   * Deze functie maakt gebruik van de Web Speech API (speechSynthesis).
   * @param {string} text - De tekst die uitgesproken moet worden
   * @param {string} lang - De taalcode, bijvoorbeeld 'nl-NL' of 'zh-CN'
   */
  function speakText(text, lang) {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  }

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
      // Voeg geluidsicoon toe naast het Nederlandse woord
      const nlIcon = document.createElement('span');
      nlIcon.textContent = '🔊';
      nlIcon.classList.add('audio-icon');
      nlIcon.setAttribute('title', 'Luister Nederlands');
      nlIcon.addEventListener('click', (e) => {
        // voorkom dat de klik het rijselectiegedrag beïnvloedt
        e.stopPropagation();
        speakText(item.nederlands, 'nl-NL');
      });
      tdNl.appendChild(nlIcon);
      tr.appendChild(tdNl);
      // Chinees
      const tdCh = document.createElement('td');
      tdCh.textContent = item.chinees;
      // Voeg geluidsicoon toe naast de Chinese tekens
      const chIcon = document.createElement('span');
      chIcon.textContent = '🔊';
      chIcon.classList.add('audio-icon');
      chIcon.setAttribute('title', 'Luister Chinees');
      chIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        // gebruik de Chinese tekens voor uitspraak
        speakText(item.chinees, 'zh-CN');
      });
      tdCh.appendChild(chIcon);
      tr.appendChild(tdCh);
      // Pinyin (alleen tekst zonder audio)
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