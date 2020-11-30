import { colors, fonts } from './variables';

const snackbars = `
    .Toastify__toast {
        font-family: ${fonts.main};
        font-weight: 500;
        font-size: 14px;
    }

    .Toastify__toast--default {
        background: ${colors.themeColor1};
        color: ${colors.gray5};
    }

    .Toastify__toast--info {
        background: ${colors.themeColor1};
    }

    .Toastify__toast--success {
        background: ${colors.green};
    }

    .Toastify__toast--warning {
        background: ${colors.themeColor1};
    }

    .Toastify__toast--error {
        background: ${colors.themeColor1};
    }
`;

export default snackbars;