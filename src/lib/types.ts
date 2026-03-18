export interface DBProject {
  id: string;
  title: string;
  description: string;
  url: string;
  image_url: string;
  tag: string;
  tech_stack: { name: string; icon: string; color: string }[];
  sort_order: number;
}

export interface DBCertificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  pdf_path: string;
  sort_order: number;
}
