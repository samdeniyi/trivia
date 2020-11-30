import React from 'react';
import styled from 'styled-components';
import { colors } from '../../styles';
import { string, any } from 'prop-types';

export const Logo = styled.div`
    width: ${({ width }) => width || '72px'};
    height: ${({ height }) => height || '72px'};
    border-radius: ${({ borderRadius }) => borderRadius || '50%'};
    background: ${({ background }) => background || colors.background.logo};
    margin-top: ${({ top }) => top || "0px"};
    margin: ${({ margin }) => margin || null};
    overflow: hidden;
`;

export const LogoImage = styled.div`
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ImageWithFallback = styled.img`
    width: ${({ iconWidth }) => iconWidth || '48px'};
    height: ${({ iconHeight }) => iconHeight || '48px'};
    background-image: ${({ fallback }) => `url(${fallback})` || null};
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    object-fit: ${({ objectFit }) => objectFit || 'initial'};
`;

export const PageLogo = ({ 
    Icon,
    iconWidth,
    iconHeight,
    borderRadius,
    background, 
    width, 
    height,
    top,
    margin,
    id,
    fallback,
    objectFit,
    onError,
    className
}) => {
    return (
        <Logo 
            width={width} 
            borderRadius={borderRadius} 
            iconWidth={iconWidth} 
            iconHeight={iconHeight} 
            height={height}
            top={top}
            margin={margin}
            background={background}
            className={className}
        >
            <LogoImage onError={(e)=> {
                        e.target.src = fallback || " "
                    }}>
                <ImageWithFallback
                    fallback={fallback || null}
                    id={id || null} 
                    src={Icon}
                    iconWidth={iconWidth}
                    iconHeight={iconHeight}
                    alt={""}
                    objectFit={objectFit}
                />
            </LogoImage>
        </Logo>
    );
};

PageLogo.propTypes = {
    Icon:       string.isRequired,
    iconWidth:  string,
    iconHeight: string,
    id:         string,
    background: string,
    width:      string,
    height:     string,
    top:        string,
    fallback:   string,
    onError:    any
};