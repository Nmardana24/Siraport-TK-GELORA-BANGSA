import { GoogleGenAI } from "@google/genai";
import { NarrativeRequest } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateNarrative = async (request: NarrativeRequest): Promise<string> => {
  try {
    const prompt = `
      Bertindaklah sebagai guru TK/PAUD yang profesional dan empatik di sekolah 'Gelora Bangsa'.
      Buatkan narasi deskripsi perkembangan anak untuk raport Kurikulum Merdeka.
      
      Nama Anak: ${request.studentName}
      Elemen Capaian Pembelajaran: ${request.element}
      Catatan Observasi Guru (Poin-poin): ${request.keywords}
      
      Instruksi:
      1. Gunakan bahasa Indonesia yang formal namun hangat dan suportif.
      2. Fokus pada kemajuan anak (positive reinforcement).
      3. Ubah catatan observasi kasar menjadi 1-2 paragraf narasi yang mengalir.
      4. Jangan gunakan bullet points, gunakan format paragraf.
      5. Mulailah kalimat dengan variasi (misal: "Ananda [Nama]...", "[Nama] menunjukkan...", "Perkembangan [Nama]...").
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    });

    return response.text || "Maaf, tidak dapat menghasilkan narasi saat ini.";
  } catch (error) {
    console.error("Error generating narrative:", error);
    throw new Error("Gagal menghubungi layanan AI.");
  }
};