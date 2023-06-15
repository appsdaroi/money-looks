import { formatToBRL } from 'brazilian-values';

const CentsToReais = (value) => {
    return (formatToBRL((parseInt(value) / 10000).toFixed(2)));
}

const ReaisToCents = (value) => {
    return parseInt(value.toString().replace(/\D/g, '')) * 10000;
}

export { CentsToReais, ReaisToCents }