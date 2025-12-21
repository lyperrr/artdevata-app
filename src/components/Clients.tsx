import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ClientItem = {
  id?: number | string;
  name?: string;
  company?: string;
  logo?: string;
  image?: string;
  logo_url?: string;
};

export default function Clients() {
  const [clients, setClients] = useState<ClientItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch("https://admin.artdevata.net/api/clients")
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        // assume data is array or { data: [...] }
        let list: any[] = [];
        if (Array.isArray(data)) list = data;
        else if (Array.isArray(data?.data)) list = data.data;
        else if (Array.isArray(data?.clients)) list = data.clients;

        // try to normalise logo url field
        const normalized = list
          .map((it) => ({
            id: it.id ?? it._id,
            name: it.name ?? it.title ?? "",
            company: it.company ?? "",
            logo: it.logo ?? it.image ?? it.logo_url ?? it.logoUrl ?? "",
          }))
          .filter((it) => typeof it.logo === "string" && it.logo.length > 0);

        setClients(normalized);
      })
      .catch(() => setClients([]))
      .finally(() => setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <TooltipProvider>
      <section className="py-16 px-4 bg-gray-50">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Klien Kami
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Berikut beberapa klien yang pernah bekerja sama dengan kami.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 justify-center">
            {loading ? (
              // Show placeholders while loading
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center h-44 animate-pulse"
                >
                  <div className="size-24 rounded-lg bg-gray-300 animate-pulse"></div>
                </div>
              ))
            ) : clients.length === 0 ? (
              <div className="w-full text-center py-12">
                <p className="text-foreground text-lg">Belum ada klien.</p>
              </div>
            ) : (
              clients.map((c, idx) => (
                <div
                  key={idx}
                  className="group flex items-center justify-center size-36"
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <img
                        src={c.logo}
                        alt={c.company || "Logo Klien"}
                        className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0"
                        onError={(e) => {
                          // Hide broken images
                          (e.currentTarget as HTMLImageElement).classList.add(
                            "invisible"
                          );
                        }}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-semibold">{c.name || c.company || "Klien"}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}
