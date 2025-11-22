export enum Semester {
  GANJIL = "Semester Ganjil",
  GENAP = "Semester Genap"
}

export enum StudentGroup {
  KB = "Kelompok Bermain (KB)",
  TKA = "TK A",
  TKB = "TK B"
}

export interface HealthData {
  pendengaran: string;
  penglihatan: string;
  gigi: string;
}

export interface AssessmentData {
  agama: string; // Nilai Agama dan Budi Pekerti
  jatiDiri: string; // Jati Diri
  literasiSteam: string; // Dasar Literasi & STEAM
  projekProfil: string; // P5
  refleksi: string; // Refleksi Orang Tua
  catatanGuru: string; // Catatan Khusus Guru
  sakit: number;
  izin: number;
  alpa: number;
  height: number;
  weight: number;
  headCircumference: number; // Lingkar kepala
  health: HealthData;
}

export interface Student {
  id: string;
  name: string;
  nickname?: string;
  nis: string;
  nisn?: string;
  group: StudentGroup;
  gender: 'L' | 'P';
  birthPlace: string;
  birthDate: string;
  religion: string;
  childOrder: number;
  
  // Parent Info
  fatherName: string;
  fatherJob: string;
  motherName: string;
  motherJob: string;
  address: string;
  
  assessments: AssessmentData;
  photoUrl?: string;
}

export interface NarrativeRequest {
  studentName: string;
  element: string;
  keywords: string; // Teacher's rough notes
}