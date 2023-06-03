import axios, { Axios, AxiosHeaders } from "axios";
import { HttpLibrary } from "../../interfaces/httpLibrary.interface";

const headers = new AxiosHeaders();
headers.set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36');
headers.set('Accept-Language', 'en-US,en;q=0.9,fr;q=0.8');
headers.set('Accept-Encoding', 'gzip, deflate, br');
headers.set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8');
headers.set('Connection', 'keep-alive');

const axiosLibrary: HttpLibrary = {
    
    headers : headers,
    async get(url: string, headers?: object): Promise<any> {
      return await axios.get(url, { headers });
    },
  
    async post(url: string, data: any, headers?: object): Promise<any> {
      return await axios.post(url, data, { headers });
    },
};

export default axiosLibrary;