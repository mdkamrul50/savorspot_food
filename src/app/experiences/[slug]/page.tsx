type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ExperienceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Experience Detail</h1>
      <p className="text-zinc-600">Slug: {slug}</p>
    </div>
  );
}
