import axios from "axios";
import {apiBaseUrl} from "@/data/apiBaseUrl.ts";
import {useAuth} from "react-oidc-context";
import {useQuery} from "@tanstack/react-query";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import type {UnitTopic} from "@/types/UnitTopic.ts";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";

const redirectToUnitSite = (url : string) => {
    window.location.href = url;
}

const fetchUnitTopics = async (token : string | undefined): Promise<UnitTopic[]> => {

    if (token == undefined) return [];

    const response = await axios.get(
        `${apiBaseUrl}/topics/units`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    )
    return response.data;
}

export default function UnitTopicsGallery({searchFilter} : {searchFilter: string}) {

    const auth = useAuth();
    const token = auth?.user?.id_token;

    const navigate = useNavigate();


    const { data } = useQuery({
        queryKey: ["discussions"],
        queryFn: () => fetchUnitTopics(token),
        enabled: !!token,
        staleTime: 5*50*1000
    });

    console.log(data)

    if (data == undefined || data?.length <= 0) return <div></div>
    const filtered = data.filter(unit => {
        return (
            unit.unitCode.toLowerCase().includes(searchFilter.toLowerCase()) ||
            unit.description.toLowerCase().includes(searchFilter.toLowerCase())
        )
    })

    return (
        <ScrollArea className="h-[60vh] w-full rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px]">Unit Code</TableHead>
                        <TableHead>Unit Title</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filtered.map((unit) => (
                        <TableRow>
                            <TableCell className="font-semibold">{unit.unitCode}</TableCell>
                            <TableCell>{unit.description}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="outline" className="ml-2" onClick={() => redirectToUnitSite(unit.unitSiteUrl)}>
                                    Unit Site
                                </Button>
                                <Button className="ml-2" onClick={() => navigate(`/discussions/${unit.unitCode}`)}>
                                    Discussions
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </ScrollArea>
    )
}