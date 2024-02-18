type props = {
    shortURLs : string[]
}

export const Results = ({shortURLs}:props) => {
    const renderListItem = (shortURLs: string[]) => {
        return shortURLs.map((item: string, index) => <li key={index}>
            <a href={`http://localhost:3000/url/${item}`} target='_blank'>{`localhost:3001/${item}`}</a>
        </li>)
    }

    return <div className='result-section'>
        <h2>Results</h2>
        <ul>
            {renderListItem(shortURLs)}
        </ul>
    </div>
}