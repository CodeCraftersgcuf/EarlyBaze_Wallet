import { API_ENDPOINTS } from "@/apiConfig";
import { apiCall } from "../customApiCall";

export const getAssests = async ({
  token,
}: {
  token: string;
}): Promise<AssetsResponse> => {
  return await apiCall(API_ENDPOINTS.USER.GetAssests, "GET", undefined, token);
};

export const getUserDetails = async ({
  token,
}: {
  token: string;
}): Promise<UserDetailsResponse> => {
  return await apiCall(
    API_ENDPOINTS.USER.GetUserDetails,
    "GET",
    undefined,
    token
  );
};

export const getBanksAccounts = async ({
  token,
}: {
  token: string;
}): Promise<GetBankDetail> => {
  return await apiCall(
    API_ENDPOINTS.USER.GetBankDetail,
    "GET",
    undefined,
    token
  );
};

export const getUserBalance = async ({
  token,
}: {
  token: string;
}): Promise<UserBalanceResponse> => {
  return await apiCall(API_ENDPOINTS.USER.GetBalance, "GET", undefined, token);
};

export const getUserAssets = async ({
  token,
}: {
  token: string;
}): Promise<UserAssetsResponse> => {
  return await apiCall(API_ENDPOINTS.USER.GetAssets, "GET", undefined, token);
};

export const getWalletCurrency = async ({
  token,
}: {
  token: string;
}): Promise<WalletCurrency[]> => {
  return await apiCall(
    API_ENDPOINTS.USER.GetWalletCurrency,
    "GET",
    undefined,
    token
  );
};

export const getNetworkCurreny = async (
  token: string,
  coinId: any
): Promise<NetworkResponse> => {
  return await apiCall(
    `${API_ENDPOINTS.USER.GetWalletNetworks}/${coinId}`, // Append ticketId dynamically
    "GET",
    undefined,
    token
  );
};

export const getBillerCategories = async ({
  token,
}: {
  token: string;
}): Promise<IBillerCategoriesResponse> => {
  return await apiCall(
    API_ENDPOINTS.BILL_MANAGEMENT.GetBillerCategories,
    "GET",
    undefined,
    token
  );
};

export const getBillerProviders = async (
  categoryId: string,
  token: string
): Promise<IBillerProvidersResponse> => {
  return await apiCall(
    `${API_ENDPOINTS.BILL_MANAGEMENT.GetBillerProviders}/${categoryId}`,
    "GET",
    undefined,
    token
  );
};

export const getBillerItems = async ({
  categoryId,
  providerId,
  token,
}: {
  categoryId: string;
  providerId: string;
  token: string;
}): Promise<IBillerItemsListData> => {
  return await apiCall(
    `${API_ENDPOINTS.BILL_MANAGEMENT.GetBillerItems}/${categoryId}/${providerId}`,
    "GET",
    undefined,
    token
  );
};

export const getBillerItemDetails = async ({
  itemId,
  token,
}: {
  itemId: string;
  token: string;
}): Promise<IBillerItemDetailsData> => {
  return await apiCall(
    `${API_ENDPOINTS.BILL_MANAGEMENT.GetBillerItemDetails}/${itemId}`,
    "GET",
    undefined,
    token
  );
};

export const getTrsansactionDetails = async ({
  id,
  token,
}: {
  id: string;
  token: string;
}): Promise<TransactionResponse> => {
  return await apiCall(
    `${API_ENDPOINTS.BILL_MANAGEMENT.TransactionDetails}/${id}`,
    "GET",
    undefined,
    token
  );
};

export const getBanks = async (token: string): Promise<IBanksResponse> => {
  return await apiCall(
    API_ENDPOINTS.MONEY_TRANSFER.GetBanks,
    "GET",
    undefined,
    token
  );
};

export const getTransactionStatus = async ({
  transactionId,
  token,
}: {
  transactionId: string;
  token: string;
}) => {
  return await apiCall(
    API_ENDPOINTS.MONEY_TRANSFER.GetTransactionStatus,
    "GET",
    transactionId,
    token
  );
};

export const getSocialMediaLinks = async (): Promise<SocialMediaResponse> => {
  console.log("social media api  called");
  return await apiCall(
    API_ENDPOINTS.ACCOUNT_MANAGEMENT.GetSocialMediaLinks,
    "GET",
    undefined
  );
};

export const getFaqs = async (): Promise<FaqRespone> => {
  console.log("Faq a[o ca;;ed");
  return await apiCall(
    API_ENDPOINTS.ACCOUNT_MANAGEMENT.GetFaqs,
    "GET",
    undefined
  );
};
export const getSlide = async (): Promise<SlideResponse> => {
  console.log("Slides called");
  return await apiCall(
    API_ENDPOINTS.ACCOUNT_MANAGEMENT.GetSlides,
    "GET",
    undefined
  );
};

