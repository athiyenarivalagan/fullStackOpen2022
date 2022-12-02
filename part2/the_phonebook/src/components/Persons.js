const Persons = ({ filteredNames, deletePerson }) => {
    return (
            filteredNames.map(person => (
                    <div key={person.id}>
                        {person.name} {person.number}
                        <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
                    </div>
            )
        )
    )
}

export default Persons