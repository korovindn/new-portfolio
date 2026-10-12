import { Whoami } from "../cli/commands/whoami";
import { Contact } from "../cli/commands/contact";
import { PROJECTS, ProjectFile } from "./projects";

export type FileNode =
  { type: "file"; Content: React.FC } | { type: "file"; href: string };

export type DirNode = { type: "dir"; children: Record<string, Node> };

export type Node = FileNode | DirNode;

export const HOME = "/home/guest";

const ROOT: DirNode = {
  type: "dir",
  children: {
    home: {
      type: "dir",
      children: {
        guest: {
          type: "dir",
          children: {
            "about.txt": { type: "file", Content: Whoami },
            "contact.txt": { type: "file", Content: Contact },
            "cv.pdf": { type: "file", href: "/cv.pdf" },
            projects: {
              type: "dir",
              children: Object.fromEntries(
                PROJECTS.map((project): [string, Node] => [
                  `${project.id}.md`,
                  {
                    type: "file",
                    Content: () => <ProjectFile project={project} />,
                  },
                ]),
              ),
            },
          },
        },
      },
    },
  },
};

export const resolvePath = (cwd: string, input: string): string => {
  const raw =
    input === "~" || input.startsWith("~/")
      ? HOME + input.slice(1)
      : input.startsWith("/")
        ? input
        : `${cwd}/${input}`;

  const parts: string[] = [];

  for (const segment of raw.split("/")) {
    if (!segment || segment === ".") continue;

    if (segment === "..") {
      parts.pop();
    } else {
      parts.push(segment);
    }
  }

  return `/${parts.join("/")}`;
};

export const getNode = (path: string): Node | undefined => {
  let node: Node | undefined = ROOT;

  for (const segment of path.split("/").filter(Boolean)) {
    node = node?.type === "dir" ? node.children[segment] : undefined;
  }

  return node;
};

export const formatPath = (path: string): string => {
  if (path === HOME) return "~";
  if (path.startsWith(`${HOME}/`)) return `~${path.slice(HOME.length)}`;

  return path;
};

export const joinPath = (dir: string, name: string): string =>
  dir === "/" ? `/${name}` : `${dir}/${name}`;
