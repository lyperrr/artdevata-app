/** @format */

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export interface GalleryItem {
  id: string | number;
  title: string;
  description?: string;
  imageUrl?: string;
  image?: string;
  category?: string;
}

interface GalleryProps {
  title?: string;
  items?: GalleryItem[];
}

const Gallery: React.FC<GalleryProps> = ({ items: propItems }) => {
  const [items, setItems] = useState<GalleryItem[]>(propItems || []);
  const [loading, setLoading] = useState(!propItems || propItems.length === 0);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (propItems && propItems.length > 0) {
      setItems(propItems);
      setLoading(false);
      return;
    }

    let isMounted = true;
    const apiUrl =
      import.meta.env.VITE_API_URL || "https://admin.artdevata.net/api";

    fetch(`${apiUrl}/documentations`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((resData) => {
        if (!isMounted) return;
        const list = Array.isArray(resData)
          ? resData
          : Array.isArray(resData?.data)
          ? resData.data
          : [];

        const formatted = list.map((d: any) => ({
          id: d.id,
          title: d.title,
          description: d.description || "",
          imageUrl: d.image || d.image_url || "",
          category: d.category || "Dokumentasi",
        }));
        setItems(formatted);
      })
      .catch((err) => {
        console.warn("Gagal memuat dokumentasi dari API:", err);
        if (isMounted) setItems([]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [propItems]);

  return (
    <section className="py-16 bg-secondary" id="dokumentasi">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Dokumentasi Perusahaan
          </h2>
          <p className="text-lg text-primary max-w-2xl mx-auto">
            Dokumentasi lengkap tentang kegiatan dan pencapaian perusahaan kami
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {[240, 300, 200, 280].map((height, i) => (
              <div key={i} className="break-inside-avoid mb-4">
                <Skeleton
                  className="w-full rounded-lg"
                  style={{ height: `${height}px` }}
                />
              </div>
            ))}
          </div>
        ) : items.length > 0 ? (
          /* Masonry Cards Layout */
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {items.map((item) => {
              const imageSrc = item.imageUrl || item.image || "";
              return (
                <Card
                  key={item.id}
                  className="break-inside-avoid mb-4 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="relative overflow-hidden">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={item.title}
                        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-48 bg-muted flex items-center justify-center text-muted-foreground text-xs">
                        Tidak ada gambar
                      </div>
                    )}

                    {item.category && (
                      <div className="absolute top-4 left-4 z-30">
                        <Badge
                          variant="outline"
                          className="bg-accent text-primary-foreground hover:bg-accent/90 border-accent"
                        >
                          {item.category}
                        </Badge>
                      </div>
                    )}

                    {/* Overlay dengan title saat hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-3 text-white">
                        <h3 className="text-base font-semibold mb-1">
                          {item.title}
                        </h3>
                        {item.description && (
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
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
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
                    {selectedItem.category && (
                      <Badge variant="secondary" className="mb-2">
                        {selectedItem.category}
                      </Badge>
                    )}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {(selectedItem.imageUrl || selectedItem.image) && (
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        src={selectedItem.imageUrl || selectedItem.image}
                        alt={selectedItem.title}
                        className="w-full h-auto max-h-[60vh] object-contain"
                      />
                    </div>
                  )}
                  {selectedItem.description && (
                    <div className="prose prose-primary max-w-none">
                      <p className="text-primary leading-relaxed">
                        {selectedItem.description}
                      </p>
                    </div>
                  )}
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
