import React from "react";
import PasswordHide  from "../../assets/images/SVG/Frame.svg";
import Hotel  from "../../assets/images/SVG/Hotel.svg";
import Home  from "../../assets/images/SVG/Home.svg";
import Offers  from "../../assets/images/SVG/Offers.svg";
import Profile  from "../../assets/images/SVG/Profile.svg";
import Bookings  from "../../assets/images/SVG/Bookings.svg";
import Search  from "../../assets/images/SVG/Search.svg";
import Bus  from "../../assets/images/SVG/Bus.svg";
import Train  from "../../assets/images/SVG/Train.svg";
import Flight  from "../../assets/images/SVG/Flight.svg";
import Ship  from "../../assets/images/SVG/Ship.svg";
import Star  from "../../assets/images/SVG/Star.svg";
import Work  from "../../assets/images/SVG/Work.svg";
import Security  from "../../assets/images/SVG/Security.svg";
import Internet  from "../../assets/images/SVG/Internet.svg";
import Info  from "../../assets/images/SVG/Info.svg";
import Notification  from "../../assets/images/SVG/Notification.svg";
import Edit  from "../../assets/images/SVG/Edit.svg";


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
            case 'Home':
                return <Home {...iconProps} />;
            case 'Offers':
                return <Offers {...iconProps} />;
            case 'Profile':
                return <Profile {...iconProps} />;
            case 'Bookings':
                return <Bookings {...iconProps} />;
            case 'Search':
                return <Search {...iconProps} />;
            case 'Bus':
                return <Bus {...iconProps} />;
            case 'Flight':
                return <Flight {...iconProps} />;
            case 'Train':
                return <Train {...iconProps} />;
            case 'Ship':
                return <Ship {...iconProps} />;
            case 'Star':
                return <Star {...iconProps} />;
            case 'Flight':
                return <Flight {...iconProps} />;
            case 'Work':
                return <Work {...iconProps} />;
            case 'Security':
                return <Security {...iconProps} />;
            case 'Info':
                return <Info {...iconProps} />;
            case 'Internet':
                return <Internet {...iconProps} />;
            case 'Notification':
                return <Notification {...iconProps} />;
            case 'Edit':
                return <Edit {...iconProps} />;
            default:
                return null;
        }
}
