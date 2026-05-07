import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

const privateKey = process.env.GOOGLE_PRIVATE_KEY;

if (!privateKey) {
  throw new Error("GOOGLE_PRIVATE_KEY mancante");
}

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: privateKey.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const doc = new GoogleSpreadsheet(
  "1GzYV0DhQpo8c0TE_OcbXGLZA8798W2qBk67ROlGcw24",
  serviceAccountAuth
);

export async function loadSheet() {
  await doc.loadInfo();
  return doc;
}