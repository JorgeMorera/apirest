import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () => {
  try {
    const data = fs.readFileSync("./db.json");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync("./db.json", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

app.get("/", (req, res) => {
  res.send("bienvenidos a mi api");
});

app.get("/discos", (req, res) => {
  const data = readData();
  res.json(data.discografia);
});

app.get("/discos/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const discos = data.discos.find((discos) => discos.id === id);
  res.json(discos);
});

app.post("/discos", (req, res) => {
  const data = readData();
  const body = req.body;
  const nuevoDisco = {
    id: data.discos.length + 1,
    ...body,
  };
  data.discos.push(nuevoDisco);
  writeData(data);
  res.json(nuevoDisco);
});

app.put("/discos/:id", (req, res) => {
  const data = readData();
  const body = req.body;
  const id = parseInt(req.params.id);
  const discoIndice = data.discos.findIndex((disco) => disco.id === id);
  data.discos[discoIndice] = {
    ...data.discos[discoIndice],
    ...body,
  };
  writeData(data);
  res.json({ message: "Disco Actualizado" });
});

app.delete("/discos/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const discoIndice = data.discos.findIndex((disco) => disco.id === id);
  data.disco.splice(discoIndice, 1);
  writeData(data);
  res.json({ message: "Disco Borrado" });
});

app.listen(0.0.0.0, () => {
  console.log("Servidor funcionando en servidor 3000");
});
