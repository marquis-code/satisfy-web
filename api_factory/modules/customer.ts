import { GATEWAY_ENDPOINT } from "../axios.config";

export interface UpdatePassword {
  currentPassword: "";
  newPassword: "";
}

export interface CustomerProfile {
    fullName: string;
    email: string;
    phoneNumber: string
    locationName: string;
  }
  

export const customer_api = {
  $_fetch_customer_profile: () => {
    let url = `/customer/profile`;
    return GATEWAY_ENDPOINT.get(url);
  },
  $_change_password: (payload: UpdatePassword) => {
    let url = `/customer/change-password`;
    return GATEWAY_ENDPOINT.patch(url, payload);
  },
  $_deactivate_account: (payload: any) => {
    let url = `/customer/change-password`;
    return GATEWAY_ENDPOINT.patch(url, payload);
  },
  $_activate_account: (payload: any) => {
    let url = `/customer/activate`;
    return GATEWAY_ENDPOINT.patch(url, payload);
  },
  $_update_profile: (payload: CustomerProfile) => {
    let url = `/customer`;
    return GATEWAY_ENDPOINT.patch(url, payload);
  },
  $_fetch_customer_wallet: () => {
    let url = `/customer/wallet`;
    return GATEWAY_ENDPOINT.get(url);
  },
  $_delete_account: () => {
    let url = `/customer/change-password`;
    return GATEWAY_ENDPOINT.delete(url);
  },
};
