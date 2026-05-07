import { loadSheet } from "../lib/google";

export default async function Home() {

  const doc = await loadSheet();

  const sheet = doc.sheetsByTitle["Raffaella"];

  if (!sheet) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Foglio non trovato
        </h1>
      </main>
    );
  }

  await sheet.loadCells();

  const acquistate = sheet.getCellByA1("B2").value;
  const svolte = sheet.getCellByA1("C2").value;
  const residue = sheet.getCellByA1("D2").value;

  const date = [];

  for (let row = 3; row < 30; row++) {

    const value = sheet.getCellByA1(`E${row}`).value;

    if (value) {
      date.push(value);
    }
  }

  const ultimeTre = date.slice(-3).reverse();

  return (
    <main className="min-h-screen bg-stone-100 flex items-center justify-center p-6">

      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6">
          👋 Ciao Raffaella
        </h1>

        <div className="space-y-4">

          <div className="bg-stone-100 rounded-2xl p-4">

            <p className="text-sm text-gray-500">
              📚 Lezioni acquistate
            </p>

            <p className="text-3xl font-bold">
              {String(acquistate)}
            </p>

          </div>

          <div className="bg-stone-100 rounded-2xl p-4">

            <p className="text-sm text-gray-500">
              🏇 Lezioni svolte
            </p>

            <p className="text-3xl font-bold">
              {String(svolte)}
            </p>

          </div>

          <div className="bg-stone-100 rounded-2xl p-4">

            <p className="text-sm text-gray-500">
              ✅ Lezioni residue
            </p>

            <p className="text-3xl font-bold text-green-600">
              {String(residue)}
            </p>

          </div>

        </div>

        <div className="mt-6 bg-green-100 text-green-700 rounded-2xl p-4 text-center font-semibold">
          🟢 Pacchetto attivo
        </div>

        <div className="mt-8">

          <h2 className="text-xl font-bold mb-4">
            Ultime 3 lezioni
          </h2>

          <div className="space-y-2">

            {ultimeTre.map((data, index) => (
              <div
                key={index}
                className="bg-stone-100 rounded-xl p-3"
              >
                📅 {
                  new Date(
                    (Number(data) - 25569) * 86400 * 1000
                  ).toLocaleDateString("it-IT")
                }
              </div>
            ))}

          </div>

        </div>

      </div>

    </main>
  );
}