"use client";

import { useEffect, useState } from "react";

const API_URL =
  "https://script.google.com/macros/s/AKfycbw9Msp39QIn7mDpZm6jhj2jLHT5raDbLfm47lz616r76d5j_ZaZiA6HJKQfHJvgWg8/exec";

export default function Home() {

  const [nome, setNome] = useState("");
  const [nomeLezione, setNomeLezione] = useState("");
  const [allievi, setAllievi] = useState<string[]>([]);

  // =========================================================
  // ===== CREA ALLIEVO
  // =========================================================

  async function creaAllievo() {

    if (!nome) return;

    const response = await fetch(API_URL, {
      method: "POST",
      mode: "cors",

      body: JSON.stringify({
        azione: "nuovoAllievo",
        nome: nome
      })
    });

    const data = await response.json();

    alert(data.result || "Allievo creato correttamente");

    setNome("");
  }

  // =========================================================
  // ===== SEGNA LEZIONE
  // =========================================================

  async function segnaLezione() {

    if (!nomeLezione) return;

    const response = await fetch(API_URL, {
      method: "POST",
      mode: "cors",

      body: JSON.stringify({
        azione: "segnaLezione",
        nome: nomeLezione
      })
    });

    const data = await response.json();

    alert(data.message);

    setNomeLezione("");
  }

  // =========================================================
  // ===== CARICA ALLIEVI
  // =========================================================

  useEffect(() => {

    async function caricaAllievi() {

      const response = await fetch(API_URL, {
        method: "POST",
        mode: "cors",

        body: JSON.stringify({
          azione: "getAllievi"
        })
      });

      const data = await response.json();

      setAllievi(data.allievi);
    }

    caricaAllievi();

  }, []);

  return (

    <main className="min-h-screen bg-white p-6 flex flex-col gap-6">

      <h1 className="text-3xl font-bold">
        Gestionale Maneggio
      </h1>

      {/* ===== NUOVO ALLIEVO ===== */}

      <input
        type="text"
        placeholder="Nome nuovo allievo"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="border rounded-2xl p-4 text-xl"
      />

      <button
        onClick={creaAllievo}
        className="bg-black text-white rounded-2xl p-6 text-xl font-semibold"
      >
        👤 Nuovo allievo
      </button>

      {/* ===== SEGNA LEZIONE ===== */}

      <select
        value={nomeLezione}
        onChange={(e) => setNomeLezione(e.target.value)}
        className="border rounded-2xl p-4 text-xl"
      >

        <option value="">
          Seleziona allievo
        </option>

        {allievi.map((allievo) => (

          <option
            key={allievo}
            value={allievo}
          >
            {allievo}
          </option>

        ))}

      </select>

      <button
        type="button"
        onClick={() => segnaLezione()}
        className="bg-green-600 text-white rounded-2xl p-6 text-xl font-semibold"
      >
        ➕ Segna lezione
      </button>

    </main>
  );
}