import { ChevronLeft, ChevronRight } from "@untitledui/icons";
import clsx from "clsx";
import ImageGallery from "react-image-gallery";
import styles from "./style.module.scss";
import type { TGalleryProps } from "./type";

export default function Gallery(props: TGalleryProps) {
  const { items } = props;

  return (
    <div className={styles["gallery-container"]}>
      <ImageGallery
        items={items}
        showFullscreenButton={false}
        showPlayButton={false}
        renderRightNav={(onClick: () => void) => (
          <ChevronRight
            className={clsx(styles["chevron-right"], "image-gallery-icon")}
            onClick={onClick}
          />
        )}
        renderLeftNav={(onClick: () => void) => (
          <ChevronLeft
            className={clsx(styles["chevron-left"], "image-gallery-icon")}
            onClick={onClick}
          />
        )}
      />
    </div>
  );
}
