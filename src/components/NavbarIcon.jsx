import React from 'react';

import { Icon } from 'semantic-ui-react';

export function NavbarIcon(props) {
  return (
    <Icon
      onClick={props.handleClick}
      size='big'
      as='i'
      color={props.isExpanded ? "grey" : "blue"}
      inverted
      name={props.isExpanded ? "close" : "bars"}
    />
  );
}