
import React, { Component,forwardRef }  from 'react';


import AddBox from '@mui/icons-material/AddBox';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import Check from '@mui/icons-material/Check';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Clear from '@mui/icons-material/Clear';
import DeleteOutline from '@mui/icons-material/DeleteOutlineOutlined';
import Edit from '@mui/icons-material/EditOutlined';
import FilterList from '@mui/icons-material/FilterList';
import FirstPage from '@mui/icons-material/FirstPage';
import LastPage from '@mui/icons-material/LastPage';
import Remove from '@mui/icons-material/Remove';
import SaveAlt from '@mui/icons-material/SaveAlt';
import SaveIcon from '@mui/icons-material/Save';
import Search from '@mui/icons-material/Search';
import ViewColumn from '@mui/icons-material/ViewColumn';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import ImportExportIcon from '@mui/icons-material/ImportExportOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import TelegramIcon from '@mui/icons-material/Telegram';
import RefreshIcon from '@mui/icons-material/Refresh';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import PaymentIcon from '@mui/icons-material/Payment';
import GetAppIcon from '@mui/icons-material/GetApp';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import EventIcon from '@mui/icons-material/Event';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
 
export const TableIcons = {
    
    RefreshIcon: forwardRef((props, ref) => <RefreshIcon {...props} ref={ref} />),
    Add: forwardRef((props, ref) => <AddBox  {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    LibraryAddCheckIcon: forwardRef((props, ref) => <LibraryAddCheckIcon {...props} ref={ref} />),
    IndeterminateCheckBoxIcon: forwardRef((props, ref) => <IndeterminateCheckBoxIcon {...props} ref={ref} />),
    ImportExportIcon: forwardRef((props, ref) => <ImportExportIcon {...props} ref={ref} />),
    VisibilityOutlinedIcon: forwardRef((props, ref) => <VisibilityOutlinedIcon {...props} ref={ref} />),
    MailOutlineIcon: forwardRef((props, ref) => <MailOutlineIcon {...props} ref={ref} />),
    AssignmentIndIcon: forwardRef((props, ref) => <AssignmentIndIcon {...props} ref={ref} />),
    TelegramIcon: forwardRef((props, ref) => <TelegramIcon {...props} ref={ref} />),
    FormatListNumberedRtlIcon: forwardRef((props, ref) => <FormatListNumberedRtlIcon {...props} ref={ref} />),
    PaymentIcon: forwardRef((props, ref) => <PaymentIcon {...props} ref={ref} />),
    GetAppIcon: forwardRef((props, ref) => <GetAppIcon {...props} ref={ref} />),
    AutorenewIcon: forwardRef((props, ref) => <AutorenewIcon {...props} ref={ref} />),
    PhoneInTalkIcon:forwardRef((props, ref) => <PhoneInTalkIcon {...props} ref={ref} />),
    EventIcon:forwardRef((props, ref) => <EventIcon {...props} ref={ref} />),
    AccountCircleIcon:forwardRef((props, ref) => <AccountCircleIcon {...props} ref={ref} />),
    SaveIcon:forwardRef((props, ref) => <SaveIcon {...props} ref={ref} />),
    MonetizationOnIcon:forwardRef((props, ref) => <MonetizationOnIcon {...props} ref={ref} />)

    
    
  };
export const LocalizationTable = {
    pagination: {
        labelDisplayedRows: '{from}-{to} of {count}'
    },
    toolbar: {
        nRowsSelected: '{0} fila(s) seleccionada',
        searchPlaceholder:'Buscar'
    },
    pagination:{
        labelRowsSelect: 'filas',
    } ,
    header: {
        actions: ''
    },
    body: {
        emptyDataSourceMessage: 'No hay datos por mostrar',
        filterRow: {
            filterTooltip: 'Filter'
        }
    }
}

export const removeAccent = (str) => {

    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }