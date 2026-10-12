import type { OutputComponent, Run } from "./commands";

const CV_LINK = "/cv.pdf";

export const Output: OutputComponent = () => {
  return (
    <div>
      <a
        className="text-term-link"
        href={CV_LINK}
        target="_blank"
        rel="noopener noreferrer"
      >
        cv.pdf
      </a>
      <br />
    </div>
  );
};

export const run: Run = (state) => {
  window.open(CV_LINK, "_blank");

  return state;
};
