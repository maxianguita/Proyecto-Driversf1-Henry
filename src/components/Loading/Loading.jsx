import React from 'react';
import styles from './loading.module.css'

const Loading = () => {
    let url = 'https://images-platform.99static.com/WGKaKpSHf5hBVwL4OuuNMp_w9qc=/100x100:900x900/500x500/top/smart/99designs-contests-attachments/82/82084/attachment_82084897'
  return (
    <div className={styles.containerLoading}>
      <img src={url} alt="loading" width='400px' heigth='400px' />
    </div>
  )
}

export default Loading