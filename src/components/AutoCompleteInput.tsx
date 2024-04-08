import { useEffect, useState, useRef, Dispatch, SetStateAction } from "react";

interface Resources {
  name: string;
  [key: string | number]: any;
}

interface AutoCompleteInputProps {
  resources: Resources[];
  valueKey?: string;
  placeholder?: string | undefined;
  label: string;
  className?: string | undefined;
  onChange: Dispatch<SetStateAction<string>>;
}
const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({
  resources,
  valueKey,
  label,
  className,
  placeholder,
  onChange,
}) => {
  const [val, setVal] = useState("");
  const [suggestions, setSuggestions] = useState<Resources[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(0);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    onChange(val);
  }, [val]);
  // Update the function to handle suggestions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setVal(input);
    setActiveSuggestionIndex(0);
    if (input.length > 0) {
      const matchedSuggestions =
        resources && resources.length > 0
          ? resources
              .filter((c) =>
                c[valueKey ?? "name"]
                  .toLowerCase()
                  .includes(input.toLowerCase())
              )
              .slice(0, 7)
          : [];
      setSuggestions(matchedSuggestions);
      return input;
    } else {
      setSuggestions([]);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      e.preventDefault();
      setVal(suggestions[activeSuggestionIndex].name);
      setSuggestions([]);
    } else if (e.key === "ArrowUp") {
      if (activeSuggestionIndex === 0) {
        return;
      }
      setActiveSuggestionIndex(activeSuggestionIndex - 1);
    } else if (e.key === "ArrowDown") {
      if (activeSuggestionIndex === suggestions.length - 1) {
        return;
      }
      setActiveSuggestionIndex(activeSuggestionIndex + 1);
    }
  };

  return (
    <>
      <div className={`relative block ${className}`}>
        <input
          id="input"
          ref={inputRef}
          value={val}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(true)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className={`px-4 py-[0.9rem] text-sm w-full dark:text-white bg-white/25 dark:bg-black/25   rounded-[15px] focus:border-purple-500 focus:outline-none focus:ring focus:ring-purple-300 ${
            isFocused || val ? "" : ""
          }`}
        />
        <label
          id="input"
          className={`absolute left-0 px-4 transition-all ease-in-out select-none pointer-events-none ${
            isFocused || val
              ? "top-1 text-gray-500 dark:text-gray-400 text-xs"
              : "top-3 text-gray-600 dark:text-white text-base"
          }`}
        >
          {label}
        </label>

        {/* {isFocused && suggestions.length > 1 && ( */}
        <div
          className={`absolute mt-5 bg-nightsky/70 dark:bg-midnight/90 backdrop-blur-md flex flex-col   rounded-[1rem] w-full z-10 shadow-lg max-h-90 overflow-y-auto transition-all duration-300 transform origin-top-right -translate-y-2  ${
            isFocused && suggestions.length > 0
              ? "px-2 py-3 gap-1"
              : "opacity-0 invisible scale-95"
          }`}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => {
                setVal(suggestion.name);
                setIsFocused(false);
              }}
              className={`py-2 px-3 rounded-[1rem] hover:bg-white/30  dark:hover:bg-gray-500/30 dark:hover:text-white cursor-pointer ${
                index === activeSuggestionIndex &&
                "bg-white/30  dark:bg-gray-500/30 dark:text-white"
              }`}
              onMouseDown={() => {
                setVal(suggestion.name);
                setSuggestions([]);
              }}
            >
              {`${suggestion.name}, ${suggestion.country}`}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AutoCompleteInput;
