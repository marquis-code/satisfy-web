import { GATEWAY_ENDPOINT } from "../axios.config";

export const review_api = {
    $_create_review: (vendorId: string, payload: any) => {
        let url = `/vendors/${vendorId}/reviews`;
        return GATEWAY_ENDPOINT.post(url, payload);
      },
      $_fetch_reviews: (vendorId: string) => {
        let url = `/vendors/${vendorId}/reviews`;
        return GATEWAY_ENDPOINT.get(url);
      },
}