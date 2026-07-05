/* Minimaler Webserver für Railway — liefert den NFT-Generator aus.
   Keine Abhängigkeiten nötig: nutzt nur Node-Bordmittel. */
const http = require("http");
const fs = require("fs");
const path = require("path");

// Railway gibt den Port über die Umgebungsvariable PORT vor
const PORT = process.env.PORT || 3000;

// Die HTML-Datei einmal beim Start laden (sie ändert sich zur Laufzeit nicht)
const SEITE = fs.readFileSync(path.join(__dirname, "nft-generator.html"));

const server = http.createServer((req, res) => {
  // Nur die Startseite und der direkte Dateiname werden bedient —
  // alles andere bekommt 404 (kein Verzeichnis-Listing, kein Path-Traversal)
  const url = req.url.split("?")[0];
  if (req.method === "GET" && (url === "/" || url === "/nft-generator.html")) {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-cache",
    });
    res.end(SEITE);
    return;
  }
  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("404 – nicht gefunden");
});

server.listen(PORT, () => {
  console.log(`NFT-Generator läuft auf Port ${PORT}`);
});
