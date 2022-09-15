import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';

import { ProductPageDataContext } from '../../../context/product';

import { tools } from '../../../data/product';

import Suggestions from './suggestions';

import styles from './searchModal.module.css';

function SearchModal() {
  const [isSuggestions, setSuggestions] = useState(false);
  const [isDisabled, setDisabled] = useState(true);
  const [addedTools, setAddedTools] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const searchbarRef = useRef(null);

  const {
    updateUploadedTools,
    suggestedTools,
    updateSuggestedTools,
    uploadedTools,
  } = useContext(ProductPageDataContext);

  const [filteredSuggestions, setFilteredSuggestions] =
    useState(suggestedTools);

  useEffect(() => {
    if (uploadedTools.length === 4) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [uploadedTools.length]);

  function handleSubmit(event) {
    event.preventDefault();
  }

  const handleItemClick = useCallback(
    (addedTool, position) => {
      const { icon, text } = addedTool;
      const updatedArray = suggestedTools.filter(
        (_, index) => index !== position
      );
      setFilteredSuggestions(updatedArray);
      updateSuggestedTools(updatedArray);
      setAddedTools((currentState) => {
        return [
          ...currentState,
          {
            icon,
            text,
          },
        ];
      });
      setSuggestions(false);
    },
    [suggestedTools, updateSuggestedTools]
  );

  function closeSearchResult() {
    if (searchbarRef && searchbarRef.current) {
      searchbarRef.current.blur();
    }
    setSuggestions(false);
  }

  const handleClick = useCallback((event) => {
    if (searchbarRef.current && !searchbarRef.current.contains(event.target)) {
      closeSearchResult();
    }
  }, []);

  function handleFoucus() {
    setSuggestions(true);
  }

  useEffect(() => {
    updateUploadedTools(addedTools);
  }, [addedTools, updateUploadedTools]);

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleClick]);

  function handleChange(event) {
    const value = event.target.value.toLowerCase().trim();
    setInputValue(value);
    const suggestions = tools.filter((tool) =>
      tool.text.toLowerCase().includes(value)
    );
    setFilteredSuggestions(suggestions);
  }

  return (
    <div className={styles.root}>
      <span className={styles.steps}> 1 of 3</span>
      <p className={styles.heading}>Let's add your internal tools</p>
      <p className={styles.info}>
        Search to quickly add products your team uses today. You'll be able to
        add as many as you need later but for now let's add four.{' '}
      </p>

      <form onSubmit={handleSubmit} ref={searchbarRef}>
        <input
          type='text'
          placeholder='Search for any software'
          onFocus={handleFoucus}
          onChange={handleChange}
          className={styles.searchbar}
          value={inputValue}
        />
        {isSuggestions && (
          <Suggestions
            onItemClick={handleItemClick}
            suggestedTools={filteredSuggestions}
            uploadedTools={uploadedTools}
            isDisabled={!isDisabled}
          />
        )}
      </form>
      <button
        disabled={isDisabled}
        className={styles.nextButton}
        data-disabled={isDisabled}
      >
        {' '}
        Next
      </button>
    </div>
  );
}

export default SearchModal;
