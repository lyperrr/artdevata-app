/** @format */

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Photo1 from "@/assets/img/IMG_3279.jpg";
import Photo2 from "@/assets/img/IMG_3280.jpg";
import Photo3 from "@/assets/img/IMG_3281.jpg";
import Photo4 from "@/assets/img/IMG_3282.jpg";

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

interface GalleryProps {
  title?: string;
  items?: GalleryItem[];
}

const Gallery: React.FC<GalleryProps> = ({
  items = [
    {
      id: "1",
      title: "Mengatur Sudut Kamera",
      description:
        "Teknisi memastikan arah kamera sesuai area prioritas agar setiap sudut lokasi tetap terpantau jelas.",
      imageUrl: Photo1,
      category: "Adjustment",
    },
    {
      id: "2",
      title: "Kalibrasi Arah CCTV",
      description:
        "Proses kalibrasi ulang untuk mengarahkan kamera ke titik buta, memastikan tidak ada area pengawasan yang terlewat.",
      imageUrl: Photo2,
      category: "Calibration",
    },
    {
      id: "3",
      title: "Pemasangan Dengan Bor",
      description:
        "Tim memasang bracket kamera menggunakan bor agar posisi perangkat kokoh dan aman untuk jangka panjang.",
      imageUrl: Photo3,
      category: "Installation",
    },
    {
      id: "4",
      title: "Hasil Akhir Terpasang",
      description:
        "Unit CCTV yang telah selesai diarahkan menunjukkan hasil akhir tertata rapi siap digunakan untuk monitoring.",
      imageUrl: Photo4,
      category: "Result",
    },
  ],
}) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Dokumentasi Perusahaan
          </h2>
          <p className="text-lg text-primary max-w-2xl mx-auto">
            Dokumentasi lengkap tentang kegiatan dan pencapaian perusahaan kami
          </p>
        </div>

        {items.length > 0 ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {items.map((item) => (
              <Card
                key={item.id}
                className="break-inside-avoid mb-4 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 z-30">
                    <Badge
                      variant="outline"
                      className="bg-accent text-primary-foreground hover:bg-accent/90 border-accent"
                    >
                      {item.category}
                    </Badge>
                  </div>
                  {/* Overlay dengan title saat hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-3 text-white">
                      <h3 className="text-base font-semibold mb-1">
                        {item.title}
                      </h3>
                      <p
                        className="text-xs opacity-90 overflow-hidden"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-primary text-lg">
              Belum ada dokumentasi yang ditambahkan.
            </p>
          </div>
        )}

        {/* Modal Dialog */}
        <Dialog
          open={!!selectedItem}
          onOpenChange={() => setSelectedItem(null)}
        >
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedItem && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">
                    {selectedItem.title}
                  </DialogTitle>
                  <DialogDescription className="text-base">
                    <Badge variant="secondary" className="mb-2">
                      {selectedItem.category}
                    </Badge>
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={selectedItem.imageUrl}
                      alt={selectedItem.title}
                      className="w-full h-auto max-h-[60vh] object-contain"
                    />
                  </div>
                  <div className="prose prose-primary-w-none">
                    <p className="text-primary leading-relaxed">
                      {selectedItem.description}
                    </p>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Gallery;
