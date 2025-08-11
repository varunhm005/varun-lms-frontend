import Certificate from '../components/certificate/Certificate';
import { CertificateType, CourseCertificateType } from '../graphql/@generated/graphql';
import useUrlQueries from '../hooks/useUrlQueries';

interface QueryParams {
  batchNumber: string;
  ownerName: string;
  courseName: string;
  sealUrl: string;
  signatures: {
    name: string;
    designation: string;
    signatureUrl: string;
  }[];
  type: CertificateType;
  examDate: string;
  scheduleStart?: string;
  scheduleEnd?: string;
  certificateType: CourseCertificateType;
  caaApprovalNo?: string;
  functionName?: string;
}

function CertificatePrint() {
  const queriers = useUrlQueries<QueryParams>();

  return (
    <div
      style={{
        height: '210mm',
        width: '297mm',
        textAlign: 'center',
        padding: '10px',
      }}
    >
      {queriers && (
        <Certificate
          batchNumber={queriers.batchNumber}
          courseName={queriers.courseName}
          ownerName={queriers.ownerName}
          sealUrl={queriers.sealUrl}
          signatures={JSON.parse(queriers.signatures as unknown as string)}
          type={queriers.type}
          examDate={queriers.examDate}
          scheduleStartDate={queriers.scheduleStart}
          scheduleEndDate={queriers.scheduleEnd}
          certificateType={queriers.certificateType}
          caaApprovalNo={queriers.caaApprovalNo}
          functionName={queriers.functionName}
        />
      )}
    </div>
  );
}

export default CertificatePrint;
