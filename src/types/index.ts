export interface Cereal {
  name: string;
  mfr: string;
  type: string;
  calories: string;
  protein: string;
  fat: string;
  sodium: string;
  fiber: string;
  carbo: string;
  sugars: string;
  potass: string;
  vitamins: string;
  shelf: string;
  weight: string;
  cups: string;
  rating: string;
}

export type CerealType = Omit<keyof Cereal, "name" | "type" | "mfr">;

export type CerealTypeOption = {
  value: CerealType;
  label: CerealType;
};
