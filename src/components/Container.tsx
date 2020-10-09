import React from "react";

import "./Container.scss";

interface ContainerProps {
  children: React.ReactNode;
}

// Container component that displays its children at the center of the page.
const Container: React.FC<ContainerProps> = (props: ContainerProps) => {
  return <div className='container ion-padding'>{props.children}</div>;
};

export default Container;
