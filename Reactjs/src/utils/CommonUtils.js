import { reject } from "lodash";
import { resolveModuleName } from "typescript";
import { NumericFormat } from 'react-number-format';
import LoadingOverlay from 'react-loading-overlay';
import jwtDecode from 'jwt-decode';

class CommonUtils {
    static convertBlobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = () => reject(new Error('Error converting Blob to Base64'))
            reader.readAsDataURL(blob);
        });
    };

    static convertBase64ToBinary(base64Image) {
        if (!base64Image) {
            throw new Error('No image provided');
        }

        const binaryData = Buffer.from(base64Image, 'base64');
        // console.log('>>>check image:', binaryData)
        return binaryData;
    }
    static numberFormat = (number, suffix, widthPx) => {
        return <NumericFormat
            type="text"
            value={number}
            thousandsGroupStyle="thousand"
            thousandSeparator=","
            suffix={suffix}
            disabled
            style={{ border: 'none', backgroundColor: 'transparent', width: widthPx }} />
    }
    static convertToTimestamp = (dateString) => {
        //date type: yyyy-mm-dd
        const [year, month, day] = dateString.split('-');
        const timestamp = new Date(year, month - 1, day).getTime();
        return timestamp;
    };
    static getIdOrRoleFromToken = (inputToken, IdOrRole) => {
        let decodedToken = jwtDecode(inputToken);
        let result = IdOrRole === 'id' ? decodedToken.id : IdOrRole === 'role' ? decodedToken.roleId : null;
        return result
    }
}


export default CommonUtils;