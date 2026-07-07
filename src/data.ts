import {
  UserProfile,
  WasteCategory,
  WasteReport,
  BankSampahLocation,
  PickupSchedule,
  RewardItem,
  EnvironmentalFact
} from './types';

// Default User Profiles based on selected Role
export const DEFAULT_PROFILES: { [key: string]: UserProfile } = {
  Masyarakat: {
    name: "Ahmad Fauzi",
    email: "ahmad.fauzi@solo.id",
    role: "Masyarakat",
    points: 2450,
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
    phone: "0812-3456-7890",
    address: "Jl. Slamet Riyadi No. 120, Keprabon, Surakarta",
    ecoRank: "Laskar Cempo Hijau",
    totalWasteSubmitted: 42.5,
    streak: 5,
    lastActiveDate: "2026-07-07"
  },
  Petugas: {
    name: "Budi Santoso",
    email: "budi.petugas@surakarta.go.id",
    role: "Petugas",
    points: 1200,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    phone: "0823-4567-8912",
    address: "Kantor Dinas Lingkungan Hidup Surakarta, Jebres",
    ecoRank: "Pahlawan Kebersihan Solo",
    totalWasteSubmitted: 1450,
    streak: 12,
    lastActiveDate: "2026-07-07"
  },
  BankSampah: {
    name: "Siti Rahmawati",
    email: "siti.rahma@banksampahsolo.id",
    role: "BankSampah",
    points: 850,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    phone: "0856-7890-1234",
    address: "Bank Sampah Sido Mukti, Mojosongo, Jebres, Surakarta",
    ecoRank: "Srikandi Eco Cempo",
    totalWasteSubmitted: 3240,
    streak: 3,
    lastActiveDate: "2026-07-07"
  }
};

// Surakarta Trash Sorting Guidelines
export const WASTE_CATEGORIES: WasteCategory[] = [
  {
    id: "organik",
    name: "Organic",
    indonesianName: "Organik",
    color: "#22c55e", // Emerald 500
    bgLight: "bg-emerald-50",
    icon: "Leaf",
    description: "Sampah yang mudah membusuk dan terurai secara alami. Dapat diolah menjadi pupuk kompos atau pakan maggot.",
    examples: ["Sisa makanan (nasi, sayur, lauk)", "Kulit buah & sayuran", "Daun-daun kering", "Ampas kopi & teh", "Cangkang telur"],
    tips: [
      "Tiriskan air dari sisa makanan sebelum dibuang.",
      "Pisahkan dari kantong plastik pembungkusnya.",
      "Manfaatkan sebagai kompos rumah tangga menggunakan komposter mini."
    ]
  },
  {
    id: "anorganik",
    name: "Inorganic",
    indonesianName: "Anorganik",
    color: "#3b82f6", // Blue 500
    bgLight: "bg-blue-50",
    icon: "Layers",
    description: "Sampah yang tidak mudah terurai secara alami dan memerlukan waktu ratusan tahun. Sangat cocok disetor ke Bank Sampah untuk didaur ulang.",
    examples: ["Botol plastik & kemasan plastik", "Kertas, karton, & kardus", "Kaleng minuman & logam", "Botol kaca & gelas kaca", "Kemasan sachet (multilayer)"],
    tips: [
      "Bilas botol dan kaleng dari sisa cairan.",
      "Pipihkan botol plastik dan kardus untuk menghemat ruang penyimpanan.",
      "Kelompokkan berdasarkan jenisnya (plastik, kertas, logam) sebelum disetor."
    ]
  },
  {
    id: "b3",
    name: "B3 (Hazardous)",
    indonesianName: "Bahan Berbahaya & Beracun",
    color: "#ef4444", // Red 500
    bgLight: "bg-red-50",
    icon: "Skull",
    description: "Sampah sisa proses industri atau rumah tangga yang mengandung zat berbahaya yang dapat merusak lingkungan dan membahayakan kesehatan.",
    examples: ["Baterai bekas", "Lampu neon & bohlam", "Botol obat nyamuk & pembasmi serangga", "Wadah bekas deterjen / pembersih", "Termometer merkuri"],
    tips: [
      "Jangan campur sampah B3 dengan sampah harian lainnya.",
      "Simpan dalam wadah tertutup dan jauhkan dari jangkauan anak-anak.",
      "Serahkan ke pos penampungan sampah B3 resmi atau TPS khusus."
    ]
  },
  {
    id: "elektronik",
    name: "Electronic Waste",
    indonesianName: "E-Waste / Elektronik",
    color: "#eab308", // Yellow 500
    bgLight: "bg-yellow-50",
    icon: "Cpu",
    description: "Sampah dari peralatan listrik dan elektronik yang rusak atau usang. Mengandung logam mulia dan juga logam berat berbahaya.",
    examples: ["Handphone & charger bekas", "Kabel-kabel listrik", "Komponen komputer / laptop", "Kipas angin & rice cooker rusak", "Kamera & mainan elektronik"],
    tips: [
      "Keluarkan baterai dari dalam perangkat sebelum dibuang.",
      "Jangan membakar atau membongkar paksa komponen sirkuit elektronik.",
      "Setorkan ke Bank Sampah yang terafiliasi dengan pengolah e-waste bersertifikasi."
    ]
  }
];

