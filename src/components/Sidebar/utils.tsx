import {
  GoRepo as BookIcon,
  GoPackage as BoxIcon,
  GoCalendar as CalendarIcon,
  GoCodeSquare as CodeIcon,
  GoDatabase as DataBaseIcon,
  GoFileDirectory as FolderIcon,
  GoHeart as HeartIcon,
  GoHome as HomeIcon,
  GoPin as PinIcon,
  GoStar as StarIcon,
  GoTrophy as TrophyIcon,
} from "react-icons/go";
import { IoBriefcaseOutline as WorkIcon } from "react-icons/io5";
import { PiHammer as HammerIcon } from "react-icons/pi";
import { VscGame as GameIcon } from "react-icons/vsc";

export const ICON_DICTIONARY: { [key: string]: React.ReactNode } = {
  ["home"]: <HomeIcon />,
  ["work"]: <WorkIcon />,
  ["code"]: <CodeIcon />,
  ["book"]: <BookIcon />,
  ["game"]: <GameIcon />,
  ["heart"]: <HeartIcon />,
  ["star"]: <StarIcon />,
  ["hammer"]: <HammerIcon />,
  ["calendar"]: <CalendarIcon />,
  ["db"]: <DataBaseIcon />,
  ["folder"]: <FolderIcon />,
  ["pin"]: <PinIcon />,
  ["trophy"]: <TrophyIcon />,
  ["box"]: <BoxIcon />,
};
