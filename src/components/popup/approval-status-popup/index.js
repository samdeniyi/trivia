import React from "react";
import styled from "styled-components";
import {bool, string, func} from "prop-types";
import {
    PopUp,
    PopUpContent,
    InfoMessage,
    OkayCancelButton,
    InfoHeader
} from "../common";
import {Overlay} from "../../../containers/OverlayContainer";

import FallbackUserAvatar from "../../../assets/user-avater.svg";
import {ReactComponent as PendingUserSVG} from "../../../assets/pending-user.svg";
import {ReactComponent as UnapprovedUserSVG} from "../../../assets/unapproved-user.svg";

import {useSelector} from "react-redux";

const Header = styled(InfoHeader)`
    font-weight: 700;
    margin-bottom: 16px;
`;

const ImageWrapper = styled.div`
    position: relative;
    height: 70px;
`;

const PendingUserImg = styled(PendingUserSVG)`
    position: absolute;
`;

const UnapprovedUserImg = styled(UnapprovedUserSVG)`
    position: absolute;
`;

const Avatar = styled.img`
    width: 73px;
    height: 72px;
    border-radius: ${({radius}) => radius};
    object-fit: ${({objectFit}) => objectFit || "initial"};
    position: absolute;
    left: 35%;
`;

const Space = styled.div`
    height: ${({val}) => val || "10px"};
`;

const ModifiedInfoMessage = styled(InfoMessage)`
    margin-bottom: 20px;
`;

export const ApprovalStatusPopup = ({open, cancel, status}) => {
    const avatar = useSelector(state => state.user.avatar);

    return (
        <>
            {open && (
                <Overlay
                    onClick={cancel}
                    zIndex={"999999"}
                    bgc={"rgba(0, 0, 0, 45%)"}
                />
            )}
            <PopUp open={open} zIndex={"1000000"}>
                <PopUpContent>
                    <Space val={"20px"}/>
                    <ImageWrapper>
                        <Avatar
                            src={avatar || FallbackUserAvatar}
                            alt="User Avatar"
                            objectFit={avatar ? "cover" : "initial"}
                            radius={avatar ? "50%" : ""}
                        />
                        {status === "PENDING" ? (
                            <PendingUserImg></PendingUserImg>
                        ) : (
                            <UnapprovedUserImg></UnapprovedUserImg>
                        )}
                    </ImageWrapper>

                    <Space val={"20px"}/>

                    <Header>
                        {status === "PENDING"
                            ? "Pending Space Force Agent activation"
                            : "Unapproved Space Force Agent activation"}
                    </Header>
                    <ModifiedInfoMessage
                        bottom={"5px"}
                        padding={"0px 16px"}
                        top={"8px"}
                    >
                        {
                            "You can’t carry out this action until your profile has been activated as a Space Force Agent."
                        }
                    </ModifiedInfoMessage>

                    <OkayCancelButton type="button" onClick={cancel}>
                        Okay, got it
                    </OkayCancelButton>
                </PopUpContent>
            </PopUp>
        </>
    );
};

ApprovalStatusPopup.propTypes = {
    open: bool,
    cancel: func,
    status: string
};

