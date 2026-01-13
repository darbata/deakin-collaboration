import {ProjectPageHeader} from "@/pages/projects/components/ProjectPageHeader.tsx";
import {ProjectGallerySection} from "@/pages/projects/components/ProjectGallerySection.tsx";
import {useState} from "react";
import CreateProjectDialog from "@/pages/projects/CreateProjectDialog.tsx";


export default function ProjectsPage() {
    const [open, setOpen] = useState(false);

    const handleSubmitProjectBtnClick = () => {
        setOpen(!open)
    }

    return (
        <section className="flex flex-col gap-2">
            <ProjectPageHeader handleClick={handleSubmitProjectBtnClick} />
            <ProjectGallerySection />
            <CreateProjectDialog open={open} setOpen={setOpen} />
        </section>
    )
}