import { GATEWAY_ENDPOINT } from '../axios.config'
export const enquires_api = {
	$_general_enquiry: (payload: any) => {
		const url = '/general-enquiry'
		return GATEWAY_ENDPOINT.post(url, payload)
	},
	$_program_enquiry: (payload: any) => {
		const url = '/program-enquiry'
		return GATEWAY_ENDPOINT.post(url, payload)
	},
	$_subscribe: (payload: any) => {
		const url = '/subscribe'
		return GATEWAY_ENDPOINT.post(url, payload);
	}
}
