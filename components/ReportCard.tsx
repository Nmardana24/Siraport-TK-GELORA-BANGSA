import React from 'react';
import { Student, Semester } from '../types';

interface ReportCardProps {
  student: Student;
  semester: Semester;
  year: string;
}

// Helper for A4 Page wrapper
const A4Page: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`relative bg-white w-[21cm] min-h-[29.7cm] mx-auto p-[1.5cm] shadow-lg print:shadow-none print:w-full print:h-auto mb-8 print:break-after-page ${className} font-serif text-black leading-tight`}>
    {children}
  </div>
);

// Watermark Component
const Watermark = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.08]">
    <img 
       src="https://cdn-icons-png.flaticon.com/512/2436/2436874.png" // Placeholder for Gelora Bangsa Logo if not available
       alt="Watermark"
       className="w-[400px] h-[400px] object-contain grayscale"
    />
  </div>
);

const ReportCard: React.FC<ReportCardProps> = ({ student, semester, year }) => {
  const semesterNum = semester === Semester.GANJIL ? "1 (Ganjil)" : "2 (Genap)";
  
  return (
    <div className="print:bg-white">
      {/* PAGE 1: COVER */}
      <A4Page className="flex flex-col items-center text-center justify-between py-20 border border-slate-200 print:border-none">
        <div className="flex flex-col items-center w-full">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Logo_Tut_Wuri_Handayani.png/480px-Logo_Tut_Wuri_Handayani.png" 
            alt="Tut Wuri Handayani" 
            className="w-32 h-32 mb-8"
          />
          
          <h1 className="text-2xl font-bold font-serif tracking-wide mb-2">KB - TK GELORA BANGSA</h1>
          <p className="text-sm font-serif mb-1">Jl. Kampung Baru Kubur Koja, Penjaringan, Jakarta Utara</p>
          <p className="text-sm font-bold mb-12">NPSN: 69900048</p>

          <img 
            src="https://cdn-icons-png.flaticon.com/512/2436/2436874.png" // Generic school logo placeholder
            alt="Logo Sekolah" 
            className="w-48 h-48 mb-16"
          />

          <h2 className="text-xl font-bold uppercase mb-2">Laporan Asesmen Capaian</h2>
          <h2 className="text-xl font-bold uppercase mb-8">Pembelajaran Anak Didik</h2>

          <p className="font-bold mb-12">TAHUN PELAJARAN {year}</p>

          <div className="border-4 border-double border-black p-8 w-3/4 rounded-lg">
            <p className="mb-8">Nama Anak Didik:</p>
            <p className="text-2xl font-bold mb-8 uppercase border-b border-black inline-block min-w-[200px] pb-1">
              {student.name}
            </p>
            <p className="font-bold">NISN / NIS : {student.nisn || "-"} / {student.nis}</p>
          </div>
        </div>
      </A4Page>

      {/* PAGE 2: SCHOOL DATA */}
      <A4Page>
        <Watermark />
        <div className="relative z-10">
          <div className="flex flex-col items-center mb-12">
             <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/National_emblem_of_Indonesia_Garuda_Pancasila.svg/480px-National_emblem_of_Indonesia_Garuda_Pancasila.svg.png" 
              alt="Garuda" 
              className="w-24 h-24 mb-4"
            />
            <h2 className="text-center text-lg font-bold uppercase max-w-md leading-snug">
              Laporan Asesmen Capaian Pembelajaran<br/>Anak Didik Taman Kanak-Kanak
            </h2>
          </div>
          
          <div className="border-t-2 border-black border-double mb-8"></div>

          <h3 className="text-center font-bold text-lg mb-8 underline">DATA SEKOLAH</h3>

          <table className="w-full text-base">
            <tbody>
              {[
                ["Nama TK", "KB - TK GELORA BANGSA"],
                ["NPSN", "69900048"],
                ["Alamat", "Jl. Kampung Baru Rt 10 Rw 15"],
                ["Kelurahan", "Penjaringan"],
                ["Kecamatan", "Penjaringan"],
                ["Kabupaten / Kota", "Jakarta Utara"],
                ["Provinsi", "DKI Jakarta"],
                ["Email", "gelorabangsa@gmail.com"],
              ].map(([label, value]) => (
                <tr key={label}>
                  <td className="py-2 font-bold w-[200px] align-top">{label}</td>
                  <td className="py-2 w-[20px] align-top">:</td>
                  <td className="py-2 align-top">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-24 flex flex-col items-end mr-10">
            <p className="mb-20 text-center">
              Jakarta, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}<br/>
              Kepala Sekolah
            </p>
            <p className="font-bold underline text-center w-[200px]">Rina S.E</p>
          </div>
        </div>
      </A4Page>

      {/* PAGE 3: STUDENT DATA */}
      <A4Page>
        <Watermark />
        <div className="relative z-10">
           <h3 className="text-center font-bold text-lg mb-8 underline uppercase">Data Diri Anak</h3>

           {/* A. Identitas Anak */}
           <h4 className="font-bold mb-4">A. Identitas Anak</h4>
           <table className="w-full text-sm mb-8">
            <tbody>
              {[
                ["Nama Anak Didik", student.name],
                ["Nama Panggilan", student.nickname || "-"],
                ["NISN / NIS", `${student.nisn || "-"} / ${student.nis}`],
                ["Jenis Kelamin", student.gender === 'L' ? "Laki-laki" : "Perempuan"],
                ["Tempat, Tanggal Lahir", `${student.birthPlace}, ${student.birthDate}`],
                ["Agama", student.religion],
                ["Anak ke-", student.childOrder],
              ].map(([label, value]) => (
                <tr key={label}>
                  <td className="py-1.5 pl-4 w-[200px] align-top">{label}</td>
                  <td className="py-1.5 w-[20px] align-top">:</td>
                  <td className="py-1.5 align-top">{value}</td>
                </tr>
              ))}
            </tbody>
           </table>

           {/* B. Identitas Orang Tua */}
           <h4 className="font-bold mb-4">B. Identitas Orang Tua / Wali</h4>
           <table className="w-full text-sm mb-12">
            <tbody>
              {[
                ["Nama Ayah", student.fatherName],
                ["Pekerjaan Ayah", student.fatherJob],
                ["Nama Ibu", student.motherName],
                ["Pekerjaan Ibu", student.motherJob],
                ["Alamat Lengkap", student.address],
              ].map(([label, value]) => (
                <tr key={label}>
                  <td className="py-1.5 pl-4 w-[200px] align-top">{label}</td>
                  <td className="py-1.5 w-[20px] align-top">:</td>
                  <td className="py-1.5 align-top">{value}</td>
                </tr>
              ))}
            </tbody>
           </table>

           <div className="grid grid-cols-[150px_1fr] gap-8 items-end mt-12">
             <div className="border border-black w-[3cm] h-[4cm] flex items-center justify-center text-xs text-gray-400 ml-4">
               FOTO 3x4
             </div>
             <div className="flex flex-col items-end mr-10">
               <p className="mb-20 text-center">
                Jakarta, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}<br/>
                Kepala Sekolah
              </p>
              <p className="font-bold underline text-center w-[200px]">Rina S.E</p>
             </div>
           </div>
        </div>
      </A4Page>

      {/* PAGE 4: INTRAKURIKULER */}
      <A4Page>
        <Watermark />
        <div className="relative z-10">
           <div className="text-center mb-4">
             <h3 className="font-bold text-lg uppercase">Laporan Capaian Pembelajaran</h3>
             <p className="font-bold">Semester: {semesterNum}</p>
           </div>

           <div className="border-t-2 border-black mb-6"></div>

           <h4 className="font-bold mb-2 uppercase text-sm">A. Intrakurikuler</h4>
           
           {/* Table Structure for Assessments */}
           <div className="flex flex-col gap-4">
             
             {/* I. Agama */}
             <div className="border border-black">
                <div className="bg-gray-200 px-2 py-1 border-b border-black font-bold text-sm">
                  I. Nilai Agama dan Budi Pekerti
                </div>
                <div className="grid grid-cols-[1fr_200px] min-h-[200px]">
                  <div className="p-4 text-justify text-sm border-r border-black whitespace-pre-wrap">
                    {student.assessments.agama || "-"}
                  </div>
                  <div className="p-2 flex items-center justify-center text-xs text-gray-400 italic">
                    Foto Kegiatan
                  </div>
                </div>
             </div>

             {/* II. Jati Diri */}
             <div className="border border-black">
                <div className="bg-gray-200 px-2 py-1 border-b border-black font-bold text-sm">
                  II. Jati Diri
                </div>
                <div className="grid grid-cols-[1fr_200px] min-h-[200px]">
                  <div className="p-4 text-justify text-sm border-r border-black whitespace-pre-wrap">
                    {student.assessments.jatiDiri || "-"}
                  </div>
                  <div className="p-2 flex items-center justify-center text-xs text-gray-400 italic">
                    Foto Kegiatan
                  </div>
                </div>
             </div>

           </div>
        </div>
      </A4Page>

       {/* PAGE 5: LITERASI & P5 */}
       <A4Page>
        <Watermark />
        <div className="relative z-10">
           <div className="text-center mb-4">
             <h3 className="font-bold text-lg uppercase">Laporan Capaian Pembelajaran</h3>
             <p className="font-bold">Semester: {semesterNum}</p>
           </div>
           <div className="border-t-2 border-black mb-6"></div>

           <div className="flex flex-col gap-4">
             {/* III. Literasi & STEAM */}
             <div className="border border-black">
                <div className="bg-gray-200 px-2 py-1 border-b border-black font-bold text-sm">
                  III. Dasar-dasar Literasi, Matematika, Sains, Teknologi, Rekayasa, dan Seni
                </div>
                <div className="grid grid-cols-[1fr_200px] min-h-[200px]">
                  <div className="p-4 text-justify text-sm border-r border-black whitespace-pre-wrap">
                    {student.assessments.literasiSteam || "-"}
                  </div>
                  <div className="p-2 flex items-center justify-center text-xs text-gray-400 italic">
                    Foto Kegiatan
                  </div>
                </div>
             </div>
             
             {/* B. P5 Section Header */}
             <h4 className="font-bold mt-4 uppercase text-sm">B. Projek Penguatan Profil Pelajar Pancasila</h4>

             {/* I. P5 */}
             <div className="border border-black">
                <div className="bg-gray-200 px-2 py-1 border-b border-black font-bold text-sm">
                  I. Projek Penguatan Profil Pelajar Pancasila (P5)
                </div>
                <div className="grid grid-cols-[1fr_200px] min-h-[200px]">
                  <div className="p-4 text-justify text-sm border-r border-black whitespace-pre-wrap">
                    {student.assessments.projekProfil || "-"}
                  </div>
                  <div className="p-2 flex items-center justify-center text-xs text-gray-400 italic">
                    Foto Kegiatan
                  </div>
                </div>
             </div>
           </div>
        </div>
      </A4Page>

      {/* PAGE 6: HEALTH & REFLECTION */}
      <A4Page>
         <Watermark />
         <div className="relative z-10 text-sm">
            
            {/* C. FISIK & KESEHATAN */}
            <h4 className="font-bold mb-2 uppercase">C. Fisik & Kesehatan</h4>
            
            {/* Table Pertumbuhan */}
            <table className="w-full border border-black mb-4">
              <thead>
                <tr className="text-center font-bold bg-white">
                  <td className="border border-black p-1 w-10">No</td>
                  <td className="border border-black p-1">Aspek Pertumbuhan</td>
                  <td className="border border-black p-1 w-32">Semester 1</td>
                  <td className="border border-black p-1 w-32">Semester 2</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-1 text-center">1</td>
                  <td className="border border-black p-1 pl-2">Tinggi Badan</td>
                  <td className="border border-black p-1 text-center">{semester === Semester.GANJIL ? `${student.assessments.height} cm` : "-"}</td>
                  <td className="border border-black p-1 text-center">{semester === Semester.GENAP ? `${student.assessments.height} cm` : "-"}</td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center">2</td>
                  <td className="border border-black p-1 pl-2">Berat Badan</td>
                  <td className="border border-black p-1 text-center">{semester === Semester.GANJIL ? `${student.assessments.weight} kg` : "-"}</td>
                  <td className="border border-black p-1 text-center">{semester === Semester.GENAP ? `${student.assessments.weight} kg` : "-"}</td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center">3</td>
                  <td className="border border-black p-1 pl-2">Lingkar Kepala</td>
                  <td className="border border-black p-1 text-center">{semester === Semester.GANJIL ? `${student.assessments.headCircumference} cm` : "-"}</td>
                  <td className="border border-black p-1 text-center">{semester === Semester.GENAP ? `${student.assessments.headCircumference} cm` : "-"}</td>
                </tr>
              </tbody>
            </table>

            <p className="font-bold mb-1">Kondisi Kesehatan:</p>
            <table className="w-full border border-black mb-6">
              <thead>
                <tr className="text-center font-bold bg-white">
                  <td className="border border-black p-1 w-10">No</td>
                  <td className="border border-black p-1">Pemeriksaan</td>
                  <td className="border border-black p-1 w-64">Keterangan</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-1 text-center">1</td>
                  <td className="border border-black p-1 pl-2">Pendengaran</td>
                  <td className="border border-black p-1 text-center">{student.assessments.health?.pendengaran || "Baik"}</td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center">2</td>
                  <td className="border border-black p-1 pl-2">Penglihatan</td>
                  <td className="border border-black p-1 text-center">{student.assessments.health?.penglihatan || "Baik"}</td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center">3</td>
                  <td className="border border-black p-1 pl-2">Gigi</td>
                  <td className="border border-black p-1 text-center">{student.assessments.health?.gigi || "Sehat"}</td>
                </tr>
              </tbody>
            </table>

            {/* D. TINGKAT KEHADIRAN */}
            <h4 className="font-bold mb-2 uppercase">D. Tingkat Kehadiran</h4>
            <div className="w-1/2 mb-6">
              <table className="w-full border border-black">
                <tbody>
                  <tr>
                    <td className="border border-black p-1 pl-2">Sakit</td>
                    <td className="border border-black p-1 text-center w-24">{student.assessments.sakit} Hari</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-1 pl-2">Izin</td>
                    <td className="border border-black p-1 text-center w-24">{student.assessments.izin} Hari</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-1 pl-2">Tanpa Keterangan</td>
                    <td className="border border-black p-1 text-center w-24">{student.assessments.alpa} Hari</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* E. REFLEKSI ORANG TUA */}
            <h4 className="font-bold mb-2 uppercase">E. Refleksi Orang Tua</h4>
            <div className="border border-black p-2 min-h-[100px] mb-6 relative">
              <p className="text-gray-400 italic text-xs absolute top-2 left-2 pointer-events-none">
                (Tuliskan pendapat, harapan, atau masukan Orang Tua/Wali di sini...)
              </p>
              <p className="whitespace-pre-wrap relative z-10">{student.assessments.refleksi}</p>
            </div>

            {/* CATATAN KHUSUS GURU */}
            <div className="border border-black mb-12">
              <div className="bg-gray-200 px-2 py-1 border-b border-black font-bold">
                Catatan Perkembangan dan Saran
              </div>
              <div className="p-4 min-h-[100px] text-justify whitespace-pre-wrap">
                {student.assessments.catatanGuru}
              </div>
            </div>

            {/* SIGNATURES */}
            <div className="grid grid-cols-2 gap-8 text-center">
               <div>
                 <p className="mb-20">Orang Tua / Wali</p>
                 <p className="font-bold border-b border-black inline-block min-w-[200px]">(.......................................)</p>
               </div>
               <div>
                 <p className="mb-20">
                    Jakarta, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}<br/>
                    Guru Kelas
                 </p>
                 <p className="font-bold underline">RINI</p>
               </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="mb-20">
                 Mengetahui,<br/>
                 Kepala KB - TK Gelora Bangsa
              </p>
              <p className="font-bold underline">Rina S.E</p>
            </div>

         </div>
      </A4Page>
    </div>
  );
};

export default ReportCard;