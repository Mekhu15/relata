import React, { useCallback } from 'react';
import Image from '../../common/Image';

import styles from './searchModal.module.css';

function Suggestions(props) {
  const { suggestedTools, onItemClick, isDisabled } = props;

  const handleAddingTools = useCallback(
    (addedTool, index) => {
      if (isDisabled) return;
      onItemClick(addedTool, index);
    },
    [isDisabled, onItemClick]
  );

  return (
    <div className={styles.suggestionsContainer}>
      {suggestedTools.map((tool, index) => (
        <button
          key={index}
          className={styles.tools}
          onClick={() => {
            handleAddingTools(tool, index);
          }}
          disabled={isDisabled}
        >
          <Image src={tool.icon} height={30} width={30} />
          <span className={styles.toolsText}>{tool.text}</span>
        </button>
      ))}
    </div>
  );
}

export default Suggestions;
