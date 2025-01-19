export type ICloudinaryResponse = {
  asset_id: any;
  public_id: string;
  version: number;
  version_id: any;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: any[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  asset_folder: any;
  display_name: any;
  original_filename: string;
  api_key: any;
};

export type IFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
};
