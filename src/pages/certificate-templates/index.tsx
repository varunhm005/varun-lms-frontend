import { CheckCircleFilled, CheckCircleOutlined } from '@ant-design/icons';

export default function CertificateTemplates() {
  return (
    <div>
      <div className="p-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
          <div className="col-span-4 text-left">
            <p className="mb-2 text-base">Select Template</p>
          </div>
          <div className="col-span-1 text-left">
            <div className="certificate-card solid-emerald-100 card-pass relative p-5">
              <p className="text-lg font-bold text-black">Pass Certificate</p>
              <p className="mt-16 text-xs">Template 01</p>
              <CheckCircleOutlined className="check-outline" />
            </div>
          </div>

          <div className="col-span-1 text-left">
            <div className="certificate-card solid-emerald-100 card-completed relative p-5">
              <p className="text-lg font-bold text-black">Completed Certificate</p>
              <p className="mt-16 text-xs">Template 02</p>
              <CheckCircleFilled className="check-outline" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
