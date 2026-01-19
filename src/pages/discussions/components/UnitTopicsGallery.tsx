import axios from "axios";
import {apiBaseUrl} from "@/data/apiBaseUrl.ts";
import {useAuth} from "react-oidc-context";
import {useQuery} from "@tanstack/react-query";
import type {Page} from "@/types/page.ts";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";

const redirectToUnitSite = (url : string) => {
    window.location.href = url;
}

export type Unit = {
    description: string;
    unitCode: string;
    unitSiteUrl: string;
}

const fetchUnitTopics = async (token : string | undefined, pageNum : number, pageSize: number): Promise<Page<Unit>> => {

    const response = await axios.get(
        `${apiBaseUrl}/discussions/units`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            },
            params: {
                pageNum: pageNum,
                pageSize: pageSize
            }
        }
    )
    return response.data;
}

export default function UnitTopicsGallery() {

    const auth = useAuth();
    const token = auth?.user?.id_token;

    const navigate = useNavigate();


    const { data } = useQuery({
        queryKey: ["discussions", 0],
        queryFn: () => fetchUnitTopics(token, 0, 50),
        enabled: !!token,
        staleTime: 5*50*1000
    });

    if (data == undefined || data?.content.length <= 0) return <div></div>

    const units = data.content;

    console.log(units)

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[200px]">Unit Code</TableHead>
                    <TableHead>Unit Title</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {units.map((unit) => (
                    <TableRow>
                        <TableCell>{unit.unitCode}</TableCell>
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
    )
}