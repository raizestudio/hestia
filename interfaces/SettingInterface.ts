export interface SettingInterface {
  key: string;
  value: string;
}

export interface SettingsInterface {
  app_name: string;
  app_description: string;

  let_users_create_account: string;
  let_users_reset_password: string;

  new_accounts_need_approval: string;
}
