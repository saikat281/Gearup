import { GearItemStatus } from "../../../generated/prisma/enums";

export interface GearItem {
  id: string;
  name: string;
  slug: string;
  description?: string | null;

  // Pricing
  pricePerDay: number;
  securityDeposit?: number | null;

  // Inventory
  quantity: number;
  status: GearItemStatus;

  // Images / product information
  images?: string[] ;
  brand?: string | null;
  model?: string | null;
  condition?: string | null;

  // Provider
  providerId: string;

  // Category
  categoryId: string;

  // Timestamps
  createdAt: string;
  updatedAt: string;
}