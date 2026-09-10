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
import { Camera } from "lucide-react";
import { GalleryItem } from "@/types";
import { getDocumentations } from "@/services";

export type { GalleryItem };

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

    getDocumentations()
      .then((data) => {
        if (!isMounted) return;
        setItems(data);
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="rounded-2xl overflow-hidden">
                <Skeleton className="w-full aspect-[4/5] rounded-2xl" />
              </div>
            ))}
          </div>
        ) : items.length > 0 ? (
          /* Grid Cards Layout dengan Ukuran Sejajar */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => {
              const imageSrc = item.imageUrl || item.image || "";
              return (
                <Card
                  key={item.id}
                  className="rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-border/60 bg-card flex flex-col"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={item.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-xs">
                        <Camera className="w-8 h-8 opacity-30" />
                      </div>
                    )}

                    {item.category && (
                      <div className="absolute top-4 left-4 z-30">
                        <Badge
                          variant="outline"
                          className="bg-accent text-primary-foreground hover:bg-accent/90 border-accent font-medium shadow-sm"
                        >
                          {item.category}
                        </Badge>
                      </div>
                    )}

                    {/* Overlay dengan title saat hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div className="text-white space-y-1">
                        <h3 className="text-base font-bold line-clamp-1 mb-1">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
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
