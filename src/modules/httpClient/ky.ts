import { HttpLibrary } from "../../interfaces/httpLibrary.interface";
import ky from "ky";
import { KyHeadersInit } from "ky/distribution/types/options";


const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Connection': 'keep-alive',
}
const kyLibrary: HttpLibrary = {
    headers : headers,
    async get(url: string, headers?: object): Promise<any> {
      return await ky.get(url, { headers:headers as KyHeadersInit }).text();
    },
  
    async post(url: string, data: any, headers?: object): Promise<any> {
      return await ky.post(url, { json: data, headers:headers as KyHeadersInit }).text();
    }
  };