// src/pages/BlogDetail.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, ArrowLeft, Loader2 } from "lucide-react";

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://admin.artdevata.net/api/blogs/${id}`)
      .then(res => res.json())
      .then(json => {
        const blog = json.data || json; // BlogController@show bisa langsung object atau {data:...}
        setPost(blog);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <AppLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  if (!post)
    return (
      <AppLayout>
        <div className="container py-32 text-center">
          <h1 className="text-4xl font-bold mb-6">Artikel Tidak Ditemukan</h1>
          <Button onClick={() => navigate("/blog")}>Kembali</Button>
        </div>
      </AppLayout>
    );

  return (
    <AppLayout>
      <div className="container py-20">
        <Button
          variant="ghost"
          onClick={() => navigate("/blog")}
          className="mb-8"
        >
          <ArrowLeft className="mr-2" /> Kembali ke Blog
        </Button>

        <Card className="overflow-hidden shadow-2xl">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-96 object-cover"
          />
          <div className="p-8 lg:p-12">
            <Badge className="mb-6">{post.category || "Tips & Trik"}</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-8">
              {post.title}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground mb-10">
              <Calendar className="w-5 h-5" />
              {new Date(post.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
            <Separator className="mb-10" />
            <div
              className="prose prose-lg max-w-none leading-8 text-muted-foreground"
              dangerouslySetInnerHTML={{
                __html: post.content
                  .replace(/\\r\\n/g, "<br>")
                  .replace(/\\n/g, "<br>"),
              }}
            />
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default BlogDetail;
