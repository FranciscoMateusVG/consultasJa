const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const caminho = path.join(__dirname, "..", "bd", "cnpj.db");

let db = new sqlite3.Database(caminho, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    throw "Erro ao conectar ao banco de dados";
  }
  console.log("Connected to the my database.");
});

db.serialize(function () {
  const query = `
        SELECT * 
        FROM empresas 
        JOIN estabelecimento
        ON empresas.cnpj_basico = estabelecimento.cnpj_basico
        JOIN simples
        on empresas.cnpj_basico = simples.cnpj_basico LIMIT 1
    `;

  db.each(query, function (err, row) {
    console.log(row);
  });
});

db.close();