// Bank Sampah & TPS in Surakarta (with relative X, Y coordinate for mockup map)
export const BANK_SAMPAH_LOCATIONS: BankSampahLocation[] = [
  {
    id: "loc-tpa",
    name: "TPA Putri Cempo (Pusat Pengolahan)",
    type: "TPA",
    address: "Jl. Mojosongo Utara, Jebres, Surakarta",
    distance: "5.8 km",
    hours: "06:00 - 18:00 WIB",
    phone: "(0271) 646123",
    acceptedTypes: ["Organik", "Anorganik", "B3", "Elektronik"],
    rates: { "Organik": 5, "Anorganik": 10, "B3": 0, "Elektronik": 20 },
    coordinates: { x: 82, y: 18 } // Top right in Jebres
  },
  {
    id: "loc-bs-1",
    name: "Bank Sampah Sido Mukti Mojo",
    type: "Bank Sampah",
    address: "Jl. Kyai Mojo No. 45, Semanggi, Pasar Kliwon",
    distance: "2.1 km",
    hours: "08:00 - 15:00 WIB (Selasa & Sabtu)",
    phone: "0812-7777-8888",
    acceptedTypes: ["Anorganik", "Elektronik"],
    rates: { "Plastik PET": 150, "Kertas HVS": 100, "Kardus": 120, "Aluminium": 300, "E-Waste": 250 },
    coordinates: { x: 68, y: 76 } // Bottom right
  },
  {
    id: "loc-bs-2",
    name: "Bank Sampah Hijau Lestari Laweyan",
    type: "Bank Sampah",
    address: "Jl. Dr. Radjiman No. 340, Penumping, Laweyan",
    distance: "1.5 km",
    hours: "09:00 - 16:00 WIB (Senin - Jumat)",
    phone: "0857-4444-5555",
    acceptedTypes: ["Organik", "Anorganik"],
    rates: { "Minyak Jelantah": 200, "Plastik Campur": 80, "Kertas Koran": 90, "Logam Besi": 180 },
    coordinates: { x: 22, y: 55 } // Mid left
  },
  {
    id: "loc-bs-3",
    name: "Bank Sampah Resik Banjarsari",
    type: "Bank Sampah",
    address: "Jl. Monginsidi No. 82, Gilingan, Banjarsari",
    distance: "3.2 km",
    hours: "08:00 - 14:00 WIB (Setiap Hari)",
    phone: "0821-3333-2222",
    acceptedTypes: ["Anorganik", "Elektronik", "B3"],
    rates: { "Tembaga": 500, "Botol Kaca": 50, "Aki Bekas": 400, "Kardus": 120 },
    coordinates: { x: 45, y: 38 } // Mid-top
  },
  {
    id: "loc-tps-1",
    name: "TPS Manahan Solo",
    type: "TPS",
    address: "Jl. Adi Sucipto, Manahan, Banjarsari, Surakarta",
    distance: "2.4 km",
    hours: "24 Jam",
    phone: "DLH Surakarta",
    acceptedTypes: ["Organik", "Anorganik"],
    rates: {},
    coordinates: { x: 30, y: 32 } // Mid-left top
  },
  {
    id: "loc-tps-2",
    name: "TPS Pasar Gede",
    type: "TPS",
    address: "Jl. Urip Sumoharjo, Sudiroprajan, Jebres, Surakarta",
    distance: "0.8 km",
    hours: "04:00 - 20:00 WIB",
    phone: "DLH Surakarta",
    acceptedTypes: ["Organik", "Anorganik"],
    rates: {},
    coordinates: { x: 58, y: 52 } // Center (near Pasar Gede)
  }
];

