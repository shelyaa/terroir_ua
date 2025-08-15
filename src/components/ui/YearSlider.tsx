// import Slider from "@mui/material/Slider";
// import { styled } from "@mui/material/styles";

// // Кастомний слайдер для стилізації, схожий на твій дизайн
// const YearSliderStyled = styled(Slider)({
//   color: "#fad46b", // основний жовтий колір
//   height: 8,
//   "& .MuiSlider-thumb": {
//     height: 26,
//     width: 26,
//     backgroundColor: "#fff",
//     border: "4px solid #fad46b",
//     boxShadow: "0 2px 6px 0 rgba(0,0,0,0.2)",
//   },
//   "& .MuiSlider-track": {
//     height: 8,
//     borderRadius: 4,
//   },
//   "& .MuiSlider-rail": {
//     height: 8,
//     borderRadius: 4,
//     color: "#cfcfcf", // сірий для неактивної лінії
//   },
//   "& .MuiSlider-mark": {
//     backgroundColor: "#cfcfcf",
//     width: 4,
//     height: 4,
//     borderRadius: "50%",
//     top: 12,
//   },
//   "& .MuiSlider-markLabel": {
//     color: "#444",
//     fontSize: 16,
//     top: 40,
//     "&.active": {
//       color: "#a01c18", // бордовий для активних років
//       fontWeight: 600,
//     },
//   },
// });

// const marks = [
//   { value: 2015, label: "2015" },
//   { value: 2016, label: "2016" },
//   { value: 2017, label: "2017" },
//   { value: 2018, label: "2018" },
//   { value: 2019, label: "2019" },
//   { value: 2020, label: "2020" },
//   { value: 2021, label: "2021" },
//   { value: 2022, label: "2022" },
//   { value: 2023, label: "2023" },
//   { value: 2024, label: "2024" },
// ];

// export const YearSlider = ({
//   value,
//   onChange,
//   onReset,
// }: {
//   value: [number, number];
//   onChange: (evt: any, newValue: [number, number]) => void;
//   onReset: () => void;
// }) => (
//   <div className="py-4 px-2 bg-[#f6f6f6] rounded-md">
//     <div className="flex items-center justify-between mb-2">
//       <span className="text-2xl font-serif">Рік урожаю</span>
//       <button
//         className="text-[#b7b7b7] font-medium uppercase text-sm tracking-wide hover:underline"
//         onClick={onReset}
//         type="button"
//       >
//         очистити
//       </button>
//     </div>
//     <YearSliderStyled
//       value={value}
//       onChange={onChange}
//       valueLabelDisplay="auto"
//       min={2015}
//       max={2024}
//       marks={marks}
//       getAriaLabel={() => "Рік урожаю"}
//       sx={{
//         "& .MuiSlider-valueLabel": {
//           background: "#fad46b",
//           color: "#1a1a1a",
//           fontWeight: 600,
//           fontSize: 18,
//           borderRadius: "20px",
//           top: -60,
//           padding: "12px 24px",
//         },
//       }}
//     />
//     <div className="flex justify-between mt-2">
//       {marks.map((m) => (
//         <span
//           key={m.value}
//           className={`text-xs ${
//             value[0] === m.value || value[1] === m.value
//               ? "text-[#a01c18] font-bold"
//               : "text-[#b7b7b7]"
//           }`}
//         >
//           {m.label}
//         </span>
//       ))}
//     </div>
//   </div>
// );