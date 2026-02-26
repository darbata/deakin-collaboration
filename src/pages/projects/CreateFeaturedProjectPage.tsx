import PageHeader from "@/components/PageHeader.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import type {FeaturedProject} from "@/types/FeaturedProject.ts";
import {useEffect, useState} from "react";
import {FeaturedProjectCard} from "@/pages/projects/components/FeaturedProjectCard.tsx";
import {ProjectCreateField, type ProjectCreateFieldType} from "@/pages/projects/ProjectCreateField.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ImageUpIcon} from "lucide-react";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {useDsecGithubRepos} from "@/data/useDsecGithubRepos.ts";

export function CreateFeaturedProjectPage() {

    const {data, isLoading, isError} = useDsecGithubRepos();
    const dsecRepos = data;
    const [selectedRepoId, setSelectedRepoId] = useState(-1);

    const [preview, setPreview] = useState<FeaturedProject>({
        id: "",
        title: "Awesome Project",
        tagline: "Does Cool Things",
        bannerUrl: "",
        description: "Description of the project. Regarding goals, tech-stack and more.",
        ownerAvatarUrl: "",
        ownerDisplayName: "",
        repoId: 0, // must be updated
        repoLanguage: "",
        repoOpenTickets: 0,
        repoStars: 0,
        repoUrl: "",
        repoPushedAt: new Date(),
    })

    const [banner, setBanner] = useState<File | null>(null);

    const handleBannerUpload = (event) => {
        setBanner(event.target.files[0])
    }

    useEffect(() => {
        if (!banner) {
            setPreview(prev => ({ ...prev, bannerUrl: '' }));
            return;
        }
        const url = URL.createObjectURL(banner);
        setPreview(prev => ({...prev, bannerUrl: url}))
        return () => URL.revokeObjectURL(url);
    }, [banner]);

    const projectDetailsFields:  ProjectCreateFieldType[] = [
        {
            label: "title",
            value: preview.title,
            setValue: (event) => setPreview(prev => ({...prev, title: event.target.value}))
        },
        {
            label: "tagline",
            value: preview.tagline,
            setValue: (event) => setPreview(prev => ({...prev, tagline: event.target.value}))
        },
        {
            label: "description",
            value: preview.description,
            setValue: (event) => setPreview(prev => ({...prev, description: event.target.value}))
        },
    ]

    return (
        <section>
            <PageHeader header="Create Featured Project" description="Add a new project to the 'Featured' section of the Projects page. This will be visible to all users."/>
            <Separator className="my-2"/>
            <div className="grid grid-cols-12">
                <div className="col-span-7 p-2 flex flex-col gap-4">

                    <input
                        type="file"
                        id="banner"
                        name="banner"
                        onChange={handleBannerUpload}
                        hidden
                        accept="image/jpeg, image/png"
                    />

                    <div className="border rounded p-2 flex flex-col gap-4">
                        <span className="font-semibold text-lg">Banner</span>
                        <Button className="w-full" variant="outline">
                            <label htmlFor="banner" className="flex items-center gap-1">
                                <ImageUpIcon />
                                <span>Upload Banner Image</span>
                            </label>
                        </Button>
                        <span className="text-xs ml-auto text-muted-foreground">.png, .jpg</span>
                    </div>

                    <div className="border rounded p-2 flex flex-col gap-4">
                        <span className="font-semibold text-lg">Project Details</span>
                        {projectDetailsFields.map((field) => <ProjectCreateField field={field} />)}
                    </div>


                    <div className="border rounded p-2 flex flex-col gap-4">
                        <span className="font-semibold text-lg">Repository Details</span>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="DSEC Repository"></SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {
                                        dsecRepos && !isLoading
                                            ? dsecRepos.map(
                                                (repo) => (
                                                    <SelectItem
                                                        onClick={() => {setSelectedRepoId(repo.id)}}
                                                        value={repo.id.toString()}>
                                                        {repo.full_name}
                                                    </SelectItem>)
                                                )
                                            : <div>loading...</div>
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button className="w-full">Confirm and Created Featured Project</Button>
                </div>
                <div className="col-span-5 w-full p-2 flex flex-col items-center gap-8">
                    <FeaturedProjectCard project={preview} />
                </div>
            </div>
        </section>
    )
}