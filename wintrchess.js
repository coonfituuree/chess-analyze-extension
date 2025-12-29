(() => {
  window.addEventListener("message", (event) => {
    if (!event.data || event.data.type !== "INSERT_PGN") return;
    const pgn = event.data.pgn;

    const textarea = document.querySelector("textarea.F4_zJ5lO9K5VVnbRoZC1");
    const button = document.querySelector(
      "button.rHBNQrpvd7mwKp3HqjVQ.qgX0SwOb9DIhILObqMfd"
    );

    if (!textarea || !button) return;

    textarea.focus();
    textarea.value = pgn;
    textarea.dispatchEvent(new Event("input", { bubbles: true }));

    setTimeout(() => button.click(), 200);
  });
})();
