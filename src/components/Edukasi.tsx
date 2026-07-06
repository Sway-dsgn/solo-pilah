import React, { useState } from 'react';
import { BookOpen, ChevronLeft, ChevronRight, Sparkles, Info, Globe, Leaf, Award, ArrowRight, Play, FileText, X, ExternalLink } from 'lucide-react';

interface EdukasiProps {
  isWireframe: boolean;
  city: any;
  onClose: () => void;
}

export default function Edukasi({ isWireframe, city, onClose }: EdukasiProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerSlide, setViewerSlide] = useState<any>(null);
  const [mediaTab, setMediaTab] = useState<'teks' | 'video'>('teks');
  const [selectedFact, setSelectedFact] = useState<any>(null);

  const slides = city.eduSlides;

  const unsplashImages = [
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=400',
  ];

  const facts = city.environmentalFacts || [];

  const getVideoId = (url?: string) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return match ? match[1] : null;
  };

  const openViewer = (slide: any) => {
    setViewerSlide(slide);
    setMediaTab(slide.videoUrl ? 'video' : 'teks');
    setViewerOpen(true);
  };

  return (
    <div className={`flex-1 flex flex-col phone-scroll overflow-y-auto ${isWireframe ? 'bg-white text-gray-800' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`p-4 shrink-0 bg-white border-b flex items-center justify-between ${
        isWireframe ? 'border-gray-300' : 'border-gray-100'
      }`}>
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${isWireframe ? 'bg-gray-100 border border-gray-300' : 'bg-emerald-50'}`}>
            <BookOpen className={`w-4 h-4 ${isWireframe ? 'text-gray-800' : 'text-emerald-600'}`} />
          </div>
          <div>
            <h2 className="text-sm font-extrabold font-display text-gray-800 leading-none">Edukasi Lingkungan</h2>
            <span className="text-[9px] text-gray-400">{city.shortName}</span>
          </div>
        </div>
        <button onClick={onClose}
          className={`p-1.5 rounded-lg transition-all cursor-pointer ${
            isWireframe ? 'hover:bg-gray-100 text-gray-500' : 'hover:bg-gray-100 text-gray-400'
          }`}>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 space-y-5 flex-1">
        {/* Featured Slide - Large Card */}
        <div className="space-y-2">
          <h4 className="text-[9.5px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1 px-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Sedang Disorot
          </h4>

          <div onClick={() => openViewer(slides[slideIndex])}
            className={`p-5 rounded-2xl relative overflow-hidden border cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] ${
              isWireframe
                ? 'border-2 border-gray-800 bg-white text-gray-800'
                : `bg-gradient-to-br ${slides[slideIndex]?.bg === 'bg-emerald-500' ? 'from-emerald-600 to-teal-700' : slides[slideIndex]?.bg === 'bg-blue-500' ? 'from-blue-600 to-indigo-700' : 'from-purple-600 to-violet-700'} text-white border-transparent`
            }`}>
            {!isWireframe && (
              <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 bg-cover bg-center mix-blend-overlay rounded-r-2xl"
                style={{ backgroundImage: `url(${unsplashImages[slideIndex % unsplashImages.length]})` }} />
            )}

            <div className="relative z-10 space-y-3 max-w-[80%]">
              <span className={`inline-block text-[8px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                isWireframe ? 'bg-gray-200 text-gray-800' : 'bg-white/20 text-white'
              }`}>
                {slides[slideIndex]?.tag}
              </span>
              <h3 className="text-base font-black font-display tracking-tight leading-tight">
                {slides[slideIndex]?.title}
              </h3>
              <p className={`text-[10px] leading-relaxed line-clamp-2 ${isWireframe ? 'text-gray-500' : 'text-white/90'}`}>
                {slides[slideIndex]?.desc}
              </p>
              <span className="inline-flex items-center gap-1 text-[8px] font-bold bg-white/20 px-2 py-1 rounded-lg">
                <Play className="w-3 h-3" /> Buka & Pilih Media
              </span>
            </div>

            {/* Nav Arrows */}
            <div className="flex items-center justify-between mt-4 relative z-10">
              <div className="flex gap-1">
                {slides.map((_: any, i: number) => (
                  <span key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                      i === slideIndex ? isWireframe ? 'bg-black w-3' : 'bg-white w-3' : isWireframe ? 'bg-gray-300' : 'bg-white/40'
                    }`}
                    onClick={(e) => { e.stopPropagation(); setSlideIndex(i); }} />
                ))}
              </div>
              <div className="flex gap-1.5">
                <button onClick={(e) => { e.stopPropagation(); setSlideIndex(i => (i - 1 + slides.length) % slides.length); }}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    isWireframe ? 'hover:bg-gray-100 text-gray-600 bg-white border border-gray-300' : 'bg-white/20 hover:bg-white/30 text-white'
                  }`}>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); setSlideIndex(i => (i + 1) % slides.length); }}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    isWireframe ? 'hover:bg-gray-100 text-gray-600 bg-white border border-gray-300' : 'bg-white/20 hover:bg-white/30 text-white'
                  }`}>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* All Slides List */}
        <div className="space-y-2">
          <h4 className="text-[9.5px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1 px-1">
            <Info className="w-3.5 h-3.5" /> Semua Materi Edukasi
          </h4>

          <div className="space-y-2.5">
            {slides.map((slide: any, i: number) => {
              const bgMap: Record<string, string> = {
                'bg-emerald-500': isWireframe ? 'border-gray-400' : 'border-emerald-200 bg-gradient-to-br from-emerald-50 to-white',
                'bg-blue-500': isWireframe ? 'border-gray-400' : 'border-blue-200 bg-gradient-to-br from-blue-50 to-white',
                'bg-purple-500': isWireframe ? 'border-gray-400' : 'border-purple-200 bg-gradient-to-br from-purple-50 to-white',
              };
              return (
                <div key={i}
                  onClick={() => openViewer(slide)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all hover:translate-x-0.5 ${
                    bgMap[slide.bg] || (isWireframe ? 'border-gray-300 bg-white' : 'border-gray-100 bg-white')
                  } ${i === slideIndex ? 'ring-2 ' + (isWireframe ? 'ring-gray-800' : 'ring-emerald-500/30') : ''}`}>
                  <div className="flex items-start gap-3">
                    <div className="space-y-1 shrink-0">
                      {slide.videoUrl ? (
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                          isWireframe ? 'bg-gray-200 border border-gray-300' : 'bg-rose-50 border border-rose-200'
                        }`}>
                          <Play className={`w-3 h-3 ${isWireframe ? 'text-gray-600' : 'text-rose-500'}`} />
                        </div>
                      ) : (
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                          isWireframe ? 'bg-gray-200 border border-gray-300' : 'bg-sky-50 border border-sky-200'
                        }`}>
                          <FileText className={`w-3 h-3 ${isWireframe ? 'text-gray-600' : 'text-sky-500'}`} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${
                          isWireframe ? 'bg-gray-200 text-gray-700' : slide.bg === 'bg-emerald-500' ? 'bg-emerald-100 text-emerald-700' : slide.bg === 'bg-blue-500' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                        }`}>
                          {slide.tag}
                        </span>
                        {slide.videoUrl && (
                          <span className={`text-[8px] font-medium ${isWireframe ? 'text-gray-400' : 'text-rose-400'}`}>
                            + Video
                          </span>
                        )}
                      </div>
                      <h5 className="text-[11px] font-extrabold text-gray-800 font-display">{slide.title}</h5>
                      <p className="text-[9px] text-gray-500 leading-relaxed mt-0.5 line-clamp-1">{slide.desc}</p>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 mt-1 ${isWireframe ? 'text-gray-400' : 'text-gray-300'}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Environmental Facts Section */}
        {facts.length > 0 && (
          <div className="space-y-2 pb-2">
            <h4 className="text-[9.5px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1 px-1">
              <Globe className="w-3.5 h-3.5" /> Fakta & Dampak Lingkungan
            </h4>

            <div className="space-y-2.5">
              {facts.map((fact: any) => (
                <div key={fact.id} onClick={() => setSelectedFact(fact)}
                  className={`p-3.5 rounded-2xl border overflow-hidden relative cursor-pointer transition-all hover:translate-x-0.5 ${
                    isWireframe ? 'bg-white border-gray-300' : 'bg-white border-gray-100/60'
                  }`}>
                  <div className="flex gap-3">
                    {!isWireframe && fact.imageUrl && (
                      <img src={fact.imageUrl} alt={fact.title}
                        className="w-20 h-20 rounded-xl object-cover shrink-0" />
                    )}
                    <div className="flex-1 min-w-0 space-y-1">
                      <h5 className="text-[11px] font-extrabold text-gray-800 font-display leading-tight">{fact.title}</h5>
                      <p className="text-[9px] text-gray-500 leading-relaxed line-clamp-3">{fact.snippet}</p>
                      <span className={`inline-flex items-center gap-1 text-[8px] font-bold ${
                        isWireframe ? 'text-gray-600' : 'text-emerald-600'
                      }`}>
                        Baca Selengkapnya <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Impact Stats */}
        <div className={`p-4 rounded-2xl border flex items-center justify-between ${
          isWireframe ? 'bg-white border-gray-300' : 'bg-gradient-to-br from-emerald-50 to-teal-50/30 border-emerald-100/40'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${isWireframe ? 'bg-gray-100 border border-gray-300' : 'bg-emerald-500 text-white'}`}>
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider block">Dampak Positif Warga</span>
              <span className="text-lg font-black text-gray-800 font-display">{city.districts.length} Kecamatan</span>
              <span className="text-[9px] text-gray-500 ml-1">aktif memilah</span>
            </div>
          </div>
          <Award className={`w-8 h-8 ${isWireframe ? 'text-gray-300' : 'text-emerald-300'}`} />
        </div>
      </div>

      {/* Fact Detail Modal */}
      {selectedFact && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end z-50" onClick={() => setSelectedFact(null)}>
          <div className="w-full bg-white rounded-t-3xl pt-3 pb-5 max-h-[85%] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-center mb-3">
              <div className={`w-8 h-1 rounded-full ${isWireframe ? 'bg-gray-400' : 'bg-gray-300'}`} />
            </div>

            <div className="px-5 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${isWireframe ? 'bg-gray-100 border border-gray-300' : 'bg-emerald-50'}`}>
                    <Globe className={`w-4 h-4 ${isWireframe ? 'text-gray-800' : 'text-emerald-600'}`} />
                  </div>
                  <div>
                    <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider">Fakta Lingkungan</span>
                    <h4 className="text-sm font-extrabold font-display text-gray-800 leading-tight">{selectedFact.title}</h4>
                  </div>
                </div>
                <button onClick={() => setSelectedFact(null)}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer shrink-0 ${
                    isWireframe ? 'hover:bg-gray-100 text-gray-500' : 'hover:bg-gray-100 text-gray-400'
                  }`}>
                  <X className="w-4 h-4" />
                </button>
              </div>

              {!isWireframe && selectedFact.imageUrl && (
                <img src={selectedFact.imageUrl} alt={selectedFact.title}
                  className="w-full h-40 rounded-2xl object-cover" />
              )}

              <div className="space-y-3">
                <p className="text-[11px] text-gray-500 leading-relaxed">{selectedFact.snippet}</p>
                <div className={`h-px ${isWireframe ? 'bg-gray-300' : 'bg-gray-100'}`} />
                <p className="text-[11px] text-gray-700 leading-relaxed">{selectedFact.fullText}</p>
              </div>

              <button onClick={() => setSelectedFact(null)}
                className={`w-full py-3 text-xs font-extrabold text-white rounded-xl transition-all active:scale-[0.98] cursor-pointer ${
                  isWireframe ? 'bg-gray-900 border-2 border-black hover:bg-gray-800' : 'bg-emerald-500 hover:bg-emerald-600'
                }`}>
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Media Viewer Modal */}
      {viewerOpen && viewerSlide && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end z-50" onClick={() => setViewerOpen(false)}>
          <div className={`w-full bg-white rounded-t-3xl pt-3 pb-5 max-h-[85%] overflow-y-auto`} onClick={e => e.stopPropagation()}>
            {/* Drag Handle */}
            <div className="flex justify-center mb-3">
              <div className={`w-8 h-1 rounded-full ${isWireframe ? 'bg-gray-400' : 'bg-gray-300'}`} />
            </div>

            {/* Tab Selector */}
            <div className="px-5 mb-4">
              <div className={`p-0.5 rounded-xl flex ${
                isWireframe ? 'bg-gray-100 border border-gray-300' : 'bg-gray-100'
              }`}>
                {['video', 'teks'].map((tab) => {
                  const isActive = mediaTab === tab;
                  return (
                    <button key={tab}
                      onClick={() => setMediaTab(tab as 'video' | 'teks')}
                      className={`flex-1 py-2 text-[10px] font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isActive
                          ? isWireframe ? 'bg-white text-gray-900 border border-gray-300' : 'bg-white text-gray-800 shadow-sm'
                          : 'text-gray-400'
                      }`}>
                      {tab === 'video' ? (
                        <><Play className="w-3.5 h-3.5" /> Tonton Video</>
                      ) : (
                        <><FileText className="w-3.5 h-3.5" /> Baca Teks</>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {mediaTab === 'video' && viewerSlide.videoUrl ? (
              <div className="px-5 space-y-4">
                <div className={`rounded-2xl overflow-hidden border ${
                  isWireframe ? 'border-gray-400 bg-gray-100' : 'border-gray-200 bg-black'
                }`}>
                  {isWireframe ? (
                    <div className="h-48 flex items-center justify-center">
                      <Play className="w-12 h-12 text-gray-400" />
                    </div>
                  ) : (
                    <iframe
                      src={`https://www.youtube.com/embed/${getVideoId(viewerSlide.videoUrl)}?autoplay=1`}
                      title={viewerSlide.title}
                      className="w-full h-52"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </div>
                <h4 className="text-sm font-extrabold font-display text-gray-800">{viewerSlide.title}</h4>
                <p className="text-[10px] text-gray-500 leading-relaxed">{viewerSlide.desc}</p>
                <button onClick={() => setViewerOpen(false)}
                  className={`w-full py-3 text-xs font-extrabold text-white rounded-xl transition-all active:scale-[0.98] cursor-pointer ${
                    isWireframe ? 'bg-gray-900 border-2 border-black hover:bg-gray-800' : 'bg-emerald-500 hover:bg-emerald-600'
                  }`}>
                  Tutup
                </button>
              </div>
            ) : (
              <div className="px-5 space-y-4">
                <div className={`rounded-2xl overflow-hidden border ${isWireframe ? 'border-gray-400' : 'border-gray-100'}`}>
                  <div className={`p-5 bg-gradient-to-br ${
                    viewerSlide.bg === 'bg-emerald-500' ? 'from-emerald-50 to-white' : viewerSlide.bg === 'bg-blue-500' ? 'from-blue-50 to-white' : 'from-purple-50 to-white'
                  }`}>
                    <span className={`inline-block text-[8px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-3 ${
                      isWireframe ? 'bg-gray-200 text-gray-800' : viewerSlide.bg === 'bg-emerald-500' ? 'bg-emerald-100 text-emerald-700' : viewerSlide.bg === 'bg-blue-500' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {viewerSlide.tag}
                    </span>
                    <h4 className="text-sm font-extrabold font-display text-gray-800 mb-2">{viewerSlide.title}</h4>
                    <p className="text-[11px] text-gray-600 leading-relaxed">{viewerSlide.desc}</p>
                  </div>
                </div>

                {/* Quick action buttons */}
                <div className="flex gap-2.5">
                  <button onClick={() => setViewerOpen(false)}
                    className={`flex-1 py-3 text-xs font-extrabold text-white rounded-xl transition-all active:scale-[0.98] cursor-pointer ${
                      isWireframe ? 'bg-gray-900 border-2 border-black hover:bg-gray-800' : 'bg-emerald-500 hover:bg-emerald-600'
                    }`}>
                    Tutup
                  </button>
                  {viewerSlide.videoUrl && (
                    <button onClick={() => setMediaTab('video')}
                      className={`px-4 py-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        isWireframe ? 'border-gray-400 text-gray-700 hover:bg-gray-100' : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                      }`}>
                      <Play className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
