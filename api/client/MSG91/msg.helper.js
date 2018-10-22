"use strict";
import msg from './index'
import env from "../../env.json";
import utility from "../Utility";


const msg91 = env.msg91;
const generateOTP = utility.generateOTP;

function urlSendOTP (mobileNo) {
	let authkey = msg91.authkey;
	let otp = generateOTP();
	let message = 'Your verification code is ' + otp + '. Only valid for 2 minutes';
	let sender = 'AKASHS';
	let mobile = mobileNo;
	let otpExpiry = 2;
	let url = msg91.baseUrl + msg91.sendOTP.url;
	return {
		url: url+'authkey=' + authkey + '&message=' + message + '&sender=' + sender + '&mobile=' + mobile + '&otp=' + otp + '&otp_expiry=' + otpExpiry,
		method: msg91.sendOTP.method
	};
}

function urlReSendOTP (mobileNo) {
	let authkey = msg91.authkey;
	let url = msg91.baseUrl + msg91.sendOTP.url;
	return {
		url: url+'authkey=' + authkey + '&mobile=' + mobileNo + '&retrytype=text',
		method: msg91.resendOTP.method
	};
}

function urlVerifyOTP (mobileNo, otp) {
	let authkey = msg91.authkey;
	let url = msg91.baseUrl + msg91.sendOTP.url;
	return {
		url: url+'authkey=' + authkey + '&mobile=' + mobileNo + '&otp=' + otp,
		method: msg91.verifyOTP.method
	};
}

export default {
	urlSendOTP: urlSendOTP,
	urlReSendOTP: urlReSendOTP,
	urlVerifyOTP: urlVerifyOTP
}