// Garbage Pickup Truck Schedules based on Surakarta Kecamatan
export const PICKUP_SCHEDULES: PickupSchedule[] = [
  {
    id: "sch-1",
    day: "Senin",
    kecamatan: "Pasar Kliwon",
    wasteType: "Anorganik & Kering",
    time: "08:00 - 10:00 WIB",
    officerName: "Subhan Efendi",
    officerVehicle: "Kaisar Roda 3 - AD 4531 ZA",
    status: "Akan Datang"
  },
  {
    id: "sch-2",
    day: "Senin",
    kecamatan: "Jebres",
    wasteType: "Organik & Basah",
    time: "06:30 - 08:30 WIB",
    officerName: "Margono",
    officerVehicle: "Truk Compactor - AD 9102 UA",
    status: "Selesai"
  },
  {
    id: "sch-3",
    day: "Selasa",
    kecamatan: "Banjarsari",
    wasteType: "Organik & Basah",
    time: "07:00 - 09:30 WIB",
    officerName: "Hendra Wijaya",
    officerVehicle: "Truk Compactor - AD 8112 XA",
    status: "Akan Datang"
  },
  {
    id: "sch-4",
    day: "Rabu",
    kecamatan: "Laweyan",
    wasteType: "Anorganik & Kering",
    time: "08:30 - 11:00 WIB",
    officerName: "Subhan Efendi",
    officerVehicle: "Kaisar Roda 3 - AD 4531 ZA",
    status: "Akan Datang"
  },
  {
    id: "sch-5",
    day: "Kamis",
    kecamatan: "Serengan",
    wasteType: "Organik & Basah",
    time: "06:30 - 09:00 WIB",
    officerName: "Margono",
    officerVehicle: "Truk Compactor - AD 9102 UA",
    status: "Akan Datang"
  },
  {
    id: "sch-6",
    day: "Jumat",
    kecamatan: "Jebres",
    wasteType: "Limbah B3 & Elektronik",
    time: "09:00 - 11:00 WIB",
    officerName: "Danang Prasetyo",
    officerVehicle: "Mobil Box B3 - AD 7720 EA",
    status: "Akan Datang"
  }
];

// Initial mock reports of waste piles
export const INITIAL_REPORTS: WasteReport[] = [
  {
    id: "rep-1",
    title: "Tumpukan Sampah Plastik di Belakang UNS",
    description: "Ada tumpukan sampah plastik dan sterofoam makanan berserakan di parit belakang kampus UNS Jebres, menyumbat aliran air.",
    locationName: "Jl. Ki Hajar Dewantara, Jebres, Surakarta",
    coordinates: { x: 74, y: 32 },
    imageUrl: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=300",
    status: "Selesai",
    date: "2026-06-28",
    reportedBy: "Ahmad Fauzi",
    wasteType: "Anorganik",
    officerName: "Budi Santoso",
    beforeImageUrl: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=300",
    afterImageUrl: "https://images.unsplash.com/photo-1595275312706-e822003666d7?auto=format&fit=crop&q=80&w=300",
    pointsAwarded: 150
  },
  {
    id: "rep-2",
    title: "Limbah Sayur Menumpuk di Pasar Gede",
    description: "Sisa dagangan sayur membusuk di sudut parkiran utara Pasar Gede menimbulkan bau tidak sedap dan dikerubuti lalat.",
    locationName: "Jl. Urip Sumoharjo (Samping Pasar Gede), Jebres",
    coordinates: { x: 58, y: 55 },
    imageUrl: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=300",
    status: "Diproses",
    date: "2026-07-01",
    reportedBy: "Ahmad Fauzi",
    wasteType: "Organik",
    officerName: "Margono",
    beforeImageUrl: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: "rep-3",
    title: "Sampah Kasur & Kayu Liar di Bantaran Kali Pepe",
    description: "Seseorang membuang kasur bekas dan tumpukan kayu lapuk di bantaran Kali Pepe dekat jembatan Pasar Gede.",
    locationName: "Bantaran Kali Pepe, Sudiroprajan, Jebres",
    coordinates: { x: 54, y: 48 },
    imageUrl: "https://images.unsplash.com/photo-1504438612444-b2d1ec5b9bb4?auto=format&fit=crop&q=80&w=300",
    status: "Diverifikasi",
    date: "2026-07-02",
    reportedBy: "Siti Rahmawati",
    wasteType: "Campuran"
  }
];

