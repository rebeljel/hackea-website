
import TableBody from "./TableBody"
import TableHeader from "./TableHeader"

const Table = props => {
    const {characterData, removeCharacter} = props
    return (
        <table>
            <TableHeader/>
            <TableBody 
            characterData={characterData} 
            removeCharacter = {removeCharacter} />
        </table>
    )
}


export default Table