import {
  CSSProperties,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from "react";

import classnames from "classnames/bind";
import styles from "./styles.module.css";

const cx = classnames.bind(styles);

type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingMapperType = Record<HeadingElement, ReactNode>;

type TitleProps = {
  element: HeadingElement;
  fontSize?: number;
  fontWeight?: number;
  textAlign?: CSSProperties["textAlign"];
  className?: string;
} & HTMLAttributes<HTMLHeadingElement>;

const Title: React.FC<PropsWithChildren<TitleProps>> = ({
  element,
  children,
  fontSize,
  fontWeight,
  textAlign,
  ...props
}) => {
  const attributes: React.HTMLAttributes<HTMLHeadingElement> = {
    ...props,
    className: cx("heading", element, props.className),
    style: {
      ...props.style,
      textAlign,
      fontWeight,
      fontSize,
    },
  };
  const HeadingMapper: HeadingMapperType = {
    h1: <h1 {...attributes}>{children}</h1>,
    h2: <h2 {...attributes}>{children}</h2>,
    h3: <h3 {...attributes}>{children}</h3>,
    h4: <h4 {...attributes}>{children}</h4>,
    h5: <h5 {...attributes}>{children}</h5>,
    h6: <h6 {...attributes}>{children}</h6>,
  };

  return HeadingMapper[element];
};

export default Title;
