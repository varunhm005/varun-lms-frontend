import { CheckCircleOutlined, CloseCircleOutlined, CommentOutlined } from '@ant-design/icons';
import { Button } from 'antd';

function index() {
  return (
    <div>
      <div className="p-6 text-left">
        <div className="grid grid-cols-1 gap-5  ">
          <div className="col-span-1">
            <h5 className=" text-2xl font-bold  text-black">Mid Term 2023</h5>
            <p className=" text-sm font-normal text-black">Maximum Mark: 100</p>
            <div className="mt-4 flex">
              <p className=" px-3 text-right text-xl font-normal  text-black">Q1:</p>
              <div className="border-l border-r-gray-200 px-4 ">
                <div className="Rectangle2197 h-72 w-96 bg-zinc-300" />
                <h5 className=" mb-2 mt-3 text-xl font-normal leading-snug text-black">
                  Write a question here?
                </h5>
                <Button shape="round" className="mr-2">
                  Option One Here
                </Button>
                <Button shape="round" className="mr-2">
                  Option Two Here
                </Button>
                <Button shape="round" className="mr-2">
                  Option Three Here
                </Button>
                <Button
                  type="link"
                  icon={<CheckCircleOutlined style={{ fontSize: '22px', color: '#4CB964' }} />}
                />
                <Button
                  type="link"
                  icon={<CommentOutlined style={{ fontSize: '22px', color: '#44475C' }} />}
                />
              </div>
            </div>

            <div className="mt-4 flex">
              <p className=" px-3 text-right text-xl font-normal  text-black">Q2:</p>
              <div className="border-l border-r-gray-200 px-4 ">
                <p className=" text-base font-normal leading-snug text-black">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industrys standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make a type specimen
                  book. It has survived not only five centuries, but also the leap into electronic
                  typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                  with desktop publishing software like Aldus PageMaker including versions of Lorem
                  Ipsum.
                </p>
                <div className="mt-3 flex w-full">
                  <div className="flex-grow pr-1">
                    <h5 className=" mb-2 mt-3 text-xl font-normal leading-snug text-black">
                      i) Write a question here?
                    </h5>
                    <Button shape="round" className="mr-2">
                      Option One Here
                    </Button>
                    <Button shape="round" className="mr-2">
                      Option Two Here
                    </Button>
                    <Button shape="round" className="mr-2">
                      Option Three Here
                    </Button>
                    <Button
                      type="link"
                      danger
                      icon={<CloseCircleOutlined style={{ fontSize: '22px' }} />}
                    />
                    <Button
                      type="link"
                      icon={<CommentOutlined style={{ fontSize: '22px', color: '#44475C' }} />}
                    />
                    <h5 className=" mb-2 mt-3 text-xl font-normal leading-snug text-black">
                      ii) Write a question here?
                    </h5>
                    <Button shape="round" className="mr-2">
                      Option One Here
                    </Button>
                    <Button shape="round" className="mr-2">
                      Option Two Here
                    </Button>
                    <Button shape="round" className="mr-2">
                      Option Three Here
                    </Button>
                    <Button
                      type="link"
                      danger
                      icon={<CloseCircleOutlined style={{ fontSize: '22px' }} />}
                    />
                    <Button
                      type="link"
                      icon={<CommentOutlined style={{ fontSize: '22px', color: '#44475C' }} />}
                    />
                  </div>
                  <div className="w-5/12  rounded-2xl border border-stone-200 bg-white p-4 ">
                    <div className=" text-base font-normal leading-snug text-black">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                      Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,
                      when an unknown printer took a galley of type and scrambled it to make a type
                      specimen book. It has survived not only five centuries, but also the leap into
                      electronic typesetting, remaining essentially unchanged. It was popularised in
                      the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                      and more recently with desktop publishing software like Aldus PageMaker
                      including versions of Lorem Ipsum.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Button shape="round" className="ml-16 mt-8" type="primary">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
