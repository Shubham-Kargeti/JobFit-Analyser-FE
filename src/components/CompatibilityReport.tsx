import React from 'react';

interface CompatibilityReportProps {
  result: string;
}

const CompatibilityReport: React.FC<CompatibilityReportProps> = ({ result }) => (
  <div className="compatibility-report">
    <h3>Compatibility Report:</h3>
    <textarea readOnly value={result} rows={15} style={{ width: '100%', borderRadius: 8, padding: 12 }} />
  </div>
);

export default CompatibilityReport;
