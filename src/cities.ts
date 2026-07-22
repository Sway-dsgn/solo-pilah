import {
  UserProfile,
  BankSampahLocation,
  PickupSchedule,
  WasteReport,
  RewardItem,
  EnvironmentalFact,
} from './types';

export interface CityData {
  id: string;
  name: string;
  shortName: string;
  appName: string;
  adminName: string;
  tpaName: string;
  transitName: string;
  transitAbbr: string;
  wasteDept: string;
  wasteDeptAbbr: string;
  emailDomain: string;
  description: string;
  slogan: string;
  coordinates: { x: number; y: number };
  districts: string[];
  subdistricts: Record<string, string[]>;
  defaultProfiles: {
    Masyarakat: Partial<UserProfile>;
    Petugas: Partial<UserProfile>;
    BankSampah: Partial<UserProfile>;
  };
  riverName: string;
  riverFlow: string;
  mapLandmarks: { name: string; x: number; y: number; label: string }[];
  mapStreets: { name: string; label: string; x: number; y: number; angle: number }[];
  gpsLandmarks: { name: string; x: number; y: number }[];
  eduSlides: { tag: string; title: string; desc: string; bg: string }[];
  bankSampah: BankSampahLocation[];
  schedules: PickupSchedule[];
  initialReports: WasteReport[];
  rewardItems: RewardItem[];
  environmentalFacts: EnvironmentalFact[];
}

const now = new Date();
const fmtDate = (d: Date) => d.toISOString().slice(0, 10);

