import ImageDisplaySection from "@/components/image-display-section";
import TransformationSection from "@/components/transformation-section";
import TransformedImageSection from "@/components/transformed-image-section";

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-[#131212]">
      <h1
  className="text-3xl font-bold text-center mb-8 
  bg-gradient-to-r from-blue-500 to-indigo-600 
  text-transparent bg-clip-text "
>
  AI Image Transformation
</h1>

      <div className="max-w-6xl mx-auto">
        <ImageDisplaySection />
        <TransformationSection />
        <TransformedImageSection />
      </div>
    </main>
  );
}
