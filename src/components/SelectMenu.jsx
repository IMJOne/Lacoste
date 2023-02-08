export default function SelectMenu({ label, value, optionList, onChange }) {
  return (
    <>
      <label className="block mb-2 font-semibold" htmlFor="select">
        {label}
      </label>
      <select
        id="select"
        className="h-10 px-2 mb-4 border border-brand rounded-lg"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {optionList.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}
