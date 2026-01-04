import {ProjectPageHeader} from "@/pages/projects/components/ProjectPageHeader.tsx";
import {ProjectGallerySection} from "@/pages/projects/components/ProjectGallerySection.tsx";

export default function ProjectsPage() {
    return (
        <section className="flex flex-col gap-2">
            <ProjectPageHeader />
            <ProjectGallerySection />
        </section>
    )
}