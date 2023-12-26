export class DomainUpdateAssetDto {
  name?: string;
  description?: string;
  plate?: string;
  serial?: string;
  category?: string;
  price?: number;
  acquisitionDate?: Date;
  dependency_id?: string;
  assessment?: string;
  status?: string;
  active?: boolean;
}
