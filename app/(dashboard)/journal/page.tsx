import { prisma } from "@/utils/db";
import { getUserByClerkID } from "@/utils/auth"
import NewEntryCard from "@/components/NewEntryCard";
import EntryCard from "@/components/EntryCard";
import Link from "next/link";
import Question from "@/components/Question";

const getEntries = async () => {
    const user = await getUserByClerkID();
    const entries = await prisma.journalEntry.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: "desc"
        }
      
    });

    return entries;
}

const JournalPage = async () => {
    const data = await getEntries()

    return (
        <div className="px-6 py-8 bg-zinc-100/50 h-full">
            <h1 className="text-4xl mb-12">Journals</h1>
            <div className="my-8">
                <Question />
            </div>
            <div className="grid grid-cols-3 gap-4 p-10">
                <NewEntryCard />
                {data.map((entry) => (
                    <div key={entry.id}>
                        <Link href={`/journal/${entry.id}`}>
                            <EntryCard entry={entry} />
                        </Link>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default JournalPage;