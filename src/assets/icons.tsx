import React from 'react';
import {
  Icon,
  IconElement,
  Button
} from '@ui-kitten/components';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrashAlt,faEllipsisH,faCog, faWrench, faSearchMinus, faPaperPlane, faUser,faUserPlus,faUserSlash, faStethoscope, faCommentAlt,
         faCarBattery,faRing, faFilter, faChartPie,faUserTie,faUserSecret, faFolder, faFolderPlus, faFolderMinus, faImages, faCodeBranch, 
         faSave, 
         faInfoCircle,
         faTachometerAlt,
         faExclamationTriangle,faCalendarAlt,
         faFileInvoice,
         faPercent,
         faCalendarDay,
         faFileSignature,
         faClipboardCheck,
         faFileContract,
         faStopwatch,
         faUserClock,
         faArrowAltCircleLeft,
         faChevronRight,
         faHashtag
         } from '@fortawesome/free-solid-svg-icons'

import { Alert,ToastAndroid } from 'react-native';


export const Contract__Icon = ()=><FontAwesomeIcon icon={ faFileContract } size={ 48 } color={'#007bff'} /> //primary
export const ClipboardCheck__Icon = ()=><FontAwesomeIcon icon={ faClipboardCheck } size={ 48 } color={'#28a745'} />//success
export const INFO__Icon = (props)=><FontAwesomeIcon icon={ faInfoCircle } size={ 32 } color={props.color} />
export const Alert__Icon = (props)=><FontAwesomeIcon icon={ faExclamationTriangle} size={ 32 } color={props.color} />
export const Tachometer__Icon = ()=><FontAwesomeIcon icon={ faTachometerAlt} size={ 24} color={"#17a2b8"}  />
export const ToolsIcon = ()=><FontAwesomeIcon icon={ faWrench } size={ 32 } color={"#17a2b8"} />
export const CalendarAlt_Icon = ()=><FontAwesomeIcon icon={ faCalendarAlt } size={ 32 } color={"#17a2b8"} />
export const CalendarDate_Icon = ()=><FontAwesomeIcon icon={ faCalendarDay } size={ 32 } color={"#17a2b8"} />
export const Percent_Icon = ()=><FontAwesomeIcon icon={ faPercent } size={ 32 } color={"#17a2b8"} />
export const Hash_Icon = ()=><FontAwesomeIcon icon={ faHashtag } size={ 32 } color={"#17a2b8"} />
export const File_InvoiceIcon = ()=><FontAwesomeIcon icon={ faFileInvoice } size={ 32 } color={"#17a2b8"} />
export const Tools_Icon = (props)=><FontAwesomeIcon icon={ faWrench } size={ 32 } color={props.color===undefined?"#dc3545":props.color} />//danger
export const CogsIcon = ()=><FontAwesomeIcon icon={ faCog }  size={ 24 } color={"white"} />

