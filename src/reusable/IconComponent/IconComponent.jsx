import React from "react";
import {
  FaUmbrellaBeach,
  FaUserClock,
  FaHome,
  FaHospitalUser,
  FaPassport,
  FaUserEdit,
  FaUserCircle,
  FaDownload,
  FaUser,
  FaCloudUploadAlt,
  FaEdit,
  FaTrashAlt,
  FaPhoneAlt,
  FaSearch,
  FaComment,
  FaRegCreditCard,
  FaFacebook,
  FaGithub,
  FaCheckCircle,
  FaRegStar,
  FaRegBookmark,
  FaPowerOff,
  FaArrowRight,
  FaBiohazard,
  FaFileUpload,
} from "react-icons/fa";
import {
  IoIosPeople,
  IoIosApps,
  IoMdAdd,
  IoMdCloudUpload,
  IoIosWarning,
  IoIosCloseCircle,
  IoMdPrint,
  IoMdMail,
} from "react-icons/io";
import {
  IoDocument,
  IoDocumentsOutline,
  IoHome,
  IoNotifications,
  IoSettingsSharp,
} from "react-icons/io5";
import {
  GiMoneyStack,
  GiTakeMyMoney,
  GiPayMoney,
  GiReceiveMoney,
  GiDiamondTrophy,
  GiStairsGoal,
  GiProcessor,
  GiArchiveRegister,
  GiTeacher,
} from "react-icons/gi";
import {
  MdOutlineDataThresholding,
  MdCastForEducation,
  MdOutlineFamilyRestroom,
  MdOutlineHealthAndSafety,
  MdOutlineFlight,
  MdWorkHistory,
  MdDelete,
  MdEditSquare,
  MdOutlineWork,
  MdAddAPhoto,
  MdOutlinePendingActions,
  MdManageAccounts,
  MdMenuOpen,
  MdOutlineDataset,
  MdOutlineMail,
  MdTableRows,
  MdAddBox,
  MdPhoneInTalk,
  MdDashboard,
} from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { CiCalendarDate } from "react-icons/ci";
import { IoSettingsOutline, IoHomeOutline } from "react-icons/io5";
import {
  BsBank,
  BsPersonVcard,
  BsFillBookmarkCheckFill,
  BsFillBookmarkXFill,
  BsThreeDotsVertical,
  BsThreeDots,
  BsShop,
} from "react-icons/bs";
import {
  FaComputer,
  FaHandshakeSimple,
  FaFilter,
  FaArrowLeft,
  FaCircleCheck,
  FaMoneyBillTrendUp,
  FaArrowUp,
  FaBuildingUser,
  FaPersonSkating,
  FaWpforms,
  FaRegUser,
  FaCartShopping,
  FaSquareInstagram,
  FaLocationDot,
  FaCircleInfo,
} from "react-icons/fa6";
import { TbLanguageKatakana, TbReport } from "react-icons/tb";
import { GrCertificate, GrServices } from "react-icons/gr";
import { SiAwsorganizations } from "react-icons/si";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BiCommentAdd, BiTask } from "react-icons/bi";
import { FcDataConfiguration, FcIphone } from "react-icons/fc";
import { FaHistory } from "react-icons/fa";
import { MdOutlineNoteAlt, MdOutlineCancel } from "react-icons/md";
import { LiaNotesMedicalSolid } from "react-icons/lia";
import {
  RiCheckboxBlankLine,
  RiHomeOfficeFill,
  RiTestTubeFill,
} from "react-icons/ri";
import { LuBaby } from "react-icons/lu";
import {
  PiExportBold,
  PiExportFill,
  PiMathOperationsBold,
} from "react-icons/pi";
import { HiOutlineBuildingOffice2, HiQueueList } from "react-icons/hi2";

import { FiPhone } from "react-icons/fi";
import { CustomTooltip } from "../CustomToolTip/CustomToolTip";
import { HiDocumentReport } from "react-icons/hi";

