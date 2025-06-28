export const typeOptions = [
  "Червоне",
  "Біле",
  "Рожеве",
  "Ігристе",
  "Десертне",
  "Портвейн",
  "Апельсинове",
] as const;

export const priceRangesOptions = [
  { label: "До 200 грн", min: 0, max: 200 },
  { label: "200–400 грн", min: 200, max: 400 },
  { label: "400–600 грн", min: 400, max: 600 },
  { label: "600–1000 грн", min: 600, max: 1000 },
  { label: "Понад 1000 грн", min: 1000, max: 50000 },
] as const;

export const yearOptions = [
  { label: "До 2015", min: 0, max: 2014 },
  { label: "2015–2019", min: 2015, max: 2019 },
  { label: "2020", min: 2020, max: 2020 },
  { label: "2021", min: 2021, max: 2021 },
  { label: "2022", min: 2022, max: 2022 },
  { label: "2023", min: 2023, max: 2023 },
] as const;

export const producerOptions = [
  "Shabo",
  "Колоніст",
  "Biologist",
  "Beykush Winery",
  "Villa Tinta",
  "Frumushika-Nova",
  "46 Parallel Wine Group",
  "Don Alejandro Winery",
  "Father’s Wine",
  "SliVino Village",
] as const;