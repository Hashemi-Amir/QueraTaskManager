import {createPortal} from 'react-dom'
import CardMedium from '../components/modals/Medium/CardMedium';
import Input from '../components/ui/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../components/Validation';
import { useForm } from "react-hook-form";
import Button from '../components/ui/Button';
import ModalLayout from '../layout/ModalLayout';
export type FieldValues = Record<string, unknown>;
// import QuckCalendar from '../components/modals/Large/Calendar/QuckCalendar';

const Modals = () => {
    const {
        register,
        } = useForm<FieldValues>({
        resolver: yupResolver(schema),
        });
    return (
        <div>
            <h2>this is Modal page</h2>
            
            {createPortal(
                <ModalLayout >
                    <CardMedium 
                    cardTitle='ساختن ورک اسپیس جدید'

                    >
                    <Input 
                        label='نام ورک اسپیس'
                        type='text'
                        id='newWork'
                        register={register}
                    />

                    <div className='mt-16'>
                        <Button value='ادامه'/>
                    </div>
                    </CardMedium>
                </ModalLayout>,
                document.body
            )}
        </div>
    );
};

export default Modals;


