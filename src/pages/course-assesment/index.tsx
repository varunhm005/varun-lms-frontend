import { Button, Form, Input } from 'antd';

export default function index() {
  return (
    <div>
      <div className="p-6">
        <Form layout="vertical" className="form-design">
          <div className="m-auto grid max-w-3xl grid-cols-1 md:grid-cols-2 md:gap-x-10 ">
            <div className="col-span-1 text-left">
              <Form.Item label="Text Field">
                <Input />
              </Form.Item>

              <Form.Item label="Text Field">
                <Input />
              </Form.Item>

              <Form.Item label="Text Field">
                <Input />
              </Form.Item>

              <Form.Item label="Text Field">
                <Input />
              </Form.Item>
              <Form.Item label="Text Field">
                <Input />
              </Form.Item>

              <Form.Item label="Text Field">
                <Input />
              </Form.Item>

              <Form.Item label="Text Field">
                <Input />
              </Form.Item>
            </div>
            <div className="col-span-1 text-left">
              <Form.Item label="Text Field">
                <Input />
              </Form.Item>

              <Form.Item label="Text Field">
                <Input />
              </Form.Item>

              <Form.Item label="Text Field">
                <Input />
              </Form.Item>

              <Form.Item label="Text Field">
                <Input />
              </Form.Item>
              <Form.Item label="Text Field">
                <Input />
              </Form.Item>

              <Form.Item label="Text Field">
                <Input />
              </Form.Item>

              <Form.Item label="Text Field">
                <Input />
              </Form.Item>
            </div>

            <div className="col-span-2 text-left">
              <Button shape="round" className="mr-3 mt-2" type="primary">
                Save
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