const iconComponents = {
  IoHome,
  FaUserEdit,
  MdOutlineNoteAlt,
  IoHomeOutline,
  MdEditSquare,
  IoSettingsOutline,
  MdOutlineCancel,
  GrCertificate,
  SiAwsorganizations,
  MdOutlineFlight,
  MdWorkHistory,
  BsBank,
  BsPersonVcard,
  IoIosPeople,
  FaRegUser,
  FaComputer,
  FaHandshakeSimple,
  TbLanguageKatakana,
  CiCalendarDate,
  FaUmbrellaBeach,
  GiTakeMyMoney,
  GiPayMoney,
  GiMoneyStack,
  FaUserClock,
  FaHome,
  FaHospitalUser,
  FaPassport,
  GiReceiveMoney,
  MdOutlineDataThresholding,
  HiOutlineBuildingOffice2,
  AiOutlineLogout,
  MdCastForEducation,
  MdOutlineFamilyRestroom,
  MdOutlineHealthAndSafety,
  IoIosApps,
  GiDiamondTrophy,
  GiStairsGoal,
  FaEye,
  FaEyeSlash,
  FaFilter,
  BiCommentAdd,
  BsFillBookmarkCheckFill,
  BsFillBookmarkXFill,
  FcDataConfiguration,
  FaHistory,
  IoMdAdd,
  IoMdCloudUpload,
  MdDelete,
  FaArrowLeft,
  IoIosWarning,
  IoIosCloseCircle,
  IoMdPrint,
  GiProcessor,
  FaCircleCheck,
  IoDocument,
  FaUserCircle,
  FaUser,
  LiaNotesMedicalSolid,
  RiHomeOfficeFill,
  FaMoneyBillTrendUp,
  LuBaby,
  MdOutlineWork,
  MdAddAPhoto,
  FaArrowUp,
  IoMdMail,
  PiExportFill,
  FaDownload,
  MdOutlinePendingActions,
  MdManageAccounts,
  FaBuildingUser,
  GiArchiveRegister,

  FaPersonSkating,
  GiTeacher,
  TbReport,
  IoDocumentsOutline,
  FaCloudUploadAlt,
  MdMenuOpen,
  FaWpforms,
  IoHomeOutline,
  FaEdit,
  FaTrashAlt,
  BsThreeDotsVertical,
  IoSettingsSharp,
  MdOutlineDataset,
  BsThreeDots,
  MdOutlineMail,
  RiCheckboxBlankLine,
  FaPhoneAlt,
  FiPhone,
  FaSearch,
  MdTableRows,
  MdAddBox,
  BiTask,
  PiExportBold,
  FaComment,
  FaRegCreditCard,
  FaCartShopping,
  IoNotifications,
  FaFacebook,
  FaGithub,
  FaSquareInstagram,
  FaLocationDot,
  MdPhoneInTalk,
  FaCircleInfo,
  GrServices,
  BsShop,
  FaCheckCircle,
  FaRegStar,
  FaRegBookmark,
  FaPowerOff,
  RiTestTubeFill,
  FaArrowRight,
  PiMathOperationsBold,
  FaBiohazard,
  MdDashboard,
  HiQueueList,
  FaFileUpload,
  HiDocumentReport,
};

const DynamicIcon = ({
  iconName,
  color = "",
  size = 24,
  onClickHandel,
  iconTooltipTitle = "",
  iconTooltipPlacement = "bottomRight",
  className = "",
}) => {
  const IconComponent = iconComponents[iconName];

  if (!IconComponent) {
    console.error(`Icon "${iconName}" not found`);
    return null;
  }

  return !color ? (
    <span
      className={`cursor-pointer text-iconLightGray hover:text-iconHoverColor transition-colors duration-300`}
      onClick={onClickHandel}
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontSize: `${size}px`,
      }}
    >
      <CustomTooltip title={iconTooltipTitle} placement={iconTooltipPlacement}>
        <IconComponent />
      </CustomTooltip>
    </span>
  ) : (
    <CustomTooltip title={iconTooltipTitle} placement={iconTooltipPlacement}>
      <IconComponent
        color={color}
        size={size}
        className={className}
        onClick={onClickHandel}
      />
    </CustomTooltip>
  );
};

export default DynamicIcon;