interface SlideResponse {
  status: "success" | "error";
  data: Slide[];
}
interface AssetsResponse {
  status: string;
  data: Asset[];
}

interface Asset {
  id: number;
  currency: string;
  blockchain: string;
  currency_id: number;
  available_balance: string;
  account_balance: string;
  wallet_currency: WalletCurrency;
}

interface WalletCurrency {
  id: number;
  price: number;
  symbol: string | null;
  naira_price: number;
}

interface UserDetails {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  user_code: string;
  invite_code: string | null;
  otp: string | null;
  otp_verified: number;
  is_active: number;
  pin: string;
  phone: string;
  profile_picture: string | null;
}

interface UserDetailsResponse {
  status: string;
  data: UserDetails;
  message: string;
}
interface BankDetail {
  account_name: string;
  account_number: string;
  bank_name: string;
  created_at: string;
  id: number;
  is_default: number;
  updated_at: string;
  user_id: number;
}

interface GetBankDetail {
  status: string;
  data: BankDetail[]; // Array of bank details
  message: string;
}

interface UserBalance {
  id: number;
  crypto_balance: number;
  naira_balance: number;
  user_id: number;
  account_number: string;
  total_deposits: number;
  total_withdrawals: number;
  total_referral_earnings: number;
  created_at: string;
  updated_at: string;
}

interface UserBalanceResponse {
  status: string;
  data: UserBalance;
  message: string;
}

interface WalletCurrency {
  id: number;
  price: number;
  symbol: string | null;
  naira_price: number;
}

interface UserAsset {
  id: number;
  currency: string;
  blockchain: string;
  currency_id: number;
  available_balance: string;
  account_balance: string;
  wallet_currency: WalletCurrency;
}

interface UserAssetsResponse {
  status: string;
  data: UserAsset[];
  message: string;
}

interface NetworkResponse {
  status: string;
  data: Array<{
    id: number;
    network: string;
    symbol: string;
  }>;
  message: string;
}

interface Slide {
  id: number;
  image: string;
}
interface IBillerCategoriesResponse {
  message: string;
  data: IBillerCategory[];
}
export interface IBillerCategory {
  id: number;
  category: string;
  isCategory: 0 | 1;
  icon?: string;
  categoryTitile?: string;
  categoryDescription?: string;
  selectTitle?: string;
  iconColor?: string;
}

interface IBillerProvidersResponse {
  status: "success" | "error";
  data: IProviderData[];
}

export interface IProviderData {
  id: number;
  title: string;
  slug: string;
  description: string;
  providerTitle: string;
  selectTitle: string;
  logo: string;
  status?: boolean;
}
export interface IBillerItemsList {
  category: {
    id: number;
    category: string;
    icon?: string;
    iconColor?: string;
  };
  itemList: IBillerItem[];
}

export interface IBillerItem {
  id: number;
  amount: string;
  paymentitemname: string;
  percentageComission: string;
  logo: string;
}

interface IBillerItemsListData {
  message: string;
  data: IBillerItemsList;
}

export type IBillerItemDetails = {
  id: number;
  category_id: number;
  paymentitemname: string;
  paymentCode: string;
  productId: string;
  paymentitemid: string;
  currencySymbol: string;
  isAmountFixed: number;
  itemFee: string;
  itemCurrencySymbol: string;
  pictureId: string;
  billerType: string;
  payDirectitemCode: string;
  currencyCode: string;
  division: string;
  fixed_commission: string;
  percentage_commission: string;
  created_at: string;
  updated_at: string;
  billerId: string;
  icon?: string;
  iconColor?: string;
  amount?: number;
};

interface IBillerItemDetailsData {
  message: string;
  data: IBillerItemDetails;
}

interface IBanksResponse {
  status: string;
  data: IBankDetails[];
}
interface SocialMediaResponse {
  status: string;
  data: SocialMediaLinks[];
}
interface SocialMediaLinks {
  title?: string;
  link?: string;
  icon?: string;
}
interface FaqRespone {
  status: string;
  data: Faq[];
}
interface Faq {
  id: number;
  question: string;
  answer: string;
}

export interface IBankDetails {
  id: number;
  name: string;
  code: string;
  logo: string | null;
}
export interface TransactionResponse {
  status: string;
  data: TransactionDetails[];
}
export interface TransactionDetails {
  id: number;
  amount?: string;
  transactionDate?: string;
  transactionId?: string;
  category?: string;
  item?: string;
  billerType?: string;
  status?: string;
  provider?: string;
}
