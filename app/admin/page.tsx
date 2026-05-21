import { loadSheet } from "../../lib/google";
import Link from "next/link";

export default async function AdminPage() {

  const doc = await loadSheet();

  const sheet = doc.sheetsByTitle["Generale"];

  await sheet.loadCells();

  const totaleAttivi =
    sheet.getCellByA1("J1").value;

  const allieviAttivi = [];
  const allieviNonAttivi = [];

  for (let row = 2; row < 100; row++) {

    const attivo =
      sheet.getCellByA1(`A${row}`).value;

    const nome =
      sheet.getCellByA1(`B${row}`).value;

    const residue =
      sheet.getCellByA1(`C${row}`).value;

    const stato =
      sheet.getCellByA1(`D${row}`).value;

    const assicurazione =
      sheet.getCellByA1(`H${row}`).value;

    if (nome) {

      const token = String(nome)
        .toLowerCase()
        .replace(/\s+/g, "");

      const allievo = {
        nome: String(nome),
        residue: String(residue || "0"),
        stato: String(stato || ""),
        assicurazione: String(assicurazione || ""),
        token,
      };

      if (String(attivo) === "Attivo") {
        allieviAttivi.push(allievo);
      } else {
        allieviNonAttivi.push(allievo);
      }

    }
  }

  // ORDINE ALFABETICO

  allieviAttivi.sort((a, b) =>
    a.nome.localeCompare(b.nome)
  );

  allieviNonAttivi.sort((a, b) =>
    a.nome.localeCompare(b.nome)
  );

  // COMPONENTE RIGA

  const RigaAllievo = ({ allievo }: any) => (

    <div
      className="grid grid-cols-5 gap-2 p-3 border-b border-stone-100 items-center text-sm"
    >

      {/* NOME */}

      <div className="font-medium text-black truncate">
        {allievo.nome}
      </div>

      {/* RESIDUE */}

      <div className="text-center font-semibold text-black">
        {allievo.residue}
      </div>

      {/* STATO */}

      <div className="text-center text-xs">
        {allievo.stato}
      </div>

      {/* ASSICURAZIONE */}

      <div className="text-center text-xs">
        {allievo.assicurazione}
      </div>

      {/* SCHEDA */}

      <div className="text-right">

        <Link
          href={`/u/${allievo.token}`}
          className="inline-block bg-black text-white px-3 py-1 rounded-lg text-xs font-medium"
        >
          Apri
        </Link>

      </div>

    </div>

  );

  return (

    <main className="min-h-screen bg-stone-100 p-4">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-6">

          <h1 className="text-2xl font-bold text-black">
            🏇 Dashboard
          </h1>

          <p className="text-sm text-gray-600 mt-1">
            Allievi attivi: {String(totaleAttivi)}
          </p>

        </div>

        {/* TABELLA */}

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          {/* HEADER */}

          <div className="grid grid-cols-5 gap-2 p-3 bg-stone-100 border-b border-stone-200 text-xs font-bold text-gray-700">

            <div>Allievo</div>

            <div className="text-center">
              Lez. residue
            </div>

            <div className="text-center">
              Stato
            </div>

            <div className="text-center">
              Assicurazione
            </div>

            <div className="text-right">
              Scheda
            </div>

          </div>

          {/* ATTIVI */}

          {allieviAttivi.map((allievo, index) => (

            <RigaAllievo
              key={index}
              allievo={allievo}
            />

          ))}

        </div>

        {/* NON ATTIVI */}

        <div className="mt-8">

          <h2 className="text-sm font-bold text-gray-500 mb-3">
            NON PIÙ ATTIVI
          </h2>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden opacity-70">

            {allieviNonAttivi.map((allievo, index) => (

              <RigaAllievo
                key={index}
                allievo={allievo}
              />

            ))}

          </div>

        </div>

      </div>

    </main>

  );
}