// Solo Pilah Points & Rewards Catalog
export const REWARD_ITEMS: RewardItem[] = [
  {
    id: "rew-1",
    title: "Tiket Gratis Batik Solo Trans (BST)",
    pointsCost: 300,
    category: "Transportasi",
    description: "1x perjalanan gratis keliling Solo menggunakan Bus Batik Solo Trans koridor mana saja.",
    imageUrl: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=300", // simulated Bus
    partner: "Dinas Perhubungan Surakarta"
  },
  {
    id: "rew-2",
    title: "Saldo ShopeePay Rp 25.000",
    pointsCost: 1000,
    category: "Voucher",
    description: "Voucher digital saldo ShopeePay senilai Rp 25.000 untuk belanja kebutuhan Anda.",
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=300",
    partner: "Shopee Indonesia"
  },
  {
    id: "rew-3",
    title: "1 Karung Pupuk Kompos Organik (5kg)",
    pointsCost: 500,
    category: "Kebutuhan",
    description: "Pupuk kompos berkualitas tinggi hasil pengolahan sampah organik di TPA Putri Cempo.",
    imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=300", // garden compost
    partner: "Pusat Kompos TPA Putri Cempo"
  },
  {
    id: "rew-4",
    title: "Saldo GoPay Rp 50.000",
    pointsCost: 1800,
    category: "Voucher",
    description: "Voucher digital GoPay senilai Rp 50.000 langsung cair ke nomor HP terdaftar.",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=300",
    partner: "GoTo Financial"
  },
  {
    id: "rew-5",
    title: "Eco-Friendly Totebag Canvas",
    pointsCost: 800,
    category: "Merchandise",
    description: "Tas belanja bahan kanvas tebal dengan ilustrasi pahlawan Solo Pilah. Mari kurangi plastik!",
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=300",
    partner: "Kreasi Pemuda Jebres"
  }
];

// Educational information & facts about TPA Putri Cempo
export const ENVIRONMENTAL_FACTS: EnvironmentalFact[] = [
  {
    id: "fact-1",
    title: "Krisis Sampah TPA Putri Cempo Solo",
    snippet: "TPA Putri Cempo di Mojosongo menerima 250 - 300 ton sampah per hari. Lahan yang terbatas memicu gunungan sampah setinggi 15 meter lebih.",
    fullText: "TPA Putri Cempo yang terletak di Blok Mojosongo, Kecamatan Jebres, Surakarta merupakan tempat pembuangan akhir utama bagi seluruh warga Solo. Dengan luas hanya sekitar 17 hektar, TPA ini telah mengalami kelebihan muatan (overcapacity) selama bertahun-tahun. Penumpukan ini memicu gas metana di lapisan dalam sampah yang rentan terbakar saat musim kemarau, seperti kebakaran hebat pada tahun 2023. Edukasi pemilahan sampah dari tingkat rumah tangga melalui aplikasi Solo Pilah adalah kunci utama menekan volume sampah harian hingga 40%!",
    imageUrl: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "fact-2",
    title: "PLTSa Putri Cempo: Solusi Energi Terbarukan",
    snippet: "Solo kini memiliki Pembangkit Listrik Tenaga Sampah (PLTSa) Putri Cempo untuk mengolah tumpukan sampah menjadi energi listrik.",
    fullText: "Pembangkit Listrik Tenaga Sampah (PLTSa) Putri Cempo memanfaatkan teknologi gasifikasi untuk mengolah sampah padat kota (MSW) menjadi gas sintetis (syngas) yang kemudian menggerakkan mesin generator listrik. PLTSa ini diproyeksikan mampu mengolah hingga 450 ton sampah per hari (baik sampah segar maupun tumpukan sampah lama) dan menghasilkan daya sekitar 8 Megawatt. Namun, efektivitas PLTSa ini sangat dipengaruhi oleh tingkat pemisahan sampah kering (anorganik) dan basah (organik). Pemilahan sampah di rumah membantu mesin bekerja maksimal!",
    imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "fact-3",
    title: "Mengapa Memilah Sampah dari Rumah Sangat Penting?",
    snippet: "Memilah sampah organik, anorganik, dan B3 dari rumah mengurangi beban penyortiran manual oleh para pemulung dan petugas kebersihan.",
    fullText: "Saat kita mencampur sampah makanan dengan plastik dan kertas, seluruh material tersebut menjadi kotor, berbau, dan kehilangan nilai daur ulangnya. Kertas yang basah terkena minyak kuah makanan tidak bisa didaur ulang lagi. Sampah organik yang terperangkap di dalam plastik juga membusuk secara anaerobik dan melepaskan gas metana, penyebab utama efek rumah kaca. Dengan memilah sampah Anda menjadi 4 wadah (Organik, Anorganik, B3, Elektronik), Anda telah berkontribusi langsung menyelamatkan bumi dan membantu kelangsungan hidup para petugas kebersihan Solo.",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400"
  }
];
