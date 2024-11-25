export default function Gender({ onCheckboxChange, selectedGender }) {
  return (
    <div className="flex justify-center items-center m-auto">
      <div className="flex justify-center items-center m-auto">
        <label
          htmlFor="male"
          className={`mx-1 ${selectedGender === "male" ? "selected" : ""}`}
        >
          Male
          <input
            type="radio"
            name="gender"
            className="radio radio-primary"
            checked={selectedGender === "male"}
            onChange={() => onCheckboxChange("male")}
          />
        </label>
      </div>
      <div className="flex justify-center items-center m-auto">
        <label
          htmlFor="female"
          className={`mx-1 ${selectedGender === "female" ? "selected" : ""}`}
        >
          Female
          <input
            type="radio"
            name="gender"
            className="radio radio-primary"
            checked={selectedGender === "female"}
            onChange={() => onCheckboxChange("female")}
          />
        </label>
      </div>
    </div>
  );
}
