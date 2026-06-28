import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  FileText, 
  Printer, 
  Download, 
  Save, 
  RotateCcw, 
  BookOpen, 
  User, 
  School, 
  Calendar, 
  Plus, 
  Trash, 
  Eye, 
  Edit, 
  Layers,
  ChevronRight,
  AlertCircle,
  HelpCircle,
  CheckCircle,
  Share2,
  Key,
  Info,
  ExternalLink,
  Clipboard,
  Check,
  EyeOff,
  Clock,
  Briefcase,
  Sliders,
  CheckSquare,
  FileCheck
} from 'lucide-react';

// --- INITIAL DEFAULT DATA (MOCK TEMPLATE MATCHING REAL KURIKULUM MERDEKA CLASS X INFORMATIKA) ---
const defaultModulData = {
  identitas: {
    penyusun: "Agus Aprianto, S.Pd.",
    instansi: "SMAN 1 Gunung Alip",
    materi: "Algoritma",
    faseKelas: "Fase E / Kelas X",
    model: "Discovery Learning (Pendekatan Deep Learning)",
    topik: "Logika Berpikir Komputasional dan Representasi Algoritma",
    alokasiWaktu: "4 x 45 Menit (Tahun Ajaran 2026-2027)",
    jumlahPertemuan: 2
  },
  identifikasi: {
    pesertaDidik: "Kesiapan awal peserta didik diidentifikasi melalui kuis cepat menggunakan platform interaktif untuk memetakan pemahaman dasar tentang logika dan langkah-langkah penyelesaian masalah. Peserta didik dikelompokkan berdasarkan tingkat pemahaman logikanya.",
    materiPelajaran: "Konsep algoritma sebagai urutan langkah logis untuk menyelesaikan masalah, mencakup pemahaman struktur dasar (runtunan, pemilihan, pengulangan), serta representasinya menggunakan flowchart dan pseudocode.",
    dimensiProfilLulusan: [
      "Bernalar Kritis - Mampu menganalisis masalah secara logis",
      "Kreatif - Merancang solusi alternatif yang efektif",
      "Gotong Royong - Berkolaborasi menyelesaikan tantangan kelompok",
      "Mandiri - Bertanggung jawab atas proses belajarnya"
    ]
  },
  desainPembelajaran: {
    capaianPembelajaran: "Peserta didik mampu menerapkan strategi algoritmik standar untuk menghasilkan beberapa solusi persoalan dengan data diskrit bervolume besar.",
    lintasDisiplinIlmu: "Matematika (Logika Informatika) dan Bahasa Indonesia (Struktur teks prosedur).",
    tujuanPembelajaran: "Peserta didik dapat mendefinisikan algoritma, menganalisis struktur kontrol dasar, dan merancang solusi masalah sehari-hari dalam bentuk flowchart dan pseudocode secara tepat.",
    topikPembelajaran: "Definisi Algoritma, Notasi Algoritma, dan Struktur Kontrol Program.",
    praktikPedagogis: "Deep Learning dengan fase Mindful (kesadaran penuh dalam memahami masalah), Meaningful (mencari makna/relevansi), dan Joyful (kegembiraan dalam menemukan solusi).",
    kemitraanPembelajaran: "Diskusi kelompok antar peserta didik dan umpan balik teman sejawat (peer feedback).",
    lingkunganBelajar: "Laboratorium Komputer atau ruang kelas dengan pengaturan tempat duduk melingkar untuk diskusi.",
    pemanfaatanDigital: "Penggunaan perangkat lunak pembuatan flowchart (seperti Draw.io atau Lucidchart) dan platform presentasi kolaboratif."
  },
  pertemuan: [
    {
      no: 1,
      tujuanPembelajaran: "Peserta didik mampu menjelaskan konsep dasar algoritma dan membuat representasi masalah sederhana menggunakan flowchart secara logis.",
      durasi: "2 x 45 Menit",
      pendahuluan: [
        "Guru membuka pembelajaran dengan salam hangat, doa bersama, dan presensi.",
        "Apersepsi: Guru memberikan tantangan kecil 'Instruksi membuat kopi instan' untuk memancing logika urutan langkah.",
        "Guru menyampaikan tujuan pembelajaran serta relevansi belajar algoritma di era digital modern."
      ],
      mindful: [
        "15 Menit",
        "Peserta didik melakukan hening sejenak, merefleksikan rutinitas pagi mereka yang teratur.",
        "Guru mengaitkan rutinitas tersebut sebagai urutan instruksi alamiah dalam pikiran manusia (Mindfulness)."
      ],
      meaningful: [
        "50 Menit",
        "Peserta didik dibagi menjadi beberapa kelompok heterogen untuk membedah algoritma media sosial.",
        "Mempelajari simbol-simbol flowchart dasar dan fungsinya secara kolaboratif.",
        "Setiap kelompok merancang flowchart alur pendaftaran siswa baru secara runtut."
      ],
      joyful: [
        "15 Menit",
        "Aktivitas interaktif 'Robot & Programmer': Siswa mempraktikkan flowchart buatan mereka dengan teman sebagai robot.",
        "Kesalahan instruksi ditanggapi dengan tawa ceria untuk melatih analisis kesalahan logika secara rileks."
      ],
      penutup: [
        "10 Menit",
        "Siswa bersama guru menyimpulkan inti materi.",
        "Refleksi pembelajaran: Bagian mana yang paling menarik hari ini?",
        "Guru menginfokan rencana pertemuan berikutnya dan menutup dengan doa."
      ],
      asesmen: "Formatif: Penilaian keaktifan diskusi kelompok dan lembar kerja flowchart awal."
    },
    {
      no: 2,
      tujuanPembelajaran: "Peserta didik mampu mengimplementasikan struktur kontrol (percabangan dan perulangan) dalam pseudocode untuk menyelesaikan masalah kompleks.",
      durasi: "2 x 45 Menit",
      pendahuluan: [
        "Pembukaan, doa, dan motivasi pagi.",
        "Review singkat materi flowchart dari pertemuan pertama.",
        "Guru menyajikan pertanyaan penantang: 'Bagaimana komputer tahu kita lulus ujian atau tidak?'"
      ],
      mindful: [
        "15 Menit",
        "Guru menyajikan video simulasi pendek tentang sistem sensor otomatis pada pintu mall.",
        "Siswa merenungkan titik pengambilan keputusan (Decision) yang terjadi pada sensor pintu."
      ],
      meaningful: [
        "50 Menit",
        "Pengenalan struktur percabangan (IF-THEN-ELSE) dan perulangan (LOOPING) pada pseudocode.",
        "Kelompok berdiskusi membuat draf pseudocode sistem nilai siswa sekolah (Kriteria Kelulusan).",
        "Siswa menganalisis tingkat keefektifan baris kode tiruan yang mereka susun."
      ],
      joyful: [
        "15 Menit",
        "Aktivitas 'Gallery Walk': Karya pseudocode kelompok ditempel di dinding.",
        "Siswa berkunjung ke kelompok lain dan memberikan feedback menggunakan sticky notes berwarna-warni."
      ],
      penutup: [
        "10 Menit",
        "Review feedback antar kelompok dan evaluasi dari guru.",
        "Post-test tertulis singkat (3 soal pilihan ganda).",
        "Doa penutup kelas."
      ],
      asesmen: "Sumatif Lingkup Materi: Tes tulis esai logika percabangan/perulangan pseudocode."
    }
  ],
  asesmenKriteria: [
    { aspek: "Sikap", kriteria: "Kemandirian & Kerja Sama", skor: "1 - 4", deskripsi: "Menunjukkan inisiatif tinggi dan berkolaborasi aktif tanpa mendominasi tugas kelompok." },
    { aspek: "Pengetahuan", kriteria: "Analisis Struktur Kontrol", skor: "1 - 4", deskripsi: "Mampu menjelaskan dan menganalisis letak percabangan dan perulangan pada suatu kasus." },
    { aspek: "Keterampilan", kriteria: "Penyusunan Flowchart/Pseudocode", skor: "1 - 4", deskripsi: "Mendesain solusi langkah yang valid, minim galat logika, dan sesuai kaidah visual standar." }
  ],
  remedial: {
    metode: "Pembelajaran ulang berbantuan tutor sebaya dan latihan terbimbing.",
    materi: "Simbol flowchart proses & keputusan, serta logika dasar IF-ELSE.",
    langkah: [
      "Guru menjelaskan ulang konsep simbol krusial secara individual.",
      "Peserta didik didampingi rekan sejawat mengerjakan LKPD versi sederhana.",
      "Latihan mandiri penyusunan algoritma linier kehidupan sehari-hari."
    ],
    kriteria: "Mampu membuat flowchart linear sederhana yang logis dan bebas eror."
  },
  pengayaan: {
    jenis: "Eksplorasi Algoritma Pencarian (Searching) Sederhana.",
    implementasi: "Peserta didik secara berkelompok mengeksplorasi algoritma pencarian linear (Linear Search).",
    output: "Membuat video penjelasan pendek atau infografis skema pencarian data."
  },
  refleksi: {
    guru: "Apakah skenario Joyful berhasil mengurangi rasa tegang peserta didik terhadap materi pemrograman? Bagian mana yang perlu ditingkatkan di pertemuan depan?",
    siswa: "Apakah saya merasa terbantu dengan penggambaran flowchart sebelum menuliskan instruksi komputer? Hal baru apa yang paling menyenangkan?"
  },
  lkpd: [
    {
      pertemuanNo: 1,
      judul: "LKPD 1: Arsitek Logika Flowchart",
      tujuan: "Peserta didik mampu merancang flowchart untuk menyelesaikan aktivitas prosedural sehari-hari secara sistematis dan rapi.",
      alatBahan: [
        "Kertas Karton / Buku Gambar",
        "Alat tulis, penggaris, dan pensil warna",
        "Aplikasi Draw.io / Canva (Opsional jika digital)"
      ],
      petunjuk: [
        "Bekerjalah dalam kelompok beranggotakan 4-5 orang.",
        "Diskusikan alur logika dari kasus yang ditentukan bersama.",
        "Gambarkan flowchart dengan menggunakan simbol-simbol standar yang benar.",
        "Pastikan alur memiliki titik mulai (Start) dan selesai (End) yang jelas."
      ],
      tugas1: "Rancanglah sebuah diagram alir (Flowchart) lengkap untuk prosedur 'Proses Memesan dan Membayar Makanan di Kantin Sekolah menggunakan QRIS'. Tunjukkan kondisi jika saldo mencukupi dan saldo tidak mencukupi!",
      tugas2: "Analisis dan jelaskan fungsi dari simbol belah ketupat (Decision) dalam rancangan flowchart kelompokmu! Apa yang akan terjadi jika simbol tersebut dihilangkan?"
    },
    {
      pertemuanNo: 2,
      judul: "LKPD 2: Pseudocode Master - Berpikir Seperti Komputer",
      tujuan: "Peserta didik mampu mengimplementasikan struktur kontrol percabangan dan perulangan ke dalam bentuk pseudocode yang terstruktur.",
      alatBahan: [
        "Buku catatan / Laptop",
        "Aplikasi text editor sederhana (Notepad / Google Docs)"
      ],
      petunjuk: [
        "Kerjakan tugas ini secara mandiri terlebih dahulu, kemudian diskusikan hasilnya dengan teman sebangku.",
        "Gunakan notasi standar pseudocode seperti READ, WRITE, IF, THEN, ELSE, dan FOR/WHILE.",
        "Gunakan indentasi (jarak penulisan masuk ke dalam) yang konsisten untuk memperjelas blok kode."
      ],
      tugas1: "Tuliskan pseudocode untuk sistem penentuan harga tiket bioskop sekolah: Jika usia penonton di bawah 12 tahun, harga tiket adalah Rp 15.000. Jika usia 12 tahun ke atas, harga tiket adalah Rp 25.000. Input program berupa 'Usia' dan output berupa 'Harga Tiket'!",
      tugas2: "Rancanglah sebuah algoritma perulangan (looping) menggunakan pseudocode untuk mencetak kalimat 'Saya siap menguasai dunia teknologi!' sebanyak 15 kali!"
    }
  ],
  materiPresentasi: [
    { no: 1, slide: "Pengantar Algoritma", ringkasan: "Algoritma adalah urutan langkah logis yang teratur untuk menyelesaikan suatu masalah.", contoh: "Resep membuat kue, petunjuk merakit lemari.", poin: "Harus logis, teratur, dan terbatas." },
    { no: 2, slide: "Simbol Flowchart", ringkasan: "Representasi visual algoritma menggunakan bentuk geometris terstandar.", contoh: "Oval = Start/End, Persegi = Proses, Jajar Genjang = Input/Output.", poin: "Membantu memahami alur secara visual." },
    { no: 3, slide: "Sintaks Pseudocode", ringkasan: "Penulisan algoritma menyerupai bahasa pemrograman asli tetapi mudah dipahami manusia.", contoh: "IF nilai > 75 THEN WRITE('Lulus')", poin: "Jembatan antara bahasa manusia dan bahasa mesin." },
    { no: 4, slide: "Struktur Percabangan", ringkasan: "Memungkinkan program memilih instruksi yang berbeda berdasarkan suatu kondisi.", contoh: "Lampu lalu lintas: jika merah maka berhenti, jika hijau jalan.", poin: "Pengambilan keputusan logis." },
    { no: 5, slide: "Struktur Perulangan", ringkasan: "Menjalankan blok perintah yang sama secara berulang selama syarat terpenuhi.", contoh: "Mencetak struk belanjaan pelanggan sebanyak jumlah item.", poin: "Mengurangi pengulangan baris instruksi manual." }
  ],
  rubrikPenilaian: [
    { kriteria: "Kesesuaian Logika", sangatBaik: "Alur berpikir sangat teratur, efisien, menyelesaikan masalah tanpa cacat logika.", baik: "Alur berpikir teratur, mampu menyelesaikan masalah dengan sedikit redundansi.", cukup: "Alur berpikir ada yang melompat, ada kesalahan logika minor.", perluBimbingan: "Alur berpikir kacau, tidak menyelesaikan masalah pokok." },
    { kriteria: "Ketepatan Notasi", sangatBaik: "Penggunaan simbol flowchart atau sintaks pseudocode 100% akurat sesuai standar.", baik: "Notasi sebagian besar benar, terdapat 1-2 kesalahan kecil dalam memilih simbol.", cukup: "Banyak notasi yang meleset dari standar kurikulum komputer.", perluBimbingan: "Tidak mengikuti standar notasi flowchart maupun pseudocode." },
    { kriteria: "Kerapian Presentasi", sangatBaik: "Tata letak sangat terstruktur, indentasi pseudocode rapi, mudah dibaca sekilas.", baik: "Tata letak rapi, tulisan terbaca jelas, indentasi kurang konsisten.", cukup: "Agak berantakan, sulit dibaca, tidak ada pemisahan blok visual yang jelas.", perluBimbingan: "Sangat tidak berantakan dan membingungkan pembaca." }
  ],
  tandaTangan: {
    tanggal: "28 Juni 2026",
    kota: "Tanggamus",
    namaKepsek: "Sasmadi, M.Pd.",
    nipKepsek: "19660312 198903 1 002",
    namaGuru: "Agus Aprianto, S.Pd.",
    nipGuru: "19860821 201101 1 003"
  }
};

