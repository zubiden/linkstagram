import classNames from "classnames";
import { FC, MouseEventHandler, useEffect, useState } from "react";
import { IPhoto } from "../../types";
import styles from "./Slider.module.scss";

type SliderProps = {
    photos: IPhoto[]
    onCenterClick?: MouseEventHandler<HTMLElement>
    className?: string
    sides?: boolean
    roundBorders?: boolean
}

export const Slider: FC<SliderProps> = ({ photos, sides = false, roundBorders, onCenterClick, className }) => {
    const [index, setIndex] = useState(0);

    const secondPrev = (index === photos.length - 1) ? photos[index - 2] : null;
    const prev = (index > 0) ? photos[index - 1] : null;
    const current = photos[index];
    const next = (index < (photos.length - 1)) ? photos[index + 1] : null;
    const secondNext = (index === 0 && photos.length > 2) ? photos[index + 2] : null;

    const big = !sides || (!prev && !next);

    const showPrev: MouseEventHandler<HTMLElement> = ev => {
        ev.stopPropagation();
        setIndex(Math.max(index - 1, 0));
    }
    const showNext: MouseEventHandler<HTMLElement> = ev => {
        ev.stopPropagation();
        setIndex(Math.min(index + 1, photos.length - 1));
    }

    useEffect(() => {
        setIndex(0); // reset index on photos change
    }, [photos])

    return (
        <div className={classNames({
            [styles.slider]: true,
            [styles.roundBorders]: roundBorders,
        }, className)}>
            <svg viewBox={`0 0 1 ${big ? 1 : 0.8}`}></svg>
            {sides && secondPrev && <SliderPhoto photo={secondPrev} className={styles.secondPrev} onClick={showPrev} />}
            {sides && prev && <SliderPhoto photo={prev} className={classNames({
                [styles.prev]: true,
                [styles.padded]: secondPrev
            })} onClick={showPrev} />}

            {prev && <CenteredButton direction="left" onClick={showPrev} />}

            {current && <SliderPhoto photo={current} className={classNames({
                [styles.current]: true,
                [styles.left]: secondNext,
                [styles.right]: secondPrev,
                [styles.big]: big
            })} onClick={onCenterClick} />}

            {next && <CenteredButton direction="right" onClick={showNext} />}

            {sides && next && <SliderPhoto photo={next} className={classNames({
                [styles.next]: true,
                [styles.padded]: secondNext
            })} onClick={showNext} />}
            {sides && secondNext && <SliderPhoto photo={secondNext} className={styles.secondNext} onClick={showNext} />}
            {!sides && photos.length > 1 && <div className={styles.position}>
                {new Array(photos.length).fill(null).map((_, i) => <Point current={i === index} key={i} onClick={ev => {
                    ev.stopPropagation();
                    setIndex(i)
                }} />)}
            </div>}
        </div>
    )
}

const Point: FC<{ current?: boolean, onClick?: MouseEventHandler<HTMLElement> }> = ({ current, onClick }) => {
    return (
        <div className={classNames({
            [styles.point]: true,
            [styles.current]: current
        })} onClick={onClick} />
    )
}

const CenteredButton: FC<{ direction: "right" | "left", onClick?: MouseEventHandler<HTMLElement> }> = ({ direction, onClick }) => {
    return (
        <div className={classNames({
            [styles.button]: true,
            [styles[direction]]: true
        })} onClick={onClick}>
            <i className="icon icon-arrow" />
        </div>
    )
}

const SliderPhoto: FC<{ photo: IPhoto, className?: string, onClick?: MouseEventHandler<HTMLElement> }> = ({ photo, className, onClick }) => {
    return (
        <div className={classNames(styles.square, className)} onClick={onClick}>
            <svg viewBox="0 0 1 1"></svg>
            <img className={styles.image} src={photo.url} alt="Post content" />
        </div>
    )
}