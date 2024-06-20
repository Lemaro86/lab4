/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface User {
  /**
   * Email адрес
   * @format email
   * @minLength 1
   * @maxLength 254
   */
  email: string;
  /**
   * Пароль
   * @minLength 1
   * @maxLength 255
   */
  password: string;
  /**
   * Is staff
   * @default false
   */
  is_staff?: boolean;
  /**
   * Is superuser
   * @default false
   */
  is_superuser?: boolean;
}

export interface ServiceShort {
  /** ID */
  pk?: number;
}

export interface Order {
  /** ID */
  pk?: number;
  /**
   * Статус заявки
   * @minLength 1
   * @maxLength 50
   */
  status: string;
  /**
   * Дата создания заявки
   * @format date-time
   */
  created?: string;
  /**
   * Дата активации заявки
   * @format date-time
   */
  activated?: string | null;
  /**
   * Дата завершения заявки
   * @format date-time
   */
  completed?: string | null;
  /**
   * Создатель заявки
   * @min -2147483648
   * @max 2147483647
   */
  creator_id?: number | null;
  /**
   * Модератор услуг
   * @min -2147483648
   * @max 2147483647
   */
  moderator_id?: number | null;
  service?: ServiceShort[];
}

export interface Service {
  /** ID */
  pk?: number;
  /**
   * Название услуги
   * @minLength 1
   * @maxLength 255
   */
  title?: string;
  /**
   * Описание услуги
   * @minLength 1
   * @maxLength 255
   */
  description?: string;
  /**
   * Фото услуги
   * @maxLength 255
   */
  url?: string | null;
  /**
   * Цена услуги
   * @format decimal
   */
  cost?: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://127.0.0.1:8000" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://127.0.0.1:8000
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags api
     * @name ApiUserList
     * @request GET:/api/user/
     * @secure
     */
    apiUserList: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/api/user/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiUserCreate
     * @request POST:/api/user/
     * @secure
     */
    apiUserCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/user/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiUserRead
     * @request GET:/api/user/{id}/
     * @secure
     */
    apiUserRead: (id: number, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/user/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiUserUpdate
     * @request PUT:/api/user/{id}/
     * @secure
     */
    apiUserUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/user/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiUserPartialUpdate
     * @request PATCH:/api/user/{id}/
     * @secure
     */
    apiUserPartialUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/user/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiUserDelete
     * @request DELETE:/api/user/{id}/
     * @secure
     */
    apiUserDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/user/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  login = {
    /**
     * No description
     *
     * @tags login
     * @name LoginCreate
     * @request POST:/login/
     * @secure
     */
    loginCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/login/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  logout = {
    /**
     * No description
     *
     * @tags logout
     * @name LogoutList
     * @request GET:/logout/
     * @secure
     */
    logoutList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/logout/`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  order = {
    /**
     * No description
     *
     * @tags order
     * @name OrderList
     * @request GET:/order/
     * @secure
     */
    orderList: (params: RequestParams = {}) =>
      this.request<Order[], any>({
        path: `/order/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags order
     * @name OrderCreate
     * @request POST:/order/
     * @secure
     */
    orderCreate: (
      data: {
        /** ACTIVATED DRAFT COMPLETED DECLINED DELETED */
        status?: string;
        /** Primary key of service */
        service_id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Order, any>({
        path: `/order/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags order
     * @name OrderRead
     * @request GET:/order/{id}/
     * @secure
     */
    orderRead: (id: string, params: RequestParams = {}) =>
      this.request<Order, any>({
        path: `/order/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags order
     * @name OrderUpdate
     * @request PUT:/order/{id}/
     * @secure
     */
    orderUpdate: (id: string, data: Order, params: RequestParams = {}) =>
      this.request<Order, any>({
        path: `/order/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags order
     * @name OrderDelete
     * @request DELETE:/order/{id}/
     * @secure
     */
    orderDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/order/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  service = {
    /**
     * No description
     *
     * @tags service
     * @name ServiceList
     * @request GET:/service/
     * @secure
     */
    serviceList: (params: RequestParams = {}) =>
      this.request<Service[], any>({
        path: `/service/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags service
     * @name ServiceCreate
     * @request POST:/service/
     * @secure
     */
    serviceCreate: (
      data: {
        /** Primary key? */
        pk?: number;
        /** Name of service */
        title?: string;
        /** Desc of service */
        description?: string;
        /** Just price */
        cost?: string;
        /**
         * Image
         * @format binary
         */
        pic?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<Service, any>({
        path: `/service/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags service
     * @name ServiceRead
     * @request GET:/service/{id}/
     * @secure
     */
    serviceRead: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/service/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags service
     * @name ServiceUpdate
     * @request PUT:/service/{id}/
     * @secure
     */
    serviceUpdate: (id: string, data: Service, params: RequestParams = {}) =>
      this.request<Service, any>({
        path: `/service/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags service
     * @name ServiceDelete
     * @request DELETE:/service/{id}/
     * @secure
     */
    serviceDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/service/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
}