export default function App() {
  // --- STATE MANAGEMENT ---
  const [formData, setFormData] = useState({
    materiPokok: "Algoritma",
    mapel: "Informatika",
    faseKelas: "Fase E / Kelas X",
    tahunAjaran: "2026-2027",
    modelPembelajaran: "Discovery Learning (Pendekatan Deep Learning)",
    jumlahPertemuan: 2,
    sekolah: "SMAN 1 Gunung Alip",
    dibuatDi: "Tanggamus",
    namaGuru: "Agus Aprianto, S.Pd.",
    nipGuru: "19860821 201101 1 003",
    namaKepsek: "Sasmadi, M.Pd.",
    nipKepsek: "19660312 198903 1 002"
  });

  const [modulData, setModulData] = useState(defaultModulData);
  const [activeTab, setActiveTab] = useState('editor'); // 'editor', 'api-guide'
  const [previewTab, setPreviewTab] = useState('modul'); // 'modul', 'lkpd', 'presentasi', 'rubrik'
  const [activeLkpdIndex, setActiveLkpdIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationSteps, setGenerationSteps] = useState<string[]>([]);
  const [customApiKey, setCustomApiKey] = useState(() => {
    return localStorage.getItem('gemini_api_key') || '';
  });
  const [showApiKey, setShowApiKey] = useState(false);
  const [saveApiKey, setSaveApiKey] = useState(true);
  const [testKeyStatus, setTestKeyStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testKeyMessage, setTestKeyMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [savedDocs, setSavedDocs] = useState<any[]>(() => {
    const saved = localStorage.getItem('saved_modul_docs');
    return saved ? JSON.parse(saved) : [];
  });

  const previewRef = useRef<HTMLDivElement>(null);

  // --- SAVE KEY LOCALLY ---
  useEffect(() => {
    if (saveApiKey) {
      localStorage.setItem('gemini_api_key', customApiKey);
    } else {
      localStorage.removeItem('gemini_api_key');
    }
  }, [customApiKey, saveApiKey]);

  // --- SAVE DOCUMENTS TO LOCALSTORAGE FOR DURABILITY ---
  const saveToLocalDatabase = () => {
    const docId = `doc-${Date.now()}`;
    const newDoc = {
      id: docId,
      title: `${modulData.identitas.materi} (${modulData.identitas.faseKelas})`,
      data: modulData,
      createdAt: new Date().toISOString(),
      formData: formData
    };
    const updatedDocs = [newDoc, ...savedDocs];
    setSavedDocs(updatedDocs);
    localStorage.setItem('saved_modul_docs', JSON.stringify(updatedDocs));
    showNotification("success", "Modul Ajar & LKPD berhasil disimpan ke database lokal browser!");
  };

  const deleteLocalDoc = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Apakah Anda yakin ingin menghapus modul ini dari database lokal?")) {
      const updatedDocs = savedDocs.filter(d => d.id !== id);
      setSavedDocs(updatedDocs);
      localStorage.setItem('saved_modul_docs', JSON.stringify(updatedDocs));
      showNotification("success", "Modul Ajar berhasil dihapus!");
    }
  };

  const loadLocalDoc = (docItem: any) => {
    setModulData(docItem.data);
    setFormData(docItem.formData);
    showNotification("success", `Berhasil memuat dokumen: ${docItem.title}`);
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    if (type === 'success') {
      setSuccessMessage(message);
      setTimeout(() => setSuccessMessage(""), 4000);
    } else {
      setErrorMessage(message);
      setTimeout(() => setErrorMessage(""), 6000);
    }
  };

  // --- API KEY TEST RUNNER ---
  const handleTestApiKey = async () => {
    if (!customApiKey) {
      setTestKeyStatus('error');
      setTestKeyMessage("Silakan masukkan API Key terlebih dahulu.");
      return;
    }
    setTestKeyStatus('testing');
    setTestKeyMessage("Menghubungkan ke Google Gemini API...");

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${customApiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Katakan 'OK' jika kamu mendengar saya." }] }]
        })
      });

      if (response.ok) {
        setTestKeyStatus('success');
        setTestKeyMessage("Selesai! API Key valid dan terhubung dengan sukses.");
      } else {
        const errData = await response.json();
        setTestKeyStatus('error');
        setTestKeyMessage(`Gagal: ${errData?.error?.message || response.statusText}`);
      }
    } catch (err: any) {
      setTestKeyStatus('error');
      setTestKeyMessage(`Koneksi Gagal: ${err.message || "Periksa koneksi internet Anda."}`);
    }
  };

  // --- GEMINI PROMPT GENERATION ---
  const handleGenerateAI = async () => {
    if (!customApiKey) {
      showNotification("error", "Kunci API (API Key) diperlukan untuk membuat Modul Ajar otomatis. Silakan baca petunjuk di bagian 'Kunci API' dan masukkan kunci Anda.");
      setActiveTab('api-guide');
      return;
    }

    setIsGenerating(true);
    setGenerationSteps([]);
    setErrorMessage("");

    const steps = [
      "Mengambil struktur pembelajaran Kurikulum Merdeka...",
      "Menganalisis kebutuhan materi " + formData.materiPokok + "...",
      "Merumuskan skenario Pembelajaran Deep Learning (Mindful, Meaningful, Joyful)...",
      "Menyusun Lembar Kerja Peserta Didik (LKPD) yang adaptif...",
      "Merancang draf rubrik penilaian komprehensif...",
      "Memvalidasi struktur JSON akhir untuk kesiapan cetak..."
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx < steps.length) {
        setGenerationSteps(prev => [...prev, steps[stepIdx]]);
        stepIdx++;
      }
    }, 1200);

    const systemPrompt = `Anda adalah konsultan ahli kurikulum Kemendikbudristek Indonesia yang menguasai Kurikulum Merdeka dan pendekatan pedagogis Deep Learning (Mindful, Meaningful, Joyful). Output harus berupa JSON murni tanpa markdown blocks, mengikuti struktur JSON yang tepat.`;

    const userPrompt = `Buatkan Modul Ajar Kurikulum Merdeka yang lengkap dengan data berikut:
    - Mata Pelajaran: ${formData.mapel}
    - Topik / Materi Pokok: ${formData.materiPokok}
    - Fase / Kelas: ${formData.faseKelas}
    - Model Pembelajaran: ${formData.modelPembelajaran}
    - Jumlah Pertemuan: ${formData.jumlahPertemuan} Pertemuan
    - Nama Guru: ${formData.namaGuru}
    - Sekolah: ${formData.sekolah}
    - Dibuat di: ${formData.dibuatDi}
    
    JSON Skema harus tepat berbentuk:
    {
      "identitas": {
        "penyusun": "${formData.namaGuru}",
        "instansi": "${formData.sekolah}",
        "materi": "${formData.materiPokok}",
        "faseKelas": "${formData.faseKelas}",
        "model": "${formData.modelPembelajaran}",
        "topik": "Topik spesifik pembelajaran berlandaskan ${formData.materiPokok}",
        "alokasiWaktu": "${formData.jumlahPertemuan * 2} x 45 Menit (Tahun Ajaran ${formData.tahunAjaran})",
        "jumlahPertemuan": ${formData.jumlahPertemuan}
      },
      "identifikasi": {
        "pesertaDidik": "Penjelasan detail kesiapan awal siswa, kuis pemetaan, profil belajar atau gaya belajar siswa",
        "materiPelajaran": "Penjelasan detail materi pelajaran terkait ${formData.materiPokok}",
        "dimensiProfilLulusan": ["Dimensi 1", "Dimensi 2", "Dimensi 3", "Dimensi 4"]
      },
      "desainPembelajaran": {
        "capaianPembelajaran": "Capaian Pembelajaran (CP) resmi atau terfokus untuk materi ini",
        "lintasDisiplinIlmu": "Keterkaitan materi dengan disiplin ilmu lain",
        "tujuanPembelajaran": "Rumusan Tujuan Pembelajaran (TP) terukur",
        "topikPembelajaran": "Rincian sub-topik",
        "praktikPedagogis": "Implementasi Deep Learning Mindful, Meaningful, Joyful",
        "kemitraanPembelajaran": "Sinergi kelompok siswa/umpan balik sejawat",
        "lingkunganBelajar": "Setting kelas fisik/lab",
        "pemanfaatanDigital": "Aplikasi digital pendukung"
      },
      "pertemuan": [
        {
          "no": 1,
          "tujuanPembelajaran": "Tujuan khusus pertemuan 1",
          "durasi": "2 x 45 Menit",
          "pendahuluan": ["Langkah 1", "Langkah 2"],
          "mindful": ["Durasi", "Kegiatan refleksi sadar 1", "Kegiatan 2"],
          "meaningful": ["Durasi", "Menghubungkan dengan kehidupan nyata", "Eksplorasi konsep"],
          "joyful": ["Durasi", "Aktivitas interaktif menyenangkan", "Game logis"],
          "penutup": ["Durasi", "Refleksi", "Doa"],
          "asesmen": "Asesmen formatif pertemuan 1"
        }
      ],
      "asesmenKriteria": [
        { "aspek": "Sikap", "kriteria": "Kriteria sikap", "skor": "1 - 4", "deskripsi": "Deskripsi" },
        { "aspek": "Pengetahuan", "kriteria": "Kriteria pengetahuan", "skor": "1 - 4", "deskripsi": "Deskripsi" },
        { "aspek": "Keterampilan", "kriteria": "Kriteria keterampilan", "skor": "1 - 4", "deskripsi": "Deskripsi" }
      ],
      "remedial": {
        "metode": "Metode remedial",
        "materi": "Materi remedial",
        "langkah": ["Langkah 1", "Langkah 2"],
        "kriteria": "Kriteria lulus"
      },
      "pengayaan": {
        "jenis": "Aktivitas pengayaan",
        "implementasi": "Cara pelaksanaan",
        "output": "Hasil akhir"
      },
      "refleksi": {
        "guru": "Pertanyaan refleksi guru",
        "siswa": "Pertanyaan refleksi siswa"
      },
      "lkpd": [
        {
          "pertemuanNo": 1,
          "judul": "Judul LKPD Pertemuan 1",
          "tujuan": "Tujuan LKPD",
          "alatBahan": ["Alat 1", "Bahan 2"],
          "petunjuk": ["Petunjuk pengerjaan 1", "Petunjuk 2"],
          "tugas1": "Soal/Tantangan Kasus Kehidupan Nyata 1",
          "tugas2": "Pertanyaan Analisis Logis Mendalam 2"
        }
      ],
      "materiPresentasi": [
        { "no": 1, "slide": "Slide 1", "ringkasan": "Konsep", "contoh": "Contoh", "poin": "Poin penting" }
      ],
      "rubrikPenilaian": [
        { "kriteria": "Kriteria", "sangatBaik": "Deskripsi", "baik": "Deskripsi", "cukup": "Deskripsi", "perluBimbingan": "Deskripsi" }
      ]
    }
    
    Catatan sangat penting: Jumlah objek dalam array 'pertemuan' dan 'lkpd' harus TEPAT sejumlah ${formData.jumlahPertemuan} sesuai input jumlah pertemuan. Semua konten dalam Bahasa Indonesia berkualitas tinggi, formal, padat, dan inspiratif. Jangan potong baris JSON dan pastikan valid.`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${customApiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userPrompt }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: {
            responseMimeType: "application/json"
          }
        })
      });

      if (!response.ok) {
        throw new Error(`API mengembalikan status ${response.status}`);
      }

      const result = await response.json();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error("Gagal menerima respons teks dari model Gemini.");
      }

      const cleanedJson = JSON.parse(text.trim());
      
      // Inject Signature Data
      cleanedJson.tandaTangan = {
        tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        kota: formData.dibuatDi,
        namaKepsek: formData.namaKepsek,
        nipKepsek: formData.nipKepsek,
        namaGuru: formData.namaGuru,
        nipGuru: formData.nipGuru
      };

      setModulData(cleanedJson);
      setActiveLkpdIndex(0);
      showNotification("success", "Selesai! Modul Ajar dan LKPD Anda berhasil dirancang oleh AI.");
    } catch (err: any) {
      console.error(err);
      showNotification("error", `Gagal memproses AI: ${err.message || "Pastikan API Key Anda benar dan kuota mencukupi."}`);
    } finally {
      clearInterval(interval);
      setIsGenerating(false);
    }
  };

  // --- PRINT DOCUMENT ---
  const handlePrint = () => {
    window.print();
  };

  // --- DOWNLOAD AS WORD DOCUMENT ---
  const handleDownloadWord = () => {
    const isLkpdOnly = previewTab === 'lkpd';
    const lk = modulData.lkpd[activeLkpdIndex] || modulData.lkpd[0];
    
    let htmlContent = "";

    if (isLkpdOnly) {
      // Build Word document for LKPD only
      htmlContent = `
      <html xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
      <head><meta charset="utf-8"><title>LKPD - ${lk?.judul}</title>
      <style>
      @page WordSection1 { size: 595.3pt 841.9pt; margin: 54.0pt; }
      div.WordSection1 { page: WordSection1; }
      body, p, li, div { font-family: 'Arial', sans-serif; font-size: 11.0pt; line-height: 1.3; color: #000; }
      h1 { text-align: center; font-size: 16.0pt; font-weight: bold; margin-bottom: 12pt; color: #1e3a8a; }
      h2 { font-size: 12.0pt; font-weight: bold; border-bottom: 1.5pt solid #1e3a8a; padding-bottom: 3pt; color: #1e3a8a; margin-top: 15pt; }
      table { border-collapse: collapse; width: 100%; margin-bottom: 12pt; }
      th, td { border: 1px solid #ccc; padding: 6px 10px; }
      ul, ol { padding-left: 20px; }
      </style></head>
      <body><div class="WordSection1">
      
      <h1>LEMBAR KERJA PESERTA DIDIK (LKPD)</h1>
      <table style="width: 100%; border: none; margin-bottom: 20px;">
        <tr>
          <td style="border: none; width: 50%;"><strong>Nama Siswa:</strong> ________________________</td>
          <td style="border: none; width: 50%;"><strong>Hari/Tanggal:</strong> ________________________</td>
        </tr>
        <tr>
          <td style="border: none;"><strong>Fase / Kelas:</strong> ${modulData.identitas.faseKelas}</td>
          <td style="border: none;"><strong>Kelompok:</strong> ________________________</td>
        </tr>
        <tr>
          <td style="border: none;"><strong>Sekolah:</strong> ${modulData.identitas.instansi}</td>
          <td style="border: none;"><strong>Nilai / Paraf:</strong> ________________________</td>
        </tr>
      </table>

      <h2>${lk?.judul}</h2>
      <p><strong>A. Tujuan Belajar:</strong><br>${lk?.tujuan}</p>
      
      <p><strong>B. Alat & Bahan:</strong></p>
      <ul>${lk?.alatBahan.map((item: string) => `<li>${item}</li>`).join('')}</ul>

      <p><strong>C. Petunjuk Pengerjaan:</strong></p>
      <ol>${lk?.petunjuk.map((item: string) => `<li>${item}</li>`).join('')}</ol>

      <div style="margin-top: 15px; padding: 10px; border: 1px solid #1e3a8a; background-color: #f0f7ff;">
        <p><strong>Tugas 1 (Studi Kasus):</strong><br>${lk?.tugas1}</p>
        <div style="border: 1px solid #ccc; height: 150px; background-color: #fff; margin-top: 10px;"></div>
      </div>

      <div style="margin-top: 15px; padding: 10px; border: 1px solid #1e3a8a; background-color: #f0f7ff;">
        <p><strong>Tugas 2 (Analisis Logika):</strong><br>${lk?.tugas2}</p>
        <div style="border: 1px solid #ccc; height: 150px; background-color: #fff; margin-top: 10px;"></div>
      </div>

      </div></body></html>
      `;
    } else {
      // Build full Modul Ajar Word document
      htmlContent = `
      <html xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
      <head><meta charset="utf-8"><title>Modul Ajar - ${modulData.identitas.materi}</title>
      <style>
      @page WordSection1 { size: 595.3pt 841.9pt; margin: 54.0pt; }
      div.WordSection1 { page: WordSection1; }
      body, p, li, div { font-family: 'Times New Roman', serif; font-size: 11.0pt; line-height: 1.4; color: #000; }
      h1 { text-align: center; font-size: 16.0pt; font-weight: bold; margin-bottom: 6pt; }
      h2 { text-align: center; font-size: 12.0pt; margin-bottom: 15pt; }
      h3 { font-size: 12.0pt; font-weight: bold; border-bottom: 1.5pt solid #1e3a8a; padding-bottom: 2pt; color: #1e3a8a; margin-top: 20pt; text-transform: uppercase; }
      table { border-collapse: collapse; width: 100%; margin-bottom: 12pt; }
      th, td { border: 1px solid #ccc; padding: 6px 10px; }
      ul, ol { padding-left: 20px; }
      </style></head>
      <body><div class="WordSection1">
      
      <div style="background-color: #1e3a8a; padding: 15px; text-align: center; margin-bottom: 20px;">
        <h1 style="color: #ffffff; margin: 0;">MODUL AJAR: ${formData.mapel}</h1>
        <p style="color: #e0f2fe; margin: 5px 0 0 0;">Fase/Kelas: ${modulData.identitas.faseKelas} | ${modulData.identitas.instansi}</p>
      </div>

      <h1 style="margin-top: 20px;">RENCANA PELAKSANAAN PEMBELAJARAN (RPP)</h1>
      <h2>INFORMASI UMUM</h2>

      <h3>A. Identitas Modul</h3>
      <table>
        <tr><td style="width: 30%; background-color: #f5f5f5;"><strong>Penyusun</strong></td><td>${modulData.identitas.penyusun}</td></tr>
        <tr><td style="background-color: #f5f5f5;"><strong>Instansi</strong></td><td>${modulData.identitas.instansi}</td></tr>
        <tr><td style="background-color: #f5f5f5;"><strong>Materi Pokok</strong></td><td>${modulData.identitas.materi}</td></tr>
        <tr><td style="background-color: #f5f5f5;"><strong>Fase / Kelas</strong></td><td>${modulData.identitas.faseKelas}</td></tr>
        <tr><td style="background-color: #f5f5f5;"><strong>Model Pembelajaran</strong></td><td>${modulData.identitas.model}</td></tr>
        <tr><td style="background-color: #f5f5f5;"><strong>Alokasi Waktu</strong></td><td>${modulData.identitas.alokasiWaktu}</td></tr>
      </table>

      <h3>B. Kesiapan & Identifikasi</h3>
      <p><strong>Peserta Didik:</strong> ${modulData.identifikasi.pesertaDidik}</p>
      <p><strong>Materi Pokok:</strong> ${modulData.identifikasi.materiPelajaran}</p>
      <p><strong>Profil Pelajar Pancasila:</strong></p>
      <ul>${modulData.identifikasi.dimensiProfilLulusan.map((item: string) => `<li>${item}</li>`).join('')}</ul>

      <h3>C. Desain Kegiatan Pembelajaran</h3>
      <p><strong>Capaian Pembelajaran (CP):</strong> ${modulData.desainPembelajaran.capaianPembelajaran}</p>
      <p><strong>Tujuan Pembelajaran (TP):</strong> ${modulData.desainPembelajaran.tujuanPembelajaran}</p>
      <p><strong>Praktik Pedagogis (Deep Learning):</strong> ${modulData.desainPembelajaran.praktikPedagogis}</p>

      ${modulData.pertemuan.map((p: any) => `
        <h3>Pertemuan Ke-${p.no}</h3>
        <p><strong>Tujuan Pertemuan:</strong> ${p.tujuanPembelajaran}</p>
        <p><strong>1. Pendahuluan:</strong></p>
        <ul>${p.pendahuluan.map((x: string) => `<li>${x}</li>`).join('')}</ul>
        <p><strong>2. Kegiatan Inti - Fase Mindful:</strong></p>
        <ul>${p.mindful.map((x: string) => `<li>${x}</li>`).join('')}</ul>
        <p><strong>3. Kegiatan Inti - Fase Meaningful:</strong></p>
        <ul>${p.meaningful.map((x: string) => `<li>${x}</li>`).join('')}</ul>
        <p><strong>4. Kegiatan Inti - Fase Joyful:</strong></p>
        <ul>${p.joyful.map((x: string) => `<li>${x}</li>`).join('')}</ul>
        <p><strong>5. Penutup:</strong></p>
        <ul>${p.penutup.map((x: string) => `<li>${x}</li>`).join('')}</ul>
        <p><strong>Asesmen Pertemuan:</strong> ${p.asesmen}</p>
      `).join('')}

      <h3>D. Program Remedial & Pengayaan</h3>
      <p><strong>Remedial:</strong> ${modulData.remedial.metode} (Materi: ${modulData.remedial.materi})</p>
      <p><strong>Pengayaan:</strong> ${modulData.pengayaan.jenis} (Output: ${modulData.pengayaan.output})</p>

      <div style="margin-top: 50px;">
        <table style="width: 100%; border: none;">
          <tr>
            <td style="border: none; text-align: center;">
              Mengetahui,<br>Kepala Sekolah<br><br><br><br><strong>${modulData.tandaTangan?.namaKepsek}</strong>
            </td>
            <td style="border: none; text-align: center;">
              Dibuat di ${modulData.tandaTangan?.kota}, ${modulData.tandaTangan?.tanggal}<br>Guru Mata Pelajaran<br><br><br><br><strong>${modulData.tandaTangan?.namaGuru}</strong>
            </td>
          </tr>
        </table>
      </div>

      </div></body></html>
      `;
    }

    const blob = new Blob(['\ufeff' + htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = isLkpdOnly 
      ? `LKPD_Pertemuan_${activeLkpdIndex + 1}_${modulData.identitas.materi.replace(/\s+/g, '_')}.doc`
      : `Modul_Ajar_${modulData.identitas.materi.replace(/\s+/g, '_')}_Kurikulum_Merdeka.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // --- EDIT FIELD HANDLER IN-PREVIEW ---
  const handleEditNestedField = (section: string, key: string, val: any) => {
    setModulData(prev => {
      const updated = { ...prev } as any;
      if (updated[section]) {
        updated[section][key] = val;
      }
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      
      {/* Global CSS for Print Optimization */}
      <style>{`
        @media print {
          body {
            background-color: white !important;
            color: black !important;
          }
          .no-print {
            display: none !important;
          }
          .print-container {
            display: block !important;
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            background: white !important;
            color: black !important;
          }
          .page-break-print {
            page-break-before: always;
          }
          table {
            border-collapse: collapse;
            width: 100% !important;
            color: black !important;
          }
          th, td {
            border: 1px solid #999 !important;
            color: black !important;
            padding: 6px 10px !important;
          }
          h3, h2, h1 {
            color: #1e3a8a !important;
          }
        }
      `}</style>

      {/* Warning Educational Header Banner */}
      <div className="no-print bg-gradient-to-r from-amber-600/20 via-amber-600/15 to-transparent border-b border-amber-600/30 text-amber-300 py-2.5 px-4 text-xs font-semibold flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Aplikasi Generator Modul Ajar & LKPD Kurikulum Merdeka - Khusus Pengembangan Mutu Pendidikan</span>
        </div>
        <span className="hidden sm:inline bg-amber-500/20 text-amber-200 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider">v1.5 - Client Key Enabled</span>
      </div>

      {/* Primary Top Navbar */}
      <header className="no-print bg-slate-950/80 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600/90 text-white rounded-xl shadow-lg shadow-indigo-600/20">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white">AI Modul Ajar & LKPD</h1>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.2 rounded font-mono">Kurikulum Merdeka</span>
              </div>
              <p className="text-xs text-slate-400">Rancang Rencana Pembelajaran & Lembar Kerja Siswa Berbasis Deep Learning</p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              onClick={() => setActiveTab(activeTab === 'editor' ? 'api-guide' : 'editor')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                activeTab === 'api-guide' 
                  ? 'bg-amber-600 text-white shadow shadow-amber-600/30' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              <Key className="w-4 h-4" />
              <span>Panduan Kunci API</span>
            </button>

            <button
              onClick={saveToLocalDatabase}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-lg text-xs font-semibold transition border border-slate-700"
            >
              <Save className="w-4 h-4 text-emerald-400" />
              <span>Simpan Lokal</span>
            </button>

            <button
              onClick={handleDownloadWord}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-2 rounded-lg text-xs font-semibold transition shadow-md shadow-indigo-600/15"
            >
              <Download className="w-4 h-4" />
              <span>Unduh Word</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-lg text-xs font-semibold transition shadow-md shadow-emerald-600/15"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Notifications */}
      {successMessage && (
        <div className="no-print max-w-7xl mx-auto mt-4 px-4 w-full">
          <div className="bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 px-4 py-3 rounded-xl text-sm flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2.5">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{successMessage}</span>
            </div>
            <button onClick={() => setSuccessMessage("")} className="text-slate-400 hover:text-white text-lg">&times;</button>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="no-print max-w-7xl mx-auto mt-4 px-4 w-full">
          <div className="bg-rose-950/40 border border-rose-500/30 text-rose-300 px-4 py-3 rounded-xl text-sm flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button onClick={() => setErrorMessage("")} className="text-slate-400 hover:text-white text-lg">&times;</button>
          </div>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Controls & Configurations */}
        <section className="no-print lg:col-span-4 space-y-6">
          
          {/* TAB 1: API Key & Detailed Access Instructions */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-indigo-400" />
                <h2 className="font-bold text-sm tracking-wide text-slate-200">Kunci API Gemini</h2>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                customApiKey ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              }`}>
                {customApiKey ? "Kunci Tersimpan" : "Belum Ada Kunci"}
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-400 leading-relaxed">
                Aplikasi ini memanggil kecerdasan buatan Google Gemini secara langsung dari browser Anda untuk menyusun kurikulum. Masukkan kunci API pribadi Anda di bawah.
              </p>

              <div className="relative">
                <input
                  type={showApiKey ? "text" : "password"}
                  value={customApiKey}
                  onChange={(e) => setCustomApiKey(e.target.value)}
                  placeholder="AI_SyZa_..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-3.5 pr-10 py-2.5 text-xs font-mono text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center gap-2.5">
                <label className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={saveApiKey}
                    onChange={(e) => setSaveApiKey(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-800 w-3.5 h-3.5"
                  />
                  <span>Simpan otomatis di browser ini</span>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleTestApiKey}
                  className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <FileCheck className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Uji Kunci API</span>
                </button>
                <button
                  onClick={() => setActiveTab('api-guide')}
                  className="py-2 px-3 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Cara Dapat Kunci</span>
                </button>
              </div>

              {testKeyStatus !== 'idle' && (
                <div className={`p-3 rounded-xl text-xs border ${
                  testKeyStatus === 'testing' ? 'bg-slate-900 text-slate-300 border-slate-800' :
                  testKeyStatus === 'success' ? 'bg-emerald-950/30 text-emerald-400 border-emerald-500/20' :
                  'bg-rose-950/30 text-rose-400 border-rose-500/20'
                }`}>
                  <p className="font-semibold capitalize text-[10px] tracking-wider mb-0.5">{testKeyStatus}:</p>
                  <p>{testKeyMessage}</p>
                </div>
              )}
            </div>
          </div>

          {/* TAB 2: Parameters Form */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Sliders className="w-5 h-5 text-indigo-400" />
              <h2 className="font-bold text-sm tracking-wide text-slate-200">Konfigurasi Pembelajaran</h2>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Materi Pokok / Topik</label>
                <input
                  type="text"
                  value={formData.materiPokok}
                  onChange={(e) => setFormData({...formData, materiPokok: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="Contoh: Algoritma, Gaya Gesek, Sel"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 font-medium mb-1.5">Mata Pelajaran</label>
                  <input
                    type="text"
                    value={formData.mapel}
                    onChange={(e) => setFormData({...formData, mapel: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1.5">Fase / Kelas</label>
                  <input
                    type="text"
                    value={formData.faseKelas}
                    onChange={(e) => setFormData({...formData, faseKelas: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 font-medium mb-1.5">Tahun Ajaran</label>
                  <input
                    type="text"
                    value={formData.tahunAjaran}
                    onChange={(e) => setFormData({...formData, tahunAjaran: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1.5">Jumlah Pertemuan</label>
                  <select
                    value={formData.jumlahPertemuan}
                    onChange={(e) => setFormData({...formData, jumlahPertemuan: Number(e.target.value)})}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none"
                  >
                    <option value={1}>1 Pertemuan</option>
                    <option value={2}>2 Pertemuan</option>
                    <option value={3}>3 Pertemuan</option>
                    <option value={4}>4 Pertemuan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Model Pembelajaran</label>
                <select
                  value={formData.modelPembelajaran}
                  onChange={(e) => setFormData({...formData, modelPembelajaran: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none"
                >
                  <option value="Discovery Learning (Pendekatan Deep Learning)">Discovery Learning (Deep Learning)</option>
                  <option value="Problem Based Learning (PBL)">Problem Based Learning (PBL)</option>
                  <option value="Project Based Learning (PjBL)">Project Based Learning (PjBL)</option>
                  <option value="Inquiry Learning Terbimbing">Inquiry Learning Terbimbing</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Nama Sekolah / Instansi</label>
                <input
                  type="text"
                  value={formData.sekolah}
                  onChange={(e) => setFormData({...formData, sekolah: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 font-medium mb-1.5">Dibuat Di (Kota)</label>
                  <input
                    type="text"
                    value={formData.dibuatDi}
                    onChange={(e) => setFormData({...formData, dibuatDi: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1.5">Nama Guru Penyusun</label>
                  <input
                    type="text"
                    value={formData.namaGuru}
                    onChange={(e) => setFormData({...formData, namaGuru: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 font-medium mb-1.5">NIP Guru</label>
                  <input
                    type="text"
                    value={formData.nipGuru}
                    onChange={(e) => setFormData({...formData, nipGuru: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1.5">Nama Kepala Sekolah</label>
                  <input
                    type="text"
                    value={formData.namaKepsek}
                    onChange={(e) => setFormData({...formData, namaKepsek: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerateAI}
              disabled={isGenerating}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-650 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition active:scale-[0.98] disabled:opacity-50 mt-4"
            >
              <Sparkles className="w-4 h-4 text-indigo-200" />
              <span>{isGenerating ? "Mendesain Modul Ajar..." : "Rancang Otomatis dengan AI"}</span>
            </button>
          </div>

          {/* TAB 3: Saved Documents database */}
          {savedDocs.length > 0 && (
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2.5">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-sm text-slate-200">📂 Modul Tersimpan ({savedDocs.length})</h3>
              </div>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {savedDocs.map((docItem) => (
                  <div
                    key={docItem.id}
                    onClick={() => loadLocalDoc(docItem)}
                    className="w-full text-left bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 p-2.5 rounded-xl transition text-xs flex justify-between items-center cursor-pointer group"
                  >
                    <div className="truncate max-w-[200px]">
                      <p className="font-semibold text-slate-200 truncate">{docItem.title}</p>
                      <p className="text-[10px] text-slate-500">{new Date(docItem.createdAt).toLocaleDateString()}</p>
                    </div>
                    <button
                      onClick={(e) => deleteLocalDoc(docItem.id, e)}
                      className="p-1 hover:bg-rose-500/15 rounded text-slate-500 hover:text-rose-400 transition"
                      title="Hapus Dokumen"
                    >
                      <Trash className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </section>

        {/* RIGHT COLUMN: Document Viewer / Guide Screen */}
        <section className="lg:col-span-8 flex flex-col space-y-4">
          
          {/* SKELETON AI LOADING PROGRESS */}
          {isGenerating && (
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 shadow-xl flex flex-col items-center justify-center text-center space-y-6 min-h-[450px]">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
                <Sparkles className="w-6 h-6 text-indigo-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-indigo-400 animate-pulse">Menghubungkan ke Gemini AI</h3>
                <p className="text-xs text-slate-400 max-w-sm">Merespons kebutuhan kurikulum secara real-time dan merancang lembar kerja...</p>
              </div>

              <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl p-4 text-left font-mono text-xs space-y-1.5 text-slate-300">
                <div className="text-indigo-400 font-bold border-b border-slate-800 pb-1.5 mb-2 flex items-center justify-between">
                  <span>LOG AKTIVITAS</span>
                  <span className="text-[10px] text-indigo-300 animate-pulse font-sans">SEDANG BERJALAN...</span>
                </div>
                {generationSteps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-emerald-400">
                    <span className="text-emerald-500">✓</span>
                    <span>{step}</span>
                  </div>
                ))}
                <div className="text-indigo-300 animate-pulse flex items-center gap-2 text-[11px] pt-1">
                  <span className="animate-ping">●</span>
                  <span>Menerapkan kerangka kerja Deep Learning nasional...</span>
                </div>
              </div>
            </div>
          )}

          {/* ACTIVE TAB: API GUIDE */}
          {!isGenerating && activeTab === 'api-guide' && (
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <Key className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h2 className="font-bold text-base text-slate-200">Panduan Mendapatkan Google Gemini API Key</h2>
                  <p className="text-xs text-slate-400">Ikuti langkah mudah berikut untuk mendapatkan kunci API Google gratis dalam waktu 1 menit.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-xl space-y-3.5">
                  <h3 className="font-bold text-xs text-indigo-400 uppercase tracking-wider">Langkah-Langkah Pembuatan:</h3>
                  <ol className="space-y-3 text-xs text-slate-300 list-decimal pl-4 leading-relaxed">
                    <li>
                      Buka portal resmi <strong>Google AI Studio</strong> di <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" className="text-indigo-400 inline-flex items-center gap-0.5 hover:underline">aistudio.google.com <ExternalLink className="w-3 h-3" /></a>
                    </li>
                    <li>
                      Login menggunakan akun Gmail pribadi atau akun Google sekolah Anda.
                    </li>
                    <li>
                      Klik tombol biru bertuliskan <strong>"Get API Key"</strong> di sebelah kiri atas menu navigasi.
                    </li>
                    <li>
                      Pilih <strong>"Create API Key"</strong>, pilih salah satu Google Cloud Project (atau buat project baru bawaan).
                    </li>
                    <li>
                      Klik <strong>"Copy"</strong> pada string panjang yang dihasilkan (dimulai dengan karakter <code>AIzaSy...</code>).
                    </li>
                  </ol>
                </div>

                <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-xl space-y-3.5">
                  <h3 className="font-bold text-xs text-indigo-400 uppercase tracking-wider">Mengapa Menggunakan API Key Sendiri?</h3>
                  <div className="space-y-2.5 text-xs text-slate-400 leading-relaxed">
                    <p className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Kebebasan Penuh:</strong> Anda mendapatkan kuota gratis yang sangat melimpah untuk penggunaan personal harian (hingga 15 permintaan per menit).</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Privasi Terjamin:</strong> Kunci API Anda disimpan secara lokal di browser dan tidak pernah dikirim atau dibagikan ke pihak ketiga mana pun.</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Dukungan Kurikulum Dinamis:</strong> AI dapat menghasilkan materi ajar yang sangat relevan tanpa batasan waktu atau topik.</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-950/20 border border-indigo-500/20 p-4 rounded-xl flex items-start gap-3">
                <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300 leading-relaxed">
                  <p className="font-semibold text-slate-200 mb-1">Sudah mendapatkan API Key?</p>
                  <p className="mb-2">Masukkan kunci tersebut pada kolom input di pojok kiri atas, klik "Uji Kunci API" untuk memvalidasi, kemudian kembali ke editor parameter untuk mulai merancang modul secara instan.</p>
                  <button
                    onClick={() => setActiveTab('editor')}
                    className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition text-[11px]"
                  >
                    Mulai Merancang Sekarang
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ACTIVE TAB: DOCUMENT VIEWER */}
          {!isGenerating && activeTab === 'editor' && (
            <div className="space-y-4">
              
              {/* Internal Document Subtabs Navigation (Responsive) */}
              <div className="no-print bg-slate-950 border border-slate-800 p-1.5 rounded-xl flex flex-wrap gap-1">
                <button
                  onClick={() => setPreviewTab('modul')}
                  className={`flex-1 min-w-[100px] py-2 text-center text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    previewTab === 'modul' 
                      ? 'bg-slate-800 text-white border border-slate-700/80' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Modul Ajar RPP</span>
                </button>

                <button
                  onClick={() => setPreviewTab('lkpd')}
                  className={`flex-1 min-w-[100px] py-2 text-center text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    previewTab === 'lkpd' 
                      ? 'bg-slate-800 text-white border border-slate-700/80' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lembar Kerja (LKPD)</span>
                </button>

                <button
                  onClick={() => setPreviewTab('presentasi')}
                  className={`flex-1 min-w-[100px] py-2 text-center text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    previewTab === 'presentasi' 
                      ? 'bg-slate-800 text-white border border-slate-700/80' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>Materi Slide</span>
                </button>

                <button
                  onClick={() => setPreviewTab('rubrik')}
                  className={`flex-1 min-w-[100px] py-2 text-center text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    previewTab === 'rubrik' 
                      ? 'bg-slate-800 text-white border border-slate-700/80' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Info className="w-3.5 h-3.5 text-sky-400" />
                  <span>Rubrik Penilaian</span>
                </button>
              </div>

              {/* SHEET BODY CONTAINER (PRINT OPTIMIZED PAPER) */}
              <div 
                ref={previewRef}
                className="print-container bg-white text-slate-800 rounded-2xl p-6 md:p-12 shadow-2xl border border-slate-200 overflow-y-auto max-h-[120vh] leading-relaxed text-sm"
              >
                
                {/* 1. VIEW TAB: MODUL AJAR (RPP) */}
                {previewTab === 'modul' && (
                  <div className="space-y-6">
                    {/* Header Box mimicking official Indonesian lesson plan standard */}
                    <div className="bg-indigo-900 text-white p-6 rounded-lg text-center shadow-sm">
                      <h1 className="text-xl md:text-2xl font-black m-0 tracking-wide text-white">MODUL AJAR: {formData.mapel}</h1>
                      <p className="text-xs md:text-sm text-indigo-200 m-0 mt-1 font-medium">
                        Fase / Kelas: <strong className="text-white">{modulData.identitas.faseKelas}</strong> | Sekolah: {modulData.identitas.instansi}
                      </p>
                    </div>

                    <div className="text-center">
                      <h2 className="text-lg font-bold uppercase tracking-tight text-slate-800 m-0">Rencana Pelaksanaan Pembelajaran (RPP)</h2>
                      <h3 className="text-xs font-semibold tracking-wider text-indigo-700 uppercase mt-0.5 m-0">Informasi Umum Pembelajaran</h3>
                    </div>

                    {/* SUB-SECTION A: IDENTITAS */}
                    <div className="border-b-2 border-indigo-900 pb-1 flex justify-between items-center mt-6">
                      <h3 className="text-sm font-bold text-indigo-900 m-0 uppercase">A. IDENTITAS MODUL AJAR</h3>
                      <span className="no-print text-[10px] bg-slate-100 text-slate-500 border px-2 py-0.5 rounded">Sunting Langsung dalam Tabel</span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-xs md:text-sm text-slate-800">
                        <tbody>
                          <tr className="border-b border-slate-200">
                            <td className="w-1/3 font-semibold text-slate-700 bg-slate-50 p-2">Penyusun</td>
                            <td className="p-1">
                              <input 
                                type="text" 
                                value={modulData.identitas.penyusun} 
                                onChange={(e) => handleEditNestedField('identitas', 'penyusun', e.target.value)}
                                className="w-full bg-transparent border-none focus:ring-1 focus:ring-indigo-500 rounded p-1 text-slate-900 font-medium"
                              />
                            </td>
                          </tr>
                          <tr className="border-b border-slate-200">
                            <td className="font-semibold text-slate-700 bg-slate-50 p-2">Instansi</td>
                            <td className="p-1">
                              <input 
                                type="text" 
                                value={modulData.identitas.instansi} 
                                onChange={(e) => handleEditNestedField('identitas', 'instansi', e.target.value)}
                                className="w-full bg-transparent border-none focus:ring-1 focus:ring-indigo-500 rounded p-1 text-slate-900"
                              />
                            </td>
                          </tr>
                          <tr className="border-b border-slate-200">
                            <td className="font-semibold text-slate-700 bg-slate-50 p-2">Materi Pokok</td>
                            <td className="p-1">
                              <input 
                                type="text" 
                                value={modulData.identitas.materi} 
                                onChange={(e) => handleEditNestedField('identitas', 'materi', e.target.value)}
                                className="w-full bg-transparent border-none focus:ring-1 focus:ring-indigo-500 rounded p-1 text-slate-900 font-medium"
                              />
                            </td>
                          </tr>
                          <tr className="border-b border-slate-200">
                            <td className="font-semibold text-slate-700 bg-slate-50 p-2">Fase / Kelas</td>
                            <td className="p-1">
                              <input 
                                type="text" 
                                value={modulData.identitas.faseKelas} 
                                onChange={(e) => handleEditNestedField('identitas', 'faseKelas', e.target.value)}
                                className="w-full bg-transparent border-none focus:ring-1 focus:ring-indigo-500 rounded p-1 text-slate-900"
                              />
                            </td>
                          </tr>
                          <tr className="border-b border-slate-200">
                            <td className="font-semibold text-slate-700 bg-slate-50 p-2">Alokasi Waktu</td>
                            <td className="p-1">
                              <input 
                                type="text" 
                                value={modulData.identitas.alokasiWaktu} 
                                onChange={(e) => handleEditNestedField('identitas', 'alokasiWaktu', e.target.value)}
                                className="w-full bg-transparent border-none focus:ring-1 focus:ring-indigo-500 rounded p-1 text-slate-900"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="font-semibold text-slate-700 bg-slate-50 p-2">Model Pembelajaran</td>
                            <td className="p-1">
                              <input 
                                type="text" 
                                value={modulData.identitas.model} 
                                onChange={(e) => handleEditNestedField('identitas', 'model', e.target.value)}
                                className="w-full bg-transparent border-none focus:ring-1 focus:ring-indigo-500 rounded p-1 text-slate-900"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* SUB-SECTION B: IDENTIFIKASI */}
                    <div className="border-b-2 border-indigo-900 pb-1 mt-6">
                      <h3 className="text-sm font-bold text-indigo-900 m-0 uppercase">B. PEMETAAN DAN IDENTIFIKASI</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-xs font-bold text-slate-700 bg-slate-50 p-1.5 rounded">1. Kesiapan Peserta Didik</h4>
                        <textarea
                          rows={2}
                          value={modulData.identifikasi.pesertaDidik}
                          onChange={(e) => handleEditNestedField('identifikasi', 'pesertaDidik', e.target.value)}
                          className="w-full bg-transparent border-none focus:ring-1 focus:ring-indigo-500 rounded p-1 text-slate-800 text-xs md:text-sm resize-none mt-1"
                        />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-700 bg-slate-50 p-1.5 rounded">2. Karakteristik Materi Pokok</h4>
                        <textarea
                          rows={2}
                          value={modulData.identifikasi.materiPelajaran}
                          onChange={(e) => handleEditNestedField('identifikasi', 'materiPelajaran', e.target.value)}
                          className="w-full bg-transparent border-none focus:ring-1 focus:ring-indigo-500 rounded p-1 text-slate-800 text-xs md:text-sm resize-none mt-1"
                        />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-700 bg-slate-50 p-1.5 rounded">3. Profil Pelajar Pancasila (Dimensi Lulusan)</h4>
                        <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-700 text-xs md:text-sm">
                          {modulData.identifikasi.dimensiProfilLulusan.map((dim, idx) => (
                            <li key={idx}>
                              <input 
                                type="text" 
                                value={dim} 
                                onChange={(e) => {
                                  const updated = [...modulData.identifikasi.dimensiProfilLulusan];
                                  updated[idx] = e.target.value;
                                  setModulData({
                                    ...modulData,
                                    identifikasi: { ...modulData.identifikasi, dimensiProfilLulusan: updated }
                                  });
                                }}
                                className="w-full bg-transparent border-none focus:ring-1 focus:ring-indigo-500 rounded p-0.5"
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* SUB-SECTION C: DESAIN PEMBELAJARAN */}
                    <div className="border-b-2 border-indigo-900 pb-1 mt-6">
                      <h3 className="text-sm font-bold text-indigo-900 m-0 uppercase">C. DESAIN KEGIATAN PEMBELAJARAN</h3>
                    </div>
                    <div className="space-y-3 text-xs md:text-sm">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-slate-100 p-3 rounded-lg bg-slate-50/40">
                          <strong className="text-slate-800 text-xs block mb-1">Capaian Pembelajaran (CP)</strong>
                          <textarea
                            rows={3}
                            value={modulData.desainPembelajaran.capaianPembelajaran}
                            onChange={(e) => handleEditNestedField('desainPembelajaran', 'capaianPembelajaran', e.target.value)}
                            className="w-full bg-transparent border-none focus:ring-1 focus:ring-indigo-500 rounded text-slate-700 text-xs resize-none"
                          />
                        </div>
                        <div className="border border-slate-100 p-3 rounded-lg bg-slate-50/40">
                          <strong className="text-slate-800 text-xs block mb-1">Tujuan Pembelajaran (TP)</strong>
                          <textarea
                            rows={3}
                            value={modulData.desainPembelajaran.tujuanPembelajaran}
                            onChange={(e) => handleEditNestedField('desainPembelajaran', 'tujuanPembelajaran', e.target.value)}
                            className="w-full bg-transparent border-none focus:ring-1 focus:ring-indigo-500 rounded text-slate-700 text-xs resize-none"
                          />
                        </div>
                      </div>

                      <div className="border border-slate-100 p-3 rounded-lg">
                        <strong className="text-slate-800 text-xs block mb-1">Praktik Paedagogis (Deep Learning)</strong>
                        <textarea
                          rows={2}
                          value={modulData.desainPembelajaran.praktikPedagogis}
                          onChange={(e) => handleEditNestedField('desainPembelajaran', 'praktikPedagogis', e.target.value)}
                          className="w-full bg-transparent border-none focus:ring-1 focus:ring-indigo-500 rounded text-slate-700 text-xs resize-none"
                        />
                      </div>
                    </div>

                    {/* SUB-SECTION D: DETIL PERTEMUAN */}
                    {modulData.pertemuan.map((p: any, pIdx: number) => (
                      <div key={pIdx} className="page-break-print space-y-4 pt-6 border-t border-slate-100 mt-6">
                        <div className="bg-indigo-50 border-l-4 border-indigo-600 p-3 flex justify-between items-center rounded">
                          <h4 className="font-bold text-indigo-900 m-0 text-sm">SKENARIO PEMBELAJARAN PERTEMUAN KE-{p.no}</h4>
                          <span className="text-xs bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded-full font-semibold">{p.durasi}</span>
                        </div>

                        <div className="space-y-3.5 text-xs md:text-sm">
                          <div>
                            <strong className="text-indigo-900 text-xs uppercase block mb-1">Tujuan Khusus Pertemuan:</strong>
                            <input 
                              type="text" 
                              value={p.tujuanPembelajaran} 
                              onChange={(e) => {
                                const list = [...modulData.pertemuan];
                                list[pIdx].tujuanPembelajaran = e.target.value;
                                setModulData({...modulData, pertemuan: list});
                              }}
                              className="w-full bg-transparent border-none focus:ring-1 focus:ring-indigo-500 rounded text-slate-800"
                            />
                          </div>

                          {/* Pendahuluan */}
                          <div className="pl-4 border-l-2 border-slate-200">
                            <strong className="text-slate-800 block text-xs font-bold mb-1">1. Pendahuluan Pembelajaran</strong>
                            <ul className="list-disc pl-5 space-y-1">
                              {p.pendahuluan.map((item: string, idx: number) => (
                                <li key={idx}>
                                  <input 
                                    type="text" 
                                    value={item} 
                                    onChange={(e) => {
                                      const steps = [...p.pendahuluan];
                                      steps[idx] = e.target.value;
                                      const meetings = [...modulData.pertemuan];
                                      meetings[pIdx].pendahuluan = steps;
                                      setModulData({...modulData, pertemuan: meetings});
                                    }}
                                    className="w-full bg-transparent border-none focus:ring-1 focus:ring-indigo-500"
                                  />
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* DEEP LEARNING STEPS */}
                          <div className="pl-4 border-l-2 border-indigo-400 bg-indigo-50/20 p-2.5 rounded">
                            <strong className="text-indigo-900 block text-xs font-black mb-1">2. Kegiatan Inti - Fase Mindful (Kesadaran Penuh)</strong>
                            <ul className="list-disc pl-5 space-y-1">
                              {p.mindful.map((item: string, idx: number) => (
                                <li key={idx}>
                                  <input 
                                    type="text" 
                                    value={item} 
                                    onChange={(e) => {
                                      const steps = [...p.mindful];
                                      steps[idx] = e.target.value;
                                      const meetings = [...modulData.pertemuan];
                                      meetings[pIdx].mindful = steps;
                                      setModulData({...modulData, pertemuan: meetings});
                                    }}
                                    className="w-full bg-transparent border-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
                                  />
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="pl-4 border-l-2 border-indigo-400 bg-indigo-50/20 p-2.5 rounded">
                            <strong className="text-indigo-900 block text-xs font-black mb-1">3. Kegiatan Inti - Fase Meaningful (Pemahaman Bermakna)</strong>
                            <ul className="list-disc pl-5 space-y-1">
                              {p.meaningful.map((item: string, idx: number) => (
                                <li key={idx}>
                                  <input 
                                    type="text" 
                                    value={item} 
                                    onChange={(e) => {
                                      const steps = [...p.meaningful];
                                      steps[idx] = e.target.value;
                                      const meetings = [...modulData.pertemuan];
                                      meetings[pIdx].meaningful = steps;
                                      setModulData({...modulData, pertemuan: meetings});
                                    }}
                                    className="w-full bg-transparent border-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
                                  />
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="pl-4 border-l-2 border-indigo-400 bg-indigo-50/20 p-2.5 rounded">
                            <strong className="text-indigo-900 block text-xs font-black mb-1">4. Kegiatan Inti - Fase Joyful (Pembelajaran Menyenangkan)</strong>
                            <ul className="list-disc pl-5 space-y-1">
                              {p.joyful.map((item: string, idx: number) => (
                                <li key={idx}>
                                  <input 
                                    type="text" 
                                    value={item} 
                                    onChange={(e) => {
                                      const steps = [...p.joyful];
                                      steps[idx] = e.target.value;
                                      const meetings = [...modulData.pertemuan];
                                      meetings[pIdx].joyful = steps;
                                      setModulData({...modulData, pertemuan: meetings});
                                    }}
                                    className="w-full bg-transparent border-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
                                  />
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Penutup */}
                          <div className="pl-4 border-l-2 border-slate-200">
                            <strong className="text-slate-800 block text-xs font-bold mb-1">5. Penutup Pembelajaran</strong>
                            <ul className="list-disc pl-5 space-y-1">
                              {p.penutup.map((item: string, idx: number) => (
                                <li key={idx}>
                                  <input 
                                    type="text" 
                                    value={item} 
                                    onChange={(e) => {
                                      const steps = [...p.penutup];
                                      steps[idx] = e.target.value;
                                      const meetings = [...modulData.pertemuan];
                                      meetings[pIdx].penutup = steps;
                                      setModulData({...modulData, pertemuan: meetings});
                                    }}
                                    className="w-full bg-transparent border-none focus:ring-1 focus:ring-indigo-500"
                                  />
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg">
                            <strong className="text-slate-700 text-xs block mb-0.5">Asesmen Hasil:</strong>
                            <input 
                              type="text" 
                              value={p.asesmen} 
                              onChange={(e) => {
                                const list = [...modulData.pertemuan];
                                list[pIdx].asesmen = e.target.value;
                                setModulData({...modulData, pertemuan: list});
                              }}
                              className="w-full bg-transparent border-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* SIGNATURES PLACEHOLDER */}
                    <div className="mt-16 border-t border-slate-200 pt-8 page-break-inside-avoid">
                      <table className="w-full border-none text-slate-800 text-xs md:text-sm">
                        <tbody>
                          <tr>
                            <td className="w-1/2 text-center border-none align-bottom py-4">
                              Mengetahui,<br />
                              Kepala Sekolah<br /><br /><br /><br /><br />
                              <strong className="text-slate-900 border-b border-slate-800 pb-0.5 inline-block">
                                {modulData.tandaTangan?.namaKepsek || "Sasmadi, M.Pd."}
                              </strong><br />
                              NIP. {modulData.tandaTangan?.nipKepsek || "19660312 198903 1 002"}
                            </td>
                            <td className="w-1/2 text-center border-none align-bottom py-4">
                              Dibuat di {modulData.tandaTangan?.kota || "Tanggamus"}, {modulData.tandaTangan?.tanggal || "28 Juni 2026"}<br />
                              Guru Mata Pelajaran<br /><br /><br /><br /><br />
                              <strong className="text-slate-900 border-b border-slate-800 pb-0.5 inline-block">
                                {modulData.tandaTangan?.namaGuru || "Agus Aprianto, S.Pd."}
                              </strong><br />
                              NIP. {modulData.tandaTangan?.nipGuru || "19860821 201101 1 003"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 2. VIEW TAB: LEMBAR KERJA PESERTA DIDIK (LKPD) */}
                {previewTab === 'lkpd' && (
                  <div className="space-y-6">
                    
                    {/* Select active meeting LKPD */}
                    <div className="no-print bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center justify-between gap-4">
                      <span className="text-xs font-bold text-slate-700">Pilih Pertemuan LKPD:</span>
                      <div className="flex gap-1.5">
                        {modulData.lkpd.map((lkItem: any, idx: number) => (
                          <button
                            key={idx}
                            onClick={() => setActiveLkpdIndex(idx)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                              activeLkpdIndex === idx 
                                ? 'bg-indigo-600 text-white' 
                                : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                            }`}
                          >
                            Pertemuan {lkItem.pertemuanNo || (idx + 1)}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Official printed header sheet for students */}
                    <div className="border-4 border-double border-indigo-900 p-4 rounded-xl bg-indigo-50/10">
                      <div className="text-center border-b-2 border-indigo-950 pb-2 mb-4">
                        <h1 className="text-lg md:text-xl font-black text-indigo-900 tracking-wider m-0">LEMBAR KERJA PESERTA DIDIK (LKPD)</h1>
                        <p className="text-xs text-slate-600 m-0 mt-0.5 uppercase tracking-widest font-semibold">{formData.mapel} — KURIKULUM MERDEKA</p>
                      </div>

                      {/* Student Info Card Grid */}
                      <div className="grid grid-cols-2 gap-y-2.5 gap-x-6 text-xs md:text-sm text-slate-800">
                        <div className="flex items-center gap-1">
                          <span className="font-bold w-28 text-slate-700 shrink-0">Nama Siswa :</span>
                          <span className="border-b border-dotted border-slate-400 flex-1 h-5"></span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-bold w-28 text-slate-700 shrink-0">Hari / Tanggal :</span>
                          <span className="border-b border-dotted border-slate-400 flex-1 h-5"></span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-bold w-28 text-slate-700 shrink-0">Fase / Kelas :</span>
                          <span className="border-b border-dotted border-slate-400 flex-1 text-indigo-900 font-semibold">{modulData.identitas.faseKelas}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-bold w-28 text-slate-700 shrink-0">Kelompok :</span>
                          <span className="border-b border-dotted border-slate-400 flex-1 h-5"></span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-bold w-28 text-slate-700 shrink-0">Sekolah :</span>
                          <span className="border-b border-dotted border-slate-400 flex-1">{modulData.identitas.instansi}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-bold w-28 text-slate-700 shrink-0">Nilai / Paraf :</span>
                          <span className="border-b border-dotted border-slate-400 flex-1 h-5"></span>
                        </div>
                      </div>
                    </div>

                    {/* LKPD CONTENT BODY */}
                    <div className="space-y-5">
                      <div className="flex items-center gap-2 border-b-2 border-indigo-900 pb-1 mt-6">
                        <FileText className="w-5 h-5 text-indigo-900 shrink-0" />
                        <h2 className="text-base font-black text-indigo-900 m-0 uppercase">
                          <input 
                            type="text" 
                            value={modulData.lkpd[activeLkpdIndex]?.judul || `LKPD Pertemuan ${activeLkpdIndex + 1}`} 
                            onChange={(e) => {
                              const list = [...modulData.lkpd];
                              list[activeLkpdIndex].judul = e.target.value;
                              setModulData({...modulData, lkpd: list});
                            }}
                            className="w-full bg-transparent border-none font-bold text-indigo-900 focus:ring-1 focus:ring-indigo-500 rounded p-1 text-sm md:text-base"
                          />
                        </h2>
                      </div>

                      {/* A. TUJUAN BELAJAR */}
                      <div className="space-y-1">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-900 bg-slate-100 p-1.5 rounded m-0">A. Tujuan Belajar</h3>
                        <textarea
                          rows={2}
                          value={modulData.lkpd[activeLkpdIndex]?.tujuan || ""}
                          onChange={(e) => {
                            const list = [...modulData.lkpd];
                            list[activeLkpdIndex].tujuan = e.target.value;
                            setModulData({...modulData, lkpd: list});
                          }}
                          className="w-full bg-transparent border-none focus:ring-1 focus:ring-indigo-500 text-slate-700 p-1 text-xs md:text-sm resize-none mt-1"
                        />
                      </div>

                      {/* B. ALAT & BAHAN */}
                      <div className="space-y-1.5">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-900 bg-slate-100 p-1.5 rounded m-0">B. Alat dan Bahan Pendukung</h3>
                        <ul className="list-disc pl-5 text-slate-700 text-xs md:text-sm space-y-1">
                          {(modulData.lkpd[activeLkpdIndex]?.alatBahan || []).map((ab: string, idx: number) => (
                            <li key={idx}>
                              <input 
                                type="text" 
                                value={ab} 
                                onChange={(e) => {
                                  const steps = [...modulData.lkpd[activeLkpdIndex].alatBahan];
                                  steps[idx] = e.target.value;
                                  const list = [...modulData.lkpd];
                                  list[activeLkpdIndex].alatBahan = steps;
                                  setModulData({...modulData, lkpd: list});
                                }}
                                className="w-full bg-transparent border-none focus:ring-1 focus:ring-indigo-500 rounded p-0.5 text-xs"
                              />
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* C. PETUNJUK PENGERJAAN */}
                      <div className="space-y-1.5">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-900 bg-slate-100 p-1.5 rounded m-0">C. Petunjuk Pengerjaan Tugas</h3>
                        <ol className="list-decimal pl-5 text-slate-700 text-xs md:text-sm space-y-1">
                          {(modulData.lkpd[activeLkpdIndex]?.petunjuk || []).map((pt: string, idx: number) => (
                            <li key={idx}>
                              <input 
                                type="text" 
                                value={pt} 
                                onChange={(e) => {
                                  const steps = [...modulData.lkpd[activeLkpdIndex].petunjuk];
                                  steps[idx] = e.target.value;
                                  const list = [...modulData.lkpd];
                                  list[activeLkpdIndex].petunjuk = steps;
                                  setModulData({...modulData, lkpd: list});
                                }}
                                className="w-full bg-transparent border-none focus:ring-1 focus:ring-indigo-500 rounded p-0.5 text-xs"
                              />
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* D. TUGAS / PERTANYAAN TANTANGAN */}
                      <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-900 bg-slate-100 p-1.5 rounded m-0">D. Kasus Dan Pertanyaan Eksploratif</h3>
                        
                        {/* Task 1 Container */}
                        <div className="border border-indigo-100 bg-indigo-50/20 p-4 rounded-xl space-y-2.5">
                          <strong className="text-indigo-900 text-xs block font-bold">Tantangan Studi Kasus 1:</strong>
                          <textarea
                            rows={3}
                            value={modulData.lkpd[activeLkpdIndex]?.tugas1 || ""}
                            onChange={(e) => {
                              const list = [...modulData.lkpd];
                              list[activeLkpdIndex].tugas1 = e.target.value;
                              setModulData({...modulData, lkpd: list});
                            }}
                            className="w-full bg-white border border-slate-200 focus:ring-1 focus:ring-indigo-500 rounded p-2 text-slate-800 text-xs md:text-sm resize-none"
                          />
                          <div className="mt-2.5">
                            <strong className="text-slate-500 text-[10px] uppercase block mb-1">Kolom Lembar Jawaban Siswa:</strong>
                            <div className="border border-dashed border-slate-300 bg-white rounded-xl min-h-[160px] flex items-center justify-center text-xs text-slate-400 font-sans italic p-4">
                              (Kolom coretan pengerjaan/diagram alur jawaban peserta didik...)
                            </div>
                          </div>
                        </div>

                        {/* Task 2 Container */}
                        <div className="border border-indigo-100 bg-indigo-50/20 p-4 rounded-xl space-y-2.5">
                          <strong className="text-indigo-900 text-xs block font-bold">Tantangan Analisis Logika 2:</strong>
                          <textarea
                            rows={3}
                            value={modulData.lkpd[activeLkpdIndex]?.tugas2 || ""}
                            onChange={(e) => {
                              const list = [...modulData.lkpd];
                              list[activeLkpdIndex].tugas2 = e.target.value;
                              setModulData({...modulData, lkpd: list});
                            }}
                            className="w-full bg-white border border-slate-200 focus:ring-1 focus:ring-indigo-500 rounded p-2 text-slate-800 text-xs md:text-sm resize-none"
                          />
                          <div className="mt-2.5">
                            <strong className="text-slate-500 text-[10px] uppercase block mb-1">Kolom Lembar Jawaban Siswa:</strong>
                            <div className="border border-dashed border-slate-300 bg-white rounded-xl min-h-[160px] flex items-center justify-center text-xs text-slate-400 font-sans italic p-4">
                              (Kolom coretan pengerjaan/diagram alur jawaban peserta didik...)
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. VIEW TAB: MATERI PRESENTASI */}
                {previewTab === 'presentasi' && (
                  <div className="space-y-6">
                    <div className="border-b-2 border-indigo-900 pb-1 mt-6">
                      <h3 className="text-sm font-bold text-indigo-900 m-0 uppercase">ALUR PRESENTASI PEMBELAJARAN (SLIDE DECK)</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full border border-slate-200 border-collapse text-xs md:text-sm text-slate-800">
                        <thead>
                          <tr className="bg-slate-100 text-slate-700">
                            <th className="border border-slate-200 p-2 text-center font-bold" width="8%">No</th>
                            <th className="border border-slate-200 p-2 text-left font-bold" width="22%">Judul Slide</th>
                            <th className="border border-slate-200 p-2 text-left font-bold" width="35%">Ringkasan Materi</th>
                            <th className="border border-slate-200 p-2 text-left font-bold" width="20%">Contoh Konkret</th>
                            <th className="border border-slate-200 p-2 text-left font-bold" width="15%">Poin Kunci</th>
                          </tr>
                        </thead>
                        <tbody>
                          {modulData.materiPresentasi.map((mp: any, idx: number) => (
                            <tr key={idx} className="border-b border-slate-200">
                              <td className="border border-slate-200 p-2 text-center font-bold">{mp.no}</td>
                              <td className="border border-slate-200 p-1 font-semibold">
                                <input 
                                  type="text" 
                                  value={mp.slide} 
                                  onChange={(e) => {
                                    const list = [...modulData.materiPresentasi];
                                    list[idx].slide = e.target.value;
                                    setModulData({...modulData, materiPresentasi: list});
                                  }}
                                  className="w-full bg-transparent border-none text-slate-850 font-bold p-1 text-xs"
                                />
                              </td>
                              <td className="border border-slate-200 p-1">
                                <textarea 
                                  rows={2}
                                  value={mp.ringkasan} 
                                  onChange={(e) => {
                                    const list = [...modulData.materiPresentasi];
                                    list[idx].ringkasan = e.target.value;
                                    setModulData({...modulData, materiPresentasi: list});
                                  }}
                                  className="w-full bg-transparent border-none text-slate-700 p-1 text-xs resize-none"
                                />
                              </td>
                              <td className="border border-slate-200 p-1">
                                <textarea 
                                  rows={2}
                                  value={mp.contoh} 
                                  onChange={(e) => {
                                    const list = [...modulData.materiPresentasi];
                                    list[idx].contoh = e.target.value;
                                    setModulData({...modulData, materiPresentasi: list});
                                  }}
                                  className="w-full bg-transparent border-none text-slate-700 p-1 text-xs resize-none"
                                />
                              </td>
                              <td className="border border-slate-200 p-1">
                                <input 
                                  type="text" 
                                  value={mp.poin} 
                                  onChange={(e) => {
                                    const list = [...modulData.materiPresentasi];
                                    list[idx].poin = e.target.value;
                                    setModulData({...modulData, materiPresentasi: list});
                                  }}
                                  className="w-full bg-transparent border-none text-slate-700 p-1 text-xs"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 4. VIEW TAB: RUBRIK PENILAIAN */}
                {previewTab === 'rubrik' && (
                  <div className="space-y-6">
                    <div className="border-b-2 border-indigo-900 pb-1 mt-6">
                      <h3 className="text-sm font-bold text-indigo-900 m-0 uppercase">RUBRIK KRITERIA KETUNTASAN TUJUAN PEMBELAJARAN (KKTP)</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full border border-slate-200 border-collapse text-xs text-slate-800">
                        <thead>
                          <tr className="bg-slate-100 text-slate-700">
                            <th className="border border-slate-200 p-2 text-left font-bold" width="18%">Kriteria Penilaian</th>
                            <th className="border border-slate-200 p-2 text-left font-bold" width="20.5%">Sangat Baik (Skor 4)</th>
                            <th className="border border-slate-200 p-2 text-left font-bold" width="20.5%">Baik (Skor 3)</th>
                            <th className="border border-slate-200 p-2 text-left font-bold" width="20.5%">Cukup (Skor 2)</th>
                            <th className="border border-slate-200 p-2 text-left font-bold" width="20.5%">Perlu Bimbingan (Skor 1)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {modulData.rubrikPenilaian.map((rp: any, idx: number) => (
                            <tr key={idx} className="border-b border-slate-200">
                              <td className="border border-slate-200 p-2 font-bold bg-slate-50">{rp.kriteria}</td>
                              <td className="border border-slate-200 p-1 text-slate-700">
                                <textarea 
                                  rows={3}
                                  value={rp.sangatBaik} 
                                  onChange={(e) => {
                                    const list = [...modulData.rubrikPenilaian];
                                    list[idx].sangatBaik = e.target.value;
                                    setModulData({...modulData, rubrikPenilaian: list});
                                  }}
                                  className="w-full bg-transparent border-none text-xs p-1 resize-none"
                                />
                              </td>
                              <td className="border border-slate-200 p-1 text-slate-700">
                                <textarea 
                                  rows={3}
                                  value={rp.baik} 
                                  onChange={(e) => {
                                    const list = [...modulData.rubrikPenilaian];
                                    list[idx].baik = e.target.value;
                                    setModulData({...modulData, rubrikPenilaian: list});
                                  }}
                                  className="w-full bg-transparent border-none text-xs p-1 resize-none"
                                />
                              </td>
                              <td className="border border-slate-200 p-1 text-slate-700">
                                <textarea 
                                  rows={3}
                                  value={rp.cukup} 
                                  onChange={(e) => {
                                    const list = [...modulData.rubrikPenilaian];
                                    list[idx].cukup = e.target.value;
                                    setModulData({...modulData, rubrikPenilaian: list});
                                  }}
                                  className="w-full bg-transparent border-none text-xs p-1 resize-none"
                                />
                              </td>
                              <td className="border border-slate-200 p-1 text-slate-700">
                                <textarea 
                                  rows={3}
                                  value={rp.perluBimbingan} 
                                  onChange={(e) => {
                                    const list = [...modulData.rubrikPenilaian];
                                    list[idx].perluBimbingan = e.target.value;
                                    setModulData({...modulData, rubrikPenilaian: list});
                                  }}
                                  className="w-full bg-transparent border-none text-xs p-1 resize-none"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

        </section>

      </main>

      {/* FOOTER */}
      <footer className="no-print bg-slate-950 border-t border-slate-800/80 text-center py-6 text-xs text-slate-500 mt-12">
        <p>© 2026 AI Modul Ajar Generator Kurikulum Merdeka. Hak Cipta Dilindungi.</p>
        <p className="mt-1 text-slate-600">Dikembangkan khusus untuk mendukung penyusunan RPP berbasis Deep Learning di Indonesia.</p>
      </footer>
    </div>
  );
}
