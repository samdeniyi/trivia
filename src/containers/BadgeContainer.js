import styled from 'styled-components';

export const Badge = styled.div`
    position: relative;
    padding: 16px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    opacity: ${({ opacity }) => opacity || '1'};
    width: ${({ embedded }) => embedded ? 'auto' : '100%'};
    min-height: ${({ height }) => height || "82px"};
    margin-top: ${({ top }) => top || null};
    margin-bottom: ${({ bottom }) => bottom || null};
    margin-left: ${({ left }) => left || null};
    margin-right: ${({ right }) => right || null};
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: ${({ background }) => background || null};
    box-shadow: ${({ boxShadow }) => boxShadow && 
        "inset 0 1px 2px 0 #ececf2, 0 8px 16px 0 #ececf2"
    };
    &.sticky_badge {
        position: sticky;
        top: 72px;
        padding: 64px 16px;
        min-height: 0;
        scroll-behavior: smooth;
        transition: width, margin, padding 0.2s linear;
        z-index: 1
    }
    &.firstStep {
        padding: 64px 16px;
    }
    &.secondStep {
        width: calc(100% + 32px);
        margin-left: -16px;
        border-radius: 0;
        box-shadow: inset 0 1px 1px 0 #ececf2, 0 1px 1px 0 #ececf2;
        padding: 34px 16px;
        transition: width, margin, padding 0.2s linear;
    }
    &.thirdStep {
        width: calc(100% + 32px);
        margin-left: -16px;
        border-radius: 0;
        box-shadow: inset 0 1px 1px 0 #ececf2, 0 1px 1px 0 #ececf2;
        padding: 27px 16px;
        transition: width, margin, padding 0.2s linear;
    }
    &.fourthStep {
        width: calc(100% + 32px);
        margin-left: -16px;
        border-radius: 0;
        box-shadow: inset 0 1px 1px 0 #ececf2, 0 1px 1px 0 #ececf2;
        padding: 22px 8px;
        transition: width, margin, padding 0.2s linear;
    }
`;