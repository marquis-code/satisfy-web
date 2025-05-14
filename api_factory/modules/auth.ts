import { GATEWAY_ENDPOINT } from '../axios.config'
export const auth_api = {
	$_login: (credential: any) => {
		const url = '/auth/login'
		return GATEWAY_ENDPOINT.post(url, credential)
	},
	$_signup: (credential: any) => {
		const url = '/auth/signup'
		return GATEWAY_ENDPOINT.post(url, credential)
	},
	$_update_profile: (payload: any) => {
		const url = '/admins/profile'
		return GATEWAY_ENDPOINT.patch(url, payload);
	},
	$_update_password: (payload: any) => {
		const url = '/admins/password'
		return GATEWAY_ENDPOINT.put(url, payload);
	},
	$_forgot_password: (payload: any) => {
		const url = '/admins/password'
		return GATEWAY_ENDPOINT.post(url, payload);
	},
	$_reste_password: (payload: any) => {
		const url = '/admins/password'
		return GATEWAY_ENDPOINT.put(url, payload);
	},
	$_admin_login: (credential: any) => {
		const url = '/auth/admin-login'
		return GATEWAY_ENDPOINT.post(url, credential)
	},
}
