import { Student, StudentGroup } from "./types";

export const INITIAL_STUDENTS: Student[] = [
  {
    id: "1",
    name: "Aditya Pratama",
    nickname: "Adit",
    nis: "2023001",
    nisn: "3124567890",
    group: StudentGroup.TKB,
    gender: 'L',
    birthPlace: "Jakarta",
    birthDate: "15 Mei 2018",
    religion: "Islam",
    childOrder: 1,
    fatherName: "Budi Pratama",
    fatherJob: "Wiraswasta",
    motherName: "Siti Aminah",
    motherJob: "Ibu Rumah Tangga",
    address: "Jl. Warakas I No. 12, Tanjung Priok, Jakarta Utara",
    assessments: {
      agama: "Ananda Aditya mulai terbiasa melakukan kegiatan ibadah sehari-hari dengan tuntunan orang dewasa. Ia mampu melafalkan doa sebelum makan dengan lancar.",
      jatiDiri: "Aditya menunjukkan kemandirian dalam hal merawat diri sendiri, seperti mencuci tangan sebelum makan. Ia juga mulai mampu mengelola emosi saat bermain dengan teman.",
      literasiSteam: "Ananda sudah mengenal berbagai bentuk geometri dasar dan mulai tertarik pada buku cerita bergambar. Ia mampu menceritakan kembali isi cerita sederhana.",
      projekProfil: "Aditya berpartisipasi aktif dalam kegiatan gotong royong membersihkan kelas (Dimensi: Bergotong Royong).",
      refleksi: "",
      catatanGuru: "Mohon dukungan orang tua untuk membiasakan Ananda tidur siang teratur.",
      sakit: 0,
      izin: 1,
      alpa: 0,
      height: 110,
      weight: 18,
      headCircumference: 50,
      health: {
        pendengaran: "Baik",
        penglihatan: "Baik",
        gigi: "Sehat"
      }
    }
  },
  {
    id: "2",
    name: "Bunga Citra",
    nickname: "Bunga",
    nis: "2023002",
    nisn: "3124567891",
    group: StudentGroup.TKA,
    gender: 'P',
    birthPlace: "Jakarta",
    birthDate: "20 Agustus 2019",
    religion: "Islam",
    childOrder: 2,
    fatherName: "Joko Susilo",
    fatherJob: "Karyawan Swasta",
    motherName: "Rina Wati",
    motherJob: "Guru",
    address: "Jl. Bahari No. 45, Tanjung Priok, Jakarta Utara",
    assessments: {
      agama: "Ananda Bunga sudah hafal surat-surat pendek seperti Al-Fatihah dan Al-Ikhlas. Sikap santun kepada guru selalu ditunjukkan saat datang ke sekolah.",
      jatiDiri: "Bunga memiliki rasa percaya diri yang baik saat tampil di depan kelas. Ia senang membantu teman yang kesulitan.",
      literasiSteam: "Ananda sangat antusias dalam kegiatan seni, terutama menggambar dan mewarnai. Kemampuan mengenal huruf abjad berkembang sangat pesat.",
      projekProfil: "Bunga menunjukkan kreativitas tinggi dalam membuat kerajinan dari bahan bekas (Dimensi: Kreatif).",
      refleksi: "",
      catatanGuru: "Pertahankan semangat belajarnya, Bunga!",
      sakit: 1,
      izin: 0,
      alpa: 0,
      height: 105,
      weight: 16,
      headCircumference: 48,
      health: {
        pendengaran: "Baik",
        penglihatan: "Baik",
        gigi: "Sedikit berlubang"
      }
    }
  }
];