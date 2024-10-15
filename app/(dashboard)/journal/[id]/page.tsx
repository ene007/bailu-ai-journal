import Editor from "@/components/Editor";
import { analyz } from "@/utils/ai";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getEntry = async (id) => {
    const user = await getUserByClerkID();
    const entry = prisma.journalEntry.findUnique({
        where: {
            userId_id: {
                userId: user.id,
                id: id
            }
        },
        include: {
            analysis: true
        }
    })

    return entry;
}

const EntryPage = async ({ params }) => {
    const entry = await getEntry(params.id);

    return (
        <div className="
            h-full w-full">
            <Editor entry={entry} />
        </div>
    )
}

export default EntryPage;