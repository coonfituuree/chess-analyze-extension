(() => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  function clickShare() {
    const shareButton =
      document.querySelector('button[aria-label="Поделиться"]') ||
      document.querySelector('button[aria-label="Share"]');
    shareButton?.click();
  }

  function clickPGNTab() {
    document
      .querySelector('#tab-pgn, button[aria-controls="tabpanel-pgn"]')
      ?.click();
  }

  function getPGN() {
    return (
      document.querySelector("textarea.share-menu-tab-pgn-textarea")?.value ||
      null
    );
  }

  async function handleClick() {
    clickShare();
    await sleep(3000);
    clickPGNTab();
    await sleep(3000);

    const pgn = getPGN();
    if (!pgn) {
      alert("PGN не найден");
      return;
    }

    const win = window.open("https://wintrchess.com/analysis", "_blank");
    if (!win) return;

    const interval = setInterval(() => {
      win.postMessage({ type: "INSERT_PGN", pgn }, "*");
    }, 300);

    setTimeout(() => clearInterval(interval), 5000);
  }

  function injectButton() {
    if (document.getElementById("chess-wintr-btn")) return;

    const container =
      document.querySelector(".game-review-buttons-component") ||
      document.querySelector('[data-testid="game-over"]');
    if (!container) return;

    const btn = document.createElement("button");
    btn.id = "chess-wintr-btn";
    btn.textContent = "♟ Analyse on WintrChess";
    btn.style.cssText = `
      margin-top: 12px;
      padding: 10px 14px;
      font-size: 14px;
      background: #7fa650;
      color: #fff;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    `;
    btn.addEventListener("click", handleClick);
    container.appendChild(btn);
  }

  new MutationObserver(injectButton).observe(document.body, {
    childList: true,
    subtree: true,
  });
})();
