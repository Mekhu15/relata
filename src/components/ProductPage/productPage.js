import React, { useState } from 'react';

import { ProductPageDataContext } from '../../context/product';

import { tools } from '../../data/product';

import SearchModal from './searchModal';
import Upload from './upload';

import styles from './productPage.module.css';

function ProductPage() {
  const [uploadedTools, setUploadedTools] = useState([]);
  const [suggestedTools, setSuggestedTools] = useState(tools);

  function updateUploadedTools(tools) {
    setUploadedTools(tools);
  }
  function updateSuggestedTools(tools) {
    setSuggestedTools(tools.sort());
  }

  return (
    <ProductPageDataContext.Provider
      value={{
        uploadedTools,
        updateUploadedTools,
        suggestedTools,
        updateSuggestedTools,
      }}
    >
      <div className={styles.root}>
        <Upload />
        <SearchModal />
      </div>
    </ProductPageDataContext.Provider>
  );
}

export default ProductPage;
