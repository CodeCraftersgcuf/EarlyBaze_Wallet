import { API_ENDPOINTS } from "@/apiConfig";
// import { IClientCreation } from '@/app/fillyourprofile';
// import { ICooperateClient } from '@/app/createcoroporateaccount';
import { apiCall } from "../customApiCall";

export const changePassword = async ({
  data,
  token,
}: {
  data: { oldPassword: string; newPassword: string }; // Frontend field names
  token: string;
}) => {
  console.log("🔹 Original Change Password Data:", data);

  // Map the frontend data to the backend expected format
  const mappedData = {
    old_password: data.oldPassword, // Map oldPassword to old_password
    new_password: data.newPassword, // Map newPassword to new_password
  };

  console.log("🔹 Mapped Change Password Data:", mappedData);

  // Make the API call with the mapped data
  return await apiCall(
    API_ENDPOINTS.USER.ChangePassword,
    "POST",
    mappedData,
    token
  );
};



export const createKycRequest = async ({
  data,
  token,
}: {
  data: FormData;
  token: string;
}) => {
  return await apiCall(API_ENDPOINTS.USER.CreatekycRequest, "POST", data, token);
};

export const createSupportTicket = async ({
  data,
  token,
}: {
  data: FormData;
  token: string;
}) => {
  return await apiCall(API_ENDPOINTS.USER.CreateSupportTicket, "POST", data, token);
};

export const createIndividualAccount = async ({
  data,
  token,
}: {
  data: FormData;
  token: string;
}) => {
  return await apiCall(
    API_ENDPOINTS.ACCOUNT_MANAGEMENT.CreateIndividualAccount,
    "POST",
    data,
    token
  );
};

export const createCooperateAccount = async ({
  data,
  token,
}: {
  data: FormData;
  token: string;
}) => {
  return await apiCall(
    API_ENDPOINTS.ACCOUNT_MANAGEMENT.CreateCoorporateAccount,
    "POST",
    data,
    token
  );
};

export const updatePassword = async ({
  data,
  token,
}: {
  data: IUpdatePassword;
  token: string;
}) => {
  return await apiCall(
    API_ENDPOINTS.ACCOUNT_MANAGEMENT.UpdatePassword,
    "POST",
    data,
    token
  );
};

export const updateProfile = async ({
  data,
  token,
}: {
  data: FormData;
  token: string;
}): Promise<IUpdateProfileResponse> => {
  return await apiCall(
    API_ENDPOINTS.ACCOUNT_MANAGEMENT.UpdateProfile,
    "POST",
    data,
    token
  );
};

// export const updateEmail = async({})
export const validateCustomer = async ({
  data,
  token,
}: {
  data: { customerId: string; id: string };
  token: string;
}): Promise<any> => {
  return await apiCall(
    API_ENDPOINTS.BILL_MANAGEMENT.ValidateCustomer,
    "POST",
    data,
    token
  );
};

export const payBillFn = async ({
  data,
  token,
}: {
  data: IPayBill;
  token: string;
}): Promise<any> => {
  return await apiCall(
    API_ENDPOINTS.BILL_MANAGEMENT.PayBills,
    "POST",
    data,
    token
  );
};

export interface IPayBill {
  billerId: string;
  amount: string;
  customerId: string;
  billerItemId: string;
  phoneNumber: string;
  totaltAmount?: string;
  // paymentMethod: string;
}

interface IUpdatePassword {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

interface IUpdateProfileResponse {
  data: {
    accountBalance: string;
    accountId: string;
    account_number: string;
    account_type: string;
    bvn: string;
    client: string;
    clientId: string;
    created_at: string; // ISO date string
    firstName: string;
    gender: string;
    id: number;
    lastName: string;
    nickName: string | null;
    occupation: string | null;
    phone: string;
    profile_picture: string;
    savingsProductName: string;
    status: string;
    updated_at: string; // ISO date string
    user_id: number;
  };
  message: string;
}

// interface IUpdateProfileRequest {
//   firstName?: string;
//   lastName?: string;
//   phone?: string;
//   gender?: string | null;
//   occupation?: string;
//   dob?: string; // Date in ISO format (e.g., "1990-01-01")
//   profilePicture?: string | null;
// }
