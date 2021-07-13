import React, { useEffect, useState } from 'react';
import { Button, Divider } from 'antd';
import SignaturePad from 'signature_pad';
import styles from './index.less';

interface SignaturePadProps {
  value?: string;
  onChange?: (value: string) => void;
}
const Signature: React.FC<SignaturePadProps> = ({ onChange }) => {
  // const [form] = Form.useForm();
  // const { validateFields } = form;
  const [signaturePad, setSignaturePad] = useState(null);
  const [signatureData, setSignatureData] = useState('');
  useEffect(() => {
    const canvas = document.getElementById('signature-pad');
    function resizeCanvas() {
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext('2d').scale(ratio, ratio);
    }
    window.onresize = resizeCanvas;
    resizeCanvas();
    setSignaturePad(
      new SignaturePad(canvas, {
        backgroundColor: 'rgb(255, 255, 255)',
      }),
    );
  }, []);

  function handleSave() {
    if (signaturePad) {
      if (signaturePad.isEmpty()) {
        alert('请提供电子签名');
      }
      const imageData = signaturePad.toDataURL('image/png');
      setSignatureData(imageData);
      onChange(imageData);
    }
  }
  function handleClear() {
    signaturePad!.clear();
  }

  return (
    <div>
      <div className={styles.wrapper}>
        <canvas id="signature-pad" className={styles.signaturePad} />
      </div>
      <Divider />
      <Button onClick={handleSave}>确认</Button>
      <Button onClick={handleClear}>清除</Button>
      <div>
        <img alt="" height="100" src={signatureData} />
      </div>
    </div>
  );
};

export default Signature;
