export interface HttpLibrary {
    headers : any,
    get(url: string, headers?: object): Promise<any>;
    post(url: string, data: any, headers?: object): Promise<any>;
}
  