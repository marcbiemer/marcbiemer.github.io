import type { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import ResponsiveImage from "@/components/media/image/responsive-image";
import type { ImageContent } from "@/types/common";
import styles from "./styles.module.css";

type PropType = {
    project: string;
    slides: ImageContent[];
    options?: EmblaOptionsType;
};

const EmblaCarousel = (props: PropType) => {
    const { slides, options, project } = props;
    const [emblaRef] = useEmblaCarousel(options, [WheelGesturesPlugin()]);

    return (
        <div className={styles.embla}>
            <div className={styles.emblaViewport} ref={emblaRef}>
                <div className={styles.emblaContainer}>
                    {slides.map((slide) => (
                        <div className={styles.emblaSlide} key={slide.src}>
                            <ResponsiveImage project={project} img={slide} sizes="80vw" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EmblaCarousel;
