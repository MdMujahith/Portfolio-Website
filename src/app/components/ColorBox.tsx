interface ColorBoxProps {
  color: string;  // Tailwind background color class
  label: string;  // Text to display
}

export default function ColorBox({ color, label }: ColorBoxProps) {
  return (
    <div
      className={`w-24 h-24 rounded-lg flex items-center justify-center text-white font-bold ${color}`}
    >
      {label}
    </div>
  );
}
