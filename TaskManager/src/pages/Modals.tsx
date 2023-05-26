import {createPortal} from 'react-dom'
import AddNewTask from '../components/modals/AddNewTask/AddNewTask'
// import CardMedium from '../components/modals/Medium/CardMedium';
// import ShareModal from '../components/modals/Medium/ShareModal';
// import NewWorkspaceOne from '../components/modals/Medium/NewWorkspaceOne';
// import NewWorkspaceTwo from '../components/modals/Medium/NewWorkspaceTwo';
// import NewWorkspaceThree from '../components/modals/Medium/NewWorkspaceThree';
// import QuckCalendar from '../components/modals/Large/Calendar/QuckCalendar';

const Modals = () => {

    return (
        <div>
            <h2>this is Modal page</h2>
            
            {createPortal(
                <AddNewTask />,
                document.body
            )}
        </div>
    );
};

export default Modals;


