import { GATEWAY_ENDPOINT, GATEWAY_ENDPOINT_V2 } from "../axios.config";

export interface VendorSignup {
  restaurantName: string;
  email: string;
  phoneNumber: string;
  locationName: string;
  address: string;
  category: string;
  password: string;
}

export interface CustomerSignup {
  fullName: string;
  email: string;
  phoneNumber: string
  locationName: string;
  password: string;
}

export interface Login {
    email: string;
    password: string;
}

export const auth_api = {
  $_vendor_register: (credential: VendorSignup) => {
    const url = "/auth/vendor/signup";
    return GATEWAY_ENDPOINT.post(url, credential);
  },
  $_customer_register: (credential: CustomerSignup) => {
    const url = "/auth/customer/signup";
    return GATEWAY_ENDPOINT.post(url, credential);
  },
  $_vendor_login: (credential: Login) => {
    const url = "/auth/vendor/login";
    return GATEWAY_ENDPOINT.post(url, credential);
  },
  $_customer_login: (credential: Login) => {
    const url = "/auth/customer/login";
    return GATEWAY_ENDPOINT.post(url, credential);
  },
};
