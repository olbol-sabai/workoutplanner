import React, {useState} from 'react';


export const WorkspaceStateContext = React.createContext({
    workspaceState: 'nothing selected',
    changeState: () => {}
})


const WorkspaceStateContextProvider = props => {

    const [workSpaceState, setWorkspaceState] = useState('nothing selected');

    return (
        <WorkspaceStateContext.Provider value={{
            workspaceState: workSpaceState,
            changeState: setWorkspaceState
        }}>
            {props.chlidren}
        </WorkspaceStateContext.Provider>
    )
}

export default WorkspaceStateContextProvider
