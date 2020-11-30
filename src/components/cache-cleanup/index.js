import React, { Fragment } from 'react';
import styled from 'styled-components';
import { useClearCache } from 'react-clear-cache';
import { colors } from '../../styles';
import { RippleButton } from '../button';
import { Message } from '../../containers/MessageContainer';

const ClearCacheWrapper = styled.div`
	position: fixed;
	background: ${colors.white};
	padding: 10px;
	left: 0;
	margin: auto;
	bottom: 0;
	border-radius: 4px;
	border-top: 10px solid ${colors.themeColor1};
	z-index: 999;
	display: flex;
	flex-direction: column;
	align-items: center;
    width: 100%;
    
	&.open {
		animation: openPopup 2s ease-out;
    }
    
	@keyframes openPopup {
		0% {
			transform: translateY(50px);
			opacity: 0;
		}

		60% {
			transform: translateY(50px);
			opacity: 0;
		}
		
		100% {
			transform: translateY(0);
			opacity: 1;
		}
	}
`;

export const ClearCache = () => {
	const { isLatestVersion, emptyCacheStorage } = useClearCache();
    
	return (
		<Fragment>
			{!isLatestVersion && (
				<ClearCacheWrapper className={!isLatestVersion ? 'open' : ''}>
					<div>
						<Message>
							Refresh to use the latest version
						</Message>
					</div>
					<RippleButton
						style={{
                            backgroundColor: `${colors.background.component}`,
                            color: `${colors.themeTextColor1}`,
							paddingLeft: 20,
							paddingRight: 20,
							border: `1px solid ${colors.themeColor1}`,
							width: '100%'
						}}
						onClick={e => {
							e.preventDefault();
							emptyCacheStorage();
						}}
					>
						Refresh
					</RippleButton>
				</ClearCacheWrapper>
			)}
		</Fragment>
	);
};