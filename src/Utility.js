import { toast } from "react-toastify";

class Utility {

    /**
     *  Opens the redirected link in a new tab.
     *  @param String redirected link
     */
    static openInNewTab = (url) => {
        var win = window.open(url, "_tab");
        win.focus();
    }

    /**
     *  Handler to trace errors in Http Redirects.
     *  @param Response Http Response
     *  @return Response 
     */
    static handleRedirect = (response) => {
        if (response.status >= 300 && response.status <= 307) {
            Utility.notifySuccess("URL redirected...");
        } else {
            throw Error("Server Returned: " + response.status);
        }
        return response;
    }

    /**
     *  Handler to trace errors in Http Responses.
     *  @param Response Http Response
     *  @return Response 
     */
    static handleErrors = (response) => {
        if (!response.ok) {
            throw Error("Server Returned: " + response.status);
        }
        return response;
    }

    /**
     *  Toasts a message on UI as Error
     *  @param String message to be notified
     */
    static notifyError = (message) => {
        toast.error(message);
    }

    /**
     *  Toasts a message on UI as Success
     *  @param String message to be notified
     */
    static notifySuccess = (message) => {
        toast.success(message);
    }

    /**
     *  Checks the validity of an URL
     *  @param String URL String
     *  @return boolean
     */
    static isValidURL = (str) => {
        let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(str)) {
            return true;
        } else {
            return false;
        }
    }

}

export default Utility;