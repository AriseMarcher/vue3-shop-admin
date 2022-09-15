type statusType = 0 | 1 | ''
export interface IListParams {
  page: number
  limit: number
  name: string
  roles: string
  status: statusType
}

export interface Admin {
  id: number
  account: string
  head_pic: string
  pwd: string
  real_name: string
  roles: string
  last_ip: string
  last_time: number
  add_time: number
  login_count: number
  level: number
  status: statusType
  is_del: number
  _add_time: string
  _last_time: string
}

export interface IListResponse {
  count: number
  list: Array<Admin>
}

export interface IAdminPostData {
  account: string
  conf_pwd: string
  pwd: string
  roles: string
  status: number
  real_name: string
}
