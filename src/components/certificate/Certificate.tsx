/* eslint-disable react/require-default-props */
import { Image } from 'antd';
import CertificateHeading from '../../assets/images/Certificate-heading.svg';
import CertificateLogo from '../../assets/images/certificate-logo.png';
import { CertificateType, CourseCertificateType } from '../../graphql/@generated/graphql';
import { formatDate } from '../../utils/utils';

interface Props {
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
  scheduleStartDate?: string;
  scheduleEndDate?: string;
  certificateType: CourseCertificateType;
  caaApprovalNo?: string;
  functionName?: string;
}

function Certificate(props: Props) {
  const {
    examDate,
    batchNumber,
    courseName,
    ownerName,
    sealUrl,
    signatures,
    type,
    scheduleEndDate,
    scheduleStartDate,
    certificateType,
    caaApprovalNo,
    functionName,
  } = props;

  const hasSchedule = Boolean(scheduleStartDate) && Boolean(scheduleEndDate);

  return (
    <div className="h-full w-full rounded-md border-2 border-[#A5566A] p-0">
      <div className="certificate-bg flex h-full w-full flex-col items-center justify-between rounded-md border-0 border-[#A5566A] p-6">
        <div className="border-b-1 flex w-full items-center justify-between pb-3">
          <div>
            <img className="mt-3 h-14" src={CertificateLogo} alt="" />
          </div>
          <div className="text-xs">Certificate No: {batchNumber}</div>
        </div>
        <div className="mt-20 w-full !text-center">
          <Image src={CertificateHeading} preview={false} />
          <p className="mt-4 text-xl">This is to certify that</p>
          <h3 className=" my-1 text-xl font-bold">{ownerName}</h3>
          <p className="text-lg">
            Has successfully {type === CertificateType.Pass ? 'passed' : 'attended'} a course in
          </p>
          <h3 className=" my-1 text-xl font-bold">{courseName}</h3>
          {certificateType === CourseCertificateType.Dgr && (
            <>
              {Boolean(functionName) && (
                <>
                  <p>and assessed to be competent to carry out the Functions of</p>
                  <h3 className=" my-1 text-base font-bold">{functionName}</h3>
                </>
              )}
              {Boolean(caaApprovalNo) && <p>(CAA approval no. {caaApprovalNo})</p>}
            </>
          )}

          {!hasSchedule && <h3 className="text-bold my-1 text-xl">On {formatDate(examDate)}</h3>}
          {hasSchedule && (
            <h3 className="text-bold my-1 text-xl">
              From {formatDate(scheduleStartDate!)} to {formatDate(scheduleEndDate!)}
            </h3>
          )}
        </div>
        <div />
        <div className="relative grid w-full grid-cols-3 gap-5">
          {signatures?.map((signature, i) => {
            // Find the middle of the array
            const middle = Math.ceil(signatures.length / 2);
            let className = '';

            switch (i) {
              case 0:
                className = 'text-left';
                break;
              case signatures.length - 1:
                className = 'text-right';
                break;
              default:
                className = 'text-center';
                break;
            }

            return (
              <>
                {middle === i && Boolean(sealUrl) && (
                  <div className="mt-auto text-center">
                    <Image preview={false} className="!h-24 object-contain" src={sealUrl} alt="" />
                  </div>
                )}
                <div className={className}>
                  <div key={signature?.signatureUrl} className="">
                    <div>
                      <Image
                        preview={false}
                        className="mt-auto !h-24 !w-24 "
                        src={signature?.signatureUrl}
                        alt=""
                      />
                    </div>
                    <div>
                      <p>{signature?.name}</p>
                      <p>{signature?.designation}</p>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <p className="text-orange-700">
          <span className="lowercase underline">www.omansats.com</span> &nbsp; P.O. Box: 618,
          P.C:11, Sultanate of Oman. Tel: (+968)24356106
        </p>
      </div>
    </div>
  );
}

export default Certificate;
