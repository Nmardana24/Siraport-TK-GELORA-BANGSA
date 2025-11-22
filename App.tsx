import React, { useState, useRef } from 'react';
import { Student, Semester, StudentGroup } from './types';
import { INITIAL_STUDENTS } from './constants';
import AssessmentForm from './components/AssessmentForm';
import ReportCard from './components/ReportCard';
import { Users, FileText, GraduationCap, Plus, Pencil, Printer, Search, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [view, setView] = useState<'list' | 'edit' | 'preview'>('list');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [semester, setSemester] = useState<Semester>(Semester.GANJIL);
  const [searchTerm, setSearchTerm] = useState("");

  // State specifically for adding a new student
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentGroup, setNewStudentGroup] = useState<StudentGroup>(StudentGroup.TKA);

  const componentRef = useRef<HTMLDivElement>(null);

  const handleEdit = (id: string) => {
    setSelectedStudentId(id);
    setView('edit');
  };

  const handlePreview = (id: string) => {
    setSelectedStudentId(id);
    setView('preview');
  };

  const handleSaveAssessment = (updatedStudent: Student) => {
    setStudents(students.map(s => s.id === updatedStudent.id ? updatedStudent : s));
    setView('list');
    setSelectedStudentId(null);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAddStudent = () => {
    if (!newStudentName.trim()) return;
    const newId = (Math.max(...students.map(s => parseInt(s.id))) + 1).toString();
    const newStudent: Student = {
      id: newId,
      name: newStudentName,
      nis: `2024${newId.padStart(3, '0')}`,
      group: newStudentGroup,
      gender: 'L',
      birthPlace: '-',
      birthDate: '-',
      religion: '-',
      childOrder: 1,
      fatherName: '-',
      fatherJob: '-',
      motherName: '-',
      motherJob: '-',
      address: '-',
      assessments: {
        agama: "", 
        jatiDiri: "", 
        literasiSteam: "", 
        projekProfil: "", 
        refleksi: "",
        catatanGuru: "",
        sakit: 0, 
        izin: 0, 
        alpa: 0, 
        height: 0, 
        weight: 0,
        headCircumference: 0,
        health: {
          pendengaran: "",
          penglihatan: "",
          gigi: ""
        }
      }
    };
    setStudents([...students, newStudent]);
    setNewStudentName("");
    setIsAddingStudent(false);
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.nis.includes(searchTerm)
  );

  const selectedStudent = students.find(s => s.id === selectedStudentId);

  // Main View Renderer
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      
      {/* Header - Not visible in print */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg text-white">
              <GraduationCap size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-none">SiRaport</h1>
              <p className="text-xs text-slate-500">TK & KB Gelora Bangsa</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <select 
              value={semester}
              onChange={(e) => setSemester(e.target.value as Semester)}
              className="text-sm border-slate-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
            >
              <option value={Semester.GANJIL}>Semester Ganjil</option>
              <option value={Semester.GENAP}>Semester Genap</option>
            </select>
            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* STUDENT LIST VIEW */}
        {view === 'list' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Data Siswa</h2>
                <p className="text-slate-500 text-sm mt-1">Kelola nilai dan perkembangan peserta didik.</p>
              </div>
              <button 
                onClick={() => setIsAddingStudent(true)}
                className="bg-primary hover:bg-sky-600 text-white px-4 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm"
              >
                <Plus size={18} /> Tambah Siswa
              </button>
            </div>

            {/* Add Student Modal/Inline Form */}
            {isAddingStudent && (
              <div className="bg-white p-4 rounded-lg border border-primary/20 shadow-lg animate-in fade-in slide-in-from-top-4 mb-6">
                <h3 className="font-semibold mb-3">Tambah Siswa Baru</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="text" 
                    placeholder="Nama Lengkap"
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  />
                  <select
                    value={newStudentGroup}
                    onChange={(e) => setNewStudentGroup(e.target.value as StudentGroup)}
                    className="border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  >
                    {Object.values(StudentGroup).map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                  <button onClick={handleAddStudent} className="bg-primary text-white px-4 py-2 rounded-md">Simpan</button>
                  <button onClick={() => setIsAddingStudent(false)} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-md">Batal</button>
                </div>
              </div>
            )}

            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Cari nama atau NIS..."
                className="block w-full pl-10 pr-3 py-3 border-none rounded-xl bg-white shadow-sm ring-1 ring-gray-200 focus:ring-2 focus:ring-primary text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Siswa</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Kelompok</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status Data</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {filteredStudents.map((student) => {
                      const isComplete = student.assessments.agama && student.assessments.jatiDiri;
                      return (
                        <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                                {student.name.charAt(0)}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-slate-900">{student.name}</div>
                                <div className="text-sm text-slate-500">NIS: {student.nis}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {student.group}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                             {isComplete ? (
                               <span className="text-green-600 text-xs flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> Terisi</span>
                             ) : (
                               <span className="text-slate-400 text-xs flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-300"></div> Belum Lengkap</span>
                             )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end gap-2">
                              <button 
                                onClick={() => handleEdit(student.id)}
                                className="text-primary hover:text-sky-700 bg-primary/5 px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors"
                              >
                                <Pencil size={14} /> Input Nilai
                              </button>
                              <button 
                                onClick={() => handlePreview(student.id)}
                                className="text-slate-600 hover:text-slate-900 bg-slate-100 px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors"
                              >
                                <FileText size={14} /> Lihat Raport
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {filteredStudents.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                          Tidak ada siswa ditemukan.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* EDIT ASSESSMENT VIEW */}
        {view === 'edit' && selectedStudent && (
          <div className="animate-in slide-in-from-right-4 duration-300">
             <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
               <button onClick={() => setView('list')} className="hover:underline">Daftar Siswa</button>
               <ChevronRight size={14} />
               <span className="text-slate-900">Input Penilaian</span>
             </div>
            <AssessmentForm 
              student={selectedStudent}
              onSave={handleSaveAssessment}
              onCancel={() => setView('list')}
            />
          </div>
        )}

        {/* PREVIEW REPORT VIEW */}
        {view === 'preview' && selectedStudent && (
          <div className="animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6 no-print">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                 <button onClick={() => setView('list')} className="hover:underline flex items-center gap-1">
                   <ChevronRight size={14} className="rotate-180"/> Kembali
                 </button>
                 <span className="text-slate-300">|</span>
                 <span className="text-slate-900 font-semibold">Pratinjau Raport: {selectedStudent.name}</span>
              </div>
              <div className="flex gap-3">
                 <button 
                   onClick={() => handleEdit(selectedStudent.id)}
                   className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center gap-2"
                 >
                   <Pencil size={16} /> Edit
                 </button>
                 <button 
                   onClick={handlePrint}
                   className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-amber-600 font-medium flex items-center gap-2 shadow-sm"
                 >
                   <Printer size={18} /> Cetak / PDF
                 </button>
              </div>
            </div>

            {/* Print Container */}
            <div className="bg-slate-500/10 p-8 rounded-xl overflow-auto print:p-0 print:bg-white print:overflow-visible">
               <div className="bg-white shadow-xl print:shadow-none mx-auto max-w-[21cm]" ref={componentRef}>
                  <ReportCard 
                    student={selectedStudent}
                    semester={semester}
                    year="2023/2024"
                  />
               </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default App;