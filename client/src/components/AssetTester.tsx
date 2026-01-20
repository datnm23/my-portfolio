import React from 'react';

const AssetTester: React.FC = () => {
  const testCV = () => {
    const link = document.createElement('a');
    link.href = '/CV_Nguyen_Manh_Dat.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const testExcel1 = () => {
    const link = document.createElement('a');
    link.href = '/2025.08.11Thanhtoandot2-HD21.2025.CT01.SM-HL.xlsx';
    link.download = '2025.08.11Thanhtoandot2-HD21.2025.CT01.SM-HL.xlsx';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const testGoogleDrive = (id: string) => {
    const url = `https://docs.google.com/spreadsheets/d/${id}/edit?usp=sharing`;
    window.open(url, '_blank');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Asset Testing</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>CV Test</h2>
        <button onClick={testCV} style={{ margin: '5px', padding: '10px' }}>
          Test CV Download
        </button>
        <a href="/CV_Nguyen_Manh_Dat.pdf" target="_blank" style={{ margin: '5px', padding: '10px', display: 'inline-block', backgroundColor: '#f0f0f0' }}>
          Direct CV Link
        </a>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Excel Files Test</h2>
        <button onClick={testExcel1} style={{ margin: '5px', padding: '10px' }}>
          Test Excel 1
        </button>
        <a href="/2025.08.11Thanhtoandot2-HD21.2025.CT01.SM-HL.xlsx" target="_blank" style={{ margin: '5px', padding: '10px', display: 'inline-block', backgroundColor: '#f0f0f0' }}>
          Direct Excel 1 Link
        </a>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Google Drive Test</h2>
        <button onClick={() => testGoogleDrive('12t4NrjGm6abNYFGiK781KpZanb1c-mje')} style={{ margin: '5px', padding: '10px' }}>
          Google Drive 1
        </button>
        <button onClick={() => testGoogleDrive('1IvL2eIc9e9bFK6tbFyiDCrehuaIyMqe5')} style={{ margin: '5px', padding: '10px' }}>
          Google Drive 2
        </button>
        <button onClick={() => testGoogleDrive('1XPFwum3FlJ7D8KYYi5RU5i_h7LZa3ulw')} style={{ margin: '5px', padding: '10px' }}>
          Google Drive 3
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Debug Info</h2>
        <p><strong>Current Host:</strong> {window.location.hostname}</p>
        <p><strong>Current Port:</strong> {window.location.port}</p>
        <p><strong>Current Protocol:</strong> {window.location.protocol}</p>
        <p><strong>Full URL:</strong> {window.location.href}</p>
      </div>
    </div>
  );
};

export default AssetTester;
