import {createPortal} from 'react-dom'
// import QuckCalendar from '../components/modals/Calendar/QuckCalendar';
// import AddTaskOnCalendar from '../components/modals/Small/AddTaskOnCalendar';
// import Filter from '../components/modals/Filter/Filter';
import AddNewTask from '../components/modals/AddNewTask/AddNewTask'
// import CardMedium from '../components/modals/Medium/CardMedium';
// import ShareModal from '../components/modals/Medium/ShareModal';
// import NewWorkspaceOne from '../components/modals/Medium/NewWorkspaceOne';
// import NewWorkspaceTwo from '../components/modals/Medium/NewWorkspaceTwo';
// import NewWorkspaceThree from '../components/modals/Medium/NewWorkspaceThree';

const Modals = () => {

    return (
        <div>
            <h2>this is Modal page</h2>
            
            {createPortal(
                <AddNewTask />
                ,
                document.body
            )}
        </div>
    );
};

export default Modals;


