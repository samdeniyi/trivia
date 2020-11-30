import React, { useState } from 'react';
import styled from 'styled-components';
import { string, bool, func, object } from 'prop-types';
import { colors, fonts } from '../../../styles';
import { listToAlphabetMap } from '../../../utils/sorting/alphabeticSort';
import { SelectedLabel } from '../../label';
import { InputLabelBlock } from '../../../containers/InputContainer';
import { SortedSelectOverlay } from '../../overlays/sorted-select-overlay';
import { ReactComponent as ChevronIcon } from '../../../assets/chevron_down.svg';

const LabelsSelectBlock = styled(InputLabelBlock)`
    margin-bottom: 0;
    cursor: pointer;
    font-family: ${fonts.main};
    font-size: 14px;
    color: #56636d80;
    border-color:  ${({ color }) => color || ""}

`;

const OpenOverlayButton = styled(ChevronIcon)`
    position: absolute;
    right: 16px;
    top: 8px;
    margin: 10px 0;
    cursor: pointer;
`;

const SelectedLabelsBlock = styled.div`
    min-height: 56px;
    padding: 8px 16px;
    background-color: ${colors.themeColor3}70;
    margin: 0;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
`;

const LabelsList = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(124px, min-content));
    grid-column-gap: 24px;
    grid-row-gap: 16px;
`;

const SelectLabels = styled.div`
    position: relative;

    & + .form-error {
        color: ${colors.red};
        font-size: 12px;
        font-family: ${fonts.main};
        margin-top: 0;
    }
`;

export const MultipleLabelsSelect = ({
    name,
    title,
    setValue,
    selectedLabels,
    sortedList,
    errors
}) => {
    const [openSelectOverlay, setOpenSelectOverlay] = useState(false);
    
    return (
        <SelectLabels>
            <LabelsSelectBlock onClick={() => setOpenSelectOverlay(!openSelectOverlay)} color={errors? "red": ""}>
                {title}
                <OpenOverlayButton />
            </LabelsSelectBlock>
            {(selectedLabels.current.length > 0) && (
                <SelectedLabelsBlock>
                    <LabelsList>
                    {selectedLabels.current.map((label, index) => (
                        <SelectedLabel
                            key={index} 
                            text={label} 
                            removeLabel={() => {
                                const removedLabel = 
                                    selectedLabels.current.filter(selectedLabel => selectedLabel !== label);
                                selectedLabels.current = removedLabel;
                                setValue(name, removedLabel);
                            }}
                        />
                    ))}
                    </LabelsList>
                </SelectedLabelsBlock>
            )}
            <SortedSelectOverlay
                name={name}
                open={openSelectOverlay}
                title={title}
                setValue={setValue}
                selectedLabels={selectedLabels}
                sortedList={listToAlphabetMap(sortedList)}
                setOpen={() => setOpenSelectOverlay(!openSelectOverlay)}
            />
        </SelectLabels>
    );
};

MultipleLabelsSelect.propTypes = {
    name:                 string,
    selectedLabels:       object,
    openSelectOverlay:    bool,
    setOpenSelectOverlay: func
};