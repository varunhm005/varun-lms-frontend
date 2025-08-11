import { Button } from 'antd';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import FullScreenLoading from '../../components/loading/FullScreenLoading';
import { useMessage } from '../../context/message-context';
import {
  useGetCertificateDetailsQuery,
  useSendCertificateMutation,
} from '../../graphql/@generated/graphql';

function CertificateDetails() {
  const { id: certificateId } = useParams<{ id: string }>();

  const message = useMessage();

  const { data, loading } = useGetCertificateDetailsQuery({
    variables: {
      certificateId: +certificateId!,
    },
  });

  const [sendCertificate, { loading: sendCertificateLoading }] = useSendCertificateMutation({
    variables: {
      sendCertificateInput: {
        certificateId: +certificateId!,
      },
    },
    onCompleted: () => {
      message.success('Certificate sent successfully');
    },
  });

  const componentRef = useRef<any>();

  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  //   documentTitle: data?.certificate?.owner?.name
  //     ? `${data?.certificate?.owner?.idNumber}-certificate`
  //     : 'Certificate',
  // });

  const handleDownload = () => {
    if (data?.certificate?.certificateUrl) {
      // Download the certificate
      const link = document.createElement('a');
      // Open the link in new tab
      link.target = '_blank';
      link.download = `${data?.certificate?.owner?.idNumber}-certificate.pdf`;
      link.href = data?.certificate?.certificateUrl!;
      link.click();
      // Remove the link
      link.remove();
    } else {
      message.error('Certificate cannot be downloaded at the moment');
    }
  };

  const certificateUrl = data?.certificate?.certificateUrl;

  if (loading) {
    return <FullScreenLoading />;
  }

  return (
    <main className="p-6">
      <div
        className="bg-white p-3"
        style={{
          height: '210mm',
          width: '297mm',
          textAlign: 'center',
        }}
        ref={componentRef}
      >
        <div
          style={{
            height: '210mm',
            width: '297mm',
            textAlign: 'center',
          }}
        >
          {certificateUrl ? (
            <div className="relative h-full w-full">
              <iframe
                src={`${certificateUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                width="100%"
                height="100%"
                title="Certificate"
                style={{ border: 'none' }}
              />
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-gray-500">No certificate available to display</p>
            </div>
          )}

          {/* <Certificate
            batchNumber={certificate?.batchNumber!}
            courseName={certificate?.courses?.name!}
            ownerName={certificate?.owner?.name!}
            sealUrl={certificate?.sealUrl!}
            signatures={
              certificate?.CertificateSignatures!.map((signature) => ({
                name: signature?.name!,
                designation: signature?.designation!,
                signatureUrl: signature?.signatureUrl!,
              }))!
            }
            type={certificate?.certificateType!}
            examDate={certificate?.createdAt}
            scheduleEndDate={certificate?.student?.courseSchedule.endDate}
            scheduleStartDate={certificate?.student?.courseSchedule.startDate}
            certificateType={certificate?.courses?.certificateType!}
            caaApprovalNo={certificate?.courses?.caaApprovalNo || ''}
            functionName={certificate?.courses?.functionName || ''}
          /> */}
        </div>
      </div>
      <div
        style={{
          width: '297mm',
        }}
        className="mt-5 w-full text-left "
      >
        <div className="grid grid-cols-2 gap-5">
          <Button
            onClick={() => sendCertificate()}
            loading={sendCertificateLoading}
            type="dashed"
            shape="round"
            block
          >
            Email Certificate
          </Button>
          <Button onClick={handleDownload} type="primary" shape="round" block>
            Download Certificate
          </Button>
        </div>
      </div>
    </main>
  );
}

export default CertificateDetails;
