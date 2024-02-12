import React from 'react';
import CampaignCell from "../campaignCell";

interface HeaderItemProps {
  headerTitles: string[];
}

const Header: React.FC<HeaderItemProps> = ({ headerTitles }) => {
  return (
    <div className="flex flex-row justify-between items-center gap-4 p-5 bg-white shadow-md">
      {headerTitles.map((title, index) => (
        <CampaignCell
          key={index}
          cellContent={title}
          className="text-sm text-gray-800"
        />
      ))}
    </div>
  );
};

export default Header;