export const CITIES: CityData[] = [
  {
    id: 'surakarta',
    name: 'Surakarta',
    shortName: 'Solo',
    appName: 'Solo Pilah',
    adminName: 'Kota Surakarta',
    tpaName: 'TPA Putri Cempo',
    transitName: 'Batik Solo Trans',
    transitAbbr: 'BST',
    wasteDept: 'Dinas Lingkungan Hidup',
    wasteDeptAbbr: 'DLH Surakarta',
    emailDomain: 'surakarta.go.id',
    description: 'Platform Kolaboratif Pengelolaan Sampah Solo Raya — 5 Kecamatan, 49 Kelurahan',
    slogan: 'Misi Solo Raya Bebas Sampah',
    coordinates: { x: 50, y: 50 },
    districts: ['Jebres', 'Banjarsari', 'Laweyan', 'Serengan', 'Pasar Kliwon'],
    subdistricts: {
      Jebres: ['Jebres', 'Pucangsawit', 'Jagalan', 'Purwodiningratan', 'Sudiroprajan', 'Mojosongo', 'Gandekan', 'Kepatihan Wetan', 'Kepatihan Kulon'],
      Banjarsari: ['Banjarsari', 'Kadipiro', 'Nusukan', 'Gilingan', 'Kestalan', 'Keprabon', 'Timuran', 'Ketelan', 'Punggawan', 'Mangkubumen', 'Manahan', 'Sumber', 'Kerten', 'Setabelan', 'Purbowardayan'],
      Laweyan: ['Pajang', 'Karangasem', 'Penumping', 'Sriwedari', 'Purwosari', 'Bumi', 'Laweyan', 'Sondakan', 'Semanggi', 'Jajar'],
      Serengan: ['Tipes', 'Serengan', 'Joyotakan', 'Danukusuman', 'Jayengan', 'Kratonan'],
      'Pasar Kliwon': ['Pasar Kliwon', 'Gajahan', 'Sangkrah', 'Kauman', 'Kedung Lumbu', 'Mojo', 'Baluwarti', 'Joyosuran', 'Semanggi'],
    },
    defaultProfiles: {
      Masyarakat: {
        name: 'Ahmad Fauzi',
        address: 'Jl. Slamet Riyadi No. 120, Keprabon, Surakarta',
        email: 'ahmad.fauzi@solo.id',
        ecoRank: 'Laskar Cempo Hijau',
        avatar: '',
      },
      Petugas: {
        name: 'Budi Santoso',
        address: 'Kantor DLH Surakarta, Jebres',
        email: 'budi.petugas@surakarta.go.id',
        ecoRank: 'Pahlawan Kebersihan Solo',
        avatar: '',
      },
      BankSampah: {
        name: 'Siti Rahmawati',
        address: 'Bank Sampah Sido Mukti, Mojosongo, Jebres, Surakarta',
        email: 'siti.rahma@banksampahsolo.id',
        ecoRank: 'Srikandi Eco Cempo',
        avatar: '',
      },
    },
    riverName: 'Bengawan Solo',
    riverFlow: 'Mengalir dari Timur ke Barat',
    mapLandmarks: [
      { name: 'manahan', label: 'Stadion Manahan', x: 30, y: 32 },
      { name: 'purwosari', label: 'Stasiun Purwosari', x: 10, y: 58 },
      { name: 'pasargede', label: 'Pasar Gede', x: 58, y: 52 },
      { name: 'tpa', label: 'TPA Putri Cempo', x: 82, y: 18 },
    ],
    mapStreets: [
      { name: 'jl_slamet_riyadi', label: 'Jl. Slamet Riyadi', x: 28, y: 58, angle: 0 },
      { name: 'jl_jenderal_sudirman', label: 'Jl. Jend. Sudirman', x: 55, y: 48, angle: 30 },
    ],
    gpsLandmarks: [
      { name: 'Jl. Ki Hajar Dewantara, Jebres, Surakarta', x: 74, y: 32 },
      { name: 'Jl. Slamet Riyadi No. 120, Samping Solo Grand Mall', x: 28, y: 58 },
      { name: 'Bantaran Kali Pepe, Sudiroprajan, Jebres', x: 54, y: 48 },
      { name: 'Sekitar Stadion Manahan, Banjarsari', x: 30, y: 32 },
    ],
    eduSlides: [
      {
        tag: 'PLTSa Putri Cempo',
        title: 'Listrik dari Sampah',
        desc: 'Sampah plastik kering warga Solo kini dikonversi menjadi energi listrik bersih di Solo Utara melalui PLTSa. Pilah plastik Anda dengan benar!',
        bg: 'bg-emerald-500',
        videoUrl: 'https://www.youtube.com/watch?v=jzILO0Hu6vY',
      },
      {
        tag: 'Pilah dari Rumah',
        title: 'Kurangi Beban TPA',
        desc: 'Pemisahan sampah organik & plastik dari dapur Anda menekan pembentukan gas metana pemicu kebakaran gunungan sampah di Mojosongo.',
        bg: 'bg-blue-500',
        videoUrl: 'https://www.youtube.com/watch?v=ciOopKzlfbQ',
      },
      {
        tag: 'Batik Solo Trans (BST)',
        title: 'Tukarkan Poin Anda!',
        desc: 'Kumpulkan CempoPoints Anda untuk ditukarkan dengan tiket transportasi umum BST gratis keliling Kota Solo.',
        bg: 'bg-purple-500',
        videoUrl: 'https://www.youtube.com/watch?v=roChLTNDp9g',
      },
    ],
    bankSampah: [
      {
        id: 'loc-tpa', name: 'TPA Putri Cempo (Pusat Pengolahan)', type: 'TPA',
        address: 'Jl. Mojosongo Utara, Jebres, Surakarta', distance: '5.8 km',
        hours: '06:00 - 18:00 WIB', phone: '(0271) 646123',
        acceptedTypes: ['Organik', 'Anorganik', 'B3', 'Elektronik'],
        rates: { Organik: 5, Anorganik: 10, B3: 0, Elektronik: 20 },
        coordinates: { x: 82, y: 18 },
      },
      {
        id: 'loc-bs-1', name: 'Bank Sampah Sido Mukti Mojo', type: 'Bank Sampah',
        address: 'Jl. Kyai Mojo No. 45, Semanggi, Pasar Kliwon', distance: '2.1 km',
        hours: '08:00 - 15:00 WIB (Selasa & Sabtu)', phone: '0812-7777-8888',
        acceptedTypes: ['Anorganik', 'Elektronik'],
        rates: { 'Plastik PET': 150, 'Kertas HVS': 100, Kardus: 120, Aluminium: 300, 'E-Waste': 250 },
        coordinates: { x: 68, y: 76 },
      },
      {
        id: 'loc-bs-2', name: 'Bank Sampah Hijau Lestari Laweyan', type: 'Bank Sampah',
        address: 'Jl. Dr. Radjiman No. 340, Penumping, Laweyan', distance: '1.5 km',
        hours: '09:00 - 16:00 WIB (Senin - Jumat)', phone: '0857-4444-5555',
        acceptedTypes: ['Organik', 'Anorganik'],
        rates: { 'Minyak Jelantah': 200, 'Plastik Campur': 80, 'Kertas Koran': 90, 'Logam Besi': 180 },
        coordinates: { x: 22, y: 55 },
      },
      {
        id: 'loc-bs-3', name: 'Bank Sampah Resik Banjarsari', type: 'Bank Sampah',
        address: 'Jl. Monginsidi No. 82, Gilingan, Banjarsari', distance: '3.2 km',
        hours: '08:00 - 14:00 WIB (Setiap Hari)', phone: '0821-3333-2222',
        acceptedTypes: ['Anorganik', 'Elektronik', 'B3'],
        rates: { Tembaga: 500, 'Botol Kaca': 50, 'Aki Bekas': 400, Kardus: 120 },
        coordinates: { x: 45, y: 38 },
      },
      {
        id: 'loc-tps-1', name: 'TPS Manahan Solo', type: 'TPS',
        address: 'Jl. Adi Sucipto, Manahan, Banjarsari, Surakarta', distance: '2.4 km',
        hours: '24 Jam', phone: 'DLH Surakarta',
        acceptedTypes: ['Organik', 'Anorganik'], rates: {},
        coordinates: { x: 30, y: 32 },
      },
      {
        id: 'loc-tps-2', name: 'TPS Pasar Gede', type: 'TPS',
        address: 'Jl. Urip Sumoharjo, Sudiroprajan, Jebres, Surakarta', distance: '0.8 km',
        hours: '04:00 - 20:00 WIB', phone: 'DLH Surakarta',
        acceptedTypes: ['Organik', 'Anorganik'], rates: {},
        coordinates: { x: 58, y: 52 },
      },
    ],
    schedules: [
      { id: 'sch-1', day: 'Senin', kecamatan: 'Pasar Kliwon', wasteType: 'Anorganik & Kering', time: '08:00 - 10:00 WIB', officerName: 'Subhan Efendi', officerVehicle: 'Kaisar Roda 3 - AD 4531 ZA', status: 'Akan Datang' },
      { id: 'sch-2', day: 'Senin', kecamatan: 'Jebres', wasteType: 'Organik & Basah', time: '06:30 - 08:30 WIB', officerName: 'Margono', officerVehicle: 'Truk Compactor - AD 9102 UA', status: 'Selesai' },
      { id: 'sch-3', day: 'Selasa', kecamatan: 'Banjarsari', wasteType: 'Organik & Basah', time: '07:00 - 09:30 WIB', officerName: 'Hendra Wijaya', officerVehicle: 'Truk Compactor - AD 8112 XA', status: 'Akan Datang' },
      { id: 'sch-4', day: 'Rabu', kecamatan: 'Laweyan', wasteType: 'Anorganik & Kering', time: '08:30 - 11:00 WIB', officerName: 'Subhan Efendi', officerVehicle: 'Kaisar Roda 3 - AD 4531 ZA', status: 'Akan Datang' },
      { id: 'sch-5', day: 'Kamis', kecamatan: 'Serengan', wasteType: 'Organik & Basah', time: '06:30 - 09:00 WIB', officerName: 'Margono', officerVehicle: 'Truk Compactor - AD 9102 UA', status: 'Akan Datang' },
      { id: 'sch-6', day: 'Jumat', kecamatan: 'Jebres', wasteType: 'Limbah B3 & Elektronik', time: '09:00 - 11:00 WIB', officerName: 'Danang Prasetyo', officerVehicle: 'Mobil Box B3 - AD 7720 EA', status: 'Akan Datang' },
    ],
    initialReports: [
      {
        id: 'rep-1', title: 'Tumpukan Sampah Plastik di Belakang UNS',
        description: 'Ada tumpukan sampah plastik dan sterofoam makanan berserakan di parit belakang kampus UNS Jebres, menyumbat aliran air.',
        locationName: 'Jl. Ki Hajar Dewantara, Jebres, Surakarta', coordinates: { x: 74, y: 32 },
        imageUrl: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=300', status: 'Selesai', date: fmtDate(new Date(now.getTime() - 7 * 86400000)),
        reportedBy: 'Ahmad Fauzi', wasteType: 'Anorganik', officerName: 'Budi Santoso',
        pointsAwarded: 150,
      },
      {
        id: 'rep-2', title: 'Limbah Sayur Menumpuk di Pasar Gede',
        description: 'Sisa dagangan sayur membusuk di sudut parkiran utara Pasar Gede menimbulkan bau tidak sedap.',
        locationName: 'Jl. Urip Sumoharjo (Samping Pasar Gede), Jebres', coordinates: { x: 58, y: 55 },
        imageUrl: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&q=80&w=300', status: 'Diproses', date: fmtDate(new Date(now.getTime() - 4 * 86400000)),
        reportedBy: 'Ahmad Fauzi', wasteType: 'Organik', officerName: 'Margono',
      },
      {
        id: 'rep-3', title: 'Sampah Kasur & Kayu Liar di Bantaran Kali Pepe',
        description: 'Kasur bekas dan tumpukan kayu lapuk di bantaran Kali Pepe dekat jembatan Pasar Gede.',
        locationName: 'Bantaran Kali Pepe, Sudiroprajan, Jebres', coordinates: { x: 54, y: 48 },
        imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=300', status: 'Diverifikasi', date: fmtDate(new Date(now.getTime() - 2 * 86400000)),
        reportedBy: 'Siti Rahmawati', wasteType: 'Campuran',
      },
    ],
    rewardItems: [
      {
        id: 'rew-1', title: `Tiket Gratis ${'Batik Solo Trans (BST)'}`, pointsCost: 300,
        category: 'Transportasi', description: '1x perjalanan gratis keliling Solo menggunakan Bus Batik Solo Trans.',
        imageUrl: '/images/reward1.jpg',
        partner: 'Dinas Perhubungan Surakarta',
      },
      {
        id: 'rew-2', title: 'Saldo Digital Rp 25.000', pointsCost: 1000,
        category: 'Voucher', description: 'Voucher saldo digital (ShopeePay / GoPay) senilai Rp 25.000.',
        imageUrl: '/images/reward2.jpg',
        partner: 'Solo Pilah',
      },
      {
        id: 'rew-3', title: '1 Karung Pupuk Kompos Organik (5kg)', pointsCost: 500,
        category: 'Kebutuhan', description: 'Pupuk kompos berkualitas hasil pengolahan sampah organik.',
        imageUrl: 'https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&q=80&w=300',
        partner: 'Pusat Kompos TPA Putri Cempo',
      },
      {
        id: 'rew-5', title: 'Eco-Friendly Totebag Canvas', pointsCost: 800,
        category: 'Merchandise', description: 'Tas belanja kanvas tebal. Kurangi plastik!',
        imageUrl: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=300',
        partner: 'Kreasi Pemuda Jebres',
      },
      {
        id: 'rew-6', title: 'Voucher Makan Siang Rp 15.000', pointsCost: 600,
        category: 'Voucher UMKM', description: 'Voucher makan siang di UMKM binaan DLH Surakarta.',
        imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=300',
        partner: 'UMKM Binaan DLH Surakarta',
      },
    ],
    environmentalFacts: [
      {
        id: 'fact-1', title: `Krisis Sampah ${'TPA Putri Cempo Solo'}`,
        snippet: `${'TPA Putri Cempo'} di Mojosongo menerima 250 - 300 ton sampah per hari.`,
        fullText: `${'TPA Putri Cempo'} yang terletak di Blok Mojosongo, Kecamatan Jebres, Surakarta merupakan tempat pembuangan akhir utama bagi seluruh warga Solo.`,
        imageUrl: '/images/fact1.jpg',
      },
      {
        id: 'fact-2', title: 'PLTSa Putri Cempo: Solusi Energi Terbarukan',
        snippet: 'Solo kini memiliki Pembangkit Listrik Tenaga Sampah (PLTSa) Putri Cempo.',
        fullText: 'Pembangkit Listrik Tenaga Sampah (PLTSa) Putri Cempo memanfaatkan teknologi gasifikasi untuk mengolah sampah padat kota menjadi energi listrik.',
        imageUrl: '/images/fact2.jpg',
      },
      {
        id: 'fact-3', title: 'Mengapa Memilah Sampah dari Rumah Sangat Penting?',
        snippet: 'Memilah sampah dari rumah mengurangi beban penyortiran manual oleh para pemulung.',
        fullText: 'Dengan memilah sampah Anda menjadi 4 wadah, Anda berkontribusi menyelamatkan bumi.',
        imageUrl: '/images/fact3.jpg',
      },
    ],
  },

  {
    id: 'bandung',
    name: 'Bandung',
    shortName: 'Bandung',
    appName: 'Bandung Pilah',
    adminName: 'Kota Bandung',
    tpaName: 'TPA Sarimukti',
    transitName: 'Trans Metro Bandung',
    transitAbbr: 'TMB',
    wasteDept: 'Dinas Lingkungan Hidup',
    wasteDeptAbbr: 'DLH Bandung',
    emailDomain: 'bandung.go.id',
    description: 'Platform Kolaboratif Pengelolaan Sampah Kota',
    slogan: 'Misi Bandung Bersih & Hijau',
    coordinates: { x: 50, y: 50 },
    districts: ['Bojongloa Kidul', 'Bojongloa Kaler', 'Cibeunying', 'Andir', 'Kiaracondong', 'Cicendo', 'Sukajadi'],
    subdistricts: {
      'Bojongloa Kidul': ['Cibaduyut', 'Cibaduyut Kidul', 'Cibaduyut Wetan', 'Kebon Lega', 'Mekarwangi', 'Situsaeur'],
      'Bojongloa Kaler': ['Bojongloa', 'Jamika', 'Kopo', 'Suka Asih', 'Babakan Tarogong'],
      'Cibeunying': ['Cibeunying', 'Cigadung', 'Cihapit', 'Cikutra', 'Dago', 'Lebakgede', 'Sukamulya', 'Sukamaju'],
      'Andir': ['Andir', 'Campaka', 'Garuda', 'Kebon Jeruk', 'Maleber', 'Melong'],
      'Kiaracondong': ['Cicaheum', 'Karang Pamulang', 'Kebon Jayanti', 'Kiaracondong', 'Sukapura'],
      'Cicendo': ['Arjuna', 'Cicendo', 'Husen Sastranegara', 'Pajajaran', 'Pasir Kaliki', 'Sukaraja'],
      'Sukajadi': ['Cipedes', 'Sukabungah', 'Sukajadi', 'Sukawarna'],
    },
    defaultProfiles: {
      Masyarakat: {
        name: 'Dewi Sartika',
        address: 'Jl. Merdeka No. 45, Cibeunying, Bandung',
        email: 'dewi.sartika@bandung.id',
        ecoRank: 'Pejuang Sarimukti',
        avatar: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&q=80&w=200',
      },
      Petugas: {
        name: 'Agus Hermawan',
        address: 'Kantor DLH Bandung, Jl. Aceh, Bandung',
        email: 'agus.hermawan@bandung.go.id',
        ecoRank: 'Pahlawan Kebersihan Bandung',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
      },
      BankSampah: {
        name: 'Rina Marlina',
        address: 'Bank Sampah Resik Bandung, Kiaracondong',
        email: 'rina.marlina@banksampahbandung.id',
        ecoRank: 'Srikandi Sarimukti',
        avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200',
      },
    },
    riverName: 'Sungai Cikapundung',
    riverFlow: 'Mengalir dari Utara ke Selatan',
    mapLandmarks: [
      { name: 'gasibu', label: 'Lapangan Gasibu', x: 40, y: 42 },
      { name: 'stasiun', label: 'Stasiun Bandung', x: 58, y: 55 },
      { name: 'ciwalk', label: 'Ciwalk', x: 32, y: 35 },
      { name: 'tpa', label: 'TPA Sarimukti', x: 18, y: 75 },
    ],
    mapStreets: [
      { name: 'jl_asia_afrika', label: 'Jl. Asia Afrika', x: 50, y: 55, angle: 0 },
      { name: 'jl_merdeka', label: 'Jl. Merdeka', x: 42, y: 48, angle: -10 },
    ],
    gpsLandmarks: [
      { name: 'Jl. Asia Afrika No. 120, Bandung', x: 50, y: 55 },
      { name: 'Jl. Merdeka No. 45, Cibeunying, Bandung', x: 40, y: 42 },
      { name: 'Bantaran Sungai Cikapundung, Braga', x: 48, y: 50 },
      { name: 'Sekitar Lapangan Gasibu, Bandung', x: 40, y: 40 },
    ],
    eduSlides: [
      {
        tag: 'TPA Sarimukti',
        title: 'Mengolah Sampah Bandung',
        desc: 'TPA Sarimukti menerima hingga 1500 ton sampah per hari dari seluruh Kota Bandung. Pilah sampah Anda untuk mengurangi beban.',
        bg: 'bg-emerald-500',
        videoUrl: 'https://www.youtube.com/watch?v=jzILO0Hu6vY',
      },
      {
        tag: 'Pilah dari Rumah',
        title: 'Kurangi Sampah ke TPA',
        desc: 'Pisahkan sampah organik dan anorganik dari rumah. Kurangi volume sampah yang harus diangkut ke Sarimukti.',
        bg: 'bg-blue-500',
        videoUrl: 'https://www.youtube.com/watch?v=ciOopKzlfbQ',
      },
      {
        tag: 'Trans Metro Bandung',
        title: 'Bike & Bus Gratis!',
        desc: 'Tukarkan poin Anda dengan tiket Trans Metro Bandung gratis. Naik bus keliling kota tanpa biaya!',
        bg: 'bg-purple-500',
        videoUrl: 'https://www.youtube.com/watch?v=roChLTNDp9g',
      },
    ],
    bankSampah: [
      {
        id: 'loc-tpa', name: 'TPA Sarimukti (Pusat Pengolahan)', type: 'TPA',
        address: 'Desa Sarimukti, Cipatat, Bandung Barat', distance: '25 km',
        hours: '06:00 - 18:00 WIB', phone: '(022) 123456',
        acceptedTypes: ['Organik', 'Anorganik', 'B3', 'Elektronik'],
        rates: { Organik: 5, Anorganik: 10, B3: 0, Elektronik: 20 },
        coordinates: { x: 18, y: 75 },
      },
      {
        id: 'loc-bs-1', name: 'Bank Sampah Induk Bandung', type: 'Bank Sampah',
        address: 'Jl. Aceh No. 55, Cicendo, Bandung', distance: '3 km',
        hours: '08:00 - 16:00 WIB (Senin - Sabtu)', phone: '0822-1111-2222',
        acceptedTypes: ['Anorganik', 'Elektronik'],
        rates: { 'Plastik PET': 150, 'Kertas HVS': 100, Kardus: 120, Aluminium: 300, 'E-Waste': 250 },
        coordinates: { x: 55, y: 50 },
      },
      {
        id: 'loc-bs-2', name: 'Bank Sampah Hijau Sukajadi', type: 'Bank Sampah',
        address: 'Jl. Sukajadi No. 200, Sukajadi, Bandung', distance: '2 km',
        hours: '09:00 - 15:00 WIB (Senin - Jumat)', phone: '0857-3333-4444',
        acceptedTypes: ['Organik', 'Anorganik'],
        rates: { 'Minyak Jelantah': 200, 'Plastik Campur': 80, 'Kertas Koran': 90, 'Logam Besi': 180 },
        coordinates: { x: 28, y: 30 },
      },
      {
        id: 'loc-bs-3', name: 'Bank Sampah Resik Andir', type: 'Bank Sampah',
        address: 'Jl. Andir No. 78, Andir, Bandung', distance: '4 km',
        hours: '08:00 - 14:00 WIB (Setiap Hari)', phone: '0821-5555-6666',
        acceptedTypes: ['Anorganik', 'Elektronik', 'B3'],
        rates: { Tembaga: 500, 'Botol Kaca': 50, 'Aki Bekas': 400, Kardus: 120 },
        coordinates: { x: 35, y: 45 },
      },
      {
        id: 'loc-tps-1', name: 'TPS Kebon Kelapa', type: 'TPS',
        address: 'Jl. Kebon Kelapa, Cicendo, Bandung', distance: '1.5 km',
        hours: '24 Jam', phone: 'DLH Bandung',
        acceptedTypes: ['Organik', 'Anorganik'], rates: {},
        coordinates: { x: 52, y: 48 },
      },
      {
        id: 'loc-tps-2', name: 'TPS Pasar Baru', type: 'TPS',
        address: 'Jl. Pasar Baru, Bandung', distance: '2 km',
        hours: '04:00 - 20:00 WIB', phone: 'DLH Bandung',
        acceptedTypes: ['Organik', 'Anorganik'], rates: {},
        coordinates: { x: 60, y: 52 },
      },
    ],
    schedules: [
      { id: 'sch-1', day: 'Senin', kecamatan: 'Bojongloa Kidul', wasteType: 'Anorganik & Kering', time: '07:00 - 09:00 WIB', officerName: 'Cecep Suryana', officerVehicle: 'Truck - D 1234 ABC', status: 'Akan Datang' },
      { id: 'sch-2', day: 'Senin', kecamatan: 'Cibeunying', wasteType: 'Organik & Basah', time: '06:00 - 08:00 WIB', officerName: 'Deden Saepul', officerVehicle: 'Compactor - D 5678 DEF', status: 'Selesai' },
      { id: 'sch-3', day: 'Selasa', kecamatan: 'Andir', wasteType: 'Organik & Basah', time: '07:00 - 09:30 WIB', officerName: 'Hendra Firmansyah', officerVehicle: 'Compactor - D 9012 GHI', status: 'Akan Datang' },
      { id: 'sch-4', day: 'Rabu', kecamatan: 'Kiaracondong', wasteType: 'Anorganik & Kering', time: '08:00 - 10:00 WIB', officerName: 'Cecep Suryana', officerVehicle: 'Truck - D 1234 ABC', status: 'Akan Datang' },
      { id: 'sch-5', day: 'Kamis', kecamatan: 'Cicendo', wasteType: 'Organik & Basah', time: '06:30 - 09:00 WIB', officerName: 'Deden Saepul', officerVehicle: 'Compactor - D 5678 DEF', status: 'Akan Datang' },
      { id: 'sch-6', day: 'Jumat', kecamatan: 'Sukajadi', wasteType: 'Limbah B3 & Elektronik', time: '09:00 - 11:00 WIB', officerName: 'Rudi Gunawan', officerVehicle: 'Mobil Box - D 3456 JKL', status: 'Akan Datang' },
    ],
    initialReports: [
      { id: 'rep-1', title: 'Tumpukan Sampah di Bantaran Cikapundung', description: 'Sampah rumah tangga menumpuk di bantaran Sungai Cikapundung, berpotensi banjir saat hujan.', locationName: 'Bantaran Cikapundung, Braga, Bandung', coordinates: { x: 48, y: 50 }, imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=300', status: 'Selesai', date: fmtDate(new Date(now.getTime() - 7 * 86400000)), reportedBy: 'Dewi Sartika', wasteType: 'Anorganik', officerName: 'Agus Hermawan', pointsAwarded: 150 },
      { id: 'rep-2', title: 'Sampah Pasar Menumpuk di Pasar Baru', description: 'Sisa sayur dan buah membusuk di area belakang Pasar Baru Bandung.', locationName: 'Jl. Pasar Baru, Bandung', coordinates: { x: 60, y: 52 }, imageUrl: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&q=80&w=300', status: 'Diproses', date: fmtDate(new Date(now.getTime() - 4 * 86400000)), reportedBy: 'Dewi Sartika', wasteType: 'Organik', officerName: 'Deden Saepul' },
      { id: 'rep-3', title: 'Pembuangan Liar di Tepi Jalan', description: 'Kasur bekas dan sampah besar dibuang liar di tepi Jalan Soekarno-Hatta.', locationName: 'Jl. Soekarno-Hatta, Kiaracondong', coordinates: { x: 65, y: 42 }, imageUrl: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=300', status: 'Diverifikasi', date: fmtDate(new Date(now.getTime() - 2 * 86400000)), reportedBy: 'Rina Marlina', wasteType: 'Campuran' },
    ],
    rewardItems: [
      { id: 'rew-1', title: `Tiket Gratis ${'Trans Metro Bandung (TMB)'}`, pointsCost: 300, category: 'Transportasi', description: '1x perjalanan gratis menggunakan Trans Metro Bandung koridor mana saja.', imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=300', partner: 'Dinas Perhubungan Bandung' },
      { id: 'rew-2', title: 'Saldo Digital Rp 25.000', pointsCost: 1000, category: 'Voucher', description: 'Voucher saldo digital (ShopeePay / GoPay) senilai Rp 25.000.', imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=300', partner: 'Solo Pilah' },
      { id: 'rew-3', title: '1 Karung Pupuk Kompos Organik (5kg)', pointsCost: 500, category: 'Kebutuhan', description: 'Pupuk kompos hasil pengolahan sampah organik Kota Bandung.', imageUrl: 'https://images.unsplash.com/photo-1584999734482-0361aecad844?auto=format&fit=crop&q=80&w=300', partner: 'Pusat Kompos TPA Sarimukti' },
      { id: 'rew-5', title: 'Eco-Friendly Totebag Canvas', pointsCost: 800, category: 'Merchandise', description: 'Tas belanja kanvas tebal dengan ilustrasi Bandung Pilah.', imageUrl: 'https://images.unsplash.com/photo-1584999734482-0361aecad844?auto=format&fit=crop&q=80&w=300', partner: 'Kreasi Pemuda Bandung' },
      { id: 'rew-6', title: 'Voucher Martabak Rp 20.000', pointsCost: 700, category: 'Voucher UMKM', description: 'Voucher martabak spesial di UMKM binaan DLH Bandung.', imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=300', partner: 'UMKM Binaan DLH Bandung' },
    ],
    environmentalFacts: [
      { id: 'fact-1', title: 'Krisis Sampah TPA Sarimukti', snippet: 'TPA Sarimukti menerima 1500 ton sampah per hari dari Kota Bandung.', fullText: 'TPA Sarimukti yang terletak di Cipatat, Bandung Barat, merupakan tempat pembuangan akhir utama bagi seluruh warga Bandung. Dengan kapasitas terbatas, edukasi pemilahan sampah dari rumah adalah kunci utama.', imageUrl: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=300' },
      { id: 'fact-2', title: 'PLTSa Bandung: Solusi Energi', snippet: 'Bandung tengah mengembangkan PLTSa untuk mengolah sampah menjadi listrik.', fullText: 'Pembangkit Listrik Tenaga Sampah direncanakan untuk mengurangi volume sampah dan menghasilkan energi bersih bagi kota Bandung.', imageUrl: 'https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&q=80&w=300' },
      { id: 'fact-3', title: 'Mengapa Memilah Sampah dari Rumah?', snippet: 'Memilah sampah dari rumah mengurangi beban penyortiran manual.', fullText: 'Dengan memilah sampah Anda, Anda berkontribusi menyelamatkan bumi dan membantu petugas kebersihan Bandung.', imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=300' },
    ],
  },

  {
    id: 'surabaya',
    name: 'Surabaya',
    shortName: 'Surabaya',
    appName: 'Surabaya Pilah',
    adminName: 'Kota Surabaya',
    tpaName: 'TPA Benowo',
    transitName: 'Trans Semanggi Surabaya',
    transitAbbr: 'TSS',
    wasteDept: 'Dinas Lingkungan Hidup',
    wasteDeptAbbr: 'DLH Surabaya',
    emailDomain: 'surabaya.go.id',
    description: 'Platform Kolaboratif Pengelolaan Sampah Kota',
    slogan: 'Misi Surabaya Bersih & Sehat',
    coordinates: { x: 50, y: 50 },
    districts: ['Gubeng', 'Tegalsari', 'Genteng', 'Bubutan', 'Simokerto', 'Sawahan', 'Wonokromo'],
    subdistricts: {
      'Gubeng': ['Gubeng', 'Kertajaya', 'Mojo', 'Pucang Sewu'],
      'Tegalsari': ['Keputran', 'Tegalsari', 'Dr. Sutomo', 'Kedungdoro'],
      'Genteng': ['Embong Kaliasin', 'Genteng', 'Kapasan', 'Ketabang', 'Peneleh'],
      'Bubutan': ['Alun-Alun Contong', 'Bubutan', 'Gundih', 'Jepara', 'Tembok Dukuh'],
      'Simokerto': ['Kapasan', 'Simokerto', 'Simolawang', 'Tambakrejo'],
      'Sawahan': ['Banyu Urip', 'Pakis', 'Putat Jaya', 'Sawahan'],
      'Wonokromo': ['Darmo', 'Jagir', 'Ngagel', 'Ngagel Rejo', 'Wonokromo'],
    },
    defaultProfiles: {
      Masyarakat: {
        name: 'Rudi Hartono',
        address: 'Jl. Tunjungan No. 50, Genteng, Surabaya',
        email: 'rudi.hartono@surabaya.id',
        ecoRank: 'Pejuang Benowo',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
      },
      Petugas: {
        name: 'Joko Susilo',
        address: 'Kantor DLH Surabaya, Jl. Jimerto, Surabaya',
        email: 'joko.susilo@surabaya.go.id',
        ecoRank: 'Pahlawan Kebersihan Surabaya',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      },
      BankSampah: {
        name: 'Maya Indah',
        address: 'Bank Sampah Surabaya Hijau, Gubeng',
        email: 'maya.indah@banksampahsurabaya.id',
        ecoRank: 'Srikandi Benowo',
        avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&q=80&w=200',
      },
    },
    riverName: 'Kali Mas',
    riverFlow: 'Mengalir dari Selatan ke Utara',
    mapLandmarks: [
      { name: 'tunjungan', label: 'Tunjungan Plaza', x: 48, y: 50 },
      { name: 'stasiun', label: 'Stasiun Gubeng', x: 55, y: 45 },
      { name: 'mangrove', label: 'Hutan Mangrove Wonorejo', x: 80, y: 65 },
      { name: 'tpa', label: 'TPA Benowo', x: 22, y: 80 },
    ],
    mapStreets: [
      { name: 'jl_tunjungan', label: 'Jl. Tunjungan', x: 48, y: 50, angle: 0 },
      { name: 'jl_kerajaan', label: 'Jl. Panglima Sudirman', x: 52, y: 48, angle: 15 },
    ],
    gpsLandmarks: [
      { name: 'Jl. Tunjungan No. 50, Genteng, Surabaya', x: 48, y: 50 },
      { name: 'Jl. Panglima Sudirman, Gubeng, Surabaya', x: 55, y: 45 },
      { name: 'Bantaran Kali Mas, Bubutan, Surabaya', x: 50, y: 55 },
      { name: 'Sekitar Tunjungan Plaza, Surabaya', x: 48, y: 48 },
    ],
    eduSlides: [
      {
        tag: 'TPA Benowo',
        title: 'Listrik dari Sampah',
        desc: 'TPA Benowo mengolah sampah warga Surabaya menjadi energi listrik melalui PLTSa. Pilah sampah Anda untuk membantu!',
        bg: 'bg-emerald-500',
        videoUrl: 'https://www.youtube.com/watch?v=jzILO0Hu6vY',
      },
      {
        tag: 'Pilah dari Rumah',
        title: 'Kurangi Beban TPA',
        desc: 'Pisahkan sampah organik dan anorganik dari dapur Anda. Kurangi volume sampah ke TPA Benowo.',
        bg: 'bg-blue-500',
        videoUrl: 'https://www.youtube.com/watch?v=ciOopKzlfbQ',
      },
      {
        tag: 'Trans Semanggi',
        title: 'Jalan-jalan Gratis!',
        desc: 'Tukarkan poin Anda untuk tiket bus Trans Semanggi Surabaya gratis.',
        bg: 'bg-purple-500',
        videoUrl: 'https://www.youtube.com/watch?v=roChLTNDp9g',
      },
    ],
    bankSampah: [
      {
        id: 'loc-tpa', name: 'TPA Benowo (Pusat Pengolahan)', type: 'TPA',
        address: 'Jl. Benowo, Surabaya Barat', distance: '15 km',
        hours: '06:00 - 18:00 WIB', phone: '(031) 789012',
        acceptedTypes: ['Organik', 'Anorganik', 'B3', 'Elektronik'],
        rates: { Organik: 5, Anorganik: 10, B3: 0, Elektronik: 20 },
        coordinates: { x: 22, y: 80 },
      },
    ],
    schedules: [
      { id: 'sch-1', day: 'Senin', kecamatan: 'Gubeng', wasteType: 'Anorganik & Kering', time: '07:00 - 09:00 WIB', officerName: 'Slamet Riyadi', officerVehicle: 'Truck - L 1234 AB', status: 'Akan Datang' },
      { id: 'sch-2', day: 'Senin', kecamatan: 'Genteng', wasteType: 'Organik & Basah', time: '06:00 - 08:00 WIB', officerName: 'Suparno', officerVehicle: 'Compactor - L 5678 CD', status: 'Selesai' },
      { id: 'sch-3', day: 'Selasa', kecamatan: 'Tegalsari', wasteType: 'Organik & Basah', time: '07:00 - 09:00 WIB', officerName: 'Hendra', officerVehicle: 'Compactor - L 9012 EF', status: 'Akan Datang' },
      { id: 'sch-4', day: 'Rabu', kecamatan: 'Bubutan', wasteType: 'Anorganik & Kering', time: '08:00 - 10:00 WIB', officerName: 'Slamet Riyadi', officerVehicle: 'Truck - L 1234 AB', status: 'Akan Datang' },
      { id: 'sch-5', day: 'Kamis', kecamatan: 'Sawahan', wasteType: 'Organik & Basah', time: '06:30 - 09:00 WIB', officerName: 'Suparno', officerVehicle: 'Compactor - L 5678 CD', status: 'Akan Datang' },
      { id: 'sch-6', day: 'Jumat', kecamatan: 'Simokerto', wasteType: 'Limbah B3 & Elektronik', time: '09:00 - 11:00 WIB', officerName: 'Bambang', officerVehicle: 'Mobil Box - L 3456 GH', status: 'Akan Datang' },
    ],
    initialReports: [
      { id: 'rep-1', title: 'Sampah Plastik di Pinggir Kali Mas', description: 'Sampah plastik menumpuk di pinggir Kali Mas, menghambat aliran air.', locationName: 'Bantaran Kali Mas, Bubutan, Surabaya', coordinates: { x: 50, y: 55 }, imageUrl: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=300', status: 'Selesai', date: fmtDate(new Date(now.getTime() - 7 * 86400000)), reportedBy: 'Rudi Hartono', wasteType: 'Anorganik', officerName: 'Joko Susilo', pointsAwarded: 150 },
      { id: 'rep-2', title: 'Limbah Pasar di Pasar Genteng', description: 'Sisa dagangan membusuk di area Pasar Genteng.', locationName: 'Pasar Genteng, Surabaya', coordinates: { x: 50, y: 52 }, imageUrl: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&q=80&w=300', status: 'Diproses', date: fmtDate(new Date(now.getTime() - 4 * 86400000)), reportedBy: 'Rudi Hartono', wasteType: 'Organik', officerName: 'Suparno' },
      { id: 'rep-3', title: 'Pembuangan Liar di Wonokromo', description: 'Sampah besar dibuang liar di pinggir jalan Wonokromo.', locationName: 'Jl. Wonokromo, Surabaya', coordinates: { x: 58, y: 60 }, imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=300', status: 'Diverifikasi', date: fmtDate(new Date(now.getTime() - 2 * 86400000)), reportedBy: 'Maya Indah', wasteType: 'Campuran' },
    ],
    rewardItems: [
      { id: 'rew-1', title: `Tiket Gratis ${'Trans Semanggi Surabaya (TSS)'}`, pointsCost: 300, category: 'Transportasi', description: '1x perjalanan gratis naik Trans Semanggi Surabaya.', imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=300', partner: 'Dinas Perhubungan Surabaya' },
      { id: 'rew-2', title: 'Saldo Digital Rp 25.000', pointsCost: 1000, category: 'Voucher', description: 'Voucher saldo digital (ShopeePay / GoPay) senilai Rp 25.000.', imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=300', partner: 'Solo Pilah' },
      { id: 'rew-3', title: '1 Karung Pupuk Kompos (5kg)', pointsCost: 500, category: 'Kebutuhan', description: 'Pupuk kompos hasil pengolahan sampah organik TPA Benowo.', imageUrl: 'https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&q=80&w=300', partner: 'Pusat Kompos TPA Benowo' },
      { id: 'rew-5', title: 'Eco-Friendly Totebag Canvas', pointsCost: 800, category: 'Merchandise', description: 'Tas belanja kanvas tebal dengan ilustrasi Surabaya Pilah.', imageUrl: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=300', partner: 'Kreasi Pemuda Surabaya' },
      { id: 'rew-6', title: 'Voucher Rujak Cingur Rp 15.000', pointsCost: 600, category: 'Voucher UMKM', description: 'Voucher rujak cingur di UMKM binaan DLH Surabaya.', imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=300', partner: 'UMKM Binaan DLH Surabaya' },
    ],
    environmentalFacts: [
      { id: 'fact-1', title: 'Krisis Sampah TPA Benowo', snippet: 'TPA Benowo menerima 1000+ ton sampah per hari dari Surabaya.', fullText: 'TPA Benowo memanfaatkan teknologi PLTSa untuk mengolah sampah menjadi listrik. Edukasi pemilahan dari rumah adalah kunci.', imageUrl: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=300' },
      { id: 'fact-2', title: 'PLTSa Benowo: Energi Bersih', snippet: 'PLTSa Benowo mengubah sampah menjadi listrik untuk warga Surabaya.', fullText: 'Pembangkit Listrik Tenaga Sampah Benowo memanfaatkan gas metana dari gunungan sampah untuk menghasilkan listrik.', imageUrl: 'https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&q=80&w=300' },
      { id: 'fact-3', title: 'Mengapa Memilah Sampah?', snippet: 'Memilah sampah dari rumah mengurangi beban TPA Benowo.', fullText: 'Dengan memilah sampah Anda, Anda berkontribusi pada Surabaya yang lebih bersih dan sehat.', imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=300' },
    ],
  },
];

export function getCity(cityId: string): CityData {
  return CITIES.find(c => c.id === cityId) || CITIES[0];
}

export function generateProfiles(city: CityData): { Masyarakat: UserProfile; Petugas: UserProfile; BankSampah: UserProfile } {
  return {
    Masyarakat: {
      name: city.defaultProfiles.Masyarakat.name || '',
      email: city.defaultProfiles.Masyarakat.email || '',
      address: city.defaultProfiles.Masyarakat.address || '',
      ecoRank: city.defaultProfiles.Masyarakat.ecoRank || '',
      role: 'Masyarakat', points: 2450, avatar: city.defaultProfiles.Masyarakat.avatar || '', phone: '0812-3456-7890',
      totalWasteSubmitted: 42.5, streak: 5, lastActiveDate: new Date().toISOString().split('T')[0],
    },
    Petugas: {
      name: city.defaultProfiles.Petugas.name || '',
      email: city.defaultProfiles.Petugas.email || '',
      address: city.defaultProfiles.Petugas.address || '',
      ecoRank: city.defaultProfiles.Petugas.ecoRank || '',
      role: 'Petugas', points: 1200, avatar: city.defaultProfiles.Petugas.avatar || '', phone: '0823-4567-8912',
      totalWasteSubmitted: 1450, streak: 12, lastActiveDate: new Date().toISOString().split('T')[0],
    },
    BankSampah: {
      name: city.defaultProfiles.BankSampah.name || '',
      email: city.defaultProfiles.BankSampah.email || '',
      address: city.defaultProfiles.BankSampah.address || '',
      ecoRank: city.defaultProfiles.BankSampah.ecoRank || '',
      role: 'BankSampah', points: 850, avatar: city.defaultProfiles.BankSampah.avatar || '', phone: '0856-7890-1234',
      totalWasteSubmitted: 3240, streak: 3, lastActiveDate: new Date().toISOString().split('T')[0],
    },
  };
}
