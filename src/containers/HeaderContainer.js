import styled from "styled-components";
import { colors } from "../styles";

import { ReactComponent as CloseIcon }    from '../assets/close.svg';
import { ReactComponent as OptionsIcon }  from '../assets/options.svg';
import { ReactComponent as AddIcon }      from '../assets/plus_circle.svg';
import { ReactComponent as SettingsIcon } from '../assets/settings.svg'; 
import { ReactComponent as ClearIcon }    from '../assets/clear.svg';
import { ReactComponent as ReportIcon }   from '../assets/report.svg';
import { ReactComponent as SearchIcon }   from '../assets/search.svg';
import { ReactComponent as FilterIcon }   from '../assets/header_filter.svg';
import { ReactComponent as SortIcon }   from '../assets/sort.svg';

export const Close = styled(CloseIcon)`
    position: absolute;
    right: ${({ right }) => right && "16px"};
    left: ${({ left }) => left && "16px"};
    top: 24px;
    cursor: pointer;

    & > g {
        & > path {
            fill: ${({ color }) => color || colors.black};
        }
    }
`;

export const Options = styled(OptionsIcon)`
    position: absolute;
    right: ${({ right }) => right && "16px"};
    left: ${({ left }) => left && "16px"};
    top: ${({ top }) => top || '24px'};
    cursor: pointer;
`;

export const Add = styled(AddIcon)`
    position: absolute;
    right: ${({ right }) => right && "16px"};
    left: ${({ left }) => left && "16px"};
    top: 24px;
    cursor: pointer;
`;

export const Settings = styled(SettingsIcon)`
    position: absolute;
    right: ${({ right }) => right && "16px"};
    left: ${({ left }) => left && "16px"};
    top: 20px;
    cursor: pointer;
`;

export const Clear = styled(ClearIcon)`
    position: absolute;
    right: ${({ right }) => right && "16px"};
    left: ${({ left }) => left && "16px"};
    top: ${({ top }) => top || "16px"};
    cursor: pointer;
`;

export const Report = styled(ReportIcon)`
    position: absolute;
    right: ${({ right }) => right && "16px"};
    left: ${({ left }) => left && "16px"};
    top: ${({ top }) => top || '24px'};
    cursor: pointer;
`;

export const Search = styled(SearchIcon)`
    position: absolute;
    right: ${({ right }) => right || "16px"};
    left: ${({ left }) => left && "16px"};
    top: ${({ top }) => top || '24px'};
    cursor: pointer;
    transition: all 0.3s ease;
    &.fadeIn {
        transform: scale(0);
        opacity: 0;
        transition: all 0.3s ease;
    }
    &.fadeOut {
        animation: fadeout 0.3s ease-out;
        @keyframes fadeout {
            0% {
                opacity: 0;
                transform: scale(0);    
            }
            
            100% {
                opacity: 1;
                transform: scale(1); 
            }
        }
    }
`;

export const Filter = styled(FilterIcon)`
    position: absolute;
    right: ${({ right }) => right && "16px"};
    left: ${({ left }) => left && "16px"};
    top: ${({ top }) => top || '24px'};
    cursor: pointer;
`;

export const Sort = styled(SortIcon)`
    position: absolute;
    right: ${({ right }) => right && "16px"};
    left: ${({ left }) => left && "16px"};
    top: ${({ top }) => top || '24px'};
    cursor: pointer;
`;