export const TrashAltIcon = ()=><FontAwesomeIcon icon={ faTrashAlt } size={ 24 } color="red" />
export const CommentIcon = ()=><FontAwesomeIcon icon={ faCommentAlt } size={ 24 } color={"#ffc107"} />
export const SendIcon = ()=><FontAwesomeIcon icon={ faPaperPlane } size={ 24 } color={"#ffc107"}  />
export const MenusCilcleIcon = ()=><FontAwesomeIcon icon={ faSearchMinus } size={ 32 } color={"#ffc107"} />
export const CarBaterryIcon = ()=><FontAwesomeIcon icon={  faCarBattery} size={ 32 } color={"#ffc107"} />
export const TireIcon = ()=><FontAwesomeIcon icon={  faRing} size={ 32 } color={"#42a5f5"} />
export const OthersIcon = ()=><FontAwesomeIcon icon={ faEllipsisH} size={ 32 } color={"#3E4551"} />
export const FilterIcon = ()=><FontAwesomeIcon icon={ faFilter} size={ 32 } color={'#d9534f'} />
export const ChartPieIcon = ()=><FontAwesomeIcon icon={ faChartPie} size={ 32 } color={'#00695c'} />
export const UserTIE_Icon = ()=><FontAwesomeIcon icon={ faUserTie} size={ 32 } color={'#d9534f'} />
export const UserSecret_Icon = ()=><FontAwesomeIcon icon={ faUserSecret} size={ 32 } color={'#00695c'} />
export const User_Icon = ()=><FontAwesomeIcon icon={ faUser} size={ 32 } color={'#868e96'} />
export const UserPlus_Icon = ()=><FontAwesomeIcon icon={ faUserPlus} size={ 32 } color={'#007bff'} />
export const UserSlash_Icon = ()=><FontAwesomeIcon icon={ faUserSlash} size={ 32 } color={'#d9534f'} />
export const UserStetoscope_Icon = (props)=><FontAwesomeIcon icon={ faStethoscope} size={ 32 } color={props.color===undefined?'#dc3545':props.color} />
export const Folder_Icon = ()=><FontAwesomeIcon icon={ faFolder} size={ 32 } color={'#868e96'} />
export const FolderPlus_Icon = (props)=><FontAwesomeIcon icon={ faFolderPlus} size={ 48 } color={props.color} />
export const FolderSlash_Icon = (props)=><FontAwesomeIcon icon={ faFolderMinus} size={ 32 } color={props.color} />
export const Images_Icon = (props)=><FontAwesomeIcon icon={ faImages} size={ 32 } color={props.color===null?'#17a2b8':props.color} />
export const CodeBranch_Icon = (props)=><FontAwesomeIcon icon={ faCodeBranch} size={ 24 } color={props.color===null?'#17a2b8':props.color} />
export const Save_Icon = ()=><FontAwesomeIcon icon={ faSave} size={ 48 } color={'#28a745'} />
export const Save_PRO_Icon = (props)=><FontAwesomeIcon icon={ faSave} size={ props.size } color={props.color} />
export const FileSignature_Icon = ()=><FontAwesomeIcon icon={ faFileSignature} size={ 24 } color={'#28a745'} />
export const ArrowLeft_Icon = (props)=><FontAwesomeIcon icon={ faArrowAltCircleLeft} size={props.size} color={props.color} />
export const ArrowRight_Icon = (props)=><FontAwesomeIcon icon={ faChevronRight} size={props.size} color={props.color} />
export const StopWatch_Icon = (props)=><FontAwesomeIcon icon={faStopwatch} size={48} color={props.color} />
export const StopWatch_IconMenu = (props)=><FontAwesomeIcon icon={faStopwatch} size={25} color={props.color} />
export const UserWatch_Icon = ()=><FontAwesomeIcon icon={faUserClock} size={48} color={"#007bff"} />
export const User_Watch_Icon = ()=><FontAwesomeIcon icon={faUserClock} size={25} style={{marginLeft:25}} color={"#007bff"} />
export const Stetoscope_Icon = ()=><FontAwesomeIcon icon={ faStethoscope} size={ 16 } style={{padding:30}} color={"#adb5bd"} />

export const Clock_Icon = (style): IconElement => <Icon {...style}   name='clock-outline' />
export const Alert_Icon = (style): IconElement => <Icon {...style}   name='alert-circle-outline' />



export const Briefcase_Icon = (style): IconElement => (
  <Icon {...style} name='briefcase-outline' />
);
export const UnLock_Icon = (style): IconElement => (
  <Icon {...style} name='unlock-outline' />
);
export const Lock_Icon = (style): IconElement => (
  <Icon {...style} name='lock-outline' />
);

export const Add_User_Icon = (style): IconElement => (
  <Icon {...style} name='person-add-outline' />
);
export const BookmarkIcon = (style): IconElement => (
  <Icon {...style} name='bookmark-outline' />
);
export const Chevron_Left_Icon = (style): IconElement => (
  <Icon {...style} name='arrowhead-left-outline' />
);
export const Chevron_Right_Icon = (style): IconElement => (
  <Icon {...style} name='arrowhead-right-outline' />
);
export const AttachIcon  = (style): IconElement => (
  <Icon {...style} name='attach-2-outline' />
);

export const Close_Icon = (style): IconElement => (
  <Icon {...style} name='close-circle-outline'/>
);
export const Upload_Icon = (style): IconElement => (
  <Icon {...style} name='cloud-upload-outline'/>
);
export const List_Icon = (style): IconElement => (
  <Icon {...style} name='list-outline'/>
);
export const Camera_Icon = (style): IconElement => (
  <Icon {...style} name='camera'/>
);
export const Info_Icon = (style): IconElement => (
  <Icon {...style} name='info'/>
);
export const Checkmark_Icon = (style): IconElement => (
  <Icon {...style} name='checkmark'/>
);
export const BulbIcon = (style): IconElement => (
  <Icon {...style} name='bulb'/>
);
export const PaperPlane_Icon = (style): IconElement => (
  <Icon {...style} name='paper-plane'/>
);

export const CloseIcon = (style): IconElement => (
  <Icon {...style}  name='close-outline'/>
);
export const EditIcon = (style): IconElement => (
  <Icon {...style} name='edit-2-outline'/>
);
export const EditIcon_1 = (style): IconElement => (
  <Icon {...style} name='edit-outline'/>
);
export const File_AddIcon = (style): IconElement => (
  <Icon {...style} name='file-add'/>
);
export const FolderIcon = (style): IconElement => (
  <Icon {...style} name='folder'/>
);
export const CogIcon = (style): IconElement => (
  <Icon {...style} name='settings'/>
);
export const CarIcon = (style): IconElement => (
  <Icon {...style} name='car'/>
);

export const BackIcon = (style): IconElement => (
  <Icon {...style} name='arrow-back'/>
);
export const Calendar_Icon = (style): IconElement => (
  <Icon {...style} name='calendar-outline'/>
);

export const LayoutIcon = (style): IconElement => (
  <Icon {...style} name='layout-outline'/>
);

export const PersonIcon = (style): IconElement => (
  <Icon {...style} name='person-outline'/>
);
export const PersonBlueIcon = (style): IconElement => (
  <Icon {...style} fill='#007bff' name='person-outline'/>
);
export const MoreVerticalIcon = (style): IconElement => (
  <Icon {...style} name='more-vertical'/>
);

export const LogoutIcon = (style): IconElement => (
  <Icon {...style} name='log-out-outline'/>
);

export const InfoIcon = (style): IconElement => (
  <Icon {...style} name='info-outline'/>
);
export const SaveIcon = (style): IconElement => (
  <Icon {...style}  name='save-outline'/>
);
export const AlertTriangleIcon = (style): IconElement => (
  <Icon {...style} name='alert-triangle-outline'/>
);

export const EyeIcon = (style): IconElement => (
  <Icon {...style} name='eye-outline'/>
);
export const LayersIcon = (style): IconElement => (
  <Icon {...style} name='layers-outline'/>
);
export const EyeOffIcon = (style): IconElement => (
  <Icon {...style} name='eye-off-outline'/>
);

export const MenuIcon = (style): IconElement => (
  <Icon {...style} name='menu-outline'/>
);

export const HomeIcon = (style): IconElement => (
  <Icon {...style} name='home-outline'/>
);

export const DoneIcon = (style): IconElement => (
  <Icon {...style} name='checkmark-outline'/>
);

export const DoneAllIcon = (style): IconElement => (
  <Icon {...style} name='done-all-outline'/>
);

export const GridIcon = (style): IconElement => (
  <Icon {...style} name='grid-outline'/>
);

export const RefreshIcon = (style): IconElement => (
  <Icon {...style} name='refresh'/>
);
export const SearchIcon = (style): IconElement => (
  <Icon {...style} name='search-outline'/>
);

export const PlusIcon = (style): IconElement => (
  <Icon {...style} name='plus-outline'/>
);

export const CloseCircleIcon = (style): IconElement => (
  <Icon   width={62} height={62} fill='#d9534f' name='close-circle-outline'/>
);

export const LoaderIcon= (style): IconElement => (
  <Icon   {...style}  name='loader-outline'/>
)

export const TrashIcon= (style): IconElement => (
  <Icon   {...style}  name='trash-outline'/>
)

export const TrashButton= (props)=>{
  return <Button icon={TrashIcon} appearance={props.appe!==undefined?props.appe:"ghost"} status="danger" onPress={()=>Alert.alert(
                                                                                                  'Delete Labor',
                                                                                                  'Do you want to delete the row, think twice',
                                                                                                  [
                                                                                                    {
                                                                                                      text: 'Cancel',
                                                                                                      onPress: () => console.log('Cancel Pressed'),
                                                                                                      style: 'cancel',
                                                                                                    },
                                                                                                    {text: 'OK', onPress: () =>{props.deleteFunc()},
                                                                                                   },
                                                                                                  ],
                                                                                                  {cancelable: false},
                                                                                                )}></Button>
}



