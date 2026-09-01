import { notFound } from "next/navigation";
import { getEluPageData } from "@/services/infra/controllers/elu.controller";

export default async function EluPage({
  params,
}: PageProps<"/elu/[uri]">) {
  const { uri } = await params;
  const elu = await getEluPageData(uri);

  if (!elu) {
    notFound();
  }

  const dateNaissance = elu.dateNaissance.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-6 py-16 dark:bg-black">
      <main className="flex w-full max-w-md flex-col items-center gap-6 rounded-2xl bg-white p-8 text-center shadow-sm dark:bg-zinc-900">
        {elu.photoProfil ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={elu.photoProfil}
            alt={`${elu.prenom} ${elu.nom}`}
            className="h-32 w-32 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-zinc-200 text-3xl font-semibold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
            {elu.prenom[0]}
            {elu.nom[0]}
          </div>
        )}

        <div>
          <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
            {elu.prenom} {elu.nom}
          </h1>
          <p className="mt-1 text-zinc-600 dark:text-zinc-400">
            Né(e) le {dateNaissance}
          </p>
        </div>
      </main>
    </div>
  );
}
