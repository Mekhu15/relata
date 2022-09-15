import React, { useCallback, useContext } from 'react';
import { ProductPageDataContext } from '../../../context/product';
import Image from '../../common/Image';

import styles from './upload.module.css';

function Upload() {
  const { uploadedTools, updateUploadedTools, suggestedTools } = useContext(
    ProductPageDataContext
  );

  const handleRemoveTools = useCallback(
    (index) => {
      suggestedTools.push(uploadedTools[index]);
      const updatedArray = uploadedTools.splice(index, 1);

      updateUploadedTools(updatedArray);
    },
    [suggestedTools, updateUploadedTools, uploadedTools]
  );

  return (
    <div className={styles.root}>
      {[...Array(MAX_SELECTION)].map((_, index) => (
        <div className={styles.uploadArea} key={index}>
          {uploadedTools.length && uploadedTools[index] ? (
            <div className={styles.uploadedTools}>
              <Image
                src={uploadedTools[index].icon}
                height={30}
                width={30}
              ></Image>
              <p className={styles.uploadedText}>{uploadedTools[index].text}</p>
              <button
                onClick={() => {
                  handleRemoveTools(index);
                }}
                className={styles.closeButton}
              >
                <span className={styles.close}>X</span>
                <span>Remove</span>
              </button>
            </div>
          ) : (
            <span className={styles.uploadButton}>+</span>
          )}
        </div>
      ))}
    </div>
  );
}

const MAX_SELECTION = 4;

export default Upload;
