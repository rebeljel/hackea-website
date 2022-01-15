
import UserTableBody from "./UserTableBody"
import UserTableHeader from "./UserTableHeader"
import Table from 'react-bootstrap/Table'

const UserTable = props => {
    const {userData, userDelete, userEdit} = props
    
    return (
        <Table striped bordered hover size="sm" responsive="md">
            <UserTableHeader />
            <UserTableBody
            userData = {userData}
            userDelete = {userDelete}
            userEdit = {userEdit} />
        </Table>
    )
}


export default UserTable