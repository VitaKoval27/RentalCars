
import React from "react"
interface IconProps {
    id: string;
    size?: number;
    className?: string;
}

const Icon = ({ id, size = 16, className = "" }: IconProps) => {
    return (
        <svg width={size} height={size} className={className} aria-hidden="true">
            <use href={`/sprite.svg#icon-${id}`} />
        </svg>
    );
};

export default Icon;