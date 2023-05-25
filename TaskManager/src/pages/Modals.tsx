import {createPortal} from 'react-dom'
import QuckCalendar from '../components/modals/Large/Calendar/QuckCalendar';

const Modals = () => {
    return (
        <div>
            <h2>this is Modal page</h2>
            <div>
                <input type="text" placeholder="name" />
            </div>
            
            {createPortal(
                <QuckCalendar />,
                document.body
            )}
        </div>
    );
};

export default Modals;