import React from "react";
import PasswordHide  from "../../assets/images/SVG/Frame.svg";
import Hotel  from "../../assets/images/SVG/Hotel.svg";

export const getIcon = (ICON, height = 24, width = 24, color) => {
  const iconProps = {
    height,
    width,
    color: color,   
  };

        switch (ICON) {
            case 'PasswordHide':
                return <PasswordHide {...iconProps} />;
            case 'Hotel':
                return <Hotel {...iconProps} />;
            default:
                return null;
        }
}
