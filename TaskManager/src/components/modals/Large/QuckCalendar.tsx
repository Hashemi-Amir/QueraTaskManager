import persian from "react-date-object/calendars/persian"   
import persian_fa from "react-date-object/locales/persian_fa"
import { Calendar } from "react-multi-date-picker";
import 'react-multi-date-picker/styles/colors/teal.css'
import {BsCalendar4} from 'react-icons/bs'
import './customCalendar.css'
import { Dispatch, SetStateAction } from "react";

type QuckCalendarProps = {
    setCalendarModal : Dispatch<SetStateAction<boolean> >
}

const QuckCalendar = ({setCalendarModal}:QuckCalendarProps) => {

    const weekDays = ["شنبه", "یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنجشنبه", "جمعه"]
    const HeaderFont = 'flex items-center justify-center text-2xl font-medium text-[#1E1E1E]';
    const HeaderDate = 'text-208D8E mr-3'

    return (
        <>
            <div className="modal opacity-100 pointer-events-auto bg-transparent  visible" id="my-modal-2">

                <div className="modal-box opacity-100 p-0 max-w-4xl h-5/6 rounded-3xl shadow-[0_12px_32px_rgba(0,0,0,0.25)]">
                    {/* calendar Header */}
                    <div className="w-full h-32 border border-[#E4E4E4] flex items-center font-medium justify-around">

                        <div className={HeaderFont} >
                            <span className="ml-3"><BsCalendar4 /></span>
                          تاریخ شروع  <span className={HeaderDate}>۴ تیر</span> 
                        </div>

                        <div className={HeaderFont} >
                            <span className="ml-3"><BsCalendar4 /></span>
                            زمان پایان <span className={HeaderDate}>۱۰ تیر</span> 
                        </div>
                    </div>


                    {/* calendar Content */}
                    <div className="w-full h-4/6" >
                        <Calendar
                            
                            weekDays={weekDays}
                            headerOrder={["MONTH_YEAR" ,"LEFT_BUTTON", "RIGHT_BUTTON" ,]}
                            monthYearSeparator=" "
                            className='multi-locale-days teal'
                            calendar={persian}
                            locale={persian_fa}
                            showOtherDays
                            range
                        />
                    </div>


                    {/* calendar Footer */}
                    <div className="w-full flex justify-end pl-8">
                        <div className="w-32 h-8">
                            <label htmlFor="my-modal" onClick={()=>setCalendarModal(false)} className="w-full h-10 p-2.5 text-sm font-bold leading-4 cursor-pointer flex justify-center items-center text-white rounded-md bg-208D8E">بستن</label>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    );
};

export default QuckCalendar;