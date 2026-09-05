import { notFound } from "next/navigation";
import { getEluPageData } from "@/services/infra/controllers/elu.controller";
import type { Job } from "@/services/domain/entities/job.entity";

function formatDate(date: Date): string {
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function jobTypeLabel(job: Job): string {
  const types = [];
  if (job.estPosteElu) types.push("Élu");
  if (job.estFonctionPublique) types.push("Fonction publique");
  return types.join(" · ");
}

export default async function EluPage({
  params,
}: PageProps<"/elu/[uri]">) {
  const { uri } = await params;
  const profile = await getEluPageData(uri);

  if (!profile) {
    notFound();
  }

  const { elu, currentJobs, previousJobs } = profile;
  const dateNaissance = formatDate(elu.dateNaissance);

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

        {currentJobs.length > 0 && (
          <section className="w-full text-left">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Poste actuel
            </h2>
            <ul className="mt-2 flex flex-col gap-2">
              {currentJobs.map((job) => (
                <li
                  key={job.id}
                  className="rounded-lg bg-zinc-100 p-3 dark:bg-zinc-800"
                >
                  <p className="font-medium text-black dark:text-zinc-50">
                    {job.nom}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {job.categorie} · {jobTypeLabel(job)}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-500">
                    Depuis le {formatDate(job.dateDebut)}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {previousJobs.length > 0 && (
          <section className="w-full text-left">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Postes précédents
            </h2>
            <ul className="mt-2 flex flex-col gap-2">
              {previousJobs.map((job) => (
                <li
                  key={job.id}
                  className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-700"
                >
                  <p className="font-medium text-black dark:text-zinc-50">
                    {job.nom}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {job.categorie} · {jobTypeLabel(job)}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-500">
                    Du {formatDate(job.dateDebut)} au{" "}
                    {formatDate(job.dateFin)}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
