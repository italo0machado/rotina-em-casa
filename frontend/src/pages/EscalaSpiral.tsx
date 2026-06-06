import { DualCarousel, EXAMPLE_CATEGORIES } from "../components/DualCarousel";

export default function EscalaSpiral() {
  return (
    <div className="min-h-screen bg-[#f8f5f0]">
      <DualCarousel
        categories={EXAMPLE_CATEGORIES}
        fadeBg="#f8f5f0"
        onCategoryChange={(cat) => console.log("categoria:", cat.name)}
        onActivitySelect={(act, cat) => console.log("atividade:", act.name, "em", cat.name)}
      />
    </div>
  );
}
