import { GATEWAY_ENDPOINT } from "../axios.config";

export const delivery_location_api = {
  $_create_delivery_location: (payload: { name: string, deliveryFee: number}) => {
    let url = `/updated-delivery-location`;
    return GATEWAY_ENDPOINT.post(url, payload);
  },
  $_fetch_delivery_location: () => {
    let url = `/updated-delivery-location`;
    return GATEWAY_ENDPOINT.get(url);
  },
  $_fetch_delivery_location_by_vendor_id: (id: string) => {
    let url = `/updated-delivery-location/vendor/${id}`;
    return GATEWAY_ENDPOINT.get(url);
  },
  $_fetch_loggedIn_delivery_location: () => {
    let url = `/delivery-location/all`;
    return GATEWAY_ENDPOINT.get(url);
  },
  $_vendor_delivery_locations: (vendorId: string) => {
    let url = `/delivery-location/${vendorId}`;
    return GATEWAY_ENDPOINT.get(url);
  },
  $_update_delivery_location: (id: string, payload: any) => {
    let url = `/updated-delivery-location/${id}`;
    return GATEWAY_ENDPOINT.patch(url, payload);
  },
  $_delete_delivery_location: (id: string) => {
    let url = `/updated-delivery-location/${id}`;
    return GATEWAY_ENDPOINT.delete(url);
  }
};
