import { request, expect } from "@playwright/test";
export class ApiHelper {
  async makeRequest(
    method: string,
    requestUrl: string,
    headers?: any,
    requestBody?: any,
    queryParams?: any
  ) {
    const contextRequest = await request.newContext();
    const options: Record<string, any> = { headers };
    // Apend query parameters to the URL if provided
    if (queryParams && Object.keys(queryParams).length > 0) {
      const url = new URL(requestUrl);
      Object.keys(queryParams).forEach((key) => {
        url.searchParams.append(key, queryParams[key]);
      });
      requestUrl = url.toString();
      console.log(`Request Url; ${requestUrl}`);
    }
    if (requestBody) {
      options.data = requestBody;
    }

    let response;
    switch (method.toUpperCase()) {
      case "GET":
        response = await contextRequest.get(requestUrl, options);
        break;
      case "POST":
        response = await contextRequest.post(requestUrl, options);
        break;
      case "PUT":
        response = await contextRequest.put(requestUrl, options);
        break;
      case "PATCH":
        response = await contextRequest.patch(requestUrl, options);
        break;
      case "DELETE":
        response = await contextRequest.delete(requestUrl, options);
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
    if (!response.ok()) {
      throw new Error(`Request failed with status ${response.status()}`);
    }
    return await response.json();
  }

  async getRequest(requestUrl: string, headers?: any, queryParams?: any) {
    return await this.makeRequest(
      "GET",
      requestUrl,
      headers,
      undefined,
      queryParams
    );
  }
  async postRequest(
    requestUrl: string,
    headers?: any,
    requestBody?: any,
    queryParams?: any
  ) {
    return await this.makeRequest(
      "POST",
      requestUrl,
      headers,
      requestBody,
      queryParams
    );
  }

  async putRequest(
    requestUrl: string,
    headers?: any,
    requestBody?: any,
    queryParams?: any
  ) {
    return await this.makeRequest(
      "PUT",
      requestUrl,
      headers,
      requestBody,
      queryParams
    );
  }
  async patchRequest(
    requestUrl: string,
    headers?: any,
    requestBody?: any,
    queryParams?: any
  ) {
    return await this.makeRequest(
      "PATCH",
      requestUrl,
      headers,
      requestBody,
      queryParams
    );
  }
  async deleteRequest(
    requestUrl: string,
    headers?: any,
    requestBody?: any,
    queryParams?: any
  ) {
    return await this.makeRequest(
      "DELETE",
      requestUrl,
      headers,
      requestBody,
      queryParams
    );
  }
}
