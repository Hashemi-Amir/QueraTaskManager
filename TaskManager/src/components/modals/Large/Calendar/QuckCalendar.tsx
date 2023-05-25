import persian from "react-date-object/calendars/persian"   
import persian_fa from "react-date-object/locales/persian_fa"
import { Calendar } from "react-multi-date-picker";
import 'react-multi-date-picker/styles/colors/teal.css'
import Button from "../../../ui/Button";
import './customCalendar.css'



const QuckCalendar = () => {
    const weekDays = ["شنبه", "یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنجشنبه", "جمعه"]
    return (
        <>
            <label htmlFor="my-modal" className="btn">open modal</label>

            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal bg-transparent">
                <div className="modal-box p-0 max-w-4xl h-5/6 rounded-3xl shadow-[0_12px_32px_rgba(0,0,0,0.25)]">
                    {/* calendar Header */}
                    <div className="w-full h-32 border border-[#E4E4E4] flex items-center font-medium justify-around">
                        <div className="flex items-center justify-center text-2xl text-[#1E1E1E]">
                          تاریخ شروع  <span className="text-208D8E mr-1">۴ تیر</span> 
                        </div>

                        <div className="flex items-center justify-center text-2xl font-medium text-[#1E1E1E]">
                            زمان پایان <span className="text-208D8E mr-3">۱۰ تیر</span> 
                        </div>
                    </div>


                    {/* calendar content */}
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
                            <Button value='بستن' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuckCalendar;