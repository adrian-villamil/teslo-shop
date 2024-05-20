import Image from "next/image";

interface Props {
  src?: string;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
  style?: React.StyleHTMLAttributes<HTMLImageElement>['style'];
  onMouseEnter?: React.MouseEventHandler<HTMLImageElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLImageElement>;
  width: number;
  height: number;
  priority?: boolean | undefined;
}

export const ProductImage = ({
  src,
  alt,
  className,
  style,
  onMouseEnter,
  onMouseLeave,
  width,
  height,
  priority
}: Props) => {
  const localSrc = (src) ? (
    src.startsWith('http') ? src : `/products/${src}`
  ) : '/imgs/placeholder.jpg';

  return (
    <Image
      src={localSrc}
      width={width}
      height={height}
      alt={alt}
      className={className}
      style={style}
      priority={priority}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};
