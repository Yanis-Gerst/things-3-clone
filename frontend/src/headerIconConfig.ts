import inboxIcon from "../public/assets/Header-Inbox-Dark@2x 1.png";
import todayIcon from "../public/assets/Header-Today-Dark@2x 1.png";
import incomingIcon from "../public/assets/Header-Scheduled-Dark@2x 1.png";
import anyTimeIcon from "../public/assets/Header-Next@2x 1.png";
import somedayIcon from "../public/assets/Header-Someday@2x 1.png";
import journalIcon from "../public/assets/Header-Logbook-Dark@2x 1.png";
import trashIcon from "../public/assets/Header-Trash-Dark@2x 1.png";
import UnclassifiedPage from "./layout/UnclassifiedPage/UnclassifiedPage";
import TodayPage from "./layout/TodayPage/TodayPage";
import IncomingPage from "./layout/IncomingPage/IncomingPage";

export const headerIconConfigs = [
  {
    icon: inboxIcon,
    content: "À classer",
    bottomSpace: true,
    todosNumber: 2,
    MainComponent: UnclassifiedPage,
  },
  {
    icon: todayIcon,
    content: "Aujourd'hui",
    todosNumber: 3,
    MainComponent: TodayPage,
  },
  {
    icon: incomingIcon,
    content: "À venir",
    MainComponent: IncomingPage,
  },
  {
    icon: anyTimeIcon,
    content: "À tout moment",
  },
  {
    icon: somedayIcon,
    content: "Un jour",
    bottomSpace: true,
  },
  {
    icon: journalIcon,
    content: "Journal",
  },
  {
    icon: trashIcon,
    content: "Corbeille",
  },
];
