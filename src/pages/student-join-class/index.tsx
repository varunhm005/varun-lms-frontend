import { Button } from 'antd';
import Airplane from '../../assets/images/airplane.jpg';

function StudentClassLanding() {
  return (
    <div>
      <div className="p-6 text-left">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
          <div className="col-span-2">
            <div className=" flex  rounded-[25px] bg-stone-100 p-5">
              <div className="flex-grow">
                <p className="mb-0 text-[14px] font-normal text-black">Course Name:</p>
                <h3 className="text-[24px] font-black text-black">Airside Safety</h3>
              </div>
              <Button shape="round" type="primary">
                End Class
              </Button>
            </div>

            <img src={Airplane} alt="" />
          </div>

          <div className="col-span-1 ">
            <h3 className="text-[24px] font-black text-black">Airside Video Instructions</h3>
            <p className="text-base font-normal text-black">
              Dive into the Digital Garage and explore how you can make the most of online
              opportunities. This introductory video will give you a brief overview of what you can
              learn throughout the course and highlight some of the benefits of building or
              polishing your digital skills.
            </p>
          </div>
          <div className="col-span-1">
            <div className=" rounded-[25px]  border bg-stone-100 p-5 text-center">
              <h5 className="text-sm font-black text-black">Module Overview</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentClassLanding;
