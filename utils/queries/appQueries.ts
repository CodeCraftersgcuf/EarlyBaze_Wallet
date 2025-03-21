import { API_ENDPOINTS } from "@/apiConfig";
import { apiCall } from "../customApiCall";
import { string } from "yup";

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

export const getAssestnTrans = async ({
  token,
}: {
  token: string;
}): Promise<AssetsTransResponse> => {
  console.log("The Request", token);
  return await apiCall(
    API_ENDPOINTS.USER.GetAssestnTrans,
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
export const getInternalSend = async ({
  token,
  id,
}: {
  token: string;
  id?: string; // Marked as optional to prevent TypeScript errors
}): Promise<InternalSendResponse> => {
  if (!id) {
    console.warn("❌ Missing transaction ID, skipping API call.");
    throw new Error("Transaction ID is required.");
  }

  console.log(
    `🔹 Fetching transaction: ${id} with token: ${
      token ? "✅ Available" : "❌ Missing"
    }`
  );

  return apiCall(
    `${API_ENDPOINTS.USER.GetInternalSend}/${id}`,
    "GET",
    undefined,
    token
  );
};

export const getInternalReceive = async ({
  token,
  id,
}: {
  token: string;
  id?: string; // Marked as optional to prevent TypeScript errors
}): Promise<InternalReceiveResponse> => {
  if (!id) {
    console.warn("❌ Missing transaction ID, skipping API call.");
    throw new Error("Transaction ID is required.");
  }

  console.log(
    `🔹 Fetching transaction: ${id} with token: ${
      token ? "✅ Available" : "❌ Missing"
    }`
  );

  return apiCall(
    `${API_ENDPOINTS.USER.GetInternalSend}/${id}`,
    "GET",
    undefined,
    token
  );
};
export const getSwap = async ({
  token,
  id,
}: {
  token: string;
  id?: string; // Marked as optional to prevent TypeScript errors
}): Promise<SwapResponse> => {
  if (!id) {
    console.warn("❌ Missing transaction ID, skipping API call.");
    throw new Error("Transaction ID is required.");
  }

  console.log(
    `🔹 Fetching transaction: ${id} with token: ${
      token ? "✅ Available" : "❌ Missing"
    }`
  );
  console.log("Sending the requesat", id);
  return apiCall(
    `${API_ENDPOINTS.USER.GetSwap}/${id}`,
    "GET",
    undefined,
    token
  );
};

export const getWithdraw = async ({
  token,
  id,
}: {
  token: string;
  id?: string;
}): Promise<WithdrawResponse> => {
  console.log("The Idsss ", id);
  return apiCall(
    `${API_ENDPOINTS.USER.GetWithdraw}/${id}`,
    "GET",
    undefined,
    token
  );
};

export const getBuy = async ({
  token,
  id,
}: {
  token: string;
  id?: string;
}): Promise<BuyResponse> => {
  console.log("The Idsss ", id);
  return apiCall(
    `${API_ENDPOINTS.USER.GetBuy}/${id}`,
    "GET",
    undefined,
    token
  );
};
export const getTransactionAll = async ({
  token,
}: {
  token: string;
}): Promise<TransactionAllResponse> => {
  return await apiCall(
    API_ENDPOINTS.USER.GetWalletTransactions,
    "GET",
    undefined,
    token
  );
};

export const getAllWithDrawal = async ({
  token,
}: {
  token: string;
}): Promise<AllWithdrawalResponse> => {
  console.log("Sending request to get all withdrawal");
  return await apiCall(
    API_ENDPOINTS.USER.GetAllWithdrawal,
    "GET",
    undefined,
    token
  );
};

export const getReferral = async ({
  token,
}: {
  token: string;
}): Promise<ReferralResponse> => {
  console.log("referral api called");
  console.log("Sending token:", token);
  return await apiCall(API_ENDPOINTS.USER.GetReferral, "GET", undefined, token);
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
interface InternalSendResponse {
  status: string;
  data: {
    id: number;
    transaction_id: number;
    transaction_type: string;
    currency: string;
    symbol: string;
    tx_id: string;
    block_hash: string | null;
    gas_fee: number | null;
    receiver_address: string;
    status: string;
    amount: string;
    amount_usd: string;
    created_at: string;
  };
  message: string;
}

interface InternalReceiveResponse {
  status: string;
  data: {
    id: number;
    transaction_id: number;
    transaction_type: string;
    currency: string;
    symbol: string;
    tx_id: string;
    block_hash: string | null;
    gas_fee: number | null;
    sender_address: string;
    status: string;
    amount: string;
    amount_usd: string;
    created_at: string;
  };
  message: string;
}
interface SwapResponse {
  status: string;
  data: {
    id: number;
    user_id: number;
    transaction_id: number;
    currency: string;
    network: string;
    amount: number;
    fee: string;
    amount_usd: string;
    amount_naira: string;
    status: string;
    fee_naira: number;
    exchange_rate: string;
    created_at: string;
    updated_at: string;
    reference: string;
  };
  message: string;
}
interface BankAccount {
  id: number;
  user_id: number;
  bank_name: string;
  account_number: string;
  account_name: string;
  created_at: string;
  updated_at: string;
  is_default: number;
}

interface WithdrawResponse {
  status: string;
  data: {
    id: number;
    user_id: number;
    bank_account_id: number;
    amount: number;
    status: string;
    reference: string;
    fee: number;
    total: number;
    asset: string;
    created_at: string;
    updated_at: string;
    bank_account: BankAccount;
  };
  message: string;
}

interface BuyResponse {
  status: string;
  data: {
    coin: string;
    network: string;
    amount_btc: string;
    amount_usd: string;
    amount_paid: string;
    account_paid_to: string;
    transaction_reference: string;
    transaction_date: string;
    status: string;
  };
  message: string;
}

interface AssetsTransResponse {
  status: string;
  data: {
    assets: Array<{
      id: number;
      name: string;
      symbol: string;
      icon: string | null;
      balance: string;
      account_balance: string;
      price: string;
    }>;
    transactions: Array<{
      id: number;
      user_id: number;
      currency: string;
      amount: string;
      type: string;
      status: string;
      network: string;
      reference: string;
      amount_usd: string;
      created_at: string;
      updated_at: string;
      transfer_type: string;
    }>;
  };
  message: string;
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

interface TransactionAllResponse {
  status: string;
  data: TransactionAll[];
}

interface TransactionAll {
  id: number;
  user_id: number;
  currency: string;
  amount: string;
  type: string;
  status: string;
  network: string;
  reference: string;
  amount_usd: string;
  created_at: string;
  updated_at: string;
}
interface BankAccount {
  id: number;
  user_id: number;
  bank_name: string;
  account_number: string;
  account_name: string;
  created_at: string;
  updated_at: string;
  is_default: number;
}

interface WithdrawalTransaction {
  id: number;
  user_id: number;
  bank_account_id: number;
  amount: number;
  status: string;
  reference: string;
  fee: number;
  total: number;
  asset: string;
  created_at: string;
  updated_at: string;
  bank_account: BankAccount;
}

interface AllWithdrawalResponse {
  status: string;
  data: WithdrawalTransaction[];
  message: string;
}

interface ReferralResponse {
  status: string;
  data: {
    earning: Array<{
      name: string;
      amount: number;
      created_at: string;
      image: string;
    }>;
    totalRefferals: number;
    reffralCode: string;
    Earning: {
      usd: number;
      naira: number;
    };
  };
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
