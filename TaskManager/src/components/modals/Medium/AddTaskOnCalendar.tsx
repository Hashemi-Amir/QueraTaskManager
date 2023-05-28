import {FiFlag} from 'react-icons/fi'
import Button from '../../ui/Button';


const AddTaskOnCalendar = () => {
    const centering = 'w-full flex items-center'
    return (
        
        <div className="modal-box w-2/3 max-w-1xl py-5 px-12">
            {/* header */}
            <div className={centering} >   
                <label htmlFor="my-modal-3" className="cursor-pointer">✕</label>
                    <input 
                        type="text" 
                        id="taskTitle" 
                        name="taskTitle"
                        placeholder="نام تسک را وارد کنید" 
                        className="mr-3 text-2xl text-black font-medium focus:outline-none"
                    />
            </div>

            {/* content */}
            <div className={`${centering} justify-between mt-10`}>
                <div className="flex text-D3D3D3 text-2xl">
                    <FiFlag />
                    <span className='mr-5 text-208D8E text-xl font-medium'>۱۴ تیر</span>
                </div>

                <div className='w-32'>
                    <Button value='ساختن تسک'/>
                </div>
            </div>
        </div>
        
    );
};

export default AddTaskOnCalendar;