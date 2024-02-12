type CampaignCellProps = {
  cellContent: string | number;
  className?: string | undefined
};

const CampaignCell: React.FC<CampaignCellProps> = ({ cellContent, className }) => {
  return <div className={`text-left w-1/4 ${className}`}>{cellContent}</div>;
};

export default CampaignCell;
