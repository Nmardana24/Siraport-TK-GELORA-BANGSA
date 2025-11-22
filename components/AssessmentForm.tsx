import React, { useState } from 'react';
import { Student, AssessmentData } from '../types';
import { generateNarrative } from '../services/geminiService';
import { Sparkles, Loader2, Save, AlertCircle } from 'lucide-react';

interface AssessmentFormProps {
  student: Student;
  onSave: (updatedStudent: Student) => void;
  onCancel: () => void;
}

const AssessmentForm: React.FC<AssessmentFormProps> = ({ student, onSave, onCancel }) => {
  const [data, setData] = useState<AssessmentData>(student.assessments);
  const [activeTab, setActiveTab] = useState<keyof AssessmentData | 'attendance' | 'health' | 'notes'>('agama');
  const [loadingAI, setLoadingAI] = useState<string | null>(null);
  const [promptInputs, setPromptInputs] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof AssessmentData, value: string | number) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleHealthChange = (field: keyof AssessmentData['health'], value: string) => {
     setData(prev => ({
       ...prev,
       health: {
         ...prev.health,
         [field]: value
       }
     }));
  };

  const handlePromptChange = (field: string, value: string) => {
    setPromptInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateAI = async (field: keyof AssessmentData, label: string) => {
    const keywords = promptInputs[field];
    if (!keywords || keywords.trim().length < 5) {
      setError("Mohon masukkan poin observasi minimal 5 karakter.");
      return;
    }
    
    setLoadingAI(field);
    setError(null);

    try {
      const narrative = await generateNarrative({
        studentName: student.name,
        element: label,
        keywords: keywords
      });
      handleInputChange(field, narrative);
    } catch (err) {
      setError("Gagal menghasilkan narasi AI. Coba lagi.");
    } finally {
      setLoadingAI(null);
    }
  };

  const handleSave = () => {
    onSave({ ...student, assessments: data });
  };

  const renderTextAreaWithAI = (field: keyof AssessmentData, label: string, placeholder: string) => (
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <label className="block text-sm font-medium text-blue-900 mb-2 flex items-center gap-2">
          <Sparkles size={16} className="text-blue-600" />
          Generator Narasi AI (Bantuan Guru)
        </label>
        <p className="text-xs text-blue-700 mb-3">
          Masukkan poin-poin observasi. AI akan membuatkan narasi lengkap.
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={promptInputs[field] || ''}
            onChange={(e) => handlePromptChange(field as string, e.target.value)}
            className="flex-1 border-blue-200 rounded-md shadow-sm p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ketik poin observasi di sini..."
          />
          <button
            onClick={() => handleGenerateAI(field, label)}
            disabled={loadingAI === field}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2 transition-colors"
          >
            {loadingAI === field ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
            Buat Narasi
          </button>
        </div>
        {error && <p className="text-red-600 text-xs mt-2 flex items-center gap-1"><AlertCircle size={12}/> {error}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Hasil Narasi ({label})
        </label>
        <textarea
          rows={12}
          className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary focus:ring-primary p-3 text-gray-800 leading-relaxed"
          value={data[field] as string}
          onChange={(e) => handleInputChange(field, e.target.value)}
          placeholder={placeholder}
        />
      </div>
    </div>
  );

  const tabs = [
    { id: 'agama', label: 'Nilai Agama & Budi Pekerti' },
    { id: 'jatiDiri', label: 'Jati Diri' },
    { id: 'literasiSteam', label: 'Literasi & STEAM' },
    { id: 'projekProfil', label: 'Projek Profil (P5)' },
    { id: 'attendance', label: 'Pertumbuhan & Absensi' },
    { id: 'health', label: 'Data Kesehatan' },
    { id: 'notes', label: 'Catatan & Refleksi' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex flex-col h-full max-h-[85vh]">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Input Penilaian</h2>
          <p className="text-sm text-gray-600">Siswa: <span className="font-semibold">{student.name}</span></p>
        </div>
        <div className="flex gap-3">
           <button onClick={onCancel} className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">Batal</button>
           <button onClick={handleSave} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-sky-600 text-sm font-medium flex items-center gap-2 shadow-sm">
            <Save size={16} /> Simpan
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium mb-1 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-primary shadow-sm border border-gray-200'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
        </div>

        <div className="flex-1 p-8 overflow-y-auto bg-white">
          {activeTab === 'agama' && renderTextAreaWithAI('agama', 'Nilai Agama', 'Narasi perkembangan nilai agama...')}
          {activeTab === 'jatiDiri' && renderTextAreaWithAI('jatiDiri', 'Jati Diri', 'Narasi perkembangan jati diri...')}
          {activeTab === 'literasiSteam' && renderTextAreaWithAI('literasiSteam', 'Literasi & STEAM', 'Narasi literasi & STEAM...')}
          {activeTab === 'projekProfil' && renderTextAreaWithAI('projekProfil', 'P5', 'Narasi projek profil...')}
          
          {activeTab === 'attendance' && (
            <div className="space-y-8 max-w-2xl">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Data Pertumbuhan</h3>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Berat Badan (kg)</label>
                    <input type="number" value={data.weight} onChange={(e) => handleInputChange('weight', parseFloat(e.target.value))} className="w-full border-gray-300 rounded-lg p-2 border" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tinggi Badan (cm)</label>
                    <input type="number" value={data.height} onChange={(e) => handleInputChange('height', parseFloat(e.target.value))} className="w-full border-gray-300 rounded-lg p-2 border" />
                  </div>
                   <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lingkar Kepala (cm)</label>
                    <input type="number" value={data.headCircumference || 0} onChange={(e) => handleInputChange('headCircumference', parseFloat(e.target.value))} className="w-full border-gray-300 rounded-lg p-2 border" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Kehadiran</h3>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sakit (hari)</label>
                    <input type="number" value={data.sakit} onChange={(e) => handleInputChange('sakit', parseInt(e.target.value))} className="w-full border-gray-300 rounded-lg p-2 border" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Izin (hari)</label>
                    <input type="number" value={data.izin} onChange={(e) => handleInputChange('izin', parseInt(e.target.value))} className="w-full border-gray-300 rounded-lg p-2 border" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alpa (hari)</label>
                    <input type="number" value={data.alpa} onChange={(e) => handleInputChange('alpa', parseInt(e.target.value))} className="w-full border-gray-300 rounded-lg p-2 border" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'health' && (
             <div className="space-y-8 max-w-2xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Kondisi Kesehatan</h3>
                <div className="space-y-4">
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pendengaran</label>
                      <input type="text" value={data.health?.pendengaran || "Baik"} onChange={(e) => handleHealthChange('pendengaran', e.target.value)} className="w-full border-gray-300 rounded-lg p-2 border" placeholder="Contoh: Baik" />
                   </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Penglihatan</label>
                      <input type="text" value={data.health?.penglihatan || "Baik"} onChange={(e) => handleHealthChange('penglihatan', e.target.value)} className="w-full border-gray-300 rounded-lg p-2 border" placeholder="Contoh: Baik" />
                   </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Kesehatan Gigi</label>
                      <input type="text" value={data.health?.gigi || "Sehat"} onChange={(e) => handleHealthChange('gigi', e.target.value)} className="w-full border-gray-300 rounded-lg p-2 border" placeholder="Contoh: Sehat, Berlubang 1" />
                   </div>
                </div>
             </div>
          )}

           {activeTab === 'notes' && (
             <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Catatan Khusus Guru</h3>
                  <p className="text-sm text-gray-500 mb-2">Tuliskan saran atau catatan perkembangan khusus untuk orang tua.</p>
                  <textarea
                    rows={6}
                    className="w-full border-gray-300 rounded-lg shadow-sm p-3 border"
                    value={data.catatanGuru || ''}
                    onChange={(e) => handleInputChange('catatanGuru', e.target.value)}
                    placeholder="Contoh: Mohon orang tua membimbing Ananda untuk tidur lebih awal..."
                  />
                </div>
                 <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Refleksi Orang Tua (Hanya Tampilan)</h3>
                  <p className="text-sm text-gray-500 mb-2">Bagian ini diisi manual oleh orang tua di kertas raport.</p>
                  <textarea
                    rows={4}
                    className="w-full border-gray-300 rounded-lg shadow-sm p-3 border bg-gray-50"
                    value={data.refleksi || ''}
                    disabled
                    placeholder="Diisi oleh orang tua..."
                  />
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentForm;