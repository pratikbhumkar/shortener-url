type props = {
    value?: string
    setValue: Function
    placeHolder: string
    title: string
    name: string
}

export const MyInput = ({ value, setValue, title, placeHolder, name }: props) => {
    return (
        <div data-testid={name} className="myInput">
            <label htmlFor={name}>
                {title}
            </label>
            <input
                required={true}
                name={name}
                value={value}
                onChange={(event) => setValue(event.target.value)} placeholder={placeHolder} />
        </div>
    )
}