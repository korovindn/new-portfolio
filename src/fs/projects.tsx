import { useTranslation } from "react-i18next";
import type { ParseKeys } from "i18next";

type ProjectsKeys = Extract<ParseKeys, `projects.${string}`>;

export type Project = {
  id: string;
  label: ProjectsKeys;
  description: ProjectsKeys;
  link?: string;
  where?: ProjectsKeys;
};

export const PROJECTS: Project[] = [
  {
    id: "tripstat",
    label: "projects.tripstat",
    description: "projects.tripstatDesc",
    link: "https://tripstat.io",
  },
  {
    id: "conjuego",
    label: "projects.conjuego",
    description: "projects.conjuegoDesc",
    link: "https://conjuego.com",
  },
  {
    id: "nitid",
    label: "projects.nitid",
    description: "projects.nitidDesc",
    link: "https://nitid.site",
  },
  {
    id: "telemost",
    label: "projects.telemost",
    description: "projects.telemostDesc",
    link: "https://telemost.yandex.ru",
    where: "projects.yandex",
  },
  {
    id: "gitverse",
    label: "projects.gitverse",
    description: "projects.gitverseDesc",
    link: "https://gitverse.ru",
    where: "projects.sber",
  },
  {
    id: "rdm",
    label: "projects.rdm",
    description: "projects.rdmDesc",
    where: "projects.mts",
  },
];

export const ProjectFile = ({ project }: { project: Project }) => {
  const { t } = useTranslation();

  return (
    <div>
      <p>
        {t(project.label)}
        {project.where && <> @{t(project.where)}</>}
      </p>
      {project.link && (
        <a
          className="text-term-link underline"
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {project.link.replace(/^https?:\/\//, "")}
        </a>
      )}
      <br />
      <p>{t(project.description)}</p>
      <br />
    </div>
  );
};
