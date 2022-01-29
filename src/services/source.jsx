import axios from "axios";

const cancelToken = axios.CancelToken;
export const source = cancelToken.source();