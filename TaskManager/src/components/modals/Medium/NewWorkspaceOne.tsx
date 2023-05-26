import { Link } from "react-router-dom";
import Input from "../../ui/Input";

import Button from "../../ui/Button";


export type FieldValues = Record<string, unknown>;

// const {
//     register,
//     } = useForm<FieldValues>({
//     resolver: yupResolver(schema),
//     });
const NewWorkspaceOne = () => {
    return (
        <>
            <Input 
                label='نام ورک اسپیس'
                type='text'
                id='newWork'
            />
                   
            <div className='mt-16'>
                <Link to='selectColor'><Button value='ادامه'/></Link> 
            </div>  
        </>
    );
};

export default NewWorkspaceOne;