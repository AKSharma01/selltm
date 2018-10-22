"use strict";
import msg from './index'
import env from "../../env.json";
import utility from "../utility";


const msg91 = env.msg91;
const generateOTP = utility.generateOTP;

function urlSendOTP (mobileNo) {
	let authkey = msg91.authkey;
	let generateOTP = generateOTP();
	let message = 'OTP for Photograpr is ' + generateOTP + '. Only valid for 2 minutes';
	let sender = 'photograpr';
	let mobile = mobileNo;
	let otp = generateOTP;
	let otpExpiry = 2;
	return 'authkey=' + authkey + '&message=' + message + '&sender=' + sender + '&mobile=' + mobile + '&otp=' + otp + '&otp_expiry=' + otpExpiry;
}

function urlReSendOTP (mobileNo) {
	let authkey = msg91.authkey;
	return 'authkey=' + authkey + '&mobile=' + mobileNo + '&retrytype=text';
}

function urlVerifyOTP (mobileNo, otp) {
	let authkey = msg91.authkey
	return 'authkey=' + authkey + '&mobile=' + mobileNo + '&otp=' + otp;
}

export default {
	urlSendOTP: urlSendOTP,
	urlReSendOTP: urlReSendOTP,
	urlVerifyOTP: urlVerifyOTP
}
