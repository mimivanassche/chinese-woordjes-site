/*
 * script.js
 *
 * Loopt door de dataset (in data.js) en maakt een knop voor elke Nederlandse vertaling.
 * Wanneer een knop wordt aangeklikt, toont het script de Chinese schrijfwijze, de pinyin
 * en de emoji in een detailsectie. De woorden zijn al alfabetisch gesorteerd in data.js.
 */

document.addEventListener('DOMContentLoaded', () => {
  const buttonsContainer = document.getElementById('buttons');
  const detailSection = document.getElementById('detail');
  const detailTitle = document.getElementById('detail-title');
  const detailChinees = document.getElementById('detail-chinees');
  const detailPinyin = document.getElementById('detail-pinyin');
  const detailEmoji = document.getElementById('detail-emoji');

  // Helper om detail te tonen
  function showDetail(item) {
    detailTitle.textContent = item.nederlands;
    detailChinees.textContent = item.chinees;
    detailPinyin.textContent = item.pinyin;
    detailEmoji.textContent = item.emoji;
    detailSection.hidden = false;
    // Scroll naar detailsectie zodat zichtbaar is op mobiele apparaten
    detailSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Maak voor elk woord een knop
  words.forEach(item => {
    const btn = document.createElement('button');
    btn.textContent = item.nederlands;
    btn.addEventListener('click', () => showDetail(item));
    buttonsContainer.appendChild(btn);
  });
});