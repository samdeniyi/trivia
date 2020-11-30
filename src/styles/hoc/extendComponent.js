import styled from 'styled-components';

export const ExtendComponent = (Component, styles) => {
    return styled(Component)`
        ${styles};
    `;
};